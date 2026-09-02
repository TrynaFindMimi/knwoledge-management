# CONTRATO DE PRESTACIÓN DE SERVICIOS DE DESARROLLO DE SOFTWARE

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG — BUFFET DE ASISTENCIA FAMILIAR

---

**FECHA:** [dd/mm/aaaa]

**LUGAR:** La Paz, Estado Plurinacional de Bolivia

---

Entre el **Buffet de Asistencia Familiar**, servicio legal gratuito de atención en derecho de familia (asistencia familiar, patria potestad, violencia doméstica), con domicilio en [Dirección, La Paz, Bolivia], representado por **________________________**, mayor de edad, hábil por derecho, con C.I. N.º ________________, en adelante denominado **"EL BUFFET"** o **"EL CLIENTE"**; y, por otra parte:

| # | Desarrollador(a) | C.I. N.º | Rol |
|---|-------------------|----------|-----|
| 1 | Mariana del Arroyo | ________ | Project Manager / Scrum Master |
| 2 | Nahomi Humerez | ________ | Diseñadora UX/UI |
| 3 | Santiago Acha | ________ | Tech Lead Fullstack / RAG Engineer |
| 4 | Jorge Saenz | ________ | Frontend Dev / QA |

Todos mayores de edad, hábiles por derecho, en conjunto denominados **"EL EQUIPO DESARROLLADOR"** o **"LOS PRESTADORES"**, quienes actúan de manera solidaria y mancomunada.

**"EL BUFFET"** y **"EL EQUIPO DESARROLLADOR"** serán denominados conjuntamente como **"LAS PARTES"**.

LAS PARTES convienen en celebrar el presente **CONTRATO DE PRESTACIÓN DE SERVICIOS DE DESARROLLO DE SOFTWARE**, sujeto a las siguientes cláusulas:

---

### CLÁUSULA PRIMERA: RÉGIMEN LEGAL APLICABLE Y NO SUSPENSIÓN DE PAGO

El presente contrato se rige por el Código Civil Boliviano, Ley N.° 164 de Telecomunicaciones y TIC, Ley N.° 453 General de Derechos de Usuarios/Consumidores, Ley N.° 164 y normativa de protección de datos personales vigente al 2026, y toda normativa aplicable del Estado Plurinacional de Bolivia.

**No suspensión de pago.** LAS PARTES acuerdan expresamente, en virtud del principio de irrevocabilidad de compromisos dinerarios de la legislación boliviana 2026, que **bajo ninguna circunstancia EL CLIENTE podrá suspender, retener, compensar ni condicionar pagos ya devengados** correspondientes a hitos cumplidos y aprobados conforme a criterios de aceptación de este contrato y su TDR anexo, aun con controversias sobre hitos posteriores, retrasos parciales no atribuibles a dolo/negligencia grave, o circunstancias sobrevinientes. Los pagos por hitos ya entregados y formalmente recibidos son irrevocables, no sujetos a suspensión/devolución/compensación, salvo sentencia judicial firme y ejecutoriada de tribunal competente en Bolivia.

Quedan protegidos **todos los miembros del EQUIPO DESARROLLADOR** (mancomunados) y **EL BUFFET** (receptor de entregables), garantizando continuidad del proyecto y protección de derechos laborales/operativos.

---

### CLÁUSULA SEGUNDA: ANTECEDENTES Y OBJETO

#### 2.1. Antecedentes

EL BUFFET brinda servicios legales gratuitos a familias vulnerables (asistencia familiar, patria potestad, violencia doméstica), gestionando 50+ casos activos. La gestión documental manual genera pérdida de tiempo (4-6 h/semana), pérdida de documentos en audiencias, confusión de versiones, riesgos de seguridad (contraseñas débiles, WhatsApp sin cifrar) y dependencia de persona clave. Ha identificado la necesidad de sistematizar archivos con un Sistema de Gestión de Conocimiento (KM) web con RAG.

#### 2.2. Objeto

EL EQUIPO DESARROLLADOR se compromete a **diseñar, desarrollar, desplegar, documentar y proveer bajo modalidad de "alquiler" del servicio (licencia de uso SaaS, sin transferencia de propiedad)** un Sistema KM web con motor **RAG (Retrieval-Augmented Generation)** para EL BUFFET, conforme a los Términos de Referencia `TDR_KM_RAG.md` y `TDR.md` anexos (parte integrante). El sistema **no se vende ni se cede**; se habilita el uso mientras el "alquiler" permanezca vigente y al día en pagos (ver Cláusulas Sexta y Séptima). Incluye:

1. **Frontend SPA** con **React 18 + Vite + Ant Design (AntD) 5.x**, responsive (desktop/tablet/celular), PWA-ready, con <5 clics a funciones principales.
2. **Backend API REST + WebSocket** (FastAPI Python o Express Node — decisión según contenido en Sprint 1) con **LangChain/LlamaIndex**, embeddings multilingual ES, LLM, chunking, re-ranking y citación de fuentes.
3. **Gestión de casos** CRUD con tipos (asistencia familiar, patria potestad, violencia doméstica, otro), estados (activo/en audiencia/cerrado), modo **URGENTE**, filtros y orden por audiencia.
4. **Ingesta y clasificación automática:** upload PDF/JPG/PNG/DOCX 50MB, chunking semántico, vectorización, clasificación por contenido (demanda, contestación, informe psicológico, cert. médico, orden protección, comprobante pago, otro), desduplicación por embeddings >85%, historial de versiones con diff lado a lado.
5. **Búsqueda semántica + chat conversacional** en español coloquial/boliviano, tolerante a errores y sinónimos legales, <3s, ≥85% precisión, respuestas con citas, memoria conversacional.
6. **Alertas proactivas:** audiencias (48h/24h/2h), vencimientos órdenes protección (7d/48h), resumen diario 8AM, in-app (campana) + email.
7. **Gestión de audiencias:** registro, checklist automático (tenidos/faltantes en rojo), paquete PDF consolidado con portada.
8. **Compartición segura:** enlaces JWT temporales (1h/24h/72h), single-use, solo-lectura con watermark, revocación inmediata, auditoría.
9. **Seguridad:** AES-256 reposo + cifrado campo víctimas, TLS 1.3 tránsito, JWT, RBAC + permisos a nivel de chunk, auditoría inmutable.
10. **Despliegue:** Frontend en **Vercel** (principal), Backend/RAG/DB/Cron en **Railway** (principal), alternativas cotizadas **Hostinger VPS** y **Servidor Local on-premise** (ver proformas INF-008/INF-009/INF-010), dominios, SSL, monitoreo 99.5%.
11. **Documentación y capacitación:** Manual Técnico (arquitectura, API, RAG), Manual Usuario, Manual Despliegue, 2 sesiones presenciales/virtuales + videos.

---

### CLÁUSULA TERCERA: ALCANCE DETALLADO

#### 3.1. Alcance incluido (INCLUYE)

| Módulo | Descripción |
|--------|-------------|
| **Frontend SPA** | React+Vite+AntD: layouts, AntD Table/Form/Upload/DatePicker/Tag/Badge, React Query + Axios, React Router, tokens AntD, jsPDF/JSZip para paquetes, responsive móvil |
| **Auth & Seguridad** | Login, JWT (30 min access), bloqueo 3 intentos, expiración inactividad, AES-256, TLS 1.3, RBAC (admin/abogado/asistente + chunk), logs auditoría inmutables |
| **Casos** | CRUD, ID único, tipos/estados, listar con filtros/orden, botón URGENTE (mínimos campos) |
| **Documentos** | Upload 50MB, chunking, embeddings ES, clasificación automática por contenido, renombrado descriptivo, desduplicación >85%, versiones v1..vN, descarga cualquiera, diff |
| **RAG** | Vector DB (ChromaDB/pgvector/Pinecone) híbrido, retrieval + LLM + citas, memoria conversacional, <3s |
| **Audiencias & Alertas** | CRUD audiencia, checklist auto, faltantes en rojo / `en trámite`, paquete PDF, cron 48h/24h/2h/7d, resumen 8AM, in-app realtime + email semanal lunes 8AM |
| **Compartición** | JWT temporal 1h/24h/72h, single-use, log accesos, solo-lectura + watermark, anti-captura best-effort, revocar + notificar + auditar |
| **Impresión/Export** | Impresión navegador tamaño legal con encabezado, ZIP caso (carpetas por tipo, índice, nombres descriptivos, ZIP con contraseña opcional) |
| **Dashboard** | KPIs casos/docs/audiencias/alertas, gráficos por tipo, reportes auditoría por rango |
| **Bases de datos** | **PostgreSQL** (Railway Postgres) para transaccional + **Chroma/pgvector** para vectores + **MongoDB** opcional si contenido semi-estructurado/flexibilidad domina (decisión Sprint 1). Soporta 100 docs/mes, 5000+ docs, 5→20 usuarios |
| **Despliegue** | Vercel (frontend) + Railway (backend, DB, vector, storage, cron), CI/CD GitHub Actions, preview deployments, SSL, custom domain, backups automáticos, Sentry/Uptime |
| **Testing & QA** | Unit (Vitest/Pytest), E2E (Playwright), perf (k6), pen-test, RAG recall/precisión, usabilidad 3 usuarios reales |
| **Documentación** | Manual Técnico, Manual Usuario (visual con AntD), Manual Despliegue Railway/Vercel, troubleshooting, README |
| **Capacitación** | 2 sesiones (virtual/presencial) + grabaciones + guías rápidas |

#### 3.1.1. ESTRUCTURA DETALLADA DE VISTAS, COMPONENTES Y ESTADOS

##### A. FRONTEND — VISTAS PÚBLICAS / AUTENTICADAS

###### A1. LOGIN (`/login`)

| Elemento | Tipo | Descripción |
|----------|------|-------------|
| Formulario | AntD Form | Email, Password (Input.Password), validación 12 carac. may/min/num/símb (tooltip). |
| **"Ingresar"** | AntD Button type="primary" | Autentica JWT; loading spinner; error Alert rojo "Credenciales inválidas" / "Cuenta bloqueada 3 intentos". |
| **"Olvidé mi contraseña"** | Link | Flujo restablecimiento por email. |
| Estado vacío/error | Alert | Mensaje claro + código si aplica. |

###### A2. DASHBOARD (`/` — protegido)

| Elemento | Tipo | Descripción |
|----------|------|-------------|
| Sidebar | AntD Layout.Sider colapsable | Logo Buffet + Menu: Dashboard, Casos, Búsqueda, Chat RAG, Audiencias, Compartidos, Auditoría (admin), Usuarios (admin). Icons AntD. Responsive Drawer en mobile. |
| Header | AntD Layout.Header | Breadcrumb, Search global (Input.Search), **Campana Notificaciones** (Badge contador no leídas, Dropdown agrupadas por tipo, "Marcar todas leídas"), Avatar + Dropdown usuario / Cerrar sesión. |
| KPI Cards | AntD Card + Statistic | 4 cards: Casos activos (#), Docs del mes (#), Audiencias próximas (#), Alertas activas (#) con Trend vs mes anterior. |
| Gráfico casos | AntD Charts / Recharts | Barras por tipo de caso (asistencia, patria, violencia). |
| Próximas audiencias | AntD Table resumida | 5 próximas: fecha, cliente, juzgado, estado; botón **"Ver todas"** → `/audiencias`. |
| Docs recientes | List | Últimos docs subidos con tag clasificación auto. |
| **Botón URGENTE** | AntD Button danger flotante | Siempre visible (esquina). Abre flujo mínimo: nombre + tipo violencia → upload inmediato. |

###### A3. LISTADO DE CASOS (`/casos`)

| Elemento | Descripción |
|----------|-------------|
| Filtros | AntD Select: tipo, estado; Input.Search por cliente; DatePicker próxima audiencia. Botón **"Buscar"** + **"Limpiar"**. |
| Tabla | AntD Table: cliente, tipo (Tag color), estado (Badge: activo verde, en audiencia azul, cerrado gris), próxima audiencia, # docs, acciones. Paginación. Orden por fecha audiencia asc. |
| **"+ Nuevo caso"** | Button primary → Modal/Drawer Form: cliente*, tipo*, datos básicos, estado. |
| **"Ver"** (eye) | → `/casos/:id` drawer completo. |
| **Cambiar estado** | Dropdown por fila: activo/en audiencia/cerrado (archivado consultable, reabrible). Historial en timeline. |

###### A4. DETALLE CASO (`/casos/:id`)

| Elemento | Descripción |
|----------|-------------|
| Header caso | Nombre cliente, ID, Tags tipo/estado/prioridad, próxima audiencia. Botones **"Editar"**, **"Cambiar estado"**, **"Exportar ZIP"**, **"Imprimir portada"**. |
| Tabs | **Documentos** (ver A5), **Audiencias** (A10), **Compartidos**, **Auditoría** (timeline quién/cuándo/qué/IP). |
| Upload | AntD Dragger (drag&drop) múltiple, 50MB, progreso, preview imagen/PDF, confirmación clasificación auto. |

###### A5. GESTIÓN DOCUMENTOS (dentro de caso)

| Elemento | Descripción |
|----------|-------------|
| Lista docs | AntD List/Table: nombre descriptivo, tipo clasificado (Tag), versión (Badge vN), fecha, autor. Filtro por categoría auto. |
| **Clasificación** | Tag sugerido por RAG + botón **"Confirmar"** / **"Corregir"** (Select tipo). Si `scan001.jpg` → nombre auto descriptivo. |
| **Alerta duplicado** | AntD Alert warning si similitud >85%: "Similar a [doc]" → **"Es duplicado — cancelar"** / **"Es versión nueva — guardar"**. |
| **Versiones** | Click doc → Drawer: timeline v1,v2... fecha/autor, **"Descargar vN"**, **"Comparar"** (dos versiones lado a lado Diff), **"Actual versión"** badge. |
| **Acciones** | **"Ver"** (preview), **"Descargar"**, **"Compartir"** (JWT), **"Imprimir"** (tamaño legal), **"Eliminar"** (soft, solo autorizados). |

###### A6. BÚSQUEDA SEMÁNTICA (`/busqueda`)

| Elemento | Descripción |
|----------|-------------|
| Input búsqueda | AntD Input.Search grande con placeholder "Ej: convenio visitas Mamani 2024 (tolera errores y sinónimos)". |
| Resultados | Lista de Cards: título doc, snippet resaltado, score relevancia, fuente (caso, fecha), Tags. <3s, paginación. |
| Filtros | Tipo doc, caso, rango fecha, estado. |
| Vacío | Illustration + "No se encontraron resultados. Prueba sinónimos o errores." |

###### A7. CHAT RAG (`/chat` — visible en todas las pantallas como Drawer flotante)

| Elemento | Descripción |
|----------|-------------|
| Ventana chat | AntD List de burbujas: usuario (derecha), assistant (izquierda) con **citas** (links a doc fuente: nombre, caso, fecha). |
| Input | TextArea + **"Enviar"** (Enter). Soporta "¿y qué más de Mamani?" (contexto). |
| Sugerencias | Chips: "¿Qué falta para audiencia García mañana?", "Orden protección Pérez vencimiento". |
| Estado | Typing indicator, <3s, error Alert si LLM no disponible. |

###### A8. AUDIENCIAS (`/audiencias`)

| Elemento | Descripción |
|----------|-------------|
| Calendario | AntD Calendar / Tabla: fecha, hora, juzgado, caso, tipo. Botón **"+ Registrar audiencia"**. |
| **Registrar** | Modal Form: caso* (Select), fecha*, hora*, juzgado*, tipo* → genera **checklist automático** docs requeridos. |
| **Detalle audiencia** | Checklist dividido: **"Tenidos"** (verde) / **"Faltantes"** (rojo) / **"En trámite"** (amarillo). + **"Agregar requisito manual"**. |
| **"Generar paquete PDF"** | Button → preview peso total → **"Descargar PDF consolidado"** (orden checklist + portada caso). |
| Alertas | Timeline próxima: 48h/24h/2h. Badge si faltantes críticos. |

###### A9. COMPARTICIÓN (`/compartidos`)

| Elemento | Descripción |
|----------|-------------|
| Tabla compartidos | Doc, destinatario, link JWT (truncado), duración (1h/24h/72h), estado (activo/expirado/revocado), accesos (quién/cuándo/IP). |
| **"Compartir"** (desde doc) | Modal: seleccionar doc, duración, permiso (lectura / lectura+descarga), email destinatario → **"Generar enlace"** (copiable). |
| Solo-lectura | Watermark con nombre destinatario + fecha en preview; botón descarga deshabilitado; best-effort anti-captura. |
| **"Revocar"** | Button danger por fila → Confirm Modal → revoca inmediato → notifica destinatario → log auditoría. |
| Expirado | Badge gris, link deshabilitado. |

###### A10. NOTIFICACIONES

| Elemento | Descripción |
|----------|-------------|
| Campana Header | Badge contador no leídas. Dropdown: agrupadas por tipo (audiencia, vencimiento, compartido). **"Marcar como leída"** individual / **"Marcar todas"**. |
| Centro notifs | `/notificaciones` — List con filtros por tipo, paginación, marcar leída. |
| Email semanal | Lunes 8AM: resumen (casos activos, docs subidos, audiencias, alertas) — sin datos sensibles, desactivable en `/configuracion`. |

###### A11. ADMINISTRACIÓN (`/admin` — solo admin)

| Elemento | Descripción |
|----------|-------------|
| Usuarios | Table: nombre, email, rol (Tag), estado, última sesión. **"+ Nuevo usuario"**, **"Editar rol"** (solo admin), **"Bloquear/desbloquear"**. |
| Auditoría | Table inmutable: usuario, acción (ver/editar/descargar/compartir), doc/caso, fecha, IP. Filtros fecha/tipo/usuario. **"Exportar reporte"** (Excel) por rango. Sin borrado. |
| Configuración | Tabs: general (nombre buffet, logo), notificaciones (hora resumen), retardos alertas, retención logs. |

###### A12. OTROS

| Vista | Ruta | Descripción |
|-------|------|-------------|
| Perfil | `/perfil` | Datos usuario, cambiar password (12 carac.), 2FA opcional futuro. |
| 404 | `*` | Illustration + "Página no encontrada" + **"Ir al dashboard"**. |
| 403 | `*` | "Sin permisos" si asistente intenta eliminar / abogado ve caso no asignado. |

#### 3.2. Alcance excluido (LIMITACIONES)

- Diseño de logotipo/identidad (Buffet ya dispone).
- Marketing digital / redes sociales.
- Carga masiva histórica (200 docs) — migración progresiva (pre-carga 20 docs prueba incluida).
- Integración LEXIUS / sistemas judiciales / ERP / contable.
- App móvil nativa (solo web responsive PWA-ready).
- Redacción contenido legal / políticas privacidad — solo transcripción del contenido que EL BUFFET provea (único responsable).
- Hosting/dominio/certificados más allá de lo incluido: EL EQUIPO configura Vercel (frontend) + Railway (backend) en cuentas del Buffet o en cuentas del equipo con handover; si EL BUFFET no tiene cuentas, se entregan instrucciones/proformas. No se paga plan premium sin aprobación.
- Entrenamiento/fine-tuning de LLM con datos del Buffet en servicios externos sin consentimiento explícito anonimizado.
- Soporte 24/7 presencial.

#### 3.3. Infraestructura y Decisión BD

- **Frontend:** Vercel (Hobby/Pro segun Buffet) con dominio propio o `vercel.app` (proforma INF-003).
- **Backend:** Railway (Starter/Pro) con Postgres, Volumes, Cron, env vars cifradas (proforma INF-004).
- **Alternativas cotizadas:** Hostinger VPS (INF-008) y Servidor Local on-premise (INF-009); comparativa en INF-010. La eleccion no altera precio COCOMO (infra por cuenta Buffet).
- **Decisión SQL vs Mongo:** Se formaliza en Sprint 1 tras modelado datos. Criterio: **PostgreSQL** si esquema casos/audiencias estable; **MongoDB** si metadatos documentos altamente variables (violencia doméstica requiere campos extra). Híbrido (Postgres transaccional + Mongo docs + Chroma/pgvector) permitido sin costo extra si se justifica.

---

### CLÁUSULA CUARTA: DURACIÓN, VIGENCIA Y CRONOGRAMA

**Duración:** **16 semanas (4 meses)** desde la firma, prorrogables por causa justificada aprobada por escrito.

**Vigencia:** Desde firma hasta entrega formal completa (E10 prod + E11 docs + E12 capacitación), más **60 días de garantía** post-producción. Vencida la garantía, el contrato se extingue plenamente.

**Nuevas implementaciones post-contrato:** Cualquier feature/modificación/mejora solicitada tras vencimiento de garantía constituye **nuevo proyecto independiente** con nuevo contrato, sin compromiso del EQUIPO sin nuevo instrumento.

| Fase | Semanas | Entregables |
|------|---------|-------------|
| Planificación + Diseño (Sprint 1) | 1–2 | E1: Plan/cronograma; E2: Figma + arquitectura; decisión BD |
| Fundamentos (Sprint 2) | 3–4 | E3: Auth + Casos + layout AntD |
| Ingesta inteligente (Sprint 3) | 5–6 | E4: Upload + chunking + embeddings + clasificación + dedup |
| RAG Core (Sprint 4) | 7–8 | E5: Búsqueda semántica + chat con citas |
| Alertas & Audiencias (Sprint 5) | 9–10 | E6: Alertas + audiencias + checklist + PDF |
| Seguridad avanzada (Sprint 6) | 11–12 | E7: Versiones + compartición JWT + auditoría |
| Pulido & QA (Sprint 7) | 13–14 | E8: PWA/impresión/ZIP/notifs + E9: staging QA |
| Despliegue & Cierre (Sprint 8) | 15–16 | E10: Prod Vercel/Railway; E11: docs; E12: capacitación |
| Garantía | 17–24 | Corrección bugs atribuibles, sin costo |

Cada sprint (2 semanas) cierra con demo funcional para validación EL BUFFET. Cronograma detallado anexo `Plan_Proyecto_Cronograma_KM_RAG.md`.

---

### CLÁUSULA QUINTA: OBLIGACIONES

#### 5.1. EQUIPO DESARROLLADOR

1. Cumplir entregables, plazos y criterios aceptación TDR/Contrato.
2. Comunicación fluida: daily stand-up, demo+retro cada sprint, WhatsApp grupo (horario laboral Lun-Vie 9-18 BT), Meet/Zoom formales. Reuniones extra con 24h preaviso, solo horario laboral. No obligación de respuesta fuera de horario.
3. Desarrollar con React+AntD+Vite, backend RAG (LangChain/LlamaIndex), Vercel/Railway, PostgreSQL/MongoDB + vector DB, cumpliendo estándares calidad (RNF).
4. Repositorio GitHub privado **bajo titularidad del EQUIPO**; el BUFFET recibe acceso de uso a la plataforma desplegada, no al repositorio de código fuente (ver Cláusula Séptima). CI/CD y PR reviews a cargo del EQUIPO.
5. Demo funcional cada sprint + habilitación progresiva del servicio en staging/producción y entrega de credenciales de **uso** (no de código) al cierre.
6. Confidencialidad estricta (datos víctima/menor/familia) y cifrado.
7. **Mantener la titularidad del código y otorgar licencia de uso** bajo modalidad de "alquiler": no se transfiere propiedad; al completar cada hito se habilita el periodo de uso correspondiente. Al cierre se entrega documentación de uso, manuales y exportación de **datos del BUFFET**, sin entrega de código fuente (ver Cláusula Séptima).
8. Soporte garantía 60 días incluido en el "alquiler".

#### 5.2. EL BUFFET

1. Proveer info, materiales gráficos (logo), **20 casos de prueba con docs de muestra** (variados tipos), contactos y recursos en tiempo/forma. Designar Product Owner interlocutor.
2. Revisar/aprobar/rechazar (con justificación escrita) cada entregable en **5 días hábiles** desde demo; silencio = aprobación tácita si no hay objeción fundada.
3. Proveer acceso/cuentas Vercel + Railway (o autorizar al EQUIPO crearlas y facturar reembolso) y dominio. Si no tiene, EQUIPO entrega guía/proformas. Buffet paga/renueva hosting/dominio/planes premium.
4. Validar contenido legal (políticas) y confirmar que datos de prueba están anonimizados o con consentimiento.
5. Cumplir pagos Cláusula Sexta.

---

### CLÁUSULA SEXTA: PRECIO, IMPUESTOS Y FORMA DE PAGO

#### 6.1. Precio total — COCOMO II WAE-RAG mercado

| Concepto | Opcion A — WAE-RAG mercado (adoptada) | Opcion B — Pago al contado (10% dto.) | Referencia informativa |
|----------|---------------------------------------|---------------------------------------|------------------------|
| **Base de calculo** | WAE 12,01 KLOC (136,5 WOP) + EM_RAG 1,45, E 48.15 PM, tarifa venta 1,248 Bs/PM (costo empresa 985 + margen 26.7%) | Misma base con 10% descuento | Costo empresa sin margen |
| **Precio base (sin IVA)** | **Bs. 60,092.00** | Bs. 54,082.80 | Bs. 47,428.00 |
| **IVA 13%** | 7,811.96 | 7,030.76 | 6,165.64 |
| **Precio total con IVA** | **Bs. 67,903.96** | **Bs. 61,113.56** | Bs. 53,593.64 |
| **Margen empresarial incluido** | 12,664.00 (26.7% sobre costo) | 11,397.60 | — |
| **Cuota mensual promedio (4 meses)** | **15,023.00 base / 16,976.00 IVA** | 13,520.70 / 15,278.39 | — |
| Cotizacion | `documentos/cotizacion/Cotizacion_KM_RAG.md` Seccion 8 | — | Ver Estimacion Seccion 8 |

**Precio contractual adoptado: Opcion A — COCOMO II WAE-RAG mercado Bs. 60,092.00 base (Bs. 67,904.21 IVA incluido) con margen empresarial 26.7% incluido.** Precio calculado por COCOMO II Post-Arquitectura + WAE (48.15 PM x 1,248 Bs/PM) segun `Estimacion_COCOMO_KM_RAG.md` Seccion 8 y detallado en `documentos/cotizacion/Cotizacion_KM_RAG.md` Seccion 8. Incluye diseno React/AntD/Vite, backend RAG (LangChain, embeddings ES, vector HNSW, re-ranking, citas), RBAC chunk-level, AES-256, TLS 1.3, Vercel/Railway config, docs y capacitacion. **NO incluye** hosting/dominio/planes LLM/vector mas alla de tiers gratuitos, que van por cuenta del Buffet segun proformas INF-001 a INF-SSL-001 mas INF-008 Hostinger e INF-009 Servidor Local y comparativa INF-010 (ver Cotizacion Seccion 8.3, proformas/Carta_Entrega_Proformas y TDR Seccion 22).

#### 6.2. Impuestos

| Impuesto | Alícuota | A cargo |
|----------|----------|---------|
| IVA | Ley 843 vigente 2026 (13%) | EL BUFFET (retención/pago directo) |
| IT | Conforme ley | Según régimen EQUIPO |
| RC-IVA | Conforme ley | Sobre honorarios si aplica |

EQUIPO emite factura por cuota con desglose. EL BUFFET entrega comprobantes retención en plazos legales.

#### 6.3. Exención IVA

Si EL BUFFET califica exención IVA, presentará respaldo antes de firma; de lo contrario aplica IVA.

#### 6.4. Forma de pago — 5 hitos COCOMO II WAE-RAG (IVA incluido)

| Hito | Plazo | % | Bs. base | IVA 13% | Bs. total | Entregables validados |
|------|-------|---|----------|---------|-----------|-----------------------|
| **H1** Firma + Plan/Mockups aprobados | Semana 2 | 20% | 12,018.40 | 1,562.39 | **13,580.79** | E1+E2 (Plan, Figma, arquitectura, decision BD) |
| **H2** Ingesta inteligente completada | Semana 6 | 15% | 9,013.80 | 1,171.79 | **10,185.59** | E3+E4 (Auth+Casos, Upload+chunk+embed+clasif+dedup) |
| **H3** RAG + Audiencias completadas | Semana 10 | 25% | 15,022.90 | 1,953.00 | **16,975.90** | E5+E6 (Busqueda<3s+chat con citas, alertas 48h/7d, audiencias+PDF) |
| **H4** QA staging superada | Semana 14 | 15% | 9,013.80 | 1,171.79 | **10,185.59** | E7+E8+E9 (Versiones+diff, JWT watermark, auditoria, pulido, QA) |
| **H5** Prod + docs + capacitacion (inicio garantia 2 meses) | Semana 16 | 25% | 15,022.90 | 1,953.00 | **16,975.90** | E10+E11+E12 (Prod Vercel/Railway+SSL, Manuales, 2 sesiones) |
| **Total Opcion A** | | **100%** | **60,092.00** | **7,812.21** | **67,904.21** | E1-E12 |
| Total Opcion B contado 10% dto. | | 100% | 54,083.30 | 7,030.73 | 61,113.59 | — |

Ver detalle completo en `documentos/cotizacion/Cotizacion_KM_RAG.md` Seccion 8 y `Estimacion_COCOMO_KM_RAG.md` Seccion 8. Descuento pago al contado 10% = Bs. 61,113.59 total (ver Cotizacion Seccion 8.2).

#### 6.5. Plazo de pago y facturación

Cada hito pagadero en **15 días hábiles** desde vencimiento/aprobación. EQUIPO emite factura 5 días hábiles antes. Retraso >15 días habilita suspensión de sprints siguientes hasta regularización, sin afectar pagos ya devengados (Cláusula Primera).

---

### CLÁUSULA SÉPTIMA: PROPIEDAD INTELECTUAL — TITULARIDAD RETENIDA POR LOS DESARROLLADORES (MODALIDAD "ALQUILER")

**7.1. Titularidad.** Toda propiedad intelectual, patrimonial y moral sobre el código fuente (React/Vite/AntD, backend, pipelines RAG, prompts, embeddings, infra-as-code Railway/Vercel), documentación técnica, diseños, vectores, modelos y materiales generados **permanece en todo momento en titularidad exclusiva del EQUIPO DESARROLLADOR**. No hay cesión, venta ni transferencia de propiedad al BUFFET en ningún hito ni al finalizar el contrato. El servicio se presta bajo modalidad de **"alquiler" del servicio (SaaS / licencia de uso)**.

**7.2. Licencia de uso otorgada.** El EQUIPO otorga al BUFFET una licencia **no exclusiva, intransferible, revocable y temporal** para usar el Sistema KM con RAG desplegado en la infraestructura autorizada (Vercel+Railway), únicamente para los fines propios del Buffet de Asistencia Familiar y mientras el "alquiler" permanezca vigente y al día en pagos (Cláusula Sexta). La licencia incluye: acceso a la plataforma, carga/consulta/gestión de sus propios datos (casos, documentos, audiencias) y exportación de **sus datos** (documentos y metadatos propios) en formatos ZIP/Excel/PDF. **No incluye:** entrega de código fuente, derecho a copiar/modificar/sublicenciar/revender/redistribuir el software, ni a desplegar copias fuera de la infraestructura autorizada, ni acceso al repositorio privado del EQUIPO.

**7.3. Extinción.** Al vencer, resolver o no renovar el "alquiler", la licencia se extingue automáticamente. El EQUIPO podrá suspender el acceso y, durante **15 días calendario** posteriores, facilitará únicamente la **devolución/exportación de los datos del BUFFET** (ZIP por caso + auditoría en Excel), sin entrega de código fuente. Vencido ese plazo sin renovación, los datos podrán ser eliminados conforme a la política de retención y normativa de protección de datos.

**7.4. OSS y portafolio.** Componentes OSS (React, AntD, LangChain, Chroma, etc.) mantienen sus licencias originales MIT/Apache. El EQUIPO podrá mencionar el proyecto en portafolio previa autorización escrita del BUFFET, sin revelar datos sensibles, código fuente ni estrategias legales; autorización revocable. El BUFFET podrá mencionar que usa el servicio bajo "alquiler", sin atribuirse autoría del código.

---

### CLÁUSULA OCTAVA: CONFIDENCIALIDAD Y PROTECCIÓN DE DATOS

EQUIPO mantiene confidencialidad estricta sobre datos de víctimas/menores/familias/estrategias legales sensibles, durante y **mínimo 3 años** post-contrato (prorrogable por ley). Medidas: AES-256 reposo + campo, TLS 1.3, bcrypt, RBAC chunk-level, logs inmutables, anonimización en datasets RAG, sin entrenamiento de LLM externo con datos Buffet sin consentimiento explícito escrito y anonimizado, cumplimiento normativa boliviana datos personales. Incumplimiento habilita resolución + daños.

---

### CLÁUSULA NOVENA: GARANTÍA Y SOPORTE

#### 9.1. Garantía

**60 días calendario** post-producción (E10). Cubre corrección sin costo de bugs/fallos atribuibles al desarrollo. Excluye: modificaciones no autorizadas, fallos infra Vercel/Railway/LLM externos, mal uso contrario a Manual, fuerza mayor, datos de prueba no anonimizados provistos por Buffet.

#### 9.2. Fin de relación y del "alquiler"

Vencida la garantía, el contrato y el periodo de "alquiler" inicial se extinguen y el EQUIPO queda liberado. El acceso al sistema se suspende salvo **renovación del "alquiler"** mediante nuevo contrato/adenda de continuidad. Requerimientos posteriores (soporte, mantenimiento RAG, re-indexado, afinamiento embeddings, nuevas features, continuidad del servicio) requieren **nuevo contrato de "alquiler"**; no hay obligación del EQUIPO sin nuevo instrumento ni pagos al día.

---

### CLÁUSULA DÉCIMA: REQUERIMIENTOS NO FUNCIONALES Y CALIDAD

EQUIPO garantiza:

| Req | Criterio aceptación |
|-----|---------------------|
| Seguridad | TLS 1.3 A+ SSL Labs; AES-256; passwords bcrypt; OWASP Top 10 sin críticas |
| Rendimiento | Búsqueda <3s (1000 docs, 10 concurrentes); operaciones <2s |
| Disponibilidad | ≥99.5% (Railway/Vercel metrics) |
| Responsive | Chrome/Firefox/Safari desktop+mobile OK; mobile-first AntD |
| Usabilidad | 3 usuarios no técnicos completan casos/búsqueda <5 min |
| Accesibilidad | WCAG 2.1 AA básico, contraste AntD, alt en imágenes |
| Escalabilidad | 100 docs/mes sin degradación; 5→20 usuarios sin re-arquitectura |
| Idioma | 100% español Bolivia |

Pen-test y perf se ejecutan en Sprint 7-8; reporte entregado en E9.

---

### CLÁUSULA DÉCIMA PRIMERA: MODIFICACIONES Y CONTROL DE CAMBIOS

Cambios de alcance/funcionalidad/cronograma requieren solicitud escrita + **adenda firmada** antes de ejecutar, durante vigencia (incluida garantía). Cambios que aumentan alcance pueden revisar precio/cronograma de buena fe. **Post-garantía:** toda solicitud es nuevo proyecto con nuevo contrato; EQUIPO sin obligación sin nuevo instrumento.

**Gestión:** backlog Kanban; nuevas tareas al Backlog; si es ampliación requiere adenda; dependencias Buffet (casos prueba, cuentas Vercel/Railway, aprobación demos) bloquean tablero si no se cumplen.

---

### CLÁUSULA DÉCIMA SEGUNDA: RESOLUCIÓN

#### 12.1. Mutuo acuerdo

Por escrito en cualquier momento.

#### 12.2. Unilateral por incumplimiento grave

Notificación escrita 30 días antes + 15 días para subsanar. Si incumple EQUIPO: el BUFFET mantiene acceso y exportación de sus datos cargados hasta el momento de la resolución, previo pago de hitos completados/aprobados (sin suspender pagos devengados, Cláusula Primera); **no hay entrega de código fuente** por tratarse de "alquiler" (Cláusula Séptima), solo exportación de datos propios y documentación de uso. Si incumple BUFFET: el EQUIPO cobra hitos completados + 15% saldo restante como lucro cesante; el acceso bajo "alquiler" se suspende hasta pago íntegro y no se entrega código fuente.

---

### CLÁUSULA DÉCIMA TERCERA: FUERZA MAYOR

Ninguna parte responde por incumplimiento por fuerza mayor/caso fortuito imprevisible e irresistible (legislación boliviana). Notificación 5 días hábiles. Si >30 días, cualquier parte puede resolver liquidando hitos completados.

---

### CLÁUSULA DÉCIMA CUARTA: SOLUCIÓN DE CONTROVERSIAS

Negociación directa 30 días; si no, conciliación en Centro Conciliación y Arbitraje Cámara de Comercio La Paz; si falla, arbitraje de derecho misma institución, renunciando a otro fuero. **Pagos indebidamente suspendidos:** EQUIPO puede acudir a vía judicial ordinaria para cumplimiento forzoso (Cláusula Primera) sin esperar arbitraje.

---

### CLÁUSULA DÉCIMA QUINTA: RESPONSABILIDAD SOLIDARIA

Miembros EQUIPO responden solidaria y mancomunadamente frente a EL BUFFET por totalidad de compromisos, sin perjuicio de repetición interna.

---

### CLÁUSULA DÉCIMA SEXTA: DISPOSICIONES FINALES

1. Reemplaza acuerdos previos verbales/escritos sobre objeto.
2. Nulidad de cláusula no afecta resto.
3. Notificaciones por email/WhatsApp designados en TDR.
4. Dos ejemplares igual tenor, uno por parte.
5. Anexos: TDR_KM_RAG.md, TDR.md, Plan_Proyecto_Cronograma_KM_RAG.md.

---

### FIRMAS

En señal de conformidad, LAS PARTES firman en La Paz, a los ____ días de ______________ de 202__.

<br><br>

| Por EL BUFFET | Por EL EQUIPO DESARROLLADOR |
|---------------|------------------------------|
| **Buffet de Asistencia Familiar** | |
| ________________________ | **Mariana del Arroyo** — PM |
| Nombre: ________________ | C.I.: ________________ |
| C.I.: ________________ | Firma: ________________ |
| Cargo: Representante Legal | |
| | **Nahomi Humerez** — UX/UI |
| | C.I.: ________________ |
| | Firma: ________________ |
| | **Santiago Acha** — Tech Lead RAG |
| | C.I.: ________________ |
| | Firma: ________________ |
| | **Jorge Saenz** — Frontend/QA |
| | C.I.: ________________ |
| | Firma: ________________ |

---

### ANEXO I: TDR

`TDR_KM_RAG.md` + `TDR.md` (v1.0) vigentes a la firma forman parte integrante. En discrepancia prevalece Contrato.

### ANEXO II: CRONOGRAMA

`Plan_Proyecto_Cronograma_KM_RAG.md` — 8 sprints (16 semanas) + garantía 60 días.
