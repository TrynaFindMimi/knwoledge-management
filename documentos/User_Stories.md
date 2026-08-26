# USER STORIES

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG PARA EL BUFFET DE ABOGADOS DE ASISTENCIA FAMILIAR

---

## 1. ÉPICA: AUTENTICACIÓN Y SEGURIDAD

### US-01: Inicio de sesión seguro
Como **abogado del buffet**,
quiero iniciar sesión con mi correo y contraseña segura,
para acceder al sistema y proteger los datos sensibles de mis clientes.

**Criterios de aceptación:**
- La contraseña debe tener mínimo 12 caracteres con mayúsculas, minúsculas, números y símbolos
- Se bloquea la cuenta tras 3 intentos fallidos
- La sesión expira tras 30 minutos de inactividad
- Se utiliza cifrado TLS 1.3 en todo momento

---

### US-02: Acceso por roles
Como **administrador del buffet**,
quiero asignar roles (abogado, asistente, administrador) a cada usuario,
para controlar quién puede ver, editar o eliminar documentos según su función.

**Criterios de aceptación:**
- Cada rol tiene permisos predefinidos
- Solo el administrador puede cambiar roles
- Un asistente no puede eliminar documentos
- Un abogado solo ve sus propios casos (o los que le son asignados)

---

### US-03: Cifrado de datos sensibles
Como **abogada de violencia doméstica**,
quiero que las direcciones de las víctimas estén cifradas con AES-256,
para que si roban mi laptop, nadie pueda leer esa información.

**Criterios de aceptación:**
- Todos los datos en reposo están cifrados con AES-256
- Las direcciones de víctimas tienen cifrado adicional a nivel de campo
- La descifrado solo ocurre durante una sesión autenticada
- No se almacenan claves en texto plano

---

### US-04: Registro de auditoría
Como **administrador del buffet**,
quiero que el sistema registre quién accedió a cada documento, cuándo y qué hizo,
para tener trazabilidad completa en caso de una filtración o incidente.

**Criterios de aceptación:**
- Se registra: usuario, fecha/hora, acción (ver, editar, descargar, compartir)
- Se registra la IP de origen
- Los logs no pueden ser editados ni eliminados
- Se puede generar reporte de auditoría por rango de fechas

---

## 2. ÉPICA: GESTIÓN DE CASOS

### US-05: Crear un caso nuevo
Como **abogado**,
quiero registrar un caso nuevo con el nombre del cliente y el tipo de caso,
para que el sistema me ayude a organizar todo lo relacionado con ese cliente.

**Criterios de aceptación:**
- Se obliga ingresar nombre del cliente y tipo de caso
- El sistema asigna un ID único al caso
- Se permite seleccionar tipo: Asistencia Familiar, Patria Potestad, Violencia Doméstica, Otro
- El caso queda visible en el panel principal inmediatamente

---

### US-06: Ver todos mis casos activos
Como **abogado**,
quiero ver una lista de todos mis casos activos con estado y próxima audiencia,
para tener visibilidad completa de mi carga de trabajo sin buscar en carpetas.

**Criterios de aceptación:**
- Se muestra nombre del cliente, tipo de caso, estado y próxima audiencia
- Se puede filtrar por tipo, estado o nombre
- Se ordena por fecha de próxima audiencia (más próxima primero)
- Se muestra cantidad total de documentos por caso

---

### US-07: Cambiar el estado de un caso
Como **abogado**,
quiero marcar un caso como "activo", "en audiencia" o "cerrado",
para saber en qué etapa se encuentra cada uno de mis clientes.

**Criterios de aceptación:**
- Se permite cambiar estado con un click
- El historial de cambios queda registrado
- Los casos cerrados se archivan pero siguen siendo consultables
- Se puede reabrir un caso cerrado si es necesario

---

## 3. ÉPICA: CARGA Y CLASIFICACIÓN DE DOCUMENTOS

### US-08: Subir un documento a un caso
Como **abogado**,
quiero arrastrar un archivo (PDF, imagen, Word) sobre un caso,
para que el sistema lo guarde y lo organicé automáticamente.

**Criterios de aceptación:**
- Se aceptan formatos: PDF, JPG, PNG, DOCX
- Tamaño máximo: 50MB por archivo
- Se muestra barra de progreso durante la carga
- Se confirma con mensaje de éxito o error claro

---

### US-09: Clasificación automática del documento
Como **asistente del buffet**,
quiero que el sistema lea el contenido del documento y lo clasifique solo,
para no perder tiempo escribiendo nombres ni categorías manualmente.

**Criterios de aceptación:**
- El sistema detecta tipo de documento: demanda, contestación, informe psicológico, certificado médico, orden de protección, comprobante de pago, otro
- La clasificación se basa en el contenido, no en el nombre del archivo
- Se muestra la clasificación sugerida al usuario para confirmar o corregir
- Si el archivo se llama "scan001.jpg", el sistema asigna un nombre descriptivo

---

### US-10: Verificar que no haya duplicados
Como **abogado**,
quiero que el sistema me avise si ya existe un documento similar en el caso,
para no tener dos copias del mismo certificado o informe.

**Criterios de aceptación:**
- Antes de guardar, el sistema compara embeddings con documentos existentes
- Si hay similitud > 85%, muestra alerta: "Este documento parece similar a [nombre]"
- El usuario decide si es duplicado o versión nueva
- Si es duplicado, se cancela la carga

---

### US-11: Ver historial de versiones de un documento
Como **abogada de patria potestad**,
quiero ver todas las versiones de una demanda que he ido modificando,
para nunca volver a imprimir la versión vieja por error.

**Criterios de aceptación:**
- Se muestra lista cronológica de versiones (v1, v2, v3...)
- Cada versión muestra fecha y quién la modificó
- Se puede descargar cualquier versión anterior
- Se puede comparar dos versiones lado a lado (diff)

---

## 4. ÉPICA: BÚSQUEDA INTELIGENTE

### US-12: Buscar documento por palabras clave
Como **abogado**,
quiero escribir "convenio visitas Mamani 2024" y encontrar el documento aunque se llame "ACUERDO_FINAL2.pdf",
para no tener que recordar el nombre exacto de cada archivo.

**Criterios de aceptación:**
- La búsqueda es semántica (entiende el significado, no solo palabras exactas)
- Tolera errores de escritura ("conbenio" = "convenio")
- Tolera sinónimos legales ("contestación" = "respuesta a demanda")
- Muestra resultados en menos de 3 segundos

---

### US-13: Preguntar en lenguaje natural
Como **abogado**,
quiero preguntar "¿qué documentos faltan para la audiencia de mañana de García?"
y que el sistema me responda en texto claro,
para prepararme rápido sin revisar carpeta por carpeta.

**Criterios de aceptación:**
- El sistema procesa preguntas en español coloquial
- La respuesta incluye la lista de documentos faltantes
- Se cita la fuente de cada respuesta
- El tiempo de respuesta es menor a 3 segundos

---

### US-14: Buscar desde el celular
Como **abogado en el juzgado**,
quiero abrir el sistema desde mi celular y buscar un documento,
para mostrárselo a la jueza sin cargar carpetas físicas.

**Criterios de aceptación:**
- La interfaz es responsive (se adapta a pantalla de celular)
- La búsqueda funciona igual que en computadora
- Los resultados se pueden ampliar para lectura cómoda
- Se puede descargar el documento desde el celular

---

## 5. ÉPICA: ALERTAS PROACTIVAS

### US-15: Recibir alerta de audiencia próxima
Como **abogado**,
quiero recibir una notificación 48 horas antes de cada audiencia,
para tener tiempo de preparar los documentos necesarios.

**Criterios de aceptación:**
- Se envía alerta 48h antes (preparación)
- Se envía alerta 24h antes (documentos faltantes)
- Se envía alerta 2h antes (repaso final)
- La alerta incluye: fecha, juzgado, caso, documentos requeridos

---

### US-16: Recibir alerta de vencimiento de medida de protección
Como **abogada de violencia doméstica**,
quiero que el sistema me avise cuando una orden de restricción está por vencer,
para solicitar la prórroga a tiempo y no dejar a la víctima desprotegida.

**Criterios de aceptación:**
- Se detecta automáticamente la fecha de vencimiento del documento
- Se envía alerta 7 días antes del vencimiento
- Se envía alerta urgente 48 horas antes
- La alerta incluye nombre de la víctima, número de caso y acción sugerida

---

### US-17: Recibir resumen diario de pendientes
Como **abogado**,
quiero recibir cada mañana un resumen de lo que tengo pendiente para el día,
para organizar mi jornada sin olvidar nada importante.

**Criterios de aceptación:**
- Se muestra a las 8:00 AM automáticamente
- Incluye: audiencias del día, documentos faltantes, alertas activas
- Se puede configurar hora de envío
- Se envía por notificación in-app y email

---

## 6. ÉPICA: COMPARTIR SEGURO

### US-18: Compartir documento con enlace temporal
Como **abogado**,
quiero generar un enlace que expire en 24 horas para enviar un informe a la Defensoría,
para no mandar PDFs por WhatsApp como ahora.

**Criterios de aceptación:**
- Se genera enlace con JWT firmado
- Se puede definir duración: 1h, 24h, 72h
- El enlace es de un solo uso por destinatario
- Se registra quién accedió, cuándo y desde dónde

---

### US-19: Compartir solo lectura sin descarga
Como **abogada de violencia doméstica**,
quiero compartir un informe para que solo se pueda ver online, no descargar,
para que la información de la víctima no quede en otros dispositivos.

**Criterios de aceptación:**
- Se puede configurar permiso "solo lectura"
- No se permite botón de descarga cuando está en este modo
- Se agrega marca de agua con nombre del destinatario y fecha
- Se deshabilita captura de pantalla (best effort)

---

### US-20: Revocar un enlace compartido
Como **abogado**,
quiero poder cancelar un enlace que ya envié antes de que expire,
para si me doy cuenta de que mandé el documento a la persona equivocada.

**Criterios de aceptación:**
- Se puede revocar desde la sección de compartidos
- El enlace deja de funcionar inmediatamente
- Se notifica al destinatario que el enlace fue revocado
- Se registra la revocación en el log de auditoría

---

## 7. ÉPICA: GESTIÓN DE AUDIENCIAS

### US-21: Registrar una audiencia
Como **abogado**,
quiero registrar fecha, juzgado y tipo de audiencia para un caso,
para que el sistema me ayude a prepararme con anticipación.

**Criterios de aceptación:**
- Se asocia obligatoriamente a un caso existente
- Se registra: fecha, hora, juzgado, tipo de audiencia
- El sistema genera automáticamente el checklist de documentos requeridos
- La audiencia aparece en el calendario del sistema

---

### US-22: Ver documentos faltantes para una audiencia
Como **abogado**,
quiero ver qué documentos tengo y cuáles me faltan para una audiencia específica,
para no llegar al juzgado sin algo importante.

**Criterios de aceptación:**
- Se muestra checklist dividido en "tenidos" y "faltantes"
- Los documentos faltantes se resaltan en rojo
- Se puede marcar un documento como "en trámite"
- Se permite agregar documentos requeridos manualmente

---

### US-23: Preparar paquete de documentos para impresión
Como **abogado**,
quiero generar un PDF con todos los documentos de una audiencia listos para imprimir,
para llevar todo organizado al juzgado sin improvisar.

**Criterios de aceptación:**
- Se genera un PDF consolidado con todos los documentos del caso
- Se ordenan según el checklist de la audiencia
- Incluye portada con datos del caso
- El peso total del PDF se muestra antes de descargar

---

## 8. ÉPICA: INTERFAZ Y USABILIDAD

### US-24: Interfaz simple y clara
Como **asistente del buffet**,
quiero que el sistema sea fácil de usar sin necesidad de capacitación de tres días,
para empezar a usarlo desde el primer día.

**Criterios de aceptación:**
- Menos de 5 cliccs para llegar a cualquier función principal
- Los botones tienen labels descriptivos (no solo íconos)
- Hay tooltips de ayuda al pasar el mouse
- El diseño es consistente en todas las pantallas

---

### US-25: Chat conversacional para búsquedas
Como **abogado**,
quiero tener un chat donde pueda preguntar como si fuera una persona,
para no tener que aprender a usar un motor de búsqueda complicado.

**Criterios de aceptación:**
- El chat está visible en todas las pantallas
- Acepta preguntas en español coloquial
- Responde con texto claro y fuentes citadas
- Se puede continuar la conversación ("¿y qué más de Mamani?")

---

### US-26: Modo rápido para casos de emergencia
Como **abogada de violencia doméstica**,
quiero un botón de "caso urgente" que me lleve directo a crear el caso y subir documentos,
para no perder tiempo cuando una víctima llega llorando a las 8 de la mañana.

**Criterios de aceptación:**
- El botón "URGENTE" está visible en la pantalla principal
- Crea un caso con mínimo de campos (nombre, tipo violencia)
- Permite subir documentos inmediatamente después
- No solicita información no esencial hasta después de la emergencia

---

## 9. ÉPICA: NOTIFICACIONES Y COMUNICACIÓN

### US-27: Notificaciones in-app
Como **abogado**,
quiero ver notificaciones dentro del sistema cuando hay algo importante,
para no depender solo del correo electrónico.

**Criterios de aceptación:**
- Campana de notificaciones en la barra superior
- Se muestra contador de no leídas
- Las notificaciones se agrupan por tipo
- Se pueden marcar como leídas individual o masivamente

---

### US-28: Notificación por email de resumen semanal
Como **abogado**,
quiero recibir un correo cada lunes con el resumen de la semana anterior,
para tener un registro de lo que pasó con mis casos.

**Criterios de aceptación:**
- Se envía automáticamente los lunes a las 8 AM
- Incluye: casos activos, documentos subidos, audiencias atendidas, alertas pendientes
- Se puede desactivar desde configuración
- El email no incluye contenido sensible (solo resumen)

---

## 10. ÉPICA: IMPRESIÓN Y EXPORTACIÓN

### US-29: Imprimir documento directamente
Como **abogado**,
quiero imprimir un documento desde el sistema sin tener que descargarlo primero,
para ahorrar tiempo cuando estoy en el juzgado.

**Criterios de aceptación:**
- Botón de imprimir visible en la vista del documento
- Se abre diálogo de impresión del navegador
- Se imprime en formato tamaño legal
- Se incluye encabezado con datos del caso y fecha

---

### US-30: Exportar caso completo
Como **abogado**,
quiero exportar todos los documentos de un caso en un ZIP organizado,
para tener un respaldo local o entregarlo a otro profesional.

**Criterios de aceptación:**
- Se genera ZIP con carpetas por tipo de documento
- Incluye índice en formato texto con la lista de documentos
- Los nombres de archivo son descriptivos (no "scan001.jpg")
- Se puede proteger el ZIP con contraseña

---

## RESUMEN DE USER STORIES

| Épica | Cantidad | Prioridad |
|-------|----------|-----------|
| Autenticación y Seguridad | 4 | Alta |
| Gestión de Casos | 3 | Alta |
| Carga y Clasificación de Documentos | 4 | Alta |
| Búsqueda Inteligente | 3 | Crítica |
| Alertas Proactivas | 3 | Alta |
| Compartir Seguro | 3 | Alta |
| Gestión de Audiencias | 3 | Alta |
| Interfaz y Usabilidad | 3 | Media |
| Notificaciones y Comunicación | 2 | Media |
| Impresión y Exportación | 2 | Media |
| **TOTAL** | **30** | |

---

*Documento generado el 25/08/2026 — Proyecto de Gestión de Proyectos Informáticos*
