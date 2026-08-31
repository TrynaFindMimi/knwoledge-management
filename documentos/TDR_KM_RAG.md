# TÉRMINOS DE REFERENCIA (TDR)

## CONTRATACIÓN DE CONSULTORA PARA EL DESARROLLO DE SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG — BUFFET DE ABOGADOS DE ASISTENCIA FAMILIAR

---

### ÍNDICE

- [TÉRMINOS DE REFERENCIA (TDR)](#términos-de-referencia-tdr)
  - [CONTRATACIÓN DE CONSULTORA PARA EL DESARROLLO DE SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG — BUFFET DE ABOGADOS DE ASISTENCIA FAMILIAR](#contratación-de-consultora-para-el-desarrollo-de-sistema-de-gestión-de-conocimiento-km-con-rag--buffet-de-abogados-de-asistencia-familiar)
    - [ÍNDICE](#índice)
    - [1. INFORMACIÓN GENERAL](#1-información-general)
    - [2. ANTECEDENTES Y JUSTIFICACIÓN](#2-antecedentes-y-justificación)
      - [2.1. Contexto organizacional](#21-contexto-organizacional)
      - [2.2. Problemática identificada](#22-problemática-identificada)
      - [2.3. Justificación del proyecto](#23-justificación-del-proyecto)
    - [3. OBJETIVOS](#3-objetivos)
      - [3.1. Objetivo General](#31-objetivo-general)
      - [3.2. Objetivos Específicos](#32-objetivos-específicos)
      - [3.3. Matriz de coherencia OE → Entregable](#33-matriz-de-coherencia-oe--entregable)
    - [4. ALCANCE DEL PROYECTO](#4-alcance-del-proyecto)
      - [4.1. Incluye (con criterio de aceptación por módulo)](#41-incluye-con-criterio-de-aceptación-por-módulo)
      - [4.2. Alcance por Tipo de Caso](#42-alcance-por-tipo-de-caso)
      - [4.3. Alcance por Usuario](#43-alcance-por-usuario)
    - [5. REQUERIMIENTOS FUNCIONALES](#5-requerimientos-funcionales)
    - [6. METODOLOGÍA DE TRABAJO](#6-metodología-de-trabajo)
    - [7. ENTREGABLES](#7-entregables)
    - [8. PERFIL DEL EQUIPO CONSULTOR](#8-perfil-del-equipo-consultor)
    - [9. FORMA DE PAGO](#9-forma-de-pago)
    - [10. PROPIEDAD INTELECTUAL](#10-propiedad-intelectual)
    - [11. CONFIDENCIALIDAD Y PROTECCIÓN DE DATOS](#11-confidencialidad-y-protección-de-datos)
    - [12. GARANTÍA Y SOPORTE](#12-garantía-y-soporte)
    - [13. CRITERIOS DE EVALUACIÓN DE PROPUESTAS](#13-criterios-de-evaluación-de-propuestas)
    - [14. CONDICIONES DE PRESENTACIÓN](#14-condiciones-de-presentación)
    - [15. CONTACTO](#15-contacto)


---

### 1. INFORMACIÓN GENERAL

| Campo | Descripción |
|-------|-------------|
| **Proyecto** | Desarrollo e implementación de Sistema de Gestión de Conocimiento (KM) web con motor RAG para sistematizar archivos y documentos legales oficiales de abogados de derecho familiar |
| **Organización contratante** | Buffet de Asistencia Familiar — Servicios legales gratuitos (Asistencia Familiar, Patria Potestad, Violencia Doméstica) |
| **Ubicación** | La Paz, Bolivia |
| **Tipo de organización** | Buffet jurídico de asistencia gratuita — atención a familias en situación de vulnerabilidad |
| **Moneda de referencia** | Bolivianos (Bs.) |
| **Duración estimada** | 16 semanas (4 meses) — 8 sprints de 2 semanas |
| **Metodología esperada** | Scrum + Kanban — Sprints de 2 semanas, daily 15 min, demo + retrospectiva cada sprint |
| **Fecha TDR** | 27/08/2026 |
| **Versión** | 4.0 — Documento para convocatoria a consultoras |

---

### 2. ANTECEDENTES Y JUSTIFICACIÓN

#### 2.1. Contexto organizacional

El Buffet de Asistencia Familiar es una organización que brinda servicios legales gratuitos en derecho de familia, abarcando asistencia familiar, patria potestad, violencia doméstica y protección a víctimas. Actualmente atendemos a más de **50 casos activos simultáneos** con expedientes físicos y digitales desorganizados, en un contexto donde la pérdida de un documento afecta directamente a familias vulnerables y a la reparación de pensiones para menores.

#### 2.2. Problemática identificada

Mediante un proceso de investigación interna que incluyó 3 entrevistas semiestructuradas anónimas a abogados con 12, 8 y 3 años de experiencia, complementada con diagrama Ishikawa y modelado BPWin de 7 procesos, hemos identificado la siguiente problemática:

| Indicador línea base | Valor actual | Impacto |
|----------------------|--------------|---------|
| **Tiempo búsqueda documental** | 4-6 horas/semana por abogado (208-312 h/año) | Menor tiempo de atención a clientes vulnerables |
| **Volumen casos activos** | 50+ casos simultáneos, 40-50 docs por caso | Carpetas sin sub-organización, duplicados |
| **Documentos escaneados sin clasificación** | 200 archivos (`scan001.jpg`, `ACUERDO_FINAL2.pdf`) sin convención de nombres | Archivos inlocalizables, 90% mal etiquetados |
| **Pérdida en audiencia** | 1 caso documentado (Juzgado 3ro, 15/07) convenio no encontrado, prórroga 24h | Percepción de irresponsabilidad, perjuicio a cliente |
| **Versionado fallido** | Impresión de demanda obsoleta presentada ante jueza | Riesgo procesal, retrabajo |
| **Seguridad deficiente** | Contraseñas débiles, direcciones víctimas sin cifrar, envío por WhatsApp sin protección | Exposición datos víctimas/menores, incumplimiento normativa |
| **Dependencia persona clave** | Una sola asistente conoce la ubicación de archivos; si falta, parálisis total | Riesgo operativo crítico, bus factor = 1 |
| **Capacidad digitalización** | 200 docs escaneados en 2 años sin índice, duplicados sin detección | Deuda técnica acumulada |

#### 2.3. Justificación del proyecto

**Síntesis del problema:** Nuestro buffet opera con gestión artesanal (folder manila + archivador + carpeta `Escaneos 2024` + Drive sin criterio) que no escala a los 5000 documentos proyectados ni permite acceso móvil en juzgados.

**Necesidad que motiva esta contratación:**

- **Reducción de tiempo:** Necesitamos pasar de 4-6 horas/semana a <30 segundos por consulta (ahorro estimado de 200+ horas/año).
- **Mitigación de riesgos procesales:** Eliminar pérdida de documentos en audiencias y versionado obsoleto.
- **Seguridad de datos sensibles:** Proteger datos de víctimas y menores conforme normativa boliviana.
- **Escalabilidad:** Prepararnos para 5000+ documentos con búsqueda semántica.
- **Continuidad operativa:** Eliminar dependencia de una sola persona (bus factor).

**Por qué ahora:** La acumulación de 200+ documentos sin clasificar, el incidente documentado en audiencia y la exposición de datos sensibles hacen urgente la implementación de un sistema de gestión documental inteligente antes de que el volumen supere nuestra capacidad manual.

---

### 3. OBJETIVOS

#### 3.1. Objetivo General

Desarrollar un Sistema de Gestión de Conocimiento (KM) web que permita sistematizar los archivos y documentos legales oficiales para abogados de ley familiar con ayuda de tecnología.

#### 3.2. Objetivos Específicos

Solicitamos a la consultora cumplir con los siguientes objetivos específicos:

| Código | Objetivo específico | Descripción |
|--------|---------------------|-------------|
| **OE1** | **Analizar** los requerimientos del usuario para elaborar los requerimientos funcionales | La consultora deberá realizar el levantamiento de necesidades mediante entrevistas, observación y análisis documental con nuestro equipo de abogados. Elaborar requerimientos funcionales validados. |
| **OE2** | **Diseñar** los modelos y la arquitectura para la elaboración del sistema | La consultora deberá diseñar la arquitectura de software, modelo de datos, diagramas de procesos, y seleccionar las tecnologías apropiadas para el sistema KM con RAG. |
| **OE3** | **Diseñar** los módulos de búsqueda de archivos, gestión de documentación y administración para el funcionamiento del sistema | La consultora deberá diseñar detalladamente los módulos principales: búsqueda semántica RAG, gestión documental (carga, clasificación, versionado), y administración (usuarios, roles, auditoría). |
| **OE4** | **Implementar** el motor RAG para la búsqueda y sistematización de documentos y elaborar pruebas de sistema para verificar el buen funcionamiento | La consultora deberá desarrollar el pipeline RAG completo (chunking, embeddings, retrieval, generación), integrar módulos, y ejecutar pruebas funcionales, de rendimiento y de seguridad. |
| **OE5** | **Proponer** el entorno de despliegue adecuado para la puesta en producción del sistema | La consultora deberá evaluar opciones de infraestructura (cloud/local), configurar el entorno de producción, desplegar el sistema y documentar el mantenimiento. |

#### 3.3. Matriz de coherencia OE → Entregable

| OE | Entregable principal | Criterio de verificación |
|----|----------------------|--------------------------|
| OE1 | E1 Plan de trabajo + E2 Diseño | Requerimientos funcionales validados por nuestro equipo |
| OE2 | E2 Arquitectura + E3 MVP Auth/Casos | Arquitectura documentada y aprobada por nuestro equipo |
| OE3 | E3-E7 Módulos principales | Módulos funcionales operativos |
| OE4 | E5-E9 Motor RAG + Pruebas | Precisión ≥85%, p95 <3s |
| OE5 | E10 Despliegue + E11 Documentación | Sistema en producción operativo |

---

### 4. ALCANCE DEL PROYECTO

#### 4.1. Incluye (con criterio de aceptación por módulo)

La consultora deberá entregar los siguientes módulos con sus respectivos criterios de aceptación:

| Módulo | Descripción | OE | Criterio de aceptación |
|--------|-------------|----|------------------------|
| **Autenticación y Seguridad** | Login email+password seguro, bloqueo 3 intentos, expiración 30 min inactividad, cifrado en reposo y tránsito, RBAC (admin/abogado/asistente), auditoría inmutable | OE3, OE4 | Prueba 4 intentos bloquea; test permisos cruzados pass; SSL A+ |
| **Gestión de Casos** | CRUD casos (ID único, tipo: Asistencia Familiar / Patria Potestad / Violencia Doméstica / Otro), listado con filtros, orden por próxima audiencia, estados, botón URGENTE | OE3 | Crear caso <2s; listar paginado; URGENTE crea en <30s |
| **Ingesta y Clasificación** | Upload PDF/JPG/PNG/DOCX hasta 50MB, drag&drop, clasificación automática por contenido, renombrado descriptivo, confirmación/corrección | OE4 | 20 docs prueba clasificados ≥90%; renombrado 100% genéricos |
| **Desduplicación y Versiones** | Comparación por similitud >85% (usuario decide), historial cronológico v1-vN, descarga de cualquier versión, diff lado a lado | OE4 | Dedup alerta >85%; versionado inmutable; diff OK |
| **Búsqueda Semántica RAG** | Búsqueda por significado (no solo keywords), tolera errores y sinónimos, < 3 seg, precisión ≥85% | OE4 | p95 <3s (1000 docs); precisión ≥85% dataset 100 queries |
| **Consulta Conversacional** | Chat visible en todas las pantallas, español coloquial, respuestas con citación de fuentes, memoria conversacional | OE4 | Respuestas con citas 100%; memoria 10 turnos |
| **Alertas Proactivas** | Audiencias: 48h/24h/2h. Vencimientos órdenes protección: 7 días y 48h urgente. Resumen diario 8AM | OE3 | Alertas en ventana ±10 min; resumen entregado |
| **Gestión de Audiencias** | Registro, checklist automático, vista tenidos/faltantes, agregado manual, paquete PDF consolidado | OE3 | Checklist auto 100%; paquete PDF con preview |
| **Compartición Segura** | Enlaces temporales (1h/24h/72h, single-use), solo-lectura con watermark, revocación inmediata con log | OE3 | Expiración exacta; single-use; revoke <1s |
| **Interfaz Web Responsive** | Web responsive, <5 clics, labels descriptivos, impresión directa, exportación ZIP por caso | OE3 | <5 clics validado; usabilidad <5 min sin ayuda |
| **Notificaciones** | In-app (campana + contador + agrupadas) + email resumen semanal lunes 8AM | OE3 | Agrupadas y marcables; email sin datos sensibles |
| **Dashboard y Reportes** | KPIs: casos activos, docs del mes, audiencias próximas, alertas activas. Reporte de auditoría | OE3 | KPIs actualizados; export auditoría por rango |
| **Documentación y Capacitación** | Manual Técnico, Manual Usuario, Manual Despliegue; 2 sesiones (90m+60m) + videos | OE1-OE5 | PDFs entregados; sesiones grabadas |

#### 4.2. Alcance por Tipo de Caso

| Tipo | Cobertura | Nivel de servicio |
|------|-----------|-------------------|
| Asistencia Familiar (alimentos) | Completa | Clasificación auto, búsqueda, alertas 48h, compartición |
| Patria Potestad (guarda/custodia) | Completa | Como anterior + checklist audiencia específico |
| Violencia Doméstica y Protección a Víctimas | Completa + seguridad reforzada | Cifrado campo, RBAC restringido, alertas críticas |
| Otros (divorcio, violencia intrafamiliar) | Parcial — registro y búsqueda básica | CRUD y búsqueda; sin checklist específico |

#### 4.3. Alcance por Usuario

| Rol | Permisos | No puede | Auditable |
|-----|----------|----------|-----------|
| **Abogado** | CRUD de sus casos, carga/búsqueda/alertas/compartición/chat | Ver casos no asignados, gestionar usuarios | Sí |
| **Asistente** | Carga documentos, búsqueda, consulta de casos asignados | Eliminar documentos, cambiar roles | Sí |
| **Administrador** | Gestión usuarios/roles, auditoría completa, configuración | Eliminar logs auditoría (inmutable) | Sí |

---

### 5. REQUERIMIENTOS FUNCIONALES

La consultora deberá implementar los siguientes requerimientos funcionales:

| ID | Funcionalidad | Prioridad | Épica |
|----|---------------|-----------|-------|
| **RF-01** | Login seguro (12 caracteres, bloqueo 3 intentos, 30 min expiración) | Alta | Auth |
| **RF-02** | Control acceso por roles (admin/abogado/asistente) + visibilidad por caso asignado | Alta | Auth |
| **RF-03** | Cifrado en reposo + campo (víctimas) + sin claves en texto plano | Alta | Auth |
| **RF-04** | Registro auditoría inmutable (usuario, fecha, acción, IP) + reporte por rango | Alta | Auth |
| **RF-05** | Crear caso (nombre cliente + tipo obligatorio, ID único, visible inmediato) | Alta | Casos |
| **RF-06** | Listar casos activos (filtros tipo/estado/nombre, orden próxima audiencia, contador docs) | Alta | Casos |
| **RF-07** | Cambiar estado caso (activo/en audiencia/cerrado-archivable-reabrible) + historial | Media | Casos |
| **RF-08** | Subir documento PDF/JPG/PNG/DOCX 50MB + barra progreso + confirmación | Alta | Carga |
| **RF-09** | Clasificación automática por contenido (7 tipos documentales) + confirmación usuario + renombrado | Crítica | Carga |
| **RF-10** | Detección duplicados por similitud >85% → alerta → usuario decide | Alta | Versiones |
| **RF-11** | Control versiones (lista cronológica, fecha/autor, descarga cualquiera, diff lado a lado) | Alta | Versiones |
| **RF-12** | Búsqueda semántica (significado, tolera errores/sinónimos, <3s, ≥85% precisión) | Crítica | Búsqueda |
| **RF-13** | Consulta lenguaje natural (español coloquial, responde citando fuente) | Crítica | Búsqueda |
| **RF-14** | Chat conversacional (visible siempre, coloquial, fuentes citadas, contexto) | Alta | Búsqueda |
| **RF-15** | Alertas audiencia (48h/24h/2h con fecha/juzgado/caso/docs requeridos) | Alta | Alertas |
| **RF-16** | Alertas vencimiento medidas protección (7d + 48h urgente) | Crítica | Alertas |
| **RF-17** | Resumen diario 8AM (audiencias, faltantes, alertas) configurable | Media | Alertas |
| **RF-18** | Generar enlace temporal (1h/24h/72h, single-use, log acceso) | Alta | Compartir |
| **RF-19** | Compartir solo-lectura (sin descarga, watermark nombre/fecha) | Alta | Compartir |
| **RF-20** | Revocar enlace (inmediato, notifica destinatario, log auditoría) | Alta | Compartir |
| **RF-21** | Registrar audiencia (caso obligatorio, fecha/hora/juzgado/tipo, checklist auto) | Alta | Audiencias |
| **RF-22** | Verificar docs faltantes (tenidos/faltantes en rojo, en trámite, manual) | Alta | Audiencias |
| **RF-23** | Generar paquete PDF consolidado (orden checklist, portada caso, preview peso) | Media | Audiencias |
| **RF-24** | Interfaz web responsive (celular/tablet/desktop, <5 clics, labels+tooltips) | Alta | UI |
| **RF-25** | Modo caso urgente (botón URGENTE visible, mínimos campos, subida inmediata) | Alta | UI |
| **RF-26** | Notificaciones in-app (campana + contador + agrupadas + marcar leída) | Media | Notif |
| **RF-27** | Notificación email resumen semanal lunes 8AM (sin datos sensibles) | Media | Notif |
| **RF-28** | Imprimir documento (botón visible, diálogo navegador, tamaño legal, encabezado) | Media | Export |
| **RF-29** | Exportar caso completo ZIP (carpetas por tipo, índice, contraseña opcional) | Baja | Export |

**Prioridades:** Crítica 5 | Alta 17 | Media 6 | Baja 1 = **29 RF**

---

### 6. METODOLOGÍA DE TRABAJO

Para la ejecución del presente proyecto, **solicitamos** que la consultora adjudicada adopte una metodología ágil de trabajo, específicamente el marco **Scrum**, complementado con prácticas de **Kanban** para la gestión visual del flujo de tareas. Esta preferencia responde a nuestra necesidad de asegurar entregas incrementales, retroalimentación continua por parte del Buffet de Asistencia Familiar y adaptabilidad ante requerimientos emergentes propios del contexto jurídico y social en el que operamos.

La propuesta técnica deberá incluir un plan de trabajo estructurado en **sprints de dos semanas de duración**, con ceremonias regulares de planificación, seguimiento diario, revisión de avances y retrospectiva. Al cierre de cada sprint, la consultora deberá realizar una **demostración funcional del incremento desarrollado**, la cual servirá como instancia formal de validación por parte de nuestro equipo.

Los entregables deberán estar alineados con los hitos definidos en la Sección 7 del presente documento, y cualquier ajuste al alcance, priorización del backlog o cronograma deberá ser gestionado en coordinación con el Product Owner designado por el Buffet. La metodología propuesta será considerada como parte de los criterios de evaluación de la propuesta técnica.

---

### 7. ENTREGABLES

La consultora deberá entregar los siguientes productos:

| Código | Entregable | OE | Semana | Criterio de aceptación |
|--------|------------|----|--------|---------------------|
| **E1** | Plan de trabajo y cronograma confirmado | OE1 | 1-2 | Aprobación del Buffet |
| **E2** | Wireframes + mockups + design system + arquitectura validada | OE2 | 2 | Aprobación diseño y arquitectura |
| **E3** | MVP Auth + Casos (CRUD, RBAC, listar, cambio estado) | OE3 | 4 | CRUD funcional + tests auth |
| **E4** | Ingesta documentos + clasificación automática + desduplicación | OE4 | 6 | Docs indexados, clasificación ≥90% |
| **E5** | Motor RAG completo (búsqueda semántica, consulta NL, chat) | OE4 | 8 | Precisión ≥85%, chat con fuentes |
| **E6** | Alertas + Gestión audiencias (registro, checklist, paquete PDF) | OE3 | 10 | Alertas 48h/7d operativas |
| **E7** | Versiones + Compartición segura + auditoría | OE3 | 12 | Enlaces temporales + revocación + logs |
| **E8** | PWA/mobile + impresión + exportación ZIP + notificaciones | OE3 | 14 | <5 clics, export ZIP, notifs |
| **E9** | Plataforma completa en staging + QA integral | OE4 | 14-15 | QA superada, pruebas aprobadas |
| **E10** | Despliegue producción + dominio + SSL | OE5 | 16 | Prod operativo |
| **E11** | Documentación: Manual Técnico, Usuario, Despliegue | OE5 | 16 | PDFs entregados |
| **E12** | Capacitación (2 sesiones) + videos + soporte post-lanzamiento | OE1-OE5 | 16-20 | Sesiones realizadas + material |

---

### 8. PERFIL DEL EQUIPO CONSULTOR

La consultora deberá asignar un equipo con el siguiente perfil mínimo:

| Rol | Cant. | Experiencia mínima | Responsabilidades |
|-----|-------|-------------------|-------------------|
| Project Manager / Scrum Master | 1 | 2+ años liderando proyectos digitales | Planificación, comunicación, gestión backlog |
| Diseñador UX/UI | 1 | 2+ años producto digital + design systems | Wireframes, mockups, prototipos, usabilidad |
| Tech Lead Fullstack / RAG Engineer | 1 | 3+ años Python/Node + LangChain + vector DBs | Arquitectura, RAG, backend, seguridad |
| Frontend Developer | 1 | 2+ años React/Vite/AntD | SPA, responsive, integración API/RAG |
| QA Tester | 1 (compartido) | 1+ año testing | Unit/E2E/seguridad/perf |

**Valoraremos especialmente:**
- Experiencia con legaltech o sistemas de gestión documental jurídica.
- Manejo de datos sensibles y confidenciales.
- Experiencia con ONG o sector social.
- Precios solidarios por el carácter gratuito de nuestros servicios.

---

### 9. FORMA DE PAGO


| Hito | % referencial | Entregable que habilita | Condición de pago |
|------|---------------|-------------------------|-------------------|
| H1 Firma + Plan aprobado | 20% | E1 Plan + E2 Diseño + Arquitectura | Habilita inicio del servicio |
| H2 Ingesta inteligente completada | 15% | E3 Auth+Casos + E4 Ingesta+clasificación | Mantiene habilitación |
| H3 RAG + Audiencias completadas | 25% | E5 RAG+chat + E6 Alertas+audiencias | Mantiene habilitación |
| H4 QA staging superada | 15% | E7 Versiones+compartición + E8 pulido + E9 QA | Mantiene habilitación |
| H5 Despliegue prod. + documentación + capacitación | 25% | E10 Prod + E11 docs + E12 capacitación | Consolida uso en producción + 60 días garantía |
| **Total** | **100%** | **E1–E12** | — |



---

### 10. PROPIEDAD INTELECTUAL

La **propiedad intelectual, patrimonial y moral** sobre todo código fuente, documentación, diseños, vectores, modelos y materiales producidos por la consultora **permanecerá en titularidad exclusiva de la CONSULTORA**. No habrá cesión, venta ni transferencia de propiedad al BUFFET.

Lo que se otorga al BUFFET es una **licencia de uso (modalidad de "alquiler" del servicio)**, de carácter **no exclusiva, intransferible, revocable y temporal**, limitada al uso del sistema desplegado para los fines del Buffet mientras el "alquiler" se mantenga vigente y al día en pagos.

**Incluye:**
- Derecho a usar la plataforma.
- Cargar/consultar sus propios datos.
- Exportar sus datos cargados (documentos y metadatos propios).

**No incluye:**
- Recibir, copiar, modificar, sublicenciar, revender ni redistribuir el código fuente.
- Desplegar copias fuera de la infraestructura autorizada.

Al finalizar o resolverse el "alquiler", la licencia se extinguirá. La consultora facilitará la **devolución/exportación de los datos del BUFFET** en formato ZIP/Excel durante 15 días, sin entrega de código fuente. La consultora podrá mencionar el proyecto en su portafolio previa autorización escrita del BUFFET.

---

### 11. CONFIDENCIALIDAD Y PROTECCIÓN DE DATOS

La consultora deberá mantener confidencialidad estricta sobre datos de víctimas, menores, familias, estrategias legales y cualquier información sensible, durante el proyecto y **mínimo 3 años post-contrato**.

**Medidas que exigimos:**
- Cifrado en reposo y tránsito.
- Encriptación a nivel de campo (direcciones víctimas).
- Control de acceso por roles.
- Auditoría inmutable.
- Anonimización en logs.
- Prohibición de entrenar LLMs externos con datos del buffet sin consentimiento explícito y anonimizado.

---

### 12. GARANTÍA Y SOPORTE

- **Garantía:** 60 días post-producción (E10) — corrección de bugs/fallos atribuibles al desarrollo sin costo (excluye modificaciones no autorizadas, fallos de infraestructura de terceros, mal uso, fuerza mayor).
- **Soporte post-garantía:** Contratación mensual opcional (mantenimiento, re-indexado, actualizaciones).

---

### 13. CRITERIOS DE EVALUACIÓN DE PROPUESTAS

Evaluaremos las propuestas según los siguientes criterios:

| Criterio | Peso |
|----------|------|
| Experiencia equipo + portafolio RAG / legaltech | 30% |
| Propuesta técnica (arquitectura + RAG + despliegue) | 30% |
| Propuesta económica (costo-beneficio) | 20% |
| Cronograma y metodología (8 sprints, demos) | 15% |
| Experiencia ONG / manejo datos sensibles | 5% |

---

### 14. CONDICIONES DE PRESENTACIÓN

- Envío de propuestas a: **[buffet.asistencia.familiar@gmail.com]** — asunto: **`PROPUESTA KM RAG — [Nombre consultora]`**
- Fecha límite: **[dd/mm/aaaa]**
- Consultas: mismo correo hasta **[dd/mm/aaaa]**
- Se valorarán precios solidarios por el carácter gratuito de nuestros servicios.
- El Buffet se reserva el derecho de declarar desierta la convocatoria si ninguna propuesta cumple los requisitos.

---

### 15. CONTACTO

| | |
|---|---|
| **Organización** | Buffet de Asistencia Familiar |
| **Responsable proyecto** | [Nombre responsable Buffet] |
| **Correo** | [buffet.asistencia.familiar@gmail.com] |
| **Teléfono / WhatsApp** | [+591 X XXXXXXXX] |
| **Dirección** | [Dirección, La Paz, Bolivia] |

---

