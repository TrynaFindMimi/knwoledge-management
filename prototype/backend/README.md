# Backend KM RAG — FastAPI (Python) o Fastify (Node) — ver Manual Tecnico Seccion 2.1
Stack elegido segun Sprint 1: Python si RAG nativo domina (LangChain), Node si CRUD domina. Este scaffold es Fastify (Node) equivalente a FastAPI:
- REST /api/* + WebSocket /ws/chat + /ws/notificaciones
- RBAC canAccess(docId, chunkId, role) + JWT 30m + refresh 7d
- Chunk 500/100 -> embed 768d -> Chroma/pgvector HNSW -> rerank -> LLM citas
Ver `prototype/manuales/Manual_Tecnico_KM_RAG.md` Seccion 4 (APIs) y Seccion 8 (seguridad).
