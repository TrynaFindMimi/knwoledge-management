# CICLO DE VIDA DEL PROYECTO

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG PARA EL BUFFET DE ABOGADOS DE ASISTENCIA FAMILIAR

---

## 1. FASE DE INVESTIGACIÓN Y ANÁLISIS DE NECESIDADES

### 1.1. Contexto del Problema y Analisis Causal

El Buffet de Asistencia Familiar enfrenta una crisis critica en la gestion documental que impacta directamente en la defensa de familias y menores en riesgo. La problematica no es puntual sino estructural: combina gestion artesanal, deuda tecnica acumulada y riesgo de seguridad legal, cuantificada en 3 entrevistas semiestructuradas (52, 48 y 35 min) y sistematizada en diagrama Ishikawa de 24 causas (`diagramas/diagrama ishikawa.svg`) y modelado BPWin de 7 procesos (`diagramas/bpwin/BPWin_A0_Contexto.svg`).

#### 1.1.1 Problematica cuantificada (linea base)

| Indicador linea base | Valor actual | Fuente | Impacto en servicio legal |
|----------------------|--------------|--------|---------------------------|
| Tiempo busqueda documental | 4-6 horas/semana por abogado (208-312 h/anio) | Entrevista 01:32, 02, 03 | Menor tiempo de atencion a familias vulnerables; horas no facturables |
| Volumen casos activos | 50+ casos simultaneos, 40-50 docs por caso | Entrevista 02 | Carpetas folder manila sin sub-organizacion; sin indice |
| Documentos escaneados sin clasificacion | 200 archivos (`scan001.jpg`, `ACUERDO_FINAL2.pdf`) sin convencion de nombres, duplicados | Entrevista 01:40 | Archivos inlocalizables, 90% mal etiquetados, sin busqueda |
| Perdida en audiencia | Convenio no encontrado en Juzgado 3ro (15/07), prorroga 24h solicitada | Entrevista 01:32 | Percepcion de irresponsabilidad; perjuicio directo a cliente (alimentos) |
| Versionado fallido | Demanda obsoleta impresa y presentada ante jueza por confusion v1/v2 | Entrevista 02 | Riesgo procesal, retrabajo, nulidad potencial |
| Seguridad | Contrasenas `123456`/`abogada2024`, direcciones victimas sin cifrar en laptop, envio por WhatsApp sin proteccion | Entrevista 01:44, 03 | Exposicion datos victimas/menores, incumplimiento normativa proteccion datos personales |
| Dependencia persona clave | Asistente Mariela unica que conoce ubicacion; si falta, paralisis total (bus factor =1) | Entrevista 02 | Riesgo operativo critico, no hay clasificacion automatica |
| Capacidad digitalizacion | 200 docs en 2 anios sin indice, sin deteccion duplicados | Entrevista 01:40 | Deuda tecnica que impide escalar a 5000 docs proyectados |

Sintesis: gestion artesanal (folder manila + archivador verde + carpeta `Escaneos 2024` + Drive sin criterio) no escala a 5000 docs ni a acceso movil en juzgados (RNF-14). Ver analisis completo en `TDR_KM_RAG.md` Seccion 2.1-2.3 y `Gestion_Riesgos_KM_RAG.md` (I01-I05).

#### 1.1.2 Analisis causal (Ishikawa + 5 Porques)

Ishikawa 24 causas en 6 categorias (Tecnologia, Personas, Procesos, Informacion, Seguridad, Organizacion). Causas raiz priorizadas: ausencia de busqueda semantica tolerante a errores/sinonimos, clasificacion manual por nombre en vez de por contenido, sin control de versiones inmutable, sin RBAC/auditoria, sin alertas proactivas, conocimiento tacito centralizado en una persona.

5 Porques para `Dependencia de Mariela`: 1) Por que solo Mariela ubica? Porque no hay clasificacion auto -> 2) Porque nombres genericos y proceso manual -> 3) Porque no hay pipeline embeddings/LLM que lea contenido -> 4) Porque no hay KM con RAG -> 5) Porque no se ha sistematizado conocimiento documental. Mismo analisis aplica a `Perdida en audiencia` (busqueda exacta sin sinonimos) y `Riesgo seguridad` (sin AES-256/TLS/RBAC).

Arbol de problemas -> Arbol de objetivos: cada causa se convierte en objetivo especifico OE1-OE6 con indicador medible (ver `TDR_KM_RAG.md` 3.2).

#### 1.1.3 Stakeholders

| Stakeholder | Necesidad principal | Criterio de exito |
|-------------|---------------------|-------------------|
| Abogado 12 anios (asistencia familiar) | Escribir `Mamani alimentos` y recuperar todo aunque escriba `conbenio` | Busqueda <30s, tolera errores (OE1/RF-12) |
| Abogada 8 anios (patria potestad) | No volver a imprimir version vieja | Versionado v1..vN con diff (OE5/RF-11) |
| Abogada 3 anios (violencia) | Crear caso en <1 min y subir docs, datos victima cifrados | Boton URGENTE + AES campo (OE4/RF-25/03) |
| Asistente Mariela | Dejar de ser cuello de botella | 100% docs clasificables sin su intervencion (OE2/RF-09) |
| Admin Buffet | Trazabilidad quien/que/cuando/IP | Auditoria inmutable + RBAC (OE4/RF-04) |
| Victima/menor | Proteccion datos, medida no vencida | Cifrado + alerta 7d/48h (OE3/OE4) |

### 1.2. Entrevistas Realizadas

| Entrevista | Perfil | Experiencia | Duracion | Hallazgos Clave | Problema trazable |
|------------|--------|-------------|----------|-----------------|-------------------|
| #01 | Abogado varon, Derecho de Familia (asistencia familiar) | 12 anios | 52 min | Carpetas por cliente sin sub-organizacion; perdida de convenios en juzgado 3ro; escaneos duplicados `scan001.jpg` | P1, P2, P3 |
| #02 | Abogada mujer, Patria Potestad y Menores | 8 anios | 48 min | Dependencia total de asistente Mariela; 40-50 docs mezclados por caso; impresion de version incorrecta de demanda | P1, P5, P6 |
| #03 | Abogada mujer, Violencia Domestica y Proteccion a Victimas | 3 anios | 35 min | Casos urgentes sin tiempo para ordenar; certificado forense perdido como `scan001.jpg`; direcciones de victimas en laptop sin cifrar; envio WhatsApp | P2, P7, S/T02 |

Ver transcripciones completas en `entrevistas/Entrevista_Abogado_0X.md` y matriz de trazabilidad Entrevista -> RF en `README.md`.

### 1.3. Requerimientos Funcionales Consolidados (trazables a OE y a entrevistas)

Extraidos de las 3 entrevistas, consolidados por frecuencia y prioridad, con cobertura en TDR 4.1 y validacion en Plan S7:

#### Requerimientos de Alta Prioridad (mencionados por 3/3 entrevistados)

| # | Requerimiento | Justificacion | Objetivo Especifico | Criterio de aceptacion |
|---|---------------|---------------|---------------------|------------------------|
| RF-01 | Busqueda semantica inteligente que tolere errores y sinonimos legales | Todos buscan con nombres imprecisos (`ACUERDO_FINAL2.pdf`) | OE1 | p95 <3s, precision >=85% |
| RF-02 | Clasificacion automatica por contenido (sin etiquetado manual) | Nadie tiene tiempo para nombrar correctamente; 200 docs sin clasificar | OE2 | >=90% auto en 20 docs prueba |
| RF-03 | Preguntas en lenguaje natural sobre el estado de los casos | Respuestas rapidas ante juez (`que falta para audiencia maniana?`) | OE1 | Respuesta con citas <3s |
| RF-04 | Seguridad robusta para datos de menores, victimas y familias | Contrasenas debiles y compartimiento inseguro son riesgos reales | OE4 | 0 filtraciones, ZAP 0 high |

#### Requerimientos de Alta Prioridad (mencionados por 2/3 entrevistados)

| # | Requerimiento | Justificacion | Objetivo Especifico | Criterio de aceptacion |
|---|---------------|---------------|---------------------|------------------------|
| RF-05 | Acceso desde celular en juzgados | No trabajan fijos en oficina; necesitan mostrar doc a jueza | OE4 | Responsive, <5 clics, PWA |
| RF-06 | Control de versiones (evitar presentar documentos obsoletos) | Versiones viejas presentadas en audiencia | OE5 | v1..vN diff lado a lado |
| RF-07 | Alertas proactivas de vencimientos y audiencias | Con tantos urgentes se pasan plazos criticos | OE3 | Alertas 48h/7d en ventana |
| RF-08 | Compartir documentos de forma segura con enlaces temporales | Envian PDFs sensibles por WhatsApp | OE6 | JWT 1h/24h/72h single-use |
| RF-09 | Interfaz ultra simple para personal no tecnico | No pueden dedicar dias a capacitacion | OE4 | 3 abogados <5 min sin ayuda |

#### Requerimiento de Alta Prioridad (mencionado por 1/3 pero con impacto critico)

| # | Requerimiento | Justificacion | Objetivo Especifico | Criterio de aceptacion |
|---|---------------|---------------|---------------------|------------------------|
| RF-10 | Rapidez absoluta para casos de emergencia (violencia) | En crisis no hay tiempo para procesos complejos; datos victima en laptop sin cifrar | OE1, OE2, OE4 | Boton URGENTE <30s + AES campo |

### 1.4. Requerimientos No Funcionales (alineados a TDR 19 RNF)

| ID | Requerimiento | Criterio de medicion | Prioridad | Trazable a |
|----|---------------|----------------------|-----------|------------|
| RNF-01 | Cifrado transito TLS 1.3 | SSL Labs A+ | Critica | TDR RNF-01 |
| RNF-02 | Cifrado reposo AES-256 + campo victima | Auditoria cifrado BD/filesystem | Critica | TDR RNF-02 |
| RNF-03 | Bloqueo tras 3 intentos | Prueba 4 intentos incorrectos bloquea | Alta | TDR RNF-03 |
| RNF-04 | Sesion expira 30 min inactividad | Dejar 31 min sin interaccion expira | Alta | TDR RNF-04 |
| RNF-05 | RBAC roles + chunk-level | Test permisos cruzados 100% pass | Alta | TDR RNF-05 |
| RNF-06 | Auditoria inmutable | Intento DELETE bloqueado, hash encadenado | Alta | TDR RNF-06 |
| RNF-07 | Busqueda <3s | 1000 docs, 10 concurrentes, p95 <3s | Alta | TDR RNF-07 |
| RNF-08 | Operaciones generales <2s | Monitoreo prod p95 <2s | Alta | TDR RNF-08 |
| RNF-09 | Disponibilidad 99.5% | UptimeRobot <=4.4h downtime/mes | Alta | TDR RNF-09 |
| RNF-11 | Usabilidad <5 min sin ayuda | 3 abogados no tecnicos completan tareas <5 min | Alta | TDR RNF-11 |
| RNF-14 | Multi-dispositivo | Chrome/Firefox/Safari desktop+mobile | Alta | TDR RNF-14 |
| RNF-16 | Escalabilidad docs 100/mes sin degradacion | 5000 docs sin caida p95 | Media | TDR RNF-16 |

RNF completos 19 en `TDR_KM_RAG.md` Seccion 7. Cada RNF tiene herramienta habilitadora (ver TDR 9.4 Matriz Herramienta->RNF).

---

## 2. FASE DE DISEÑO

### 2.1. Arquitectura del Sistema

El sistema se estructura en las siguientes capas:

```
┌─────────────────────────────────────────────────┐
│ CAPA DE PRESENTACIÓN │
│ Interfaz web responsive + Chat conversacional │
├─────────────────────────────────────────────────┤
│ CAPA DE LÓGICA DE NEGOCIO │
│ Gestión de casos · Alertas · Permisos │
├─────────────────────────────────────────────────┤
│ CAPA DE INTELIGENCIA (RAG) │
│ Embeddings · LLM · Búsqueda semántica │
├─────────────────────────────────────────────────┤
│ CAPA DE DATOS │
│ Base vectorial · BD relacional · Almacenamiento│
├─────────────────────────────────────────────────┤
│ CAPA DE SEGURIDAD │
│ Cifrado · RBAC · Auditoría · Enlaces temporales│
└─────────────────────────────────────────────────┘
```

### 2.2. Modelado de Procesos (BPWin)

Para el modelado de procesos se utilizará **AllFusion Process Modeler BPWin**, herramienta estándar de la industria que permite:

- **Representación gráfica** de los procesos de negocio del buffet
- **Análisis y documentación** del flujo de información entre abogados, asistentes y el sistema
- **Generación automática** de modelos de datos y diseños de bases de datos
- **Optimización de procesos** reduciendo complejidad y aumentando eficiencia
- **Trazabilidad** de todas las acciones de modelado con historial completo

Los procesos a modelar incluyen:

| Proceso | Descripción | Participantes |
|---------|-------------|---------------|
| P1. Registro de caso nuevo | Creación de expediente con clasificación automática | Abogado, Sistema |
| P2. Ingesta de documentos | Escaneo/carga → clasificación RAG → almacenamiento | Abogado, Sistema |
| P3. Búsqueda de información | Consulta semántica → respuesta con fuentes citadas | Abogado, Sistema |
| P4. Gestión de audiencias | Alertas → preparación → acceso rápido desde móvil | Abogado, Sistema |
| P5. Compartición segura | Generación de enlace temporal con permisos | Abogado, Sistema, Tercero |
| P6. Control de versiones | Versionado automático → prevención de duplicados | Sistema |
| P7. Alertas proactivas | Monitoreo de plazos → notificaciones | Sistema |

### 2.3. Modelo de Datos (Entidades Principales)

```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ CASO │────<│ DOCUMENTO│>────│ CATEGORÍA│
│──────────│ │──────────│ │──────────│
│ id │ │ id │ │ id │
│ cliente │ │ caso_id │ │ nombre │
│ tipo │ │ nombre │ │ auto_gen │
│ estado │ │ version │ └──────────┘
│ prioridad│ │ chunks[] │
└──────────┘ │ fecha │ ┌──────────┐
 │ │ crypt_key│────<│ ALERTA │
 │ └──────────┘ │──────────│
 │ │ id │
 └───────────────────────────>│ caso_id │
 │ tipo │
┌──────────┐ │ fecha_lim│
│ USUARIO │────┐ │ activa │
│──────────│ │ └──────────┘
│ id │ │
│ nombre │ │ ┌──────────┐
│ rol │ └───────────>│PERMISO │
│ crypt_key│ │──────────│
└──────────┘ │ user_id │
 │ doc_id │
 │ nivel │
 │ link_temp│
 │ expira │
 └──────────┘
```

---

## 3. FASE DE DESARROLLO

### 3.1. Componentes a Desarrollar

| Componente | Tecnologías Sugeridas | OE Relacionado |
|------------|----------------------|-----------------|
| Frontend Web Responsive | React/Next.js, Tailwind CSS | OE4 |
| Chat Conversacional (RAG) | Python, LangChain/LlamaIndex, WebSocket | OE1, OE2 |
| Motor de Búsqueda Semántica | Embeddings (sentence-transformers), ChromaDB/Pinecone | OE1 |
| Clasificador Automático | LLM fine-tuned + reglas legales bolivianas | OE2 |
| Sistema de Alertas | Cron jobs + notificaciones push/websocket | OE3 |
| Backend API | FastAPI/Django REST | Todos |
| Sistema de Cifrado | AES-256 en reposo, TLS 1.3 en tránsito | OE4 |
| Control de Versiones | Git-like versioning por documento | OE5 |
| Compartición Segura | JWT temporal + enlaces de un solo uso | OE6 |

### 3.2. Iteraciones de Desarrollo

| Iteración | Duración | Entregable | Criterio de Aceptación |
|-----------|----------|------------|------------------------|
| Sprint 1 | 2 semanas | Modelo de datos + API básica + auth | CRUD de casos funcional |
| Sprint 2 | 2 semanas | Ingesta de documentos + chunking | Documentos indexados y buscables |
| Sprint 3 | 2 semanas | Motor RAG + búsqueda semántica | Búsqueda con >85% precisión |
| Sprint 4 | 2 semanas | Chat conversacional + citación de fuentes | Respuestas con referencias a documentos |
| Sprint 5 | 2 semanas | Alertas + control de versiones | Alertas automáticas de vencimientos |
| Sprint 6 | 2 semanas | Compartición segura + interfaz móvil | Enlaces temporales funcionales |
| Sprint 7 | 2 semanas | Pruebas integrales + ajustes UX | Validación con usuarios reales |

---

## 4. FASE DE PRUEBAS

### 4.1. Estrategia de Pruebas

| Tipo de Prueba | Descripción | Responsable |
|----------------|-------------|-------------|
| Unitarias | Prueba individual de cada componente/módulo | Desarrollador |
| Integración | Verificación de comunicación entre módulos | Desarrollador |
| RAG Específicas | Precisión de búsqueda semántica, recall, citación correcta | Equipo QA |
| Seguridad | Penetration testing, validación de cifrado, RBAC | Especialista seguridad |
| Usabilidad | Pruebas con abogados reales en escenarios simulados | Equipo UX + usuarios |
| Rendimiento | Tiempo de respuesta con 1000+ documentos indexados | Desarrollador |

### 4.2. Criterios de Aceptación por Requerimiento

| RF | Criterio de Aceptación |
|----|----------------------|
| RF-01 | El sistema encuentra documentos con ≥85% de precisión incluso con errores de escritura |
| RF-02 | ≥90% de documentos se clasifican correctamente sin intervención manual |
| RF-03 | El usuario obtiene respuesta en lenguaje natural en <3 segundos |
| RF-04 | No se permite acceso no autorizado; todos los datos están cifrados |
| RF-05 | La interfaz es funcional y usable en smartphones |
| RF-06 | Se puede recuperar cualquier versión previa de un documento |
| RF-07 | Las alertas se envían ≥48 horas antes del vencimiento |
| RF-08 | Los enlaces temporales expiran correctamente y registran acceso |
| RF-09 | Un usuario no técnico completa las tareas principales sin ayuda en <5 minutos |
| RF-10 | El flujo de caso urgente (registro → búsqueda → presentación) toma <30 segundos |

---

## 5. FASE DE DESPLIEGUE

### 5.1. Estrategia de Despliegue

| Fase | Acción | Duración |
|------|--------|----------|
| Piloto | Despliegue con 2 abogados seleccionados para validación real | 2 semanas |
| Expansión | Incorporar al resto del buffet tras ajustes del piloto | 1 semana |
| Estabilización | Monitoreo intensivo y corrección de incidencias | 2 semanas |

### 5.2. Infraestructura Recomendada

- **Hosting:** Cloud con cifrado en reposo (AWS/GCP con KMS)
- **Base de datos relacional:** PostgreSQL con cifrado a nivel de columna
- **Base vectorial:** ChromaDB o Pinecone (cloud con cifrado)
- **Monitoreo:** Logs de auditoría de todos los accesos a documentos sensibles

---

## 6. FASE DE MANTENIMIENTO

### 6.1. Actividades de Mantenimiento

| Tipo | Frecuencia | Descripción |
|------|------------|-------------|
| Correctivo | Continuo | Corrección de errores reportados por usuarios |
| Adaptativo | Trimestral | Actualización de modelo RAG con nuevos tipos de documentos legales |
| Perfectivo | Mensual | Mejoras de UX basadas en feedback de abogados |
| Preventivo | Semestral | Auditorías de seguridad, actualización de dependencias |

### 6.2. Métricas de Éxito

| Métrica | Meta | Medición |
|---------|------|----------|
| Tiempo promedio de búsqueda | < 30 segundos (vs 4+ horas/semana actual) | Analytics del sistema |
| Precisión de búsqueda RAG | ≥ 85% | Pruebas automatizadas |
| Satisfacción del usuario | ≥ 4/5 | Encuesta mensual |
| Incidentes de seguridad | 0 filtrajes | Logs de auditoría |
| Disponibilidad del sistema | ≥ 99.5% | Monitoreo Uptime |

---

## 7. REFERENCIAS

- **Entrevista 01:** Abogado — 12 años en asistencia familiar (22/08/2026, 52 min)
- **Entrevista 02:** Abogada — 8 años en patria potestad y menores (22/08/2026, 48 min)
- **Entrevista 03:** Abogada — 3 años en violencia doméstica (23/08/2026, 35 min)
- **Matriz de Coherencia:** Objetivos generales y específicos del proyecto
