import type { FastifyInstance } from 'fastify'
import { query, run } from '../../infrastructure/db/sqlite.js'
import { authGuard } from '../middlewares/auth.js'

export async function notificacionesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authGuard as any)

  app.get('/notificaciones', async (req) => {
    const user = (req as any).user
    const rows = query('SELECT * FROM notificaciones WHERE usuarioId=? ORDER BY createdAt DESC LIMIT 100', [user.id])
    for (const r of rows as any[]) try { r.meta = r.meta ? JSON.parse(r.meta) : null } catch {}
    const noLeidas = rows.filter((r:any)=> !r.leida).length
    return { notificaciones: rows, noLeidas, total: rows.length }
  })

  app.patch('/notificaciones/:id/leida', async (req, reply) => {
    const { id } = req.params as any
    const user = (req as any).user
    run('UPDATE notificaciones SET leida=1 WHERE id=? AND usuarioId=?', [id, user.id])
    return { ok:true }
  })

  app.post('/notificaciones/leer-todas', async (req) => {
    const user = (req as any).user
    run('UPDATE notificaciones SET leida=1 WHERE usuarioId=?', [user.id])
    return { ok:true }
  })

  app.get('/notificaciones/resumen', async (req) => {
    const user = (req as any).user
    const audiencias = query('SELECT * FROM audiencias WHERE fecha >= date("now") ORDER BY fecha ASC LIMIT 5')
    for (const a of audiencias as any[]) try { a.checklist=JSON.parse(a.checklist)} catch {}
    const notifs = query('SELECT COUNT(*) as c FROM notificaciones WHERE usuarioId=? AND leida=0', [user.id])
    return { audiencias, noLeidas: (notifs[0] as any)?.c || 0, generado: new Date().toISOString() }
  })
}
