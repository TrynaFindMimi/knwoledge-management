import type { FastifyInstance } from 'fastify'
import { query, get, run } from '../../infrastructure/db/sqlite.js'
import { authGuard, audit } from '../middlewares/auth.js'
import { randomUUID } from 'node:crypto'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'km-rag-super-secret-local-32chars!'

export async function compartirRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authGuard as any)

  app.post('/compartir/link', async (req, reply) => {
    const user = (req as any).user
    const { documentoId, casoId, expiracion, destinatario, permisos } = req.body as any
    if (!documentoId && !casoId) return reply.code(400).send({ error: 'documentoId o casoId requerido' })
    const expHours = expiracion === '1h' ? 1 : expiracion === '72h' ? 72 : 24
    const token = jwt.sign({ documentoId, casoId, destinatario }, JWT_SECRET, { expiresIn: `${expHours}h` })
    const id = randomUUID()
    const now = new Date().toISOString()
    const expiracionDate = new Date(Date.now() + expHours*3600*1000).toISOString()
    run('INSERT INTO compartir VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [id, documentoId||null, casoId||null, token, expiracionDate, 1, 0, permisos||'lectura', user.id, destinatario||null, destinatario||null, now, 0])
    audit(user.id, 'CREATE_SHARE', 'compartir', { id, documentoId, expiracion }, req.ip)
    return { id, token, url: `/compartir/${token}`, expiracion: expiracionDate, singleUse: true }
  })

  app.get('/compartir/:token', async (req, reply) => {
    const { token } = req.params as any
    const row = get('SELECT * FROM compartir WHERE token=?', [token]) as any
    if (!row) return reply.code(404).send({ error: 'Enlace no encontrado' })
    if (row.revoked) return reply.code(410).send({ error: 'Enlace revocado' })
    if (row.usado && row.singleUse) return reply.code(410).send({ error: 'Enlace ya usado (single-use)' })
    if (new Date(row.expiracion) < new Date()) return reply.code(410).send({ error: 'Enlace expirado' })
    try { jwt.verify(token, JWT_SECRET) } catch { return reply.code(410).send({ error: 'Token expirado' })}
    if (row.documentoId) {
      const doc = get('SELECT * FROM documentos WHERE id=?', [row.documentoId])
      if (!doc) return reply.code(404).send({ error: 'Documento no encontrado' })
      if (row.singleUse) run('UPDATE compartir SET usado=1 WHERE id=?', [row.id])
      audit(null, 'ACCESS_SHARE', 'compartir', { token: token.slice(0,12), ip: req.ip }, req.ip)
      return { documento: doc, permisos: row.permisos, watermark: row.watermark, expiracion: row.expiracion }
    }
    return { casoId: row.casoId, permisos: row.permisos }
  })

  app.post('/compartir/:token/revoke', async (req, reply) => {
    const { token } = req.params as any
    const user = (req as any).user
    const row = get('SELECT * FROM compartir WHERE token=?', [token]) as any
    if (!row) return reply.code(404).send({ error: 'No encontrado' })
    if (row.creadoPor !== user.id && user.rol !== 'admin') return reply.code(403).send({ error: 'Solo creador o admin' })
    run('UPDATE compartir SET revoked=1 WHERE id=?', [row.id])
    audit(user.id, 'REVOKE_SHARE', 'compartir', { id: row.id }, req.ip)
    return { ok:true, revoked: true }
  })

  app.get('/compartir', async (req) => {
    const user = (req as any).user
    const rows = query('SELECT id,documentoId,casoId,expiracion,usado,revoked,createdAt FROM compartir WHERE creadoPor=? ORDER BY createdAt DESC', [user.id])
    return { links: rows }
  })
}
