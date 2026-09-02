import Fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import websocket from '@fastify/websocket'
import helmet from '@fastify/helmet'
import cookie from '@fastify/cookie'

import { initSqlite } from './infrastructure/db/sqlite.js'
import { initNosql } from './infrastructure/db/nosql.js'
import { vectorStore } from './infrastructure/vector/localVector.js'
import { seed } from './infrastructure/db/seed.js'
import { authRoutes } from './presentation/routes/auth.js'
import { casosRoutes } from './presentation/routes/casos.js'
import { documentosRoutes } from './presentation/routes/documentos.js'
import { busquedaRoutes } from './presentation/routes/busqueda.js'
import { audienciasRoutes } from './presentation/routes/audiencias.js'
import { compartirRoutes } from './presentation/routes/compartir.js'
import { notificacionesRoutes } from './presentation/routes/notificaciones.js'

const app = Fastify({ logger: true })

await app.register(cookie)
await app.register(cors, { origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true })
await app.register(helmet, { contentSecurityPolicy: false })
await app.register(multipart, { limits: { fileSize: 50 * 1024 * 1024 } })
await app.register(websocket)

initSqlite()
initNosql()
vectorStore.load()
await seed()

app.get('/api/health', async () => ({
  status: 'ok',
  db: 'sqlite:local',
  nosql: 'json:local',
  vector: 'local:384d',
  llm: 'local-template',
  uptime: process.uptime(),
  docs: vectorStore.count()
}))

await app.register(async (r) => { await authRoutes(r) }, { prefix: '/api' })
await app.register(async (r) => { await casosRoutes(r) }, { prefix: '/api' })
await app.register(async (r) => { await documentosRoutes(r) }, { prefix: '/api' })
await app.register(async (r) => { await busquedaRoutes(r) }, { prefix: '/api' })
await app.register(async (r) => { await audienciasRoutes(r) }, { prefix: '/api' })
await app.register(async (r) => { await compartirRoutes(r) }, { prefix: '/api' })
await app.register(async (r) => { await notificacionesRoutes(r) }, { prefix: '/api' })

app.get('/api/export/caso/:id/zip', async (req, reply) => {
  const { id } = req.params as any
  const { query } = await import('./infrastructure/db/sqlite.js')
  const docs = query('SELECT titulo,tipo FROM documentos WHERE casoId=?', [id])
  return { casoId: id, archivos: docs.length, indice: docs, zip: `caso-${id}.zip (simulado local)` }
})

app.setErrorHandler((err, _req, reply) => {
  app.log.error(err)
  reply.code(500).send({ error: err.message || 'Error interno' })
})

const port = Number(process.env.PORT || 3000)
app.listen({ port, host: '0.0.0.0' }).then(() => {
  app.log.info(`Backend KM RAG local en ${port} — SQLite + NoSQL JSON + Vector local`)
})
