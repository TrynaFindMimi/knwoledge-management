# ANALISIS DE LA PROBLEMATICA — SISTEMA KM CON RAG

## Buffet de Asistencia Familiar — La Paz, Bolivia

**Fecha:** 30/08/2026
**Version:** 1.0
**Ubicacion en repositorio:** `documentos/Analisis_Problematica_KM_RAG.md` (analisis base, trazable a TDR Seccion 2, Ciclo de Vida Seccion 1.1, Ishikawa y BPWin)
**Autores:** Mariana del Arroyo (PM), Santiago Acha (Tech Lead RAG), Nahomi Humerez (UX/UI), Jorge Saenz (Frontend/QA)
**Metodologia:** Entrevistas semiestructuradas (3), Ishikawa 6M, 5 Porques, Arbol de Problemas/Objetivos, Pareto, Stakeholders, BPMN/BPWin IDEF0
**Referencias:** `entrevistas/Entrevista_Abogado_*.md`, `diagramas/diagrama ishikawa.svg`, `diagramas/bpwin/*.svg`, `TDR_KM_RAG.md` Seccion 2-3, `Gestion_Riesgos_KM_RAG.md` I01-I05

---

## INDICE

1. Contexto institucional
2. Problematica central y cuantificacion
3. Evidencia de campo (3 entrevistas)
4. Analisis causal — Ishikawa 24 causas
5. Analisis 5 Porques
6. Arbol de problemas → Arbol de objetivos
7. Stakeholders y necesidades diferenciadas
8. Proceso actual (AS-IS) vs proceso mejorado (TO-BE)
9. Brechas vs objetivos/limites/alcance
10. Conclusion y trazabilidad

---

## 1. Contexto institucional

El Buffet de Asistencia Familiar brinda servicios legales gratuitos en derecho de familia (asistencia familiar, patria potestad, violencia domestica y proteccion a victimas) en La Paz, Bolivia. Atiende a mas de 50 casos activos simultaneos, con atencion a familias en situacion de vulnerabilidad. Su valor es defender pensiones de alimentos, guarda y medidas de proteccion, donde un dia de retraso perjudica a menores.

No existe sistema de gestion documental. La gestion es hibrida fisica-digital sin criterio: folders manila rotulados a mano, archivador verde, carpetas `Escaneos 2024` / `Documentos` / escritorio, fotos con celular y Drive sin convencion de nombres, sin indice ni control de versiones. Referencia: `TDR_KM_RAG.md` Seccion 2 y `Ciclo_de_Vida_del_Proyecto.md` Seccion 1.1.

---

## 2. Problematica central y cuantificacion

**Problema central:** Sistematizacion artesanal de archivos y documentos legales oficiales provoca perdida de tiempo critica, perdida de documentos en audiencias, confusion de versiones y riesgo de filtracion de datos sensibles, impidiendo cumplir tiempos procesales y proteger a victimas.

| Indicador linea base | Valor actual | Fuente | Impacto en servicio legal | Objetivo asociado |
|----------------------|--------------|--------|---------------------------|-------------------|
| Tiempo de busqueda | 4-6 horas/semana por abogado = 208-312 h/anio | Entrevista 01:32, 02, 03 | Menos horas de patrocinio, atencion a familias reducida | OE1 <30 seg, RNF-07 |
| Volumen casos | 50+ casos activos, 40-50 docs por caso | Entrevista 02 | Sin sub-organizacion, duplicados | OE2 |
| Docs sin clasificar | 200 archivos (`scan001.jpg`, `ACUERDO_FINAL2.pdf`) sin convencion | Entrevista 01:40 | Inlocalizables, 90% mal etiquetados | OE2 RF-09 |
| Perdida en audiencia | Convenio no encontrado en Juzgado 3ro (15/07), prorroga 24h | Entrevista 01:32 | Percepcion irresponsabilidad, perjuicio cliente | OE3 RF-21/22 |
| Versionado fallido | Demanda obsoleta impresa presentada ante jueza | Entrevista 02 | Riesgo procesal, retrabajo | OE5 RF-11 |
| Seguridad | Contrasenas `123456`/`abogada2024`, direcciones victimas sin cifrar en laptop, envio por WhatsApp sin proteccion | Entrevista 01:44, 03 | Exposicion victimas/menores, incumplimiento normativa proteccion datos | OE4 RF-03, RNF-02 |
| Dependencia persona clave | Asistente Mariela unica que ubica archivos; bus factor =1, paralisis si falta | Entrevista 02 | Riesgo operativo critico | OE2 RF-09 |
| Digitalizacion | 200 docs en 2 anios sin indice, duplicados sin deteccion | Entrevista 01:40 | Deuda tecnica que impide escalar a 5000 docs (RNF-16) | OE5 RF-10 |

**Sintesis:** El costo de no sistematizar es 1 dia laboral/semana perdido por abogado + 1 riesgo critico por audiencia + exposicion legal por datos sin cifrar. El sistema actual no escala a 5000 docs proyectados ni permite acceso movil en juzgados (RNF-14).

---

## 3. Evidencia de campo — 3 entrevistas

| Entrevista | Perfil | Experiencia | Duracion | Hallazgos clave (frase textual) | Problema trazable |
|------------|--------|-------------|----------|---------------------------------|-------------------|
| #01 | Abogado varon, Derecho de Familia (asistencia familiar) | 12 anios | 52 min | "Cuatro horas a la semana buscando", "Juzgado 3ro, tuve que pedir 24h", "scan001.jpg", "contrasena 123456" | P1 Registro, P2 Ingesta, P3 Busqueda |
| #02 | Abogada mujer, Patria Potestad y Menores | 8 anios | 48 min | "Solo Mariela sabe donde esta", "40-50 docs mezclados por caso", "imprimi version vieja de demanda" | P1, P6 Versiones, dependencia |
| #03 | Abogada mujer, Violencia Domestica y Proteccion a Victimas | 3 anios | 35 min | "Certificado forense perdido como scan001.jpg", "direcciones victimas en laptop sin cifrar", "WhatsApp sin proteccion", "caso urgente sin tiempo" | P2, P7 Alertas, seguridad OE4 |

Ver transcripciones anonimas completas en `entrevistas/Entrevista_Abogado_01.md`, `02.md`, `03.md` y resumen de necesidades por prioridad en cada entrevista.

---

## 4. Analisis causal — Ishikawa (24 causas, 6 categorias)

Fuente grafica: `diagramas/diagrama ishikawa.svg` y detalle por proceso en `diagramas/bpwin/BPWin_P*.svg`.

| Categoria Ishikawa | Causas raiz | Efecto observable |
|--------------------|-------------|-------------------|
| **Tecnologia** | Sin busqueda semantica, sin embeddings ES, sin vector DB HNSW, sin OCR | Busqueda exacta falla con `conbenio`/`convenio` |
| **Personas** | Sin capacitacion, dependencia Mariela, sin roles RBAC | Paralisis si falta una persona, 5h capacitacion no disponible |
| **Procesos** | Sin clasificacion auto, sin checklist audiencia, sin alertas 48h/7d | Checklist manual, plazos vencidos sin aviso |
| **Informacion** | Nombres genericos `scan001.jpg`, duplicados sin dedup >85%, sin versionado v1..vN | 200 docs sin indice, demanda vieja presentada |
| **Seguridad** | Contrasenas debiles, sin AES-256 campo, sin TLS 1.3, sin auditoria inmutable, envio WhatsApp | Datos victimas expuestos |
| **Organizacion** | 50 casos sin indice, folders sin criterio, sin dashboard KPIs | 4-6 h/semana perdidas |

Causas priorizadas por Pareto (80/20): `sin busqueda semantica` + `sin clasificacion auto` + `sin versionado` + `sin RBAC/auditoria` + `sin alertas` = 80% del tiempo perdido y 100% de los incidentes criticos. Atacar estas 5 causas resuelve OE1-OE6.

---

## 5. Analisis 5 Porques (3 hilos criticos)

**Hilo 1 — Dependencia de Mariela (bus factor =1):**
1. Por que solo Mariela ubica archivos? Porque no hay clasificacion automatica por contenido.
2. Por que no hay clasificacion? Porque los nombres son genericos y el proceso es manual.
3. Por que es manual? Porque no existe pipeline de embeddings multilingual y LLM que lea contenido.
4. Por que no existe? Porque no hay sistema KM con RAG con chunk 500/100 y tag sugerido.
5. Por que no hay KM? Porque no se ha sistematizado el conocimiento documental (objeto de este proyecto: OE2).

**Hilo 2 — Perdida en audiencia (Juzgado 3ro):**
1. Por que no se encontro convenio? Porque busqueda fue por nombre exacto `ACUERDO_FINAL2.pdf`.
2. Por que por nombre exacto? Porque no hay busqueda semantica tolerante a errores/sinonimos.
3. Por que no hay? Porque no hay embeddings ES 768d ni HNSW ni rerank.
4. Por que no hay? Porque no hay vector DB.
5. Causa raiz: sin RAG (OE1).

**Hilo 3 — Riesgo seguridad (victimas):**
1. Por que datos sin cifrar? Porque sin AES-256 campo y sin RBAC chunk-level.
2. Por que sin? Porque gestion es en laptop personal con `123456`.
3. Por que sin control? Porque sin JWT 30m, bloqueo 3 intentos, auditoria inmutable.
4. Causa raiz: sin plataforma segura OE4.

Cada hilo termina en un OE, validando pertinencia de los 6 OE.

---

## 6. Arbol de problemas → Arbol de objetivos

**Arbol de problemas (causa -> problema central -> efecto):**
Causas (sin RAG, sin clasificacion, sin versionado, sin RBAC, sin alertas) -> Problema central (sistematizacion artesanal) -> Efectos (perdida 4-6h/semana, perdida en audiencia, demanda vieja, filtracion datos, paralisis por Mariela, 200 docs sin indice).

**Arbol de objetivos (solucion):**
Cada causa se invierte:
- Causa `sin busqueda semantica` -> **OE1** Motor RAG <3s >=85% tolerante errores/sinonimos (RF-12/13/14, E5)
- Causa `etiquetado manual / scan001.jpg` -> **OE2** Clasificacion auto por contenido + renombrado descriptivo (RF-08/09, E4)
- Causa `plazos vencidos sin aviso` -> **OE3** Alertas 48h/24h/2h y 7d/48h + checklist audiencia + resumen 8AM (RF-15/16/21, E6)
- Causa `contrasenas debiles / WhatsApp` -> **OE4** Plataforma segura AES-256/TLS 1.3/RBAC chunk/auditoria + movil <5 clics (RF-01/02/03/04/24, E3/E7)
- Causa `sobreescritura / duplicados` -> **OE5** Versionado inmutable v1..vN diff + dedup >85% + hash (RF-10/11, E7)
- Causa `envio WhatsApp sin traza` -> **OE6** Comparticion JWT 1h/24h/72h single-use watermark revocable (RF-18/19/20, E7)

Indicadores de objetivo general: tiempo recuperacion 4-6h -> <30s, precision >=85%, 0 filtraciones, trazabilidad 100%, 99.5% uptime (ver `TDR_KM_RAG.md` 3.1 y `Matriz_de_Coherencia.md`).

---

## 7. Stakeholders y necesidades diferenciadas

| Stakeholder | Rol en proceso | Necesidad principal (frase) | Criterio de exito | Proceso BPWin |
|-------------|----------------|-----------------------------|-------------------|---------------|
| Abogado 12 anios | Usuario primario P1-P3 | "Escribir Mamani alimentos y recuperar todo aunque escriba conbenio" | Busqueda <30s, sin etiquetar perfecto | P3 Busqueda |
| Abogada 8 anios | Usuaria P6 | "No volver a imprimir version vieja de demanda" | v1..vN con diff lado a lado | P6 Versiones |
| Abogada 3 anios | Casos urgentes P1/P7 | "Caso urgente en <1 min, datos victima cifrados" | Boton URGENTE + AES campo | P1, P7 |
| Asistente Mariela | Persona clave AS-IS | "Dejar de ser cuello de botella" | 100% docs clasificables sin su intervencion | P2 Ingesta |
| Administrador Buffet | Governance | "Quien/que/cuando/IP trazable, gestionar roles" | Auditoria inmutable + RBAC | P5, P7 |
| Victima/menor | Beneficiario final | "Medida proteccion no vencida sin que me expongan" | Cifrado + alerta 7d/48h | P7 |
| Juez/Juzgado 3ro | Receptor paquete | Paquete PDF ordenado con portada | PDF portada + peso preview | P4 |

Necesidad transversal: acceso movil en juzgados sin cargar folders, <5 clics, sin capacitacion de 3 dias (RNF-11, ver `TDR` 4.1).

---

## 8. Proceso actual AS-IS vs mejorado TO-BE (BPWin IDEF0)

| Proceso | AS-IS (sin sistema) | Dolor | TO-BE (con KM RAG) | Mejora |
|---------|---------------------|-------|--------------------|--------|
| P1 Registro caso | Folder manila manuscrito, sin ID unico | Sin indice, duplicado | CRUD con ID unico, tipo, estado, asignado | Trazabilidad |
| P2 Ingesta | Escaneo a `Escaneos 2024`, nombre generico, sin OCR | 200 docs sin indice | Drag&drop 50MB + OCR + chunk 500/100 + embed 768d + tag auto | 0 etiquetado manual |
| P3 Busqueda | Busqueda por nombre exacto en carpetas | 4-6h/semana, falla con `conbenio` | Query -> embed -> HNSW top-5 -> rerank -> LLM con citas doc/fecha/caso <3s | <30s |
| P4 Audiencias | Agenda manuscrita, checklist mental | Olvido docs, prorroga 24h | Registro fecha/juzgado/tipo -> checklist auto tenidos/faltantes rojo + PDF portada | 0 olvidos |
| P5 Comparticion | WhatsApp sin expiracion ni traza | Filtracion | JWT 1h/24h/72h single-use, watermark, log quien/cuando/IP, revoke <1s | Seguro |
| P6 Versiones | Sobrescritura `ACUERDO_FINAL2.pdf` | Demanda vieja presentada | v1..vN inmutable, diff lado a lado, dedup >85% alerta | Inmutable |
| P7 Alertas | Memoria del abogado | Vencimiento no visto | Cron 48h/24h/2h + 7d/48h + resumen 8AM | Proactivo |

Diagramas IDEF0: `diagramas/bpwin/BPWin_A0_Contexto.svg` (A-0), `BPWin_P1_*.svg` a `BPWin_P7_*.svg`, y `BPWin_A0_Ciclo_Vida.svg` (flujo end-to-end). Ver `Modelado_Procesos_BPWin.md` para reglas RB-01..23.

---

## 9. Brechas vs objetivos, limites y alcance (trazabilidad)

| Problema priorizado | OE que lo resuelve | Alcance (TDR 4) que lo cubre | Limite (TDR 5) que lo acota | Entregable verificado |
|---------------------|--------------------|------------------------------|-----------------------------|-----------------------|
| Busqueda 4-6h | OE1 | Busqueda + Chat RAG (RF-12/13/14) | L3 no redacta demandas (solo cita fuente) | E5 + E9 p95 <3s |
| Etiquetado manual `scan001.jpg` | OE2 | Ingesta 50MB + clasificacion auto (RF-08/09) | L9 no migra 200 historicos masivo (20 prueba) | E4 >=90% |
| Plazos vencidos | OE3 | Alertas 48h/7d + Audiencias checklist (RF-15/21) | L10 no 24/7, solo 99.5% + 60d garantia | E6 ventana +/-10min |
| Datos victimas expuestos | OE4 | Auth + AES campo + RBAC chunk + auditoria (RF-01/04) | L8 no WhatsApp, solo JWT seguro | E3/E7 ZAP 0 high, A+ SSL |
| Demanda vieja presentada | OE5 | Versiones v1..vN diff + dedup >85% + hash (RF-10/11) | L1 no destruye fisico (convivencia) | E7 inmutable |
| Filtracion por envio | OE6 | Comparticion JWT single-use watermark revoke (RF-18/20) | L2 no LEXIUS (export ZIP/PDF manual) | E7 revoke <1s |
| Dependencia Mariela | OE2+OE4 | Dashboard KPIs + acceso movil <5 clics | L7 no app nativa, PWA responsive | E3/E8 <5 min sin ayuda |

Limites L1-L10 justifican que el alcance es complementario, no abogado virtual (L5), solo espanol (L6), sin facturacion (L4). Ver `TDR_KM_RAG.md` Seccion 5 con impacto y alternativa por limite.

---

## 10. Conclusion y trazabilidad

La problematica es sistemica y validada con 3 fuentes primarias + Ishikawa 24 causas + BPWin 7 procesos. Cada causa tiene un OE espejo con RF/RNF y entregable E medible, cubriendo el 100% de los dolores priorizados. El analisis evita alcance difuso: lo incluido (TDR 4) resuelve los 5 dolores Pareto; lo excluido (TDR 5) se justifica con impacto y alternativa, evitando scope creep.

Trazabilidad completa:
- Entrevista -> Problema -> OE -> RF -> Entregable -> Metrica -> Limite (ver `README.md` Mapa OE->RF y `TDR` 3.3 matriz).
- Ishikawa 6 categorias -> OE1-OE6.
- BPWin P1-P7 -> RF 01-29.

Este documento es el insumo base para `TDR_KM_RAG.md` Seccion 2-3 y para la defensa de la Matriz de Coherencia. Guardado en `documentos/Analisis_Problematica_KM_RAG.md` por ser analisis previo a TDR, accesible desde `Ciclo_de_Vida_del_Proyecto.md` 1.1 y `Plan_Proyecto_Cronograma` Sprint 1.

---

## 11. Anexos

- `entrevistas/Entrevista_Abogado_01.md` (52 min), `02.md` (48 min), `03.md` (35 min)
- `diagramas/diagrama ishikawa.svg` (6 categorias, 24 causas)
- `diagramas/bpwin/BPWin_A0_Contexto.svg`, `BPWin_A0_Ciclo_Vida.svg`, `BPWin_P1..P7_*.svg`
- `TDR_KM_RAG.md` (29 RF + 19 RNF), `Matriz_de_Coherencia.md`
- `Gestion_Riesgos_KM_RAG.md` (I01-I05, T01-T13)
- `Ciclo_de_Vida_del_Proyecto.md` (fase investigacion)
