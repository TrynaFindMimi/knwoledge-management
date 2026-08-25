# DIAGRAMA DE ISHIKAWA (ESPINA DE PESCADO)

## SISTEMA DE GESTIÓN DE DOCUMENTOS — BUFFET DE ASISTENCIA FAMILIAR

---

### PREGUNTA CENTRAL DEL PROYECTO (enfoque KM):

# **¿CÓMO ORDENAR LOS ARCHIVOS Y DOCUMENTOS LEGALES OFICIALES DE MANERA INTELIGENTE PARA ABOGADOS DE LEY FAMILIAR?**

> **RESPUESTA / SOLUCIÓN PROPUESTA:**
> **Creando un Sistema de Gestión de Conocimiento (KM) a base de RAG (Retrieval-Augmented Generation) para filtrar, clasificar y organizar los datos de forma automática, permitiendo búsquedas en lenguaje natural y respuestas con cita de fuente.**

Esta pregunta es el **problema central** del Ishikawa. La ineficiencia actual impide ordenar inteligentemente; el sistema KM con RAG es la respuesta que ataca directamente las causas raíz.

---

### PROBLEMA CENTRAL IDENTIFICADO (desglosado):

# **INEFICIENCIA EN LA GESTIÓN DOCUMENTAL QUE IMPIDE ORDENAR INTELIGENTEMENTE LOS ARCHIVOS LEGALES Y AFECTA LA CALIDAD DEL SERVICIO LEGAL EN ASISTENCIA FAMILIAR**

---

```
    PERSONAL                    PROCESOS                    TECNOLOGÍA
        │                         │                            │
        │                         │                            │
        ▼                         ▼                            ▼
┌───────────────┐        ┌───────────────┐           ┌───────────────┐
│ Falta de      │        │ Procesos de   │           │ Ausencia de   │
│ capacitación  │        │ archivo       │           │ sistema de    │
│ en manejo     │        │ desordenados  │           │ gestión       │
│ digital       │        │ y manuales    │           │ documental    │
└───────────────┘        └───────────────┘           └───────────────┘
        │                         │                            │
        │                         │                            │
        ▼                         ▼                            ▼
┌───────────────┐        ┌───────────────┐           ┌───────────────┐
│ Resistencia   │        │ Falta de      │           │ SIN RAG / SIN │
│ al cambio     │        │ estandariza-  │           │ IA: Búsqueda  │
│ hacia         │        │ ción y        │           │ solo por      │
│ tecnología    │        │ etiquetado    │           │ nombre exacto │
│               │        │ manual        │           │ No entiende   │
└───────────────┘        └───────────────┘           │ lenguaje      │
        │                         │                   │ natural       │
        │                         │                   └───────────────┘
        │                         │                            │
        │                         │                   ┌───────────────┐
        │                         │                   │ Archivos mal  │
        │                         │                   │ nombrados     │
        │                         │                   │ (scan001.jpg) │
        │                         │                   │ sin OCR ni    │
        │                         │                   │ embeddings    │
        │                         │                   └───────────────┘
        └─────────────────────────┼────────────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │                         │
                    │  PREGUNTA CENTRAL:       │
                    │  ¿CÓMO ORDENAR           │
                    │  INTELIGENTEMENTE LOS    │
                    │  ARCHIVOS LEGALES?       │
                    │  → INEFICIENCIA EN LA    │
                    │  GESTIÓN DOCUMENTAL      │
                    │                         │
                    └─────────────────────────┘
                                  │
                                  │
        ┌─────────────────────────┼────────────────────────────┐
        │                         │                            │
        ▼                         ▼                            ▼
┌───────────────┐        ┌───────────────┐           ┌───────────────┐
│ Pérdida de    │        │ Búsqueda de   │           │ Falta de      │
│ documentos    │        │ documentos    │           │ confidencia-  │
│ físicos y     │        │ lenta e       │           │ lidad y       │
│ digitales     │        │ ineficiente   │           │ trazabilidad  │
│ "¿dónde está  │        │ 3-6h/semana   │           │ en accesos    │
│ el convenio?" │        │ "scan001.jpg" │           │               │
└───────────────┘        └───────────────┘           └───────────────┘
        │                         │                            │
        │                         │                            │
        ▼                         ▼                            ▼
┌───────────────┐        ┌───────────────┐           ┌───────────────┐
│ Retraso en    │        │ Errores de    │           │ Riesgo de     │
│ presentación  │        │ versión y     │           │ filtración de │
│ de pruebas    │        │ no se sabe    │           │ datos         │
│ en audiencias │        │ cuál es la    │           │ sensibles de  │
│               │        │ correcta      │           │ menores/víct. │
└───────────────┘        └───────────────┘           └───────────────┘
        │                         │                            │
        │                         │                            │
        └─────────────────────────┼────────────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │                         │
                    │  CONSECUENCIA:           │
                    │  PERJUICIO AL CLIENTE    │
                    │  Y PÉRDIDA DE            │
                    │  CREDIBILIDAD PROFESIONAL│
                    │  + INCAPACIDAD DE        │
                    │  ORDENAR INTELIGENTEMENTE│
                    │                         │
                    └─────────────────────────┘


    MATERIALES                    MÉTODOS                   MEDIO AMBIENTE
        │                         │                            │
        │                         │                            │
        ▼                         ▼                            ▼
┌───────────────┐        ┌───────────────┐           ┌───────────────┐
│ Carpetas      │        │ Falta de      │           │ Espacio       │
│ físicas       │        │ protocolos    │           │ físico        │
│ saturadas y   │        │ de archivado  │           │ limitado para │
│ desorganiza-  │        │ uniformes     │           │ archivadores  │
│ das           │        │ (todo manual) │           │               │
└───────────────┘        └───────────────┘           └───────────────┘
        │                         │                            │
        │                         │                            │
        ▼                         ▼                            ▼
┌───────────────┐        ┌───────────────┐           ┌───────────────┐
│ Acumulación   │        │ Ausencia de   │           │ Condiciones    │
│ de papeles    │        │ respaldos y   │           │ inadecuadas   │
│ innecesarios  │        │ de pipeline   │           │ de conserva-  │
│ y duplicados  │        │ inteligente   │           │ ción y acceso │
│               │        │ (sin chunking)│           │ no controlado │
└───────────────┘        └───────────────┘           └───────────────┘
        │                         │                            │
        │                         │                            │
        └─────────────────────────┼────────────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │                         │
                    │  PREGUNTA CENTRAL:       │
                    │  ¿CÓMO ORDENAR           │
                    │  INTELIGENTEMENTE?       │
                    │                         │
                    └─────────────────────────┘
```

---

### ANÁLISIS DE CAUSA RAÍZ (PROBLEMA COMÚN IDENTIFICADO)

| Categoría | Causas Identificadas | Impacto | ¿Cómo lo resuelve el RAG? |
|-----------|---------------------|---------|---------------------------|
| **PERSONAL** | Falta de capacitación en herramientas digitales; resistencia al cambio; dependencia de personal administrativo único (Mariela); escritura apurada con errores | Alto | Chat en lenguaje natural, no requiere etiquetado perfecto. Tolera errores y sinónimos legales |
| **PROCESOS** | Procesos de archivo desordenados; falta de estandarización; etiquetado manual que nadie cumple; ausencia de protocolos de respaldo | Crítico | **Clasificación automática** por LLM: al subir, el RAG lee el contenido y propone tipo/caso/fecha. Filtrado y organización sin esfuerzo manual |
| **TECNOLOGÍA** | Ausencia de sistema de gestión documental; **ausencia total de RAG/IA**; búsqueda solo por nombre exacto que falla con `scan001.jpg`; archivos sin OCR ni embeddings; sin búsqueda semántica | **Crítico** | **Core RAG:** OCR → chunking → embeddings (pgvector/Qdrant) → búsqueda semántica + chat con citas. Ordena inteligentemente aunque el archivo esté mal nombrado |
| **MATERIALES** | Carpetas físicas saturadas; acumulación de papeles innecesarios y duplicados; espacio físico limitado | Alto | Digitalización con OCR + vectorización; un solo repositorio KM centralizado y filtrable |
| **MÉTODOS** | Falta de protocolos uniformes; ausencia de control de versiones; ausencia de respaldos periódicos; método manual sin pipeline inteligente | Alto | Pipeline RAG estandarizado y trazable; control de versiones + historial de consultas RAG |
| **MEDIO AMBIENTE** | Espacio físico inadecuado; condiciones de conservación deficientes; acceso no controlado a archivos | Medio | Acceso digital seguro desde cualquier lugar (juzgado, celular) con control de acceso por rol y a nivel de chunk |

---

### PROBLEMA COMÚN IDENTIFICADO EN LOS 3 ENTREVISTADOS:

> **Los tres abogados especializados en asistencia familiar enfrentan el mismo problema central: no saben cómo ordenar los archivos y documentos legales oficiales de manera inteligente. Buscan "convenio García" y no aparece porque el archivo se llama `DOC_FINAL2.pdf`. Pierden entre 3 y 6 horas semanales buscando, sufren retrasos en audiencias, pérdida de credibilidad y riesgo de filtración. La causa raíz común es la falta de un sistema KM que filtre y organice automáticamente el contenido — no solo el nombre del archivo.**

**Evidencia textual:**
- Abogado 01 (12 años): *"Que me entienda aunque escriba mal... Que yo escriba 'Mamani alimentos' y me aparezca TODO"*
- Abogada 02 (8 años): *"Que escriba 'informe psicológico Quispe niña' y me salga, aunque se llame DOC_234234.pdf"*
- Abogada 03 (3 años): *"Que yo le pueda preguntar como si fuera una persona... aunque yo escriba mal, apurada"*

---

### SÍNTOMAS COMUNES DETECTADOS:

1. **Archivos mal nombrados irrecuperables** — `scan001.jpg` con informe forense crítico que no se encuentra por búsqueda tradicional
2. **Pérdida de documentos** — Todos reportan haber perdido o tardado en encontrar documentos críticos (convenios, órdenes, informes)
3. **Búsqueda lenta 3-6 h/semana** — Tiempo que debería dedicarse a defensa legal
4. **Retrasos en audiencias** — Incapacidad de presentar pruebas a tiempo ante jueces ("lo presento en 24h")
5. **Riesgo de seguridad** — Contraseñas débiles, sin cifrado ni auditoría; datos de menores/víctimas expuestos
6. **Falta de control de versiones** — Dudas sobre cuál es la demanda correcta
7. **Dependencia de persona clave** — Si la secretaria falta, nadie encuentra nada
8. **Imposibilidad de preguntas complejas** — No pueden preguntar "¿qué falta para la audiencia de mañana?" sin revisar expediente completo

---

### PROPUESTA DE SOLUCIÓN: SISTEMA KM A BASE DE RAG

**Respuesta a la pregunta "¿Cómo ordenar inteligentemente?": Crear un Sistema de Gestión de Conocimiento (KM) a base de RAG para filtrar y organizar los datos.**

#### Arquitectura KM-RAG propuesta:

```
[CAPA DE INGESTA INTELIGENTE]
   PDF / DOCX / JPG escaneado
        ↓ OCR (Tesseract / Textract)
        ↓ Limpieza + Chunking 500-800 tokens (overlap 100)
        ↓ Clasificación automática LLM (tipo: demanda, orden, informe...)
        ↓ Embeddings (multilingual-e5 / text-embedding-3-large para español legal)
        ↓ Vector DB (pgvector / Qdrant) + Metadatos (caso, cliente, fecha, tipo, vencimiento)

[CAPA DE CONOCIMIENTO]
   Base vectorial filtrable + Base relacional (PostgreSQL)
   Filtros automáticos: por caso, por tipo, por fecha, por vencimiento extraído del texto

[CAPA DE CONSULTA INTELIGENTE]
   Usuario pregunta en lenguaje natural:
   "¿Qué documentos faltan para la audiencia de García mañana?"
   "Muéstrame todas las órdenes de restricción por vencer esta semana"
   "Resume los 3 informes psicológicos del caso Quispe"
        ↓ Embedding de la pregunta
        ↓ Retriever (top-k 5, threshold 0.75, filtrado por permisos)
        ↓ Prompt con contexto + instrucciones anti-alucinación
        ↓ LLM (GPT-4o-mini / Llama 3 local)
        ↓ Respuesta con citas: [Archivo, pág. 2, score 0.89, fragmento resaltado]
```

#### Funcionalidades KM-RAG que ordenan inteligentemente:

- **Filtrado automático:** Al subir, el sistema lee el contenido y auto-organiza por caso/tipo/fecha sin que el abogado etiquete manualmente.
- **Organización semántica:** Entender que "convenio de visitas", "acuerdo de régimen de visitas" y "acta de visitas" son lo mismo.
- **Búsqueda que perdona errores:** Encontrar "informe forense Gutiérrez" aunque el archivo se llame `scan001.jpg` porque el contenido fue vectorizado.
- **Chat de conocimiento:** Preguntas complejas con respuesta directa y trazable, no lista de 50 archivos para revisar uno por uno.
- **Alertas inteligentes:** RAG extrae fechas de vencimiento del texto ("vigencia 90 días desde 12/02/2026") y genera alertas proactivas.
- **Seguridad KM:** Cifrado de embeddings + control de acceso a nivel de chunk + auditoría de quién preguntó qué.

#### Beneficios esperados (vinculados a causas del Ishikawa):

| Antes (causa) | Después (con KM-RAG) |
|---------------|----------------------|
| Búsqueda por nombre exacto falla | Búsqueda semántica funciona aunque el nombre sea malo |
| 3-6 h/semana perdidas buscando | < 10 segundos por pregunta con cita exacta |
| Alguien debe etiquetar manualmente | Auto-clasificación por LLM al ingerir |
| No se puede preguntar "¿qué falta?" | Chat responde "Te faltan X e Y según expediente" |
| Papeles saturados, duplicados | Repositorio único KM filtrable y desduplicado |
| Riesgo de filtración, sin trazabilidad | Acceso con roles, links temporales, log RAG |

---

### MATRIZ DE COEFICIENTES DE CAUSA-EFECTO (ponderación Ishikawa)

Cuantifica el peso de cada categoría causal sobre la ineficiencia central. Coeficiente normalizado sobre 1.00.

| Categoría Ishikawa | Coef. (Ci) | Peso % | Justificación (evidencia entrevistas) | Causa raíz prioritaria |
|--------------------|------------|--------|---------------------------------------|------------------------|
| **TECNOLOGÍA** | **0.30** | 30% | Sin RAG/IA, búsqueda por nombre falla con `scan001.jpg`, sin OCR/embeddings. Los 3 abogados lo mencionan como dolor principal | Ausencia total de RAG |
| **PROCESOS** | **0.25** | 25% | Archivo manual desordenado, etiquetado que nadie cumple, sin protocolos | Falta de estandarización |
| **PERSONAL** | **0.15** | 15% | Falta capacitación, resistencia al cambio, dependencia de Mariela, escritura apurada | Dependencia de persona clave |
| **MÉTODOS** | **0.15** | 15% | Sin control de versiones, sin respaldos, sin pipeline inteligente | Método manual sin trazabilidad |
| **MATERIALES** | **0.10** | 10% | Carpetas saturadas, duplicados, papeles innecesarios | Acumulación física |
| **MEDIO AMBIENTE** | **0.05** | 5% | Espacio limitado, conservación deficiente, acceso no controlado | Infraestructura física |
| **TOTAL** | **1.00** | **100%** | | |

> **Lectura:** TECNOLOGÍA (0.30) + PROCESOS (0.25) = 55% del problema. Por eso la solución KM-RAG ataca directamente esas dos categorías con el mayor coeficiente. Ver `Matriz_Coeficientes.md` Sección 6 para matriz de riesgos asociada (CR = P×I).

---

### VALIDACIÓN DE LA SOLUCIÓN CON LAS ENTREVISTAS

La solución KM-RAG fue validada contra las 3 entrevistas: los 3 abogados piden explícitamente "que me entienda aunque escriba mal", "como si fuera una persona", "que lea los documentos por mí". Esto **no lo resuelve una búsqueda tradicional por palabras clave**, solo RAG.

**Criterio de éxito RAG definido en TDR:** Precision@5 >85%, alucinación <5%, respuesta siempre con cita verificable, validado con 50 preguntas reales del buffet en Sprint 6.

---
