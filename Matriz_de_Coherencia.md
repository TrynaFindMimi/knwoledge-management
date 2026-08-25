# MATRIZ DE COHERENCIA

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG PARA EL BUFFET DE ABOGADOS DE ASISTENCIA FAMILIAR

---

### INFORMACIÓN GENERAL

| Campo | Descripción |
|-------|-------------|
| **Proyecto** | Desarrollo e implementación de Sistema de Gestión de Conocimiento (KM) basado en RAG para ordenar, filtrar y organizar archivos y documentos legales oficiales |
| **Organización** | Buffet de Abogados de Asistencia Familiar — Despacho legal especializado en Derecho de Familia |
| **Ubicación** | Bolivia |
| **Asignatura** | Gestión de Proyectos Informáticos |
| **Documento** | Matriz de Coherencia — Anexo B del TDR |
| **Versión** | 1.0 — Agosto 2026 |

### EQUIPO DE TRABAJO

| # | Nombre | C.I. N.° |
|---|--------|----------|
| 1 | Nahomi Humerez | ________ |
| 2 | Mariana del Arroyo | ________ |
| 3 | Santiago Acha | ________ |
| 4 | Jorge Saenz | ________ |

---

### 1. PREGUNTA CENTRAL Y PROBLEMA GENERAL

| Elemento | Descripción |
|----------|-------------|
| **Pregunta central** | ¿Cómo ordenar los archivos y documentos legales oficiales de manera inteligente para abogados de ley familiar? |
| **Problema general** | Ineficiencia en la gestión documental que impide ordenar inteligentemente los archivos legales y afecta la calidad del servicio legal en asistencia familiar, provocando pérdida de documentos, retrasos en audiencias, riesgo de filtración de información sensible y pérdida de entre 3 y 6 horas semanales por abogado en búsquedas manuales. |
| **Solución propuesta** | Sistema de Gestión de Conocimiento (KM) basado en Retrieval-Augmented Generation (RAG) que filtra, clasifica y organiza los datos de forma automática, con búsqueda semántica en lenguaje natural, clasificación automática y respuestas con cita de fuente verificable. |

---

### 2. MATRIZ DE COHERENCIA GENERAL

| Problema General | Objetivo General | Hipótesis General | Variable Independiente | Variable Dependiente | Indicadores de Verificación |
|------------------|------------------|-------------------|------------------------|----------------------|------------------------------|
| Ineficiencia en la gestión documental que impide el ordenamiento inteligente de archivos legales oficiales, caracterizada por archivo manual desorganizado, búsqueda por nombre exacto que falla con archivos mal nombrados (`scan001.jpg`, `DOC_FINAL2.pdf`), ausencia de trazabilidad y riesgo de filtración de datos de menores y víctimas. | Desarrollar e implementar un Sistema de Gestión de Conocimiento (KM) web basado en RAG que permita ordenar los archivos y documentos legales oficiales de manera inteligente, mediante filtrado, clasificación automática, búsqueda semántica y generación de respuestas con trazabilidad, organizando, protegiendo y gestionando eficientemente toda la documentación de los casos legales. | La implementación de un Sistema KM con pipeline RAG (OCR → chunking → embeddings → Vector DB → retriever → LLM con citación) reduce significativamente el tiempo de búsqueda, incrementa la tasa de recuperación de documentos críticos y disminuye los retrasos en audiencias y el riesgo de filtración, al permitir consultas en lenguaje natural con trazabilidad por documento, página y fragmento. | Sistema de Gestión de Conocimiento con RAG: pipeline de ingesta inteligente, base vectorial (pgvector/Qdrant), embeddings multilingües, chat KM con anti-alucinación y control de acceso por roles y a nivel de chunk. | Eficiencia y calidad de la gestión documental: tiempo de búsqueda, tasa de recuperación, cumplimiento de plazos legales, seguridad y confidencialidad, y satisfacción del personal legal. | Tiempo medio de búsqueda < 10 segundos por consulta; Precision@5 > 85% y alucinación < 5% (set de 50 preguntas reales, Sprint 6); reducción de 3-6 h/semana a < 0.5 h/semana; 0 incidentes de filtración en auditoría; respuesta RAG siempre con cita verificable o mensaje controlado "no hay información suficiente". |

---

### 3. MATRIZ DE COHERENCIA ESPECÍFICA

| # | Problema Específico | Objetivo Específico | Requerimientos Asociados | Entregable | Indicador / Criterio de Aceptación | Fuente de Verificación |
|---|----------------------|---------------------|--------------------------|------------|------------------------------------|------------------------|
| PE1 | Ausencia de plataforma centralizada y segura; acceso limitado desde juzgados y dependencia de carpetas físicas y archivos dispersos. | OE1. Diseñar e implementar una plataforma web segura y accesible desde cualquier dispositivo. | F01, F13, RNF02, RNF03, RNF04, RNF08 | E3: Autenticación y gestión de usuarios<br>E9: QA y despliegue | Login con roles (admin/abogado/asistente) operativo; HTTPS obligatorio; responsive verificado en Chrome, Firefox, Safari, Edge y móvil; uptime ≥ 99% | Pruebas de acceso y auditoría OWASP Top 10; pruebas de responsividad |
| PE2 | Documentos organizados manualmente sin estructura por caso ni categorías legales estandarizadas; duplicados y archivos mal nombrados. | OE2. Desarrollar un sistema de organización de documentos por caso con subcategorías legales predefinidas. | F02, F04, F14 | E4: Gestión de casos<br>E5: Gestión de documentos | CRUD de casos con cliente, tipo, estado, fechas y abogado asignado; organización por caso/categoría con metadatos; 100% de documentos asociados a un caso | Demo funcional y validación con 3 casos reales del buffet |
| PE3 | Búsqueda tradicional por nombre exacto o palabra clave falla cuando el archivo está mal nombrado; imposibilidad de usar sinónimos legales ("convenio de visitas" = "acuerdo de régimen de visitas"). | OE3. Implementar un motor de búsqueda semántica con RAG que entienda lenguaje natural y sinónimos legales. | F05, F17, F18, RNF11, RNF12 | E5: Pipeline RAG (ingesta, OCR, embeddings, Vector DB)<br>E6: Chat KM con citas | Búsqueda semántica en español legal boliviano; ranking por similitud vectorial; threshold 0.75; tolerancia a errores ortográficos y sinónimos | Evaluación Precision@5 > 85% con 50 preguntas reales; prueba con `scan001.jpg` recuperado vía pregunta semántica |
| PE4 | Documentos escaneados como imágenes sin texto extraíble; archivos PDF/Word no indexables sin procesamiento. | OE4. Implementar ingesta inteligente: OCR + chunking + embeddings para PDFs, Word e imágenes escaneadas. | F03, F17, RNF01 | E5: Pipeline RAG | OCR automático (Tesseract / Textract) al subir; chunking 500-800 tokens overlap 100; embeddings y almacenamiento en pgvector/Qdrant 100% automático | Verificación de vectorización y recuperación de fragmento con página y score |
| PE5 | Etiquetado manual que nadie cumple; clasificación dependiente de la memoria del personal administrativo. | OE5. Implementar clasificación automática del tipo documental mediante RAG/LLM sin etiquetado manual. | F19, F04 | E5-E6 | Al subir, el sistema propone tipo documental (demanda, orden de restricción, informe psicológico, etc.) y caso sugerido con precisión > 80% | Pruebas de clasificación con 30 documentos no vistos |
| PE6 | Imposibilidad de realizar preguntas complejas sobre el contenido ("¿qué falta para la audiencia de mañana?", "resume los informes médicos de este caso") sin revisar expediente completo. | OE6. Desarrollar un chat de conocimiento (KM Chat) que responda preguntas en lenguaje natural citando documento, página y fecha. | F18, F20, F21, RNF05, RNF11, RNF12 | E6: Chat KM RAG con citas | Chat tipo WhatsApp/ChatGPT en español; respuesta siempre con cita [archivo, pág., fragmento, score] o "no hay información suficiente"; alucinación < 5% | Evaluación con 50 preguntas reales Sprint 6; auditoría de citas |
| PE7 | Ausencia de control de versiones; dudas sobre cuál es el documento vigente; sobrescritura sin historial. | OE7. Desarrollar un sistema de control de versiones automático para documentos modificados. | F06 | E6 | Historial de versiones, comparación y restauración operativa para todo documento modificado | Pruebas de versionado con 3 ciclos de edición |
| PE8 | Datos sensibles de menores y víctimas expuestos con contraseñas débiles; sin cifrado ni auditoría de quién consultó qué. | OE8. Implementar un sistema de seguridad con cifrado de datos, control de acceso por roles y trazabilidad de accesos RAG. | F01, F21, RNF03, RNF09, RNF12 | E3, E8 | Passwords encriptados, HTTPS, cifrado en reposo y tránsito (incluye embeddings); control a nivel de chunk; log de consulta RAG por usuario/documento/cita; auditoría sin vulnerabilidades críticas | Auditoría de seguridad y revisión de logs RAG |
| PE9 | Plazos y vencimientos (órdenes de restricción, audiencias) se pasan por alto al depender de revisión manual del contenido. | OE9. Desarrollar alertas proactivas e inteligentes generadas a partir del análisis del contenido. | F07, F08 | E6 | Alertas extraídas automáticamente del texto (ej. "vigencia 90 días desde 12/02/2026" → vence en 3 días); notificaciones por correo; 0 audiencias perdidas por vencimiento no notificado | Pruebas con documentos con fecha de vencimiento explícita |
| PE10 | Redacción repetitiva de demandas, peticiones y acuerdos sin reutilización de datos del caso. | OE10. Implementar un módulo de generación de documentos estándar asistido por RAG. | F09 | E7 | Plantillas para demandas, contestaciones, peticiones y acuerdos con datos pre-cargados del caso y asistencia RAG | Generación de 3 documentos desde plantilla con datos reales |
| PE11 | Compartir documentos por WhatsApp o correo sin control, con riesgo de envío a destinatario equivocado y sin expiración. | OE11. Desarrollar un sistema de compartir documentos de forma segura con clientes y terceros. | F10, RNF03 | E7 | Enlaces seguros con tiempo de expiración y control de acceso por cliente/tercero; revocación disponible | Pruebas de generación, acceso y expiración de enlace |
| PE12 | Falta de administración centralizada de usuarios, casos, documentos y base vectorial; sin métricas de uso ni de precisión RAG. | OE12. Crear un panel de administración para gestión de usuarios, casos, documentos y base vectorial. | F11, F12, F13, F16, RNF06, RNF10 | E8: Panel de administración | Gestión de usuarios/roles/permisos, estadísticas de uso, visor de base vectorial, respaldos automáticos (relacional + vectorial), dashboard de precisión RAG, capacidad 10k+ documentos sin degradación | Validación de dashboard y prueba de respaldo/restauración |
| PE13 | Resistencia al cambio y falta de capacitación en herramientas digitales; escritura apurada con errores y necesidad de preguntar "como a una persona". | OE13. Capacitar al personal del buffet en el uso del sistema, con énfasis en cómo preguntar al sistema RAG. | RNF05, RNF07 | E9-E10: Documentación y capacitación | 3 sesiones de capacitación realizadas; taller práctico de prompts en lenguaje natural; manual de usuario (cómo preguntar al chat KM) y manual técnico (arquitectura RAG) entregados en PDF | Lista de asistencia, evaluación de usabilidad con usuario real y encuesta de satisfacción |

---

### 4. MATRIZ DE OPERACIONALIZACIÓN DE VARIABLES

#### 4.1. Variable Independiente: Sistema de Gestión de Conocimiento con RAG

| Dimensión | Indicador | Índice / Métrica | Instrumento | Fuente |
|-----------|-----------|------------------|-------------|--------|
| Ingesta inteligente | Documentos vectorizados correctamente | % documentos con OCR + chunking + embedding exitoso = 100% | Log de pipeline RAG | Vector DB (pgvector/Qdrant) |
| Búsqueda semántica | Precisión y pertinencia | Precision@5 > 85%, threshold 0.75, top-k=5 | Set de 50 preguntas reales del buffet | Evaluación Sprint 6 |
| Chat KM | Calidad y trazabilidad de respuesta | Tasa de alucinación < 5%; 100% respuestas con cita o mensaje controlado | Protocolo anti-alucinación, prompt con contexto | Auditoría RAG |
| Clasificación automática | Acierto en tipo y caso sugerido | Precisión de clasificación > 80% | Matriz de confusión por tipo documental | Pruebas con 30 docs |
| Seguridad KM | Confidencialidad y trazabilidad | Cifrado en reposo/tránsito; control a nivel de chunk; log completo | Auditoría OWASP, revisión de logs | Panel de administración |

#### 4.2. Variable Dependiente: Eficiencia y calidad de la gestión documental

| Dimensión | Indicador | Índice / Métrica | Instrumento | Fuente |
|-----------|-----------|------------------|-------------|--------|
| Tiempo | Tiempo medio de búsqueda por documento | De 3-6 h/semana a < 10 seg/consulta y < 0.5 h/semana | Cronometraje y encuesta | Entrevistas (Abogados 01, 02, 03) y pruebas de usuario |
| Recuperación | Documentos críticos localizables | % de documentos recuperados vía pregunta semántica aunque el nombre sea incorrecto | Pruebas con archivos `scan001.jpg`, `DOC_FINAL2.pdf` | Demo E5 |
| Cumplimiento legal | Audiencias y plazos atendidos a tiempo | 0 retrasos por documento no presentado; 0 vencimientos no alertados | Registro de alertas y calendario | Log de alertas inteligentes |
| Seguridad | Protección de datos sensibles | 0 incidentes de filtración; accesos auditables por usuario/cita | Auditoría de accesos RAG | Logs del sistema |
| Usabilidad | Adopción por personal no técnico | Tasa de adopción > 90%; satisfacción > 4/5 | Cuestionario SUS, entrevistas post-capacitación | Sesiones de capacitación |

---

### 5. COHERENCIA METODOLÓGICA

| Componente | Descripción | Coherencia con el problema |
|------------|-------------|----------------------------|
| **Enfoque** | Aplicado, con desarrollo tecnológico y validación empírica en contexto real del buffet. | Responde directamente a la necesidad práctica de ordenar inteligentemente archivos legales existentes, no a una investigación teórica. |
| **Tipo de investigación** | Proyectiva / de desarrollo (propuesta de sistema) con evaluación de precisión RAG. | Permite pasar del diagnóstico (Ishikawa, entrevistas) a la solución implementable y medible. |
| **Método** | Análisis cualitativo (entrevistas semiestructuradas a 3 abogados) + diseño e implementación de pipeline RAG + validación cuantitativa (Precision@k, alucinación, tiempo). | Las entrevistas evidencian la causa raíz (búsqueda por nombre falla, escritura apurada); la validación cuantitativa verifica que RAG la resuelve. |
| **Metodología de trabajo** | Scrum con sprints de 2 semanas, 10 semanas totales, demos funcionales por sprint, gestión en Trello/Jira, comunicación por WhatsApp y Google Meet/Zoom, repositorio privado en GitHub. | Asegura entregas incrementales (E1-E11) y validación temprana con usuarios (50 preguntas reales en Sprint 6). |
| **Población** | 3 abogados especializados y 2 asistentes administrativos del buffet; 50+ clientes activos; corpus inicial de documentos legales del buffet. | Coincide con los informantes de las entrevistas y usuarios finales del sistema. |
| **Técnicas e instrumentos** | Entrevistas anónimas semiestructuradas, diagrama de Ishikawa, matriz de coeficientes de evaluación, pruebas de precisión RAG, auditoría de seguridad, pruebas de usabilidad. | Triangulación: Ishikawa pondera causas (Tecnología 0.30, Procesos 0.25), entrevistas aportan evidencia textual, matriz de coeficientes prioriza la adjudicación. |

---

### 6. TRAZABILIDAD OBJETIVOS — REQUERIMIENTOS — ENTREGABLES — EVALUACIÓN

| Objetivo Específico | Requerimientos Funcionales | Entregables (Semana) | Criterio de Evaluación Asociado | Coef. |
|---------------------|----------------------------|----------------------|---------------------------------|-------|
| OE1, OE12 | F01, F11, F12, F13 | E1 (S1), E3 (S3), E8 (S9), E9 (S10) | C4 Cronograma y metodología (0.15) — Plan 10 semanas Scrum E1-E11 | 0.15 |
| OE2, OE4, OE5 | F02, F03, F04, F14, F17, F19 | E4 (S4), E5 (S5-6) | C2 Propuesta técnica y stack (0.25) — Arquitectura RAG completa OCR→Vector DB→LLM | 0.25 |
| OE3, OE6 | F05, F17, F18, F20, F21 | E5 (S5-6), E6 (S7) | C2 Propuesta técnica (0.25) — Anti-alucinación y citación con trazabilidad; Plan Precision@5 >85% | 0.25 |
| OE7, OE9, OE10, OE11 | F06, F07, F08, F09, F10 | E6 (S7), E7 (S8) | C2 Seguridad/escalabilidad (0.25) y C4 Validación 50 preguntas Sprint 6 | 0.25 / 0.15 |
| OE8 | F01, F21, RNF03, RNF09 | E3, E8 | C2 Seguridad, cifrado y escalabilidad 10k+ docs (15% de C2) | 0.25 |
| OE13 | — (transversal) | E10, E11 (S10) | C1 Experiencia del equipo (0.30) — Referencias y capacidad de capacitación; C4 Comunicación | 0.30 / 0.15 |
| **Todos** | F01-F21, RNF01-RNF12 | E1-E11 | C3 Propuesta económica (0.25) — Costo-beneficio, desglose por hitos, licencias incluidas | 0.25 |

**Fórmula de adjudicación:** PF = Σ(Ci × Pi), PF ≥ 70 habilitado, descalificación si C1 < 40 o C2 < 40. Ver `Matriz_Coeficientes.md` para desglose de subcriterios y ejemplo de cálculo.

---

### 7. COHERENCIA CON DIAGRAMA DE ISHIKAWA

| Categoría Ishikawa | Coef. Ishikawa | Problema Específico vinculado | Objetivo que lo resuelve | Módulo RAG que interviene |
|--------------------|----------------|-------------------------------|--------------------------|---------------------------|
| Tecnología (ausencia de RAG, búsqueda por nombre exacto, sin OCR/embeddings) | 0.30 | PE3, PE4, PE6 | OE3, OE4, OE6 | Pipeline RAG completo + Vector DB + Chat KM con citas |
| Procesos (archivo manual desordenado, etiquetado que nadie cumple) | 0.25 | PE2, PE5 | OE2, OE5 | Clasificación automática por LLM + organización por caso |
| Personal (falta de capacitación, resistencia al cambio, dependencia de persona clave, escritura apurada) | 0.15 | PE1, PE13 | OE1, OE13 | Chat en lenguaje natural que tolera errores, interfaz tipo WhatsApp |
| Métodos (sin control de versiones, sin respaldos, sin pipeline inteligente) | 0.15 | PE7, PE12 | OE7, OE12 | Control de versiones + pipeline RAG estandarizado y trazable |
| Materiales (carpetas físicas saturadas, duplicados) | 0.10 | PE2, PE4 | OE2, OE4 | Digitalización con OCR + repositorio KM centralizado y filtrable |
| Medio Ambiente (espacio limitado, acceso no controlado) | 0.05 | PE8, PE1 | OE8, OE1 | Acceso digital seguro por roles y a nivel de chunk, desde cualquier dispositivo |

La ponderación Ishikawa (Tecnología 0.30 + Procesos 0.25 = 55% del problema) justifica que el mayor peso en la Matriz de Coeficientes recaiga en C1 Experiencia RAG/KM (0.30) y C2 Propuesta técnica RAG (0.25).

---

### 8. MATRIZ DE RIESGOS ASOCIADA

Coherente con `Matriz_Coeficientes.md` Sección 6. CR = Probabilidad (1-5) × Impacto (1-5).

| Riesgo | P | I | CR | Nivel | Objetivo / Entregable que lo mitiga |
|--------|---|---|----|-------|-------------------------------------|
| R1 Alucinación del LLM (>5%) | 3 | 5 | 15 | Alto | OE6 — Threshold 0.75, prompt anti-alucinación, citas obligatorias (E6) |
| R2 OCR falla en manuscritos | 4 | 4 | 16 | Alto | OE4 — Doble motor Tesseract + Textract, validación humana (E5) |
| R3 Embeddings deficientes para español legal boliviano | 3 | 4 | 12 | Medio | OE3 — BGE-M3 / Cohere multilingual-v3 (E5) |
| R4 Vector DB no escala a 10k docs | 2 | 4 | 8 | Medio | OE12 — pgvector HNSW, particionado por caso (E8) |
| R5 Resistencia al cambio | 4 | 3 | 12 | Medio | OE13 — Chat tipo WhatsApp, capacitación en prompts naturales (E9-E11) |
| R6 Filtración de datos sensibles | 2 | 5 | 10 | Alto | OE8 — Cifrado en reposo/tránsito, control a nivel de chunk (E3, E8) |
| R7 Retraso en cronograma 10 semanas | 3 | 3 | 9 | Medio | Todos — Scrum 2 semanas, demos, backlog priorizado por CV (E1-E11) |

---

### 9. VALIDACIÓN DE LA COHERENCIA

La presente matriz fue contrastada con:

1. **Entrevistas anónimas 01, 02 y 03** — Los tres abogados coinciden en la necesidad de búsqueda que "entienda aunque escriba mal", preguntas en lenguaje natural y alertas proactivas. Cada frase textual se mapea a un PE/OE específico (ver Sección 3).
2. **Diagrama de Ishikawa** — La causa raíz prioritaria (Tecnología 0.30) se corresponde con los objetivos de mayor esfuerzo (OE3, OE4, OE6 con CE=5) y con los entregables críticos E5-E6.
3. **TDR Secciones 3, 5, 6, 9 y 15** — Cada objetivo específico tiene al menos un requerimiento funcional y un entregable con criterio de aceptación; la Matriz de Coeficientes evalúa precisamente esa arquitectura RAG.
4. **Criterios RNF11 y RNF12** — Precision@5 >85%, alucinación <5% y trazabilidad con cita verificable son los indicadores transversales que cierran la cadena problema-objetivo-indicador.

---

### REFERENCIAS CRUZADAS

- TDR_Sistema_Documental.md — Secciones 3 (Objetivos), 4-6 (Alcance y Requerimientos), 9 (Entregables), 15 (Matriz de Coeficientes)
- Diagrama_Fishbone.md — Categorías causales y coeficientes Ishikawa
- Matriz_Coeficientes.md — Anexo A del TDR (evaluación C1-C5, priorización F01-F21, riesgos R1-R7)
- Entrevistas anónimas 01, 02, 03 — Evidencia textual para PE1-PE13
- Contrato_Sistema_Documental.md — Cláusulas de alcance, cronograma y calidad
- Carta_Aceptacion_Sistema_Documental.md — Compromiso de ejecución E1-E11

---
