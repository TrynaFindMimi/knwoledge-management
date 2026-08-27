# PROFORMA N.º INF-005 / INF-006 / INF-007

## BASES DE DATOS — PostgreSQL / MongoDB / Vector DB (ChromaDB/pgvector/Pinecone)

---

**EMPRESA EMISORA:** Equipo de Desarrollo KM RAG

**CLIENTE:** Buffet de Asistencia Familiar — La Paz, Bolivia

**FECHA EMISIÓN:** 27/08/2026

**VALIDEZ:** 30 días

**N.º PROFORMA:** INF-005 (PostgreSQL) / INF-006 (MongoDB) / INF-007 (Vector)

---

### 1. OBJETO

Cotización **bases de datos** para KM RAG con **criterio SQL vs Mongo vs híbrido** según contenido (TDR §8.2, Plan Sprint 1 día 5).

### 2. CRITERIO ELECCIÓN (Decisión Sprint 1)

| Escenario contenido | Elección | Por qué | Costo |
|---------------------|----------|---------|-------|
| Casos/audiencias/alertas esquema estable, ACID, JOINs, auditoría inmutable | **PostgreSQL 15 (Railway) + pgvector** (INF-005) | Transaccional, RLS, `pgvector` HNSW index integrado, sin infra extra | **US$ 0 extra** (incluido Railway INF-004) |
| Documentos metadatos variables (violencia: `medidaProteccion`, `comisaria`, `riesgo`, `victima.direccion` cifrada) | **MongoDB Atlas** (INF-006) | Esquema flexible, agregación, docs anidados | **US$ 0 free (512 MB)** |
| Mixto real Buffet (recomendado) | **Híbrido: Postgres (transaccional casuística) + Mongo (docs flexibles) + Chroma/pgvector (vectores)** | Mejor ACID + flexibilidad | **US$ 0–9** (Mongo free cubre S1–S4) |
| Vector managed escala >10k docs | **Pinecone Starter** (INF-007) | Managed, sin self-host | US$ 70/mes (solo si Buffet aprueba) |

**Si duda S1:** arrancar **Postgres+pgvector** (cubre 80%) y añadir Mongo después sin migración costosa (add collection).

### 3. DETALLE

| Código | Producto | Free tier | Pago | Uso proyecto |
|--------|----------|-----------|------|--------------|
| **INF-005** | PostgreSQL 15 (Railway Postgres) | 1 GB (incluido Railway) | US$ 0 extra Starter; Pro 10GB US$ 10/mes | `usuarios`, `casos`, `audiencias`, `alertas`, `auditoria` (inmutable), `pgvector` si se elige |
| **INF-006** | MongoDB Atlas (M0/M10) | **M0 free 512 MB** | M10 US$ 9/mes (2GB) | `documentos` collection + `metadata` variable + `chunks` + `versiones` si híbrido |
| **INF-007A** | ChromaDB (self-host Railway) | **US$ 0** (self-host) | US$ 0 | Vector store `buffetkm` (Railway Volume) — **recomendado free** |
| **INF-007B** | pgvector (ext Postgres) | **US$ 0** (extensión) | US$ 0 | Alternativa vector en mismo Postgres (HNSW) |
| **INF-007C** | Pinecone Starter | US$ 70/mes | US$ 70 | Solo si 10k+ docs o Buffet quiere managed — requiere adenda |

### 4. COSTO 4 MESES + 1 AÑO (recomendado Híbrido free)

| N.º | Descripción | 4 meses | 12 meses |
|-----|-------------|---------|----------|
| 1 | PostgreSQL (Railway) | **US$ 0** (incluido INF-004) | US$ 0 |
| 2 | MongoDB Atlas M0 free (si híbrido, S1–S4) | **US$ 0** | US$ 0 |
| 3 | ChromaDB / pgvector (self-host) | **US$ 0** | US$ 0 |
| — | *Opción escala* MongoDB M10 + Pinecone | US$ 79/mes → US$ 316 /4m (~Bs 3,476) | US$ 948/año |
| — | *Embeddings* `sentence-transformers` local vs `text-embedding-3-large` | **US$ 0** (local) vs ~US$ 5–20 (OpenAI 5000 docs) | — |

### 5. CONDICIONES

| Condición | Detalle |
|-----------|---------|
| **Decisión** | Sprint 1 día 5 con PO Buffet — matriz criterio arriba |
| **Titularidad** | Buffet (Atlas/Railway) o equipo con handover keys (no en repo) |
| **Límite** | Free tiers cubren 4 meses con 100 docs/mes (5000 docs); escalado pago solo con aprobación per Contrato Cl. 3.2 — sin bloquear E4/E5 si disputa (Cl. 1) |
| **Seguridad** | Postgres RLS + Mongo Atlas IP whitelist + `AES_KEY` env cifrado (S03), backups AES daily (S04) |
| **Recomendación** | **Híbrido free: Postgres (Railway) + Mongo M0 + Chroma/pgvector** — US$ 0, cubre 16 sem; escalar a pago solo con adenda si Buffet valida >5000 docs |

---
