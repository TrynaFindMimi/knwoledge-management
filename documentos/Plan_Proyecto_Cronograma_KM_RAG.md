# PLAN DE PROYECTO Y CRONOGRAMA

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG — BUFFET DE ASISTENCIA FAMILIAR

---

**FECHA:** [dd/mm/aaaa]

**LUGAR:** La Paz, Estado Plurinacional de Bolivia

**DOCUMENTO DE REFERENCIA:** `TDR_KM_RAG.md` (Anexo II del Contrato `Contrato_KM_RAG.md`)

---

### ÍNDICE

**A. Problemas/riesgos por sprint (resumen)**

| Sprint | Semanas | Entregables | Riesgos principales (ver `TDR_Gestion_Riesgos_KM_RAG.md`) |
|--------|---------|-------------|------------------------------------------------------------|
| **Sprint 0** | -7–0 | Setup | O07, S01 |
| **Sprint 1** | 1–2 | E1, E2 | T01, I03, O01, O07, S01, F02 |
| **Sprint 2** | 3–4 | E3 | T02, T05, I01, O01, O05, S03 |
| **Sprint 3** | 5–6 | E4 | T02, T03, I02, I03, O01, S04, F02 |
| **Sprint 4** | 7–8 | E5 | T01, T08, I02, I03, S02 |
| **Sprint 5** | 9–10 | E6 | T04, I05, O04, S02 |
| **Sprint 6** | 11–12 | E7 | T02, T05, T11, I04, S03, S04 |
| **Sprint 7** | 13–14 | E8, E9 | T03, T07, T11, I05, S02, F01 |
| **Sprint 8** | 15–16 | E10–E12 | T04, T06, S01, S02, F01 |
| **Garantía** | 17–24 | — | T11, T12, I04, S01, S03, F01 |

**B. Contenido del Plan**

1. [Datos del Proyecto](#datos-del-proyecto)
2. [Herramientas y Tecnologías](#herramientas-y-tecnologías)
   - 2.1 [Frontend](#frontend)
   - 2.2 [Backend y RAG](#backend--rag)
   - 2.3 [Deployment y Seguridad SSL/TLS](#deployment) — Vercel + Railway + SSL (SCCL)
   - 2.4 [Diseño y Colaboración](#diseño--colaboración)
   - 2.5 [Testing y Calidad](#testing--calidad)
   - 2.6 [Uso de Herramientas por Sprint](#uso-de-herramientas-por-sprint)
3. [Sprint 0 — Preparación](#sprint-0--preparación-días--7-a-0-previo-a-sprint-1)
4. [Sprint 1 — Planificación, Diseño y Arquitectura](#sprint-1--planificación-diseño-y-arquitectura-semanas-12)
5. [Sprint 2 — Fundamentos: Auth + Gestión Casos](#sprint-2--fundamentos-auth--gestión-casos-semanas-34)
6. [Sprint 3 — Ingesta Inteligente](#sprint-3--ingesta-inteligente-semanas-56)
7. [Sprint 4 — RAG Core: Búsqueda + Chat](#sprint-4--rag-core-búsqueda--chat-semanas-78)
8. [Sprint 5 — Alertas y Audiencias](#sprint-5--alertas--audiencias-semanas-910)
9. [Sprint 6 — Seguridad Avanzada](#sprint-6--seguridad-avanzada-semanas-1112)
10. [Sprint 7 — Pulido y QA Integral](#sprint-7--pulido--qa-integral-semanas-1314)
11. [Sprint 8 — Despliegue, Documentación y Capacitación](#sprint-8--despliegue-documentación-y-capacitación-semanas-1516)
12. [Período de Garantía](#período-de-garantía-semanas-1724--60-días)
13. [Dependencias del Buffet](#dependencias-del-buffet)
14. [Reuniones Programadas](#reuniones-programadas)
15. [Entregables Resumen](#entregables-resumen-e1e12)
16. [Metodología Scrum+Kanban](#metodología--scrum--kanban)
17. [Gestión de Riesgos — Resumen](#gestión-de-riesgos--resumen) → detalle en `TDR_Gestion_Riesgos_KM_RAG.md`
18. [Herramientas de Seguridad — SSL/TLS (SCCL)](#herramientas-de-seguridad--ssltls-sccl)
19. [Hitos de Pago Visual](#hitos-de-pago-visual)
20. [Carta de Proforma y Límites](#carta-de-proforma-y-límites)
21. [Anexos](#anexos)

---

### DATOS DEL PROYECTO

| Concepto | Detalle |
|----------|---------|
| **Cliente** | Buffet de Asistencia Familiar (servicio legal gratuito) |
| **Ubicación** | La Paz, Bolivia |
| **Equipo** | Mariana del Arroyo (PM/SM), Nahomi Humerez (UX/UI), Santiago Acha (Tech Lead RAG), Jorge Saenz (Frontend/QA) |
| **Stack Frontend** | React 18 + Vite + Ant Design 5.x |
| **Stack Backend/RAG** | FastAPI/Express + LangChain/LlamaIndex + ChromaDB/pgvector + PostgreSQL/MongoDB + Railway |
| **Deployment** | Vercel (frontend) + Railway (backend/RAG/DB/cron/storage) |
| **Duración total** | 16 semanas (4 meses) + 60 días garantía = 24 semanas hasta cierre contractual |
| **Sprints** | 8 sprints × 2 semanas |
| **Metodología** | Scrum + Kanban |
| **Precio base** | Bs. 28,000 (+ IVA) — 5 hitos |

---

### HERRAMIENTAS Y TECNOLOGÍAS

#### Frontend

| Componente | Tecnología | Propósito |
|------------|------------|-----------|
| Framework | React 18 + Vite 5 | SPA rápida, HMR, build optimizado |
| UI Library | Ant Design 5.x (AntD) | Table, Form, Upload, DatePicker, Select, Tag, Badge, Statistic, Calendar, Drawer, Modal |
| Estado | Zustand / Redux Toolkit | Estado global, auth, casos |
| Data Fetch | TanStack Query + Axios | Cache, loading/error, revalidación |
| Routing | React Router v6 | Navegación protegida por rol (RBAC) |
| Estilos | AntD Theme Token + CSS Modules | Theming Buffet, responsive |
| Iconos | AntD Icons + React Icons | Consistencia |
| PDF/ZIP | jsPDF / pdf-lib + JSZip | Paquete audiencia, exportación ZIP caso |
| Auth | JWT (access 30 min + refresh) + bcrypt | Login, bloqueo 3 intentos |

**Decisión:** Vite sobre Next.js porque es SPA interna (no necesita SSR/SEO); si SEO futuro se requiere, migración a Next.js es trivial (mismo React/AntD).

#### Backend & RAG

| Componente | Tecnología | Propósito |
|------------|------------|-----------|
| API | **FastAPI (Python)** — elegido si RAG nativo domina; alternativa **Express (Node)** si CRUD domina | REST + WebSocket |
| RAG Orquestación | LangChain / LlamaIndex | Chunking semántico, retrieval, generación con citas |
| Embeddings | sentence-transformers `paraphrase-multilingual` / `text-embedding-3-large` | ES jurídico boliviano |
| LLM | GPT-4o-mini / Claude Haiku / Mistral 7B local | Clasificación auto, generación, chat |
| Vector DB | **ChromaDB** (self-host Railway) o **pgvector** (si Postgres) o Pinecone (managed) | Búsqueda <3s |
| BD Relacional | **PostgreSQL 15** (Railway Postgres) | Casos, audiencias, alertas, usuarios, auditoría |
| BD NoSQL | **MongoDB Atlas** (si metadatos variables) | Docs con esquema flexible |
| Storage | Railway Volumes / S3 / Supabase Storage | Archivos 50MB, versionado |
| Realtime | Socket.io (WebSocket) | Chat RAG + notificaciones in-app |
| Cifrado | AES-256-GCM + TLS 1.3 | Reposo + campo víctima + tránsito |
| Cron | node-cron / BullMQ / Railway Cron | Alertas 48h/7d, resumen 8AM, email semanal |
| Email | Nodemailer / Resend | Alertas + resúmenes |

**Decisión SQL vs Mongo — Criterio (Sprint 1):**

| Escenario | Elección | Justificación |
|-----------|----------|---------------|
| Casos/audiencias/alertas con esquema estable, relaciones claras, necesidad ACID + auditoría | **PostgreSQL** | Transaccional, JOINs, pgvector integrado |
| Documentos con metadatos muy variables (violencia doméstica requiere campos extra: medida protección, comisaría, riesgo) | **MongoDB** | Esquema flexible, agregación |
| Mixto (realista para KM) | **Híbrido: Postgres (transaccional) + Mongo (docs) + Chroma/pgvector (vectores)** | Mejor de ambos, sin fragmentación si se gestiona bien en Railway |

**Se formaliza en Sprint 1 y se mantiene sin costo extra.**

#### Deployment

| Componente | Plataforma | Uso |
|------------|------------|-----|
| Frontend | **Vercel** | CI/CD git, previews por PR, CDN edge, dominio custom, SSL |
| Backend+RAG+DB | **Railway** | API + workers + Postgres/Mongo + vector + volumes + cron + env cifradas, metrics |
| Alternativas evaluadas | Render, Fly.io, AWS ECS (backend) / Netlify, Cloudflare Pages (frontend) | Railway gana por todo-en-uno para RAG; Vercel gana por DX React/Vite |
| CI/CD | GitHub Actions → Vercel + Railway | Deploy automático por rama (`develop`→staging, `main`→prod) |
| Monitoreo | Sentry + UptimeRobot + Railway Metrics | Errores, uptime 99.5%, perf |
| Control versiones | Git + GitHub privado | `main`/`develop`/`feature/*`, PR review obligatorio |

#### Diseño & Colaboración

| Herramienta | Uso |
|-------------|-----|
| Figma | Wireframes, mockups AntD, design system, prototipos |
| Trello / Jira / Notion | Kanban, backlog, sprint planning |
| Google Meet / Zoom | Demos, retrospectivas, capacitación |
| WhatsApp | Coordinación rápida (horario laboral 9-18) |
| VS Code | IDE |
| Postman / Insomnia | Test API |

#### Testing & Calidad

| Herramienta | Uso |
|-------------|-----|
| Vitest + Testing Library | Unit frontend |
| Playwright | E2E |
| Pytest / Jest | Unit backend |
| k6 | Perf (búsqueda <3s con 1000 docs) |
| OWASP ZAP | Pen-test |
| Lighthouse / PageSpeed | Perf + accesibilidad |

#### Uso de Herramientas por Sprint

| Sprint | Herramientas principales que se usan | Output verificable |
|--------|--------------------------------------|--------------------|
| **S0** | GitHub, Vercel link, Railway link, Notion/Jira, Drive, GitHub Actions (init) | Repos + CI verde, backlog priorizado, 20 casos en Drive |
| **S1** | Vite+AntD (Theme Token, Layout), Figma (design system), DB Designer + Chroma/pgvector, FastAPI/Express + Railway staging, Postman | Figma aprobado, `vercel preview` + `railway health /health` OK, decisión SQL/Mongo documentada |
| **S2** | FastAPI/Express (JWT, bcrypt, TLS), AntD Table/Form/Tag/Badge/Statistic/Recharts, Zustand/TanStack Query, Vitest/Playwright, S3 Volumes | Auth con bloqueo 3 intentos + RBAC guard, CRUD casos, KPIs, tests E2E pass, staging Vercel+Railway |
| **S3** | AntD Upload.Dragger, Railway Volumes/S3, LangChain + sentence-transformers, Chroma/pgvector, GPT-4o-mini/Mistral | Docs chunk+embed+index, clasificación auto Tags, alerta dedup >85%, lista AntD List |
| **S4** | LangChain (retrieval+rerank), k6, Socket.io, AntD Drawer/List/Input.Search | Búsqueda <3s p95, chat con citas linkeadas + memoria `¿y qué más de Mamani?`, dataset 100 queries ≥85% |
| **S5** | AntD Calendar/Modal/Form, jsPDF/pdf-lib, BullMQ/node-cron, Socket.io, Nodemailer/Resend | Checklist tenidos/faltantes, PDF portada + peso, cron 48h/24h/2h + 7d/48h, resumen 8AM |
| **S6** | AntD Timeline, diff lib, JWT+watermark Canvas, helmet/CSP, crypto AES-256-GCM, Postgres inmutable | Timeline v1..vN + diff, JWT 1h/24h/72h single-use, watermark, auditoría sin UPDATE, SSL headers |
| **S7** | Lighthouse, CSS print, JSZip, AntD Badge/Dropdown, Playwright+ZAP+k6+BrowserStack | <5 clics, impresión legal, ZIP con contraseña, QA report (0 high), staging aprobado |
| **S8** | Vercel+Railway dashboards, Sentry/Uptime, Markdown→PDF, Loom/Meet | Prod SSL A+ + 99.5%, Manuales PDF, 2 sesiones grabadas, handover repos/env, backups |

Ver matriz completa herramienta→RF/RNF en `TDR_KM_RAG.md §9.4`.

---

### SPRINT 0 — PREPARACIÓN (Días -7 a 0, previo a Sprint 1)

| Tarea | Responsable | Herramienta |
|-------|-------------|-------------|
| Kick-off formal + firma contrato | PM + Buffet | — |
| Setup repos GitHub (privado), Vercel, Railway, Figma, Trello | Tech Lead | GitHub/Vercel/Railway |
| Definición Product Backlog (29 RF + 19 RNF priorizados) | PM + PO Buffet | Notion/Jira |
| Recolección 20 casos/docs muestra anonimizados | Buffet | Drive |
| Setup CI/CD inicial (Vercel link, Railway link) | Tech Lead | GitHub Actions |

---

### SPRINT 1 — PLANIFICACIÓN, DISEÑO Y ARQUITECTURA (Semanas 1–2)

**Objetivo:** Base técnica y diseño validado. **Entregables E1 + E2.**

| Tarea | Duración | Responsable | Herramienta / Stack |
|-------|----------|-------------|---------------------|
| Sprint Planning + refinamiento backlog | Día 1 | PM + Equipo | Jira/Notion |
| Setup proyecto Vite + React + AntD (tokens, theme Buffet, layout Sider/Header responsive) | Día 1–4 | Frontend | Vite, AntD, React Router |
| Diseño wireframes Figma (dashboard, casos, búsqueda, chat, audiencias, compartidos, admin) — mobile-first | Día 1–6 | UX/UI | Figma |
| Design system AntD (colores Buffet, tipografía, espaciado, componentes) | Día 3–6 | UX/UI | Figma + AntD Token |
| Modelado datos + decisión BD (SQL vs Mongo vs híbrido) — ER + colecciones Mongo + esquema vector | Día 2–5 | Tech Lead | DB Designer, Chroma/pgvector |
| Setup backend base (FastAPI/Express + JWT auth skeleton + Postgres/Mongo connection + Railway deploy staging) | Día 3–7 | Tech Lead | FastAPI/Express, Railway |
| Setup vector DB (Chroma/pgvector en Railway, prueba embeddings ES) | Día 5–8 | Tech Lead | Chroma/pgvector, sentence-transformers |
| Revisión arquitectura (capas, seguridad AES-256/TLS, RBAC chunk, auditoría) | Día 7 | Tech Lead + PM | Doc arquitectura |
| **Revisión y aprobación diseños con Buffet** | Día 9–10 | PM + Buffet | Figma |
| Header/Sider global + routing protegido + 404/403 + login UI (sin lógica completa) | Día 9–12 | Frontend | AntD Layout, React Router |
| Mock de datos (20 casos prueba cargados en JSON/DB staging) | Día 10–12 | Frontend + Tech Lead | — |
| **DEMO Sprint 1 — E1 + E2: Plan + Figma + arquitectura + layout navegable** | **Día 14** | Equipo + Buffet | Meet/Zoom — **Hito H1 20%** |

**Criterio salida:** Figma aprobado, arquitectura + decisión BD documentada, layout AntD navegable en Vercel preview, backend staging health-check OK.

---

### SPRINT 2 — FUNDAMENTOS: AUTH + GESTIÓN CASOS (Semanas 3–4)

**Objetivo:** Base funcional auth y casos. **Entregable E3.**

| Tarea | Duración | Responsable | Herramienta |
|-------|----------|-------------|-------------|
| Auth completo: login, JWT (access 30 min + refresh), bloqueo 3 intentos, expiración inactividad, bcrypt, TLS | Semana 3 | Tech Lead | FastAPI/Express, Postgres/Mongo |
| RBAC: admin/abogado/asistente + permisos por caso asignado + guard en frontend (403) | Semana 3 | Tech Lead + Frontend | React Router guards |
| CRUD casos: crear (ID único, tipo* + cliente*), listar (Table filtros tipo/estado/nombre, orden audiencia, #docs), editar, cambiar estado (activo/en audiencia/cerrado-archivable) + historial timeline | Semana 3–4 | Fullstack | AntD Table/Form/Tag/Badge, API |
| Botón URGENTE (violencia doméstica): modal mínimo (nombre + tipo violencia) → creación + redir upload | Semana 4 | Frontend | AntD Modal |
| Dashboard KPIs (Statistic Cards: casos activos, docs mes, audiencias próximas, alertas) + gráfico barras tipo caso | Semana 4 | Frontend | AntD Card/Statistic, Recharts |
| Auditoría base: log quién/cuándo/qué/IP por cada acción caso/auth | Semana 4 | Tech Lead | Postgres/Mongo (inmutable) |
| Tests auth + casos (unit + E2E login → crear caso) | Semana 4 | QA | Vitest + Playwright |
| Deploy staging: Vercel (frontend) + Railway (backend) integrados, env vars cifradas | Semana 4 | Tech Lead | Vercel/Railway |
| **DEMO Sprint 2 — E3: Auth + Casos + Dashboard AntD responsive** | **Día 28** | — | Validación Buffet |

**Criterio salida:** Login con bloqueo y expiración funcional, CRUD casos completo, RBAC verificado (asistente no borra, abogado solo ve asignados), dashboard KPIs, deploy staging OK, tests pass.

---

### SPRINT 3 — INGESTA INTELIGENTE (Semanas 5–6)

**Objetivo:** Docs con inteligencia. **Entregable E4.** **Hito H2 15% al cierre.**

| Tarea | Duración | Responsable | Herramienta |
|-------|----------|-------------|-------------|
| Upload AntD Dragger: PDF/JPG/PNG/DOCX 50MB, múltiple, barra progreso, preview, validación tipo/tamaño | Semana 5 | Frontend | AntD Upload.Dragger |
| Storage: Railway Volumes/S3, versionado, AES-256 reposo + campo víctima | Semana 5 | Tech Lead | Railway Volumes/S3, crypto |
| Chunking semántico + embeddings ES (sentence-transformers) + indexado vector DB | Semana 5 | Tech Lead | LangChain, Chroma/pgvector |
| **Clasificación automática por contenido** (LLM): demanda, contestación, informe psic., cert. médico, orden protección, comprobante pago, otro — basada en contenido no nombre, muestra tag sugerido + **Confirmar/Corregir**, renombra `scan001.jpg` → descriptivo | Semana 5–6 | Tech Lead | GPT-4o-mini/Mistral + prompts ES jurídico |
| **Desduplicación:** compara embeddings antes de guardar → alerta >85% → usuario elige duplicado (cancela) vs versión nueva (versiona) | Semana 6 | Tech Lead | Vector similarity search |
| UI docs en caso: List con Tag clasificación, Badge versión, filtros por categoría auto | Semana 6 | Frontend | AntD List/Tag/Badge |
| **DEMO Sprint 3 — E4: Docs indexados, clasificación ≥90% + dedup** | **Día 42** | — | **Hito H2** |

**Criterio salida:** Upload 50MB estable, docs indexados y buscables por vector, clasificación auto ≥90% en prueba 20 docs, dedup alerta >85% verificada, renombrado descriptivo OK.

---

### SPRINT 4 — RAG CORE: BÚSQUEDA + CHAT (Semanas 7–8)

**Objetivo:** Corazón RAG. **Entregable E5.** El más crítico.

| Tarea | Duración | Responsable | Herramienta |
|-------|----------|-------------|-------------|
| Motor búsqueda semántica: query → embeddings → retrieval vector DB → re-ranking → resultados Cards (snippet resaltado, score, fuente) — tolera errores (`conbenio`→`convenio`) y sinónimos (`contestación`→`respuesta demanda`) | Semana 7 | Tech Lead | LangChain, Chroma/pgvector, LLM rerank |
| Optimización perf: <3s con 1000 docs, caching, pgvector HNSW / Chroma index tuning | Semana 7 | Tech Lead | k6, monitoring |
| Consulta lenguaje natural: pregunta ES coloquial → LLM + retrieval → respuesta con **citas** (doc, caso, fecha), memoria conversacional (`¿y qué más de Mamani?`) | Semana 7–8 | Tech Lead | LangChain + LLM + prompt ES boliviano |
| Chat UI: Drawer flotante visible siempre + página `/chat`, burbujas + citas linkeadas, TextArea + chips sugerencias, typing indicator, WebSocket para tiempo real | Semana 8 | Frontend | AntD Drawer/List, Socket.io |
| Vista `/busqueda`: Input.Search grande + Cards resultado + filtros (tipo/caso/fecha) + estado vacío ilustrado | Semana 8 | Frontend | AntD Input.Search |
| Tests RAG: recall/precisión ≥85%, citación correcta, tolerancia errores/sinónimos, <3s | Semana 8 | QA | Dataset prueba 100 queries |
| **DEMO Sprint 4 — E5: Búsqueda <3s ≥85% + chat con citas + memoria** | **Día 56** | — | Validación Buffet |

**Criterio salida:** Búsqueda semántica <3s (1000 docs, 10 concurrentes), precisión ≥85%, sinónimos/errores OK, chat responde con citas linkeadas y mantiene contexto, tests RAG pass.

---

### SPRINT 5 — ALERTAS & AUDIENCIAS (Semanas 9–10)

**Objetivo:** Proactividad. **Entregable E6.** **Hito H3 25% al cierre.**

| Tarea | Duración | Responsable | Herramienta |
|-------|----------|-------------|-------------|
| CRUD audiencia: caso* + fecha* + hora* + juzgado* + tipo* → genera **checklist automático** docs requeridos (según tipo caso) → aparece en Calendar/Table | Semana 9 | Fullstack | AntD Calendar/Table/Modal/Form |
| Vista checklist: **Tenidos** (verde) / **Faltantes** (rojo) / **En trámite** (amarillo), agregar requisito manual, marcar `en trámite` | Semana 9 | Frontend | AntD Tag/Badge colors |
| Paquete PDF consolidado: orden checklist + portada caso (datos, fecha) + preview peso → descarga jsPDF/pdf-lib | Semana 9 | Fullstack | jsPDF/pdf-lib |
| Alertas audiencia: cron 48h (preparación) + 24h (faltantes) + 2h (repaso) — incluye fecha/juzgado/caso/docs requeridos — in-app + email | Semana 9–10 | Tech Lead | BullMQ/node-cron + Socket.io + Nodemailer |
| Alertas vencimiento medidas protección: detección auto fecha doc → 7d + 48h urgente (víctima/caso/acción sugerida) | Semana 10 | Tech Lead | Cron + parser fecha LLM |
| Resumen diario 8AM: audiencias día + faltantes + alertas — in-app + email; configurable hora | Semana 10 | Tech Lead | Cron |
| Email semanal lunes 8AM: casos activos, docs subidos, audiencias atendidas, alertas pendientes — sin datos sensibles, desactivable | Semana 10 | Tech Lead | Resend/Nodemailer |
| **DEMO Sprint 5 — E6: Audiencias + checklist + PDF + alertas 48h/7d + resúmenes** | **Día 70** | — | **Hito H3** |

**Criterio salida:** Audiencia genera checklist auto, faltantes en rojo, paquete PDF con portada y peso, alertas 48h/24h/2h y 7d/48h llegan in-app+email, resumen 8AM y semanal lunes 8AM OK, configuración desactivable.

---

### SPRINT 6 — SEGURIDAD AVANZADA (Semanas 11–12)

**Objetivo:** Compartición + versiones + auditoría. **Entregable E7.**

| Tarea | Duración | Responsable | Herramienta |
|-------|----------|-------------|-------------|
| Control versiones completo: timeline v1,v2... fecha/autor, **"Descargar vN"**, **"Comparar diff"** lado a lado (diff texto/PDF) | Semana 11 | Fullstack | AntD Timeline, diff lib |
| Compartición JWT: modal **"Compartir"** (doc + duración 1h/24h/72h + permiso lectura/lectura+descarga + email) → link JWT firmado single-use + log acceso (quién/cuándo/IP) | Semana 11 | Fullstack | JWT, API |
| Solo-lectura: sin botón descarga, **watermark** nombre destinatario + fecha en preview, best-effort anti-captura (CSS `user-select:none` + overlay) | Semana 11 | Frontend | Canvas watermark |
| Revocar: table **"Revocar"** → Confirm → revoca inmediato → notifica destinatario email → log auditoría | Semana 12 | Fullstack | — |
| Auditoría inmutable: no editable/eliminable por ningún rol, API bloquea DELETE/PUT logs, view admin por rango fechas → **"Exportar Excel"** | Semana 12 | Tech Lead | Postgres/Mongo inmutable |
| Admin usuarios: Table, **"+ Nuevo"**, **"Editar rol"** (solo admin), bloquear/desbloquear | Semana 12 | Fullstack | — |
| Cifrado campo víctima: AES-256-GCM nivel columna/documento, solo descifra en sesión autenticada | Semana 12 | Tech Lead | crypto |
| **DEMO Sprint 6 — E7: Versiones+diff + JWT 1h/24h/72h + watermark + revocar + auditoría** | **Día 84** | — | — |

**Criterio salida:** Versiones timeline+diff OK, JWT expira correctamente (1h/24h/72h), single-use validado, watermark visible, revocar inmediato + notif, logs inmutables (intento borrado bloqueado), export auditoría OK.

---

### SPRINT 7 — PULIDO & QA INTEGRAL (Semanas 13–14)

**Objetivo:** Refinar + validar todo. **Entregables E8 + E9.** **Hito H4 15% al cierre.**

| Tarea | Duración | Responsable | Herramienta |
|-------|----------|-------------|-------------|
| PWA/mobile refinamiento: responsive final (AntD breakpoints), <5 clics validado, Drawer en mobile, optimización imágenes | Semana 13 | Frontend + UX/UI | Lighthouse |
| Impresión: **"Imprimir"** → diálogo navegador tamaño legal + encabezado caso/fecha | Semana 13 | Frontend | CSS print |
| Export ZIP caso: carpetas por tipo + índice txt + nombres descriptivos + **"Proteger con contraseña"** opcional (AES ZIP) | Semana 13 | Fullstack | JSZip |
| Notificaciones: campana Header Badge + Dropdown agrupadas + centro `/notificaciones` (filtros, marcar leída/todas) | Semana 13 | Frontend | AntD Badge/Dropdown/List |
| QA integral en staging (Vercel preview + Railway staging): | Semana 13–14 | QA + Equipo | — |
| — Funcional (29 RF) | | | Playwright E2E |
| — RAG (recall/precisión ≥85%, citación, sinónimos/errores, <3s) | | | Dataset 100 queries |
| — Seguridad (pen-test OWASP Top 10, AES-256, TLS A+, RBAC, bloqueo 3 intentos, 403) | | | OWASP ZAP |
| — Perf (operaciones <2s, búsqueda 10 concurrentes/1000 docs) | | | k6 |
| — Usabilidad (3 usuarios reales no técnicos <5 min) | | | UX test |
| — Cross-browser (Chrome/Firefox/Safari desktop+mobile) | | | BrowserStack |
| Corrección bugs + ajustes UX feedback | Semana 14 | Equipo | — |
| **DEMO Sprint 7 — E8+E9: Staging QA superada, reporte incl. pen-test + perf** | **Día 98** | — | **Hito H4** |

**Criterio salida:** <5 clics validado, impresión legal + ZIP con contraseña OK, notifs agrupadas, QA superado sin críticas, reporte entregado, staging aprobado por Buffet.

---

### SPRINT 8 — DESPLIEGUE, DOCUMENTACIÓN Y CAPACITACIÓN (Semanas 15–16)

**Objetivo:** Producción + handover. **Entregables E10 + E11 + E12.** **Hito H5 25%.**

| Tarea | Duración | Responsable | Herramienta |
|-------|----------|-------------|-------------|
| Config producción: dominio custom → Vercel (frontend) + Railway (backend/DB/vector/cron), env vars prod cifradas, SSL/TLS, backups automáticos | Semana 15 | Tech Lead | Vercel/Railway dashboards |
| Migración staging→prod + smoke tests (login, crear caso, subir doc, búsqueda, chat, alerta, compartir) | Semana 15 | Tech Lead + QA | — |
| Monitoreo: Sentry (errores), UptimeRobot (99.5%), Railway Metrics, logs auditoría | Semana 15 | Tech Lead | Sentry/Uptime |
| Manual Técnico: arquitectura (capas, RAG, vectores), API REST+WebSocket, modelo datos (ER + vector), decisiones SQL/Mongo, despliegue Vercel/Railway, troubleshooting | Semana 15–16 | PM + Tech Lead | Markdown→PDF |
| Manual Usuario: guía visual AntD (capturas paso a paso: crear caso, subir, buscar, chat, audiencia, compartir), FAQ, modo urgente | Semana 16 | UX/UI + PM | Markdown→PDF |
| Manual Despliegue: handover Vercel/Railway, env.example, restore backups, cron, rotación JWT, guía escalar 5→20 usuarios | Semana 16 | Tech Lead | — |
| **Capacitación 2 sesiones** (Meet/Zoom, grabadas): Sesión 1 (90 min: casos, docs, búsqueda, chat) + Sesión 2 (60 min: audiencias, alertas, compartir, admin) | Semana 16 | Equipo + Buffet | Meet/Zoom + Loom |
| Video tutoriales cortos (5-7 min c/u) + guías rápidas 1-página | Semana 16 | UX/UI | Loom |
| Entrega formal: repos GitHub (acceso Buffet), credenciales Vercel/Railway, dominios, backups, docs PDF firmados | Semana 16 | PM | — |
| **DEMO FINAL — E10+E11+E12: Prod operativa + docs + capacitación** | **Día 112** | Equipo + Buffet | **Hito H5 — inicio garantía 60 días** |

**Criterio salida:** Prod operativa (SSL, dominio, 99.5% OK), docs PDF entregados, 2 sesiones + videos, handover completo, E10-E12 firmados.

---

### PERÍODO DE GARANTÍA (Semanas 17–24 — 60 días)

| Tarea | Frecuencia | Estado |
|-------|------------|--------|
| Monitoreo prod (uptime, errores Sentry, vector DB) | Diario (automático) | Pendiente |
| Revisión seguridad + updates dependencias (AntD, LangChain, etc.) | Quincenal | Pendiente |
| Re-indexado RAG + tuning embeddings si nuevos tipos doc | Mensual o a demanda | Pendiente |
| Corrección bugs atribuibles (sin costo) | A demanda (SLA 48h crítica, 5d media) | Pendiente |
| Soporte WhatsApp + email (horario laboral) | Lun-Vie 9-18 | Pendiente |
| **FIN CONTRATO — Semana 24** | — | — |

**Post-garantía:** Nuevo contrato para mantenimiento RAG, nuevas features, re-entrenamiento, soporte extendido.

---

### DEPENDENCIAS DEL BUFFET

| Dependencia | Plazo máximo | Impacto si no se cumple |
|-------------|-------------|-------------------------|
| Firma contrato + designación Product Owner | Semana 0 | No inicia Sprint 1 |
| Entrega 20 casos/docs muestra anonimizados (variados tipos, incluye `scan001.jpg`, orden protección) | Semana 1 | Retrasa Sprint 3 (clasificación/dedup) |
| Aprobación Figma + design system (E2) | Semana 2 (5 días hábiles post-demo) | Retrasa Sprints 2-3 (frontend) |
| Validación decisión BD (SQL/Mongo/híbrido) + acceso crear Vercel/Railway | Semana 2 | Retrasa infra |
| Entrega contactos/logotipos/plantillas legales (políticas privacidad) anonimizadas | Semana 4 | Retrasa admin/auditoría |
| Aprobación cada demo (5 días hábiles) | Cierre cada sprint | Retraso acumulativo; silencio = aprobación tácita tras plazo sin objeción fundada |
| Validación cuentas Vercel/Railway + dominio producción | Semana 13 | Retrasa despliegue S8 |
| Participación usabilidad (3 abogados) + capacitación (2 sesiones) | Semanas 14 y 16 | Retrasa cierre |

> **Bloqueo Kanban:** dependencias Buffet se registran como tareas bloqueadas en tablero; si superan plazo, cronograma se recalcula y se notifica por escrito.

---

### REUNIONES PROGRAMADAS

| Reunión | Frecuencia | Participantes | Medio |
|---------|------------|---------------|-------|
| Sprint Planning | Inicio cada sprint (2h) | PM + Equipo + PO Buffet | Meet/Zoom |
| Daily Stand-up | Lun-Vie 9:00 (15 min) | Equipo | Meet/WhatsApp |
| Sprint Demo | Fin cada sprint (60 min) | Equipo + Buffet | Meet/Zoom (grabada) |
| Retrospectiva | Fin cada sprint (45 min) | Equipo | Meet |
| Refinamiento Backlog | Mitad sprint (60 min) | PM + PO | Meet |
| Soporte garantía | A demanda | Equipo + Buffet | WhatsApp/email |

**Reuniones extra:** con 24h preaviso, solo horario laboral Lun-Vie 9-18 BT. Fuera de horario no hay obligación de respuesta.

---

### ENTREGABLES RESUMEN (E1–E12)

| ID | Entregable | Sprint | Semana | Hito pago |
|----|------------|--------|--------|-----------|
| **E1** | Plan de trabajo + cronograma confirmado | 1 | 2 | H1 20% |
| **E2** | Figma + design system AntD + arquitectura + decisión BD (SQL/Mongo/híbrido) | 1 | 2 | H1 |
| **E3** | MVP Auth+Casos (CRUD, RBAC, listar, estado, URGENTE) + dashboard | 2 | 4 | H2 |
| **E4** | Ingesta docs (50MB, chunking, embeddings, clasificación auto, dedup >85%) | 3 | 6 | H2 15% |
| **E5** | Motor RAG (búsqueda <3s ≥85%, NL con citas, chat flotante con memoria) | 4 | 8 | H3 |
| **E6** | Alertas (48h/24h/2h, 7d/48h) + audiencias (checklist, PDF) + resúmenes 8AM/semanal | 5 | 10 | H3 25% |
| **E7** | Versiones (diff) + compartición JWT (1h/24h/72h, watermark, revocar) + auditoría inmutable | 6 | 12 | H4 |
| **E8** | PWA/mobile + impresión legal + ZIP con contraseña + notifs in-app/email | 7 | 14 | H4 15% |
| **E9** | Staging QA integral superada (func., RAG, seguridad, perf, usabilidad, cross-browser) | 7 | 14 | H4 |
| **E10** | Prod Vercel+Railway+SSL+monitoreo 99.5% | 8 | 16 | H5 25% |
| **E11** | Docs: Manual Técnico + Usuario + Despliegue + troubleshooting | 8 | 16 | H5 |
| **E12** | Capacitación 2 sesiones + videos + soporte 60 días | 8 + garantía | 16-24 | H5 |

---

### METODOLOGÍA — SCRUM + KANBAN

| Elemento | Scrum | Kanban |
|----------|-------|--------|
| **Sprints** | 8 × 2 semanas (16 semanas) | Flujo continuo en tablero |
| **Artefactos** | Product Backlog, Sprint Backlog, Incremento (demo) | Tablero: Backlog → Por hacer → En curso → En revisión → Hecho |
| **Ceremonias** | Planning, Daily, Demo, Retro | Revisión diaria tablero, desbloqueo impedimentos |
| **Roles** | Product Owner (Buffet), Scrum Master (Santiago Acha), Dev Team | — |
| **WIP** | Sprint scope fijo | 1-2 tareas/persona |
| **Gestión tareas** | Jira/Trello/Notion | Mismo tablero |
| **Cambios alcance** | Al Backlog; ampliación requiere adenda | Adenda si aumenta alcance |
| **Dependencias** | Bloquean sprint si no se cumplen | Marcadas `blocked` |

---

### GESTIÓN DE RIESGOS — RESUMEN

> **Detalle completo con índice, matriz Prob×Impacto y planes por riesgo en `TDR_Gestion_Riesgos_KM_RAG.md`.**

| Categoría | ID ejemplo | Riesgo | Prob×Impacto → Severidad |
|-----------|------------|--------|--------------------------|
| **Hackeo / Técnico** | T11 | Hackeo prod (defacing, malware, ransomware vector DB) | Media×Alto → **Alta (6)** |
| **Hackeo / Técnico** | T02 | Fuga datos víctimas por mala RBAC/chunk | Alta×Crítico → **Crítica (9)** |
| **Información** | I02 | Clasificación auto errónea >30% (demanda→otro) | Media×Alto → **Alta (6)** |
| **Información** | I04 | Entrenamiento LLM con datos Buffet sin anonimizar | Baja×Crítico → **Media (3)** + **bloqueado por Contrato** |
| **SSL (SCCL)** | S01 | Cert TLS expirado / Vercel-Railway mismatch → http downgrade | Media×Alto → **Alta (6)** |
| **Operativo** | O01 | Retraso 20 casos muestra anonimizados | Media×Alto → **Alta (6)** |
| **Financiero** | F01 | Retraso pago hitos H2/H3 | Media×Alto → **Alta (6)** |

**Señales y mitigación rápida:**

| Riesgo | Señal alerta | Mitigación (prev) | Contingencia (react) |
|--------|--------------|--------------------|----------------------|
| T11 Hackeo | Alerta Sentry + anomaly logs, spike 5xx | WAF Vercel, CSP, `helmet`, rate limit, ZAP semanal, 2FA | Modo mantenimiento, restore backup cifrado <1h, rotar JWT/AES, notificar Buffet <24h |
| T02 Fuga víctimas | Audit log acceso no autorizado chunk | AES-256 campo + RBAC chunk + tests 403 | Bloquear usuario, revocar JWTs, auditar logs, notificar Buffet |
| I02 Clasif. errónea | Precisión <85% en QA S3 | Prompt ES jurídico + confirmación humana RF-09, threshold tuning | Fallback manual tagging, re-entrenar prompt, re-index batch |
| S01 SSL expirado | SSL Labs no A+, browser warning | Vercel/Railway auto-renew 90d, monitor UptimeRobot check SSL | Forzar renew `vercel certs`, `railway certs`, rollback a http→https |
| O01 Materiales | Semana 1 sin 20 casos | Recordatorio Semana 0/1, mocks sintéticos paralelos | Trabajar con placeholders, adelantar S2, reprogramar S3 +1 semana |

Ver ranking 29 riesgos + reserva 5 días + Bs. 800 en `TDR_Gestion_Riesgos_KM_RAG.md §5–6`.

---

### HERRAMIENTAS DE SEGURIDAD — SSL/TLS (SCCL)

| Herramienta | Dónde | Config concreta | Verificación |
|-------------|-------|-----------------|--------------|
| **TLS 1.3 (SCCL)** | Vercel (frontend) | Let's Encrypt auto, HSTS `max-age=31536000; includeSubDomains; preload`, http→https redirect, `vercel.json` headers | SSL Labs A+ (RNF-01) cada deploy |
| **TLS 1.3** | Railway (backend) | Railway proxy Let's Encrypt, cookies JWT `Secure; SameSite=Strict; HttpOnly`, `trust proxy` | Health `/health` TLS check |
| **AES-256-GCM** | Repo + campo | `AES_KEY` en Railway env (no repo), cifrado campo `victima.direccion`, `crypto`/`cryptography` | Audit reposo quincenal |
| **Helmet + CSP** | Express/FastAPI | `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy` | `securityheaders.com` A en S7 |
| **JWT + bcrypt + rate limit** | Auth | access 30 min + refresh 7d, bcrypt 12, 3 intentos bloqueo, `express-rate-limit` 100/15min | Prueba 4 intentos → bloqueo OK |
| **RBAC chunk** | API | `canAccess(docId, chunkId, role)` middleware, tests 403 | Test asistent no delete, abogado solo asignados |
| **Logs inmutables** | Postgres | `auditoria` sin GRANT UPDATE/DELETE, hash encadenado | Intento DELETE → error permisos |
| **Backups cifrados** | Railway Volumes/S3 | Daily AES-256, restore test quincenal <30 min | Script `restore.sh` OK |
| **WAF + ZAP** | Vercel + CI | WAF Vercel, `npm audit`/`pip-audit` bloquea high, ZAP semanal | 0 high en S7 + garantía mensual |

 Proforma SSL: `INF-SSL-001` — Let's Encrypt US$ 0 (recomendado); EV ~US$ 50/año solo si Buffet exige sello verde.

---

### HITOS DE PAGO VISUAL

```
S1(2)────S2(4)────S3(6)────S4(8)────S5(10)────S6(12)────S7(14)────S8(16)──── Garantía(24)
 │ H1 20%      │         ▲ H2 15%    │          ▲ H3 25%       │  ▲ H4 15%      ▲ H5 25%
 E1+E2         E3      E3+E4       E5        E5+E6          E7  E7+E8+E9   E10+E11+E12
 Plan+Figma   Auth     Ingesta     RAG      Alertas+       Vers  Pulido   Prod+Docs+Cap.
                         H2                 Audienc        Compart QA            H5→60d
                                                       H3                H4
```

---

### CARTA DE PROFORMA Y LÍMITES

Paquete en `proformas/` (ver `Carta_Entrega_Proformas_KM_RAG.md`):

| Proforma | Concepto | 1.er año aprox. | Límite |
|----------|----------|-----------------|--------|
| INF-001 | Dominio `.bo`/`.org.bo` (NIC Bolivia) | Bs 980 / Bs 280 | Buffet elige/paga; si >presupuesto → `.org.bo` o `.com` |
| INF-002 | Dominio `.com` (GoDaddy) | ≈ US$ 14,99 | Alternativa `.com` económica |
| INF-003 | Vercel Frontend | US$ 0 Hobby / US$ 20 Pro | Hobby cubre 4 meses + 99.5%; Pro solo con aprobación |
| INF-004 | Railway Backend+RAG+DB | US$ 5–20 Starter → US$ 20 Pro | Starter cubre S1–S8; escalado requiere adenda |
| INF-005 | PostgreSQL (Railway) | Incluido Railway | — |
| INF-006 | MongoDB Atlas | US$ 0 free → US$ 9 | Free cubre S1–S4; aprobación para M10 |
| INF-007 | Chroma/pgvector/Pinecone | US$ 0 / US$ 70 Pinecone | Preferencia Chroma/pgvector free |
| **INF-SSL-001** | **SSL/TLS (SCCL)** | **US$ 0 Let's Encrypt** / US$ 50 EV | Auto-renov 90d; EV solo si Buffet exige |

**Límite contractual:** Infra por cuenta Buffet. Equipo configura Vercel/Railway en cuentas Buffet o con handover. No se pagan planes premium sin aprobación escrita. Staging mantiene operatividad si dominio/hosting se retrasa.

---

### ANEXOS

- `TDR_KM_RAG.md` — TDR con uso herramientas + riesgos + SSL (índice §1–23)
- `TDR_Gestion_Riesgos_KM_RAG.md` — Gestión riesgos con índice (técnicos/hackeos, información, SSL, operativos, financieros)
- `Contrato_KM_RAG.md` — Contrato 16 cláusulas + SSL
- `Carta_Aceptacion_KM_RAG.md` — Aceptación
- `proformas/Carta_Entrega_Proformas_KM_RAG.md` + `INF-001` a `INF-SSL-001` — Proformas con límites
- `TDR.md` — RF/RNF base
- `User_Stories.md` — 30 US
- Figma — Entregado S1

