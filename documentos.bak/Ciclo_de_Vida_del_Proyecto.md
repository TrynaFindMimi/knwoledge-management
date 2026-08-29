# CICLO DE VIDA DEL PROYECTO

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG PARA EL BUFFET DE ABOGADOS DE ASISTENCIA FAMILIAR

---

## 1. FASE DE INVESTIGACIÓN Y ANÁLISIS DE NECESIDADES

### 1.1. Contexto del Problema

El Buffet de Asistencia Familiar enfrenta una crisis crítica en la gestión documental que impacta directamente en la defensa de familias y menores en riesgo. A través de tres entrevistas semiestructuradas con profesionales del derecho familiar, se identificaron los siguientes problemas estructurales:

| Problema | Impacto | Fuente |
|----------|---------|--------|
| Organización caótica de expedientes físicos (50+ clientes activos) | Pérdida de documentos críticos en audiencias | Entrevista 01, 02 |
| Dependencia de una sola persona (asistente) para ubicar información | Riesgo de paralización total del buffet | Entrevista 02 |
| Digitalización fallida (200 docs escaneados sin convención de nombres) | Archivos duplicados e inlocalizables | Entrevista 01 |
| Seguridad deficiente (contraseñas "123456", "abogada2024") | Datos de víctimas y menores expuestos | Entrevista 01, 03 |
| Envío de documentos sensibles por WhatsApp/correo | Filtración accidental de información confidencial | Entrevista 03 |
| Pérdida de 4-6 horas semanales buscando documentos | Menor tiempo de atención a clientes | Entrevista 01, 02, 03 |

### 1.2. Entrevistas Realizadas

| Entrevista | Perfil | Experiencia | Duración | Hallazgos Clave |
|------------|--------|-------------|----------|-----------------|
| #01 | Abogado varón, Derecho de Familia (asistencia familiar) | 12 años | 52 min | Carpetas por cliente sin sub-organización; pérdida de convenios en juzgado; escaneos duplicados |
| #02 | Abogada mujer, Patria Potestad y Menores | 8 años | 48 min | Dependencia total de asistente Mariela; 40-50 docs mezclados por caso; impresión de versión incorrecta de demanda |
| #03 | Abogada mujer, Violencia Doméstica y Protección a Víctimas | 3 años | 35 min | Casos urgentes sin tiempo para ordenar; certificado forense perdido como "scan001.jpg"; direcciones de víctimas en laptop sin cifrado |

### 1.3. Requerimientos Funcionales Consolidados

Extraídos de las tres entrevistas, consolidados por frecuencia y prioridad:

#### Requerimientos de Alta Prioridad (mencionados por 3/3 entrevistados)

| # | Requerimiento | Justificación | Objetivo Específico |
|---|---------------|---------------|---------------------|
| RF-01 | Búsqueda semántica inteligente que tolere errores y sinónimos legales | Todos los abogados buscan documentos con nombres imprecisos o incompletos | OE1 |
| RF-02 | Clasificación automática de documentos por contenido (sin etiquetado manual) | Ningún usuario tiene tiempo para nombrar archivos correctamente | OE2 |
| RF-03 | Preguntas en lenguaje natural sobre el estado de los casos | Necesitan respuestas rápidas ante jueces ("¿qué falta para esta audiencia?") | OE1 |
| RF-04 | Seguridad robusta para datos de menores, víctimas y familias | Contraseñas débiles y compartimiento inseguro son riesgos reales | OE4 |

#### Requerimientos de Alta Prioridad (mencionados por 2/3 entrevistados)

| # | Requerimiento | Justificación | Objetivo Específico |
|---|---------------|---------------|---------------------|
| RF-05 | Acceso desde celular en juzgados | Los abogados no trabajan fijos en oficina | OE4 |
| RF-06 | Control de versiones (evitar presentar documentos obsoletos) | Se han presentado versiones viejas de demandas en audiencia | OE5 |
| RF-07 | Alertas proactivas de vencimientos y audiencias | Con tantos casos urgentes, se pasan plazos críticos | OE3 |
| RF-08 | Compartir documentos de forma segura con enlaces temporales | Actualmente envían PDFs sensibles por WhatsApp | OE6 |
| RF-09 | Interfaz ultra simple para personal no técnico | No pueden dedicar días a capacitación | OE4 |

#### Requerimiento de Alta Prioridad (mencionado por 1/3 pero con impacto crítico)

| # | Requerimiento | Justificación | Objetivo Específico |
|---|---------------|---------------|---------------------|
| RF-10 | Rapidez absoluta para casos de emergencia (violencia) | En crisis no hay tiempo para procesos complejos | OE1, OE2 |

### 1.4. Requerimientos No Funcionales

| # | Requerimiento | Descripción |
|---|---------------|-------------|
| RNF-01 | Disponibilidad | Sistema operativo 24/7 para emergencias |
| RNF-02 | Tiempo de respuesta | < 2 segundos para búsquedas semánticas |
| RNF-03 | Cifrado | Datos en reposo y en tránsito con cifrado de extremo a extremo |
| RNF-04 | Escalabilidad | Soporte para crecimiento de casos activos |
| RNF-05 | Usabilidad | Interfaz comprensible sin capacitación formal |
| RNF-06 | Portabilidad | Acceso web responsive desde cualquier dispositivo |

---

## 2. FASE DE DISEÑO

### 2.1. Arquitectura del Sistema

El sistema se estructura en las siguientes capas:

```
┌─────────────────────────────────────────────────┐
│           CAPA DE PRESENTACIÓN                  │
│   Interfaz web responsive + Chat conversacional │
├─────────────────────────────────────────────────┤
│           CAPA DE LÓGICA DE NEGOCIO            │
│   Gestión de casos · Alertas · Permisos         │
├─────────────────────────────────────────────────┤
│           CAPA DE INTELIGENCIA (RAG)            │
│   Embeddings · LLM · Búsqueda semántica         │
├─────────────────────────────────────────────────┤
│           CAPA DE DATOS                         │
│   Base vectorial · BD relacional · Almacenamiento│
├─────────────────────────────────────────────────┤
│           CAPA DE SEGURIDAD                     │
│   Cifrado · RBAC · Auditoría · Enlaces temporales│
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
┌──────────┐     ┌──────────┐     ┌──────────┐
│  CASO    │────<│ DOCUMENTO│>────│ CATEGORÍA│
│──────────│     │──────────│     │──────────│
│ id       │     │ id       │     │ id       │
│ cliente  │     │ caso_id  │     │ nombre   │
│ tipo     │     │ nombre   │     │ auto_gen │
│ estado   │     │ version  │     └──────────┘
│ prioridad│     │ chunks[] │
└──────────┘     │ fecha    │     ┌──────────┐
     │           │ crypt_key│────<│  ALERTA  │
     │           └──────────┘     │──────────│
     │                            │ id       │
     └───────────────────────────>│ caso_id  │
                                  │ tipo     │
┌──────────┐                      │ fecha_lim│
│  USUARIO │────┐                 │ activa   │
│──────────│    │                 └──────────┘
│ id       │    │
│ nombre   │    │            ┌──────────┐
│ rol      │    └───────────>│PERMISO   │
│ crypt_key│                 │──────────│
└──────────┘                 │ user_id  │
                             │ doc_id   │
                             │ nivel    │
                             │ link_temp│
                             │ expira   │
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
