# TÉRMINOS DE REFERENCIA (TDR)

## DESARROLLO DE SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG PARA BUFFET DE ASISTENCIA FAMILIAR

---

### EQUIPO DE TRABAJO

| # | Nombre |
|---|--------|
| 1 | Nahomi Humerez |
| 2 | Mariana del Arroyo |
| 3 | Santiago Acha |
| 4 | Jorge Saenz |

---

### 1. INFORMACIÓN GENERAL

| Campo | Descripción |
|-------|-------------|
| **Proyecto** | Desarrollo e implementación de **Sistema de Gestión de Conocimiento (KM) basado en RAG (Retrieval-Augmented Generation)** para ordenar, filtrar y organizar archivos y documentos legales oficiales de manera inteligente para abogados de ley familiar |
| **Organización** | Buffet de Abogados de Asistencia Familiar — Despacho legal especializado |
| **Ubicación** | [Ciudad], Bolivia |
| **Tipo de organización** | Despacho de abogados especializado en derecho de familia (alimentos, patria potestad, violencia doméstica, adopción) |
| **Moneda de referencia** | Bolivianos (Bs.) |
| **Duración estimada** | 10 semanas |
| **Pregunta central** | ¿Cómo ordenar los archivos y documentos legales oficiales de manera inteligente para abogados de ley familiar? |
| **Solución propuesta** | Sistema de Gestión de Conocimiento (KM) basado en RAG para filtrar, clasificar y organizar los datos de forma automática, con búsqueda semántica y respuestas con cita de fuente verificable |

---

### 2. ANTECEDENTES

El Buffet de Abogados de Asistencia Familiar es un despacho legal que brinda servicios de asesoría y representación en casos de derecho de familia, incluyendo demandas de alimentos, patria potestad, violencia doméstica, adopción y protección a víctimas. Actualmente atiende a más de 50 clientes activos con un equipo de 3 abogados especializados y 2 asistentes administrativos.

El manejo de la documentación en el buffet se realiza de manera manual y desorganizada, utilizando carpetas físicas y archivos digitales sin estructura definida. Los problemas identificados incluyen:

- **Pérdida frecuente de documentos** críticos (sentencias, contratos de alimentos, órdenes de restricción)
- **Retrasos en audiencias** por incapacidad de presentar pruebas a tiempo
- **Riesgo de filtración** de información sensible de menores y víctimas
- **Desperdicio de tiempo** (entre 3 y 6 horas semanales buscando documentos)
- **Falta de control de versiones** de documentos modificados
- **Dependencia de personal administrativo** para localizar información
- **Archivos mal nombrados y no etiquetados** (ej. `scan001.jpg`, `DOC_FINAL2.pdf`) que impiden búsquedas por palabra clave tradicional
- **Imposibilidad de hacer preguntas en lenguaje natural** sobre el contenido de los expedientes ("¿qué falta para la audiencia de mañana?", "muéstrame los informes médicos de este caso")

Las búsquedas tradicionales por nombre exacto de archivo o por palabras clave (Elasticsearch full-text) **no resuelven el problema**, porque los abogados no recuerdan nombres exactos y los documentos no están etiquetados. Se requiere un sistema que **entienda el significado** del contenido, no solo el nombre.

Ante esta realidad, el buffet ha identificado la necesidad de contar no solo con un sistema de gestión documental, sino con un **Sistema de Gestión de Conocimiento (KM) inteligente con RAG**, que permita **ingerir, vectorizar, filtrar, clasificar y organizar automáticamente** toda la documentación, y responder preguntas en lenguaje natural citando la fuente exacta.

---

### 3. OBJETIVOS

#### 3.1. Objetivo General

Desarrollar e implementar un **Sistema de Gestión de Conocimiento (KM) web basado en RAG** para el buffet de abogados de asistencia familiar que permita **ordenar los archivos y documentos legales oficiales de manera inteligente**, mediante filtrado, clasificación automática, búsqueda semántica y generación de respuestas con trazabilidad, organizando, protegiendo y gestionando eficientemente toda la documentación de los casos legales.

#### 3.2. Objetivos Específicos

1. Diseñar e implementar una plataforma web segura y accesible desde cualquier dispositivo
2. Desarrollar un sistema de organización de documentos por caso con subcategorías legales predefinidas
3. Implementar un **motor de búsqueda semántica con RAG** que entienda lenguaje natural y sinónimos legales (ej. "convenio de visitas" = "acuerdo de régimen de visitas"), aunque el archivo esté mal nombrado
4. Implementar **ingesta inteligente**: OCR + chunking + embeddings para PDFs, Word e imágenes escaneadas
5. Implementar **clasificación automática** del tipo documental mediante RAG/LLM (demanda, orden de restricción, informe psicológico, etc.) sin etiquetado manual
6. Desarrollar un **chat de conocimiento (KM Chat)** que responda preguntas como "¿qué documentos faltan para la audiencia de García?" o "resume los informes médicos de este caso" citando documento, página y fecha
7. Desarrollar un sistema de control de versiones automático para documentos modificados
8. Implementar un sistema de seguridad con cifrado de datos, control de acceso por roles y trazabilidad de accesos RAG (quién preguntó qué y qué vio)
9. Desarrollar alertas **proactivas e inteligentes** generadas a partir del análisis del contenido (ej. "esta orden de restricción vence en 3 días según el documento X")
10. Implementar un módulo de generación de documentos estándar (demandas, peticiones, acuerdos) asistido por RAG
11. Desarrollar un sistema de compartir documentos de forma segura con clientes y terceros
12. Crear un panel de administración para gestión de usuarios, casos, documentos y base vectorial
13. Capacitar al personal del buffet en el uso del sistema, con énfasis en cómo preguntar al sistema RAG

---

### 4. ALCANCE DEL PROYECTO

#### 4.1. Incluye

| Módulo | Descripción |
|--------|-------------|
| **Autenticación y seguridad** | Login seguro, recuperación de contraseña, sesiones seguras, cifrado de datos sensibles, auditoría de accesos |
| **Gestión de casos** | CRUD de casos con datos del cliente, tipo de caso, estado, fechas límite, abogado asignado |
| **Gestión de documentos** | Subida de archivos (PDF, Word, imágenes), organización por caso y categoría, metadatos personalizados, OCR automático |
| **Búsqueda avanzada + RAG** | Búsqueda por filtros + búsqueda semántica en lenguaje natural con ranking por similitud vectorial |
| **Sistema KM con RAG (CORE)** | Pipeline completo: Ingesta → OCR → Chunking (500-1000 tokens) → Embeddings → Vector DB → Retriever → LLM → Respuesta con cita (doc/página/fragmento). Chat que filtra y organiza datos automáticamente |
| **Clasificación inteligente** | Auto-etiquetado de tipo documental y caso sugerido por el LLM al subir archivo |
| **Control de versiones** | Historial de versiones, comparación de versiones, restauración de versiones anteriores |
| **Alertas y notificaciones inteligentes** | Alertas de vencimiento de plazos extraídas automáticamente del contenido + recordatorios de audiencias + notificaciones por correo |
| **Generación de documentos asistida** | Plantillas para demandas, contestaciones, peticiones, acuerdos con datos pre-cargados y asistencia RAG |
| **Compartir documentos** | Enlaces seguros con tiempo de expiración, control de acceso por cliente o terceros |
| **Panel de administración** | Gestión de usuarios, roles y permisos, estadísticas de uso, gestión de base vectorial, respaldos automáticos, dashboard de precisión RAG |
| **Documentación** | Manual de usuario (cómo preguntar al chat KM), manual técnico (arquitectura RAG) |
| **Capacitación** | 3 sesiones de capacitación al personal del buffet (incluye taller práctico de prompts en lenguaje natural) |

---

### 5. REQUERIMIENTOS FUNCIONALES

| # | Funcionalidad | Prioridad |
|---|---------------|-----------|
| F01 | Registro y autenticación de usuarios con roles (admin, abogado, asistente) | Alta |
| F02 | CRUD de casos con datos del cliente, tipo de caso, estado y abogado asignado | Alta |
| F03 | Subida de documentos con drag & drop, múltiples formatos (PDF, DOCX, JPG, PNG) con OCR automático (Tesseract / AWS Textract) | Alta |
| F04 | Organización de documentos por caso y categoría legal predefinida | Alta |
| F05 | Búsqueda avanzada por múltiples criterios con resultados en tiempo real | Alta |
| F06 | Control de versiones automático con historial y comparación | Alta |
| F07 | Alertas de vencimiento de plazos legales y audiencias (inteligentes, extraídas del contenido) | Alta |
| F08 | Notificaciones por correo electrónico de alertas y cambios de estado | Media |
| F09 | Generación de documentos estándar desde plantillas | Media |
| F10 | Compartir documentos mediante enlaces seguros con expiración | Media |
| F11 | Panel de administración con gestión de usuarios y estadísticas | Alta |
| F12 | Respaldo automático de la base de datos (relacional + vectorial) | Alta |
| F13 | Dashboard con resumen de casos activos, documentos recientes y alertas pendientes | Alta |
| F14 | Etiquetas y marcadores para documentos | Baja |
| F15 | Comentarios en documentos para colaboración | Baja |
| F16 | Exportación de reportes de casos y documentos | Baja |
| **F17** | **Pipeline RAG: chunking, embeddings y almacenamiento en Vector DB (pgvector / Qdrant / Chroma) al subir cada documento** | **Alta** |
| **F18** | **Chat KM con RAG: el usuario pregunta en lenguaje natural y el sistema responde citando fuente exacta (nombre de archivo + página + fragmento) y sin alucinar si no hay evidencia** | **Alta** |
| **F19** | **Clasificación automática del tipo de documento y sugerencia de caso mediante LLM (ej. "esto parece ser Informe Médico Forense del caso Gutiérrez")** | **Alta** |
| **F20** | **Filtros inteligentes: "¿qué le falta a este caso?", "lista todas las órdenes por vencer esta semana", "resume en 5 puntos el expediente X" — todo vía RAG** | **Alta** |
| **F21** | **Auditoría y trazabilidad RAG: log de qué usuario consultó qué documento/cita y control de acceso a nivel de chunk** | **Alta** |

---

### 6. REQUERIMIENTOS NO FUNCIONALES

| # | Requerimiento | Descripción |
|---|---------------|-------------|
| RNF01 | **Rendimiento** | Carga de página principal < 3 segundos en conexión 4G. Respuesta del chat RAG < 4 segundos para top-k=5 |
| RNF02 | **Disponibilidad** | 99% de uptime |
| RNF03 | **Seguridad** | HTTPS obligatorio, passwords encriptados, protección OWASP Top 10, cifrado de datos sensibles en reposo y en tránsito |
| RNF04 | **Responsividad** | Compatible con navegadores modernos, diseño responsive para acceso desde celular en juzgados |
| RNF05 | **Usabilidad** | Interfaz intuitiva y fácil de usar para personal sin conocimientos técnicos. Chat tipo WhatsApp/ChatGPT en español natural |
| RNF06 | **Mantenibilidad** | Código documentado, estructura modular, panel de admin usable, pipeline RAG versionado |
| RNF07 | **Idioma** | Español. Todos los textos, mensajes, prompts y respuestas del LLM en español (incluso embeddings optimizados para español legal boliviano) |
| RNF08 | **Accesibilidad** | Contraste adecuado, textos legibles, imágenes con texto alternativo |
| RNF09 | **Confidencialidad** | Cumplimiento de normativa de protección de datos personales y confidencialidad de información legal. Datos vectorizados con el mismo nivel de cifrado que los documentos originales |
| RNF10 | **Escalabilidad** | Capacidad de crecer en usuarios y documentos (10k+ documentos) sin degradación del rendimiento. Vector DB escalable |
| **RNF11** | **Precisión RAG** | Precision@5 > 85% y alucinación < 5% (evaluado con set de 50 preguntas reales del buffet). Toda respuesta debe incluir cita verificable; si no hay contexto suficiente, debe responder "no hay información suficiente en los documentos" |
| **RNF12** | **Trazabilidad y explicabilidad** | Cada respuesta RAG debe mostrar fuentes: archivo, página, score de similitud y fragmento resaltado |

---

### 7. ARQUITECTURA Y STACK TECNOLÓGICO PROPUESTO

| Componente | Opción sugerida | Alternativas aceptables |
|------------|-----------------|------------------------|
| Plataforma | **Aplicación web SPA** | — |
| Frontend | **React** con TypeScript | Vue.js, Angular |
| Backend | **Node.js** con Express (o **Python FastAPI** para módulo RAG) | Django (Python), Laravel (PHP) |
| Base de datos relacional | **PostgreSQL** | MySQL |
| ORM | **Sequelize** o **Prisma** | SQLAlchemy, Eloquent |
| Autenticación | **JWT** con roles y permisos | OAuth 2.0 |
| Almacenamiento | **S3-compatible** (MinIO local o AWS S3) | Google Cloud Storage |
| Búsqueda tradicional | **MeiliSearch** (para filtros exactos) | Elasticsearch |
| **Vector DB (RAG)** | **pgvector (PostgreSQL) o Qdrant** | Chroma, Pinecone, Weaviate |
| **Embeddings** | **OpenAI text-embedding-3-large / Cohere embed-multilingual-v3.0 / BGE-M3 (español)** | — |
| **LLM** | **GPT-4o-mini / Claude 3.5 Sonnet / Llama 3.1 70B local (vía Ollama)** | — |
| **Framework RAG** | **LangChain o LlamaIndex** | Haystack |
| **OCR** | **Tesseract.js + AWS Textract para manuscritos** | Google Document AI |
| **Chunking** | RecursiveCharacterTextSplitter (500-800 tokens, overlap 100) | — |
| Notificaciones | **Nodemailer** con SMTP | SendGrid, Mailgun |
| Hosting | **VPS** (DigitalOcean, Linode) | AWS EC2, Google Cloud |
| Control de versiones | **Git** (GitHub/GitLab) | — |
| CI/CD | **GitHub Actions** | GitLab CI |

**Flujo RAG propuesto (Figura 1):**

Ingesta: [PDF/JPG/DOCX] → OCR → Limpieza → Chunking (500–800 tokens, overlap 100) → Embeddings → pgvector/Qdrant

Consulta: Pregunta en lenguaje natural → Embedding de la pregunta → Retriever (top-k 5, threshold 0.75) → Prompt con contexto → LLM → Respuesta con citas [Documento, página, score]

---

### 8. METODOLOGÍA DE TRABAJO

Se adoptará una metodología ágil **Scrum** con sprints de 2 semanas, realizando reuniones diarias de seguimiento (daily stand-up de 15 min, virtual) y revisiones con retrospectiva al cierre de cada sprint. Para la gestión de tareas se utilizará **Trello** o **Jira**, manteniendo la comunicación mediante un grupo de WhatsApp para coordinación rápida y Google Meet o Zoom para reuniones formales. El código fuente se alojará en un repositorio privado de GitHub con acceso compartido. Como parte de cada sprint se entregará una demo funcional del incremento desarrollado para validación del buffet.

**Validación específica RAG:** En sprint 6 se realizará evaluación con 50 preguntas reales extraídas de las entrevistas (ej. "¿dónde está la orden de restricción de Flores?", "¿qué casos vencen esta semana?") midiendo Precision@k y tasa de alucinación con usuarios abogados.

---

### 9. ENTREGABLES

| Código | Entregable | Fase | Semana | Criterio de aceptación |
|--------|------------|------|--------|------------------------|
| **E1** | Plan de trabajo detallado y cronograma confirmado | Planificación | 1 | Aprobación del plan por el buffet |
| **E2** | Wireframes y mockups del sistema (incluye diseño del Chat KM) | Diseño | 2 | Aprobación del diseño visual |
| **E3** | Módulo de autenticación y gestión de usuarios | Desarrollo | 3 | Login, registro, roles funcionales |
| **E4** | Módulo de gestión de casos | Desarrollo | 4 | CRUD de casos operativo |
| **E5** | Módulo de gestión y búsqueda de documentos + **pipeline RAG (ingesta, OCR, embeddings, Vector DB)** | Desarrollo | 5–6 | Subida, organización, búsqueda tradicional y vectorización funcionales. Demo: subir `scan001.jpg` mal nombrado y ser encontrado vía pregunta semántica |
| **E6** | Control de versiones, alertas inteligentes y **Chat KM RAG con citas** | Desarrollo | 7 | Historial de versiones, alertas extraídas del contenido y chat que responde con fuente verificable (Precision@5 >85%) |
| **E7** | Generación de documentos y compartir enlaces | Desarrollo | 8 | Plantillas y enlaces seguros funcionales |
| **E8** | Panel de administración completo (incluye visor de base vectorial y logs RAG) | Desarrollo | 9 | Dashboard, gestión de usuarios y estadísticas, auditoría RAG |
| **E9** | QA, despliegue y capacitación (taller RAG) | QA/Despliegue | 10 | Pruebas superadas, sistema en producción, capacitación realizada con ejercicios de preguntas reales |
| **E10** | Documentación: manual de usuario y manual técnico (arquitectura RAG) | Documentación | 10 | Documentos entregados en PDF |
| **E11** | Soporte post-lanzamiento (1 mes) | Soporte | 11–14 | Operación estable, bugs críticos resueltos, ajuste de prompts RAG |

---

### 10. PERFIL DEL EQUIPO DE DESARROLLO REQUERIDO

| Rol | Cantidad | Experiencia | Responsabilidades |
|-----|----------|-------------|-------------------|
| Project Manager | 1 | 2+ años liderando proyectos digitales | Gestión del proyecto, comunicación con el buffet |
| Diseñador UX/UI | 1 | 2+ años en diseño de productos digitales | Wireframes, mockups, diseño intuitivo del Chat KM |
| Desarrollador Full Stack | 2 | 2+ años en React/Node.js o similar | Desarrollo frontend y backend |
| **Ingeniero RAG / IA** | 1 | 1+ año en LangChain/LlamaIndex, Vector DB, embeddings | Pipeline RAG, chunking, prompts, evaluación de precisión |
| QA Tester | 1 | 1+ año en pruebas de software | Pruebas funcionales, de seguridad, usabilidad y **evaluación RAG (alucinación, cita)** |

El equipo deberá presentar portafolio de proyectos similares y referencias comprobables. Se valorará experiencia previa con sistemas legales o de gestión documental y **experiencia con RAG/KM**.

---

### 11. FORMA DE PAGO

**Forma de pago propuesta:**

| Hito | Porcentaje |
|------|-------------|
| Firma de contrato y plan de trabajo aprobado | 20% |
| Aprobación de mockups y diseño (incluye Chat KM) | 15% |
| Módulos de autenticación y gestión de casos (E3, E4) | 20% |
| Módulo de documentos, búsqueda y **RAG + Chat KM** (E5, E6) | 25% |
| Despliegue en producción, documentación y capacitación | 20% |

---

### 12. PROPIEDAD INTELECTUAL

Todo el código fuente, documentación, diseños y materiales producidos durante el desarrollo del proyecto serán de propiedad exclusiva del Buffet de Abogados de Asistencia Familiar una vez completado el pago total del proyecto. El equipo desarrollador se compromete a entregar el código fuente completo, sin dependencias de licencias restrictivas que impidan su uso. **Incluye prompts, índices vectoriales y scripts de ingesta RAG.**

---

### 13. CONFIDENCIALIDAD

El equipo desarrollador se compromete a mantener estricta confidencialidad sobre toda la información del buffet, los datos de clientes, casos legales y cualquier información sensible a la que tenga acceso durante el proyecto. Esta obligación se extiende por un período mínimo de 3 años posteriores a la finalización del contrato, dado el carácter confidencial de la información legal. **Los embeddings y la base vectorial se consideran datos confidenciales al mismo nivel que los documentos originales.**

---

### 14. GARANTÍA Y SOPORTE

- **Garantía**: 90 días posteriores a la puesta en producción, cubriendo corrección de bugs y fallos atribuibles al desarrollo, **incluyendo ajuste de prompts y threshold RAG si la precisión cae por debajo de 85%**, sin costo adicional.
- **Soporte post-garantía**: Podrá contratarse como un servicio mensual independiente (incluye re-indexado y actualización de modelo de embeddings).

---

### 15. CRITERIOS DE EVALUACIÓN DE PROPUESTAS — MATRIZ DE COEFICIENTES

La presente sección resume la matriz ponderada. El detalle completo se presenta en el Anexo A: Matriz_Coeficientes.md.

#### 15.1. Matriz de Coeficientes Ponderados

| Código | Criterio de Evaluación | Coef. (Ci) | Peso % | Subcriterios clave |
|--------|------------------------|------------|--------|--------------------|
| **C1** | Experiencia del equipo y portafolio (valorando RAG/KM) | **0.30** | 30% | Portafolio KM/RAG (40%), Exp. Ing. RAG/IA (30%), Referencias (15%), Exp. legal (15%) |
| **C2** | Propuesta técnica y stack tecnológico (incluye arquitectura RAG) | **0.25** | 25% | Arquitectura RAG completa OCR→Vector DB→LLM (35%), Stack justificado (20%), Anti-alucinación y citas (20%), Seguridad/escalabilidad (15%), Plan Precision@5 >85% (10%) |
| **C3** | Propuesta económica (relación costo-beneficio) | **0.25** | 25% | Costo-beneficio (50%), Desglose por hitos (30%), Licencias incluidas (20%). *Pi = (Precio menor / Precio ofertado) × 100* |
| **C4** | Cronograma y metodología (incluye validación RAG con usuarios) | **0.15** | 15% | Plan 10 semanas Scrum E1-E11 (40%), Validación 50 preguntas Sprint 6 (30%), Riesgos (15%), Comunicación (15%) |
| **C5** | Experiencia con sistemas legales o de gestión documental | **0.05** | 5% | Proyectos en sector justicia (60%), Normativa protección datos BO (40%) |
| | **TOTAL** | **1.00** | **100%** | **Fórmula: PF = Σ(Ci × Pi) — Ver Sección 15.2** |

#### 15.2. Fórmula, Escala y Reglas de Adjudicación

**Fórmula general:**
```
Puntaje Final (PF) = Σ (Ci × Pi)   donde Pi = 0-100 por criterio, Ci = coeficiente
Puntaje mínimo de habilitación: PF ≥ 70/100
Descalificación automática: si C1 < 40 o C2 < 40 (criterios críticos)
```

| Rango Pi | Calificación | Descripción |
|----------|--------------|-------------|
| 90-100 | Excelente | Supera lo exigido, evidencia sólida |
| 75-89 | Bueno | Cumple plenamente |
| 60-74 | Regular | Cumple parcialmente, subsanable |
| 40-59 | Deficiente | Insuficiente |
| 0-39 | No cumple | No presenta / no cumple |

**Desempate:** si diferencia < 1.00 punto, gana mayor puntaje en C2 (técnico RAG). Ver ejemplo de cálculo con dos proponentes en `Matriz_Coeficientes.md:Sección 4`.

#### 15.3. Matrices Complementarias (Anexo A)

- **Priorización de Requerimientos (F01-F21):** Coeficiente de Valor (CV 1-5) y Esfuerzo (CE 1-5), ratio Valor/Esfuerzo para ordenar backlog por sprint. Ej. F17/F18 (Pipeline RAG y Chat KM) CV=5/CE=5 → Sprint 5-7 prioritarios.
- **Coeficientes de Riesgo:** CR = Probabilidad (1-5) × Impacto (1-5). Ej. R1 Alucinación CR=15 (Alto), R2 OCR manuscritos CR=16 (Alto) → requieren mitigación obligatoria.

El detalle completo de ambas matrices se desarrolla en Matriz_Coeficientes.md, Secciones 5 y 6.

---

### 16. CONDICIONES DE PRESENTACIÓN DE PROPUESTAS

- Las propuestas deberán enviarse al correo **[correo@buffet-abogados.com]** con el asunto: **"PROPUESTA SISTEMA GESTIÓN DOCUMENTAL KM-RAG – [Nombre del proponente]"**.
- Fecha límite de recepción: **[dd/mm/aaaa]**
- Consultas técnicas: al mismo correo, hasta **[dd/mm/aaaa]**
- Se valorará positivamente que el equipo tenga experiencia con sistemas legales o de gestión documental y con **sistemas RAG**.

---

### 17. CONTACTO

| | |
|---|---|
| **Organización** | Buffet de Abogados de Asistencia Familiar |
| **Responsable del proyecto** | [Nombre del responsable] |
| **Correo electrónico** | [correo@buffet-abogados.com] |
| **Teléfono / WhatsApp** | [+591 X XXXXXXXX] |
| **Dirección** | [Dirección del buffet] |

---
