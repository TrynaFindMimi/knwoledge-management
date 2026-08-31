# MANUAL TECNICO — SISTEMA KM CON RAG

## Buffet de Asistencia Familiar — La Paz, Bolivia

**Fecha:** 30/08/2026
**Version:** 3.0
**Stack:** React 18 + Vite + Ant Design 5.x / FastAPI (Python) o Express (Node) + LangChain / LlamaIndex + Chroma/pgvector + PostgreSQL (+ MongoDB opcional) + Railway + Vercel
**Referencia:** `TDR_KM_RAG.md` v2.0 (29 RF + 19 RNF), `Contrato_KM_RAG.md`, `Estimacion_COCOMO_KM_RAG.md` (48.15 PM, 60,092 base), `Boveda_Contrasenas_KM_RAG.md`

---

## INDICE

1. Arquitectura General
2. Stack y Decisiones
3. Modelo de Datos (ER + Vector)
4. APIs REST + WebSocket (contrato completo)
5. Wireframes (16 vistas con AntD)
6. Versionado (codigo, documento v1..vN, embeddings)
7. Pipeline RAG
8. Seguridad (AES-256, TLS 1.3, RBAC chunk, boveda)
9. Despliegue (Vercel, Railway, Hostinger, Servidor Local)
10. Testing y Calidad
11. Troubleshooting y Operacion

---

## 1. Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│ PRESENTACION: React 18 + Vite + AntD 5.x (SPA)                  │
│ Sider colapsable, Header campana, Table/Form/Upload/Calendar    │
│ React Query + Axios, Zustand, React Router v6 guards            │
├─────────────────────────────────────────────────────────────────┤
│ API: FastAPI (Python) o Express (Node) — REST + WebSocket       │
│ /api/auth, /api/casos, /api/documentos, /api/busqueda,          │
│ /api/chat, /api/audiencias, /api/compartidos, /api/auditoria    │
│ /ws/chat, /ws/notificaciones — Socket.io                        │
├─────────────────────────────────────────────────────────────────┤
│ RAG: LangChain / LlamaIndex                                     │
│ chunk 500/100 → embed multilingual ES 768d → Chroma/pgvector    │
│ HNSW → rerank → LLM (GPT-4o-mini/Mistral 7B) → citas           │
├─────────────────────────────────────────────────────────────────┤
│ DATOS:                                                          │
│ PostgreSQL 15 (Railway) — transaccional + auditoria inmutable    │
│ MongoDB Atlas (opcional hibrido) — metadata flexible            │
│ Vector: ChromaDB / pgvector (HNSW) — 5,000 docs                 │
│ Storage: Railway Volumes / S3 — 50 MB, AES-256 reposo           │
├─────────────────────────────────────────────────────────────────┤
│ SEGURIDAD: AES-256-GCM + TLS 1.3 + JWT 30m + RBAC chunk-level   │
└─────────────────────────────────────────────────────────────────┘
```

Diagramas C4: `diagramas/c4/C4_01.svg` (Contexto), `C4_02.svg` (Contenedor), `C4_03.svg` (Componente), `C4_04.svg` (Despliegue Vercel+Railway), `C4_05.svg` y `C4_06.svg` (ADRs).

Despliegue principal: Frontend Vercel, Backend/RAG/DB en Railway (alternativas cotizadas Hostinger VPS y Servidor Local en proformas INF-008/INF-009, comparativa INF-010).

---

## 2. Stack y Decisiones

| Capa | Elegido | Alternativa | Criterio |
|------|---------|-------------|----------|
| Frontend | React 18 + Vite 5 | Next.js | SPA interna sin SSR, HMR <200ms |
| UI | Ant Design 5.x | MUI | Table/Form/Upload/DatePicker/Calendar empresariales |
| Estado | Zustand | Redux Toolkit | Ligero para auth/filtros |
| Data | TanStack Query + Axios | SWR | Cache + invalidacion |
| Backend | FastAPI (Python) | Express | Nativo para LangChain; Express si CRUD domina (decision Sprint 1) |
| RAG | LangChain / LlamaIndex | Haystack | Chunk/embed/retrieve/rerank/citas |
| Embeddings | paraphrase-multilingual / text-embedding-3-large | Cohere ES | Tolerancia errores/sinonimos juridicos |
| LLM | GPT-4o-mini / Mistral 7B local | Claude Haiku | Clasificacion auto + generacion; local si privacidad exige |
| Vector | ChromaDB (Railway) / pgvector | Pinecone (USD 70) | Costo 0, HNSW <3s |
| Relacional | PostgreSQL 15 | MySQL | ACID + auditoria + pgvector |
| NoSQL | MongoDB Atlas (hibrido) | — | Solo si metadata violencia domestica muy variable |
| Realtime | Socket.io | — | Chat + campana |
| Cron | BullMQ / node-cron / Railway Cron | Celery | Alertas 48h/7d, resumen 8AM |
| Deploy FE | Vercel | Netlify | Previews por PR, CDN |
| Deploy BE | Railway | Render/Fly/AWS | Todo-en-uno: API+DB+vector+cron |
| Monitoreo | Sentry + UptimeRobot | Grafana | 99.5% uptime |

Decision SQL vs Mongo se formaliza Sprint 1: PostgreSQL si esquema estable; Mongo si campos extra por tipo (violencia: medidaProteccion, riesgo); hibrido permitido sin costo extra.

### 2.1 Herramientas, Versiones Exactas y Licencias

Todas las versiones fijadas en `package.json` / `requirements.txt` / `Dockerfile` con bloqueo de dependencias (lockfile). Sin emojis.

| Herramienta | Version exacta | Licencia | Proposito en proyecto | Archivo lock |
|-------------|---------------|----------|-----------------------|--------------|
| Node.js | 20.11 LTS (Hydrogen) | MIT | Runtime frontend y backend Node | `.nvmrc` |
| Python | 3.11.7 | PSF | Runtime FastAPI + LangChain | `python-version` |
| React | 18.2.0 | MIT | SPA | `package.json` |
| Vite | 5.0.8 | MIT | Dev server HMR, build Rollup | `package.json` |
| Ant Design | 5.12.8 | MIT | UI Table/Form/Upload/DatePicker/Calendar/Tag/Badge | `package.json` |
| Ant Design Icons | 5.2.6 | MIT | Iconos consistentes | `package.json` |
| React Router | 6.21.1 | MIT | Rutas protegidas RequireAuth/RequireRole | `package.json` |
| Zustand | 4.4.7 | MIT | Estado auth, filtros, cola uploads | `package.json` |
| TanStack Query | 5.12.2 | MIT | Cache queries /api/casos | `package.json` |
| Axios | 1.6.2 | MIT | Cliente HTTP | `package.json` |
| jsPDF | 2.5.1 | MIT | Paquete PDF audiencia (portada) | `package.json` |
| JSZip | 3.10.1 | MIT | Export ZIP caso con indice | `package.json` |
| Recharts | 2.10.3 | MIT | Grafico barras tipo caso dashboard | `package.json` |
| FastAPI | 0.104.1 | MIT | REST + WebSocket /ws/chat | `requirements.txt` |
| Uvicorn | 0.24.0 | BSD | ASGI server | `requirements.txt` |
| Pydantic | 2.5.2 | MIT | Validacion + sanitizacion prompt | `requirements.txt` |
| SQLAlchemy | 2.0.23 | MIT | ORM Postgres | `requirements.txt` |
| psycopg2-binary | 2.9.9 | LGPL | Driver Postgres | `requirements.txt` |
| Alembic | 1.13.1 | MIT | Migraciones | `requirements.txt` |
| LangChain | 0.0.340 | MIT | Pipeline RAG chunk/retrieve/rerank | `requirements.txt` |
| LlamaIndex | 0.9.35 | MIT | Alternativa orquestacion RAG | `requirements.txt` |
| sentence-transformers | 2.2.2 | Apache 2.0 | Embeddings multilingual ES 768d | `requirements.txt` |
| OpenAI SDK | 1.6.1 | MIT | LLM GPT-4o-mini / embeddings | `requirements.txt` |
| ChromaDB | 0.4.18 | Apache 2.0 | Vector store HNSW | `requirements.txt` |
| pgvector | 0.2.4 (extension) + psycopg | MIT | Vector en Postgres | Postgres 15 |
| Express | 4.18.2 | MIT | Alternativa backend Node | `package.json` (si aplica) |
| Socket.io | 4.7.4 | MIT | Realtime chat + notifs | `package.json` |
| BullMQ | 5.1.1 | MIT | Cron alertas 48h/7d | `package.json` |
| Nodemailer | 6.9.7 | MIT | Email alertas + resumen | `package.json` |
| Resend | 3.2.0 | MIT | Alternativa email | `package.json` |
| jsonwebtoken | 9.0.2 | MIT | JWT 30m + refresh 7d | `package.json` |
| bcryptjs | 2.4.3 | MIT | Hash passwords 12 rounds | `package.json` |
| helmet | 7.1.0 | MIT | Headers CSP/HSTS | `package.json` |
| PostgreSQL | 15.4 | PostgreSQL | Transaccional + auditoria inmutable | Railway Postgres |
| MongoDB | 7.0.4 (Atlas M0/M10) | SSPL | Hibrido metadata flexible | Atlas |
| Railway CLI | 3.4.0 | MIT | Deploy backend | `railway.json` |
| Vercel CLI | 33.5.0 | Apache 2.0 | Deploy frontend | `vercel.json` |
| Git | 2.43.0 | GPL 2.0 | Control versiones | GitHub |
| GitHub Actions | runner 2.311 | MIT | CI lint+test+build | `.github/workflows/ci.yml` |
| Docker | 24.0.7 | Apache 2.0 | Contenedor backend (Hostinger/Local) | `Dockerfile` |
| Sentry SDK | 7.91.0 (JS) / 1.38.0 (Python) | MIT | Captura errores | `package.json`/`requirements.txt` |
| Vitest | 1.0.4 | MIT | Unit FE | `package.json` |
| Testing Library | 14.1.2 | MIT | Unit componentes AntD | `package.json` |
| Playwright | 1.40.1 | Apache 2.0 | E2E login->caso->doc->busqueda->compartir | `package.json` |
| k6 | 0.49.0 | AGPL 3.0 | Perf busqueda <3s 15 users 1k docs | `k6/script.js` |
| JMeter | 5.6.2 | Apache 2.0 | Carga/estres endurance 30m | `jmeter/plan.jmx` |
| OWASP ZAP | 2.14.0 | Apache 2.0 | Pen-test Top 10 | CI |
| Figma | App 116.5 | Propietario | Wireframes + design system | Figma cloud |
| KeePassXC / Bitwarden | 2.7.4 / 2023.12 | GPL 3.0 / AGPL | Boveda contrasenas | `documentos/seguridad/Boveda_Contrasenas_KM_RAG.md` |
| VS Code | 1.84.2 | MIT | IDE | `.vscode/settings.json` |
| ESLint | 8.55.0 | MIT | Lint | `package.json` |
| Prettier | 3.1.0 | MIT | Formato | `package.json` |

Versiones bloqueadas via `package-lock.json` y `poetry.lock` / `requirements.txt` con hash. Actualizacion trimestral planificada (ver Plan_Proyecto_Cronograma Garantia). Auditoria `npm audit` y `pip-audit` en CI bloquea deploy si high.

---

## 3. Modelo de Datos

### 3.1 ER Relacional (PostgreSQL)

Ver `diagramas/base_de_datos/Base_de_Datos_01.svg` (8 entidades + vector HNSW).

| Entidad | Campos clave | Relaciones |
|---------|--------------|------------|
| CASO | id (uuid), cliente, tipo (asistencia/patria/violencia/otro), estado (activo/en audiencia/cerrado), prioridad, fecha_creacion, abogado_id | 1:N documentos, 1:N audiencias, 1:N alertas |
| DOCUMENTO | id, caso_id FK, nombre_original, nombre_sistema, tipo_contenido (7 categorias), version_actual, fecha_carga, crypt_key, embedding_version | N:1 caso, 1:N versiones, 1:N permisos |
| VERSION | id, documento_id FK, numero (v1..vN), contenido_chunk, embedding_vector (768d), fecha_creacion, autor_id, diff_previa, hash | N:1 documento |
| USUARIO | id, nombre, email unico, rol (admin/abogado/asistente), institucion, password_hash (bcrypt 12), activo, ultimo_acceso | 1:N permisos, 1:N logs |
| PERMISO | id, usuario_id FK, documento_id FK, nivel_acceso, chunk_ids, link_temporal JWT, fecha_expiracion, usado, revocado | N:1 usuario+documento |
| AUDIENCIA | id, caso_id FK, fecha, hora, juzgado, tipo, documentos_requeridos (json), estado, checklist | N:1 caso |
| ALERTA | id, caso_id FK, usuario_id FK, tipo (audiencia/vencimiento), urgencia (critica/alta/media/baja), fecha_limite, activa, leida, canal | N:1 caso+usuario |
| LOG_ACCESO (AUDITORIA) | id, usuario_id, documento_id, accion (ver/editar/descargar/compartir/revocar), fecha, ip, detalle, hash_encadenado | Append-only, sin UPDATE/DELETE grants |

DDL Postgres (extracto):

```sql
CREATE TABLE casos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('asistencia','patria','violencia','otro')),
  estado TEXT DEFAULT 'activo',
  prioridad TEXT,
  abogado_id UUID REFERENCES usuarios(id),
  fecha_creacion TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE documentos (
  id UUID PRIMARY KEY,
  caso_id UUID REFERENCES casos(id),
  nombre_sistema TEXT NOT NULL,
  tipo_contenido TEXT,
  version_actual INT DEFAULT 1,
  crypt_key TEXT -- AES-256-GCM por documento
);
CREATE TABLE auditoria (
  id BIGSERIAL PRIMARY KEY,
  usuario_id UUID, documento_id UUID,
  accion TEXT, fecha TIMESTAMPTZ DEFAULT now(), ip INET,
  detalle JSONB, hash TEXT
);
REVOKE UPDATE, DELETE ON auditoria FROM public;
-- Vector: pgvector
CREATE EXTENSION vector;
CREATE TABLE chunks (
  id UUID PRIMARY KEY,
  documento_id UUID, version INT,
  contenido TEXT, embedding vector(768)
);
CREATE INDEX ON chunks USING hnsw (embedding vector_l2_ops);
```

MongoDB (si hibrido): coleccion `documentos` con `metadata` flexible (ej. violencia: `{medidaProteccion, comisaria, riesgo}`).

### 3.2 Modelo vectorial

- Chunk: 500 tokens, overlap 100, idioma ES
- Embedding: 768d multilingual, normalizado L2
- Indice: HNSW (M=16, efConstruction=200, efSearch=50) -> <3s con 1,000 docs, 10 concurrentes
- Re-ranker: cross-encoder (opcional) top-k 20 -> top-5

---

## 4. APIs REST + WebSocket

Base URL: `https://api.buffetkm.bo/api` (prod) o `https://km-rag-railway.up.railway.app/api` (staging)
Auth: Bearer JWT access 30 min + refresh 7d httpOnly. RBAC middleware `canAccess(docId, chunkId, role)`. Rate limit 100/15min global, 3 intentos login.

### 4.1 Auth

| Metodo | Ruta | Descripcion | Auth | RF |
|--------|------|-------------|------|----|
| POST | /auth/login | Login email+password, retorna access+refresh, set cookie httpOnly | No | RF-01 |
| POST | /auth/refresh | Renueva access con refresh valido | Refresh | RF-01 |
| POST | /auth/logout | Invalida refresh, limpia cookie | JWT | RF-01 |
| POST | /auth/forgot-password | Envia email reset con token 15m | No | RF-01 |
| GET | /auth/me | Perfil + rol | JWT | RF-02 |
| GET | /usuarios | Listar (admin) | admin | RF-02 |
| POST | /usuarios | Crear (admin) | admin | RF-02 |
| PATCH | /usuarios/:id/rol | Cambiar rol (solo admin) | admin | RF-02 |

Ejemplo login:

```
POST /auth/login
{"email":"abogada@buffet.bo","password":"Secreta12!"}
=> 200 {"accessToken":"eyJ...","user":{"id":"...","rol":"abogado"}}
   Set-Cookie: refreshToken=...; HttpOnly; Secure; SameSite=Strict
=> 401 {"error":"Credenciales invalidas"} tras 3 intentos => 429 bloqueado
```

### 4.2 Casos

| Metodo | Ruta | Descripcion | RF |
|--------|------|-------------|----|
| GET | /casos | Listar con filtros ?tipo=&estado=&q=&orden=audiencia (paginado) | RF-05/06 |
| POST | /casos | Crear {cliente*, tipo*, datos} -> ID unico | RF-05 |
| GET | /casos/:id | Detalle + docs + audiencias + auditoria | RF-06 |
| PATCH | /casos/:id | Editar | RF-05 |
| POST | /casos/:id/estado | Cambiar estado activo/en audiencia/cerrado + historial | RF-07 |
| POST | /casos/urgente | Crear caso violencia min campos (nombre+tipo) | RF-25 |

### 4.3 Documentos

| Metodo | Ruta | Descripcion | RF |
|--------|------|-------------|----|
| POST | /casos/:id/documentos | Upload multipart PDF/JPG/PNG/DOCX 50MB, chunk+embed+clasif auto, dedup >85% alerta | RF-08/09/10 |
| GET | /casos/:id/documentos | Listar con filtro categoria auto | RF-08 |
| GET | /documentos/:id | Meta + preview (watermark si compartido) | RF-08 |
| GET | /documentos/:id/versiones | Timeline v1..vN fecha/autor | RF-11 |
| GET | /documentos/:id/versiones/:v | Descargar vN | RF-11 |
| GET | /documentos/:id/diff?v1=2&v2=3 | Diff lado a lado (texto/PDF) | RF-11 |
| POST | /documentos/:id/clasificacion/confirmar | Confirmar/corregir categoria auto | RF-09 |
| DELETE | /documentos/:id | Soft delete (solo autorizados, RBAC) | RF-02 |

Upload respuesta 201:

```json
{
  "documentoId":"uuid",
  "nombreSistema":"2024-08-30_Mamani_Convenio_Visitas.pdf",
  "clasificacion":{"sugerida":"convenio","confianza":0.92},
  "duplicado": {"similarA":"uuid-otro","similitud":0.87,"accion":"usuario decide"},
  "versiones":1
}
```

### 4.4 Busqueda y Chat RAG

| Metodo | Ruta | Descripcion | RF |
|--------|------|-------------|----|
| GET | /busqueda?q=...&tipo=&caso=&desde=&hasta= | Busqueda semantica <3s, tolera errores/sinonimos | RF-12 |
| POST | /chat | Consulta NL coloquial -> respuesta con citas | RF-13 |
| GET | /chat/historial | Memoria conversacional | RF-14 |
| WS | /ws/chat | Chat realtime typing indicator | RF-14 |

GET /busqueda?q=convenio%20visitas%20Mamani

```json
{
  "query":"convenio visitas Mamani",
  "resultados":[
    {"documentoId":"...","titulo":"Convenio Transaccional Mamani 2024","snippet":"... <em>convenio</em> de visitas ...","score":0.91,"fuente":{"caso":"Mamani","fecha":"2024-03-15"},"tags":["convenio"] }
  ],
  "tiempo_ms": 842
}
```

POST /chat:

```json
{"pregunta":"que documentos faltan para la audiencia de Garcia maniana?"}
=> {"respuesta":"Faltan certificado de nacimiento y informe psicologico.","citas":[{"doc":"Informe Garcia","caso":"Garcia","fecha":"2024-08-28"}],"tiempo_ms":1240}
```

### 4.5 Audiencias y Alertas

| Metodo | Ruta | Descripcion | RF |
|--------|------|-------------|----|
| POST | /audiencias | Crear {caso_id*, fecha*, hora*, juzgado*, tipo*} -> checklist auto | RF-21 |
| GET | /audiencias?desde=&hasta= | Calendario/Table | RF-21 |
| GET | /audiencias/:id | Detalle checklist tenidos/faltantes/en tramite | RF-22 |
| PATCH | /audiencias/:id/checklist | Marcar en tramite / agregar requisito manual | RF-22 |
| GET | /audiencias/:id/paquete.pdf | PDF consolidado con portada, muestra peso | RF-23 |
| GET | /alertas | Listar activas por usuario | RF-15/16 |
| POST | /alertas/test | Disparar cron manual (solo staging) | — |
| GET | /notificaciones | Campana in-app, paginada, filtros | RF-26 |
| PATCH | /notificaciones/:id/leida | Marcar leida | RF-26 |

Cron jobs (BullMQ): `audiencias-48h`, `audiencias-24h`, `audiencias-2h`, `vencimientos-7d`, `vencimientos-48h`, `resumen-diario-8am`, `email-semanal-lunes-8am`.

### 4.6 Comparticion Segura

| Metodo | Ruta | Descripcion | RF |
|--------|------|-------------|----|
| POST | /compartidos | Generar JWT {documento_id, duracion: 1h/24h/72h, permiso, email} -> link | RF-18 |
| GET | /compartidos | Listar mis enlaces (estado, accesos IP) | RF-18 |
| GET | /s/:token | Acceso publico JWT single-use, solo-lectura watermark, log IP/hora | RF-19 |
| POST | /compartidos/:id/revocar | Revocar inmediato + notif email + log | RF-20 |
| GET | /compartidos/:id/accesos | Auditoria accesos por enlace | RF-04/20 |

### 4.7 Export / Impresion / Dashboard / Auditoria

| Metodo | Ruta | Descripcion | RF |
|--------|------|-------------|----|
| GET | /casos/:id/export.zip?password=opcional | ZIP con carpetas por tipo + indice + nombres descriptivos | RF-29 |
| GET | /documentos/:id/print | HTML imprimible tamano legal con encabezado | RF-28 |
| GET | /dashboard/kpis | KPIs casos/docs/audiencias/alertas | RF Dashboard |
| GET | /auditoria?desde=&hasta=&usuario=&accion= | Reporte inmutable por rango, export Excel | RF-04 |
| GET | /health | Uptime, DB, vector, LLM latencia | RNF-09 |
| GET | /metrics | Prometheus (opcional) | — |

### 4.8 WebSocket

- `WS /ws/chat` — eventos `chat:message`, `chat:typing`, `chat:response` con citas
- `WS /ws/notificaciones` — `notif:nueva`, `notif:leida`, badge realtime

Todos los endpoints validan RBAC chunk-level: `canAccess(docId, chunkId, role)`; 403 si no autorizado.

---

## 5. Wireframes (16 vistas)

Figma: design system AntD (tokens Buffet, tipografia, colores, breakpoints). Ver `diagramas/c4/C4_*.svg` y `diagramas/componentes/*.svg` para componentes; este manual detalla cada vista a nivel wireframe.

| # | Vista | Ruta | Wireframe (descripcion) | Componentes AntD | Estados |
|---|-------|------|--------------------------|------------------|---------|
| 1 | Login | /login | Form centrado card, logo Buffet, inputs email/password (12 carac. tooltip), boton Ingresar primary con spinner, link Olvide password, Alert error/bloqueo | Form, Input, Input.Password, Button, Alert | normal, loading, error credenciales, bloqueado 3 intentos |
| 2 | Dashboard | / (protegido) | Sider colapsable (logo, Menu: Dashboard/Casos/Busqueda/Chat/Audiencias/Compartidos/Auditoria/Admin), Header (Breadcrumb, Search global, Campana Badge, Avatar), 4 Statistic Cards (casos activos, docs mes, audiencias, alertas) con Trend, grafico barras por tipo, Table 5 proximas audiencias + Ver todas, List docs recientes con Tags, boton URGENTE flotante danger | Layout.Sider/Header, Menu, Card, Statistic, Table, List, Tag, Badge, Button | normal, loading skeletons, vacio |
| 3 | Listado Casos | /casos | Filtros row: Select tipo, Select estado, Input.Search cliente, DatePicker audiencia, botones Buscar/Limpiar; Table con columnas cliente, tipo Tag color, estado Badge, audiencia, #docs, acciones Ver eye + dropdown Cambiar estado; paginacion; boton + Nuevo caso primary abre Drawer | Table, Select, Input.Search, DatePicker, Tag, Badge, Drawer, Form | normal, filtrado, vacio illustration, 403 |
| 4 | Detalle Caso | /casos/:id | Header caso: nombre+ID+Tags tipo/estado/prioridad+audiencia proximal, botones Editar/Cambiar estado/Exportar ZIP/Imprimir portada; Tabs: Documentos (A5), Audiencias (A8), Compartidos, Auditoria timeline; Dragger upload multiple 50MB al final | Tabs, Tag, Badge, Button, Dragger, Timeline | normal, sin docs, loading |
| 5 | Docs en caso | dentro /casos/:id tab Docs | List/Table docs: nombre descriptivo, Tag clasificacion auto, Badge vN, fecha, autor, filtros categoria; Alert duplicado >85%: Similar a [doc] con botones Es duplicado / Es version nueva; Drawer versiones: timeline v1,v2 fecha/autor + Descargar vN + Comparar diff | List, Table, Tag, Badge, Alert, Drawer, Timeline | normal, duplicado warning, sin docs |
| 6 | Busqueda Semantica | /busqueda | Input.Search grande placeholder "convenio visitas Mamani 2024 (tolera errores y sinonimos)"; Cards resultado: titulo, snippet resaltado, score, fuente caso/fecha, Tags; filtros tipo/caso/fecha; paginacion; estado vacio illustration | Input.Search, Card, Tag, Select, DatePicker | normal, loading <3s, vacio, error LLM |
| 7 | Chat RAG | /chat + Drawer flotante | Ventana chat burbujas usuario der / assistant izq con citas links (doc/caso/fecha); TextArea + Enviar (Enter); Chips sugerencias; typing indicator <3s; memoria "y que mas de Mamani?" | List, Input.TextArea, Button, Tag | normal, typing, error, sin historial |
| 8 | Audiencias | /audiencias | Calendar/Table toggle, boton + Registrar audiencia (Modal: Select caso*, DatePicker fecha*, TimePicker hora*, Input juzgado*, Select tipo* -> genera checklist auto); Detalle checklist columnas Tenidos verde / Faltantes rojo / En tramite amarillo + Agregar requisito; boton Generar paquete PDF con peso preview | Calendar, Table, Modal, Form, DatePicker, Tag, Badge, Button | normal, sin audiencias, faltantes badge |
| 9 | Compartidos | /compartidos | Table: doc, destinatario, JWT truncado, duracion 1h/24h/72h, estado (activo/expirado/revocado), accesos IP, acciones Revocar danger; Modal Compartir: Select doc, Select duracion, Radio permiso, Input email -> Generar enlace copiable; preview solo-lectura watermark | Table, Modal, Form, Select, Tag, Badge | normal, expirado gris, revocado |
| 10 | Notificaciones | Header campana + /notificaciones | Header Badge contador no leidas; Dropdown agrupadas por tipo + Marcar todas leidas; pagina /notificaciones List con filtros tipo, paginacion, Marcar leida individual | Badge, Dropdown, List | normal, sin notifs, todas leidas |
| 11 | Admin Usuarios | /admin/usuarios (solo admin) | Table: nombre/email/rol Tag/estado/ultima sesion; botones + Nuevo, Editar rol, Bloquear/desbloquear | Table, Tag, Button, Modal | normal, 403 no admin |
| 12 | Admin Auditoria | /admin/auditoria (solo admin) | Table inmutable: usuario, accion, doc/caso, fecha, IP; filtros fecha/tipo/usuario; boton Exportar reporte Excel rango; sin borrado (intento bloqueado) | Table, DatePicker, Select, Button | normal, sin logs, export |
| 13 | Admin Config | /admin/config | Tabs: general (nombre/logo), notificaciones hora, retardos alertas, retencion logs | Tabs, Form, Input | normal |
| 14 | Perfil | /perfil | Card datos usuario, Form cambiar password 12 carac. validacion, 2FA futuro placeholder | Form, Input.Password | normal, error validacion |
| 15 | Imprimir/Export | en doc/caso | Imprimir: dialogo navegador tamano legal con encabezado caso/fecha; Exportar ZIP: carpetas por tipo + indice txt + nombres descriptivos + checkbox ZIP con contrasena | Button, Modal | normal |
| 16 | Errores | * | 404 illustration + Ir al dashboard; 403 Sin permisos; 500 Error interno recargar | Result | — |

Todos los wireframes validados mobile-first: Drawer en mobile, Table responsive, PWA-ready. Ver componentes en `diagramas/componentes/Componentes_01.svg` a `Componentes_09.svg` y C4.

---

## 6. Versionado

### 6.1 Codigo (Git)

| Rama | Uso | Proteccion |
|------|-----|------------|
| main | Prod (Vercel prod + Railway prod) | Require PR review + CI verde |
| develop | Staging (Vercel preview + Railway staging) | Require PR |
| feature/* | Sprint tasks | — |

Tag semver `v1.0.0` en H5 (prod). Changelog en `CHANGELOG.md`. Commit convencional `feat:`, `fix:`, `docs:`.

### 6.2 Documento legal v1..vN (RF-11)

- Cada upload con >85% similitud pregunta: Es duplicado (cancela) vs Es version nueva (incrementa vN)
- Se conserva version anterior completa (nunca se sobreescribe, RB-18/19/20)
- `GET /documentos/:id/versiones` timeline cronologica v1,v2 fecha/autor; `GET .../diff?v1=2&v2=3` diff lado a lado
- Busqueda retorna version mas reciente por defecto (RB-20); descarga de cualquier vN permitida
- Hash SHA-256 por version para integridad

### 6.3 Embeddings y Vector Store

- Cada version genera nuevo embedding 768d (versionado `embedding_version`)
- Re-index batch si drift > umbral o cambio de modelo embeddings (ver `Gestion_Riesgos_KM_RAG.md` I03)
- HNSW params versionados en `vector_config.json`

### 6.4 Documentacion

- Este manual version 3.0 corresponde a TDR v2.0 + COCOMO II 60,092 base + 8 sprints + garantia 60d
- Sin control de cambios (eliminado por solicitud); historial en Git log

---

## 7. Pipeline RAG (detalle)

```
Ingesta: load (PDF/JPG/PNG/DOCX via OCR si imagen) -> chunk 500/100 (semantico) -> embed ES 768d -> store (Chroma/pgvector HNSW) -> clasif LLM 7 categorias + renombrado scan001.jpg -> dedup >85% -> versionar
Busqueda: query -> embed query -> retrieval top-k 20 (vector) -> rerank cross-encoder -> top-5 -> LLM generate con citas [fuente: doc, caso, fecha] -> respuesta <3s
Chat: mismo + memoria conversacional (historial 10 turnos) + sugerencias chips
Clasificacion prompt ES juridico boliviano: "Clasifica en: demanda, contestacion, informe psicologico, certificado medico, orden proteccion, comprobante pago, otro. Basado en contenido, no nombre. Devuelve json {categoria, confianza, nombreSugerido}"
```

Tolerancia errores: `conbenio` -> `convenio` via embeddings; sinonimos `contestacion` = `respuesta a demanda`.

Metricas QA Sprint 7: recall/precision >=85% en dataset 100 queries, citacion correcta 100%, <3s p95 con 1,000 docs 15 concurrentes (k6 + JMeter).

---

## 8. Seguridad

- Transito: TLS 1.3 Vercel (HSTS HSTS max-age 31536000) + Railway proxy, calificacion A+ SSL Labs (RNF-01)
- Reposo: AES-256-GCM en BD, archivos, backups; campo victima.direccion cifrado a nivel columna (RNF-02)
- Auth: JWT access 30m + refresh 7d httpOnly, bcrypt 12, bloqueo 3 intentos (RNF-03), expiracion 30m inactividad (RNF-04)
- RBAC: roles admin/abogado/asistente + chunk-level `canAccess` (RNF-05), asistencia no elimina, abogado solo ve asignados
- Auditoria: tabla `auditoria` sin UPDATE/DELETE grants, hash encadenado (RNF-06)
- Boveda: ver `documentos/seguridad/Boveda_Contrasenas_KM_RAG.md` — AES_KEY/JWT_SECRET en Railway/Vercel env, rotacion 90d, handover H5
- Headers: CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin (helmet)
- Validacion: file magic-bytes (no solo extension), 50MB limit, ZAP semanal, npm/pip audit bloquea high

---

## 9. Despliegue

| Entorno | Frontend | Backend | DB | Vector | Dominio | Proforma |
|---------|----------|---------|----|--------|---------|----------|
| Prod (adoptado) | Vercel (Hobby USD 0 / Pro USD 20) | Railway (Starter USD 5-20 / Pro USD 20) | Railway Postgres incluido | Chroma/pgvector USD 0 | .bo Bs 980 / .com USD 15 | INF-003/004/001/002/SSL |
| Alt Hostinger | Hostinger VPS (USD 7-30/mes) | Hostinger VPS | Postgres self-host | Chroma | Hostinger dominio | INF-008 |
| Alt Local | Servidor on-premise (Bs 8k-15k hw + Bs 500/mes energia) | Local | Postgres local | Chroma | Local IP | INF-009 |
| Comparativa | Ver INF-010 | — | — | Pinecone USD 70 si managed | — | INF-010 |

Env vars prod (Railway/Vercel): `JWT_SECRET`, `AES_KEY`, `DATABASE_URL`, `OPENAI_API_KEY`, `RESEND_API_KEY`, `SENTRY_DSN` (ver Boveda Seccion 4).

CI/CD: GitHub Actions `main` -> prod, `develop` -> preview; lint+test+build -> deploy.

Backups: Railway Volumes daily + S3 versionado AES-256, restore test quincenal <30m (`restore.sh`).

---

## 10. Testing y Calidad

| Tipo | Tool | Criterio | Sprint |
|------|------|----------|--------|
| Unit FE | Vitest + Testing Library | Componentes AntD | S2-7 |
| E2E | Playwright | login->crear caso->subir->buscar->compartir | S2-7 |
| Unit BE | Pytest / Jest | API + RBAC | S2-7 |
| Perf | k6 + JMeter | busqueda_p95 <3s, ops_p95 <2s, 15 users, 1k docs | S7 |
| Seguridad | OWASP ZAP + npm audit | 0 high | S7 |
| RAG | Dataset 100 queries | recall/precision >=85%, citas ok | S4/7 |
| Usabilidad | 3 abogados reales | <5 min sin ayuda, <5 clics | S7 |
| Cross-browser | BrowserStack | Chrome/Firefox/Safari desktop+mobile | S7 |

Reporte QA entregado en E9 (staging) con 0 criticas.

---

## 11. Troubleshooting y Operacion

| Sintoma | Causa probable | Accion |
|---------|----------------|--------|
| Busqueda >3s | HNSW efSearch bajo / LLM latencia | Subir efSearch 50->100, cache embeddings, verificar Railway metrics, escalar Railway Pro |
| Clasificacion erratica | Prompt drift | Reconfirmar humano RF-09, re-entrenar prompt, threshold tuning |
| JWT 401 | Secret rotado sin redeploy | Verificar Railway env + redeploy, invalidar refresh |
| AES decrypt fail | AES_KEY rotado sin re-encrypt campo | Restaurar backup <30m, re-encrypt con nueva key |
| Alerta no llega | Cron BullMQ caido | Railway Cron logs, re-queue, verificar Resend/Socket.io |
| Cert SSL warning | Let's Encrypt no auto-renew | Vercel/Railway certs renew, UptimeRobot SSL check |
| Backup no restaurable | Volumen corrupto | Probar restore quincenal script `restore.sh` |

Contacto: Mariana (PM) +591 XXXXXXXX, Santiago (Tech Lead) — horario Lun-Vie 9-18 BT. Post-garantia requiere nuevo contrato.

---

## 12. Anexos

- `TDR_KM_RAG.md` (29 RF + 19 RNF + uso herramientas 9.4)
- `Contrato_KM_RAG.md` (16 clausulas, 60,092 base)
- `Estimacion_COCOMO_KM_RAG.md` (COCOMO II WAE-RAG)
- `documentos/cotizacion/Cotizacion_KM_RAG.md` (hitos H1-H5)
- `documentos/proformas/Carta_Entrega_Proformas_KM_RAG.md` + INF-001..010 + INF-SSL-001
- `documentos/seguridad/Boveda_Contrasenas_KM_RAG.md`
- `diagramas/bpwin/BPWin_*.svg` (7 procesos IDEF0), `diagramas/c4/*.svg`, `diagramas/base_de_datos/*.svg`, `diagramas/componentes/*.svg`, `diagramas/casos_de_uso/*.svg`, `diagramas/actividades/*.svg`, `diagramas/uml/*.svg`
- `Plan_Proyecto_Cronograma_KM_RAG.md` (8 sprints)
