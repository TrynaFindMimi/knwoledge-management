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
├── documentos/                        ← Documentación del proyecto
│   ├── Matriz_de_Coherencia.md        ← Alineación pregunta-objetivos
│   ├── TDR.md                         ← Términos de Referencia (48 requerimientos)
│   ├── User_Stories.md                ← 30 historias de usuario (10 épicas)
│   ├── Ciclo_de_Vida_del_Proyecto.md  ← Ciclo de vida en 6 fases
│   └── Modelado_Procesos_BPWin.md     ← Modelado de 7 procesos con BPWin
│
└── diagramas/                         ← Diagramas de análisis
    └── Ishikawa.html                  ← Diagrama de causa raíz (HTML/CSS)
```

---

## Resumen Ejecutivo

| Elemento | Cantidad |
|----------|----------|
| Entrevistas realizadas | 3 |
| Objetivos específicos | 6 |
| Requerimientos funcionales | 29 |
| Requerimientos no funcionales | 19 |
| Historias de usuario | 30 |
| Procesos modelados (BPWin) | 7 |
| Causas raíz identificadas (Ishikawa) | 24 |

---

## Documentos por Fase

### Investigación

| Documento | Ubicación | Descripción |
|-----------|-----------|-------------|
| Entrevista Abogado #01 | `entrevistas/Entrevista_Abogado_01.md` | 12 años experiencia, asistencia familiar. 52 min |
| Entrevista Abogado #02 | `entrevistas/Entrevista_Abogado_02.md` | 8 años experiencia, patria potestad y menores. 48 min |
| Entrevista Abogado #03 | `entrevistas/Entrevista_Abogado_03.md` | 3 años experiencia, violencia doméstica. 35 min |
| Diagrama de Ishikawa | `diagramas/Ishikawa.html` | Análisis de causa raíz — 6 categorías, 24 causas |

### Análisis

| Documento | Ubicación | Contenido |
|-----------|-----------|-----------|
| Matriz de Coherencia | `documentos/Matriz_de_Coherencia.md` | Pregunta de investigación, objetivo general y 6 objetivos específicos |
| Términos de Referencia | `documentos/TDR.md` | 29 RF + 19 RNF, cada uno con ID, prioridad, criterios de aceptación |

### Diseño

| Documento | Ubicación | Contenido |
|-----------|-----------|-----------|
| User Stories | `documentos/User_Stories.md` | 30 historias de usuario en 10 épicas, criterios INVEST |
| Ciclo de Vida | `documentos/Ciclo_de_Vida_del_Proyecto.md` | 6 fases: Investigación → Mantenimiento |
| Modelado BPWin | `documentos/Modelado_Procesos_BPWin.md` | 7 procesos, 23 reglas de negocio, modelo de datos |

---

## Mapa de Relación Documentos ↔ Objetivos

| Objetivo | TDR | User Stories | BPWin |
|----------|-----|--------------|-------|
| **OE1.** Búsqueda semántica con RAG | RF-12, RF-13, RF-14 | US-12, US-13, US-14, US-25 | P3 (Búsqueda) |
| **OE2.** Clasificación automática | RF-05, RF-06, RF-08, RF-09 | US-05, US-06, US-08, US-09 | P1 (Registro), P2 (Ingesta) |
| **OE3.** Alertas proactivas | RF-15, RF-16, RF-17, RF-21, RF-22 | US-15, US-16, US-17, US-21, US-22 | P4 (Audiencias), P7 (Alertas) |
| **OE4.** Plataforma segura y móvil | RF-01, RF-02, RF-03, RF-04, RF-24 | US-01, US-02, US-03, US-24 | Todos (seguridad transversal) |
| **OE5.** Control de versiones | RF-10, RF-11, RF-29 | US-10, US-11, US-29 | P6 (Versiones) |
| **OE6.** Compartición segura | RF-18, RF-19, RF-20 | US-18, US-19, US-20 | P5 (Compartición) |

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
Entrevistas (3)          →  Análisis de Necesidades
         ↓
Matriz de Coherencia     →  Alineación Objetivos
         ↓
Diagrama Ishikawa        →  Causa Raíz del Problema
         ↓
TDR                      →  48 Requerimientos (29 RF + 19 RNF)
         ↓
User Stories             →  30 Historias de Usuario (10 Épicas)
         ↓
Modelado BPWin           →  7 Procesos + Modelo de Datos
         ↓
Ciclo de Vida            →  6 Fases del Proyecto
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
| OE1 | Búsqueda semántica con RAG que tolere errores y sinónimos legales |
| OE2 | Clasificación y organización automática por caso sin etiquetado manual |
| OE3 | Alertas proactivas e inteligentes de vencimientos y audiencias |
| OE4 | Plataforma web segura, móvil y con control de acceso por roles |
| OE5 | Control de versiones y desduplicación |
| OE6 | Compartición segura con enlaces temporales |

---

*Proyecto de Gestión de Proyectos Informáticos — 2026*
