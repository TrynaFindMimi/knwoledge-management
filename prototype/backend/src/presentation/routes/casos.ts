import type { FastifyInstance } from 'fastify'
import { query, get, run } from '../../infrastructure/db/sqlite.js'
import { authGuard, audit } from '../middlewares/auth.js'
import { randomUUID } from 'node:crypto'

export async function casosRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authGuard as any)

  app.get('/casos', async (req) => {
    const { tipo, estado, q, page='1', pageSize='20', sort } = req.query as any
    let sql = 'SELECT * FROM casos WHERE 1=1'
    const params: any[]=[]

    if (tipo) { sql += ' AND tipo = ?'; params.push(tipo) }
    if (estado) { sql += ' AND estado = ?'; params.push(estado) }
    if (q) { sql += ' AND (titulo LIKE ? OR cliente LIKE ? OR codigo LIKE ?)'; const like=`%${q}%`; params.push(like,like,like) }

    const user = (req as any).user
    let rows = query(sql, params)
    if (user.rol === 'abogado') {
      rows = rows.filter((r:any)=> {
        try { const a=JSON.parse(r.asignados||'[]'); return a.includes(user.id) || r.creadoPor===user.id } catch { return r.creadoPor===user.id }
      })
    }
    for (const r of rows) {
      const docs = query('SELECT COUNT(*) as c FROM documentos WHERE casoId=?', [r.id])
      r.documentosCount = docs[0]?.c || 0
      const aud = query('SELECT fecha FROM audiencias WHERE casoId=? ORDER BY fecha ASC LIMIT 1', [r.id])
      r.proximaAudiencia = aud[0]?.fecha || null
      try { r.asignados = JSON.parse(r.asignados) } catch {}
    }
    rows.sort((a:any,b:any)=> (a.proximaAudiencia||'9999').localeCompare(b.proximaAudiencia||'9999'))
    const p = Math.max(1, parseInt(page))
    const ps = Math.min(100, parseInt(pageSize))
    const total = rows.length
    const slice = rows.slice((p-1)*ps, p*ps)
    return { casos: slice, total, page: p, pageSize: ps }
  })

  app.post('/casos', async (req, reply) => {
    const user = (req as any).user
    const { titulo, cliente, tipo, descripcion, urgente } = req.body as any
    if (!titulo || !cliente || !tipo) return reply.code(400).send({ error: 'titulo, cliente y tipo requeridos' })
    const id = randomUUID()
    const codigo = `CASO-${new Date().getFullYear()}-${tipo.slice(0,3).toUpperCase()}-${id.slice(0,4).toUpperCase()}`
    const now = new Date().toISOString()
    run('INSERT INTO casos VALUES (?,?,?,?,?,?,?,?,?,?,?)', [id, codigo, titulo, cliente, tipo, 'activo', descripcion||'', user.id, JSON.stringify([user.id]), now, now])
    audit(user.id, 'CREATE_CASO', 'casos', { id, codigo }, req.ip)
    run('INSERT INTO notificaciones VALUES (?,?,?,?,?,?,?,?)', [randomUUID(), user.id, 'caso', `Caso creado: ${titulo}`, cliente, 0, JSON.stringify({ casoId:id }), now])
    return reply.code(201).send({ id, codigo, titulo, cliente, tipo, estado:'activo', createdAt: now })
  })

  app.get('/casos/:id', async (req, reply) => {
    const { id } = req.params as any
    const caso = get('SELECT * FROM casos WHERE id=?', [id])
    if (!caso) return reply.code(404).send({ error: 'Caso no encontrado' })
    try { caso.asignados = JSON.parse(caso.asignados) } catch {}
    caso.documentos = query('SELECT * FROM documentos WHERE casoId=? ORDER BY createdAt DESC', [id])
    caso.audiencias = query('SELECT * FROM audiencias WHERE casoId=? ORDER BY fecha ASC', [id])
    for (const a of caso.audiencias) try { a.checklist = JSON.parse(a.checklist) } catch {}
    caso.chunksCount = query('SELECT COUNT(*) as c FROM chunks WHERE casoId=?', [id])[0]?.c || 0
    return caso
  })

  app.patch('/casos/:id/estado', async (req, reply) => {
    const { id } = req.params as any
    const { estado } = req.body as any
    if (!['activo','en audiencia','cerrado'].includes(estado)) return reply.code(400).send({ error: 'Estado invalido' })
    const user = (req as any).user
    if (user.rol==='asistente') return reply.code(403).send({ error: 'Asistente no puede cambiar estado' })
    const caso = get('SELECT * FROM casos WHERE id=?', [id])
    if (!caso) return reply.code(404).send({ error: 'No existe' })
    run('UPDATE casos SET estado=?, updatedAt=? WHERE id=?', [estado, new Date().toISOString(), id])
    audit(user.id, 'CHANGE_ESTADO', 'casos', { id, estado }, req.ip)
    return { ok:true, estado }
  })

  app.get('/casos/:id/timeline', async (req,reply) => {
    const { id } = req.params as any
    const docs = query('SELECT id,titulo,version,createdAt FROM documentos WHERE casoId=? ORDER BY createdAt ASC', [id])
    const audits = query('SELECT accion,createdAt,detalle FROM auditoria WHERE recurso=? OR detalle LIKE ? ORDER BY createdAt ASC', ['casos', `%"${id}"%`])
    return { timeline: [...docs.map((d:any)=>({ tipo:'documento', ...d })), ...audits.map((a:any)=>({ tipo:'auditoria', ...a }))] }
  })
}