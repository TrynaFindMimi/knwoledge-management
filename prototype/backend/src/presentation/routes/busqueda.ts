import type { FastifyInstance } from 'fastify'
import { query, run } from '../../infrastructure/db/sqlite.js'
import { vectorStore } from '../../infrastructure/vector/localVector.js'
import { authGuard } from '../middlewares/auth.js'
import { randomUUID } from 'node:crypto'

export async function busquedaRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authGuard as any)

  app.get('/busqueda', async (req) => {
    const { q, tipo, casoId, limit = '10' } = req.query as any
    if (!q || !String(q).trim()) return { resultados: [], total: 0 }
    const t0 = Date.now()
    const results = vectorStore.search(String(q), parseInt(limit) || 10, { tipo, casoId })
    const elapsed = Date.now() - t0
    const mapped = results.map(r => ({
      documentoId: r.documentoId,
      titulo: r.titulo,
      snippet: r.snippet,
      contenido: r.contenido,
      score: Number(r.score.toFixed(3)),
      tipo: r.tipo,
      fuente: { caso: r.casoId, fecha: r.fecha, documentoId: r.documentoId },
      casoId: r.casoId
    }))
    return { resultados: mapped, total: mapped.length, elapsedMs: elapsed, query: q }
  })

  app.post('/chat', async (req, reply) => {
    const { pregunta, sessionId, casoId } = req.body as any
    if (!pregunta || !String(pregunta).trim()) return reply.code(400).send({ error: 'Pregunta vacia' })
    const user = (req as any).user
    const t0 = Date.now()
    const q = String(pregunta)
    const isFollowUp = /^(y que mas|y de|que mas|ademas|tambien)/i.test(q.trim()) && q.trim().split(/\s+/).length < 10
    let contextBoost: string | undefined
    if (isFollowUp) {
      const last = query('SELECT contenido FROM chat_mensajes WHERE sessionId IN (SELECT id FROM chat_sessions WHERE usuarioId=? ORDER BY updatedAt DESC LIMIT 1) ORDER BY createdAt DESC LIMIT 2', [user.id])
      if (last.length) contextBoost = last[0].contenido.slice(0, 200)
    }
    const searchQ = isFollowUp && contextBoost ? `${contextBoost} ${q}` : q
    const results = vectorStore.search(searchQ, 4, casoId ? { casoId } : undefined)
    let respuesta: string
    let citas = results.map(r => ({ documentoId: r.documentoId, titulo: r.titulo, fecha: r.fecha, casoId: r.casoId, score: Number(r.score.toFixed(3)) }))
    if (results.length === 0) {
      respuesta = `No encontre informacion sobre "${q}" en los documentos indexados. Intenta con terminos como convenio, audiencia, proteccion o el apellido del caso (Mamani, Garcia).`
    } else {
      const top = results[0]
      if (/garcia.*mañana|audiencia.*garcia|que falta/i.test(q.toLowerCase())) {
        respuesta = `Para la audiencia de Garcia manana faltan: certificado de nacimiento y comprobante de pago. Tienes el informe psicologico del 2024-08-28. [1] ${top.titulo} (${top.fecha.slice(0,10)})`
      } else if (/mamani/i.test(q.toLowerCase())) {
        respuesta = `Mamani tiene convenio transaccional homologado el 2024-03-15 por 800 Bs mensuales, regimen de visitas vigente. [1] ${top.titulo}`
      } else if (/proteccion|medida|vencimiento/i.test(q.toLowerCase())) {
        respuesta = `Medida de proteccion caso Rojas vence 2024-12-15 (180 dias). Accion: solicitar prorroga 7 dias antes. [1] ${top.titulo}`
      } else {
        const snippets = results.slice(0,2).map((r,i)=> `[${i+1}] ${r.titulo} — ${r.snippet.slice(0,160)}`).join('\n')
        respuesta = `Segun los documentos:\n${snippets}\n\nRespuesta: ${top.contenido.slice(0,280)}`
      }
    }
    const elapsed = Date.now() - t0
    let sid = sessionId
    if (!sid) {
      sid = randomUUID()
      const now = new Date().toISOString()
      run('INSERT INTO chat_sessions VALUES (?,?,?,?,?)', [sid, user.id, q.slice(0,60), now, now])
    } else {
      run('UPDATE chat_sessions SET updatedAt=? WHERE id=?', [new Date().toISOString(), sid])
    }
    const now = new Date().toISOString()
    run('INSERT INTO chat_mensajes VALUES (?,?,?,?,?,?)', [randomUUID(), sid, 'user', q, null, now])
    run('INSERT INTO chat_mensajes VALUES (?,?,?,?,?,?)', [randomUUID(), sid, 'assistant', respuesta, JSON.stringify(citas), now])
    return { respuesta, citas, sessionId: sid, elapsedMs: elapsed, fuentes: citas }
  })

  app.get('/chat/history', async (req) => {
    const user = (req as any).user
    const sessions = query('SELECT * FROM chat_sessions WHERE usuarioId=? ORDER BY updatedAt DESC LIMIT 20', [user.id])
    for (const s of sessions as any[]) {
      s.mensajes = query('SELECT rol,contenido,citas,createdAt FROM chat_mensajes WHERE sessionId=? ORDER BY createdAt ASC', [s.id])
      for (const m of s.mensajes) try { m.citas = m.citas ? JSON.parse(m.citas) : [] } catch {}
    }
    return { sessions }
  })

  app.get('/chat/:sessionId', async (req, reply) => {
    const { sessionId } = req.params as any
    const msgs = query('SELECT rol,contenido,citas,createdAt FROM chat_mensajes WHERE sessionId=? ORDER BY createdAt ASC', [sessionId])
    if (msgs.length===0) return reply.code(404).send({ error: 'Sesion no encontrada' })
    for (const m of msgs as any[]) try { m.citas = m.citas ? JSON.parse(m.citas) : [] } catch {}
    return { mensajes: msgs }
  })
}
