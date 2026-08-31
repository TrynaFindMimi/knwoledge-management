# CARTA DE ACEPTACIÓN DE TÉRMINOS DE REFERENCIA

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG — BUFFET DE ASISTENCIA FAMILIAR

---

**FECHA:** [dd/mm/aaaa]

**LUGAR:** La Paz, Estado Plurinacional de Bolivia

---

### DESTINATARIO

**Buffet de Asistencia Familiar** 
Servicio legal gratuito — Derecho de Familia 
[Dirección, La Paz, Bolivia] 
Correo: buffet.asistencia.familiar@gmail.com

**Atención:** ________________________ (Responsable del Proyecto / Product Owner)

---

### REMITENTES

| # | Nombre | C.I. N.º | Rol en el proyecto |
|---|--------|----------|---------------------|
| 1 | Mariana del Arroyo | ________ | Project Manager / Scrum Master |
| 2 | Nahomi Humerez | ________ | Diseñadora UX/UI |
| 3 | Santiago Acha | ________ | Tech Lead Fullstack / RAG Engineer |
| 4 | Jorge Saenz | ________ | Frontend Developer / QA |

---

### ASUNTO: ACEPTACIÓN FORMAL DE TÉRMINOS DE REFERENCIA Y COMPROMISO DE EJECUCIÓN

---

Estimados miembros del Buffet de Asistencia Familiar:

Por medio de la presente, quienes suscribimos, en nuestra calidad de **Equipo de Desarrollo**, manifestamos nuestra **aceptación formal e incondicional** de los Términos de Referencia correspondientes al proyecto **"Sistema de Gestión de Conocimiento (KM) con RAG para el Buffet de Abogados de Asistencia Familiar"**, documentos de referencia **`TDR_KM_RAG.md`** (v2.0) y **`TDR.md`** (v1.0 — 29 RF + 19 RNF) en sus versiones vigentes, así como del **Contrato de Prestación de Servicios de Desarrollo de Software** (`Contrato_KM_RAG.md`) anexo a esta carta.

---

### 1. DECLARACIONES DEL EQUIPO DESARROLLADOR

Mediante la presente declaramos que:

1. **Conocemos y comprendemos** en su totalidad los alcances, límites, 29 requerimientos funcionales y 19 no funcionales, entregables (E1-E12), cronograma de 16 semanas (8 sprints), condiciones técnicas y económicas establecidos en los TDR y en el Contrato.

2. **Aceptamos todos los términos y condiciones** establecidos, incluyendo expresamente la **Cláusula Primera del Contrato** sobre régimen legal y **no suspensión de pago**, y la **Cláusula Octava** de confidencialidad extendida (3 años) para datos de víctimas/menores.

3. **Contamos con la capacidad técnica, recursos humanos y herramientas necesarias** para ejecutar el proyecto en plazo y con los estándares de calidad exigidos, conforme al siguiente stack propuesto:

| Componente | Tecnología propuesta |
|------------|---------------------|
| **Frontend** | React 18 + Vite + Ant Design 5.x, React Query, React Router, Zustand |
| **UI / Diseño** | AntD Design System, Figma, responsive PWA-ready |
| **Backend API** | FastAPI (Python) **o** Express (Node) — decisión Sprint 1 según contenido (Python si RAG nativo) |
| **RAG Orquestación** | LangChain / LlamaIndex — chunking, retrieval, generación con citas |
| **Embeddings** | sentence-transformers multilingual ES / text-embedding-3-large (ES jurídico boliviano) |
| **LLM** | GPT-4o-mini / Claude Haiku o Mistral 7B local (según presupuesto/privacidad) |
| **Vector DB** | ChromaDB / pgvector / Pinecone (elección según infra) |
| **BD Relacional** | PostgreSQL 15 (Railway) — transaccional (casos, audiencias, auditoría) |
| **BD NoSQL** | MongoDB Atlas — si documentos semi-estructurados requieren flexibilidad (decisión Sprint 1 híbrida) |
| **Storage** | Railway Volumes / S3-compatible, 50MB por archivo, versionado |
| **Realtime** | WebSocket (Socket.io) para chat y notificaciones in-app |
| **Deployment Frontend** | **Vercel** (CI/CD, previews, CDN) |
| **Deployment Backend** | **Railway** (API, RAG workers, Postgres/Mongo, vector, cron, env cifradas) |
| **Cifrado** | AES-256-GCM (reposo + campo víctimas), TLS 1.3 (tránsito), bcrypt, JWT |
| **Notificaciones** | Nodemailer / Resend + cron (BullMQ / node-cron) |
| **Monitoreo** | Sentry + UptimeRobot + Railway Metrics |
| **Control versiones** | Git + GitHub privado, GitHub Actions CI/CD |
| **Testing** | Vitest + Playwright + Pytest/Jest + k6 |
| **Entorno trabajo** | VS Code, Figma, Trello/Jira/Notion, Google Meet/Zoom, WhatsApp (horario laboral) |

4. **Nos comprometemos a cumplir** con la totalidad de entregables, plazos, hitos de pago bajo modalidad de "alquiler" del servicio, obligaciones de confidencialidad, garantía (60 días) y **licencia de uso (sin cesión de propiedad intelectual, que permanece en el EQUIPO)** estipulados.

---

### 2. ACEPTACIÓN DE LÍMITES Y ALCANCES

#### 2.1. Alcances aceptados (INCLUYE)

| Módulo | Confirmación |
|--------|--------------|
| Frontend SPA React+Vite+AntD responsive (dashboard, casos, docs, búsqueda, chat, audiencias, compartidos, admin) | Sí |
| Auth segura (JWT 30 min, bloqueo 3 intentos, AES-256 campo víctima, TLS 1.3, RBAC chunk-level, auditoría inmutable) | Sí |
| Gestión de casos CRUD (tipos, estados, urgente, filtros, orden audiencia) | Sí |
| Ingesta docs (50MB, drag&drop, chunking, embeddings) + **clasificación automática por contenido** + dedup >85% + versiones con diff | Sí |
| Motor RAG (búsqueda semántica <3s ≥85%, consulta NL coloquial con citas, chat flotante con memoria) | Sí |
| Alertas proactivas (48h/24h/2h audiencias, 7d/48h vencimientos, resumen diario 8AM, in-app + email) | Sí |
| Gestión audiencias (registro, checklist tenidos/faltantes/en trámite, paquete PDF con portada) | Sí |
| Compartición segura (JWT 1h/24h/72h, single-use, solo-lectura watermark, revocar + notificar + auditar) | Sí |
| Dashboard KPIs + reportes auditoría por rango | Sí |
| Despliegue Vercel (frontend) + Railway (backend/RAG/DB/cron) + SSL + dominio + backups + monitoreo 99.5% | Sí |
| Elección BD: PostgreSQL (SQL) si transaccional estable / MongoDB si semi-estructurado flexible / híbrido permitido | Sí |
| Testing integral (unit/E2E/pen-test/RAG recall/perf/usabilidad) | Sí |
| Documentación (Manual Técnico, Usuario, Despliegue, troubleshooting) | Sí |
| Capacitación (2 sesiones + videos) + garantía 60 días | Sí |
| Pre-carga 20 casos/docs de prueba | Sí |

#### 2.1.1. DESGLOSE DETALLADO DE VISTAS, COMPONENTES Y FLUJOS

Aceptamos implementar cada vista con sus componentes AntD, botones, validaciones, estados (normal, loading, vacío, error, 403) y flujos:

| # | Vista | Ruta | Componentes y acciones clave |
|---|-------|------|------------------------------|
| 1 | **Login** | `/login` | AntD Form (email, Input.Password), **"Ingresar"** (loading + Alert error/bloqueo), **"Olvidé contraseña"** → email reset |
| 2 | **Dashboard** | `/` | Sider colapsable + Header (Search + **Campana Badge** + Avatar), 4 Statistic Cards, gráfico barras tipo caso, tabla 5 audiencias próximas + **"Ver todas"**, lista docs recientes con Tags, **Botón URGENTE flotante** |
| 3 | **Listado Casos** | `/casos` | Filtros Select + Search + DatePicker, **"Buscar"/"Limpiar"**, Table (cliente, tipo Tag, estado Badge, audiencia, #docs), **"+ Nuevo caso"** (Drawer Form), **"Ver"**, **Cambiar estado** dropdown + timeline historial |
| 4 | **Detalle Caso** | `/casos/:id` | Header con Tags + **"Editar/Cambiar estado/Exportar ZIP/Imprimir"**, Tabs (Docs, Audiencias, Compartidos, Auditoría timeline), **Dragger** upload múltiple 50MB |
| 5 | **Docs en caso** | dentro de `/casos/:id` | List docs (nombre descriptivo, Tag clasificación auto, Badge vN), **"Confirmar/Corregir"** clasificación, **Alert duplicado >85%** con **"Es duplicado/Es versión nueva"**, Drawer versiones (timeline + **"Descargar vN"** + **"Comparar diff"**) |
| 6 | **Búsqueda Semántica** | `/busqueda` | Input.Search grande, Cards resultado (snippet resaltado, score, fuente caso/fecha + Tags), filtros tipo/caso/fecha, estado vacío ilustrado |
| 7 | **Chat RAG** | `/chat` + Drawer flotante | Burbujas + citas linkeadas, TextArea + **"Enviar"**, Chips sugerencias, typing indicator <3s, memoria `¿y qué más de Mamani?` |
| 8 | **Audiencias** | `/audiencias` | Calendar/Table, **"+ Registrar audiencia"** (Modal caso+fecha+hora+juzgado+tipo → checklist auto), detalle checklist **Tenidos/Faltantes (rojo)/En trámite**, **"Agregar requisito"**, **"Generar paquete PDF"** (peso preview → descarga) |
| 9 | **Compartidos** | `/compartidos` | Table (doc, destinatario, JWT truncado, duración, estado, accesos IP), Modal **"Compartir"** (doc+duración+permiso lectura), watermark preview, **"Revocar"** (Confirm → inmediato + notif + log) |
| 10 | **Notificaciones** | Header campana + `/notificaciones` | Badge no leídas, Dropdown agrupadas, **"Marcar como leída/todas"**, List /notificaciones filtrable |
| 11 | **Admin Usuarios** | `/admin/usuarios` (solo admin) | Table (nombre/email/rol/estado/última sesión), **"+ Nuevo"**, **"Editar rol"**, **"Bloquear"** |
| 12 | **Admin Auditoría** | `/admin/auditoria` (solo admin) | Table inmutable (usuario, acción, doc/caso, fecha, IP), filtros fecha/tipo/usuario, **"Exportar reporte"** Excel rango, sin borrado |
| 13 | **Admin Config** | `/admin/config` | Tabs general/logo, notifs hora resumen, retardos alertas, retención logs |
| 14 | **Perfil** | `/perfil` | Datos, **Cambiar password** (12 carac. validación) |
| 15 | **Imprimir/Export** | en doc/caso | **"Imprimir"** → diálogo navegador tamaño legal + encabezado caso/fecha; **"Exportar caso ZIP"** → carpetas por tipo + índice + nombres descriptivos + **"ZIP con contraseña"** opcional |
| 16 | **Páginas error** | `*` | 404 ilustrada + **"Ir al dashboard"**, 403 "Sin permisos", 500 "Error interno — recargar" |

#### 2.2. Límites aceptados (NO INCLUYE)

| Exclusión | Confirmación |
|-----------|--------------|
| Logotipo/identidad (provisto por Buffet) | Sí |
| Marketing / redes sociales | Sí |
| Migración masiva 200 docs históricos (solo 20 pre-carga prueba) | Sí |
| Integración LEXIUS / judicial / ERP / contable | Sí |
| App móvil nativa (solo web responsive PWA-ready) | Sí |
| Redacción contenido legal / políticas privacidad — **solo transcribimos** lo que el Buffet provea; Buffet único responsable de redactar/aprobar | Sí |
| Hosting/dominio/planes premium LLM/vector DB más allá tiers gratuitos — **por cuenta del Buffet**; configuramos Vercel/Railway en sus cuentas o con handover; si no tiene, entregamos guía/proformas. **No pagamos planes sin aprobación**. Incluso si Vercel/Railway requieren upgrade por volumen, es costo Buffet | Sí |
| Fine-tuning/entrenamiento LLM externo con datos Buffet sin consentimiento anonimizado | Sí |
| Soporte 24/7 presencial (solo garantía 60 días + opción mensual) | Sí |
| Pasarela de pago (no aplica; buffet gratuito) | Sí |

---

### 3. COMPROMISO DE EJECUCIÓN

#### 3.1. Cronograma y vigencia aceptados (4 meses — 8 sprints × 2 semanas)

| Fase | Semanas | Entregables |
|------|---------|-------------|
| Planificación + Diseño | 1–2 | **E1:** Plan/cronograma; **E2:** Figma + design system + arquitectura + decisión BD (SQL/Mongo/híbrido) |
| Fundamentos | 3–4 | **E3:** Auth + Casos (CRUD, RBAC, listar, estado) + layout AntD responsive |
| Ingesta inteligente | 5–6 | **E4:** Upload 50MB + chunking + embeddings + clasificación auto + dedup >85% + renombrado |
| RAG Core | 7–8 | **E5:** Búsqueda <3s ≥85% + consulta NL con citas + chat conversacional flotante |
| Alertas & Audiencias | 9–10 | **E6:** Registro audiencia + checklist auto + paquete PDF + alertas 48h/24h/2h/7d + resumen 8AM |
| Seguridad avanzada | 11–12 | **E7:** Versiones (timeline+diff) + compartición JWT (1h/24h/72h, watermark, revocar) + auditoría inmutable |
| Pulido & QA | 13–14 | **E8:** PWA/mobile + impresión + ZIP + notifs in-app/email; **E9:** Staging QA integral (func., pen-test, RAG recall, perf, usabilidad) |
| Despliegue & Cierre | 15–16 | **E10:** Prod Vercel+Railway+SSL; **E11:** Manual Técnico/Usuario/Despliegue; **E12:** 2 capacitaciones + videos |
| Garantía | 17–24 | Corrección bugs atribuibles sin costo |

**Vigencia y fin de relación.** Aceptamos que el contrato está vigente desde firma hasta entrega completa (E10+E11+E12) más **60 días de garantía** post-producción (semanas 17–24). Vencido, se extingue plenamente.

**Nuevas implementaciones post-garantía.** Entendemos que toda feature/modificación/mejora/afinamiento RAG/re-indexado solicitado tras garantía es **nuevo proyecto** con **nuevo contrato** (alcances, plazos, economía propias). El presente no genera obligación de mantenimiento continuo más allá de garantía.

#### 3.2. Metodología aceptada

- Frontend **React + Vite + AntD 5.x**, estado Zustand/Redux, React Query + Axios, React Router, jsPDF/JSZip, AntD Tokens.
- Backend **FastAPI/Express + LangChain/LlamaIndex**, embeddings ES, LLM, Chroma/pgvector/Pinecone, Postgres/Mongo (decisión Sprint 1 híbrida según contenido), S3, WebSocket, BullMQ/cron.
- Sprints 2 semanas con demo funcional incrementada al final de cada sprint (Meet/Zoom + grabación).
- Tablero Kanban Trello/Jira/Notion (Backlog→Por hacer→En curso→En revisión→Hecho), WIP 1-2 por persona.
- Comunicación WhatsApp coordinación rápida **solo horario laboral** (Lun-Vie 9:00-18:00 BT) + email formal + Meet/Zoom demos. **No se contestarán mensajes fuera de horario.**
- Reuniones formales: Sprint Planning, Daily 15 min virtual, Demo+Retros. Extras con 24h preaviso.
- Repo GitHub privado con acceso Buffet, ramas `main`/`develop`/`feature/*`, PR review obligatorio, CI/CD GitHub Actions → Vercel + Railway.
- Despliegue por ambientes: `develop` → staging (Railway) → `main` → producción.

#### 3.3. Forma de pago aceptada — 5 hitos COCOMO II WAE-RAG bajo modalidad de "alquiler" del servicio (Bs. 67,904 IVA incl. con margen 26.7%)

Aceptamos **Bs. 67,904.21** total IVA incluido (Bs. 60,092.00 base + Bs. 7,812.21 IVA 13%) — Opcion A WAE-RAG mercado 12.01 KLOC / 48.15 PM x 1,248 (margen 26.7% incluido, ver `documentos/cotizacion/Cotizacion_KM_RAG.md` Seccion 8) **en modalidad de "alquiler" del servicio (licencia de uso, no compra de código)**:

| Hito | Plazo | % | Bs. IVA incl. | Entregable que habilita periodo de "alquiler" |
|------|-------|---|---------------|-----------------------------------------------|
| **H1** | Semana 2 | 20% | 13,580.79 | **E1** Plan/cronograma + **E2** Figma + arquitectura + decisión BD |
| **H2** | Semana 6 | 15% | 10,185.59 | **E3** Auth+Casos + **E4** Ingesta+clasificación+dedup |
| **H3** | Semana 10 | 25% | 16,975.90 | **E5** RAG+chat + **E6** Alertas+audiencias+PDF |
| **H4** | Semana 14 | 15% | 10,185.59 | **E7** Versiones+compartición+auditoría + **E8** pulido + **E9** QA staging superada |
| **H5** | Semana 16 (cierre + inicio garantía 2 meses) | 25% | 16,975.90 | **E10** Prod Vercel/Railway + **E11** docs + **E12** capacitación |

Entendemos que cada hito es una **cuota de habilitación del "alquiler"** (derecho de uso), no una cuota de compra. Retraso pago >15 días hábiles habilita suspensión del siguiente sprint y del acceso hasta regularización (Cláusula Primera: pagos ya devengados irrevocables; Cláusula Séptima: sin transferencia de propiedad).

#### 3.4. Propiedad intelectual y confidencialidad — "alquiler", no venta

Aceptamos:

- La **propiedad intelectual** sobre todo código (React/Vite/AntD, backend, pipelines RAG, prompts, embeddings, infra Vercel/Railway), docs, diseños y materiales **permanece en titularidad exclusiva del EQUIPO DESARROLLADOR**; el BUFFET recibe únicamente **licencia de uso bajo "alquiler"** (no exclusiva, intransferible, revocable, temporal) mientras el servicio esté vigente y al día (ver Contrato Cláusula Séptima). No hay cesión ni entrega de código fuente; al finalizar se exportan solo los **datos propios del BUFFET**.
- Confidencialidad estricta sobre datos víctimas/menores/familias/estrategias legales por **3 años** post-contrato mínimo.
- No usaremos código/datos para fines ajenos; no entrenaremos LLM externo con datos Buffet sin consentimiento escrito anonimizado.
- Componentes OSS mantienen licencias MIT/Apache.
- Citaremos portafolio solo con autorización escrita revocable, sin revelar datos sensibles ni código fuente.

#### 3.5. Garantía, soporte y fin de relación

Aceptamos:

- **60 días** garantía post-prod. (corrección bugs atribuibles sin costo; excluye mods no autorizadas, fallos Vercel/Railway/LLM terceros, mal uso, fuerza mayor).
- Vencida garantía, contrato extinguido, liberados de obligaciones.
- **Cualquier requerimiento posterior** (mantenimiento RAG, re-indexado, afinamiento embeddings, nuevas features, soporte) requerirá **nuevo contrato**.

---

### 4. DECLARACIÓN DE NO CONFLICTO DE INTERESES

Declaramos bajo juramento no tener conflicto de intereses presente o potencial que comprometa ejecución imparcial/objetiva/profesional, ni relaciones comerciales/laborales/personales que influyan negativamente en obligaciones frente al Buffet.

---

### 5. ACEPTACIÓN DE CLÁUSULAS DE NO SUSPENSIÓN DE PAGO Y CONFIDENCIALIDAD REFORZADA

De manera expresa y conforme a legislación boliviana 2026, **aceptamos Cláusula Primera** (no suspensión/retención/compensación de pagos por hitos ya cumplidos/aprobados) y **Cláusula Octava** (confidencialidad 3 años + medidas AES-256/TLS 1.3/RBAC chunk-level/auditoría inmutable/anonimización RAG). Entendemos que protegen tanto al **BUFFET** como al **EQUIPO**, garantizando estabilidad financiera/operativa y protección de datos sensibles de víctimas y menores.

---

### 6. DATOS DE CONTACTO DEL EQUIPO

| Canal | Detalle |
|-------|---------|
| Correo principal | [correo@equipo.com] |
| WhatsApp coordinador (Mariana) | [+591 X XXXXXXXX] |
| Repo GitHub | [URL GitHub privado — acceso Buffet] |
| Vercel proyecto | [URL Vercel — handover al cierre] |
| Railway proyecto | [URL Railway — handover al cierre] |

---

### 7. CIERRE

Reiteramos compromiso y entusiasmo por contribuir al Buffet mediante un Sistema KM con RAG que reduzca de horas a segundos la recuperación de documentos, eleve la precisión a ≥85%, blinde datos de víctimas y menores, y devuelva tiempo a los abogados para defender a familias vulnerables.

Manifestamos plena **aceptación** de TDR_KM_RAG.md, TDR.md, Contrato_KM_RAG.md y todas las condiciones/alcances/límites/obligaciones, quedando a disposición para coordinar firma e iniciar formalmente en fecha acordada.

---

Atentamente,

<br>

| | |
|---|---|
| **Mariana del Arroyo** — PM / Scrum Master | **Nahomi Humerez** — UX/UI |
| C.I.: ________________ | C.I.: ________________ |
| Firma: ________________ | Firma: ________________ |
| | |
| **Santiago Acha** — Tech Lead RAG | **Jorge Saenz** — Frontend / QA |
| C.I.: ________________ | C.I.: ________________ |
| Firma: ________________ | Firma: ________________ |

---

**ANEXOS A ESTA CARTA:**
1. TDR_KM_RAG.md — Términos de Referencia detallados (React/AntD/Vite + RAG + Vercel/Railway + SQL/Mongo).
2. TDR.md — TDR v1.0 con 29 RF + 19 RNF + criterios aceptación.
3. Contrato_KM_RAG.md — Contrato de Prestación de Servicios (16 semanas + 60 días garantía).
4. Plan_Proyecto_Cronograma_KM_RAG.md — Plan y cronograma 8 sprints.
