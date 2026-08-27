# PROFORMA N.º INF-004

## HOSTING RAILWAY — BACKEND RAG + DB + Cron + Storage

---

**EMPRESA EMISORA:** Equipo de Desarrollo KM RAG

**CLIENTE:** Buffet de Asistencia Familiar — La Paz, Bolivia

**FECHA EMISIÓN:** 27/08/2026

**VALIDEZ:** 30 días

**N.º PROFORMA:** INF-004

---

### 1. OBJETO

Hosting **backend API (FastAPI/Express) + RAG (LangChain/LlamaIndex) + PostgreSQL/MongoDB + ChromaDB/pgvector + Redis/BullMQ + Railway Volumes + Cron + env cifradas** en **Railway** — todo-en-uno para RAG, sin fragmentar infra.

### 2. CARACTERÍSTICAS

| Componente | Starter (recomendado) | Pro (si escala >5000 docs) |
|------------|------------------------|----------------------------|
| **Precio** | **US$ 5 / mes** (pay-as-you-go) | US$ 20 / mes + uso |
| **vCPU/RAM** | 0.5 vCPU / 1 GB | 2 vCPU / 4 GB (escalable) |
| **PostgreSQL** | Railway Postgres incluido (1 GB) | Hasta 10 GB |
| **Volumes** | 1 GB Volumes + S3 5GB free | 10 GB |
| **Vector DB** | Chroma self-host (0) o pgvector (Postgres) | Pinecone si Buffet aprueba (INF-007) |
| **Cron** | Railway Cron / BullMQ (alertas 48h/7d/8AM) | Igual |
| **SSL** | Let's Encrypt proxy auto, TLS 1.3 | Igual (INF-SSL-001) |
| **Env cifradas** | `AES_KEY`, `JWT_SECRET`, `CHROMA_TOKEN` no en repo | Igual |
| **Monitoreo** | Railway Metrics + logs | Sentry + UptimeRobot externo |
| **Soporte** | Community + Discord | Email prioritario |

### 3. DETALLE COSTO 4 MESES + 1 AÑO

| N.º | Descripción | Unidad | Precio | Subtotal 4 meses | Subtotal 12 meses |
|-----|-------------|--------|--------|------------------|-------------------|
| 1 | Railway Starter — API+RAG+PG+Volumes+Cron | 4 meses | US$ 5 / mes | **US$ 20** (~Bs 220) | US$ 60 (~Bs 660) |
| 2 | Storage extra Volumes (5000 docs × 50MB ≈ 5GB) | 4 meses | Incluido Starter (1GB) + S3 free 5GB | **US$ 0** | US$ 0 |
| — | *Opción escala* Railway Pro (2vCPU/4GB, 10GB) | 4 meses | US$ 20 / mes | US$ 80 (~Bs 880) | US$ 240 (~Bs 2,640) |

*Estimado Starter cubre 16 sem + garantía si Chroma/pgvector free + sentence-transformers local (sin Pinecone/OpenAI pago). Ver INF-007.*

### 4. USO POR SPRINT

| Sprint | Uso Railway | Verificación |
|--------|-------------|--------------|
| S1 | `railway init` + Postgres + env `AES_KEY/JWT_SECRET`, deploy staging `railway up`, health `/health` | Staging OK |
| S2 | Auth + casos API, RLS Postgres, inmutable auditoría | E2E auth pass |
| S3 | Volumes/S3 50MB, chunk+embed+Chroma index | Docs indexados |
| S4 | RAG retrieval+LLM, cache Redis | <3s p95 |
| S5 | Cron 48h/24h/2h/7d + Resumen 8AM (BullMQ) | Alerta llega |
| S6 | JWT watermark, S03 AES campo, logs inmutables | 403 test |
| S7 | QA staging Railway, ZAP + k6 | 0 high |
| S8 | `railway domain` prod + `railway env` prod cifradas, backup + metrics | Prod A+ + 99.5% |
| Garantía | Metrics + restore test quincenal | <30 min |

### 5. CONDICIONES

| Condición | Detalle |
|-----------|---------|
| **Titularidad** | Buffet (cuenta Railway) o equipo con handover (Manual Despliegue §3) |
| **Pago** | Tarjeta internacional o PayPal; consumo medido — Starter US$5/mes real según uso |
| **Límite** | Starter US$5 cubre 4 meses con 5000 docs free vector; escalado Pro/adenda solo con aprobación Buffet per Contrato Cl. 3.2 |
| **Incluye** | API, PG, Volumes, Cron, vector (Chroma/pgvector), SSL (INF-SSL-001), metrics, rollback |
| **No incluye** | Dominio (INF-001/002), Vercel frontend (INF-003), Pinecone/LLM pago (INF-007), Mongo Atlas si híbrido (INF-005/006) |
| **Recomendación** | **Starter US$5/mes (US$20/4mes)** — cubre proyecto; Pro solo si >5000 docs o 10+ concurrentes → adenda |

---
