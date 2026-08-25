# CARTA DE ACEPTACIÓN DE TÉRMINOS DE REFERENCIA

## PROYECTO: SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG — BUFFET DE ABOGADOS DE ASISTENCIA FAMILIAR

---

**FECHA:** [dd/mm/aaaa]

**LUGAR:** [Ciudad], Estado Plurinacional de Bolivia

---

### DESTINATARIO

**Buffet de Abogados de Asistencia Familiar**  
Despacho Legal especializado en Derecho de Familia  
[Dirección], [Ciudad], Bolivia  
Correo: [correo@buffet-abogados.com]

**Atención:** ________________________ (Responsable del Proyecto)

---

### REMITENTES

| # | Nombre | C.I. N.° | Rol en el proyecto |
|---|--------|----------|---------------------|
| 1 | Nahomi Humerez | ________ | Coordinación General |
| 2 | Mariana del Arroyo | ________ | Análisis y Documentación |
| 3 | Santiago Acha | ________ | Desarrollo RAG / Backend |
| 4 | Jorge Saenz | ________ | Desarrollo Frontend / QA |

---

### ASUNTO: ACEPTACIÓN FORMAL DE TÉRMINOS DE REFERENCIA Y COMPROMISO DE EJECUCIÓN

---

Estimados miembros del Buffet de Abogados de Asistencia Familiar:

Por medio de la presente, quienes suscribimos, en nuestra calidad de Equipo de Desarrollo, manifestamos nuestra aceptación formal e incondicional de los Términos de Referencia (TDR) correspondientes al proyecto "Desarrollo de Sistema de Gestión de Conocimiento (KM) con RAG para el Buffet de Abogados de Asistencia Familiar", documento de referencia TDR_Sistema_Documental.md en su versión vigente, así como del Contrato de Prestación de Servicios de Desarrollo de Software anexo a esta carta.

---

### 1. DECLARACIONES DEL EQUIPO DESARROLLADOR

Mediante la presente carta, declaramos que:

1. Conocemos y comprendemos en su totalidad los alcances, límites, requerimientos funcionales y no funcionales, entregables, cronograma, condiciones técnicas y económicas establecidos en los TDR y en el Contrato.

2. Aceptamos todos los términos y condiciones establecidos en dichos documentos, incluyendo de manera expresa la Cláusula Primera del Contrato sobre el régimen legal aplicable y la no suspensión de pago.

3. Contamos con la capacidad técnica, los recursos humanos y las herramientas necesarias para ejecutar el proyecto en los plazos y con los estándares de calidad exigidos, conforme al siguiente stack tecnológico propuesto:

| Componente | Tecnología propuesta |
|------------|---------------------|
| Plataforma | Aplicación web SPA |
| Frontend | React con TypeScript |
| Backend | Node.js con Express (Python FastAPI para módulo RAG) |
| Base de datos relacional | PostgreSQL con extensión pgvector |
| Vector DB (RAG) | pgvector / Qdrant |
| Embeddings | OpenAI text-embedding-3-large / Cohere embed-multilingual-v3.0 / BGE-M3 |
| LLM | GPT-4o-mini / Claude 3.5 Sonnet / Llama 3.1 70B local |
| Framework RAG | LangChain / LlamaIndex |
| OCR | Tesseract.js + AWS Textract |
| Autenticación | JWT con roles y permisos |
| Almacenamiento | S3-compatible (MinIO o AWS S3) |
| Búsqueda tradicional | MeiliSearch |
| Hosting | VPS (DigitalOcean, Linode) |
| Control de versiones | Git (GitHub) |
| CI/CD | GitHub Actions |

4. Nos comprometemos a cumplir con la totalidad de los entregables, plazos, hitos de pago, obligaciones de confidencialidad, garantía, soporte post-lanzamiento y cesión de propiedad intelectual estipulados en el Contrato y los TDR.

---

### 2. ACEPTACIÓN DE LÍMITES Y ALCANCES

#### 2.1. Alcances aceptados (INCLUYE)

Reconocemos y aceptamos que el proyecto incluye los siguientes módulos y funcionalidades:

| Módulo | Confirmación |
|--------|-------------|
| Autenticación y seguridad (login, roles, cifrado, auditoría) | Sí |
| Gestión de casos (CRUD con datos del cliente y tipo de caso) | Sí |
| Gestión de documentos (subida, organización, metadatos, OCR) | Sí |
| Búsqueda avanzada y búsqueda semántica con RAG | Sí |
| Pipeline RAG: ingesta, chunking, embeddings, Vector DB | Sí |
| Clasificación automática y Chat KM con citas verificables | Sí |
| Control de versiones (historial, comparación, restauración) | Sí |
| Alertas inteligentes y notificaciones (vencimientos extraídos del contenido) | Sí |
| Generación de documentos estándar asistida por RAG | Sí |
| Compartir documentos (enlaces seguros con expiración) | Sí |
| Panel de administración (usuarios, roles, estadísticas, base vectorial, dashboard RAG) | Sí |
| Documentación (manual de usuario y manual técnico RAG) | Sí |
| Capacitación al personal del buffet (3 sesiones, taller de consultas en lenguaje natural) | Sí |
| Garantía post-despliegue (3 meses) | Sí |

---

#### 2.2. Límites aceptados (NO INCLUYE)

Reconocemos y aceptamos que **quedan expresamente excluidos** del alcance del proyecto:

| Exclusión | Confirmación |
|-----------|-------------|
| Diseño de logotipo ni identidad visual del buffet | Sí |
| Campañas de marketing digital o manejo de redes sociales | Sí |
| Integración con sistemas de gestión de expedientes judiciales externos | Sí |
| Desarrollo de aplicaciones móviles nativas (solo web responsiva) | Sí |
| Redacción de contenido legal para plantillas de documentos | Sí |
| Hosting, servidores, dominio y certificados SSL: **por cuenta del buffet** | Sí |
| Licencias de software de terceros requeridas para el desarrollo | Sí |

---

### 3. COMPROMISO DE EJECUCIÓN

El equipo se compromete a ejecutar el proyecto bajo las siguientes condiciones:

#### 3.1. Cronograma y vigencia aceptados

| Fase | Semana | Entregable |
|------|--------|------------|
| Planificación y diseño | 1–2 | E1: Plan de trabajo; E2: Wireframes y mockups |
| Módulos base | 3–4 | E3: Autenticación y usuarios; E4: Gestión de casos |
| Gestión documental | 5–6 | E5: Gestión y búsqueda de documentos |
| Funcionalidades avanzadas | 7–8 | E6: Control de versiones y alertas; E7: Generación y compartir documentos |
| Administración y QA | 9 | E8: Panel de administración; E9: QA y despliegue |
| Documentación y capacitación | 10 | E10: Documentación; E11: Capacitación |
| Garantía | 11–22 | Soporte post-lanzamiento (3 meses) |

**Vigencia del contrato y fin de la relación laboral.** Aceptamos que **el tiempo de trabajo se extiende hasta la entrega del producto completo** más un período de **3 (tres) meses de garantía** posteriores al despliegue en producción. Una vez vencido dicho período, el contrato se considerará plenamente cumplido y extinguido.

**Nuevas implementaciones post-garantía.** Entendemos y aceptamos que **cualquier implementación, modificación, nueva funcionalidad, mejora o cambio solicitado por el buffet después del vencimiento de los 3 meses de garantía será tratado como un nuevo proyecto y requerirá la negociación y firma de un nuevo contrato**.

#### 3.2. Metodología de trabajo aceptada

- Desarrollo bajo metodología ágil Scrum con sprints de 2 semanas
- Demo funcional al final de cada sprint
- Gestión de tareas en Trello/Jira
- Comunicación vía WhatsApp para coordinación rápida
- Reuniones formales vía Google Meet o Zoom
- Repositorio de código en GitHub privado con acceso compartido

#### 3.3. Forma de pago aceptada — Cuatro cuotas

Aceptamos la siguiente propuesta de pago en **cuatro (4) cuotas**, por un precio total de **Bs. 20,340** (IVA incluido), correspondiente a Bs. 18,000 de precio base más Bs. 2,340 de IVA (13%):

| Cuota | Plazo | Porcentaje | Monto con IVA (Bs.) | Hitos cubiertos |
|-------|-------|------------|----------------------|-----------------|
| 1.ª cuota | **Firma del contrato** | 20% | 4,068 | E1 (Plan de trabajo) |
| 2.ª cuota | **Aprobación de mockups** | 15% | 3,051 | E2 (Wireframes y mockups) |
| 3.ª cuota | **Módulos de autenticación, casos y documentos** | 45% | 9,153 | E3, E4, E5, E6, E7 |
| 4.ª cuota | **Despliegue y capacitación** | 20% | 4,068 | E8, E9, E10, E11 |

#### 3.4. Propiedad intelectual y confidencialidad

Aceptamos que:
- Todo el código fuente, documentación, diseños, prompts, índices vectoriales y materiales producidos serán propiedad exclusiva del Buffet de Abogados de Asistencia Familiar al completarse el pago total.
- Mantendremos confidencialidad sobre toda la información del buffet, datos de clientes y casos legales, incluyendo embeddings y base vectorial, por un mínimo de 3 años posteriores al contrato.

#### 3.5. Fin de la relación contractual y nuevas implementaciones

Aceptamos que:
- El presente contrato estará vigente únicamente hasta la entrega del producto completo más los **3 (tres) meses de garantía** posteriores al despliegue en producción.
- Vencido dicho período, el contrato se extingue en su totalidad.
- **Cualquier implementación posterior** será considerada un **nuevo proyecto independiente** que requerirá un **nuevo contrato**.

---

### 4. DECLARACIÓN DE NO CONFLICTO DE INTERESES

Declaramos bajo juramento que no tenemos ningún conflicto de intereses, presente o potencial, que pueda comprometer la ejecución imparcial, objetiva y profesional del proyecto.

---

### 5. ACEPTACIÓN DE LA CLÁUSULA DE NO SUSPENSIÓN DE PAGO

De manera expresa y en cumplimiento del régimen legal boliviano vigente al año 2026, **aceptamos la Cláusula Primera del Contrato** que establece que bajo ninguna circunstancia EL CLIENTE podrá suspender, retener, compensar ni condicionar los pagos correspondientes a hitos ya cumplidos y aprobados.

---

### 6. DATOS DE CONTACTO DEL EQUIPO DESARROLLADOR

| Canal | Detalle |
|-------|---------|
| Correo electrónico principal | [correo@equipo.com] |
| WhatsApp (coordinador) | [+591 X XXXXXXXX] |
| Repositorio de código | [URL de GitHub/GitLab] |

---

### 7. CIERRE

Reiteramos nuestro compromiso por contribuir a la mejora operativa del Buffet de Abogados de Asistencia Familiar mediante el desarrollo de un Sistema de Gestión de Conocimiento que optimice sus procesos, proteja la información de sus clientes y eleve la calidad de su servicio legal.

Manifestamos nuestra plena aceptación de los Términos de Referencia, del Contrato de Prestación de Servicios y de todas las condiciones, alcances, límites y obligaciones en ellos contenidos, y quedamos a disposición para coordinar la firma del contrato e iniciar formalmente las actividades del proyecto en la fecha que se acuerde.

---

Atentamente,

<br>

| | |
|---|---|
| **Nahomi Humerez** | **Mariana del Arroyo** |
| C.I.: ________________ | C.I.: ________________ |
| Firma: ________________ | Firma: ________________ |
| | |
| | |
| **Santiago Acha** | **Jorge Saenz** |
| C.I.: ________________ | C.I.: ________________ |
| Firma: ________________ | Firma: ________________ |

---

**ANEXOS A ESTA CARTA:**
1. TDR_Sistema_Documental.md — Términos de Referencia originales.
2. Contrato_Sistema_Documental.md — Contrato de Prestación de Servicios de Desarrollo de Software.

---

