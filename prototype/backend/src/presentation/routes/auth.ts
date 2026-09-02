import type { FastifyInstance } from 'fastify'
import bcrypt from 'bcryptjs'
import { query, get, run } from '../../infrastructure/db/sqlite.js'
import { signAccess, signRefresh, verify, checkLoginBlock, recordLoginFail, clearLoginFail, audit } from '../middlewares/auth.js'
import { randomUUID } from 'node:crypto'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/login', async (req, reply) => {
    const { email, password } = req.body as any
    if (!email || !password) return reply.code(400).send({ error: 'Email y password requeridos' })
    if (checkLoginBlock(email)) return reply.code(429).send({ error: 'Bloqueado por 15 min tras 3 intentos fallidos' })

    const user = get('SELECT * FROM usuarios WHERE email = ?', [email])
    if (!user) {
      recordLoginFail(email)
      audit(null, 'LOGIN_FAIL', 'auth', { email }, req.ip)
      return reply.code(401).send({ error: 'Credenciales invalidas' })
    }
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) {
      recordLoginFail(email)
      audit(user.id, 'LOGIN_FAIL', 'auth', { email }, req.ip)
      return reply.code(401).send({ error: 'Credenciales invalidas' })
    }
    if (user.estado !== 'activo') return reply.code(403).send({ error: 'Usuario inactivo' })

    clearLoginFail(email)
    const payload = { id: user.id, email: user.email, rol: user.rol, nombre: user.nombre }
    const accessToken = signAccess(payload)
    const refreshToken = signRefresh(payload)
    reply.setCookie('refreshToken', refreshToken, { path: '/', httpOnly: true, sameSite: 'lax', maxAge: 7*24*3600 })
    audit(user.id, 'LOGIN_OK', 'auth', { email }, req.ip)
    return { accessToken, refreshToken, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } }
  })

  app.post('/auth/refresh', async (req, reply) => {
    const token = (req.cookies as any)?.refreshToken || (req.body as any)?.refreshToken
    if (!token) return reply.code(401).send({ error: 'Refresh requerido' })
    try {
      const payload = verify(token)
      const user = get('SELECT * FROM usuarios WHERE id = ?', [payload.id])
      if (!user) return reply.code(401).send({ error: 'Usuario no existe' })
      const newAccess = signAccess({ id: user.id, email: user.email, rol: user.rol, nombre: user.nombre })
      return { accessToken: newAccess }
    } catch {
      return reply.code(401).send({ error: 'Refresh invalido' })
    }
  })

  app.post('/auth/register', async (req, reply) => {
    const header = req.headers.authorization?.replace('Bearer ','')
    if (!header) return reply.code(401).send({ error: 'Admin requerido' })
    try {
      const p = verify(header)
      if (p.rol !== 'admin') return reply.code(403).send({ error: 'Solo admin' })
      const { nombre, email, password, rol } = req.body as any
      if (!nombre || !email || !password) return reply.code(400).send({ error: 'Faltan campos' })
      if (password.length < 12) return reply.code(400).send({ error: 'Password minimo 12 caracteres' })
      const exists = get('SELECT id FROM usuarios WHERE email=?', [email])
      if (exists) return reply.code(409).send({ error: 'Email ya existe' })
      const hash = await bcrypt.hash(password, 12)
      const id = randomUUID()
      const now = new Date().toISOString()
      run('INSERT INTO usuarios VALUES (?,?,?,?,?,?,?,?)', [id, nombre, email, hash, rol || 'abogado', 'activo', now, now])
      audit(p.id, 'CREATE_USER', 'usuarios', { email, rol }, req.ip)
      return { id, nombre, email, rol: rol || 'abogado' }
    } catch (e:any) { return reply.code(401).send({ error: 'Token invalido' })}
  })

  app.get('/auth/me', async (req, reply) => {
    const h = req.headers.authorization?.replace('Bearer ','')
    if (!h) return reply.code(401).send({ error: 'No token' })
    try {
      const p = verify(h)
      const u = get('SELECT id,nombre,email,rol,estado FROM usuarios WHERE id=?', [p.id])
      return { user: u }
    } catch { return reply.code(401).send({ error: 'Token invalido'})}
  })

  app.get('/usuarios', async (req, reply) => {
    const h = req.headers.authorization?.replace('Bearer ','')
    if (!h) return reply.code(401).send({ error: 'No token' })
    try {
      const p = verify(h)
      if (p.rol !== 'admin') return reply.code(403).send({ error: 'Solo admin' })
      const users = query('SELECT id,nombre,email,rol,estado,createdAt FROM usuarios ORDER BY createdAt DESC')
      return { usuarios: users }
    } catch { return reply.code(401).send({ error: 'Token invalido'})}
  })

  app.get('/auditoria', async (req, reply) => {
    const h = req.headers.authorization?.replace('Bearer ','')
    if (!h) return reply.code(401).send({ error: 'No token' })
    try {
      const p = verify(h)
      if (p.rol !== 'admin') return reply.code(403).send({ error: 'Solo admin' })
      const { desde, hasta } = req.query as any
      let sql = 'SELECT * FROM auditoria ORDER BY createdAt DESC LIMIT 200'
      let rows = query(sql)
      if (desde) rows = rows.filter((r:any)=> r.createdAt >= desde)
      if (hasta) rows = rows.filter((r:any)=> r.createdAt <= hasta)
      return { auditoria: rows }
    } catch { return reply.code(401).send({ error: 'Token invalido'})}
  })
}