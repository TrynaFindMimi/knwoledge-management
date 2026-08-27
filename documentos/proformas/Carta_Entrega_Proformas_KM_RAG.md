# CARTA DE ENTREGA DE PROFORMAS DE INFRAESTRUCTURA

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG — BUFFET DE ASISTENCIA FAMILIAR

---

**DE:** Equipo de Desarrollo — Santiago Acha (Tech Lead / Scrum Master), en nombre del Equipo (Mariana del Arroyo, Nahomi Humerez, Santiago Acha, Jorge Saenz)

**PARA:** Buffet de Asistencia Familiar (El Cliente)

**FECHA:** 27/08/2026

**ASUNTO:** Proformas de dominio, hosting (Vercel + Railway), bases de datos (PostgreSQL / MongoDB), vector DB y SSL/TLS (SCCL) para puesta en marcha y mantenimiento

**REFERENCIA:** `TDR_KM_RAG.md` §22 y `Plan_Proyecto_Cronograma_KM_RAG.md` §Carta de Proforma — Cláusula 3.2 Contrato (infra por cuenta del Buffet)

---

### 1. INTRODUCCIÓN

En nombre del Equipo Desarrollador, entrego formalmente el **paquete de proformas de infraestructura** necesario para el registro de dominio, despliegue **frontend Vercel + backend Railway con RAG**, bases de datos **PostgreSQL / MongoDB + ChromaDB/pgvector**, y **SSL/TLS (SCCL)**. Permite al Buffet decidir informadamente según presupuesto y preferencia **SQL vs Mongo vs híbrido** (decisión Sprint 1).

Todas las opciones usan **tiers gratuitos** prioritariamente; escalado a planes pagos requiere **aprobación escrita** del Buffet (Contrato Cl. 3.2).

---

### 2. DOCUMENTOS ENTREGADOS

| N.º | Documento | Contenido | Proforma |
|-----|-----------|-----------|----------|
| 1 | `Proforma_Dominio_KM_RAG.md` | Registro `buffetkm.bo` / `buffetkm.org.bo` (NIC Bolivia ADSIB) y `buffetkm.com` (GoDaddy) | **INF-001 / INF-002** |
| 2 | `Proforma_Vercel_Frontend.md` | Hosting **Vercel** (React+Vite+AntD) — Hobby vs Pro | **INF-003** |
| 3 | `Proforma_Railway_Backend.md` | Hosting **Railway** (API+RAG+Postgres+cron+volumes) — Starter vs Pro | **INF-004** |
| 4 | `Proforma_BaseDatos_MongoSQL.md` | **PostgreSQL (Railway)** + **MongoDB Atlas** + **ChromaDB/pgvector/Pinecone** — criterio SQL vs Mongo vs híbrido | **INF-005 / INF-006 / INF-007** |
| 5 | `Proforma_SSL_SCCL.md` | **SSL/TLS 1.3 (SCCL)** — Let's Encrypt (US$ 0) vs EV (US$ 50/año), HSTS, headers | **INF-SSL-001** |

---

### 3. RESUMEN COMPARATIVO DE OPCIONES

Todos los costos incluyen IVA referencial y se detallan en cada proforma. Tipo cambio ≈ Bs 11.00 / US$ 1.

#### 3.1. Dominio (INF-001/002)

| Opción dominio | Costo 1.er año | Renovación | Nota |
|----------------|----------------|------------|------|
| `buffetkm.org.bo` (NIC) | **Bs 280** | Bs 280 | **Recomendado** — identidad boliviana económica |
| `buffetkm.bo` (NIC) | Bs 980 | Bs 980 | Identidad corta |
| `buffetkm.com` (GoDaddy) | ≈ US$ 14,99 (~Bs 165) | ≈ US$ 19,99 | Alternativa internacional |

#### 3.2. Infra recomendada

| Combo | Frontend | Backend+RAG+DB | Vector | SSL | 1.er año (Bs aprox.) | Renovación | Cuándo |
|-------|----------|----------------|--------|-----|----------------------|------------|--------|
| **A. Económico (recomendado 4 meses)** | Vercel Hobby (0) | Railway Starter (US$5/mes) + Postgres incluido + Chroma free | Chroma/pgvector free | Let's Encrypt (0) | **~Bs 280 (dominio .org.bo) + US$20 (Railway 4 meses) ≈ Bs 500** | ~Bs 280 + US$60/año | Cubre 16 sem + garantía con 5000 docs |
| **B. Híbrido Mongo** | Vercel Hobby | Railway Starter + MongoDB Atlas free (512 MB) | Chroma free | Let's Encrypt | **~Bs 280 + US$20 ≈ Bs 500** | ~Bs 280 + US$60/año | Si se elige híbrido Postgres+Mongo |
| **C. Escalado Pro** | Vercel Pro US$20/mes | Railway Pro US$20/mes + Pinecone Starter US$70/mes | Pinecone Starter | EV US$50 | **~Bs 280 + US$440 ≈ Bs 5,120** | similar | Solo si 10k+ docs o tráfego >99.5% excede free — requiere adenda |
| **D. Solo dominio + staging equipo** | Staging equipo (0) | Staging equipo (0) | — | Let's Encrypt | **Bs 0** (sin dominio) — solo staging | — | Si Buffet retrasa dominio (O02) per Contrato Cl. 3.2 |

*Costos infra no incluyen LLM (OpenAI/Mistral): `text-embedding-3-large` vs `sentence-transformers` local (0). Estimado embeddings 5000 docs ≈ US$ 5–20.*

#### 3.3. Límites contractuales (Carta de Límite)

| Límite | Texto contractual | Remisión |
|--------|-------------------|----------|
| **Infra por cuenta Buffet** | El Equipo **configura** Vercel/Railway/DB/vector/SSL en **cuentas del Buffet** o en cuentas equipo con **handover** (env vars, dashboards) al E10; no paga planes premium sin aprobación escrita | Contrato Cl. 3.2, 5.2, 6.1 |
| **Dominio** | Si `buffetkm.bo` (Bs 980) supera presupuesto, se propone `buffetkm.org.bo` (Bs 280) o `buffetkm.com` (US$ 14,99) — proyecto sigue en staging sin bloquear E10 | Contrato Cl. 3.2, F03 |
| **Vercel/Railway/Vector/LLM premium** | Starter/Hobby/free cubre proyecto 4 meses; escalado a Pro/Pinecone/GPT-4o solo con **adenda** (Cl.11) | TDR §22, Proformas INF-003/004/007 |
| **SSL (SCCL)** | Let's Encrypt US$ 0 cubre RNF-01 A+; EV US$ 50 solo si Buffet exige sello verde — con aprobación | INF-SSL-001 |
| **SQL vs Mongo** | Híbrido sin costo extra si se decide S1 y se justifica; no genera nuevo presupuesto | TDR §8.2 |

**Recomendación del Equipo:** **Combo A** (`.org.bo` + Vercel Hobby + Railway Starter + Chroma/pgvector + Let's Encrypt) — costo 1.er año < Bs 600, cubre 4 meses + garantía, 99.5% uptime, A+ SSL, ≥85% precisión. **Combo B** si se elige híbrido Mongo (mismo costo free). Escalar a **Combo C** solo si Buffet valida >5000 docs o requiere Pinecone managed.

---

### 4. SIGUIENTES PASOS PARA EL BUFFET

1. **Decidir dominio:** `.org.bo` (Bs 280, recomendado) vs `.bo` (Bs 980) vs `.com` (US$ 14,99). Confirmar por correo/WhatsApp.
2. **Decidir BD:** Validar **PostgreSQL vs MongoDB vs híbrido** en **Sprint 1 día 5** (reunión Tech Lead) — ver INF-005/006 para criterio.
3. **Confirmar infra:** Autorizar creación cuentas **Vercel** + **Railway** (o entregar credenciales existentes) en **Semana 2** para S1 y **Semana 13** para S8 prod.
4. **Confirmar SSL:** Aceptar **Let's Encrypt (0)** o solicitar **EV (US$ 50)** — ver INF-SSL-001.
5. **Equipo inicia** registro/config en 1–3 días hábiles tras confirmación; entrega credenciales + `env.example` en Manual Despliegue §3.1.

---

**POR EL EQUIPO DESARROLLADOR:**

________________________  
**Santiago Acha** — Tech Lead / Scrum Master

C.I.: ________________  
Firma: ________________  
Fecha: ________________

**Lugar y fecha:** La Paz, Bolivia — 27/08/2026

---
