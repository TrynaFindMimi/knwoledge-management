# MODELADO DE PROCESOS CON BPWIN

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG PARA EL BUFFET DE ABOGADOS DE ASISTENCIA FAMILIAR

---

## 1. HERRAMIENTA SELECCIONADA: ALLFUSION PROCESS MODELER BPWIN

### 1.1. Descripción

AllFusion Process Modeler BPWin es un producto de software de modelado de procesos estándar de la industria que permite a los usuarios diseñar y documentar sus procesos de negocio. Proporciona un entorno de trabajo flexible para identificar el flujo de información y mapear visualmente los procesos comerciales para una gestión eficaz y mayor productividad.

### 1.2. Características Relevantes para Este Proyecto

| Característica | Aplicación en el Proyecto |
|----------------|---------------------------|
| Representación gráfica de procesos | Modelado visual de flujos de documentos legales |
| Generación automática de modelos de datos | Diseño de base de datos para casos, documentos y alertas |
| Documentación y visualización de esquemas | Generación de documentación técnica del sistema |
| Acceso al historial y orden de acciones | Trazabilidad de cambios en los modelos de diseño |
| Análisis de procesos | Identificación de cuellos de botella en gestión documental |
| Optimización de procesos | Reducción de tiempos de búsqueda de 4-6 hrs/semana a <30 seg |
| Coherencia y calidad en gestión de datos | Consistencia en el modelado de entidades legales |

---

## 2. PROCESOS A MODELAR

### 2.1. Diagrama de Contexto (Nivel 0)

```
                    ┌─────────────────┐
                    │    ABOGADO      │
                    │ (Usuario primario)│
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
     ┌────────────┐  ┌────────────┐  ┌────────────┐
     │  ASISTENTE │  │  SISTEMA   │  │  TERCEROS  │
     │  (Admin)   │  │  KM con RAG│  │ (SLIM, Def.│
     └────────────┘  └────────────┘  │  Ministerio)│
                                     └────────────┘
```

### 2.2. Procesos de Negocio Identificados

#### PROCESO 1: Registro de Caso Nuevo (P1)

| Elemento | Descripción |
|----------|-------------|
| **Trigger** | Nuevo cliente llega al buffet |
| **Participantes** | Abogado, Sistema |
| **Entrada** | Datos del cliente, tipo de caso |
| **Salida** | Caso registrado con clasificación automática |

**Flujo de Actividades:**

```
1. Abogado ingresa datos del cliente
2. Sistema crea caso con ID único
3. Sistema clasifica tipo de caso automáticamente
   ├── Asistencia Familiar
   ├── Patria Potestad
   ├── Violencia Doméstica
   └── Otros
4. Sistema genera estructura de carpetas virtuales
5. Sistema notifica creación exitosa
```

**Reglas de Negocio:**
- RB-01: Todo caso debe tener al menos nombre del cliente y tipo
- RB-02: La clasificación automática puede ser ajustada por el abogado
- RB-03: Se genera alerta de seguimiento a los 7 días si no hay actividad

---

#### PROCESO 2: Ingesta de Documentos (P2)

| Elemento | Descripción |
|----------|-------------|
| **Trigger** | Abogado carga o escanea un documento |
| **Participantes** | Abogado, Sistema |
| **Entrada** | Archivo (PDF, imagen, texto) |
| **Salida** | Documento indexado, clasificado y versionado |

**Flujo de Actividades:**

```
1. Abogado selecciona caso destino
2. Abogado carga documento (arrastrar/click)
3. Sistema detecta tipo de archivo
4. Sistema extrae texto (OCR si es imagen)
5. Sistema genera chunks semánticos
6. Sistema clasifica documento por contenido
   ├── Demanda
   ├── Contestación
   ├── Informe psicológico
   ├── Certificado médico
   ├── Orden de protección
   ├── Comprobante de pago
   └── Otro
7. Sistema genera embeddings vectoriales
8. Sistema almacena en base vectorial y relacional
9. Sistema crea nueva versión (v1 si es primero)
10. Sistema notifica indexación exitosa
```

**Reglas de Negocio:**
- RB-04: No se permiten archivos mayores a 50MB
- RB-05: Se permite cualquier formato de imagen/PDF/DOCX
- RB-06: Si el nombre del archivo es genérico ("scan001.jpg"), el sistema asigna nombre descriptivo basado en contenido
- RB-07: Se conservan todas las versiones previas (nunca se sobreescribe)

---

#### PROCESO 3: Búsqueda de Información (P3)

| Elemento | Descripción |
|----------|-------------|
| **Trigger** | Abogado necesita encontrar un documento |
| **Participantes** | Abogado, Sistema |
| **Entrada** | Consulta en lenguaje natural o palabras clave |
| **Salida** | Documentos relevantes con fuentes citadas |

**Flujo de Actividades:**

```
1. Abogado escribe consulta en lenguaje natural
   ├── Ej: "informe psicológico Quispe niña"
   ├── Ej: "¿qué documentos faltan para mañana?"
   └── Ej: "certificado forense señora Flores agosto"
2. Sistema procesa consulta (tolerancia a errores)
3. Sistema genera embedding de la consulta
4. Sistema busca en base vectorial (similitud semántica)
5. Sistema recupera chunks más relevantes
6. Sistema recupera documentos fuente
7. Sistema genera respuesta en lenguaje natural
8. Sistema incluye citas de fuentes
   ├── Nombre del documento
   ├── Fecha de carga
   ├── Caso asociado
   └── Enlace directo al documento
9. Sistema presenta resultados al abogado
```

**Reglas de Negocio:**
- RB-08: Respuesta en menos de 3 segundos
- RB-09: Mínimo 3 resultados por consulta
- RB-10: Si la consulta no tiene resultados, sugerir búsquedas alternativas
- RB-11: Registrar todas las búsquedas para mejora del modelo

---

#### PROCESO 4: Gestión de Audiencias (P4)

| Elemento | Descripción |
|----------|-------------|
| **Trigger** | Abogado agenda o se programa una audiencia |
| **Participantes** | Abogado, Sistema |
| **Entrada** | Fecha, juzgado, tipo de audiencia, caso |
| **Salida** | Audiencia registrada + alertas activas + paquete de documentos |

**Flujo de Actividades:**

```
1. Abogado registra audiencia en el sistema
2. Sistema vincula audiencia al caso
3. Sistema identifica documentos requeridos para el tipo de audiencia
4. Sistema verifica qué documentos faltan
5. Sistema genera checklist de documentos
6. Sistema programa alertas:
   ├── 48 horas antes (preparación)
   ├── 24 horas antes (documentos faltantes)
   ├── 2 horas antes (repaso final)
   └── Post-audiencia (seguimiento)
7. Sistema prepara paquete de documentos descargable
8. Sistema notifica al abogado
```

**Reglas de Negocio:**
- RB-12: Alertas según urgencia del caso (violencia = inmediato,常规 = 48h)
- RB-13: El paquete se genera en formato PDF listo para impresión
- RB-14: Se puede acceder al paquete desde celular

---

#### PROCESO 5: Compartición Segura (P5)

| Elemento | Descripción |
|----------|-------------|
| **Trigger** | Abogado necesita compartir documento con tercero |
| **Participantes** | Abogado, Sistema, Tercero (SLIM, Defensoría, Ministerio) |
| **Entrada** | Documento(s) a compartir, destinatario, duración |
| **Salida** | Enlace temporal seguro con registro de acceso |

**Flujo de Actividades:**

```
1. Abogado selecciona documento(s) a compartir
2. Abogado define destinatario (nombre, institución)
3. Abogado define duración del enlace (1h, 24h, 72h)
4. Sistema genera enlace temporal con JWT
5. Sistema configura permisos:
   ├── Solo lectura
   ├── Sin descarga (solo vista)
   └── Con marca de agua
6. Sistema envía notificación al destinatario
7. Tercero accede al enlace
8. Sistema registra:
   ├── Hora de acceso
   ├── IP de acceso
   ├── Documentos consultados
   └── Tiempo de permanencia
9. Al expirar, enlace queda inactivo
10. Sistema notifica al abogado que el enlace expiró
```

**Reglas de Negocio:**
- RB-15: Máximo duración de enlace: 72 horas
- RB-16: Cada enlace es de un solo uso por destinatario
- RB-17: No se comparten documentos de violencia doméstica vía enlace temporal (solo acceso presencial)

---

#### PROCESO 6: Control de Versiones (P6)

| Elemento | Descripción |
|----------|-------------|
| **Trigger** | Abogado modifica un documento existente |
| **Participantes** | Sistema (automático) |
| **Entrada** | Documento modificado |
| **Salida** | Nueva versión registrada, versión anterior preservada |

**Flujo de Actividades:**

```
1. Abogado carga versión modificada de documento existente
2. Sistema detecta que es el mismo documento (similitud > 90%)
3. Sistema pregunta: "¿Es una nueva versión?"
4. Abogado confirma
5. Sistema incrementa número de versión (v1 → v2)
6. Sistema conserva versión anterior completa
7. Sistema actualiza embedding vectorial
8. Sistema marca v2 como "actual"
9. Sistema registra diff entre versiones
10. Sistema notifica actualización
```

**Reglas de Negocio:**
- RB-18: Nunca se elimina una versión anterior
- RB-19: Se puede comparar cualquier dos versiones
- RB-20: La búsqueda siempre retorna la versión más reciente por defecto

---

#### PROCESO 7: Alertas Proactivas (P7)

| Elemento | Descripción |
|----------|-------------|
| **Trigger** | Sistema detecta evento que requiere atención |
| **Participantes** | Sistema, Abogado |
| **Entrada** | Datos de audiencias, plazos, medidas de protección |
| **Salida** | Notificación proactiva al abogado |

**Flujo de Actividades:**

```
1. Sistema monitorea continuamente:
   ├── Audiencias programadas
   ├── Vencimientos de órdenes de protección
   ├── Plazos legales
   └── Casos sin actividad prolongada
2. Sistema detecta evento próximo
3. Sistema clasifica urgencia:
   ├── CRÍTICA (< 24 horas)
   ├── ALTA (< 72 horas)
   ├── MEDIA (< 1 semana)
   └── BAJA (recordatorio general)
4. Sistema genera notificación contextualizada
5. Sistema envía por canal preferido:
   ├── Web (in-app notification)
   ├── Móvil (push notification)
   └── Email (resumen diario)
6. Abogado accede a la notificación
7. Sistema registra si fue leída y atendida
```

**Reglas de Negocio:**
- RB-21: En casos de violencia doméstica, las alertas son siempre CRÍTICAS
- RB-22: No se envían más de 5 alertas por día por abogado (evitar fatiga)
- RB-23: Las alertas incluyen acciones sugeridas ("solicitar prórroga", "preparar informe")

---

## 3. DIAGRAMAS DE FLUJO BPWin

### 3.1. Proceso Principal: Gestión del Ciclo de Vida de un Documento Legal

```
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌─────────┐
│ INICIO  │───>│ Cargar   │───>│ Clasificar│───>│ Indexar  │───>│  Buscar │
│         │    │ Documento│    │ Automático│    │ Vectorial│    │ Cuando  │
└─────────┘    └──────────┘    └──────────┘    └──────────┘    │ Necesite│
                                                                └────┬────┘
                                                                     │
                                              ┌──────────────────────┘
                                              ▼
                                        ┌──────────┐    ┌──────────┐
                                        │ Compartir│───>│  ALERTAS │
                                        │ Seguro   │    │ Proactivas│
                                        └──────────┘    └──────────┘
```

### 3.2. Modelo de Datos BPWin

| Entidad | Atributos | Relaciones |
|---------|-----------|------------|
| **CASO** | id, cliente, tipo, estado, prioridad, fecha_creacion, abogado_id | Tiene N DOCUMENTOS, Tiene N AUDIENCIAS |
| **DOCUMENTO** | id, caso_id, nombre_original, nombre_sistema, tipo_contenido, version_actual, fecha_carga, criptografia_key | Pertenecce a 1 CASO, Tiene N VERSIONES |
| **VERSION** | id, documento_id, numero, contenido_chunk, embedding_vector, fecha_creacion, diff_previa | Pertenecce a 1 DOCUMENTO |
| **USUARIO** | id, nombre, rol, institucion, crypt_key, activo | Tiene N PERMISOS |
| **PERMISO** | id, usuario_id, documento_id, nivel_acceso, link_temporal, fecha_expiracion, usado | Asociado a 1 USUARIO y 1 DOCUMENTO |
| **AUDIENCIA** | id, caso_id, fecha, juzgado, tipo, documentos_requeridos, estado | Vinculada a 1 CASO |
| **ALERTA** | id, caso_id, usuario_id, tipo, urgencia, fecha_limite, activa, leida | Generada para 1 CASO y 1 USUARIO |
| **LOG_ACCESO** | id, usuario_id, documento_id, accion, fecha, ip, detalle | Registra actividad de 1 USUARIO |

---

## 4. REGLAS DE NEGOCIO CONSOLIDADAS

| Código | Regla | Proceso Asociado |
|--------|-------|------------------|
| RB-01 | Todo caso debe tener nombre del cliente y tipo | P1 |
| RB-02 | Clasificación automática ajustable por abogado | P1 |
| RB-03 | Alerta de seguimiento a los 7 días si no hay actividad | P1 |
| RB-04 | No se permiten archivos mayores a 50MB | P2 |
| RB-05 | Se acepta cualquier formato imagen/PDF/DOCX | P2 |
| RB-06 | Nombres genéricos se reemplazan por nombre descriptivo | P2 |
| RB-07 | Nunca se sobreescribe una versión | P2 |
| RB-08 | Respuesta de búsqueda en < 3 segundos | P3 |
| RB-09 | Mínimo 3 resultados por consulta | P3 |
| RB-10 | Sugerir alternativas si no hay resultados | P3 |
| RB-11 | Registrar todas las búsquedas para mejora | P3 |
| RB-12 | Alertas según urgencia del tipo de caso | P4 |
| RB-13 | Paquete de documentos en PDF listo para impresión | P4 |
| RB-14 | Acceso al paquete desde celular | P4 |
| RB-15 | Máximo duración de enlace: 72 horas | P5 |
| RB-16 | Cada enlace es de un solo uso | P5 |
| RB-17 | Documentos de violencia: solo acceso presencial | P5 |
| RB-18 | Nunca eliminar versiones anteriores | P6 |
| RB-19 | Comparar cualquier dos versiones | P6 |
| RB-20 | Búsqueda retorna versión más reciente por defecto | P6 |
| RB-21 | Violencia doméstica = alertas siempre CRÍTICAS | P7 |
| RB-22 | Máximo 5 alertas/día por abogado | P7 |
| RB-23 | Alertas incluyen acciones sugeridas | P7 |

---

## 5. CRONOGRAMA DE MODELADO

| Semana | Actividad BPWin | Entregable |
|--------|-----------------|------------|
| 1 | Modelado de proceso P1 y P2 | Diagramas de flujo registro e ingesta |
| 2 | Modelado de proceso P3 y P4 | Diagramas de flujo búsqueda y audiencias |
| 3 | Modelado de proceso P5, P6 y P7 | Diagramas de flujo compartición, versiones, alertas |
| 4 | Modelo de datos completo + reglas de negocio | Modelo entidad-relación completo |
| 5 | Revisión y validación con usuarios | Documentación validada |

---

## 6. REFERENCIAS

- **BPWin:** AllFusion Process Modeler — Herramienta de modelado de procesos de negocio
- **Entrevistas:** Entrevista_Abogado_01.md, Entrevista_Abogado_02.md, Entrevista_Abogado_03.md
- **Matriz de Coherencia:** Matriz_de_Coherencia.md

---

*Documento generado el 25/08/2026 — Proyecto de Gestión de Proyectos Informáticos*
