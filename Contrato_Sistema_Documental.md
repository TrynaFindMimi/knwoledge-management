# CONTRATO DE PRESTACIÓN DE SERVICIOS DE DESARROLLO DE SOFTWARE

## BUFFET DE ABOGADOS DE ASISTENCIA FAMILIAR — EQUIPO DE DESARROLLO

---

**FECHA:** [dd/mm/aaaa]

**LUGAR:** [Ciudad], Estado Plurinacional de Bolivia

---

Entre el **Buffet de Abogados de Asistencia Familiar**, Despacho Legal especializado en Derecho de Familia, con domicilio en [Dirección], [Ciudad], Bolivia, representada en este acto por **________________________**, mayor de edad, hábil por derecho, con C.I. N.° ________________, en adelante denominado **"EL BUFFET"** o **"EL CLIENTE"**; y, por otra parte:

| # | Desarrollador(a) | C.I. N.° |
|---|-------------------|----------|
| 1 | Nahomi Humerez | ________ |
| 2 | Mariana del Arroyo | ________ |
| 3 | Santiago Acha | ________ |
| 4 | Jorge Saenz | ________ |

Todos mayores de edad, hábiles por derecho, en conjunto denominados **"EL EQUIPO DESARROLLADOR"** o **"LOS PRESTADORES"**, quienes actúan de manera solidaria y mancomunada.

**"EL BUFFET"** y **"EL EQUIPO DESARROLLADOR"** serán denominados conjuntamente como **"LAS PARTES"**.

Las partes convienen en celebrar el presente **CONTRATO DE PRESTACIÓN DE SERVICIOS DE DESARROLLO DE SOFTWARE**, sujeto a las siguientes cláusulas:

---

### CLÁUSULA PRIMERA: RÉGIMEN LEGAL APLICABLE Y NO SUSPENSIÓN DE PAGO

El presente contrato se rige por las disposiciones del Código Civil Boliviano, la Ley N.° 164 de Telecomunicaciones y Tecnologías de Información y Comunicación, la Ley N.° 453 General de los Derechos de las Usuarias y los Usuarios y de las Consumidoras y los Consumidores, y demás normativa aplicable del Estado Plurinacional de Bolivia, en particular las disposiciones vigentes al año 2026 sobre compromisos contractuales y cumplimiento de prestaciones de servicios digitales.

**No suspensión de pago.** Las partes acuerdan de manera expresa, en virtud del principio de irrevocabilidad de los compromisos dinerarios establecido en la legislación boliviana de 2026, que **bajo ninguna circunstancia EL CLIENTE podrá suspender, retener, compensar ni condicionar los pagos ya devengados** correspondientes a los hitos cumplidos y aprobados por entregables del presente contrato, aun cuando existan controversias sobre hitos posteriores, retrasos parciales no atribuibles a dolo o negligencia grave, o cualquier otra circunstancia sobreviniente. Los pagos por hitos ya entregados y formalmente recibidos conforme a los criterios de aceptación definidos en este instrumento son irrevocables y no estarán sujetos a suspensión, devolución ni compensación alguna, salvo sentencia judicial firme y ejecutoriada emitida por tribunal competente del Estado Plurinacional de Bolivia.

---

### CLÁUSULA SEGUNDA: ANTECEDENTES Y OBJETO DEL CONTRATO

#### 2.1. Antecedentes

El Buffet de Abogados de Asistencia Familiar es un despacho legal especializado en derecho de familia que brinda servicios de asesoría y representación en casos de alimentos, patria potestad, violencia doméstica, adopción y protección a víctimas. Actualmente atiende a más de 50 clientes activos con un equipo de 3 abogados especializados y 2 asistentes administrativos.

El buffet ha identificado la necesidad de contar con un sistema de gestión documental especializado que permita organizar, buscar, proteger y recuperar eficientemente la documentación de sus casos, debido a los problemas de pérdida de documentos, retrasos en audiencias y riesgo de filtración de información sensible.

#### 2.2. Objeto

**EL EQUIPO DESARROLLADOR** se compromete a diseñar, desarrollar e implementar un **Sistema de Gestión de Conocimiento (KM) web basado en RAG (Retrieval-Augmented Generation)** para el Buffet de Abogados de Asistencia Familiar, conforme a los Términos de Referencia (TDR_Sistema_Documental.md) anexos al presente contrato y que forman parte integrante del mismo. El proyecto incluye:

1. Plataforma web segura y responsive para gestión de documentos legales
2. Sistema de organización de documentos por caso con subcategorías legales predefinidas
3. Motor de búsqueda avanzada por múltiples criterios y búsqueda semántica con RAG en lenguaje natural
4. Pipeline RAG completo: ingesta, OCR, chunking, embeddings y almacenamiento en Vector DB (pgvector/Qdrant)
5. Clasificación automática del tipo documental y chat de conocimiento (KM Chat) con respuestas con cita de fuente verificable
6. Control de versiones automático para documentos modificados
7. Sistema de seguridad con cifrado de datos, control de acceso por roles y trazabilidad de accesos RAG a nivel de chunk
8. Alertas proactivas e inteligentes generadas a partir del análisis del contenido y notificaciones por correo
9. Módulo de generación de documentos estándar desde plantillas asistido por RAG
10. Sistema de compartir documentos de forma segura con clientes y terceros mediante enlaces con expiración
11. Panel de administración para gestión de usuarios, casos, documentos y base vectorial, con dashboard de precisión RAG
12. Documentación (manual de usuario y manual técnico de arquitectura RAG) y capacitación al personal del buffet

---

### CLÁUSULA TERCERA: ALCANCE DETALLADO

#### 3.1. Alcance incluido (INCLUYE)

| Módulo | Descripción |
|--------|-------------|
| Autenticación y seguridad | Login seguro, recuperación de contraseña, sesiones seguras, cifrado de datos sensibles, auditoría de accesos |
| Gestión de casos | CRUD de casos con datos del cliente, tipo de caso, estado, fechas límite, abogado asignado |
| Gestión de documentos | Subida de archivos (PDF, Word, imágenes), organización por caso y categoría, metadatos personalizados, OCR automático |
| Búsqueda avanzada y RAG | Búsqueda por filtros y búsqueda semántica en lenguaje natural con ranking por similitud vectorial |
| Sistema KM con RAG (CORE) | Pipeline completo: Ingesta → OCR → Chunking (500-1000 tokens) → Embeddings → Vector DB → Retriever → LLM → Respuesta con cita (documento/página/fragmento) |
| Clasificación inteligente | Auto-etiquetado de tipo documental y caso sugerido por el LLM al subir archivo |
| Control de versiones | Historial de versiones, comparación, restauración de versiones anteriores |
| Alertas y notificaciones inteligentes | Alertas de vencimiento de plazos extraídas automáticamente del contenido, recordatorios de audiencias, notificaciones por correo |
| Generación de documentos asistida | Plantillas para demandas, contestaciones, peticiones, acuerdos con datos pre-cargados y asistencia RAG |
| Compartir documentos | Enlaces seguros con tiempo de expiración, control de acceso por cliente o terceros |
| Panel de administración | Gestión de usuarios, roles y permisos, estadísticas de uso, gestión de base vectorial, respaldos automáticos, dashboard de precisión RAG |
| Documentación | Manual de usuario (consulta al chat KM) y manual técnico (arquitectura RAG) |
| Capacitación | 3 sesiones de capacitación al personal del buffet, incluye taller práctico de consultas en lenguaje natural |

#### 3.2. Alcance excluido (LIMITACIONES)

- Diseño de logotipo ni identidad visual del buffet
- Campañas de marketing digital o manejo de redes sociales
- Integración con sistemas de gestión de expedientes judiciales externos
- Desarrollo de aplicaciones móviles nativas (solo web responsiva)
- Redacción de contenido legal para plantillas de documentos
- Hosting, servidores, dominio y certificados SSL: corren por cuenta del buffet
- Licencias de software de terceros requeridas para el desarrollo

---

### CLÁUSULA CUARTA: DURACIÓN, VIGENCIA Y CRONOGRAMA

La duración estimada del proyecto es de **10 semanas** (aproximadamente 2.5 meses) contadas a partir de la firma del presente contrato, prorrogables únicamente por causas justificadas y aprobadas por ambas partes por escrito.

**Vigencia del contrato.** El presente contrato estará vigente desde la fecha de su firma hasta la entrega formal del producto completo (Entregable E9 desplegado en producción, E10 documentación y E11 capacitación realizados), más un período de **3 (tres) meses de garantía** posteriores al despliegue en producción. Una vez vencido dicho período de garantía, el contrato se considerará totalmente cumplido y extinguido para todos los efectos legales.

| Fase | Semana | Entregable |
|------|--------|------------|
| Planificación y diseño | 1–2 | E1: Plan de trabajo; E2: Wireframes y mockups |
| Módulos base | 3–4 | E3: Autenticación y usuarios; E4: Gestión de casos |
| Gestión documental | 5–6 | E5: Gestión y búsqueda de documentos |
| Funcionalidades avanzadas | 7–8 | E6: Control de versiones y alertas; E7: Generación y compartir documentos |
| Administración y QA | 9 | E8: Panel de administración; E9: QA y despliegue |
| Documentación y capacitación | 10 | E10: Documentación; E11: Capacitación |
| Garantía | 11–22 | Soporte post-lanzamiento (3 meses) |

---

### CLÁUSULA QUINTA: OBLIGACIONES DE LAS PARTES

#### 5.1. Obligaciones del EQUIPO DESARROLLADOR

1. Cumplir con los entregables, plazos y criterios de aceptación establecidos en el presente contrato y en los TDR anexos.
2. Mantener comunicación fluida y transparente con EL BUFFET mediante reuniones de seguimiento al final de cada sprint, revisiones con retrospectiva, y grupo de WhatsApp para coordinación rápida.
3. Desarrollar e implementar la plataforma web conforme a los requerimientos funcionales y no funcionales establecidos.
4. Asegurar la confidencialidad y seguridad de toda la información del buffet, datos de clientes y casos legales.
5. Entregar documentación completa y capacitar al personal del buffet.
6. Brindar soporte post-lanzamiento establecido en el presente contrato.

#### 5.2. Obligaciones de EL BUFFET

1. Proporcionar la información, materiales y recursos necesarios para el desarrollo en tiempo y forma.
2. Designar un responsable de proyecto que actúe como interlocutor principal.
3. Revisar y aprobar o rechazar cada entregable en un plazo máximo de 5 días hábiles.
4. Proporcionar el plan/hosting donde se desplegará el sistema.
5. Cumplir con los pagos en los plazos y montos establecidos.

---

### CLÁUSULA SEXTA: PRECIO, IMPUESTOS Y FORMA DE PAGO

#### 6.1. Precio total del proyecto

| Concepto | Monto |
|----------|-------|
| Precio base del proyecto (sin impuestos) | Bs. 18,000 |
| IVA (Impuesto al Valor Agregado), alícuota vigente en Bolivia (13%) | Bs. 2,340 |
| **PRECIO TOTAL (IVA incluido)** | **Bs. 20,340** |

El precio total incluye exclusivamente los servicios de diseño, desarrollo e implementación del sistema de gestión documental, documentación, capacitación y garantía de 3 meses descritos en el presente contrato. **El precio NO incluye servicios de hosting, servidores, dominio ni certificados SSL**, los cuales corren por cuenta de EL BUFFET.

#### 6.2. Forma de pago — Cuatro cuotas

LAS PARTES acuerdan que el pago se realizará en **cuatro (4) cuotas** conforme al siguiente cronograma:

| Cuota | Plazo | Porcentaje | Monto con IVA (Bs.) |
|-------|-------|------------|----------------------|
| 1. Primera cuota | **Firma del contrato** | 20% | 4,068 |
| 2. Segunda cuota | **Aprobación de mockups** (semana 2) | 15% | 3,051 |
| 3. Tercera cuota | **Módulos de autenticación, casos y documentos** (semana 6) | 45% | 9,153 |
| 4. Cuarta cuota | **Despliegue en producción y capacitación** (semana 10) | 20% | 4,068 |

---

### CLÁUSULA SÉPTIMA: PROPIEDAD INTELECTUAL

Todo el código fuente, documentación, diseños, materiales producidos y derechos de propiedad intelectual generados durante el desarrollo del proyecto serán de **propiedad exclusiva del Buffet de Abogados de Asistencia Familiar** una vez completado el pago total del proyecto.

---

### CLÁUSULA OCTAVA: CONFIDENCIALIDAD Y PROTECCIÓN DE DATOS

EL EQUIPO DESARROLLADOR se compromete a mantener estricta confidencialidad sobre toda la información del buffet, los datos personales de clientes, casos legales y cualquier información sensible a la que tenga acceso durante la ejecución del proyecto. Este compromiso se mantendrá por un período mínimo de **3 (tres) años** contados desde la fecha de finalización del contrato.

---

### CLÁUSULA NOVENA: GARANTÍA Y SOPORTE

#### 9.1. Garantía

EL EQUIPO DESARROLLADOR otorga una garantía de **3 (tres) meses** calendario posteriores a la puesta en producción del sistema, durante los cuales se compromete a corregir, sin costo adicional, cualquier bug, error o fallo atribuible al desarrollo realizado.

#### 9.2. Fin de la relación contractual

Vencido el período de garantía de 3 meses, el presente contrato se extingue en su totalidad. Cualquier requerimiento posterior será tratado como un **nuevo proyecto independiente** que requerirá un **nuevo contrato**.

---

### CLÁUSULA DÉCIMA: REQUERIMIENTOS NO FUNCIONALES Y CRITERIOS DE CALIDAD

EL EQUIPO DESARROLLADOR se compromete a cumplir con los siguientes requerimientos:

| Requerimiento | Descripción | Criterio de aceptación |
|---------------|-------------|------------------------|
| Rendimiento | Carga de página principal < 3 segundos en 4G; respuesta del chat RAG < 4 segundos para top-k=5 | Pruebas de carga y latencia |
| Disponibilidad | Uptime del sistema ≥ 99% | Monitoreo de disponibilidad |
| Seguridad | HTTPS obligatorio, passwords encriptados, protección OWASP Top 10, cifrado en reposo y tránsito | Auditoría sin vulnerabilidades críticas |
| Responsividad | Compatible con navegadores modernos, diseño responsive para acceso desde celular en juzgados | Pruebas en Chrome, Firefox, Safari, Edge |
| Usabilidad | Interfaz intuitiva para personal sin conocimientos técnicos; chat en español natural tipo WhatsApp | Pruebas de usabilidad con usuario real |
| Mantenibilidad | Código documentado, estructura modular, pipeline RAG versionado | Revisión de código y documentación |
| Idioma | Español integral en interfaz, prompts y respuestas del LLM | Verificación lingüística |
| Confidencialidad | Protección de datos sensibles de clientes y casos; embeddings con mismo nivel de cifrado que documentos originales | Cumplimiento de normativa de protección de datos |
| Escalabilidad | Soporte para 10.000+ documentos sin degradación; Vector DB escalable | Pruebas de escalabilidad |
| Precisión RAG | Precision@5 > 85% y alucinación < 5%, toda respuesta con cita verificable o mensaje controlado | Evaluación con set de 50 preguntas reales |
| Trazabilidad | Cada respuesta RAG con fuente: archivo, página, score y fragmento resaltado | Auditoría de trazabilidad RAG |

---

### CLÁUSULA DÉCIMA PRIMERA: MODIFICACIONES Y CONTROL DE CAMBIOS

Cualquier modificación al alcance, funcionalidades o condiciones del presente contrato deberá ser solicitada por escrito y aprobada por ambas partes mediante una **adenda al contrato**.

---

### CLÁUSULA DÉCIMA SEGUNDA: RESOLUCIÓN DEL CONTRATO

#### 12.1. Resolución por mutuo acuerdo

LAS PARTES podrán resolver el presente contrato en cualquier momento por mutuo acuerdo, formalizado por escrito.

#### 12.2. Resolución unilateral por incumplimiento

Cualquiera de LAS PARTES podrá resolver el contrato en caso de incumplimiento grave, previa notificación escrita con 30 días de anticipación, otorgando un plazo de 15 días para subsanar.

---

### CLÁUSULA DÉCIMA TERCERA: FUERZA MAYOR Y CASO FORTUITO

Ninguna de LAS PARTES será responsable por el incumplimiento de sus compromisos cuando dicho incumplimiento sea consecuencia de fuerza mayor o caso fortuito conforme a la legislación boliviana.

---

### CLÁUSULA DÉCIMA CUARTA: SOLUCIÓN DE CONTROVERSIAS

LAS PARTES se comprometen a resolver de buena fe cualquier controversia mediante negociación directa. De no llegar a un acuerdo en 30 días, someterán la controversia a **conciliación** ante el Centro de Conciliación y Arbitraje de la Cámara de Comercio de [Ciudad].

---

### CLÁUSULA DÉCIMA QUINTA: RESPONSABILIDAD SOLIDARIA

Los miembros del EQUIPO DESARROLLADOR actúan de manera solidaria y mancomunada frente a EL BUFFET, por lo que cada uno de ellos responde individualmente por la totalidad de los compromisos asumidos.

---

### CLÁUSULA DÉCIMA SEXTA: DISPOSICIONES FINALES

1. El presente contrato reemplaza cualquier acuerdo previa, verbal o escrita, entre LAS PARTES respecto al objeto del mismo.
2. La nulidad de una o más cláusulas no afectará la validez de las restantes.
3. El presente contrato se firma en dos ejemplares de igual tenor, uno para cada parte.

---

### FIRMAS

En señal de conformidad con todas y cada una de las cláusulas precedentes, LAS PARTES firman el presente contrato en la ciudad de [Ciudad], a los ____ días del mes de ______________ de 202__.

<br><br>

| Por EL BUFFET | Por EL EQUIPO DESARROLLADOR |
|------------|------------------------------|
| **Buffet de Abogados de Asistencia Familiar** | |
| | |
| ________________________ | **Nahomi Humerez** |
| Nombre: ________________ | C.I.: ________________ |
| C.I.: ________________ | Firma: ________________ |
| Cargo: Representante Legal | |
| | |
| | **Mariana del Arroyo** |
| | C.I.: ________________ |
| | Firma: ________________ |
| | |
| | **Santiago Acha** |
| | C.I.: ________________ |
| | Firma: ________________ |
| | |
| | **Jorge Saenz** |
| | C.I.: ________________ |
| | Firma: ________________ |

---

### ANEXO I: TÉRMINOS DE REFERENCIA

El documento **"TDR_Sistema_Documental.md"** en su versión vigente al momento de la firma del presente contrato forma parte integrante del mismo como Anexo I.

---

