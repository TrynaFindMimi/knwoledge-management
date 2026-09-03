# Knowledge Management — Sistema de Gestion de Conocimiento con RAG

## Buffet de Abogados de Asistencia Familiar

Proyecto de **Gestion de Proyectos Informaticos** — Desarrollo de un Sistema de Gestion de Conocimiento (KM) basado en RAG para sistematizar archivos y documentos legales oficiales de abogados de derecho familiar.

---

## Estructura del Proyecto

```
knwoledge-management/
│
├── README.md
│
├── entrevistas/                       ← Entrevistas con usuarios
│   ├── Entrevista_Abogado_01.md       ← Abogado, 12 anios, asistencia familiar
│   ├── Entrevista_Abogado_02.md       ← Abogada, 8 anios, patria potestad
│   └── Entrevista_Abogado_03.md       ← Abogada, 3 anios, violencia domestica
│
├── documentos/                        ← Documentacion del proyecto (ordenada)
│   ├── TDR_KM_RAG.md                  ← TDR v2.0 React/AntD/Vite + RAG + Vercel/Railway (29 RF + 19 RNF)
│   ├── Matriz_de_Coherencia.md        ← Alineacion pregunta-objetivos
│   ├── User_Stories.md                ← 30 historias de usuario (10 epicas)
│   ├── Ciclo_de_Vida_del_Proyecto.md  ← Ciclo de vida 6 fases
│   ├── Modelado_Procesos_BPWin.md     ← Modelado 7 procesos con BPWin IDEF0 + SVG
│   ├── Estimacion_COCOMO_KM_RAG.md    ← COCOMO II WAE-RAG 12.01 KLOC (48.15 PM) — 60,092 base
│   ├── Contrato_KM_RAG.md             ← Contrato 16 clausulas + 5 hitos (60,092 base / 67,904 IVA, margen 26.7%)
│   ├── Carta_Aceptacion_KM_RAG.md     ← Carta aceptacion TDR y contrato
│   ├── Plan_Proyecto_Cronograma_KM_RAG.md ← Plan 8 sprints (4 meses) + 2 meses garantia
│   ├── requerimientos.md              ← 29 RF + 19 RNF + 10 L (documento unico)
│   └── diagramas/                         ← Diagramas SVG vectorial
│   ├── cotizacion/
│   │   └── Cotizacion_KM_RAG.md       ← Cotizacion COCOMO II WAE-RAG (60,092 base / 67,904 IVA, H1-H5)
│   ├── proformas/
│   │   ├── Carta_Entrega_Proformas_KM_RAG.md ← Carta entrega proformas
│   │   ├── INF-001_Dominio_bo.md      ← Dominio .bo (ADSIB Bs 980)
│   │   ├── INF-002_Dominio_com.md     ← Dominio .com (USD 15)
│   │   ├── INF-003_Vercel.md          ← Vercel frontend (USD 0 Hobby / 20 Pro)
│   │   ├── INF-004_Railway.md         ← Railway backend+RAG+DB (USD 5-20)
│   │   ├── INF-005_PostgreSQL.md      ← PostgreSQL (incluido)
│   │   ├── INF-006_MongoDB.md         ← MongoDB Atlas (USD 0 free)
│   │   ├── INF-007_VectorDB.md        ← Chroma/pgvector/Pinecone
│   │   ├── INF-008_Hostinger.md       ← Hostinger VPS (USD 7-30)
│   │   ├── INF-009_Servidor_Local.md  ← Servidor local on-premise (Bs 8k-15k)
│   │   ├── INF-010_Comparativa_Deployment.md ← Comparativa Vercel/Railway vs Hostinger vs Local
│   │   └── INF-SSL-001_SSL.md         ← SSL/TLS (Let's Encrypt 0 / EV 50)
│   ├── seguridad/
│   │   └── Boveda_Contrasenas_KM_RAG.md ← Boveda de contrasenas AES-256/JWT/DB/APIs
│   └── bitacoras/
│       ├── Bitacora_General.md        ← Resumen 8 sprints
│       └── Bitacora_Sprint_00.md .. Bitacora_Sprint_08.md ← Bitacoras por sprint + garantia
│
└── diagramas/                         ← Diagramas SVG vectorial
    ├── bpwin/                         ← BPWin IDEF0 (9 SVG)
    │   ├── BPWin_A0_Contexto.svg
    │   ├── BPWin_A0_Ciclo_Vida.svg
    │   ├── BPWin_P1_Registro_Caso.svg
    │   ├── BPWin_P2_Ingesta_Documentos.svg
    │   ├── BPWin_P3_Busqueda_RAG.svg
    │   ├── BPWin_P4_Gestion_Audiencias.svg
    │   ├── BPWin_P5_Comparticion_Segura.svg
    │   ├── BPWin_P6_Control_Versiones.svg
    │   └── BPWin_P7_Alertas_Proactivas.svg
    ├── actividades/                   ← 8 diagramas actividades P1-P7 (SVG)
    ├── base_de_datos/                 ← ER 8 entidades + vector HNSW (SVG)
    ├── c4/                            ← Modelo C4 N1-N4 + Despliegue + 8 ADRs (6 SVG)
    ├── casos_de_uso/                  ← 30 CU en 10 epicas (8 SVG)
    ├── componentes/                   ← Componentes + Secuencia + Estados + Despliegue (9 SVG)
    ├── uml/                           ← Clases (13) + Secuencia (2 SVG)
    └── procesos/                      ← Mapa de procesos P1-P7 por carriles (SVG + MMD)
```

---

## Resumen Ejecutivo

| Elemento | Cantidad |
|----------|----------|
| Entrevistas realizadas | 3 |
| Objetivos especificos | 6 |
| Requerimientos funcionales | 29 |
| Requerimientos no funcionales | 19 |
| Historias de usuario | 30 |
| Procesos modelados (BPWin IDEF0) | 7 (P1-P7) + A0 Contexto + A0 Ciclo Vida (9 SVG BPWin) |
| Causas raiz identificadas (Ishikawa) | 24 |
| Casos de uso modelados | 30 CU (10 epicas, trazables a 29 RF) |
| Diagramas C4 | 4 niveles + 8 ADRs |
| Estimacion COCOMO II WAE-RAG | 12.01 KLOC (136.5 WOP), 48.15 PM, 13.04 meses nominal (3.69 pers.), 4 meses contractual (compresion 3.26x) |
| Precio COCOMO II mercado | **Bs. 60,092 base / Bs. 67,904 IVA incl.** (48.15 PM x 1,248, margen 26.7% incl.) — 5 hitos H1-H5 — ver `documentos/cotizacion/Cotizacion_KM_RAG.md` |
| Cronograma Gantt | 8 sprints + Garantia, critical path S1->S3->S4->S5->S6->S7->S8, reserva 5d, hitos H1-H5 — ver `diagramas/gantt/Cronograma_Gantt.svg` |
| Deployment cotizado | Vercel+Railway (principal) + Hostinger VPS + Servidor Local (comparativa INF-010) |

---

## Documentos por Fase

### Investigacion

| Documento | Ubicacion | Descripcion |
|-----------|-----------|-------------|
| Entrevista Abogado #01 | `entrevistas/Entrevista_Abogado_01.md` | 12 anios, asistencia familiar, 52 min |
| Entrevista Abogado #02 | `entrevistas/Entrevista_Abogado_02.md` | 8 anios, patria potestad, 48 min |
| Entrevista Abogado #03 | `entrevistas/Entrevista_Abogado_03.md` | 3 anios, violencia domestica, 35 min |
| Ishikawa | `diagramas/wae/diagrama ishikawa.svg` | Causa raiz 6 categorias, 24 causas |
| Casos de Uso | `diagramas/casos_de_uso/` (8 SVG) | 30 CU en 10 epicas |
| Modelo C4 | `diagramas/c4/` (6 SVG) | N1 Contexto, N2 Contenedor, N3 Componente, Despliegue Vercel+Railway + 8 ADRs |
| Base de Datos | `diagramas/base_de_datos/Base_de_Datos_01.svg` | ER 8 tablas + DDL Postgres + Mongo + Vector HNSW |
| UML Clases | `diagramas/uml/` (2 SVG) | 13 clases, enums, servicios RAG/Auth/Crypto |
| Actividades | `diagramas/actividades/` (8 SVG) | P1-P7 + flujo global |
| Componentes | `diagramas/componentes/` (9 SVG) | Componentes + secuencias + estados + despliegue |
| BPWin IDEF0 | `diagramas/bpwin/` (9 SVG) | A0 Contexto, A0 Ciclo Vida, P1-P7 IDEF0 con entradas/controles/salidas/mecanismos |
| Mapa de Procesos | `diagramas/procesos/` (SVG + MMD) | P1-P7 por carriles (abogado/sistema) + Motor RAG + controles IDEF0 (RB-01..23) |

### Analisis

| Documento | Ubicacion | Contenido |
|-----------|-----------|-----------|
| Matriz de Coherencia | `documentos/Matriz_de_Coherencia.md` | Pregunta, objetivo general y 6 OE |
| TDR | `documentos/TDR_KM_RAG.md` | 29 RF + 19 RNF, stack React/AntD/Vite + RAG + Vercel/Railway, gestion riesgos, SSL/TLS |
| Estimacion COCOMO | `documentos/Estimacion_COCOMO_KM_RAG.md` | PF 202, KLOC 12.01 WAE-RAG (48.15 PM), SF 23.59, EM 1.45, costo 60,092 base / 67,904 IVA |
| Cotizacion | `documentos/cotizacion/Cotizacion_KM_RAG.md` | COCOMO II WAE-RAG hitos H1-H5, tarifa 1,248, margen 26.7%, formula recalculo |

### Diseno y Planificacion

| Documento | Ubicacion | Contenido |
|-----------|-----------|-----------|
| User Stories | `documentos/User_Stories.md` | 30 US en 10 epicas |
| Ciclo de Vida | `documentos/Ciclo_de_Vida_del_Proyecto.md` | 6 fases: Investigacion -> Mantenimiento |
| Modelado BPWin | `documentos/Modelado_Procesos_BPWin.md` | 7 procesos IDEF0 con SVG BPWin + reglas RB-01..23 + modelo datos |
| Contrato | `documentos/Contrato_KM_RAG.md` | 16 clausulas, 5 hitos (60,092 base, 67,904 IVA, margen incl.), propiedad intelectual, garantia 60d |
| Plan y Cronograma | `documentos/Plan_Proyecto_Cronograma_KM_RAG.md` | 8 sprints x 2 semanas (4 meses) + garantia, E1-E12, riesgos, H1-H5 60k |
| Manual Tecnico | `prototype/manuales/Manual_Tecnico_KM_RAG.md` | Arquitectura, APIs REST/WS, wireframes 16 vistas, versiones v1..vN, RAG, seguridad, despliegue, troubleshooting |

### Entrega, Seguridad y Bitacoras

| Documento | Ubicacion | Contenido |
|-----------|-----------|-----------|
| Acta de Entrega | `prototype/manuales/Acta_Entrega_KM_RAG.md` | Entrega E1-E12, verificacion, handover repos/boveda, garantia 60d |
| Boveda Contrasenas | `documentos/seguridad/Boveda_Contrasenas_KM_RAG.md` | 20 secretos (JWT/AES/DB/APIs), rotacion 90d, handover H5 |
| Proformas Deployment | `documentos/proformas/` (12 fichas) | Vercel, Railway, Hostinger, Servidor Local, dominios, SSL, comparativa INF-010 |
| Bitacoras | `documentos/bitacoras/` (9 md) | Bitacora General + Sprint 00-08 (impedimentos, decisiones, evidencias) |
| Carta Aceptacion | `documentos/Carta_Aceptacion_KM_RAG.md` | Aceptacion TDR y contrato (67,904 IVA) |

---

## Mapa de Relacion Documentos ↔ Objetivos

| Objetivo | TDR | User Stories | BPWin |
|----------|-----|--------------|-------|
| OE1. Busqueda semantica RAG | RF-12, RF-13, RF-14 | US-12, US-13, US-14, US-25 | P3 (Busqueda) |
| OE2. Clasificacion automatica | RF-05, RF-06, RF-08, RF-09 | US-05, US-06, US-08, US-09 | P1 (Registro), P2 (Ingesta) |
| OE3. Alertas proactivas | RF-15, RF-16, RF-17, RF-21, RF-22 | US-15, US-16, US-17, US-21, US-22 | P4 (Audiencias), P7 (Alertas) |
| OE4. Plataforma segura y movil | RF-01, RF-02, RF-03, RF-04, RF-24 | US-01, US-02, US-03, US-24 | Todos (seguridad transversal) + Boveda |
| OE5. Control de versiones | RF-10, RF-11, RF-29 | US-10, US-11, US-29 | P6 (Versiones) |
| OE6. Comparticion segura | RF-18, RF-19, RF-20 | US-18, US-19, US-20 | P5 (Comparticion) |

---

## Flujo del Proyecto

```
Entrevistas (3)          ->  Analisis Necesidades
         |
Matriz de Coherencia     ->  Alineacion Objetivos
         |
Ishikawa                 ->  Causa Raiz (24 causas)
         |
BPWin IDEF0 (9 SVG)      ->  7 Procesos + Contexto IDEF0
         |
TDR (48 req)             ->  29 RF + 19 RNF
         |
User Stories (30)        ->  10 Epicas
         |
C4 + ER + UML + Actividades + Componentes -> Arquitectura
         |
Estimacion COCOMO II     ->  12.01 KLOC WAE-RAG -> 48.15 PM -> 60,092 base / 67,904 IVA (margen 26.7%)
         |
Cotizacion + Contrato    ->  5 hitos H1-H5 (20/15/25/15/25%)
         |
Plan 8 sprints + Bitacoras -> E1-E12 en 16 semanas + garantia 60d
         |
Deployment (INF-003/004/008/009) -> Vercel+Railway o Hostinger o Local (INF-010)
         |
Manual Tecnico (APIs+wireframes+versiones) + Boveda + Acta Entrega -> Cierre H5
```

---

## Tecnologias

| Capa | Tecnologia |
|------|------------|
| Frontend | React 18 + Vite + Ant Design 5.x, React Query, Zustand, React Router |
| Backend | FastAPI (Python) o Express (Node) |
| RAG | LangChain / LlamaIndex, embeddings ES 768d, HNSW, LLM GPT-4o-mini / Mistral 7B |
| Vector DB | ChromaDB / pgvector (HNSW) |
| BD | PostgreSQL 15 (Railway) + MongoDB Atlas opcional |
| Deploy | Vercel (FE) + Railway (BE/RAG/DB/cron) — alternativas Hostinger VPS / Servidor Local |
| Seguridad | AES-256-GCM (reposo y campo victima), TLS 1.3, JWT 30m, RBAC chunk-level, auditoria inmutable, Boveda Bitwarden |
| Monitoreo | Sentry + UptimeRobot, 99.5% uptime |

---

## Precio COCOMO II

- **Base:** Bs. 60,092.00 (48.15 PM x 1,248 Bs/PM, costo empresa 985 + margen 26.7%)
- **IVA 13%:** Bs. 7,811.96
- **Total:** Bs. 67,903.96
- **Hitos:** H1 20% (13,580.79), H2 15% (10,185.59), H3 25% (16,975.90), H4 15% (10,185.59), H5 25% (16,975.90)
- **Descuento contado 10%:** Bs. 61,113.59 total
- **Infra no incluida:** dominio Bs 980 + Vercel 0 + Railway 5-20 USD/mes (ver proformas)

---

## Bitacoras y Seguimiento

Ver `documentos/bitacoras/Bitacora_General.md` y `Bitacora_Sprint_00.md` a `Bitacora_Sprint_08.md` para dailys, impedimentos, decisiones y evidencias por sprint.

---

## Seguridad

Ver `documentos/seguridad/Boveda_Contrasenas_KM_RAG.md` para 20 secretos (JWT, AES, DB, APIs, dominios) con rotacion 90d y handover en H5.

---

## Entrega

Ver `prototype/manuales/Acta_Entrega_KM_RAG.md` para entrega formal E1-E12, verificacion (busqueda <3s, ZAP 0 high, usabilidad 3 abogados), handover repos/Vercel/Railway/Boveda y garantia 60d.

