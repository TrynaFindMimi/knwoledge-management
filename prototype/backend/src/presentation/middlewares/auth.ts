import type { FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'km-rag-super-secret-local-32chars!'
const JWT_EXPIRES = '30m'
const REFRESH_EXPIRES = '7d'

export interface JwtPayload { id: string; email: string; rol: string; nombre: string }

export function signAccess(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })
}
export function signRefresh(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_EXPIRES })
}
export function verify(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
}

export async function authGuard(req: FastifyRequest, reply: FastifyReply) {
  const header = req.headers.authorization
  const token = header?.replace('Bearer ', '') || (req.cookies as any)?.accessToken
  if (!token) {
    return reply.code(401).send({ error: 'No autenticado', code: 'UNAUTHORIZED' })
  }
  try {
    const payload = verify(token)
    ;(req as any).user = payload
  } catch {
    return reply.code(401).send({ error: 'Token expirado o invalido', code: 'TOKEN_EXPIRED' })
  }
}

export function requireRole(...roles: string[]) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user as JwtPayload
    if (!user || !roles.includes(user.rol)) {
      return reply.code(403).send({ error: 'Permiso denegado', code: 'FORBIDDEN' })
    }
  }
}

import { run } from '../../infrastructure/db/sqlite.js'
import { randomUUID } from 'node:crypto'
let lastHash = '0'
export function audit(userId: string | null, accion: string, recurso: string, detalle?: any, ip?: string) {
  try {
    const id = randomUUID()
    const createdAt = new Date().toISOString()
    const payload = JSON.stringify({ accion, recurso, detalle, prev: lastHash })
    const hash = Buffer.from(payload).toString('base64').slice(0, 32)
    run('INSERT INTO auditoria VALUES (?,?,?,?,?,?,?,?,?)', [id, userId, accion, recurso, detalle ? JSON.stringify(detalle) : null, ip || null, hash, lastHash, createdAt])
    lastHash = hash
  } catch {}
}

const loginAttempts = new Map<string, { count: number; until: number }>()
export function checkLoginBlock(email: string): boolean {
  const rec = loginAttempts.get(email)
  if (rec && rec.count >= 3 && Date.now() < rec.until) return true
  if (rec && Date.now() >= rec.until) loginAttempts.delete(email)
  return false
}
export function recordLoginFail(email: string) {
  const rec = loginAttempts.get(email) || { count: 0, until: 0 }
  rec.count++
  if (rec.count >= 3) rec.until = Date.now() + 15 * 60 * 1000
  loginAttempts.set(email, rec)
}
export function clearLoginFail(email: string) { loginAttempts.delete(email) }