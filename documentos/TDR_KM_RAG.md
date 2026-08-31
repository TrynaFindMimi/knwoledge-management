# TÉRMINOS DE REFERENCIA (TDR)

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG — BUFFET DE ABOGADOS DE ASISTENCIA FAMILIAR

---

### ÍNDICE

1. [Información General](#1-información-general)
2. [Antecedentes](#2-antecedentes)
3. [Objetivos](#3-objetivos)
4. [Alcance del Proyecto](#4-alcance-del-proyecto)
5. [Límites del Proyecto](#5-límites-del-proyecto-no-incluye)
6. [Requerimientos Funcionales](#6-requerimientos-funcionales)
7. [Requerimientos No Funcionales](#7-requerimientos-no-funcionales)
8. [Arquitectura y Stack Tecnológico](#8-arquitectura-y-stack-tecnológico-propuesto)
9. [Uso Detallado de Herramientas](#9-uso-detallado-de-herramientas)
10. [Metodología de Trabajo](#10-metodología-de-trabajo)
11. [Gestión de Riesgos](#11-gestión-de-riesgos) — resumen + detalle completo en `Gestion_Riesgos_KM_RAG.md` (29 riesgos T/I/O/S/F) a `Gestion_Riesgos_KM_RAG.md`
12. [Herramientas de Seguridad — SSL/TLS y Protección](#12-herramientas-de-seguridad--ssltls-y-protección)
13. [Entregables](#13-entregables)
14. [Perfil del Equipo](#14-perfil-del-equipo)
15. [Forma de Pago](#15-forma-de-pago)
16. [Propiedad Intelectual](#16-propiedad-intelectual)
17. [Confidencialidad y Protección de Datos](#17-confidencialidad-y-protección-de-datos)
18. [Garantía y Soporte](#18-garantía-y-soporte)
19. [Criterios de Evaluación](#19-criterios-de-evaluación-de-propuestas)
20. [Condiciones de Presentación](#20-condiciones-de-presentación)
21. [Contacto](#21-contacto)
22. [Carta de Proforma y Límites Presupuestarios](#22-carta-de-proforma-y-límites-presupuestarios)
23. [Anexos](#23-anexos)

---

### EQUIPO DE TRABAJO

| # | Nombre | Rol |
|---|--------|-----|
| 1 | Mariana del Arroyo | Project Manager / Product Owner |
| 2 | Nahomi Humerez | UX/UI Designer |
| 3 | Santiago Acha | Tech Lead Fullstack — RAG / Backend |
| 4 | Jorge Saenz | Frontend Developer — QA |

---

### 1. INFORMACIÓN GENERAL

| Campo | Descripción |
|-------|-------------|
| **Proyecto** | Desarrollo e implementación de Sistema de Gestión de Conocimiento (KM) web con motor RAG para sistematizar archivos y documentos legales oficiales de abogados de derecho familiar |
| **Organización** | Buffet de Asistencia Familiar — Servicios legales gratuitos (Asistencia Familiar, Patria Potestad, Violencia Doméstica) |
| **Ubicación** | La Paz, Bolivia |
| **Tipo de organización** | Buffet jurídico de asistencia gratuita — atención a familias en situación de vulnerabilidad |
| **Moneda de referencia** | Bolivianos (Bs.) |
| **Duración estimada** | 16 semanas (4 meses) — 8 sprints de 2 semanas |
| **Metodología** | Scrum + Kanban — Sprints de 2 semanas, daily 15 min, demo + retrospectiva cada sprint |
| **Fecha TDR** | 27/08/2026 |
| **Versión** | 2.0 — Stack React/AntD/Vite + Railway RAG |

---

### 2. ANTECEDENTES Y ANALISIS DE LA PROBLEMATICA

El Buffet de Asistencia Familiar brinda servicios legales gratuitos en derecho de familia (asistencia familiar, patria potestad, violencia domestica y proteccion a victimas). Atiende a mas de 50 casos activos simultaneos con expedientes fisicos y digitales desorganizados, en un contexto donde la perdida de un documento afecta directamente a familias vulnerables y a la reparacion de pensiones para menores.

#### 2.1 Problematica cuantificada y evidencias de campo

Investigacion mediante 3 entrevistas semiestructuradas anonimas (52, 48 y 35 min) a abogados con 12, 8 y 3 anios de experiencia, complementada con diagrama Ishikawa (`diagramas/diagrama ishikawa.svg` y `diagramas/bpwin/BPWin_A0_Contexto.svg`) y modelado BPWin de 7 procesos:

| Indicador linea base | Valor actual | Fuente | Impacto |
|----------------------|--------------|--------|---------|
| Tiempo busqueda documental | 4-6 horas/semana por abogado (208-312 h/anio) | Entrevista 01:32, 02, 03; Ciclo 1.1 | Menor tiempo de atencion a clientes vulnerables |
| Volumen casos activos | 50+ casos simultaneos, 40-50 docs por caso | Entrevista 02 | Carpetas sin sub-organizacion, duplicados |
| Documentos escaneados sin clasificacion | 200 archivos (`scan001.jpg`, `ACUERDO_FINAL2.pdf`) sin convencion de nombres | Entrevista 01:40 | Archivos inlocalizables, 90% mal etiquetados |
| Perdida en audiencia | 1 caso documentado (Juzgado 3ro, 15/07) convenio no encontrado, prorroga 24h | Entrevista 01:32 | Percepcion de irresponsabilidad, perjuicio a cliente |
| Versionado fallido | Impresion de demanda obsoleta presentada ante jueza | Entrevista 02 | Riesgo procesal, retrabajo |
| Seguridad | Contrasenas `123456`/`abogada2024`, direcciones victimas sin cifrar en laptop, envio por WhatsApp sin proteccion | Entrevista 01:44, 03 | Exposicion datos victimas/menores, incumplimiento normativa datos personales |
| Dependencia persona clave | Asistente Mariela unica que conoce ubicacion; si falta, paralisis total | Entrevista 02 | Riesgo operativo critico, bus factor =1 |
| Capacidad digitalizacion | 200 docs escaneados en 2 anios sin indice, duplicados sin deteccion | Entrevista 01:40 | Deuda tecnica acumulada |

Sintesis: el buffet opera con gestion artesanal (folder manila + archivador + carpeta `Escaneos 2024` + Drive sin criterio) que no escala a 5000 docs proyectados ni a acceso movil en juzgados (RF-24).

#### 2.2 Analisis causal (Ishikawa y 5 Porques)

Diagrama Ishikawa (24 causas raiz en 6 categorias: Tecnologia, Personas, Procesos, Informacion, Seguridad, Organizacion) disponible en `diagramas/diagrama ishikawa.svg`. Causas criticas: falta de busqueda semantica, ausencia de clasificacion automatica, sin control de versiones, RBAC inexistente, sin alertas proactivas, dependencia del conocimiento tacito de una persona.

Analisis 5 Porques para causa transversal `Dependencia de Mariela`:
1. Por que solo Mariela ubica archivos? Porque no hay clasificacion automatica por contenido.
2. Por que no hay clasificacion? Porque los nombres son genericos (`scan001.jpg`) y el proceso es manual.
3. Por que es manual? Porque no existe pipeline de embeddings y LLM que lea contenido.
4. Por que no existe? Porque no hay sistema KM con RAG.
5. Por que no hay KM? Porque no se ha sistematizado el conocimiento documental.

Mismo ejercicio aplica a `Perdida en audiencia` (causa: busqueda por keywords exacta sin tolerancia a errores/sinonimos) y `Riesgo seguridad` (causa: sin AES-256/TLS/RBAC/auditoria).

Arbol de problemas -> Arbol de objetivos: cada causa se convierte en objetivo especifico (ej causa `busqueda exacta` -> OE1 motor RAG <3s >=85%; causa `etiquetado manual` -> OE2 clasificacion auto; causa `plazos vencidos` -> OE3 alertas 48h/7d).

#### 2.3 Stakeholders y necesidades diferenciadas

| Stakeholder | Rol | Necesidad principal | Criterio de exito | Fuente |
|-------------|-----|---------------------|-------------------|--------|
| Abogado 12 anios (asistencia familiar) | Usuario primario | Escribir `Mamani alimentos` y recuperar todo ordenado aunque escriba `conbenio` | Busqueda <30 seg, tolera errores (RF-12) | Entrevista 01:48 |
| Abogada 8 anios (patria potestad) | Usuaria frecuente | No volver a imprimir version vieja de demanda | Versionado v1..vN con diff (RF-11) | Entrevista 02 |
| Abogada 3 anios (violencia domestica) | Casos urgentes | Crear caso en <1 min y subir docs inmediato, datos victima cifrados | Boton URGENTE + AES campo (RF-25, RF-03) | Entrevista 03 |
| Asistente Mariela | Persona clave actual | Dejar de ser cuello de botella, delegar busqueda | 100% docs clasificables sin su intervencion (RF-09) | Entrevista 02 |
| Administrador Buffet | Governance | Trazabilidad quien/que/cuando/IP, gestion roles | Auditoria inmutable + RBAC (RF-04, RF-02) | TDR 4.3 |
| Victima/menor | Beneficiario final | Proteccion datos, medida proteccion no vencida | Cifrado campo + alerta 7d/48h (RF-03, RF-16) | Entrevista 03 |

Necesidad transversal: acceso movil en juzgados sin cargar folders, <5 clics, sin capacitacion de 3 dias (RNF-11).

Se requiere un Sistema de Gestion de Conocimiento (KM) que sistematice archivos, permita busqueda semantica inteligente tolerante a errores/sinonimos, clasificacion automatica por contenido, control de versiones con diff, alertas proactivas 48h/7d, comparticion segura JWT con watermark y revocacion, y plataforma web responsive segura (AES-256, TLS 1.3, RBAC chunk-level, auditoria inmutable), desplegable en Vercel+Railway (alternativas Hostinger/Local cotizadas).

---

### 3. OBJETIVOS

#### 3.1. Objetivo General (SMART)

Desarrollar e implementar un Sistema de Gestion de Conocimiento (KM) web basado en RAG que permita sistematizar los archivos y documentos legales oficiales para abogados de ley familiar, **reduciendo el tiempo de recuperacion de 4-6 horas/semana a <30 segundos por consulta, alcanzando precision >=85% en busqueda semantica, garantizando 0 filtraciones mediante cifrado AES-256/TLS 1.3/RBAC y trazabilidad 100% de accesos, y operando con 99.5% uptime en infraestructura Vercel+Railway (alternativas Hostinger/Local cotizadas) en 16 semanas (8 sprints + 60 dias garantia).**

Criterio de aceptacion del objetivo general: validacion en staging con 1000 docs y 10 concurrentes (p95 busqueda <3s, operaciones <2s), auditoria inmutable sin huecos y prueba de usabilidad con 3 abogados no tecnicos <5 min sin ayuda (RNF-09/RNF-11).

#### 3.2. Objetivos Especificos (verbo medible + indicador + entregable + RF)

| Codigo | Objetivo especifico (SMART) | RF Asociados | Indicador verificable | Entregable | Fuente problema |
|--------|-----------------------------|--------------|-----------------------|------------|-----------------|
| **OE1** | **Analizar** requerimientos de recuperacion juridica y **disenar** motor de busqueda semantica con RAG tolerante a errores ortograficos y sinonimos juridicos bolivianos (`conbenio`->`convenio`, `contestacion`=`respuesta a demanda`) | RF-12, RF-13, RF-14, RF-24 | p95 busqueda <3s con 1000 docs/10 conc.; precision >=85% en dataset 100 queries; citacion con fuente doc/fecha/caso en 100% respuestas | E5 Motor RAG + E9 QA RAG | 4-6h/semana + busqueda exacta fallida (Entrevista 01:48) |
| **OE2** | **Disenar** modulo de clasificacion y organizacion automatica por caso y tipo documental sin etiquetado manual, con renombrado descriptivo de `scan001.jpg` | RF-05, RF-06, RF-08, RF-09 | Clasificacion auto >=90% en 20 docs prueba; 0 campos obligatorios extra para clasificar | E3 CRUD casos + E4 Ingesta inteligente | `scan001.jpg` + dependencia Mariela (Entrevista 01:40, 02) |
| **OE3** | **Desarrollar** sistema de alertas proactivas e inteligentes de vencimientos (ordenes proteccion 7d/48h) y audiencias (48h/24h/2h) con resumen diario 8AM | RF-15, RF-16, RF-17, RF-21, RF-22, RF-27 | 100% audiencias con checklist auto; alertas enviadas en ventana +/-10 min; 0 vencimientos no notificados | E6 Alertas+Audiencias + cron BullMQ | Perdida documentos en audiencia + plazos vencidos (Entrevista 01:32) |
| **OE4** | **Implementar** plataforma web segura (AES-256 reposo y campo, TLS 1.3 transito, JWT 30m, bcrypt 12, RBAC roles + chunk-level), movil y accesible (<5 clics, WCAG AA) | RF-01, RF-02, RF-03, RF-04, RF-24, RF-25 | SSL Labs A+; 0 high en ZAP; bloqueo tras 3 intentos verificado; test permisos cruzados 100% pass (abogado solo ve asignados, asistente no elimina) | E3 Auth+RBAC + E7 Auditoria + E8 PWA | Contrasenas 123456 + datos victimas sin cifrar (Entrevista 01:44, 03) |
| **OE5** | **Implementar** mecanismo de control de versiones (v1..vN, diff lado a lado, descarga cualquier version), desduplicacion por embeddings >85% y auditoria inmutable (sin UPDATE/DELETE) | RF-10, RF-11, RF-04, RF-29 | Dedup alerta >85% con decision usuario 100%; versionado inmutable (intento DELETE bloqueado); hash SHA-256 por version | E4 Dedup + E7 Versiones + E11 Manual Tecnico | Demanda obsoleta presentada (Entrevista 02) |
| **OE6** | **Validar** sistema de comparticion segura con enlaces temporales JWT (1h/24h/72h, single-use), modo solo-lectura con watermark y anti-captura best-effort, revocacion inmediata y log acceso (quien/cuando/IP) | RF-18, RF-19, RF-20 | Expiracion exacta por duracion; single-use verificado; revocacion <1s con notificacion; watermark con nombre/fecha visible en 100% previews | E7 Comparticion + E9 QA seguridad | Envio por WhatsApp sin proteccion (Entrevista 03) |

Cada OE es trazable a entrevista, a RF/RNF y a entregable E. La evaluacion de cumplimiento se realiza en Sprint 7 (QA integral) y Sprint 8 (prod) segun `Plan_Proyecto_Cronograma_KM_RAG.md` y `Gestion_Riesgos_KM_RAG.md`.

#### 3.3 Matriz de coherencia OE -> RF -> Entregable -> Metrica

| OE | RF clave | Entregable E | Metrica de exito |
|----|----------|--------------|------------------|
| OE1 | RF-12/13/14 | E5, E9 | p95 <3s, precision >=85%, citas 100% |
| OE2 | RF-05/08/09 | E3, E4 | clasificacion >=90%, renombrado 100% genericos |
| OE3 | RF-15/16/21 | E6 | alertas 48h/7d en ventana, checklist auto 100% |
| OE4 | RF-01/02/03/04/24 | E3, E7, E8 | A+ SSL, 0 high ZAP, <5 clics, <5 min usabilidad |
| OE5 | RF-10/11/04 | E4, E7 | dedup >85%, versionado inmutable, diff OK |
| OE6 | RF-18/19/20 | E7 | JWT expira, single-use, revoke <1s, watermark |

---

### 4. ALCANCE DEL PROYECTO

#### 4.1. Incluye (con criterio de aceptacion por modulo)

| Modulo | Descripcion | OE | Criterio de aceptacion | Entregable |
|--------|-------------|----|------------------------|------------|
| **Autenticacion y Seguridad** | Login email+password (12 carac. may/min/num/simb), bloqueo 3 intentos, expiracion 30 min inactividad, TLS 1.3, AES-256 reposo + cifrado a nivel de campo (direcciones victimas), RBAC (admin/abogado/asistente) + permisos a nivel de documento/chunk, auditoria inmutable (usuario, fecha, accion, IP) | OE4 | Prueba 4 intentos bloquea; test permisos cruzados pass; SSL Labs A+ | E3, E7 |
| **Gestion de Casos** | CRUD casos (ID unico, tipo: Asistencia Familiar / Patria Potestad / Violencia Domestica / Otro), listado con filtros (tipo, estado, nombre), orden por proxima audiencia, estados (activo/en audiencia/cerrado-archivado), boton URGENTE (violencia domestica: minimos campos + subida inmediata) | OE2 | Crear caso <2s; listar paginado; URGENTE crea en <30s | E3 |
| **Ingesta y Clasificacion** | Upload PDF/JPG/PNG/DOCX hasta 50MB, drag&drop + barra progreso, clasificacion automatica por contenido (demanda, contestacion, informe psicologico, certificado medico, orden proteccion, comprobante pago, otro), renombrado descriptivo si archivo es `scan001.jpg`, confirmacion/correccion por usuario | OE2 | 20 docs prueba clasificados >=90%; renombrado 100% genericos | E4 |
| **Desduplicacion y Versiones** | Comparacion por embeddings antes de guardar; alerta si similitud >85% (usuario decide duplicado vs version nueva), historial cronologico v1,v2,v3 con fecha/autor, descarga de cualquier version, diff lado a lado de dos versiones | OE5 | Dedup alerta >85% 100% casos; versionado inmutable; diff OK | E4, E7 |
| **Busqueda Semantica RAG** | Busqueda semantica (no solo keywords), tolera errores (`conbenio`->`convenio`) y sinonimos legales (`contestacion`=`respuesta a demanda`), <3 seg, precision >=85%, <2 seg operaciones generales | OE1 | p95 <3s (1000 docs, 10 conc.), precision >=85% dataset 100 queries | E5, E9 |
| **Consulta Conversacional** | Chat visible en todas las pantallas, preguntas en espanol coloquial/boliviano, respuestas con citacion de fuentes (documento, fecha, caso), memoria conversacional (`y que mas de Mamani?`), <3 seg | OE1 | Respuestas con citas 100%; memoria 10 turnos | E5 |
| **Alertas Proactivas** | Audiencias: 48h (preparacion), 24h (faltantes), 2h (repaso). Vencimientos ordenes proteccion: 7 dias y 48h urgente. Resumen diario 8AM (audiencias del dia, faltantes, alertas). Email + in-app (campana con contador, agrupadas) | OE3 | Alertas en ventana +/-10 min; resumen 8AM entregado | E6 |
| **Gestion de Audiencias** | Registro (fecha/hora/juzgado/tipo) asociado a caso, generacion automatica de checklist de documentos requeridos, vista tenidos/faltantes (faltantes en rojo, en tramite), agregado manual de requisitos, paquete PDF consolidado ordenado + portada | OE3 | Checklist auto 100% audiencias; paquete PDF con peso preview | E6 |
| **Comparticion Segura** | Enlaces JWT firmados, duracion configurable 1h/24h/72h, single-use por destinatario, registro acceso (quien/cuando/donde), modo solo-lectura (sin descarga, marca de agua con nombre/fecha, best-effort anti-captura), revocacion inmediata + notificacion + log | OE6 | Expiracion exacta; single-use; revoke <1s + notif | E7 |
| **Interfaz Web Responsive** | Web responsive (desktop/tablet/celular), <5 clics a cualquier funcion, labels descriptivos + tooltips, consistencia visual (guia de estilos), modo urgente accesible, impresion directa (dialogo navegador, tamano legal, encabezado con datos caso/fecha), exportacion ZIP por caso (carpetas por tipo, indice, nombres descriptivos, opcional ZIP con contrasena) | OE4 | <5 clics validado; usabilidad 3 abogados <5 min sin ayuda | E8 |
| **Notificaciones** | In-app (campana) + email resumen semanal lunes 8AM (casos activos, docs subidos, audiencias, alertas), configurable, sin contenido sensible en email | OE3 | Agrupadas y marcables leidas; email sin datos sensibles | E8 |
| **Dashboard y Reportes** | KPIs: casos activos, docs del mes, audiencias proximas, alertas activas. Graficos por tipo de caso. Reporte de auditoria por rango fechas | OE4 | KPIs actualizados realtime; export auditoria Excel por rango | E3, E7 |
| **Documentacion y Capacitacion** | Manual Tecnico (arquitectura, APIs, RAG, versiones, herramientas), Manual Usuario, Manual Despliegue, troubleshooting; 2 sesiones (90m+60m) + videos tutoriales | Todos | PDFs entregados; sesiones grabadas | E11, E12 |

#### 4.2. Alcance por Tipo de Caso (con nivel de servicio)

| Tipo | Cobertura | Nivel de servicio diferenciado |
|------|-----------|--------------------------------|
| Asistencia Familiar (alimentos) | Completa | Clasificacion auto, busqueda, alertas 48h, comparticion |
| Patria Potestad (guarda/custodia) | Completa | Como anterior + checklist audiencia especifico |
| Violencia Domestica y Proteccion a Victimas | Completa + seguridad reforzada | Cifrado a nivel de campo (RNF-02), RBAC chunk-level restringido, alertas criticas siempre, acceso solo roles autorizados |
| Otros (divorcio, violencia intrafamiliar) | Parcial — registro y busqueda basica | CRUD y busqueda; sin checklist especifico ni alertas automaticas de vencimiento |

#### 4.3. Alcance por Usuario (con matriz RACI simplificada)

| Rol | Permisos | No puede | Auditable |
|-----|----------|----------|-----------|
| **Abogado** | CRUD de sus casos, carga/busqueda/alertas/comparticion/chat, solo ve sus casos o asignados | Ver casos no asignados, gestionar usuarios | Si (RF-04) |
| **Asistente** | Carga documentos, busqueda, consulta de casos asignados, alertas lectura | Eliminar documentos, cambiar roles, ver auditoria completa | Si |
| **Administrador** | Gestion usuarios/roles, auditoria completa por rango, configuracion sistema, asigna roles, asigna casos | Eliminar logs auditoria (inmutable) | Si |

#### 4.4. Matriz Alcance vs Entregables E1-E12 (trazabilidad)

| OE | Alcance (modulo) | Entregable E | Semana | Verifica OE |
|----|------------------|--------------|--------|-------------|
| OE1 | Busqueda + Chat | E5 Motor RAG | S4 (8) | p95 <3s, precision >=85% |
| OE2 | Casos + Ingesta | E3, E4 | S2-3 (4-6) | clasificacion >=90% |
| OE3 | Alertas + Audiencias + Notifs | E6, E8 | S5 (10) + S7 (14) | alertas 48h/7d OK |
| OE4 | Auth + RBAC + Responsive + Dashboard | E3, E7, E8 | S2, S6, S7 | A+ SSL, <5 clics |
| OE5 | Versiones + Dedup + Auditoria | E4, E7 | S3, S6 | dedup >85%, inmutable |
| OE6 | Comparticion | E7 | S6 (12) | JWT single-use, watermark |
| Todos | Documentacion + QA + Prod | E9, E10, E11, E12 | S7-8 (14-16) | E2E + prod 99.5% |
| Transversal | Infra Vercel+Railway (principal) + alternativas Hostinger/Local | E10 + proformas INF-003/004/008/009 | S1, S8 | deploy + handover |

Cada OE esta cubierto por al menos 1 entregable con criterio de aceptacion medible (ver TDR Seccion 13 y Plan_Proyecto_Cronograma).

---

### 5. LIMITES DEL PROYECTO (NO INCLUYE) — con impacto y alternativa

| # | Limite | Justificacion detallada | Impacto si se incluyera | Alternativa / Fase futura |
|---|--------|------------------------|-------------------------|---------------------------|
| L1 | No reemplaza archivo fisico (carpetas manila) | Alcance es complemento digital; destruccion de archivo fisico requiere protocolo notarial y custodia legal fuera de 16 semanas | Retraso >4 semanas, riesgo legal por perdida original | Convivencia: cada caso mantiene respaldo fisico + digital; digital es indice buscable |
| L2 | No integracion con sistema judicial LEXIUS | Requiere convenio interinstitucional con Organo Judicial, VPN certificada y acceso a API no disponible para buffet gratuito | Bloqueo >8 semanas, dependencia externa no controlable | Export manual ZIP + paquete PDF para carga manual en LEXIUS; integracion en fase 2 con convenio |
| L3 | No redaccion automatica de demandas/escritos | TDR es gestion de conocimiento (almacenar/buscar/compartir), no generacion juridica; redactar implica responsabilidad profesional y validacion colegio abogados | Riesgo de mala praxis, hallucination LLM sin revisor | Se cita fuente pero no se redacta; plantilla vacia opcional en backlog futuro con revisor humano |
| L4 | No modulo de facturacion | Buffet es servicio gratuito (familias vulnerables), no hay proceso de cobro | Ambito no requerido, anadiria RF innecesarios | Fuera de alcance; si cambia modelo, nuevo RF en adenda |
| L5 | No abogado virtual / asesoria automatizada | Sistema gestiona conocimiento, no reemplaza consulta legal personalizada ni representa ante juez | Riesgo de consejo erroneo, responsabilidad penal | Chat responde citando documento fuente, no aconseja; derivacion a abogado humano |
| L6 | Solo espanol (Bolivia) | Sin soporte multi-idioma; embeddings y prompts calibrados para juridico boliviano y espanol coloquial (`y que mas de Mamani?`) | Duplicaria esfuerzo embeddings/LLM, no hay demanda en entrevistas | Fase futura: embeddings multilingues si buffet atiende poblacion quechua/aymara |
| L7 | No app movil nativa (iOS/Android) | Alcance es web responsive PWA-ready (responsive desktop/tablet/celular, instalable); nativa requeriria 2 codebases + stores | +6 semanas y +40% costo (ver COCOMO) | PWA con acceso desde celular en juzgados cumple RF-24; nativa en roadmap 2027 |
| L8 | No integracion WhatsApp/redes sociales | Comparticion por WhatsApp es insegura (sin cifrado, sin expiracion); se reemplaza por JWT 1h/24h/72h con watermark | Filtracion datos victimas | Enlaces temporales seguros single-use con log quien/cuando/IP (RF-18/19/20) |
| L9 | No migracion masiva de 200 docs historicos | Migracion masiva requeriria 2-3 semanas de clasificacion manual y validacion; se migra progresivo por cada abogado al usar sistema (20 casos prueba incluidos) | Retraso Sprint 3, arrastre deuda tecnica | Pre-carga 20 casos variados incluida; resto on-demand con clasificacion auto >=90% |
| L10 | No soporte 24/7 con personal dedicado | Equipo universitario, horario Lun-Vie 9-18 BT; uptime 99.5% (~4.4h downtime/mes) + garantia 60 dias cubre bugs, no help desk presencial | Costo +Bs 3000/mes por guardia | Monitoreo Sentry/UptimeRobot 24/7 automatico + SLA 48h critica/5d media en garantia |

**Textos legales / Paginas de politicas:** El equipo solo transcribe y publica Reglamento de Proteccion de Datos / Politica de Privacidad que el Buffet proporcione (texto plano validado por Buffet); no redacta contenido legal. El Buffet es unico responsable de la redaccion/aprobacion y de contar con consentimiento para datos de prueba anonimizados. Entregable: pagina estatica con markdown del Buffet, sin interpretacion juridica.

**Limites presupuestarios de infraestructura:** Dominio, hosting, LLM y vector DB mas alla de tiers gratuitos van por cuenta del Buffet segun `proformas/Carta_Entrega_Proformas_KM_RAG.md` (INF-001 a INF-SSL-001, INF-008 Hostinger, INF-009 Local). Ver TDR 22 y Contrato 3.3.

---

### 6. REQUERIMIENTOS FUNCIONALES


| ID | Funcionalidad | Prioridad | Épica |
|----|---------------|-----------|-------|
| **RF-01** | Login seguro (12 carac., bloqueo 3 intentos, 30 min expiración, TLS 1.3) | Alta | Auth |
| **RF-02** | Control acceso por roles (admin/abogado/asistente) + visibilidad por caso asignado | Alta | Auth |
| **RF-03** | Cifrado AES-256 reposo + campo (víctimas) + sin claves en texto plano | Alta | Auth |
| **RF-04** | Registro auditoría inmutable (usuario, fecha, acción, IP) + reporte por rango | Alta | Auth |
| **RF-05** | Crear caso (nombre cliente + tipo obligatorio, ID único, visible inmediato) | Alta | Casos |
| **RF-06** | Listar casos activos (filtros tipo/estado/nombre, orden próxima audiencia, contador docs) | Alta | Casos |
| **RF-07** | Cambiar estado caso (activo/en audiencia/cerrado-archivable-reabrible) + historial | Media | Casos |
| **RF-08** | Subir documento PDF/JPG/PNG/DOCX 50MB + barra progreso + confirmación | Alta | Carga |
| **RF-09** | **Clasificación automática por contenido** (contenido no nombre; tipos: demanda, contestación, informe psic., cert. médico, orden protección, comprobante pago, otro) + confirmación usuario + renombrado `scan001.jpg` | Crítica | Carga |
| **RF-10** | Detección duplicados por embeddings >85% → alerta → usuario decide → cancela o versiona | Alta | Versiones |
| **RF-11** | Control versiones (lista cronológica v1..., fecha/autor, descarga cualquiera, diff lado a lado) | Alta | Versiones |
| **RF-12** | Búsqueda semántica (significado, tolera errores/sinónimos, <3s, ≥85% precisión) | Crítica | Búsqueda |
| **RF-13** | Consulta lenguaje natural (español coloquial, responde citando fuente, <3s, conversacional) | Crítica | Búsqueda |
| **RF-14** | Chat conversacional (visible siempre, coloquial, fuentes citadas, mantiene contexto) | Alta | Búsqueda |
| **RF-15** | Alertas audiencia (48h/24h/2h con fecha/juzgado/caso/docs requeridos) | Alta | Alertas |
| **RF-16** | Alertas vencimiento medidas protección (detección automática, 7d + 48h urgente con víctima/caso/acción) | Crítica | Alertas |
| **RF-17** | Resumen diario 8AM (audiencias, faltantes, alertas) configurable + in-app + email | Media | Alertas |
| **RF-18** | Generar enlace temporal JWT (1h/24h/72h, single-use, log acceso) | Alta | Compartir |
| **RF-19** | Compartir solo-lectura (sin descarga, watermark nombre/fecha, anti-captura best-effort) | Alta | Compartir |
| **RF-20** | Revocar enlace (inmediato, notifica destinatario, log auditoría) | Alta | Compartir |
| **RF-21** | Registrar audiencia (caso obligatorio, fecha/hora/juzgado/tipo, checklist auto, calendario) | Alta | Audiencias |
| **RF-22** | Verificar docs faltantes (tenidos/faltantes en rojo, `en trámite`, agregar manualmente) | Alta | Audiencias |
| **RF-23** | Generar paquete PDF consolidado (orden checklist, portada caso, muestra peso antes de descargar) | Media | Audiencias |
| **RF-24** | Interfaz web responsive (celular/tablet/desktop, <5 clics, labels+tooltips) | Alta | UI |
| **RF-25** | Modo caso urgente (botón URGENTE visible, mínimos campos nombre+tipo violencia, subida inmediata) | Alta | UI |
| **RF-26** | Notificaciones in-app (campana + contador + agrupadas + marcar leída) | Media | Notif |
| **RF-27** | Notificación email resumen semanal lunes 8AM (casos/docs/audiencias/alertas, desactivable, sin datos sensibles) | Media | Notif |
| **RF-28** | Imprimir documento (botón visible, diálogo navegador, tamaño legal, encabezado caso/fecha) | Media | Export |
| **RF-29** | Exportar caso completo ZIP (carpetas por tipo, índice, nombres descriptivos, ZIP con contraseña opcional) | Baja | Export |

**Prioridades:** Crítica 5 | Alta 17 | Media 6 | Baja 1 = **29 RF**

---

### 7. REQUERIMIENTOS NO FUNCIONALES

| ID | Requerimiento | Descripción | Criterio de medición | Prioridad |
|----|---------------|-------------|----------------------|-----------|
| **RNF-01** | Cifrado tránsito | TLS 1.3 en toda comunicación | SSL Labs calificación A+ | Crítica |
| **RNF-02** | Cifrado reposo | AES-256 en BD, archivos, backups + columna víctima | Auditoría cifrado BD/filesystem | Crítica |
| **RNF-03** | Bloqueo intentos | Bloqueo tras 3 intentos fallidos | Prueba 4 intentos incorrectos | Alta |
| **RNF-04** | Sesión expiración | 30 min inactividad | Dejar 31 min sin interacción | Alta |
| **RNF-05** | RBAC | RBAC roles + chunk-level (asistente no elimina, abogado solo ve sus casos) | Test permisos cruzados | Alta |
| **RNF-06** | Auditoría | Logs inmutables no editables/eliminables por ningún usuario | Intento de borrado bloqueado | Alta |
| **RNF-07** | Tiempo búsqueda | Búsqueda semántica <3s | 1000 docs indexados, 10 concurrentes | Alta |
| **RNF-08** | Tiempo general | Crear caso/subir/cambiar estado <2s | Monitoreo prod. | Alta |
| **RNF-09** | Disponibilidad | 99.5% uptime (≤4.4h downtime/mes) | Uptime monitoring | Alta |
| **RNF-10** | Carga | 10 usuarios concurrentes sin degradación | Stress 15 usuarios mixtos | Media |
| **RNF-11** | Facilidad uso | Usuario no técnico completa tareas (<5 min) sin ayuda | Prueba 3 usuarios sin experiencia | Alta |
| **RNF-12** | Español | UI 100% español Bolivia | Revisión visual total | Alta |
| **RNF-13** | Consistencia | Guía estilos (colores/tipo/espaciado/botones) en 100% pantallas | Checklist guía | Media |
| **RNF-14** | Multi-dispositivo | Chrome/Firefox/Safari desktop+mobile | Test cross-browser | Alta |
| **RNF-15** | Sin instalación | Web sin plugins | Acceso solo navegador | Media |
| **RNF-16** | Escalabilidad docs | 100 docs/mes sin degradación | BD 5000 docs | Media |
| **RNF-17** | Escalabilidad usuarios | 5→20 usuarios sin cambio arquitectura | Doc. agregar usuarios | Baja |
| **RNF-18** | Doc. técnica | Arquitectura, API, despliegue, troubleshooting | Revisión aprobada | Media |
| **RNF-19** | Código doc. | Comentarios funciones complejas + README | Cobertura doc. >70% | Baja |

**Resumen:** Crítica 2 | Alta 10 | Media 5 | Baja 2 = **19 RNF**

---

### 8. ARQUITECTURA Y STACK TECNOLÓGICO PROPUESTO

#### 8.1. Arquitectura por Capas

```
┌──────────────────────────────────────────────────────────┐
│ PRESENTACIÓN: React 18 + Vite + Ant Design (AntD) 5.x │
│ SPA responsive, PWA-ready, accesible WCAG AA │
├──────────────────────────────────────────────────────────┤
│ LÓGICA: Node.js / Express o Python FastAPI (según │
│ conte.) + LangChain / LlamaIndex (orquestación RAG) │
├──────────────────────────────────────────────────────────┤
│ INTELIGENCIA RAG: │
│ sentence-transformers / OpenAI Embeddings (ES) │
│ LLM (GPT-4o / Claude / Mistral local) + chunking │
│ + re-ranking + citación │
├──────────────────────────────────────────────────────────┤
│ DATOS: │
│ Relacional: PostgreSQL (Supabase/Railway) ó │
│ MongoDB (casos/docs no estructurados) │
│ Vectorial: ChromaDB / Pinecone / pgvector │
│ Archivos: S3-compatible (Railway Volumes / S3) │
│ Decisión: SQL si casos estructurados predominan; │
│ MongoDB si documentos semi-estructurados │
│ y metadatos variables predominan │
├──────────────────────────────────────────────────────────┤
│ SEGURIDAD: AES-256 (reposo) + TLS 1.3 (tránsito) + │
│ JWT + RBAC + Auditoría inmutable │
└──────────────────────────────────────────────────────────┘
```

#### 8.2. Stack Detallado con Versiones Exactas (sincronizado con `Manual_Tecnico_KM_RAG.md` Seccion 2.1)

| Capa | Tecnologia Propuesta (version exacta) | Alternativas | Proposito | Lock |
|------|----------------------------------------|--------------|-----------|------|
| **Frontend** | React 18.2.0 + Vite 5.0.8 | Next.js | SPA rapida, HMR <200ms, code-splitting | package-lock.json |
| **UI Library** | Ant Design 5.12.8 + Icons 5.2.6 | Material UI / Chakra | Table/Form/Upload/DatePicker/Tag/Badge/Calendar | package-lock.json |
| **Estado** | Zustand 4.4.7 | Redux Toolkit | Estado auth, filtros, cola uploads | package-lock.json |
| **Data Fetch** | TanStack Query 5.12.2 + Axios 1.6.2 | SWR | Cache, revalidacion, loading skeletons | package-lock.json |
| **Routing** | React Router 6.21.1 | - | Navegacion SPA protegida por roles, guards chunk-level | package-lock.json |
| **Estilos** | AntD Theme Token + CSS Modules | Tailwind | Tematizacion, responsive, breakpoints | package-lock.json |
| **Iconos** | AntD Icons + React Icons | - | Consistencia visual | package-lock.json |
| **PDF/ZIP** | jsPDF 2.5.1 + JSZip 3.10.1 / pdf-lib | - | Paquete audiencia, export ZIP con indice | package-lock.json |
| **Recharts** | 2.10.3 | - | Grafico barras dashboard KPIs | package-lock.json |
| **Backend API** | FastAPI 0.104.1 + Uvicorn 0.24.0 + Pydantic 2.5.2 (Python 3.11.7) o Express 4.18.2 (Node 20.11 LTS) | El otro | REST + WebSocket /ws/chat, validacion, OpenAPI | requirements.txt |
| **RAG Orquestacion** | LangChain 0.0.340 / LlamaIndex 0.9.35 | Haystack | Chunking 500/100, retrieval top-k 5, rerank, generacion con citas | requirements.txt |
| **Embeddings** | sentence-transformers 2.2.2 `paraphrase-multilingual` / OpenAI text-embedding-3-large 1.6.1 | Cohere ES | Vectorizacion ES juridico boliviano 768d | requirements.txt |
| **LLM** | GPT-4o-mini (OpenAI 1.6.1) / Mistral 7B local | Claude Haiku | Clasificacion auto + generacion respuestas con citas | requirements.txt |
| **Vector DB** | ChromaDB 0.4.18 / pgvector 0.2.4 (Postgres 15.4) | Pinecone / Qdrant | Busqueda semantica HNSW M16 efSearch 50, <3s | requirements.txt |
| **BD Relacional** | PostgreSQL 15.4 (Railway Postgres) + SQLAlchemy 2.0.23 + Alembic 1.13.1 | MySQL | Casos/usuarios/audiencias/alerta/auditoria inmutable | Railway |
| **BD NoSQL** | MongoDB 7.0.4 Atlas M0 free / M10 | - | Docs metadata flexible (medidaProteccion) | Atlas |
| **Criterio eleccion BD** | SQL si esquema estable; Mongo si variable; Hibrido Postgres+Mongo+Chroma recomendado | - | Segun Sprint 1, sin costo extra | - |
| **Auth** | jsonwebtoken 9.0.2 + bcryptjs 2.4.3, JWT 30m + refresh 7d httpOnly | next-auth | Sesion, bloqueo 3 intentos, expiracion | package-lock.json |
| **Storage** | Railway Volumes / AWS S3 | Cloudinary | Archivos 50MB, versionado, AES-256 | Railway |
| **Cifrado** | AES-256-GCM Node crypto / Python cryptography + TLS 1.3 | - | Reposo + campo victima.direccion | - |
| **Notificaciones** | Socket.io 4.7.4 + Nodemailer 6.9.7 / Resend 3.2.0 | FCM | In-app realtime + email 8AM | package-lock.json |
| **Cron / Alertas** | BullMQ 5.1.1 / node-cron / Railway Cron | Celery | Jobs 48h/24h/2h, 7d/48h, resumen 8AM | package-lock.json |
| **Deployment Frontend** | Vercel 33.5.0 (CLI) | Netlify | CI/CD git, previews PR, CDN edge, HSTS | vercel.json |
| **Deployment Backend** | Railway 3.4.0 (CLI) | Render/Fly/AWS | API+workers+DB+vector+cron todo-en-uno | railway.json |
| **Monitoreo** | Sentry 7.91.0 / 1.38.0 + UptimeRobot + Railway Metrics | Grafana | Logs, errores, uptime 99.5% | - |
| **Control Versiones** | Git 2.43.0 + GitHub | GitLab | main/develop/feature, PR review | GitHub |
| **CI/CD** | GitHub Actions runner 2.311 | - | Deploy por rama main->prod | .github/workflows/ci.yml |
| **Testing** | Vitest 1.0.4 + Testing Library 14.1.2, Playwright 1.40.1, k6 0.49.0, JMeter 5.6.2, ZAP 2.14.0 | Cypress | Unit+E2E+perf <3s + pen-test 0 high | package-lock.json |
| **Diseno** | Figma 116.5 | - | Wireframes, design system AntD, handoff | Figma cloud |
| **Boveda** | Bitwarden 2023.12 / KeePassXC 2.7.4 | - | AES_KEY/JWT_SECRET rotacion 90d | `Boveda_Contrasenas_KM_RAG.md` |

**Justificación Vercel + Railway:**
- Vercel: óptimo para Vite/React SPA, edge CDN, previews por PR, despliegue instantáneo, ideal para AntD.
- Railway: backend Python/Node + PostgreSQL/MongoDB + Chroma/pgvector + Redis/BullMQ + Volumes + Cron en una plataforma, sin fragmentación, ideal para RAG con embeddings y workers.
- Alternativa híbrida SQL/Mongo: se decide en Sprint 1 tras modelado de datos; si el sistema escala a 5000+ docs, se mantiene Postgres transaccional + Chroma vectorial; si variabilidad documental domina, se añade MongoDB para flexibilidad.

---

### 9. USO DETALLADO DE HERRAMIENTAS

#### 9.1. Frontend — React + Vite + AntD

| Herramienta | Uso concreto en el proyecto | Sprint | Entregable donde se usa |
|-------------|------------------------------|--------|-------------------------|
| **Vite 5** | Dev server HMR <200ms, build Rollup optimizado, code-splitting por ruta (`/casos`, `/busqueda`, `/chat`) | S1–S8 | E2–E10 |
| **Ant Design 5.x** | `Table` (listado casos/docs/auditorías), `Form` (login, crear caso, filtros), `Upload.Dragger` (50MB chunking), `DatePicker` (audiencias), `Tag`/`Badge` (clasificación/estado), `Statistic` (KPIs), `Drawer`/`Modal` (versiones, compartir), `Calendar` (audiencias) | S1–S7 | E2, E3, E4, E6, E7, E8 |
| **AntD Theme Token** | Theming centralizado (colores Buffet, tipografía, borderRadius, breakpoints responsive) | S1 | E2 |
| **Zustand / Redux Toolkit** | Estado auth (JWT, rol), filtros casos, cola de uploads | S2–S6 | E3–E7 |
| **TanStack Query + Axios** | Cache queries (`/api/casos`, `/api/busqueda`, `/api/alertas`), invalidación tras mutaciones, retry, loading skeletons | S2–S8 | E3–E10 |
| **React Router v6** | Rutas protegidas `RequireAuth` + `RequireRole(admin/abogado/asistente)`, guards chunk-level, redirect 403 | S2 | E3 |
| **jsPDF + JSZip** | Paquete PDF audiencia (portada + docs ordenados + índice) y ZIP caso (carpetas por tipo + índice + ZIP con contraseña) — ejecución en backend para docs grandes, preview en frontend | S5, S7 | E6, E8 |
| **Vitest + Playwright** | Unit (componentes AntD) + E2E (login→crear caso→subir doc→buscar→compartir) | S2–S7 | E3–E9 |

#### 9.2. Backend & RAG

| Herramienta | Uso concreto | Sprint |
|-------------|--------------|--------|
| **FastAPI (Python)** | REST `/api/*`, OpenAPI docs, validación Pydantic, WebSocket `/ws/chat` y `/ws/notificaciones`; alternativo **Express** si equipo prioriza Node (misma API) | S2–S8 |
| **LangChain / LlamaIndex** | Pipeline: `load → chunk (500 tokens, overlap 100) → embed → store → retrieve (top-k=5) → re-rank → generate con citas` | S3–S4 |
| **sentence-transformers `paraphrase-multilingual` / `text-embedding-3-large`** | Embeddings ES jurídico boliviano (toleran `conbenio`/`convenio`, `contestación`/`respuesta demanda`) | S3–S4 |
| **ChromaDB / pgvector / Pinecone** | `ChromaDB` local en Railway (costo 0), `pgvector` si se elige Postgres único, `Pinecone` si se requiere managed + escala >10k docs | S3–S4 |
| **GPT-4o-mini / Mistral 7B local** | Clasificación automática (prompt Es con taxonomía 7 tipos) + generación respuestas RAG con citas `[fuente: doc, caso, fecha]` | S3–S4 |
| **PostgreSQL 15 (Railway)** | Tablas: `usuarios`, `casos`, `documentos`, `versiones`, `audiencias`, `alertas`, `compartidos`, `auditoria` (inmutable) | S2–S6 |
| **MongoDB Atlas** | Colección `documentos` con `metadata` variable (violencia doméstica: `medidaProteccion`, `riesgo`, `comisaria`) si se elige híbrido | S3 (decisión) |
| **Railway Volumes / S3** | Archivos 50MB, versionado, cifrado AES-256 reposo | S3 |
| **Socket.io** | Notificaciones realtime (campana Badge), typing indicator chat | S4–S5 |
| **BullMQ / node-cron / Railway Cron** | Jobs: `check-audiencias-48h`, `check-vencimientos-7d`, `resumen-diario-8am`, `email-semanal-lunes-8am` | S5 |
| **Nodemailer / Resend** | Envío alertas + resúmenes (sin datos sensibles) | S5 |

#### 9.3. DevOps, Seguridad y Calidad

| Herramienta | Uso concreto |
|-------------|--------------|
| **Vercel** | Deploy frontend por `git push` a `main`→prod, `develop`→preview, edge CDN, `vercel.json` headers HSTS, env `VITE_API_URL` | 
| **Railway** | Deploy backend + DB + vector + volumes + cron en un proyecto, `railway.toml`, env vars cifradas (`AES_KEY`, `JWT_SECRET`), metrics + logs |
| **GitHub Actions** | CI: lint + test + build → deploy Vercel/Railway; secret `RAILWAY_TOKEN`, `VERCEL_TOKEN` |
| **Sentry + UptimeRobot** | Captura errores (frontend/backend/LLM) + monitor 99.5% uptime (ping /health cada 1 min) |
| **OWASP ZAP + npm audit / pip-audit** | Pen-test Top10 + audit deps en CI (bloquea deploy si high) |
| **k6** | Perf: 15 usuarios concurrentes, 1000 docs, asserts `busqueda_p95 < 3s`, `operaciones_p95 < 2s` |
| **Figma** | Design system AntD, prototipos navegables, handoff dev (inspect) |

#### 9.4. Matriz Herramienta → RNF/RF que habilita

| Herramienta | RF/RNF que habilita |
|-------------|----------------------|
| AntD + Vite | RNF-11/12/13/14 (usabilidad, español, consistencia, responsive) |
| TanStack Query + Zustand | RNF-08 (<2s), RF-06 (listado) |
| LangChain + pgvector/Chroma | RF-12/13/14 (búsqueda semántica + chat), RNF-07 (<3s) |
| PostgreSQL/Mongo + criterio híbrido | RNF-16/17 (escalabilidad), RF-05–11 |
| Vercel + Railway | RNF-09 (99.5% uptime), RNF-18 (despliegue) |
| AES-256 + TLS 1.3 + JWT + RBAC | RNF-01/02/05/06 + RF-01–04 (seguridad) |
| Sentry/Uptime/k6/ZAP | RNF-18/19 (mantenibilidad) + Cláusula 10 Contrato |

---

### 10. METODOLOGÍA DE TRABAJO

**Scrum + Kanban — 8 sprints × 2 semanas = 16 semanas**

| Elemento | Configuración |
|----------|---------------|
| **Sprints** | 8 sprints de 2 semanas (ver Plan Cronograma) |
| **Artefactos** | Product Backlog (29 RF + 19 RNF), Sprint Backlog, Incremento (demo funcional) |
| **Ceremonias** | Sprint Planning (día 1), Daily 15 min virtual (Lun-Vie 9:00), Sprint Review/Demo + Retrospectiva (último día sprint) |
| **Roles** | Product Owner (Buffet), Scrum Master (Santiago Acha), Dev Team (4) |
| **Tablero** | Trello / Jira / Notion — columnas: Backlog → Por hacer → En curso → En revisión → Hecho |
| **WIP limit** | 1-2 tareas por persona |
| **Repositorio** | GitHub privado, ramas `main` (prod), `develop`, `feature/*`, PR + review obligatorio |
| **Demos** | Al fin de cada sprint, validación por Buffet en Google Meet/Zoom + grabación |
| **Comunicación** | WhatsApp grupo (horario laboral 9-18, lun-vie), email formal, Meet/Zoom demos |

---

### 11. GESTIÓN DE RIESGOS


#### 11.1. Mapa rápido por categoría

| Categoría | Riesgos clave | Severidad máxima |
|-----------|---------------|------------------|
| **Técnicos / Hackeos** | T02 Fuga datos víctimas, T05 Bypass JWT, T08 Inyección prompt RAG, T11 Hackeo prod (defacing/malware), T12 DDoS, T13 Brecha vector DB | **Crítica (9)** |
| **Información** | I01 Pérdida corrupción docs, I02 Clasificación errónea >30%, I03 Embeddings drift, I04 Entrenamiento LLM con datos Buffet sin anonimizar, I05 Versionado falla (presenta demanda vieja) | **Alta (6)** |
| **Operativos** | O01 Retraso materiales 20 casos muestra, O02 Vercel/Railway no obtenido, O05 PO poco disponible, O09 Retraso aprobación demo 5 días | **Alta (6)** |
| **Infra / Seguridad SSL** | S01 Cert SSL/TLS expirado o mal configurado, S02 TLS downgrade, S03 Clave AES expuesta, S04 Backup cifrado no restaurable | **Alta (6)** |
| **Financieros** | F01 Retraso pago hitos, F02 Costo LLM/Pinecone supera tiers gratuitos, F03 Dominio > presupuesto | **Alta (6)** |

#### 11.2. Medidas transversales (ver detalle T01–T13, I01–I05, O01–O10, S01–S04, F01–F07 en `Gestion_Riesgos_KM_RAG.md`)

- **Prevención hackeo/SSL:** HSTS, TLS 1.3 only (A+ SSL Labs), 2FA admin, bcrypt 12, rate limit 3 intentos, WAF Vercel, CSP headers `vercel.json`, escaneo ZAP semanal, rotación AES quarterly, logs inmutables append-only.
- **Información:** validación clasificación con confirmación humana (RF-09), threshold desduplicación calibrado, re-embeddings batch si drift, anonimización obligatoria antes de cualquier training, versionado inmutable v1..vN con hash.
- **Reserva:** 5 días hábiles cronograma + Bs. 800 reserva Buffet (LLM/vector/dominio) recomendados.

---

### 12. HERRAMIENTAS DE SEGURIDAD — SSL/TLS Y PROTECCIÓN

#### 12.1. SSL/TLS (SCCL)

| Capa | Herramienta / Config | Detalle |
|------|----------------------|---------|
| **Transporte (Vercel)** | **TLS 1.3** (Vercel auto-provisiona Let's Encrypt, HSTS `max-age=31536000; includeSubDomains; preload`, redirect http→https) | `vercel.json` headers, calificación A+ SSL Labs (RNF-01) |
| **Transporte (Railway)** | **TLS 1.3** (Railway proxy + Let's Encrypt), `secure: true` en cookies JWT, `SameSite=Strict` | Termina en proxy Railway, backend `trust proxy` |
| **Certificados** | Let's Encrypt auto-renovación 90 días (Vercel/Railway gestionado) | Proforma `INF-SSL-001` (costo 0 si Let's Encrypt; ≈ US$ 50/año si EV requerido) |
| **Headers seguridad** | `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin` | `vercel.json` + `helmet` (Express) / middleware FastAPI |
| **Reposo** | **AES-256-GCM** (`crypto` Node / `cryptography` Python), clave en Railway env `AES_KEY` (no en repo), cifrado a nivel de campo `victima.direccion` | RNF-02, Cláusula 8 Contrato |
| **Autenticación** | JWT access 30 min + refresh 7d httpOnly, bcrypt 12, bloqueo 3 intentos, expiración 30 min inactividad (RNF-03/04) | RF-01 |
| **Autorización** | RBAC + permisos chunk-level (middleware `canAccess(docId, chunkId, role)`) | RNF-05, RF-02 |
| **Auditoría** | Log inmutable append-only (Postgres tabla `auditoria` sin UPDATE/DELETE grants), hash encadenado | RNF-06, RF-04 |
| **Anti-hackeo** | Rate limit (express-rate-limit), WAF Vercel, input sanitization (Pydantic/Zod), file type magic-bytes (no solo extensión), 50MB limit, escaneo ZAP semanal | T02/T11 mitigación |
| **Backups cifrados** | Railway Volumes daily backup + S3 versionado, cifrado AES-256, restore test quincenal | RNF-02, T10 |

#### 12.2. Verificación

| Verificación | Herramienta | Frecuencia | Criterio aceptación |
|--------------|-------------|------------|---------------------|
| **SSL Labs** | `ssllabs.com` | Cada deploy prod | A+ |
| **Headers** | `securityheaders.com` | Sprint 7 | A |
| **Pen-test** | OWASP ZAP | Sprint 7 + garantía mensual | 0 high |
| **Audit deps** | `npm audit` / `pip-audit` | CI cada push | 0 high |
| **Restore cifrado** | Script `restore.sh` | Quincenal | <30 min, datos íntegros AES |

 Ver detalle en `Gestion_Riesgos_KM_RAG.md §4.1–4.4` (riesgos S01–S04, T02/T11).

---

### 13. ENTREGABLES

| Código | Entregable | Sprint | Semana | Criterio aceptación |
|--------|------------|--------|--------|---------------------|
| **E1** | Plan de trabajo y cronograma confirmado | Sprint 0-1 | 1-2 | Aprobación Buffet |
| **E2** | Wireframes + mockups + design system (Figma) + arquitectura validada | Sprint 1 | 2 | Aprobación diseño |
| **E3** | MVP Auth + Casos (CRUD, RBAC, listar, cambio estado) + layout AntD responsive | Sprint 2 | 4 | CRUD funcional + tests auth |
| **E4** | Ingesta documentos + chunking + embeddings + clasificación automática + desduplicación (>85%) | Sprint 3 | 6 | Docs indexados, clasificación ≥90% |
| **E5** | Motor RAG completo (búsqueda semántica <3s, consulta NL con citas, chat conversacional) | Sprint 4 | 8 | Precisión ≥85%, chat con fuentes |
| **E6** | Alertas + Gestión audiencias (registro, checklist, paquete PDF) + resúmenes | Sprint 5 | 10 | Alertas 48h/7d operativas |
| **E7** | Versiones + Compartición segura (JWT temporal, solo-lectura watermark, revocar) + auditoría | Sprint 6 | 12 | Enlaces temporales + revocación + logs inmutables |
| **E8** | PWA/mobile refinamiento + impresión + exportación ZIP + notificaciones in-app/email | Sprint 7 | 14 | <5 clics, export ZIP, notifs agrupadas |
| **E9** | Plataforma completa en staging + QA integral (func., seguridad, RAG recall, perf, usabilidad) | Sprint 7-8 | 14-15 | QA superada, pen test sin críticas |
| **E10** | Despliegue producción (Vercel frontend + Railway backend + SSL/TLS + dominios) | Sprint 8 | 16 | Prod operativo 99.5% + monitoring |
| **E11** | Documentación: Manual Técnico (arquitectura, API, RAG), Manual Usuario, Manual Despliegue, troubleshooting | Sprint 8 | 16 | PDFs entregados |
| **E12** | Capacitación (2 sesiones) + video tutoriales + soporte post-lanzamiento 4 semanas | Sprint 8 + garantía | 16-20 | Sesiones realizadas + material |

**Entregables por sprint detallados en `Plan_Proyecto_Cronograma_KM_RAG.md`.**

---

### 14. PERFIL DEL EQUIPO

| Rol | Cant. | Experiencia | Responsabilidades |
|-----|-------|-------------|-------------------|
| Project Manager / Scrum Master | 1 | 2+ años liderando proyectos digitales + RAG | Planificación, comunicación Buffet, gestión backlog/riesgos |
| Diseñador UX/UI | 1 | 2+ años producto digital + design systems | Wireframes, mockups AntD, prototipos, validación usabilidad |
| Tech Lead Fullstack / RAG Engineer | 1 | 3+ años Python/Node + LangChain/LlamaIndex + vector DBs | Arquitectura RAG, embeddings, backend, seguridad, Railway |
| Frontend Developer | 1 | 2+ años React/Vite/AntD | SPA, responsive, integración API/RAG, PWA |
| QA Tester | 1 (compartido) | 1+ año testing + perf RAG | Unit/E2E/seguridad/pen-test/perf, validación criterios RF/RNF |

Se valorará experiencia con legaltech, manejo de datos sensibles, y ONG/sector social.

---

### 15. FORMA DE PAGO — COCOMO II WAE-RAG mercado

**Precio COCOMO II:** Bs. 60,092.00 base + IVA 13% (7,812.21) = **Bs. 67,904.21** (IVA incluido) con margen 26.7% incluido. *Calculado por COCOMO II Post-Arquitectura + WAE (48.15 PM x 1,248 Bs/PM) — ver `Estimacion_COCOMO_KM_RAG.md` Seccion 8 y `documentos/cotizacion/Cotizacion_KM_RAG.md` Seccion 8.*

| Hito | % | Bs. base | IVA 13% | Bs. total (IVA incl.) | Sprint | Entregable validado |
|------|---|----------|---------|-----------------------|--------|---------------------|
| H1 Firma + Plan aprobado | 20% | 12,018.40 | 1,562.39 | 13,580.79 | Sprint 1 | E1 + E2 (plan + mockups) |
| H2 Sprint 3 completado (ingesta + clasificacion) | 15% | 9,013.80 | 1,171.79 | 10,185.59 | Sprint 3 | E3 + E4 |
| H3 Sprint 5 completado (RAG + audiencias) | 25% | 15,022.90 | 1,953.00 | 16,975.90 | Sprint 5 | E5 + E6 |
| H4 QA staging superada | 15% | 9,013.80 | 1,171.79 | 10,185.59 | Sprint 7 | E7 + E8 + E9 |
| H5 Despliegue prod. + documentacion + capacitacion | 25% | 15,022.90 | 1,953.00 | 16,975.90 | Sprint 8 | E10 + E11 + E12 |
| **Total Opcion A mercado** | **100%** | **60,092.00** | **7,812.21** | **67,904.21** | | **E1-E12** |
| Total Opcion B contado 10% dto. | 100% | 54,083.30 | 7,030.73 | 61,113.59 | | — |

*Facturación por cuota con desglose IVA; retención RC-IVA/IT según régimen. Ver Contrato.*

---

### 16. PROPIEDAD INTELECTUAL

Todo código fuente (React/Vite/AntD, backend, pipelines RAG), documentación, diseños, embeddings, prompts y materiales producidos serán **propiedad exclusiva del Buffet de Asistencia Familiar** una vez completado el pago total. El equipo entregará repositorios completos sin dependencias restrictivas, con README y guía de despliegue Railway/Vercel. El equipo podrá mencionar el proyecto en portafolio previa autorización escrita, sin revelar datos sensibles ni secretos del buffet.

---

### 17. CONFIDENCIALIDAD Y PROTECCIÓN DE DATOS

Confidencialidad estricta sobre datos de víctimas, menores, familias, estrategias legales y cualquier información sensible, durante el proyecto y **mínimo 3 años post-contrato**. Cifrado AES-256 reposo, TLS 1.3 tránsito, encriptación a nivel de campo (direcciones víctimas), RBAC chunk-level, auditoría inmutable, anonimización en logs/training data RAG, cumplimiento normativa boliviana protección datos. Prohibido entrenar LLMs externos con datos del buffet sin consentimiento explícito y anonimizado.

---

### 18. GARANTÍA Y SOPORTE

- **Garantía:** 60 días post-producción (E10) — corrección bugs/fallos atribuibles al desarrollo sin costo (excluye modificaciones no autorizadas, fallos infra Vercel/Railway de terceros, mal uso, fuerza mayor).
- **Soporte post-garantía:** Contratación mensual opcional (mantenimiento RAG, re-indexado, afinamiento embeddings, updates dependencias).

---

### 19. CRITERIOS DE EVALUACIÓN DE PROPUESTAS

| Criterio | Peso |
|----------|------|
| Experiencia equipo + portafolio RAG / legaltech | 30% |
| Propuesta técnica (arquitectura React/AntD/Vite + RAG + Vercel/Railway + elección SQL/Mongo) | 30% |
| Propuesta económica (costo-beneficio, uso tiers gratuitos OSS) | 20% |
| Cronograma y metodología (8 sprints, demos, gestión riesgos) | 15% |
| Experiencia ONG / manejo datos sensibles | 5% |

---

### 20. CONDICIONES DE PRESENTACIÓN

- Envío a: **[buffet.asistencia.familiar@gmail.com]** — asunto: **`PROPUESTA KM RAG — [Nombre proponente]`**
- Límite: **[dd/mm/aaaa]**
- Consultas: mismo correo hasta **[dd/mm/aaaa]**
- Se valorará precios solidarios por carácter gratuito del buffet.
- El Buffet se reserva declarar desierta la convocatoria si ninguna propuesta cumple requisitos.

---

### 21. CONTACTO

| | |
|---|---|
| **Organización** | Buffet de Asistencia Familiar |
| **Responsable proyecto** | [Nombre responsable Buffet] |
| **Correo** | [buffet.asistencia.familiar@gmail.com] |
| **Teléfono / WhatsApp** | [+591 X XXXXXXXX] |
| **Dirección** | [Dirección, La Paz, Bolivia] |

---

### 22. CARTA DE PROFORMA Y LÍMITES PRESUPUESTARIOS

En complemento a la forma de pago (§15), se entrega el paquete de proformas de infraestructura en `proformas/` (ver `Carta_Entrega_Proformas_KM_RAG.md`):

| Proforma | Concepto | Costo 1.er año (aprox.) | Límite contractual |
|----------|----------|-------------------------|---------------------|
| INF-001 | Dominio `buffetkm.bo` (NIC Bolivia ADSIB) | Bs 980/año (`.bo`) / Bs 280/año (`.org.bo`) | Buffet elige y paga; si supera presupuesto, se mantiene staging y se propone alternativa `.org.bo`/`.com` |
| INF-002 | Dominio `buffetkm.com` (GoDaddy) | ≈ US$ 14,99 | — |
| INF-003 | Vercel (frontend) | US$ 0 (Hobby) / US$ 20/mes Pro | Incluido tiers gratuitos; Pro solo con aprobación Buffet |
| INF-004 | Railway (backend+RAG+DB+vector+cron) | US$ 5–20/mes Starter → US$ 20/mes Pro | Starter cubre 4 meses; escalado requiere adenda |
| INF-005 | PostgreSQL (Railway) | Incluido en Railway | — |
| INF-006 | MongoDB Atlas (si híbrido) | US$ 0 (M512 free) → US$ 9/mes | Free cubre S1–S4; escalado con aprobación |
| INF-007 | ChromaDB/pgvector/Pinecone | US$ 0 (Chroma/pgvector) / Pinecone Starter US$ 70/mes | Se prioriza Chroma/pgvector free; Pinecone solo si Buffet aprueba |
| **INF-SSL-001** | SSL/TLS (SCCL) | US$ 0 (Let's Encrypt auto en Vercel/Railway) | EV (≈ US$ 50/año) solo si Buffet requiere |

**Límite contractual (Cláusula 3.2 TDR y Contrato):** Hosting/SSL/dominio/planes LLM-vector corren por cuenta del Buffet. El equipo configura en cuentas del Buffet o con handover; no paga planes premium sin aprobación escrita. Si costo domina excede presupuesto, se propone staging + alternativa sin bloquear entregables.

Comparativa y recomendación detallada en `Carta_Entrega_Proformas_KM_RAG.md` y proformas INF-001 a INF-SSL-001.

---

### 23. ANEXOS

- `TDR.md` v1.0 — 29 RF + 19 RNF detallados con criterios de aceptación
- `User_Stories.md` — 30 US en 10 épicas
- `Matriz_de_Coherencia.md` — pregunta-problema-OE alineados
- `Modelado_Procesos_BPWin.md` — 7 procesos + modelo de datos
- `Ciclo_de_Vida_del_Proyecto.md` — 6 fases (investigación → mantenimiento)
- `Plan_Proyecto_Cronograma_KM_RAG.md` — 8 sprints detallados (+ índice + uso herramientas por sprint)
- `Gestion_Riesgos_KM_RAG.md` — Gestión de riesgos (índice, técnicos/hackeos, información, SSL, operativos, financieros)
- `Contrato_KM_RAG.md` — Contrato de prestación de servicios (16 cláusulas + SSL)
- `Carta_Aceptacion_KM_RAG.md` — Carta de aceptación
- `proformas/Carta_Entrega_Proformas_KM_RAG.md` + `INF-001` a `INF-SSL-001` — Paquete proformas con límites
