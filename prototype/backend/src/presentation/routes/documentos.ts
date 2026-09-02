import type { FastifyInstance } from 'fastify'
import { query, get, run } from '../../infrastructure/db/sqlite.js'
import { nosql } from '../../infrastructure/db/nosql.js'
import { vectorStore } from '../../infrastructure/vector/localVector.js'
import { authGuard, audit } from '../middlewares/auth.js'
import { saveFile, classifyByContent } from '../../infrastructure/storage/localStorage.js'
import { randomUUID } from 'node:crypto'
import { createHash } from 'node:crypto'

export async function documentosRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authGuard as any)

  app.post('/casos/:id/documentos', async (req, reply) => {
    const { id: casoId } = req.params as any
    const user = (req as any).user
    const caso = get('SELECT id FROM casos WHERE id=?', [casoId])
    if (!caso) return reply.code(404).send({ error: 'Caso no encontrado' })
    if (user.rol === 'asistente') {
      const c = get('SELECT asignados FROM casos WHERE id=?', [casoId]) as any
      try { if (!JSON.parse(c.asignados).includes(user.id)) return reply.code(403).send({ error: 'Sin acceso' }) } catch {}
    }
    const data = await req.file()
    if (!data) return reply.code(400).send({ error: 'Archivo requerido' })
    const buffer = await data.toBuffer()
    if (buffer.length > 50 * 1024 * 1024) return reply.code(413).send({ error: 'Max 50MB' })
    const original = data.filename
    const mime = data.mimetype
    const textPreview = buffer.slice(0, 4000).toString('utf-8', 0, 4000)
    const { tipo, nuevoNombre } = classifyByContent(original, textPreview)
    const { ruta } = await saveFile(buffer, original)
    const hash = createHash('sha256').update(buffer).digest('hex')
    const dup = query('SELECT id FROM documentos WHERE hash=? AND casoId=?', [hash, casoId])
    if (dup.length > 0) {
      return reply.code(409).send({ error: 'Duplicado detectado >85%', duplicado: true, documentoId: dup[0].id, sugerencia: 'versionar' })
    }
    const docId = randomUUID()
    const now = new Date().toISOString()
    run('INSERT INTO documentos VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [docId, casoId, nuevoNombre, original, tipo, mime, buffer.length, ruta, 1, hash, 'procesado', 1, now, now])
    const contenido = textPreview || `Documento ${nuevoNombre} tipo ${tipo} caso ${casoId}`
    const chunkId = randomUUID()
    const embedding = vectorStore.embed(contenido)
    run('INSERT INTO chunks VALUES (?,?,?,?,?,?,?)', [chunkId, docId, casoId, contenido, 0, JSON.stringify(embedding), now])
    vectorStore.add({ id: chunkId, documentoId: docId, casoId, titulo: nuevoNombre, contenido, tipo, fecha: now, embedding })
    await nosql.collection('documentos').insert({ _id: docId, casoId, titulo: nuevoNombre, tituloOriginal: original, tipo, contenido, hash, createdAt: now })
    await nosql.collection('chunks').insert({ _id: chunkId, documentoId: docId, casoId, contenido, createdAt: now })
    audit(user.id, 'UPLOAD_DOC', 'documentos', { docId, casoId, tipo }, req.ip)
    run('INSERT INTO notificaciones VALUES (?,?,?,?,?,?,?,?)', [randomUUID(), user.id, 'documento', `Documento subido: ${nuevoNombre}`, tipo, 0, JSON.stringify({ casoId, docId }), now])
    return reply.code(201).send({ id: docId, titulo: nuevoNombre, tipo, hash, ruta, version: 1 })
  })

  app.get('/casos/:id/documentos', async (req, reply) => {
    const { id } = req.params as any
    const rows = query('SELECT * FROM documentos WHERE casoId=? ORDER BY createdAt DESC', [id])
    return { documentos: rows }
  })

  app.get('/documentos/:id', async (req, reply) => {
    const { id } = req.params as any
    const doc = get('SELECT * FROM documentos WHERE id=?', [id])
    if (!doc) return reply.code(404).send({ error: 'No encontrado' })
    const chunks = query('SELECT id,contenido,orden FROM chunks WHERE documentoId=? ORDER BY orden ASC', [id])
    return { ...doc, chunks }
  })

  app.post('/documentos/:id/version', async (req, reply) => {
    const { id } = req.params as any
    const user = (req as any).user
    const doc = get('SELECT * FROM documentos WHERE id=?', [id])
    if (!doc) return reply.code(404).send({ error: 'No encontrado' })
    const data = await req.file()
    if (!data) return reply.code(400).send({ error: 'Archivo requerido' })
    const buffer = await data.toBuffer()
    const { ruta } = await saveFile(buffer, data.filename)
    const hash = createHash('sha256').update(buffer).digest('hex')
    const newId = randomUUID()
    const now = new Date().toISOString()
    const newVersion = (doc.version || 1) + 1
    run('INSERT INTO documentos VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [newId, doc.casoId, doc.titulo, data.filename, doc.tipo, data.mimetype, buffer.length, ruta, newVersion, hash, 'procesado', 1, now, now])
    const contenido = buffer.slice(0, 4000).toString('utf-8')
    const chunkId = randomUUID()
    run('INSERT INTO chunks VALUES (?,?,?,?,?,?,?)', [chunkId, newId, doc.casoId, contenido, 0, JSON.stringify(vectorStore.embed(contenido)), now])
    audit(user.id, 'NEW_VERSION', 'documentos', { oldId: id, newId, version: newVersion }, req.ip)
    return { id: newId, version: newVersion }
  })

  app.get('/documentos/:id/download', async (req, reply) => {
    const { id } = req.params as any
    const doc = get('SELECT * FROM documentos WHERE id=?', [id]) as any
    if (!doc || !doc.ruta) return reply.code(404).send({ error: 'Sin archivo' })
    const { readFile } = await import('../../infrastructure/storage/localStorage.js')
    const buf = readFile(doc.ruta)
    if (!buf) return reply.code(404).send({ error: 'Archivo no encontrado en disco' })
    reply.header('Content-Type', doc.mime || 'application/octet-stream')
    reply.header('Content-Disposition', `attachment; filename="${doc.titulo}"`)
    return reply.send(buf)
  })
}
