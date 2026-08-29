# Knowledge Management — Sistema de Gestión de Conocimiento con RAG

## Buffet de Abogados de Asistencia Familiar

Proyecto de **Gestión de Proyectos Informáticos** — Desarrollo de un Sistema de Gestión de Conocimiento (KM) basado en RAG para sistematizar archivos y documentos legales oficiales de abogados de derecho familiar.

---

## Estructura del Proyecto

```
knwoledge-management/
│
├── README.md                          ← Este archivo
│
├── entrevistas/                       ← Entrevistas con usuarios
│   ├── Entrevista_Abogado_01.md       ← Abogado, 12 años, asistencia familiar
│   ├── Entrevista_Abogado_02.md       ← Abogada, 8 años, patria potestad
│   └── Entrevista_Abogado_03.md       ← Abogada, 3 años, violencia doméstica
│
├── documentos/                        ← Documentacion del proyecto
│   ├── Matriz_de_Coherencia.md        ← Alineacion pregunta-objetivos
│   ├── TDR.md                         ← Terminos de Referencia (48 requerimientos)
│   ├── TDR_KM_RAG.md                  ← TDR v2.0 React/AntD/Vite + RAG + Vercel/Railway
│   ├── User_Stories.md                ← 30 historias de usuario (10 epicas)
│   ├── Ciclo_de_Vida_del_Proyecto.md  ← Ciclo de vida en 6 fases
│   ├── Modelado_Procesos_BPWin.md     ← Modelado de 7 procesos con BPWin
│   ├── Estimacion_COCOMO_KM_RAG.md    ← Estimacion COCOMO 81 + COCOMO II + WAE-RAG (12.01 KLOC, precio 4+2 meses)
│   ├── Contrato_KM_RAG.md             ← Contrato 16 clausulas + 5 hitos (precio COCOMO 4 meses + 2 garantia, IVA 13%)
│   ├── Carta_Aceptacion_KM_RAG.md     ← Carta aceptacion TDR y contrato
│   └── Plan_Proyecto_Cronograma_KM_RAG.md ← Plan 8 sprints (4 meses) + 2 meses garantia + riesgos + hitos pago
│
└── diagramas/                         ← Diagramas de analisis y arquitectura (SVG vectorial)
    ├── actividades/                   ← 8 diagramas de actividades P1-P7 (SVG)
    ├── base_de_datos/                 ← ER relacional 8 entidades + vector HNSW (SVG)
    │   └── Base_de_Datos_01.svg
    ├── c4/                            ← Modelo C4 N1-N4 + Despliegue + 8 ADRs (6 SVG)
    ├── casos_de_uso/                  ← 30 CU en 10 epicas, trazabilidad RF/US/BPWin (8 SVG)
    ├── componentes/                   ← Componentes + Secuencia + Estados + Despliegue (9 SVG)
    ├── uml/                           ← Clases (13) + Secuencia (2 SVG)
    ├── wae/                           ← WAE Web Application Extension (Conallen) — 5 diagramas RAG con «action» + Ishikawa (SVG)
    │   ├── WAE_01.svg                 ← Tamano Web Objects (136.5 WOP → 12.01 KLOC) con «action»
    │   ├── WAE_02.svg                 ← Arquitectura WAE-RAG (WEB→ACS→DBC+Vector→LLM) con «action»/«client page»/«form»
    │   ├── WAE_03.svg                 ← Comparativa COCOMO vs WAE y precio 4+2 meses con «action»
    │   ├── WAE_04.svg                 ← Clases WAE UML con estereotipos «action», «client page», «form», «collection»
    │   ├── WAE_05.svg                 ← Secuencia WAE búsqueda RAG con «action» y «collection»
    │   └── diagrama ishikawa.svg
    └── html/                          ← HTML originales archivados (README)
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
| Procesos modelados (BPWin) | 7 |
| Causas raiz identificadas (Ishikawa) | 24 |
| Casos de uso modelados | 30 CU (10 epicas, trazables a 29 RF) |
| Diagramas C4 | 4 niveles (Contexto, Contenedor, Componente, Despliegue) + 8 ADRs |
| Estimacion COCOMO | 8.48 - 14 KLOC (COCOMO II) / 12.01 KLOC WAE-RAG (136.5 WOP), 32.97 - 57.65 PM (Semi) / 48-52 PM WAE-RAG |
| Precio COCOMO II 4+2 meses (a cobrar) | **Bs. 40.232,52** WAE-RAG ★ / **Bs. 34.984,80** con descuento contado — ver `cotizacion/Cotizacion_KM_RAG.md` §3 |

---

## Documentos por Fase

### Investigación

| Documento | Ubicación | Descripción |
|-----------|-----------|-------------|
| Entrevista Abogado #01 | `entrevistas/Entrevista_Abogado_01.md` | 12 años experiencia, asistencia familiar. 52 min |
| Entrevista Abogado #02 | `entrevistas/Entrevista_Abogado_02.md` | 8 años experiencia, patria potestad y menores. 48 min |
| Entrevista Abogado #03 | `entrevistas/Entrevista_Abogado_03.md` | 3 años experiencia, violencia doméstica. 35 min |
| Diagrama de Ishikawa | `diagramas/wae/diagrama ishikawa.svg` | Analisis de causa raiz — 6 categorias, 24 causas |
| Casos de Uso | `diagramas/casos_de_uso/` (8 SVG) | 30 CU en 10 epicas, trazabilidad RF/US/BPWin — UML (ex `Casos_de_Uso.html`) |
| Modelo C4 | `diagramas/c4/` (6 SVG) | C4 N1 Contexto, N2 Contenedor, N3 Componente, Despliegue Vercel+Railway + 8 ADRs (ex `C4.html`) |
| Base de Datos | `diagramas/base_de_datos/Base_de_Datos_01.svg` | ER SQL 8 tablas + DDL Postgres + MongoDB 5 colecciones + Vector DB HNSW (ex `Base_de_Datos.html`) — **relacion en SVG** |
| UML Clases | `diagramas/uml/` (2 SVG) | 13 clases, enums, servicios RAG/Auth/Crypto, multiplicidades (ex `UML.html`) |
| Actividades | `diagramas/actividades/` (8 SVG) | 7 actividades P1-P7 + flujo global ciclo de vida documento — UML (ex `Actividades.html`) |
| Componentes | `diagramas/componentes/` (9 SVG) | Componentes UML + 5 secuencias (login, ingesta, busqueda, compartir, cron) + estados + despliegue (ex `Componentes.html`) |
| WAE-RAG | `diagramas/wae/WAE_*.svg` (5 SVG) | **WAE Web Application Extension (Conallen)** — tamano, arquitectura y secuencia con estereotipos `«action»`, `«client page»`, `«form»`, `«collection»` — RAG enfatizado |

### Analisis

| Documento | Ubicacion | Contenido |
|-----------|-----------|-----------|
| Matriz de Coherencia | `documentos/Matriz_de_Coherencia.md` | Pregunta de investigacion, objetivo general y 6 objetivos especificos |
| Terminos de Referencia | `documentos/TDR.md` | 29 RF + 19 RNF, cada uno con ID, prioridad, criterios de aceptacion |
| TDR KM RAG v2.0 | `documentos/TDR_KM_RAG.md` | TDR completo React/AntD/Vite + RAG + Vercel/Railway + 19 RNF medibles |
| Estimacion COCOMO | `documentos/Estimacion_COCOMO_KM_RAG.md` | PF 202, KLOC 8.48-14 (COCOMO II) / 12.01 (WAE-RAG), COCOMO 81/II/**WAE**, precio COCOMO puro 4+2 meses con RAG enfatizado |

### Diseno

| Documento | Ubicacion | Contenido |
|-----------|-----------|-----------|
| User Stories | `documentos/User_Stories.md` | 30 historias de usuario en 10 epicas, criterios INVEST |
| Ciclo de Vida | `documentos/Ciclo_de_Vida_del_Proyecto.md` | 6 fases: Investigacion -> Mantenimiento |
| Modelado BPWin | `documentos/Modelado_Procesos_BPWin.md` | 7 procesos, 23 reglas de negocio, modelo de datos |
| Contrato | `documentos/Contrato_KM_RAG.md` | 16 clausulas, 5 hitos de pago (precio COCOMO 4+2, IVA 13%), propiedad intelectual, garantia 60 dias |
| Plan y Cronograma | `documentos/Plan_Proyecto_Cronograma_KM_RAG.md` | 8 sprints x 2 semanas (4 meses) + 2 meses garantia, E1-E12, riesgos, hitos H1-H5 |

---

## Mapa de Relación Documentos ↔ Objetivos

| Objetivo | TDR | User Stories | BPWin |
|----------|-----|--------------|-------|
| **OE1. Analizar/Diseñar** motor búsqueda semántica RAG | RF-12, RF-13, RF-14 | US-12, US-13, US-14, US-25 | P3 (Búsqueda) |
| **OE2. Diseñar** clasificación automática | RF-05, RF-06, RF-08, RF-09 | US-05, US-06, US-08, US-09 | P1 (Registro), P2 (Ingesta) |
| **OE3. Desarrollar** alertas proactivas | RF-15, RF-16, RF-17, RF-21, RF-22 | US-15, US-16, US-17, US-21, US-22 | P4 (Audiencias), P7 (Alertas) |
| **OE4. Implementar** plataforma segura y móvil | RF-01, RF-02, RF-03, RF-04, RF-24 | US-01, US-02, US-03, US-24 | Todos (seguridad transversal) |
| **OE5. Implementar** control de versiones | RF-10, RF-11, RF-29 | US-10, US-11, US-29 | P6 (Versiones) |
| **OE6. Validar** compartición segura | RF-18, RF-19, RF-20 | US-18, US-19, US-20 | P5 (Compartición) |

---

## Mapa de Relación Entrevistas ↔ Requerimientos

| Necesidad (Entrevista) | RF Asociados | Prioridad |
|------------------------|--------------|-----------|
| "Que me entienda aunque escriba mal" | RF-12, RF-13 | Crítica |
| "Que lea y clasifique solo" | RF-09 | Crítica |
| "Que me avise si vence la orden" | RF-16 | Crítica |
| "Seguridad para datos de víctimas" | RF-03 | Crítica |
| "Acceso desde celular en juzgado" | RF-24 | Alta |
| "Que no dependa de Mariela" | RF-05, RF-06, RF-14 | Alta |
| "No imprimir versión vieja" | RF-11 | Alta |
| "Enlace temporal, no WhatsApp" | RF-18, RF-19 | Alta |
| "Que sea fácil sin capacitación" | RF-24, RF-25 | Alta |
| "Rapidez en emergencias" | RF-25 | Alta |

---

## Flujo del Proyecto

```
Entrevistas (3)          ->  Analisis de Necesidades
         |
Matriz de Coherencia     ->  Alineacion Objetivos
         |
Diagrama Ishikawa        ->  Causa Raiz del Problema
         |
TDR (48 req)             ->  29 RF + 19 RNF
         |
User Stories             ->  30 Historias de Usuario (10 Epicas)
         |
Modelado BPWin           ->  7 Procesos + Modelo de Datos
         |
Casos de Uso             ->  30 CU trazables a RF/US/BPWin (diagramas/Casos_de_Uso.html)
         |
Modelo C4                ->  Contexto + Contenedor + Componente + Despliegue (diagramas/C4.html)
         |
Estimacion COCOMO        ->  PF 202 -> 8.48-14 KLOC -> 32-57 PM -> Costo mercado vs Bs. 65.000
         |
Ciclo de Vida            ->  6 Fases del Proyecto (Investigacion -> Mantenimiento)
```

---

## Tecnologías Propuestas

| Capa | Tecnología |
|------|------------|
| Frontend | React/Next.js, Tailwind CSS |
| Backend | FastAPI / Django REST |
| Motor RAG | LangChain / LlamaIndex |
| Base de datos | PostgreSQL + ChromaDB |
| Cifrado | AES-256 (reposo), TLS 1.3 (tránsito) |
| Modelado de procesos | AllFusion Process Modeler BPWin |

---

## Objetivos Específicos

| Código | Objetivo |
|--------|----------|
| OE1 | **Analizar** los requerimientos y **diseñar** motor de búsqueda semántica con RAG tolerante a errores y sinónimos legales |
| OE2 | **Diseñar** módulo de clasificación y organización automática por caso sin etiquetado manual |
| OE3 | **Desarrollar** sistema de alertas proactivas e inteligentes de vencimientos y audiencias |
| OE4 | **Implementar** plataforma web segura, móvil y con control de acceso por roles y a nivel de chunk |
| OE5 | **Implementar** mecanismo de control de versiones y desduplicación con auditoría inmutable |
| OE6 | **Validar** sistema de compartición segura con enlaces temporales JWT, watermark y revocación |
