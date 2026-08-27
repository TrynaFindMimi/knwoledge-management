# TÉRMINOS DE REFERENCIA (TDR)

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG — BUFFET DE ABOGADOS DE ASISTENCIA FAMILIAR

---

### ÍNDICE

1. [Información General](#1-información-general)
2. [Antecedentes](#2-antecedentes)
3. [Objetivos](#3-objetivos)
4. [Alcance del Proyecto](#4-alcance-del-proyecto)
5. [Límites del Proyecto](#5-límites-del-proyecto-no-incluye)
6. [Requerimientos Funcionales](#6-requerimientos-funcionales)
7. [Requerimientos No Funcionales](#7-requerimientos-no-funcionales)
8. [Arquitectura y Stack Tecnológico](#8-arquitectura-y-stack-tecnológico-propuesto)
9. [Uso Detallado de Herramientas](#9-uso-detallado-de-herramientas)
10. [Metodología de Trabajo](#10-metodología-de-trabajo)
11. [Gestión de Riesgos](#11-gestión-de-riesgos) — resumen + remisión a `TDR_Gestion_Riesgos_KM_RAG.md`
12. [Herramientas de Seguridad — SSL/TLS y Protección](#12-herramientas-de-seguridad--ssltls-y-protección)
13. [Entregables](#13-entregables)
14. [Perfil del Equipo](#14-perfil-del-equipo)
15. [Forma de Pago](#15-forma-de-pago)
16. [Propiedad Intelectual](#16-propiedad-intelectual)
17. [Confidencialidad y Protección de Datos](#17-confidencialidad-y-protección-de-datos)
18. [Garantía y Soporte](#18-garantía-y-soporte)
19. [Criterios de Evaluación](#19-criterios-de-evaluación-de-propuestas)
20. [Condiciones de Presentación](#20-condiciones-de-presentación)
21. [Contacto](#21-contacto)
22. [Carta de Proforma y Límites Presupuestarios](#22-carta-de-proforma-y-límites-presupuestarios)
23. [Anexos](#23-anexos)

---

### EQUIPO DE TRABAJO

| # | Nombre | Rol |
|---|--------|-----|
| 1 | Mariana del Arroyo | Project Manager / Product Owner |
| 2 | Nahomi Humerez | UX/UI Designer |
| 3 | Santiago Acha | Tech Lead Fullstack — RAG / Backend |
| 4 | Jorge Saenz | Frontend Developer — QA |

---

### 1. INFORMACIÓN GENERAL

| Campo | Descripción |
|-------|-------------|
| **Proyecto** | Desarrollo e implementación de Sistema de Gestión de Conocimiento (KM) web con motor RAG para sistematizar archivos y documentos legales oficiales de abogados de derecho familiar |
| **Organización** | Buffet de Asistencia Familiar — Servicios legales gratuitos (Asistencia Familiar, Patria Potestad, Violencia Doméstica) |
| **Ubicación** | La Paz, Bolivia |
| **Tipo de organización** | Buffet jurídico de asistencia gratuita — atención a familias en situación de vulnerabilidad |
| **Moneda de referencia** | Bolivianos (Bs.) |
| **Duración estimada** | 16 semanas (4 meses) — 8 sprints de 2 semanas |
| **Metodología** | Scrum + Kanban — Sprints de 2 semanas, daily 15 min, demo + retrospectiva cada sprint |
| **Fecha TDR** | 27/08/2026 |
| **Versión** | 2.0 — Stack React/AntD/Vite + Railway RAG |

---

### 2. ANTECEDENTES

El Buffet de Asistencia Familiar brinda servicios legales gratuitos en derecho de familia (asistencia familiar, patria potestad, violencia doméstica y protección a víctimas). Atiende a más de 50 casos activos simultáneos con expedientes físicos y digitales desorganizados.

Problemáticas identificadas mediante 3 entrevistas semiestructuradas (52, 48 y 35 min):

- **4-6 horas semanales perdidas** buscando documentos en carpetas sin convención de nombres (`scan001.jpg`, `ACUERDO_FINAL2.pdf`).
- **Pérdida de documentos críticos** (certificados forenses, convenios) en audiencias judiciales.
- **Confusión de versiones:** demandas obsoletas presentadas ante jueces por falta de control de versiones.
- **Riesgo de seguridad:** contraseñas débiles (`123456`, `abogada2024`), direcciones de víctimas sin cifrar en laptops, envío de documentos sensibles por WhatsApp sin protección.
- **Dependencia de persona clave:** solo la asistente Mariela conoce la ubicación de archivos; si falta, el buffet se paraliza.
- **200 documentos escaneados sin clasificar** y duplicados.

Se requiere un Sistema de Gestión de Conocimiento (KM) que sistematice archivos, permita búsqueda semántica inteligente, clasificación automática, alertas proactivas y compartición segura, accesible desde web responsive en juzgados y oficina.

---

### 3. OBJETIVOS

#### 3.1. Objetivo General

Desarrollar e implementar un Sistema de Gestión de Conocimiento (KM) web basado en RAG (Retrieval-Augmented Generation) que permita sistematizar los archivos y documentos legales oficiales para abogados de ley familiar, mejorando tiempo de recuperación (<30 seg), precisión (>85%), seguridad y trazabilidad, desplegado en infraestructura cloud moderna.

#### 3.2. Objetivos Específicos

| Código | Objetivo | RF Asociados |
|--------|----------|--------------|
| **OE1** | Implementar motor de búsqueda semántica con RAG que tolere errores ortográficos y sinónimos jurídicos bolivianos | RF-12, RF-13, RF-14 |
| **OE2** | Desarrollar clasificación y organización automática por caso y tipo documental sin etiquetado manual | RF-05, RF-06, RF-08, RF-09 |
| **OE3** | Implementar alertas proactivas e inteligentes de vencimientos (órdenes de protección) y audiencias (48h/24h/2h) | RF-15, RF-16, RF-17, RF-21, RF-22 |
| **OE4** | Garantizar plataforma web segura (AES-256, TLS 1.3, RBAC), móvil y con control de acceso a nivel de chunk | RF-01, RF-02, RF-03, RF-04, RF-24, RF-25 |
| **OE5** | Implementar control de versiones, desduplicación (>85% similitud) y auditoría inmutable | RF-10, RF-11, RF-29 |
| **OE6** | Desarrollar compartición segura con enlaces temporales JWT, watermark y revocación | RF-18, RF-19, RF-20 |

---

### 4. ALCANCE DEL PROYECTO

#### 4.1. Incluye

| Módulo | Descripción | OE |
|--------|-------------|----|
| **Autenticación y Seguridad** | Login con email+password (12 carac., may/min/num/símb), bloqueo 3 intentos, expiración 30 min inactividad, TLS 1.3, AES-256 reposo + cifrado a nivel de campo (direcciones víctimas), RBAC (admin/abogado/asistente) + permisos a nivel de documento/chunk, auditoría inmutable (usuario, fecha, acción, IP) | OE4 |
| **Gestión de Casos** | CRUD de casos (ID único, tipo: Asistencia Familiar / Patria Potestad / Violencia Doméstica / Otro), listado con filtros (tipo, estado, nombre), orden por próxima audiencia, estados (activo/en audiencia/cerrado-archivado), botón **"URGENTE"** (violencia doméstica: mínimos campos + subida inmediata) | OE2 |
| **Ingesta y Clasificación** | Upload PDF/JPG/PNG/DOCX hasta 50MB, drag&drop + barra progreso, **clasificación automática por contenido** (demanda, contestación, informe psicológico, certificado médico, orden protección, comprobante pago, otro), renombrado descriptivo si archivo es `scan001.jpg`, confirmación/corrección por usuario | OE2 |
| **Desduplicación y Versiones** | Comparación por embeddings antes de guardar; alerta si similitud >85% (usuario decide duplicado vs versión nueva), historial cronológico v1,v2,v3 con fecha/autor, descarga de cualquier versión, **diff lado a lado** de dos versiones | OE5 |
| **Búsqueda Semántica RAG** | Búsqueda semántica (no solo keywords), tolera errores (`conbenio`→`convenio`) y sinónimos legales (`contestación`=`respuesta a demanda`), <3 seg, precisión ≥85%, <2 seg operaciones generales | OE1 |
| **Consulta Conversacional** | Chat visible en todas las pantallas, preguntas en español coloquial/boliviano, respuestas con **citación de fuentes** (documento, fecha, caso), memoria conversacional (`¿y qué más de Mamani?`), <3 seg | OE1 |
| **Alertas Proactivas** | Audiencias: 48h (preparación), 24h (faltantes), 2h (repaso). Vencimientos órdenes protección: 7 días y 48h urgente. Resumen diario 8AM (audiencias del día, faltantes, alertas). Email + in-app (campana con contador, agrupadas) | OE3 |
| **Gestión de Audiencias** | Registro (fecha/hora/juzgado/tipo) asociado a caso, generación automática de checklist de documentos requeridos, vista "tenidos/faltantes" (faltantes en rojo, `en trámite`), agregado manual de requisitos, **paquete PDF consolidado** ordenado + portada | OE3 |
| **Compartición Segura** | Enlaces JWT firmados, duración configurable 1h/24h/72h, single-use por destinatario, registro acceso (quién/cuándo/dónde), modo solo-lectura (sin descarga, marca de agua con nombre/fecha, best-effort anti-captura), revocación inmediata + notificación + log | OE6 |
| **Interfaz Web Responsive** | Web responsive (desktop/tablet/celular), <5 clics a cualquier función, labels descriptivos + tooltips, consistencia visual (guía de estilos), modo urgente accesible, impresión directa (diálogo navegador, tamaño legal, encabezado con datos caso/fecha), exportación ZIP por caso (carpetas por tipo, índice, nombres descriptivos, opcional ZIP con contraseña) | OE4 |
| **Notificaciones** | In-app (campana) + email resumen semanal lunes 8AM (casos activos, docs subidos, audiencias, alertas), configurable, sin contenido sensible en email | OE3 |
| **Dashboard y Reportes** | KPIs: casos activos, docs del mes, audiencias próximas, alertas activas. Gráficos por tipo de caso. Reporte de auditoría por rango fechas | OE4 |

#### 4.2. Alcance por Tipo de Caso

| Tipo | Cobertura |
|------|-----------|
| Asistencia Familiar (alimentos) | Completa |
| Patria Potestad (guarda/custodia) | Completa |
| Violencia Doméstica y Protección a Víctimas | Completa + **seguridad reforzada** (cifrado campo, acceso restringido) |
| Otros (divorcio, violencia intrafamiliar) | Parcial — registro y búsqueda básica |

#### 4.3. Alcance por Usuario

| Rol | Permisos |
|-----|----------|
| **Abogado** | CRUD de sus casos, carga/búsqueda/alertas/compartición/chat, solo ve sus casos o asignados |
| **Asistente** | Carga documentos, búsqueda, consulta de casos asignados, no elimina documentos |
| **Administrador** | Gestión usuarios/roles, auditoría completa, configuración sistema, asigna roles |

---

### 5. LÍMITES DEL PROYECTO (NO INCLUYE)

| # | Límite | Justificación |
|---|--------|---------------|
| L1 | No reemplaza archivo físico | Complemento digital; no se destruyen carpetas físicas |
| L2 | No integración con sistema judicial LEXIUS | Requiere convenio interinstitucional fuera de alcance |
| L3 | No redacción automática de demandas/escritos | Almacena y busca; no redacta documentos legales |
| L4 | No módulo de facturación | Buffet es gratuito |
| L5 | No abogado virtual / asesoría automatizada | Gestiona conocimiento; no reemplaza consulta legal |
| L6 | Solo español (Bolivia) | Sin soporte multi-idioma |
| L7 | No app móvil nativa | Web responsive PWA-ready; nativa en fase futura |
| L8 | No integración WhatsApp/redes sociales | Compartición solo por enlaces temporales seguros |
| L9 | No migración masiva de documentos existentes (200 docs históricos) | Migración progresiva por cada abogado al usar el sistema |
| L10 | No soporte 24/7 con personal dedicado | 99.5% uptime + garantía 2 meses; sin help desk presencial |

**Textos legales / Páginas de políticas:** El equipo solo transcribe y publica Reglamento de Protección de Datos / Política de Privacidad que el Buffet proporcione; no redacta contenido legal. El Buffet es único responsable de la redacción/aprobación.

---

### 6. REQUERIMIENTOS FUNCIONALES

> **Nota:** Numeración RF-01 a RF-29 alineada con TDR original (29 RF) + consolidación con User Stories (30 US). Se listan resumidos; detalle completo con criterios de aceptación en Anexo Técnico `TDR.md` v1.0.

| ID | Funcionalidad | Prioridad | Épica |
|----|---------------|-----------|-------|
| **RF-01** | Login seguro (12 carac., bloqueo 3 intentos, 30 min expiración, TLS 1.3) | Alta | Auth |
| **RF-02** | Control acceso por roles (admin/abogado/asistente) + visibilidad por caso asignado | Alta | Auth |
| **RF-03** | Cifrado AES-256 reposo + campo (víctimas) + sin claves en texto plano | Alta | Auth |
| **RF-04** | Registro auditoría inmutable (usuario, fecha, acción, IP) + reporte por rango | Alta | Auth |
| **RF-05** | Crear caso (nombre cliente + tipo obligatorio, ID único, visible inmediato) | Alta | Casos |
| **RF-06** | Listar casos activos (filtros tipo/estado/nombre, orden próxima audiencia, contador docs) | Alta | Casos |
| **RF-07** | Cambiar estado caso (activo/en audiencia/cerrado-archivable-reabrible) + historial | Media | Casos |
| **RF-08** | Subir documento PDF/JPG/PNG/DOCX 50MB + barra progreso + confirmación | Alta | Carga |
| **RF-09** | **Clasificación automática por contenido** (contenido no nombre; tipos: demanda, contestación, informe psic., cert. médico, orden protección, comprobante pago, otro) + confirmación usuario + renombrado `scan001.jpg` | Crítica | Carga |
| **RF-10** | Detección duplicados por embeddings >85% → alerta → usuario decide → cancela o versiona | Alta | Versiones |
| **RF-11** | Control versiones (lista cronológica v1..., fecha/autor, descarga cualquiera, diff lado a lado) | Alta | Versiones |
| **RF-12** | Búsqueda semántica (significado, tolera errores/sinónimos, <3s, ≥85% precisión) | Crítica | Búsqueda |
| **RF-13** | Consulta lenguaje natural (español coloquial, responde citando fuente, <3s, conversacional) | Crítica | Búsqueda |
| **RF-14** | Chat conversacional (visible siempre, coloquial, fuentes citadas, mantiene contexto) | Alta | Búsqueda |
| **RF-15** | Alertas audiencia (48h/24h/2h con fecha/juzgado/caso/docs requeridos) | Alta | Alertas |
| **RF-16** | Alertas vencimiento medidas protección (detección automática, 7d + 48h urgente con víctima/caso/acción) | Crítica | Alertas |
| **RF-17** | Resumen diario 8AM (audiencias, faltantes, alertas) configurable + in-app + email | Media | Alertas |
| **RF-18** | Generar enlace temporal JWT (1h/24h/72h, single-use, log acceso) | Alta | Compartir |
| **RF-19** | Compartir solo-lectura (sin descarga, watermark nombre/fecha, anti-captura best-effort) | Alta | Compartir |
| **RF-20** | Revocar enlace (inmediato, notifica destinatario, log auditoría) | Alta | Compartir |
| **RF-21** | Registrar audiencia (caso obligatorio, fecha/hora/juzgado/tipo, checklist auto, calendario) | Alta | Audiencias |
| **RF-22** | Verificar docs faltantes (tenidos/faltantes en rojo, `en trámite`, agregar manualmente) | Alta | Audiencias |
| **RF-23** | Generar paquete PDF consolidado (orden checklist, portada caso, muestra peso antes de descargar) | Media | Audiencias |
| **RF-24** | Interfaz web responsive (celular/tablet/desktop, <5 clics, labels+tooltips) | Alta | UI |
| **RF-25** | Modo caso urgente (botón URGENTE visible, mínimos campos nombre+tipo violencia, subida inmediata) | Alta | UI |
| **RF-26** | Notificaciones in-app (campana + contador + agrupadas + marcar leída) | Media | Notif |
| **RF-27** | Notificación email resumen semanal lunes 8AM (casos/docs/audiencias/alertas, desactivable, sin datos sensibles) | Media | Notif |
| **RF-28** | Imprimir documento (botón visible, diálogo navegador, tamaño legal, encabezado caso/fecha) | Media | Export |
| **RF-29** | Exportar caso completo ZIP (carpetas por tipo, índice, nombres descriptivos, ZIP con contraseña opcional) | Baja | Export |

**Prioridades:** Crítica 5 | Alta 17 | Media 6 | Baja 1 = **29 RF**

---

### 7. REQUERIMIENTOS NO FUNCIONALES

| ID | Requerimiento | Descripción | Criterio de medición | Prioridad |
|----|---------------|-------------|----------------------|-----------|
| **RNF-01** | Cifrado tránsito | TLS 1.3 en toda comunicación | SSL Labs calificación A+ | Crítica |
| **RNF-02** | Cifrado reposo | AES-256 en BD, archivos, backups + columna víctima | Auditoría cifrado BD/filesystem | Crítica |
| **RNF-03** | Bloqueo intentos | Bloqueo tras 3 intentos fallidos | Prueba 4 intentos incorrectos | Alta |
| **RNF-04** | Sesión expiración | 30 min inactividad | Dejar 31 min sin interacción | Alta |
| **RNF-05** | RBAC | RBAC roles + chunk-level (asistente no elimina, abogado solo ve sus casos) | Test permisos cruzados | Alta |
| **RNF-06** | Auditoría | Logs inmutables no editables/eliminables por ningún usuario | Intento de borrado bloqueado | Alta |
| **RNF-07** | Tiempo búsqueda | Búsqueda semántica <3s | 1000 docs indexados, 10 concurrentes | Alta |
| **RNF-08** | Tiempo general | Crear caso/subir/cambiar estado <2s | Monitoreo prod. | Alta |
| **RNF-09** | Disponibilidad | 99.5% uptime (≤4.4h downtime/mes) | Uptime monitoring | Alta |
| **RNF-10** | Carga | 10 usuarios concurrentes sin degradación | Stress 15 usuarios mixtos | Media |
| **RNF-11** | Facilidad uso | Usuario no técnico completa tareas (<5 min) sin ayuda | Prueba 3 usuarios sin experiencia | Alta |
| **RNF-12** | Español | UI 100% español Bolivia | Revisión visual total | Alta |
| **RNF-13** | Consistencia | Guía estilos (colores/tipo/espaciado/botones) en 100% pantallas | Checklist guía | Media |
| **RNF-14** | Multi-dispositivo | Chrome/Firefox/Safari desktop+mobile | Test cross-browser | Alta |
| **RNF-15** | Sin instalación | Web sin plugins | Acceso solo navegador | Media |
| **RNF-16** | Escalabilidad docs | 100 docs/mes sin degradación | BD 5000 docs | Media |
| **RNF-17** | Escalabilidad usuarios | 5→20 usuarios sin cambio arquitectura | Doc. agregar usuarios | Baja |
| **RNF-18** | Doc. técnica | Arquitectura, API, despliegue, troubleshooting | Revisión aprobada | Media |
| **RNF-19** | Código doc. | Comentarios funciones complejas + README | Cobertura doc. >70% | Baja |

**Resumen:** Crítica 2 | Alta 10 | Media 5 | Baja 2 = **19 RNF**

---

### 8. ARQUITECTURA Y STACK TECNOLÓGICO PROPUESTO

#### 8.1. Arquitectura por Capas

```
┌──────────────────────────────────────────────────────────┐
│  PRESENTACIÓN: React 18 + Vite + Ant Design (AntD) 5.x   │
│  SPA responsive, PWA-ready, accesible WCAG AA            │
├──────────────────────────────────────────────────────────┤
│  LÓGICA: Node.js / Express o Python FastAPI (según       │
│  conte.) + LangChain / LlamaIndex (orquestación RAG)     │
├──────────────────────────────────────────────────────────┤
│  INTELIGENCIA RAG:                                       │
│  sentence-transformers / OpenAI Embeddings (ES)          │
│  LLM (GPT-4o / Claude / Mistral local) + chunking        │
│  + re-ranking + citación                                 │
├──────────────────────────────────────────────────────────┤
│  DATOS:                                                  │
│  Relacional: PostgreSQL (Supabase/Railway) ó             │
│              MongoDB (casos/docs no estructurados)       │
│  Vectorial:  ChromaDB / Pinecone / pgvector              │
│  Archivos:   S3-compatible (Railway Volumes / S3)        │
│  Decisión:   SQL si casos estructurados predominan;      │
│              MongoDB si documentos semi-estructurados    │
│              y metadatos variables predominan            │
├──────────────────────────────────────────────────────────┤
│  SEGURIDAD: AES-256 (reposo) + TLS 1.3 (tránsito) +      │
│  JWT + RBAC + Auditoría inmutable                        │
└──────────────────────────────────────────────────────────┘
```

#### 8.2. Stack Detallado

| Capa | Tecnología Propuesta | Alternativas | Propósito |
|------|---------------------|--------------|-----------|
| **Frontend** | **React 18 + Vite** | Next.js (si SSR necesario) | SPA rápida, HMR, build optimizado |
| **UI Library** | **Ant Design (AntD) 5.x** | Material UI / Chakra | Componentes empresariales: Table, Form, Upload, DatePicker, Tag, Badge |
| **Estado** | Zustand / Redux Toolkit | Context API | Gestión estado, cache queries |
| **Data Fetch** | TanStack Query (React Query) + Axios | SWR | Cache, revalidación, loading/error states |
| **Routing** | React Router v6 | - | Navegación SPA protegida por roles |
| **Estilos** | AntD Theme Token + CSS Modules | Tailwind (complemento) | Tematización, responsive |
| **Iconos** | AntD Icons + React Icons | - | Consistencia visual |
| **PDF/ZIP** | jsPDF + JSZip (frontend) / pdf-lib (backend) | - | Paquete audiencia, exportación caso |
| **Backend API** | **FastAPI (Python) o Express (Node.js)** — decisión según contenido: Python si RAG nativo, Node si predominancia CRUD | El otro | REST + WebSocket (chat, alertas) |
| **RAG Orquestación** | **LangChain / LlamaIndex** | Haystack | Chunking, embeddings, retrieval, generación con citas |
| **Embeddings** | `sentence-transformers` multilingual (ES) / `text-embedding-3-large` | Cohere ES | Vectorización español jurídico boliviano |
| **LLM** | **GPT-4o-mini / Claude Haiku o Mistral 7B local** (según presupuesto/privacidad) | Llama 3 local | Generación, clasificación automática |
| **Vector DB** | **ChromaDB** (autohost) o **pgvector** (si Postgres) o Pinecone (managed) | Qdrant, Weaviate | Búsqueda semántica <3s |
| **BD Relacional** | **PostgreSQL 15** (Railway Postgres) | MySQL | Casos, usuarios, audiencias, alertas, auditoría |
| **BD NoSQL** | **MongoDB Atlas** (si contenido semi-estructurado) | - | Documentos con metadatos variables, chunks, embeddings cache |
| **Criterio elección BD** | **SQL** (PostgreSQL) si estructura de casos/audiencias/alerta es estable y relacional. **MongoDB** si documentos tienen esquemas variables por tipo (violencia vs asistencia) y se prioriza flexibilidad + agregación. **Híbrido:** PostgreSQL (transaccional) + MongoDB (docs) + Chroma/pgvector (vectores) es opción válida | - | Según contenido predominante |
| **Auth** | JWT (access 30 min + refresh 7d) + bcrypt | next-auth | Sesión, bloqueo intentos, expiración |
| **Storage** | Railway Volumes / AWS S3 / Supabase Storage | Cloudinary | Archivos 50MB, versionado |
| **Cifrado** | AES-256-GCM (Node `crypto` / Python `cryptography`) + TLS 1.3 | - | Reposo + campo víctima |
| **Notificaciones** | WebSocket (Socket.io) + Nodemailer / Resend | Firebase Cloud Messaging | In-app realtime + email |
| **Cron / Alertas** | Railway Cron / BullMQ / node-cron | Celery (Python) | Alertas 48h/7d/resumen 8AM |
| **Deployment Frontend** | **Vercel** | Netlify, Cloudflare Pages | CI/CD git, preview deployments, CDN |
| **Deployment Backend** | **Railway** | Render, Fly.io, AWS ECS | API + RAG + workers + DB + cron en un lugar |
| **Monitoreo** | Railway Metrics + Sentry (errores) + UptimeRobot | Grafana | Logs, errores, uptime 99.5% |
| **Control Versiones** | Git + GitHub (privado) | GitLab | Código + docs |
| **CI/CD** | GitHub Actions → Vercel (frontend) + Railway (backend) | - | Deploy automático por rama |
| **Testing** | Vitest + Playwright (frontend), Pytest / Jest (backend), k6 (perf) | Cypress | Unit + E2E + perf RAG |
| **Diseño** | Figma | - | Wireframes, mockups, design system |

**Justificación Vercel + Railway:**
- Vercel: óptimo para Vite/React SPA, edge CDN, previews por PR, despliegue instantáneo, ideal para AntD.
- Railway: backend Python/Node + PostgreSQL/MongoDB + Chroma/pgvector + Redis/BullMQ + Volumes + Cron en una plataforma, sin fragmentación, ideal para RAG con embeddings y workers.
- Alternativa híbrida SQL/Mongo: se decide en Sprint 1 tras modelado de datos; si el sistema escala a 5000+ docs, se mantiene Postgres transaccional + Chroma vectorial; si variabilidad documental domina, se añade MongoDB para flexibilidad.

---

### 9. USO DETALLADO DE HERRAMIENTAS

#### 9.1. Frontend — React + Vite + AntD

| Herramienta | Uso concreto en el proyecto | Sprint | Entregable donde se usa |
|-------------|------------------------------|--------|-------------------------|
| **Vite 5** | Dev server HMR <200ms, build Rollup optimizado, code-splitting por ruta (`/casos`, `/busqueda`, `/chat`) | S1–S8 | E2–E10 |
| **Ant Design 5.x** | `Table` (listado casos/docs/auditorías), `Form` (login, crear caso, filtros), `Upload.Dragger` (50MB chunking), `DatePicker` (audiencias), `Tag`/`Badge` (clasificación/estado), `Statistic` (KPIs), `Drawer`/`Modal` (versiones, compartir), `Calendar` (audiencias) | S1–S7 | E2, E3, E4, E6, E7, E8 |
| **AntD Theme Token** | Theming centralizado (colores Buffet, tipografía, borderRadius, breakpoints responsive) | S1 | E2 |
| **Zustand / Redux Toolkit** | Estado auth (JWT, rol), filtros casos, cola de uploads | S2–S6 | E3–E7 |
| **TanStack Query + Axios** | Cache queries (`/api/casos`, `/api/busqueda`, `/api/alertas`), invalidación tras mutaciones, retry, loading skeletons | S2–S8 | E3–E10 |
| **React Router v6** | Rutas protegidas `RequireAuth` + `RequireRole(admin/abogado/asistente)`, guards chunk-level, redirect 403 | S2 | E3 |
| **jsPDF + JSZip** | Paquete PDF audiencia (portada + docs ordenados + índice) y ZIP caso (carpetas por tipo + índice + ZIP con contraseña) — ejecución en backend para docs grandes, preview en frontend | S5, S7 | E6, E8 |
| **Vitest + Playwright** | Unit (componentes AntD) + E2E (login→crear caso→subir doc→buscar→compartir) | S2–S7 | E3–E9 |

#### 9.2. Backend & RAG

| Herramienta | Uso concreto | Sprint |
|-------------|--------------|--------|
| **FastAPI (Python)** | REST `/api/*`, OpenAPI docs, validación Pydantic, WebSocket `/ws/chat` y `/ws/notificaciones`; alternativo **Express** si equipo prioriza Node (misma API) | S2–S8 |
| **LangChain / LlamaIndex** | Pipeline: `load → chunk (500 tokens, overlap 100) → embed → store → retrieve (top-k=5) → re-rank → generate con citas` | S3–S4 |
| **sentence-transformers `paraphrase-multilingual` / `text-embedding-3-large`** | Embeddings ES jurídico boliviano (toleran `conbenio`/`convenio`, `contestación`/`respuesta demanda`) | S3–S4 |
| **ChromaDB / pgvector / Pinecone** | `ChromaDB` local en Railway (costo 0), `pgvector` si se elige Postgres único, `Pinecone` si se requiere managed + escala >10k docs | S3–S4 |
| **GPT-4o-mini / Mistral 7B local** | Clasificación automática (prompt Es con taxonomía 7 tipos) + generación respuestas RAG con citas `[fuente: doc, caso, fecha]` | S3–S4 |
| **PostgreSQL 15 (Railway)** | Tablas: `usuarios`, `casos`, `documentos`, `versiones`, `audiencias`, `alertas`, `compartidos`, `auditoria` (inmutable) | S2–S6 |
| **MongoDB Atlas** | Colección `documentos` con `metadata` variable (violencia doméstica: `medidaProteccion`, `riesgo`, `comisaria`) si se elige híbrido | S3 (decisión) |
| **Railway Volumes / S3** | Archivos 50MB, versionado, cifrado AES-256 reposo | S3 |
| **Socket.io** | Notificaciones realtime (campana Badge), typing indicator chat | S4–S5 |
| **BullMQ / node-cron / Railway Cron** | Jobs: `check-audiencias-48h`, `check-vencimientos-7d`, `resumen-diario-8am`, `email-semanal-lunes-8am` | S5 |
| **Nodemailer / Resend** | Envío alertas + resúmenes (sin datos sensibles) | S5 |

#### 9.3. DevOps, Seguridad y Calidad

| Herramienta | Uso concreto |
|-------------|--------------|
| **Vercel** | Deploy frontend por `git push` a `main`→prod, `develop`→preview, edge CDN, `vercel.json` headers HSTS, env `VITE_API_URL` | 
| **Railway** | Deploy backend + DB + vector + volumes + cron en un proyecto, `railway.toml`, env vars cifradas (`AES_KEY`, `JWT_SECRET`), metrics + logs |
| **GitHub Actions** | CI: lint + test + build → deploy Vercel/Railway; secret `RAILWAY_TOKEN`, `VERCEL_TOKEN` |
| **Sentry + UptimeRobot** | Captura errores (frontend/backend/LLM) + monitor 99.5% uptime (ping /health cada 1 min) |
| **OWASP ZAP + npm audit / pip-audit** | Pen-test Top10 + audit deps en CI (bloquea deploy si high) |
| **k6** | Perf: 15 usuarios concurrentes, 1000 docs, asserts `busqueda_p95 < 3s`, `operaciones_p95 < 2s` |
| **Figma** | Design system AntD, prototipos navegables, handoff dev (inspect) |

#### 9.4. Matriz Herramienta → RNF/RF que habilita

| Herramienta | RF/RNF que habilita |
|-------------|----------------------|
| AntD + Vite | RNF-11/12/13/14 (usabilidad, español, consistencia, responsive) |
| TanStack Query + Zustand | RNF-08 (<2s), RF-06 (listado) |
| LangChain + pgvector/Chroma | RF-12/13/14 (búsqueda semántica + chat), RNF-07 (<3s) |
| PostgreSQL/Mongo + criterio híbrido | RNF-16/17 (escalabilidad), RF-05–11 |
| Vercel + Railway | RNF-09 (99.5% uptime), RNF-18 (despliegue) |
| AES-256 + TLS 1.3 + JWT + RBAC | RNF-01/02/05/06 + RF-01–04 (seguridad) |
| Sentry/Uptime/k6/ZAP | RNF-18/19 (mantenibilidad) + Cláusula 10 Contrato |

---

### 10. METODOLOGÍA DE TRABAJO

**Scrum + Kanban — 8 sprints × 2 semanas = 16 semanas**

| Elemento | Configuración |
|----------|---------------|
| **Sprints** | 8 sprints de 2 semanas (ver Plan Cronograma) |
| **Artefactos** | Product Backlog (29 RF + 19 RNF), Sprint Backlog, Incremento (demo funcional) |
| **Ceremonias** | Sprint Planning (día 1), Daily 15 min virtual (Lun-Vie 9:00), Sprint Review/Demo + Retrospectiva (último día sprint) |
| **Roles** | Product Owner (Buffet), Scrum Master (Santiago Acha), Dev Team (4) |
| **Tablero** | Trello / Jira / Notion — columnas: Backlog → Por hacer → En curso → En revisión → Hecho |
| **WIP limit** | 1-2 tareas por persona |
| **Repositorio** | GitHub privado, ramas `main` (prod), `develop`, `feature/*`, PR + review obligatorio |
| **Demos** | Al fin de cada sprint, validación por Buffet en Google Meet/Zoom + grabación |
| **Comunicación** | WhatsApp grupo (horario laboral 9-18, lun-vie), email formal, Meet/Zoom demos |

---

### 11. GESTIÓN DE RIESGOS

> **Resumen ejecutivo — detalle completo con índice en `TDR_Gestion_Riesgos_KM_RAG.md`.**

#### 11.1. Mapa rápido por categoría

| Categoría | Riesgos clave | Severidad máxima |
|-----------|---------------|------------------|
| **Técnicos / Hackeos** | T02 Fuga datos víctimas, T05 Bypass JWT, T08 Inyección prompt RAG, T11 Hackeo prod (defacing/malware), T12 DDoS, T13 Brecha vector DB | **Crítica (9)** |
| **Información** | I01 Pérdida corrupción docs, I02 Clasificación errónea >30%, I03 Embeddings drift, I04 Entrenamiento LLM con datos Buffet sin anonimizar, I05 Versionado falla (presenta demanda vieja) | **Alta (6)** |
| **Operativos** | O01 Retraso materiales 20 casos muestra, O02 Vercel/Railway no obtenido, O05 PO poco disponible, O09 Retraso aprobación demo 5 días | **Alta (6)** |
| **Infra / Seguridad SSL** | S01 Cert SSL/TLS expirado o mal configurado, S02 TLS downgrade, S03 Clave AES expuesta, S04 Backup cifrado no restaurable | **Alta (6)** |
| **Financieros** | F01 Retraso pago hitos, F02 Costo LLM/Pinecone supera tiers gratuitos, F03 Dominio > presupuesto | **Alta (6)** |

#### 11.2. Medidas transversales (ver detalle T01–T13, I01–I05, O01–O10, S01–S04, F01–F07 en `TDR_Gestion_Riesgos_KM_RAG.md`)

- **Prevención hackeo/SSL:** HSTS, TLS 1.3 only (A+ SSL Labs), 2FA admin, bcrypt 12, rate limit 3 intentos, WAF Vercel, CSP headers `vercel.json`, escaneo ZAP semanal, rotación AES quarterly, logs inmutables append-only.
- **Información:** validación clasificación con confirmación humana (RF-09), threshold desduplicación calibrado, re-embeddings batch si drift, anonimización obligatoria antes de cualquier training, versionado inmutable v1..vN con hash.
- **Reserva:** 5 días hábiles cronograma + Bs. 800 reserva Buffet (LLM/vector/dominio) recomendados.

---

### 12. HERRAMIENTAS DE SEGURIDAD — SSL/TLS Y PROTECCIÓN

#### 12.1. SSL/TLS (SCCL)

| Capa | Herramienta / Config | Detalle |
|------|----------------------|---------|
| **Transporte (Vercel)** | **TLS 1.3** (Vercel auto-provisiona Let's Encrypt, HSTS `max-age=31536000; includeSubDomains; preload`, redirect http→https) | `vercel.json` headers, calificación A+ SSL Labs (RNF-01) |
| **Transporte (Railway)** | **TLS 1.3** (Railway proxy + Let's Encrypt), `secure: true` en cookies JWT, `SameSite=Strict` | Termina en proxy Railway, backend `trust proxy` |
| **Certificados** | Let's Encrypt auto-renovación 90 días (Vercel/Railway gestionado) | Proforma `INF-SSL-001` (costo 0 si Let's Encrypt; ≈ US$ 50/año si EV requerido) |
| **Headers seguridad** | `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin` | `vercel.json` + `helmet` (Express) / middleware FastAPI |
| **Reposo** | **AES-256-GCM** (`crypto` Node / `cryptography` Python), clave en Railway env `AES_KEY` (no en repo), cifrado a nivel de campo `victima.direccion` | RNF-02, Cláusula 8 Contrato |
| **Autenticación** | JWT access 30 min + refresh 7d httpOnly, bcrypt 12, bloqueo 3 intentos, expiración 30 min inactividad (RNF-03/04) | RF-01 |
| **Autorización** | RBAC + permisos chunk-level (middleware `canAccess(docId, chunkId, role)`) | RNF-05, RF-02 |
| **Auditoría** | Log inmutable append-only (Postgres tabla `auditoria` sin UPDATE/DELETE grants), hash encadenado | RNF-06, RF-04 |
| **Anti-hackeo** | Rate limit (express-rate-limit), WAF Vercel, input sanitization (Pydantic/Zod), file type magic-bytes (no solo extensión), 50MB limit, escaneo ZAP semanal | T02/T11 mitigación |
| **Backups cifrados** | Railway Volumes daily backup + S3 versionado, cifrado AES-256, restore test quincenal | RNF-02, T10 |

#### 12.2. Verificación

| Verificación | Herramienta | Frecuencia | Criterio aceptación |
|--------------|-------------|------------|---------------------|
| **SSL Labs** | `ssllabs.com` | Cada deploy prod | A+ |
| **Headers** | `securityheaders.com` | Sprint 7 | A |
| **Pen-test** | OWASP ZAP | Sprint 7 + garantía mensual | 0 high |
| **Audit deps** | `npm audit` / `pip-audit` | CI cada push | 0 high |
| **Restore cifrado** | Script `restore.sh` | Quincenal | <30 min, datos íntegros AES |

 Ver detalle en `TDR_Gestion_Riesgos_KM_RAG.md §4.1–4.4` (riesgos S01–S04, T02/T11).

---

### 13. ENTREGABLES

| Código | Entregable | Sprint | Semana | Criterio aceptación |
|--------|------------|--------|--------|---------------------|
| **E1** | Plan de trabajo y cronograma confirmado | Sprint 0-1 | 1-2 | Aprobación Buffet |
| **E2** | Wireframes + mockups + design system (Figma) + arquitectura validada | Sprint 1 | 2 | Aprobación diseño |
| **E3** | MVP Auth + Casos (CRUD, RBAC, listar, cambio estado) + layout AntD responsive | Sprint 2 | 4 | CRUD funcional + tests auth |
| **E4** | Ingesta documentos + chunking + embeddings + clasificación automática + desduplicación (>85%) | Sprint 3 | 6 | Docs indexados, clasificación ≥90% |
| **E5** | Motor RAG completo (búsqueda semántica <3s, consulta NL con citas, chat conversacional) | Sprint 4 | 8 | Precisión ≥85%, chat con fuentes |
| **E6** | Alertas + Gestión audiencias (registro, checklist, paquete PDF) + resúmenes | Sprint 5 | 10 | Alertas 48h/7d operativas |
| **E7** | Versiones + Compartición segura (JWT temporal, solo-lectura watermark, revocar) + auditoría | Sprint 6 | 12 | Enlaces temporales + revocación + logs inmutables |
| **E8** | PWA/mobile refinamiento + impresión + exportación ZIP + notificaciones in-app/email | Sprint 7 | 14 | <5 clics, export ZIP, notifs agrupadas |
| **E9** | Plataforma completa en staging + QA integral (func., seguridad, RAG recall, perf, usabilidad) | Sprint 7-8 | 14-15 | QA superada, pen test sin críticas |
| **E10** | Despliegue producción (Vercel frontend + Railway backend + SSL/TLS + dominios) | Sprint 8 | 16 | Prod operativo 99.5% + monitoring |
| **E11** | Documentación: Manual Técnico (arquitectura, API, RAG), Manual Usuario, Manual Despliegue, troubleshooting | Sprint 8 | 16 | PDFs entregados |
| **E12** | Capacitación (2 sesiones) + video tutoriales + soporte post-lanzamiento 4 semanas | Sprint 8 + garantía | 16-20 | Sesiones realizadas + material |

**Entregables por sprint detallados en `Plan_Proyecto_Cronograma_KM_RAG.md`.**

---

### 14. PERFIL DEL EQUIPO

| Rol | Cant. | Experiencia | Responsabilidades |
|-----|-------|-------------|-------------------|
| Project Manager / Scrum Master | 1 | 2+ años liderando proyectos digitales + RAG | Planificación, comunicación Buffet, gestión backlog/riesgos |
| Diseñador UX/UI | 1 | 2+ años producto digital + design systems | Wireframes, mockups AntD, prototipos, validación usabilidad |
| Tech Lead Fullstack / RAG Engineer | 1 | 3+ años Python/Node + LangChain/LlamaIndex + vector DBs | Arquitectura RAG, embeddings, backend, seguridad, Railway |
| Frontend Developer | 1 | 2+ años React/Vite/AntD | SPA, responsive, integración API/RAG, PWA |
| QA Tester | 1 (compartido) | 1+ año testing + perf RAG | Unit/E2E/seguridad/pen-test/perf, validación criterios RF/RNF |

Se valorará experiencia con legaltech, manejo de datos sensibles, y ONG/sector social.

---

### 15. FORMA DE PAGO

**Precio total:** Bs. 28,000 (base) + IVA 13% = **Bs. 31,640** (IVA incluido). *Referencial para 4 meses RAG — ajustable según alcance final.*

| Hito | % | Monto Bs. (IVA incl.) | Sprint | Entregable validado |
|------|---|-----------------------|--------|---------------------|
| Firma + Plan aprobado | 20% | 6,328 | Sprint 1 | E1 + E2 (plan + mockups) |
| Sprint 3 completado (ingesta + clasificación) | 15% | 4,746 | Sprint 3 | E3 + E4 |
| Sprint 5 completado (RAG + audiencias) | 25% | 7,910 | Sprint 5 | E5 + E6 |
| QA staging superada | 15% | 4,746 | Sprint 7 | E7 + E8 + E9 |
| Despliegue prod. + documentación + capacitación | 25% | 7,910 | Sprint 8 | E10 + E11 + E12 |

*Facturación por cuota con desglose IVA; retención RC-IVA/IT según régimen. Ver Contrato.*

---

### 16. PROPIEDAD INTELECTUAL

Todo código fuente (React/Vite/AntD, backend, pipelines RAG), documentación, diseños, embeddings, prompts y materiales producidos serán **propiedad exclusiva del Buffet de Asistencia Familiar** una vez completado el pago total. El equipo entregará repositorios completos sin dependencias restrictivas, con README y guía de despliegue Railway/Vercel. El equipo podrá mencionar el proyecto en portafolio previa autorización escrita, sin revelar datos sensibles ni secretos del buffet.

---

### 17. CONFIDENCIALIDAD Y PROTECCIÓN DE DATOS

Confidencialidad estricta sobre datos de víctimas, menores, familias, estrategias legales y cualquier información sensible, durante el proyecto y **mínimo 3 años post-contrato**. Cifrado AES-256 reposo, TLS 1.3 tránsito, encriptación a nivel de campo (direcciones víctimas), RBAC chunk-level, auditoría inmutable, anonimización en logs/training data RAG, cumplimiento normativa boliviana protección datos. Prohibido entrenar LLMs externos con datos del buffet sin consentimiento explícito y anonimizado.

---

### 18. GARANTÍA Y SOPORTE

- **Garantía:** 60 días post-producción (E10) — corrección bugs/fallos atribuibles al desarrollo sin costo (excluye modificaciones no autorizadas, fallos infra Vercel/Railway de terceros, mal uso, fuerza mayor).
- **Soporte post-garantía:** Contratación mensual opcional (mantenimiento RAG, re-indexado, afinamiento embeddings, updates dependencias).

---

### 19. CRITERIOS DE EVALUACIÓN DE PROPUESTAS

| Criterio | Peso |
|----------|------|
| Experiencia equipo + portafolio RAG / legaltech | 30% |
| Propuesta técnica (arquitectura React/AntD/Vite + RAG + Vercel/Railway + elección SQL/Mongo) | 30% |
| Propuesta económica (costo-beneficio, uso tiers gratuitos OSS) | 20% |
| Cronograma y metodología (8 sprints, demos, gestión riesgos) | 15% |
| Experiencia ONG / manejo datos sensibles | 5% |

---

### 20. CONDICIONES DE PRESENTACIÓN

- Envío a: **[buffet.asistencia.familiar@gmail.com]** — asunto: **`PROPUESTA KM RAG — [Nombre proponente]`**
- Límite: **[dd/mm/aaaa]**
- Consultas: mismo correo hasta **[dd/mm/aaaa]**
- Se valorará precios solidarios por carácter gratuito del buffet.
- El Buffet se reserva declarar desierta la convocatoria si ninguna propuesta cumple requisitos.

---

### 21. CONTACTO

| | |
|---|---|
| **Organización** | Buffet de Asistencia Familiar |
| **Responsable proyecto** | [Nombre responsable Buffet] |
| **Correo** | [buffet.asistencia.familiar@gmail.com] |
| **Teléfono / WhatsApp** | [+591 X XXXXXXXX] |
| **Dirección** | [Dirección, La Paz, Bolivia] |

---

### 22. CARTA DE PROFORMA Y LÍMITES PRESUPUESTARIOS

En complemento a la forma de pago (§15), se entrega el paquete de proformas de infraestructura en `proformas/` (ver `Carta_Entrega_Proformas_KM_RAG.md`):

| Proforma | Concepto | Costo 1.er año (aprox.) | Límite contractual |
|----------|----------|-------------------------|---------------------|
| INF-001 | Dominio `buffetkm.bo` (NIC Bolivia ADSIB) | Bs 980/año (`.bo`) / Bs 280/año (`.org.bo`) | Buffet elige y paga; si supera presupuesto, se mantiene staging y se propone alternativa `.org.bo`/`.com` |
| INF-002 | Dominio `buffetkm.com` (GoDaddy) | ≈ US$ 14,99 | — |
| INF-003 | Vercel (frontend) | US$ 0 (Hobby) / US$ 20/mes Pro | Incluido tiers gratuitos; Pro solo con aprobación Buffet |
| INF-004 | Railway (backend+RAG+DB+vector+cron) | US$ 5–20/mes Starter → US$ 20/mes Pro | Starter cubre 4 meses; escalado requiere adenda |
| INF-005 | PostgreSQL (Railway) | Incluido en Railway | — |
| INF-006 | MongoDB Atlas (si híbrido) | US$ 0 (M512 free) → US$ 9/mes | Free cubre S1–S4; escalado con aprobación |
| INF-007 | ChromaDB/pgvector/Pinecone | US$ 0 (Chroma/pgvector) / Pinecone Starter US$ 70/mes | Se prioriza Chroma/pgvector free; Pinecone solo si Buffet aprueba |
| **INF-SSL-001** | SSL/TLS (SCCL) | US$ 0 (Let's Encrypt auto en Vercel/Railway) | EV (≈ US$ 50/año) solo si Buffet requiere |

**Límite contractual (Cláusula 3.2 TDR y Contrato):** Hosting/SSL/dominio/planes LLM-vector corren por cuenta del Buffet. El equipo configura en cuentas del Buffet o con handover; no paga planes premium sin aprobación escrita. Si costo domina excede presupuesto, se propone staging + alternativa sin bloquear entregables.

Comparativa y recomendación detallada en `Carta_Entrega_Proformas_KM_RAG.md` y proformas INF-001 a INF-SSL-001.

---

### 23. ANEXOS

- `TDR.md` v1.0 — 29 RF + 19 RNF detallados con criterios de aceptación
- `User_Stories.md` — 30 US en 10 épicas
- `Matriz_de_Coherencia.md` — pregunta-problema-OE alineados
- `Modelado_Procesos_BPWin.md` — 7 procesos + modelo de datos
- `Ciclo_de_Vida_del_Proyecto.md` — 6 fases (investigación → mantenimiento)
- `Plan_Proyecto_Cronograma_KM_RAG.md` — 8 sprints detallados (+ índice + uso herramientas por sprint)
- `TDR_Gestion_Riesgos_KM_RAG.md` — Gestión de riesgos (índice, técnicos/hackeos, información, SSL, operativos, financieros)
- `Contrato_KM_RAG.md` — Contrato de prestación de servicios (16 cláusulas + SSL)
- `Carta_Aceptacion_KM_RAG.md` — Carta de aceptación
- `proformas/Carta_Entrega_Proformas_KM_RAG.md` + `INF-001` a `INF-SSL-001` — Paquete proformas con límites

> En caso de discrepancia entre este TDR y el Contrato, prevalece el Contrato.
