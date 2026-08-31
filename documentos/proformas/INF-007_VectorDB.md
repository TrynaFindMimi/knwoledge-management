# PROFORMA INF-007 — Vector DB (Chroma / pgvector / Pinecone)

**Fecha:** 30/08/2026
**Concepto:** Busqueda semantica <3s (HNSW)

| Opcion | Costo | Nota |
|--------|-------|------|
| ChromaDB self-host (Railway) | USD 0 | Recomendado, HNSW tuning 768d |
| pgvector (Postgres) | USD 0 | Si Postgres unico, indice HNSW |
| Pinecone Starter | USD 70 /mes | Managed, solo si Buffet aprueba escala >10k docs |

**Recomendacion:** Chroma o pgvector (costo 0) cubre 5k docs, 10 concurrentes. Pinecone solo con adenda.
