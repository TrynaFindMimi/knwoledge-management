import type { FastifyInstance } from 'fastify'
import { query, get, run } from '../../infrastructure/db/sqlite.js'
import { authGuard, audit } from '../middlewares/auth.js'
import { randomUUID } from 'node:crypto'

function checklistFor(tipo: string) {
  if (tipo === 'prueba') return [{ item: 'Certificado nacimiento', estado: 'faltante' }, { item: 'Informe psicologico', estado: 'faltante' }, { item: 'Comprobante pago', estado: 'faltante' }]
  if (tipo === 'seguimiento') return [{ item: 'Convenio homologado', estado: 'tenido' }, { item: 'Comprobantes', estado: 'faltante' }]
  return [{ item: 'Demanda', estado: 'faltante' }, { item: 'Documentacion base', estado: 'faltante' }]
}

export async function audienciasRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authGuard as any)

  app.get('/audiencias', async (req) => {
    const { casoId, desde, hasta } = req.query as any
    let sql = 'SELECT * FROM audiencias WHERE 1=1'
    const params: any[] = []
    if (casoId) { sql += ' AND casoId=?'; params.push(casoId) }
    if (desde) { sql += ' AND fecha >= ?'; params.push(desde) }
    if (hasta) { sql += ' AND fecha <= ?'; params.push(hasta) }
    sql += ' ORDER BY fecha ASC'
    const rows = query(sql, params)
    for (const r of rows as any[]) try { r.checklist = JSON.parse(r.checklist) } catch {}
    return { audiencias: rows }
  })

  app.post('/audiencias', async (req, reply) => {
    const user = (req as any).user
    const { casoId, fecha, hora, juzgado, tipo, titulo } = req.body as any
    if (!casoId || !fecha || !hora || !juzgado || !tipo) return reply.code(400).send({ error: 'casoId, fecha, hora, juzgado y tipo requeridos' })
    const caso = get('SELECT id FROM casos WHERE id=?', [casoId])
    if (!caso) return reply.code(404).send({ error: 'Caso no encontrado' })
    const id = randomUUID()
    const now = new Date().toISOString()
    const checklist = checklistFor(tipo)
    const docs = query('SELECT titulo FROM documentos WHERE casoId=?', [casoId]) as any[]
    const docTitles = new Set(docs.map(d=>d.titulo.toLowerCase()))
    for (const c of checklist) {
      if ([...docTitles].some(t=> t.includes(c.item.toLowerCase().split(' ')[0]))) c.estado='tenido'
    }
    run('INSERT INTO audiencias VALUES (?,?,?,?,?,?,?,?,?,?,?)', [id, casoId, titulo||`Audiencia ${tipo} - ${fecha}`, fecha, hora, juzgado, tipo, 'programada', JSON.stringify(checklist), now, now])
    audit(user.id, 'CREATE_AUDIENCIA', 'audiencias', { id, casoId }, req.ip)
    run('INSERT INTO notificaciones VALUES (?,?,?,?,?,?,?,?)', [randomUUID(), user.id, 'audiencia', `Audiencia ${fecha} ${hora} - ${juzgado}`, titulo||tipo, 0, JSON.stringify({ casoId, audienciaId:id }), now])
    return reply.code(201).send({ id, casoId, fecha, hora, juzgado, tipo, checklist })
  })

  app.patch('/audiencias/:id/checklist', async (req, reply) => {
    const { id } = req.params as any
    const { checklist } = req.body as any
    if (!Array.isArray(checklist)) return reply.code(400).send({ error: 'checklist array requerido' })
    const aud = get('SELECT id FROM audiencias WHERE id=?', [id])
    if (!aud) return reply.code(404).send({ error: 'No encontrada' })
    run('UPDATE audiencias SET checklist=?, updatedAt=? WHERE id=?', [JSON.stringify(checklist), new Date().toISOString(), id])
    return { ok:true }
  })

  app.patch('/audiencias/:id', async (req, reply) => {
    const { id } = req.params as any
    const { estado, fecha, hora } = req.body as any
    const aud = get('SELECT id FROM audiencias WHERE id=?', [id])
    if (!aud) return reply.code(404).send({ error: 'No encontrada' })
    if (estado) run('UPDATE audiencias SET estado=?, updatedAt=? WHERE id=?', [estado, new Date().toISOString(), id])
    if (fecha) run('UPDATE audiencias SET fecha=?, updatedAt=? WHERE id=?', [fecha, new Date().toISOString(), id])
    if (hora) run('UPDATE audiencias SET hora=?, updatedAt=? WHERE id=?', [hora, new Date().toISOString(), id])
    return { ok:true }
  })

  app.delete('/audiencias/:id', async (req, reply) => {
    const { id } = req.params as any
    const aud = get('SELECT id FROM audiencias WHERE id=?', [id])
    if (!aud) return reply.code(404).send({ error: 'No encontrada' })
    run('DELETE FROM audiencias WHERE id=?', [id])
    return { ok:true }
  })
}
