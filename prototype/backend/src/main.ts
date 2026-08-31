import Fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import websocket from '@fastify/websocket'
import helmet from '@fastify/helmet'

const app = Fastify({ logger: true })
await app.register(cors, { origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true })
await app.register(helmet, { contentSecurityPolicy: false })
await app.register(multipart, { limits: { fileSize: 50*1024*1024 } })
await app.register(websocket)

app.get('/api/health', async()=>({ status:'ok', db:'pg', vector:'chroma', llm:'gpt-4o-mini', uptime: process.uptime() }))
app.get('/api/casos', async()=>({ casos: [] }))
app.post('/api/casos', async(req)=>({ id: 'uuid', ...req.body as any }))

app.listen({ port: 3000, host: '0.0.0.0' }).then(()=> app.log.info('Backend KM RAG on 3000 — Fastify + pgvector + Chroma — ver prototype/manuales/Manual_Tecnico_KM_RAG.md'))
