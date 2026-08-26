# Knowledge Management — Sistema de Gestión de Conocimiento con RAG

## Buffet de Abogados de Asistencia Familiar

Proyecto de **Gestión de Proyectos Informáticos** — Desarrollo de un Sistema de Gestión de Conocimiento (KM) basado en RAG para sistematizar archivos y documentos legales oficiales de abogados de derecho familiar.

---

## Estructura del Proyecto

```
knwoledge-management/
│
├── README.md                          ← Este archivo
├── INDICE.md                          ← Índice general del proyecto
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
    └── Ishikawa.md                    ← Diagrama de causa raíz (Mermaid)
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
