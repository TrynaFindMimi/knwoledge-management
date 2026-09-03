# MANUAL DE USUARIO — SISTEMA KM CON RAG

## Buffet de Asistencia Familiar — La Paz, Bolivia

**Fecha:** 31/08/2026
**Version:** 1.0
**Para:** Administradores, abogados y asistentes del Buffet
**Referencia visual:** `mockups/Mockup_01..16` (16 pantallas) — ver tambien `Manual_Tecnico_KM_RAG.md` para detalle tecnico y `documentos/diagramas/wae/WAE_01.svg` para el mapa completo de navegacion

---

## INDICE

1. Bienvenida
2. Antes de empezar — roles y permisos
3. Ingresar al sistema
4. Panel principal (Dashboard)
5. Gestion de Casos
6. Documentos del caso
7. Busqueda inteligente y Chat
8. Audiencias
9. Compartir documentos de forma segura
10. Notificaciones
11. Imprimir y exportar
12. Mi perfil
13. Administracion (solo Administrador)
14. Preguntas frecuentes
15. Solucion de problemas comunes
16. Glosario
17. Soporte

---

## 1. Bienvenida

Este sistema fue creado para que el equipo del Buffet de Asistencia Familiar deje de perder tiempo buscando papeles y carpetas sueltas. Todo caso, documento y audiencia queda en un solo lugar, con busqueda inteligente que entiende lo que escribes aunque tengas una falta de ortografia o no recuerdes el nombre exacto del archivo.

No necesitas saber de tecnologia para usarlo. Este manual te guia pantalla por pantalla, en el mismo orden en que normalmente trabajarias un caso: iniciar sesion, revisar el panel, abrir o crear un caso, subir documentos, buscar informacion, preparar una audiencia y compartir un documento cuando haga falta.

Si en algun momento algo no coincide exactamente con lo que ves en tu pantalla, es porque el sistema recibe mejoras continuas; la forma de usarlo no cambia.

---

## 2. Antes de empezar — roles y permisos

El sistema reconoce tres roles. Tu rol lo asigna el Administrador y determina que puedes ver y hacer:

| Que puedo hacer | Administrador | Abogado/a | Asistente |
|---|---|---|---|
| Ver el Dashboard, buscar, usar el chat | Si | Si | Si |
| Ver casos | Todos | Solo los suyos o asignados | Los que le asignen |
| Crear / editar casos | Si | Si | Si |
| Subir documentos | Si | Si | Si |
| **Eliminar** documentos | Si | Si (con permiso) | **No** |
| Compartir documentos por enlace | Si | Si | Si |
| Registrar audiencias | Si | Si | Si |
| Gestionar usuarios (crear, bloquear, cambiar rol) | **Si, unico rol** | No | No |
| Ver el registro de auditoria completo | **Si, unico rol** | Solo del propio caso (pestana Auditoria) | No |
| Cambiar configuracion del sistema | **Si, unico rol** | No | No |

Si intentas entrar a una seccion que no te corresponde, el sistema te muestra una pantalla de **"Sin permisos" (403)** en vez de dejarte pasar — no es un error, es el sistema protegiendo la informacion de los casos, especialmente en casos sensibles de violencia domestica.

---

## 3. Ingresar al sistema

**Pantalla:** Login — ruta `/login` — ver `mockups/Mockup_01_Login.svg`

1. Abre el sistema en tu navegador (Chrome, Firefox o Edge, en computadora o celular).
2. Escribe tu **correo electronico** y tu **contrasena** (12 caracteres, con mayuscula, numero y simbolo).
3. Presiona **Ingresar**.
4. Si tu contrasena es incorrecta, el sistema te avisa cuantos intentos te quedan. **Al tercer intento fallido, tu cuenta se bloquea temporalmente** por seguridad — esto protege la informacion de tus clientes si alguien intenta adivinar tu clave.
5. Si olvidaste tu contrasena, presiona **"Olvide mi contrasena"**. Te llega un enlace por correo valido por 15 minutos para crear una nueva.

Una vez dentro, tu sesion permanece activa mientras trabajas. Si te alejas de la computadora por mas de 30 minutos sin usarla, el sistema cierra la sesion automaticamente y debes volver a ingresar — esto es intencional, para que un caso de violencia domestica nunca quede abierto en una pantalla desatendida.

---

## 4. Panel principal (Dashboard)

**Pantalla:** Dashboard — ruta `/` — ver `mockups/Mockup_02_Dashboard.svg`

Es lo primero que ves al ingresar. Te da un resumen de tu dia de trabajo:

- **Menu lateral izquierdo:** acceso rapido a Casos, Busqueda, Chat RAG, Audiencias y Compartidos.
- **Tarjetas superiores:** cuantos casos activos tienes, cuantos documentos se subieron este mes, cuantas audiencias vienen y cuantas alertas requieren tu atencion hoy.
- **Casos por tipo:** un vistazo rapido a cuantos casos tienes de cada tipo (asistencia familiar, patria potestad, violencia domestica, otros).
- **Proximas audiencias:** las mas cercanas en el tiempo, con un aviso de "Faltan X dias" — si dice **"Listo"** en verde, ya tienes todos los documentos; si esta en dorado, todavia falta algo.
- **Documentos recientes:** lo ultimo que se subio al sistema.
- **Boton URGENTE (esquina inferior derecha):** para emergencias — ver siguiente seccion.

### Caso urgente (modo rapido)

Cuando una persona llega a pedir ayuda en una situacion de riesgo inmediato (por ejemplo violencia domestica), no tienes tiempo para llenar formularios largos. El boton **URGENTE** te lleva directo a crear un caso con solo el nombre y el tipo — el resto de la informacion la completas despues, con calma, una vez que la persona esta atendida.

---

## 5. Gestion de Casos

### 5.1 Ver todos tus casos

**Pantalla:** Listado de Casos — ruta `/casos` — ver `mockups/Mockup_03_Listado_Casos.svg`

- Usa los filtros de arriba (**Tipo**, **Estado**, buscador por nombre de cliente) para encontrar un caso rapido.
- La tabla muestra cliente, tipo de caso, estado (Activo, En audiencia, Cerrado) y la proxima audiencia si tiene una.
- Presiona **Ver** en la fila del caso para abrir su detalle.
- Presiona **+ Nuevo caso** (boton dorado, esquina inferior derecha) para registrar un caso nuevo.

Como abogado o abogada, solo veras los casos que te fueron asignados, no todos los del Buffet — esto protege la confidencialidad entre clientes.

### 5.2 Crear un caso

Al presionar **+ Nuevo caso** se te pide: nombre del cliente (obligatorio) y tipo de caso (obligatorio). El caso queda creado y visible de inmediato — no hace falta recargar la pagina.

### 5.3 Abrir un caso — vista de detalle

**Pantalla:** Detalle de Caso — ruta `/casos/:id` — ver `mockups/Mockup_04_Detalle_Caso.svg`

Arriba veras el nombre del cliente, el tipo de caso y su estado actual. Debajo hay cuatro pestanas:

| Pestana | Que contiene |
|---|---|
| **Documentos** | Todos los archivos subidos a este caso (seccion 6) |
| **Audiencias** | Las audiencias registradas para este caso (seccion 8) |
| **Compartidos** | Los enlaces de documentos que compartiste desde este caso (seccion 9) |
| **Auditoria** | Quien vio o modifico algo de este caso, y cuando |

Desde aqui tambien puedes **Editar** los datos del caso, **cambiar su estado** (Activo / En audiencia / Cerrado) o **exportar todo el caso en un ZIP** (seccion 11).

---

## 6. Documentos del caso

**Pantalla:** dentro de `/casos/:id`, pestana Documentos — ver `mockups/Mockup_05_Documentos_en_Caso.svg`

### 6.1 Subir un documento

1. Dentro del caso, en la pestana **Documentos**, arrastra el archivo al recuadro punteado (o presiona **Seleccionar archivos**).
2. Formatos permitidos: **PDF, JPG, PNG, DOCX** — hasta **50 MB** por archivo.
3. El sistema lo lee automaticamente y sugiere una categoria (demanda, contestacion, informe psicologico, certificado medico, orden de proteccion, comprobante de pago, u otro) — **no necesitas escribir el nombre del archivo tu misma/o**, el sistema tambien le pone un nombre descriptivo en vez de dejarlo como "scan001.jpg".

### 6.2 Si el sistema detecta un posible duplicado

Si subes un archivo muy parecido a otro que ya existe (por ejemplo, otra copia del mismo convenio escaneada de nuevo), aparece un aviso:

> "Similar a Convenio 2024-03-15 — Similitud 87% — ¿Es duplicado o version nueva?"

- Presiona **Es duplicado** si es la misma copia repetida — el sistema la descarta.
- Presiona **Es version nueva** si en realidad es una actualizacion del documento (por ejemplo, el convenio con una firma nueva) — el sistema la guarda como una nueva version, **sin borrar la anterior**.

### 6.3 Ver versiones anteriores de un documento

Cada documento guarda su historial completo. Abre el panel **Versiones** a la derecha para ver v1, v2, etc., con fecha y quien la subio. Puedes **descargar cualquier version anterior** o usar **Comparar diff** para ver que cambio entre dos versiones. Ningun documento se sobreescribe ni se pierde.

---

## 7. Busqueda inteligente y Chat

### 7.1 Busqueda semantica

**Pantalla:** Busqueda — ruta `/busqueda` — ver `mockups/Mockup_06_Busqueda_Semantica.svg`

Escribe lo que buscas en lenguaje natural, por ejemplo `convenio visitas Mamani 2024`. El sistema entiende el significado, no solo palabras exactas: si escribes "conbenio" con falta de ortografia, igual te muestra el documento correcto. Cada resultado indica de que caso viene, la fecha y un porcentaje de que tan bien coincide con tu busqueda. Puedes filtrar por tipo de documento o por caso especifico.

### 7.2 Chat RAG (preguntar en lenguaje natural)

**Pantalla:** Chat — ruta `/chat` — ver `mockups/Mockup_07_Chat_RAG.svg`

En vez de buscar palabras clave, puedes simplemente **preguntar** como le preguntarias a un colega: *"¿Que falta para la audiencia de Garcia manana?"*. El asistente responde con la informacion encontrada en los documentos del caso y siempre indica **de que documento sacó la respuesta** (fuente), para que puedas verificarla. Puedes seguir preguntando sobre el mismo tema — el chat recuerda la conversacion.

El chat esta disponible como ventana flotante en cualquier pantalla del sistema, ademas de su propia pagina completa.

---

## 8. Audiencias

**Pantalla:** Audiencias — ruta `/audiencias` — ver `mockups/Mockup_08_Audiencias.svg`

- El **calendario** de la izquierda muestra tus audiencias del mes. Los dias con audiencia estan marcados.
- Al seleccionar una fecha, a la derecha ves el **detalle**: juzgado, hora y una lista de documentos organizados en tres grupos:
  - **Tenidos (verde):** ya los tienes listos.
  - **Faltantes (rojo):** todavia necesitas conseguirlos — revisalos antes de la fecha.
  - **En tramite (dorado):** estan en proceso.
- Puedes **agregar un requisito manual** si la audiencia necesita un documento que el sistema no listo automaticamente.
- Cuando todo esta listo, presiona **Generar paquete PDF** para armar un solo archivo con portada y el orden correcto de documentos para llevar impreso al juzgado.

El sistema te avisa con anticipacion (48 horas y 2 horas antes) si aun te falta algun documento — revisa la seccion de Notificaciones.

---

## 9. Compartir documentos de forma segura

**Pantalla:** Compartidos — ruta `/compartidos` — ver `mockups/Mockup_09_Compartidos.svg`

Cuando necesitas enviarle un documento a alguien externo (por ejemplo la Defensoria), no lo mandes por correo suelto — usa el sistema:

1. Presiona **Compartir** sobre el documento.
2. Elige cuanto tiempo estara disponible el enlace: **24, 48 o 72 horas**.
3. Elige el permiso: normalmente **solo lectura**.
4. Escribe el correo del destinatario y presiona **Generar enlace**.
5. Copia el enlace y envialo. El destinatario vera el documento marcado con una **marca de agua** (nombre y fecha) y **no podra descargarlo ni volver a compartirlo**.

El enlace **se vence solo** al llegar al tiempo elegido. Si necesitas cortar el acceso antes, presiona **Revocar** en la tabla de enlaces compartidos — el acceso se corta de inmediato, incluso si el destinatario aun no lo abrio.

Todo acceso al enlace queda registrado (fecha, hora, direccion desde donde se accedio) para tu tranquilidad.

---

## 10. Notificaciones

**Pantalla:** icono de campana (cualquier pagina) y pagina completa — ruta `/notificaciones` — ver `mockups/Mockup_10_Notificaciones.svg`

La campana en la parte superior te avisa cuando hay algo que requiere tu atencion: una audiencia proxima, un documento por vencer, etc. El numero rojo indica cuantas notificaciones no has leido.

- Presiona la campana para ver un resumen rapido.
- Presiona **"Ir a fecha"** sobre una notificacion de audiencia para saltar directo al calendario de esa fecha.
- Presiona **"Marcar todas leidas"** para limpiar el contador.
- La pagina completa de Notificaciones te deja revisar el historial y filtrar por tipo.

---

## 11. Imprimir y exportar

**Pantalla:** dentro de un caso o documento — ver `mockups/Mockup_15_Imprimir__Export.svg`

- **Imprimir un documento:** abre el dialogo de impresion de tu navegador con formato tamano oficio y encabezado con el nombre del caso y la fecha.
- **Exportar un caso completo (ZIP):** organiza automaticamente todos los documentos del caso en carpetas por tipo, con un indice de contenido y nombres descriptivos (no "scan001.jpg"). Puedes marcar **"Proteger con contrasena"** para que el ZIP quede cifrado si vas a enviarlo por correo.

---

## 12. Mi perfil

**Pantalla:** Perfil — ruta `/perfil` — ver `mockups/Mockup_14_Perfil.svg`

Aqui puedes ver tus datos (nombre, correo, rol) y **cambiar tu contrasena**. La nueva contrasena debe tener 12 caracteres con mayuscula, minuscula, numero y simbolo — el sistema te indica en tiempo real que falta para que sea valida.

---

## 13. Administracion (solo Administrador)

Estas tres pantallas solo son visibles si tu rol es **Administrador**. Si otro rol intenta acceder por la URL directa, el sistema responde con "Sin permisos".

### 13.1 Usuarios

**Ruta:** `/admin/usuarios` — ver `mockups/Mockup_11_Admin_Usuarios.svg`

- Tabla con todos los usuarios del Buffet: nombre, correo, rol y estado.
- **+ Nuevo** para dar de alta a un integrante nuevo del equipo.
- **Editar rol** para cambiar entre admin / abogado / asistente.
- **Bloquear** para suspender el acceso de alguien sin borrar su cuenta (por ejemplo si deja el Buffet temporalmente).

### 13.2 Auditoria

**Ruta:** `/admin/auditoria` — ver `mockups/Mockup_12_Admin_Auditoria.svg`

Registro de todo lo que ocurrio en el sistema: quien vio, edito, descargo o compartio cada documento, con fecha e IP. **Este registro no se puede borrar ni modificar**, ni siquiera por un administrador — es la garantia de que, si algo se investiga, la informacion es confiable. Puedes filtrar por fecha, usuario o tipo de accion y **exportar un reporte** en Excel.

### 13.3 Configuracion

**Ruta:** `/admin/config` — ver `mockups/Mockup_13_Admin_Config.svg`

Ajustes generales del sistema: nombre y logo del Buffet que aparecen en el encabezado, hora del resumen diario por correo, y tiempos de retencion de registros.

---

## 14. Preguntas frecuentes

**¿Perdi mi contrasena, que hago?**
En la pantalla de Login presiona "Olvide mi contrasena". Te llega un correo con un enlace valido por 15 minutos.

**Intente entrar 3 veces y ahora no me deja, ¿por que?**
Es una medida de seguridad automatica tras 3 intentos fallidos. Espera unos minutos o pide a un administrador que revise tu cuenta.

**Subi un documento por error, ¿lo puedo borrar?**
Si tu rol lo permite (admin o abogado), si. Los asistentes no pueden eliminar documentos — pueden pedirle a un abogado o al administrador que lo haga.

**Al buscar, el sistema no encuentra un documento que se que existe.**
Prueba con menos palabras o palabras mas generales (el buscador entiende el significado, no necesitas la frase exacta). Si el documento se acaba de subir, dale unos segundos — el sistema lo procesa antes de que aparezca en resultados.

**Comparti un documento pero me equivoque de correo.**
Ve a Compartidos y presiona Revocar sobre ese enlace — se corta el acceso de inmediato, sin importar si ya lo abrieron.

**¿El sistema funciona en el celular?**
Si, esta pensado para usarse tambien desde el celular durante una audiencia o visita a domicilio.

---

## 15. Solucion de problemas comunes

| Si ves esto... | Significa... | Que hacer |
|---|---|---|
| Pantalla "403 — Sin permisos" | Tu rol no tiene acceso a esa seccion | Verifica con el administrador que tu rol sea el correcto |
| Pantalla "404 — Pagina no encontrada" | El enlace que usaste ya no existe o esta mal escrito | Presiona "Ir al dashboard" y navega desde el menu |
| Pantalla "500 — Error interno" | Algo fallo del lado del sistema, no de tu parte | Recarga la pagina; si persiste, avisa a soporte |
| "Credenciales invalidas" al ingresar | Correo o contrasena incorrectos | Revisa mayusculas/minusculas; usa "Olvide mi contrasena" si hace falta |
| El enlace compartido dice "Expirado" | Se cumplio el tiempo que elegiste al compartir (24/48/72h) | Genera un enlace nuevo desde Compartidos |
| La sesion se cerro sola | Pasaron 30 minutos sin actividad (medida de seguridad) | Vuelve a iniciar sesion, tu trabajo guardado no se pierde |

---

## 16. Glosario

- **RAG:** la tecnologia detras de la Busqueda y el Chat — le permite al sistema "leer" tus documentos y responder preguntas citando de donde sacó la informacion, en vez de inventar respuestas.
- **Version de un documento:** cada vez que se sube una actualizacion de un documento (v1, v2, v3...), sin borrar las anteriores.
- **Enlace temporal:** un link para compartir un documento que se vence solo despues de un tiempo elegido (24/48/72 horas).
- **Auditoria:** el registro permanente de quien hizo que y cuando dentro del sistema.
- **RBAC / permisos por rol:** el sistema le muestra a cada persona solo lo que su rol le permite ver o hacer.
- **Marca de agua (watermark):** el sello con nombre y fecha que aparece sobre un documento compartido, para identificar de donde salio si se filtra.

---

## 17. Soporte

Ante cualquier duda o problema que este manual no resuelva, contacta al equipo:

- **Mariana del Arroyo** — Project Manager
- **Santiago Acha** — Soporte tecnico

Horario de atencion: Lunes a Viernes, 9:00 a 18:00 (hora Bolivia). Durante el periodo de garantia (60 dias posteriores a la entrega), la correccion de errores no tiene costo adicional — ver `Acta_Entrega_KM_RAG.md` Seccion 5.

---

## Anexos

- `Manual_Tecnico_KM_RAG.md` — detalle tecnico de arquitectura, APIs y base de datos
- `mockups/Mockup_01..16` — referencia visual de cada pantalla mencionada en este manual
- `documentos/diagramas/wae/WAE_01.svg` — mapa completo de navegacion entre pantallas
- `documentos/User_Stories.md` — historias de usuario originales que dieron origen a cada funcionalidad
- `Acta_Entrega_KM_RAG.md` — condiciones de garantia y soporte
