# TÉRMINOS DE REFERENCIA (TDR)

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG PARA EL BUFFET DE ABOGADOS DE ASISTENCIA FAMILIAR

---

## 1. INFORMACIÓN GENERAL

| Campo | Descripción |
|-------|-------------|
| **Nombre del Proyecto** | Desarrollo e implementación de Sistema de Gestión de Conocimiento (KM) basado en RAG para el Buffet de Abogados de Asistencia Familiar |
| **Institución** | Buffet de Asistencia Familiar |
| **Área** | Derecho de Familia — Asistencia Familiar, Patria Potestad, Violencia Doméstica |
| **Fecha de Elaboración** | 25/08/2026 |
| **Versión** | 1.0 |
| **Metodología de Desarrollo** | Ágil (Scrum) |

---

## 2. ANTECEDENTES

El Buffet de Asistencia Familiar brinda servicios legales gratuitos a familias en situación de vulnerabilidad, incluyendo casos de asistencia familiar, patria potestad y violencia doméstica. Actualmente, la gestión documental se realiza de forma manual y desorganizada, generando problemas críticos:

- **Pérdida de tiempo:** Los abogados dedican 4-6 horas semanales buscando documentos
- **Pérdida de documentos:** Se han perdido certificados forenses y convenios en audiencias judiciales
- **Confusión de versiones:** Se han presentado demandas obsoletas ante jueces
- **Riesgo de seguridad:** Contraseñas débiles ("123456") y documentos sensibles sin cifrar
- **Dependencia de personas clave:** Un solo asistente conoce la ubicación de todos los archivos
- **Compartición insegura:** Documentos de víctimas se envían por WhatsApp y correo sin protección

---

## 3. PROBLEMA A RESOLVER

**Pregunta de Investigación:**
¿Cómo sistematizar los archivos y documentos legales oficiales para abogados de ley familiar con ayuda de tecnología?

**Objetivo General:**
Desarrollar un Sistema de Gestión de Conocimiento (KM) web basado en RAG que permita sistematizar los archivos y documentos legales oficiales para abogados de ley familiar con ayuda de tecnología.

---

## 4. OBJETIVOS ESPECÍFICOS

| Código | Objetivo Específico |
|--------|---------------------|
| OE1 | Implementar motor de búsqueda semántica con RAG que tolere errores y sinónimos legales |
| OE2 | Desarrollar clasificación y organización automática por caso sin etiquetado manual |
| OE3 | Implementar alertas proactivas e inteligentes de vencimientos y audiencias |
| OE4 | Garantizar plataforma web segura, móvil y con control de acceso por roles y a nivel de chunk |
| OE5 | Implementar control de versiones y desduplicación |
| OE6 | Desarrollar sistema de compartición segura con enlaces temporales |

---

## 5. ALCANCES

### 5.1. Alcance del Proyecto

El sistema cubrirá las siguientes áreas:

| # | Alcance | Descripción |
|---|---------|-------------|
| A1 | Gestión de casos | Creación, consulta, edición y cierre de casos de derecho familiar |
| A2 | Ingesta de documentos | Carga, clasificación automática y indexación semántica de documentos legales |
| A3 | Búsqueda inteligente | Búsqueda semántica con RAG, tolerant a errores y sinónimos legales |
| A4 | Consulta conversacional | Chat interactivo para preguntas en lenguaje natural sobre los casos |
| A5 | Alertas proactivas | Notificaciones automáticas de vencimientos, audiencias y plazos legales |
| A6 | Compartición segura | Enlaces temporales con permisos para compartir documentos con terceros |
| A7 | Control de versiones | Historial completo de versiones por documento con posibilidad de comparación |
| A8 | Seguridad y auditoría | Cifrado, control de acceso por roles y registro de auditoría |
| A9 | Interfaz web responsive | Plataforma accesible desde computadora, tablet y celular |

### 5.2. Alcance por Tipo de Caso

| Tipo de Caso | Cobertura |
|--------------|-----------|
| Asistencia Familiar (alimentos) | Completa |
| Patria Potestad (guarda, custodia) | Completa |
| Violencia Doméstica y Protección a Víctimas | Completa + nivel de seguridad reforzado |
| Otros (divorcio, divorcio por mutuo acuerdo, violencia intrafamiliar) | Parcial — registro y búsqueda básica |

### 5.3. Alcance por Usuario

| Usuario | Funciones Disponibles |
|---------|----------------------|
| Abogado | CRUD de casos, carga de documentos, búsqueda, alertas, compartición, chat |
| Asistente | Carga de documentos, búsqueda, consulta de casos asignados |
| Administrador | Gestión de usuarios, roles, auditoría, configuración del sistema |

---

## 6. LÍMITES DEL PROYECTO

### 6.1. Lo que NO incluye este proyecto

| # | Límite | Justificación |
|---|--------|---------------|
| L1 | No se reemplaza el sistema físico actual | El sistema digital es complementario, no elimina carpetas físicas existentes |
| L2 | No se integra con sistemas judiciales (PLEXIS, SISJU) | Requiere acuerdos interinstitucionales fuera del alcance |
| L3 | No se genera documentos legales automáticamente | El sistema almacena y busca, no redacta demandas ni escritos |
| L4 | No se incluye módulo de facturación | El buffet es de asistencia gratuita |
| L5 | No se proporciona abogado virtual ni asesoría legal automatizada | El sistema gestiona conocimiento, no reemplaza la咨询a legal |
| L6 | No se soportan idiomas distintos al español | El buffet opera exclusivamente en Bolivia |
| L7 | No se incluye app móvil nativa | Se desarrolla como web responsive; app nativa sería una fase futura |
| L8 | No se integra con WhatsApp ni redes sociales | La compartición se hace exclusivamente por enlaces temporales seguros |
| L9 | No se incluye migración masiva de documentos existentes | Cada abogado migra sus documentos progresivamente al usar el sistema |
| L10 | No se ofrece soporte 24/7 con personal dedicado | El sistema tiene alta disponibilidad pero sin help desk presencial |

### 6.2. Restricciones Técnicas

| # | Restricción | Descripción |
|---|-------------|-------------|
| R1 | Presupuesto limitado | Se utilizarán tecnologías de código abierto y servicios cloud con tier gratuito |
| R2 | Infraestructura existente | El buffet solo dispone de laptops y conexión a internet básica |
| R3 | Personal no técnico | La interfaz debe ser usable sin capacitación formal (máximo 1 día) |
| R4 | Conectividad intermitente | El sistema debe funcionar con conexión lenta y permitir búsqueda offline básica |

### 6.3. Supuestos

| # | Supuesto | Validación |
|---|----------|------------|
| S1 | Los abogados contarán con dispositivo con navegador web | Entrevistas: todos tienen laptop o celular con internet |
| S2 | El buffet proporcionará espacio en cloud para almacenamiento | A confirmar con dirección del buffet |
| S3 | Los usuarios adoptarán el sistema si es lo suficientemente simple | Validado en entrevistas:意愿 de cambio si ahorra tiempo |
| S4 | El modelo RAG funcionará con documentos legales en español boliviano | Requiere fine-tuning con vocabulario jurídico local |

---

## 7. REQUERIMIENTOS FUNCIONALES

### 7.1. ÉPICA: AUTENTICACIÓN Y SEGURIDAD

#### RF-01: Inicio de sesión seguro
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-01 |
| **Nombre** | Inicio de sesión seguro |
| **Descripción** | El sistema permitirá a los usuarios autenticarse con correo electrónico y contraseña segura |
| **Prioridad** | Alta |
| **Objetivo** | OE4 |
| **Criterios de Aceptación** | |
| CA-01 | La contraseña debe tener mínimo 12 caracteres con mayúsculas, minúsculas, números y símbolos |
| CA-02 | Se bloquea la cuenta tras 3 intentos fallidos |
| CA-03 | La sesión expira tras 30 minutos de inactividad |
| CA-04 | Se utiliza cifrado TLS 1.3 en todo momento |

---

#### RF-02: Control de acceso por roles
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-02 |
| **Nombre** | Control de acceso por roles |
| **Descripción** | El sistema implementará roles (administrador, abogado, asistente) con permisos diferenciados |
| **Prioridad** | Alta |
| **Objetivo** | OE4 |
| **Criterios de Aceptación** | |
| CA-01 | Cada rol tiene permisos predefinidos |
| CA-02 | Solo el administrador puede asignar o cambiar roles |
| CA-03 | Un asistente no puede eliminar documentos |
| CA-04 | Un abogado solo ve sus propios casos o los que le son asignados |

---

#### RF-03: Cifrado de datos sensibles
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-03 |
| **Nombre** | Cifrado de datos sensibles |
| **Descripción** | El sistema cifrará con AES-256 todos los datos en reposo, especialmente direcciones de víctimas y documentos de menores |
| **Prioridad** | Alta |
| **Objetivo** | OE4 |
| **Criterios de Aceptación** | |
| CA-01 | Todos los datos en reposo están cifrados con AES-256 |
| CA-02 | Las direcciones de víctimas tienen cifrado adicional a nivel de campo |
| CA-03 | El descifrado solo ocurre durante una sesión autenticada |
| CA-04 | No se almacenan claves en texto plano |

---

#### RF-04: Registro de auditoría
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-04 |
| **Nombre** | Registro de auditoría |
| **Descripción** | El sistema registrará quién accedió a cada documento, cuándo y qué acción realizó |
| **Prioridad** | Alta |
| **Objetivo** | OE4 |
| **Criterios de Aceptación** | |
| CA-01 | Se registra: usuario, fecha/hora, acción (ver, editar, descargar, compartir) |
| CA-02 | Se registra la IP de origen |
| CA-03 | Los logs no pueden ser editados ni eliminados |
| CA-04 | Se puede generar reporte de auditoría por rango de fechas |

---

### 7.2. ÉPICA: GESTIÓN DE CASOS

#### RF-05: Crear un caso nuevo
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-05 |
| **Nombre** | Crear un caso nuevo |
| **Descripción** | El sistema permitirá registrar un caso nuevo con nombre del cliente, tipo de caso y datos básicos |
| **Prioridad** | Alta |
| **Objetivo** | OE2 |
| **Criterios de Aceptación** | |
| CA-01 | Se obliga ingresar nombre del cliente y tipo de caso |
| CA-02 | El sistema asigna un ID único al caso |
| CA-03 | Se permite seleccionar tipo: Asistencia Familiar, Patria Potestad, Violencia Doméstica, Otro |
| CA-04 | El caso queda visible en el panel principal inmediatamente |

---

#### RF-06: Listar casos activos
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-06 |
| **Nombre** | Listar casos activos |
| **Descripción** | El sistema mostrará una lista de todos los casos del abogado con estado, próxima audiencia y cantidad de documentos |
| **Prioridad** | Alta |
| **Objetivo** | OE2 |
| **Criterios de Aceptación** | |
| CA-01 | Se muestra nombre del cliente, tipo de caso, estado y próxima audiencia |
| CA-02 | Se puede filtrar por tipo, estado o nombre |
| CA-03 | Se ordena por fecha de próxima audiencia (más próxima primero) |
| CA-04 | Se muestra cantidad total de documentos por caso |

---

#### RF-07: Cambiar estado de un caso
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-07 |
| **Nombre** | Cambiar estado de un caso |
| **Descripción** | El sistema permitirá marcar un caso como "activo", "en audiencia" o "cerrado" |
| **Prioridad** | Media |
| **Objetivo** | OE2 |
| **Criterios de Aceptación** | |
| CA-01 | Se permite cambiar estado con un click |
| CA-02 | El historial de cambios queda registrado |
| CA-03 | Los casos cerrados se archivan pero siguen siendo consultables |
| CA-04 | Se puede reabrir un caso cerrado si es necesario |

---

### 7.3. ÉPICA: CARGA Y CLASIFICACIÓN DE DOCUMENTOS

#### RF-08: Subir documento a un caso
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-08 |
| **Nombre** | Subir documento a un caso |
| **Descripción** | El sistema permitirá cargar archivos (PDF, imagen, Word) vinculados a un caso específico |
| **Prioridad** | Alta |
| **Objetivo** | OE2 |
| **Criterios de Aceptación** | |
| CA-01 | Se aceptan formatos: PDF, JPG, PNG, DOCX |
| CA-02 | Tamaño máximo: 50MB por archivo |
| CA-03 | Se muestra barra de progreso durante la carga |
| CA-04 | Se confirma con mensaje de éxito o error claro |

---

#### RF-09: Clasificación automática por contenido
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-09 |
| **Nombre** | Clasificación automática por contenido |
| **Descripción** | El sistema leerá el contenido del documento y lo clasificará automáticamente en categorías legales sin intervención manual |
| **Prioridad** | Crítica |
| **Objetivo** | OE2 |
| **Criterios de Aceptación** | |
| CA-01 | El sistema detecta tipo de documento: demanda, contestación, informe psicológico, certificado médico, orden de protección, comprobante de pago, otro |
| CA-02 | La clasificación se basa en el contenido, no en el nombre del archivo |
| CA-03 | Se muestra la clasificación sugerida al usuario para confirmar o corregir |
| CA-04 | Si el archivo se llama "scan001.jpg", el sistema asigna un nombre descriptivo |

---

#### RF-10: Detección de duplicados
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-10 |
| **Nombre** | Detección de duplicados |
| **Descripción** | El sistema detectará si ya existe un documento similar antes de guardarlo |
| **Prioridad** | Alta |
| **Objetivo** | OE5 |
| **Criterios de Aceptación** | |
| CA-01 | Antes de guardar, el sistema compara embeddings con documentos existentes |
| CA-02 | Si hay similitud > 85%, muestra alerta de posible duplicado |
| CA-03 | El usuario decide si es duplicado o versión nueva |
| CA-04 | Si es duplicado, se cancela la carga |

---

#### RF-11: Control de versiones
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-11 |
| **Nombre** | Control de versiones |
| **Descripción** | El sistema mantendrá un historial completo de versiones de cada documento |
| **Prioridad** | Alta |
| **Objetivo** | OE5 |
| **Criterios de Aceptación** | |
| CA-01 | Se muestra lista cronológica de versiones (v1, v2, v3...) |
| CA-02 | Cada versión muestra fecha y quién la modificó |
| CA-03 | Se puede descargar cualquier versión anterior |
| CA-04 | Se puede comparar dos versiones lado a lado (diff) |

---

### 7.4. ÉPICA: BÚSQUEDA INTELIGENTE

#### RF-12: Búsqueda semántica
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-12 |
| **Nombre** | Búsqueda semántica |
| **Descripción** | El sistema permitirá buscar documentos mediante consultas que entiendan el significado, tolerando errores de escritura y sinónimos legales |
| **Prioridad** | Crítica |
| **Objetivo** | OE1 |
| **Criterios de Aceptación** | |
| CA-01 | La búsqueda es semántica (entiende significado, no solo palabras exactas) |
| CA-02 | Tolera errores de escritura ("conbenio" = "convenio") |
| CA-03 | Tolera sinónimos legales ("contestación" = "respuesta a demanda") |
| CA-04 | Muestra resultados en menos de 3 segundos |
| CA-05 | Precisión mínima del 85% en resultados relevantes |

---

#### RF-13: Consulta en lenguaje natural
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-13 |
| **Nombre** | Consulta en lenguaje natural |
| **Descripción** | El sistema permitirá realizar preguntas en lenguaje natural y responder con texto claro citando las fuentes |
| **Prioridad** | Crítica |
| **Objetivo** | OE1 |
| **Criterios de Aceptación** | |
| CA-01 | El sistema procesa preguntas en español coloquial |
| CA-02 | La respuesta incluye la lista de documentos o información solicitada |
| CA-03 | Se cita la fuente de cada respuesta (nombre del documento, fecha, caso) |
| CA-04 | El tiempo de respuesta es menor a 3 segundos |
| CA-05 | Se puede continuar la conversación ("¿y qué más de Mamani?") |

---

#### RF-14: Chat conversacional
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-14 |
| **Nombre** | Chat conversacional |
| **Descripción** | El sistema incluirá una interfaz de chat donde el usuario pueda interactuar de forma conversacional con el sistema |
| **Prioridad** | Alta |
| **Objetivo** | OE1 |
| **Criterios de Aceptación** | |
| CA-01 | El chat está visible en todas las pantallas |
| CA-02 | Acepta preguntas en español coloquial |
| CA-03 | Responde con texto claro y fuentes citadas |
| CA-04 | Mantiene contexto de la conversación |

---

### 7.5. ÉPICA: ALERTAS PROACTIVAS

#### RF-15: Alertas de audiencia próxima
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-15 |
| **Nombre** | Alertas de audiencia próxima |
| **Descripción** | El sistema enviará notificaciones automáticas antes de cada audiencia programada |
| **Prioridad** | Alta |
| **Objetivo** | OE3 |
| **Criterios de Aceptación** | |
| CA-01 | Se envía alerta 48 horas antes (preparación) |
| CA-02 | Se envía alerta 24 horas antes (documentos faltantes) |
| CA-03 | Se envía alerta 2 horas antes (repaso final) |
| CA-04 | La alerta incluye: fecha, juzgado, caso, documentos requeridos |

---

#### RF-16: Alertas de vencimiento de medidas
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-16 |
| **Nombre** | Alertas de vencimiento de medidas |
| **Descripción** | El sistema detectará automáticamente vencimientos de órdenes de protección y enviará alertas proactivas |
| **Prioridad** | Crítica |
| **Objetivo** | OE3 |
| **Criterios de Aceptación** | |
| CA-01 | Se detecta automáticamente la fecha de vencimiento del documento |
| CA-02 | Se envía alerta 7 días antes del vencimiento |
| CA-03 | Se envía alerta urgente 48 horas antes |
| CA-04 | La alerta incluye nombre de la víctima, número de caso y acción sugerida |

---

#### RF-17: Resumen diario de pendientes
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-17 |
| **Nombre** | Resumen diario de pendientes |
| **Descripción** | El sistema enviará cada mañana un resumen de actividades pendientes del día |
| **Prioridad** | Media |
| **Objetivo** | OE3 |
| **Criterios de Aceptación** | |
| CA-01 | Se muestra a las 8:00 AM automáticamente |
| CA-02 | Incluye: audiencias del día, documentos faltantes, alertas activas |
| CA-03 | Se puede configurar hora de envío |
| CA-04 | Se envía por notificación in-app y email |

---

### 7.6. ÉPICA: COMPARTIR SEGURO

#### RF-18: Generar enlace temporal
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-18 |
| **Nombre** | Generar enlace temporal |
| **Descripción** | El sistema generará enlaces temporales con JWT para compartir documentos de forma segura |
| **Prioridad** | Alta |
| **Objetivo** | OE6 |
| **Criterios de Aceptación** | |
| CA-01 | Se genera enlace con JWT firmado |
| CA-02 | Se puede definir duración: 1h, 24h, 72h |
| CA-03 | El enlace es de un solo uso por destinatario |
| CA-04 | Se registra quién accedió, cuándo y desde dónde |

---

#### RF-19: Compartir solo lectura
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-19 |
| **Nombre** | Compartir solo lectura |
| **Descripción** | El sistema permitirá compartir documentos en modo solo lectura sin posibilidad de descarga |
| **Prioridad** | Alta |
| **Objetivo** | OE6 |
| **Criterios de Aceptación** | |
| CA-01 | Se puede configurar permiso "solo lectura" |
| CA-02 | No se permite botón de descarga cuando está en este modo |
| CA-03 | Se agrega marca de agua con nombre del destinatario y fecha |
| CA-04 | Se deshabilita captura de pantalla (best effort) |

---

#### RF-20: Revocar enlace compartido
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-20 |
| **Nombre** | Revocar enlace compartido |
| **Descripción** | El sistema permitirá cancelar un enlace compartido antes de que expire |
| **Prioridad** | Alta |
| **Objetivo** | OE6 |
| **Criterios de Aceptación** | |
| CA-01 | Se puede revocar desde la sección de compartidos |
| CA-02 | El enlace deja de funcionar inmediatamente |
| CA-03 | Se notifica al destinatario que el enlace fue revocado |
| CA-04 | Se registra la revocación en el log de auditoría |

---

### 7.7. ÉPICA: GESTIÓN DE AUDIENCIAS

#### RF-21: Registrar audiencia
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-21 |
| **Nombre** | Registrar audiencia |
| **Descripción** | El sistema permitirá registrar fecha, juzgado y tipo de audiencia asociada a un caso |
| **Prioridad** | Alta |
| **Objetivo** | OE3 |
| **Criterios de Aceptación** | |
| CA-01 | Se asocia obligatoriamente a un caso existente |
| CA-02 | Se registra: fecha, hora, juzgado, tipo de audiencia |
| CA-03 | El sistema genera automáticamente el checklist de documentos requeridos |
| CA-04 | La audiencia aparece en el calendario del sistema |

---

#### RF-22: Verificar documentos faltantes
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-22 |
| **Nombre** | Verificar documentos faltantes |
| **Descripción** | El sistema mostrará qué documentos tiene y cuáles faltan para una audiencia específica |
| **Prioridad** | Alta |
| **Objetivo** | OE3, OE2 |
| **Criterios de Aceptación** | |
| CA-01 | Se muestra checklist dividido en "tenidos" y "faltantes" |
| CA-02 | Los documentos faltantes se resaltan en rojo |
| CA-03 | Se puede marcar un documento como "en trámite" |
| CA-04 | Se permite agregar documentos requeridos manualmente |

---

#### RF-23: Generar paquete de documentos
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-23 |
| **Nombre** | Generar paquete de documentos |
| **Descripción** | El sistema generará un PDF consolidado con todos los documentos de una audiencia listos para imprimir |
| **Prioridad** | Media |
| **Objetivo** | OE3 |
| **Criterios de Aceptación** | |
| CA-01 | Se genera un PDF consolidado con todos los documentos del caso |
| CA-02 | Se ordenan según el checklist de la audiencia |
| CA-03 | Incluye portada con datos del caso |
| CA-04 | El peso total del PDF se muestra antes de descargar |

---

### 7.8. ÉPICA: INTERFAZ Y USABILIDAD

#### RF-24: Interfaz web responsive
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-24 |
| **Nombre** | Interfaz web responsive |
| **Descripción** | El sistema será una aplicación web responsive que funcione en computadoras, tablets y celulares |
| **Prioridad** | Alta |
| **Objetivo** | OE4 |
| **Criterios de Aceptación** | |
| CA-01 | La interfaz se adapta a pantalla de celular, tablet y escritorio |
| CA-02 | Las funciones principales son accesibles desde celular |
| CA-03 | Menos de 5 cliccs para llegar a cualquier función principal |
| CA-04 | Los botones tienen labels descriptivos |

---

#### RF-25: Modo caso urgente
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-25 |
| **Nombre** | Modo caso urgente |
| **Descripción** | El sistema incluirá un botón de "caso urgente" que permita crear el caso y subir documentos en los mínimos campos posibles |
| **Prioridad** | Alta |
| **Objetivo** | OE2 |
| **Criterios de Aceptación** | |
| CA-01 | El botón "URGENTE" está visible en la pantalla principal |
| CA-02 | Crea un caso con mínimo de campos (nombre, tipo violencia) |
| CA-03 | Permite subir documentos inmediatamente después |
| CA-04 | No solicita información no esencial hasta después de la emergencia |

---

### 7.9. ÉPICA: NOTIFICACIONES

#### RF-26: Notificaciones in-app
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-26 |
| **Nombre** | Notificaciones in-app |
| **Descripción** | El sistema mostrará notificaciones dentro de la aplicación para alertas, audiencias y documentos compartidos |
| **Prioridad** | Media |
| **Objetivo** | OE3 |
| **Criterios de Aceptación** | |
| CA-01 | Campana de notificaciones en la barra superior |
| CA-02 | Se muestra contador de no leídas |
| CA-03 | Las notificaciones se agrupan por tipo |
| CA-04 | Se pueden marcar como leídas individual o masivamente |

---

#### RF-27: Notificación por email
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-27 |
| **Nombre** | Notificación por email |
| **Descripción** | El sistema enviará notificaciones por correo electrónico para alertas importantes y resúmenes |
| **Prioridad** | Media |
| **Objetivo** | OE3 |
| **Criterios de Aceptación** | |
| CA-01 | Se envía resumen semanal los lunes a las 8 AM |
| CA-02 | Incluye: casos activos, documentos subidos, audiencias atendidas, alertas pendientes |
| CA-03 | Se puede desactivar desde configuración |
| CA-04 | El email no incluye contenido sensible (solo resumen) |

---

### 7.10. ÉPICA: IMPRESIÓN Y EXPORTACIÓN

#### RF-28: Imprimir documento
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-28 |
| **Nombre** | Imprimir documento |
| **Descripción** | El sistema permitirá imprimir un documento directamente desde la vista del documento |
| **Prioridad** | Media |
| **Objetivo** | OE4 |
| **Criterios de Aceptación** | |
| CA-01 | Botón de imprimir visible en la vista del documento |
| CA-02 | Se abre diálogo de impresión del navegador |
| CA-03 | Se imprime en formato tamaño legal |
| CA-04 | Se incluye encabezado con datos del caso y fecha |

---

#### RF-29: Exportar caso completo
| Campo | Descripción |
|-------|-------------|
| **ID** | RF-29 |
| **Nombre** | Exportar caso completo |
| **Descripción** | El sistema permitirá exportar todos los documentos de un caso en un ZIP organizado por categorías |
| **Prioridad** | Baja |
| **Objetivo** | OE5 |
| **Criterios de Aceptación** | |
| CA-01 | Se genera ZIP con carpetas por tipo de documento |
| CA-02 | Incluye índice en formato texto con la lista de documentos |
| CA-03 | Los nombres de archivo son descriptivos |
| CA-04 | Se puede proteger el ZIP con contraseña |

---

## 8. REQUERIMIENTOS NO FUNCIONALES

### 8.1. Seguridad

#### RNF-01: Cifrado en tránsito
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-01 |
| **Nombre** | Cifrado en tránsito |
| **Descripción** | Toda comunicación entre el navegador y el servidor se realizará bajo cifrado TLS 1.3 |
| **Prioridad** | Crítica |
| **Criterio de Medición** | Verificar con herramienta SSL Labs que la calificación sea A+ |

---

#### RNF-02: Cifrado en reposo
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-02 |
| **Nombre** | Cifrado en reposo |
| **Descripción** | Todos los datos almacenados (base de datos, archivos, backups) estarán cifrados con AES-256 |
| **Prioridad** | Crítica |
| **Criterio de Medición** | Auditoría de cifrado en base de datos y sistema de archivos |

---

#### RNF-03: Bloqueo por intentos fallidos
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-03 |
| **Nombre** | Bloqueo por intentos fallidos |
| **Descripción** | La cuenta se bloqueará tras 3 intentos fallidos de inicio de sesión |
| **Prioridad** | Alta |
| **Criterio de Medición** | Prueba de 4 intentos consecutivos con credencial incorrecta |

---

#### RNF-04: Sesión con expiración
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-04 |
| **Nombre** | Sesión con expiración |
| **Descripción** | Las sesiones expirarán tras 30 minutos de inactividad |
| **Prioridad** | Alta |
| **Criterio de Medición** | Dejar sesión abierta 31 minutos sin interacción y verificar expiración |

---

#### RNF-05: Control de acceso por roles (RBAC)
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-05 |
| **Nombre** | Control de acceso por roles |
| **Descripción** | El sistema implementará control de acceso basado en roles (RBAC) con permisos a nivel de documento y chunk |
| **Prioridad** | Alta |
| **Criterio de Medición** | Verificar que un asistente no pueda eliminar documentos y que un abogado solo vea sus casos |

---

#### RNF-06: Auditoría completa
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-06 |
| **Nombre** | Auditoría completa |
| **Descripción** | Todas las acciones sobre documentos quedarán registradas en logs inmutables |
| **Prioridad** | Alta |
| **Criterio de Medición** | Verificar que los logs no pueden ser editados ni eliminados por ningún usuario |

---

### 8.2. Rendimiento

#### RNF-07: Tiempo de respuesta en búsquedas
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-07 |
| **Nombre** | Tiempo de respuesta en búsquedas |
| **Descripción** | Las búsquedas semánticas deberán retornar resultados en menos de 3 segundos |
| **Prioridad** | Alta |
| **Criterio de Medición** | Prueba de carga con 1000 documentos indexados y 10 búsquedas concurrentes |

---

#### RNF-08: Tiempo de respuesta general
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-08 |
| **Nombre** | Tiempo de respuesta general |
| **Descripción** | Cualquier operación del sistema (crear caso, subir documento, cambiar estado) deberá completarse en menos de 2 segundos |
| **Prioridad** | Alta |
| **Criterio de Medición** | Monitoreo de tiempos de respuesta en producción |

---

#### RNF-09: Disponibilidad del sistema
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-09 |
| **Nombre** | Disponibilidad del sistema |
| **Descripción** | El sistema deberá estar disponible el 99.5% del tiempo (máximo ~4.4 horas de downtime al mes) |
| **Prioridad** | Alta |
| **Criterio de Medición** | Monitoreo de uptime con herramienta de alertas |

---

#### RNF-10: Soporte de carga
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-10 |
| **Nombre** | Soporte de carga |
| **Descripción** | El sistema deberá soportar al menos 10 usuarios concurrentes sin degradación de rendimiento |
| **Prioridad** | Media |
| **Criterio de Medición** | Prueba de estrés con 15 usuarios simultáneos realizando operaciones mixtas |

---

### 8.3. Usabilidad

#### RNF-11: Facilidad de uso
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-11 |
| **Nombre** | Facilidad de uso |
| **Descripción** | Un usuario no técnico deberá poder completar las tareas principales (crear caso, subir documento, buscar) sin ayuda en menos de 5 minutos |
| **Prioridad** | Alta |
| **Criterio de Medición** | Prueba de usabilidad con 3 usuarios sin experiencia previa |

---

#### RNF-12: Interfaz en español
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-12 |
| **Nombre** | Interfaz en español |
| **Descripción** | Toda la interfaz del sistema estará disponible en español (Bolivia) |
| **Prioridad** | Alta |
| **Criterio de Medición** | Revisión visual de todas las pantallas |

---

#### RNF-13: Consistencia visual
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-13 |
| **Nombre** | Consistencia visual |
| **Descripción** | El diseño será consistente en todas las pantallas (colores, tipografía, espaciado, botones) |
| **Prioridad** | Media |
| **Criterio de Medición** | Guía de estilos aplicada en el 100% de las pantallas |

---

### 8.4. Portabilidad

#### RNF-14: Acceso multi-dispositivo
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-14 |
| **Nombre** | Acceso multi-dispositivo |
| **Descripción** | El sistema será accesible desde cualquier dispositivo con navegador web (desktop, tablet, móvil) |
| **Prioridad** | Alta |
| **Criterio de Medición** | Prueba en Chrome, Firefox, Safari (desktop y mobile) |

---

#### RNF-15: Sin instalación requerida
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-15 |
| **Nombre** | Sin instalación requerida |
| **Descripción** | El sistema será una aplicación web que no requiera instalación de software adicional |
| **Prioridad** | Media |
| **Criterio de Medición** | Verificar acceso desde navegador sin plugins |

---

### 8.5. Escalabilidad

#### RNF-16: Crecimiento de documentos
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-16 |
| **Nombre** | Crecimiento de documentos |
| **Descripción** | El sistema deberá soportar el crecimiento de al menos 100 documentos nuevos por mes sin degradación |
| **Prioridad** | Media |
| **Criterio de Medición** | Prueba con base de datos de 5000 documentos |

---

#### RNF-17: Crecimiento de usuarios
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-17 |
| **Nombre** | Crecimiento de usuarios |
| **Descripción** | El sistema deberá escalar fácilmente de 5 a 20 usuarios sin cambios de arquitectura |
| **Prioridad** | Baja |
| **Criterio de Medición** | Configuración documentada para agregar usuarios |

---

### 8.6. Mantenibilidad

#### RNF-18: Documentación técnica
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-18 |
| **Nombre** | Documentación técnica |
| **Descripción** | El sistema tendrá documentación técnica completa incluyendo: arquitectura, API, despliegue y troubleshooting |
| **Prioridad** | Media |
| **Criterio de Medición** | Documentación revisada y aprobada |

---

#### RNF-19: Código documentado
| Campo | Descripción |
|-------|-------------|
| **ID** | RNF-19 |
| **Nombre** | Código documentado |
| **Descripción** | El código fuente tendrá comentarios en funciones complejas y README actualizado |
| **Prioridad** | Baja |
| **Criterio de Medición** | Revisión de código con cobertura de documentación > 70% |

---

## 9. CONSOLIDACIÓN DE REQUERIMIENTOS

### 9.1. Resumen de Requerimientos Funcionales

| Épica | Cantidad RF | Prioridad Crítica | Prioridad Alta | Prioridad Media | Prioridad Baja |
|-------|-------------|-------------------|----------------|-----------------|----------------|
| Autenticación y Seguridad | 4 | 1 | 3 | 0 | 0 |
| Gestión de Casos | 3 | 0 | 2 | 1 | 0 |
| Carga y Clasificación | 4 | 1 | 3 | 0 | 0 |
| Búsqueda Inteligente | 3 | 2 | 1 | 0 | 0 |
| Alertas Proactivas | 3 | 1 | 1 | 1 | 0 |
| Compartir Seguro | 3 | 0 | 3 | 0 | 0 |
| Gestión de Audiencias | 3 | 0 | 2 | 1 | 0 |
| Interfaz y Usabilidad | 2 | 0 | 2 | 0 | 0 |
| Notificaciones | 2 | 0 | 0 | 2 | 0 |
| Impresión y Exportación | 2 | 0 | 0 | 1 | 1 |
| **TOTAL** | **29** | **5** | **17** | **6** | **1** |

### 9.2. Resumen de Requerimientos No Funcionales

| Categoría | Cantidad RNF | Prioridad Crítica | Prioridad Alta | Prioridad Media | Prioridad Baja |
|-----------|--------------|-------------------|----------------|-----------------|----------------|
| Seguridad | 6 | 2 | 4 | 0 | 0 |
| Rendimiento | 4 | 0 | 3 | 1 | 0 |
| Usabilidad | 3 | 0 | 2 | 1 | 0 |
| Portabilidad | 2 | 0 | 1 | 1 | 0 |
| Escalabilidad | 2 | 0 | 0 | 1 | 1 |
| Mantenibilidad | 2 | 0 | 0 | 1 | 1 |
| **TOTAL** | **19** | **2** | **10** | **5** | **2** |

---

## 10. FUENTES DE INFORMACIÓN

| Fuente | Tipo | Fecha |
|--------|------|-------|
| Entrevista_Abogado_01.md | Entrevista semiestructurada | 22/08/2026 |
| Entrevista_Abogado_02.md | Entrevista semiestructurada | 22/08/2026 |
| Entrevista_Abogado_03.md | Entrevista semiestructurada | 23/08/2026 |
| Matriz_de_Coherencia.md | Documento de alineación | 25/08/2026 |
| Diagrama Ishikawa | Análisis de causa raíz | 25/08/2026 |
| Ciclo_de_Vida_del_Proyecto.md | Plan de proyecto | 25/08/2026 |
| Modelado_Procesos_BPWin.md | Modelado de procesos | 25/08/2026 |
| User_Stories.md | Historias de usuario | 25/08/2026 |

---

*Documento generado el 25/08/2026 — Proyecto de Gestión de Proyectos Informáticos*
