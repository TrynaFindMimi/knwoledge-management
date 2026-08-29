# COTIZACIÓN FORMAL N° KM-RAG-2026-001

### Sistema de Gestión de Conocimiento (KM) con Recuperación Aumentada por Generación (RAG)

---

| | |
|---|---|
| **Fecha de emisión** | La Paz, 28 de agosto de 2026 |
| **Validez de la oferta** | 30 días calendario (hasta el 27 de septiembre de 2026) |
| **Cotización N°** | KM-RAG-2026-001 — Rev. 2 (COCOMO WAE) |
| **Solicitante** | **Buffet de Asistencia Familiar** — Servicio legal gratuito de atención en derecho de familia (La Paz, Bolivia) |
| **Atención** | Representante Legal del Buffet |
| **Oferente** | **Equipo KM-RAG** — Proyecto solidario universitario de Gestión de Proyectos Informáticos |
| | Mariana del Arroyo (Project Manager / Scrum Master) · Nahomi Humerez (Diseño UX/UI) · Santiago Acha (Tech Lead Fullstack / RAG Engineer) · Jorge Saenz (Frontend / QA) |
| **Contacto** | [correo institucional del equipo] · [tel.] — La Paz, Bolivia |
| **Referencia técnica** | `TDR_KM_RAG.md` v2.0 (29 RF + 19 RNF) · `Estimacion_COCOMO_KM_RAG.md` v1.2 (PF 202 · WOP 136,5 · KLOC-WAE 12,01) · `Contrato_KM_RAG.md` |
| **Moneda** | Bolivianos (Bs.) — Impuesto al Valor Agregado (IVA 13% - Ley 843) discriminado |
| **Plazo de ejecución** | **4 meses** de desarrollo (8 sprints de 2 semanas) **+ 2 meses** de garantía técnica post-producción |

> **Nota:** La presente cotización sustituye y deja sin efecto cualquier precio referencial previo (Bs. 15.000 y Bs. 13.800). El precio de venta se determina íntegramente mediante modelo **COCOMO 81 / COCOMO II + Web Application Extension (WAE)** para el periodo fijo de **4 meses + 2 meses de garantía**, con el **pipeline RAG como inductor principal de costo** (`CPLX Extra Alta 1,32`).

---

## Carta de presentación

Señores
**Buffet de Asistencia Familiar**
Presente.-

**Ref.: Cotización formal para el desarrollo del Sistema de Gestión de Conocimiento con RAG**

De nuestra mayor consideración:

Tenemos el agrado de dirigirnos a ustedes a fin de presentar nuestra propuesta técnico-económica para el **diseño, desarrollo, despliegue, documentación y capacitación** del Sistema de Gestión de Conocimiento (KM) con motor de Recuperación Aumentada por Generación (RAG), destinado a la sistematización de archivos y documentos legales del servicio de asistencia familiar.

La propuesta ha sido elaborada bajo estándares de **Gestión de Proyectos Informáticos (PMI/Pressman/Boehm)**, con estimación de esfuerzo y costo mediante **COCOMO 81, COCOMO II y su extensión para aplicaciones web (WAE - Web Application Extension, Boehm et al.)**, y dimensionada para un **cronograma improrrogable de 4 meses + 2 meses de garantía**, ponderando de manera expresa la complejidad del subsistema RAG (segmentación 500/100, embeddings en español 768 dimensiones, índice HNSW, re-ranking y citación de fuentes con latencia < 3 s).

Quedamos a disposición para cualquier aclaración y agradecemos la confianza depositada.

Atentamente,

**Equipo KM-RAG**

---

## 1. Objeto y alcance

El objeto comprende la provisión integral de un sistema web **SPA React 18 + Vite + Ant Design 5.x** (8 vistas), **API REST + WebSocket** (FastAPI/Express + LangChain/LlamaIndex), **base vectorial ChromaDB/pgvector (HNSW)**, **PostgreSQL/MongoDB**, despliegue **Vercel (frontend) + Railway (backend/BD/vector/cron)**, y **pipeline RAG completo**, conforme a los 29 requerimientos funcionales y 19 no funcionales del TDR v2.0.

El detalle pormenorizado de funcionalidades (gestión de casos, ingesta y clasificación automática 50 MB, desduplicación por embeddings >85%, control de versiones con diff, búsqueda semántica tolerante a sinónimos legales, chat conversacional con citas y memoria, alertas proactivas 48h/24h/2h, audiencias con checklist y paquete PDF consolidado, compartición por enlaces JWT temporales single-use con watermark, seguridad AES-256/TLS 1.3/RBAC a nivel de *chunk* y auditoría inmutable) consta en el **TDR_KM_RAG.md** y en el **Contrato_KM_RAG.md - Cláusula Tercera**, que forman parte integrante de la presente.

---

## 2. Metodología de estimación

La valorización se sustenta en **tres métodos independientes**, exigidos por la cátedra para proyectos académicos solidarios. El método principal es **COCOMO WAE**; los dos restantes operan como alternativas de contraste para la determinación del precio de venta.

| Método | Fundamento | Tamaño estimado |
|---|---|---|
| **COCOMO WAE (principal)** | Extensión web de COCOMO II (Boehm). Mide *Web Objects*: WEB (14 pantallas dinámicas), SCR (7 reportes), ACS (12 componentes, de ellos 5 RAG con peso 6,0), DBC (9 colecciones + vector). **136,5 WOP × 88 LOC/WOP = 12,01 KLOC**. Factores de escala SF 23,59 → B 1,1459. Multiplicadores **EM_RAG 1,45** (CPLX 1,32 ★, DATA 1,18, TIME 1,15, SCED 1,14 por compresión a 4 meses). Esfuerzo **48,14 PM**, T nominal 12,99 meses. Ver `diagramas/wae/WAE_01.svg` a `WAE_05.svg` (estereotipos `«action»`, `«client page»`, `«form»`, `«collection»`). | 12,01 KLOC |
| **Alternativa C1 - Bottom-Up** | Horas-hombre por sprint (Scrum). 4 personas × 15 h/sem × 16 sem + 160 h garantía. | 960 h + 160 h |
| **Alternativa C2 - PF Monetizado** | Puntos de Función IFPUG (PFNA 202, PFA 232,3) × tarifa La Paz 2026 (65-90 Bs/PF). | 191,9-232,3 PF |

El periodo contractual fijo (**4,00 meses**) implica un factor de compresión de **3,25×** respecto al T nominal (12,99 meses), calificado como compresión extrema por Boehm (dispara `SCED 1,14`). Dicho desfase explica el subsidio solidario universitario: **2,80×** en esfuerzo y **hasta 8,1×** vs. tarifa de mercado (Bs. 5.375/PM).

---

## 3. Propuesta económica — Precio COCOMO II (a cobrar)

> **Criterio:** Se elimina el desglose “precio base”. **El precio a cobrar es directamente el que indica COCOMO II (WAE).** Todos los montos se expresan **IVA incluido (13% Ley 843)**, tal como debe facturarse al Buffet.

### 3.1 Cuadro comparativo — ¿Cuánto debo cobrar? (Bs., IVA incluido)

| N° | Concepto | **Precio COCOMO II a cobrar (IVA incluido)** | Condición de aplicación |
|---|---|---|---|
| **Opción A — COCOMO II WAE-RAG ★ RECOMENDADA** | WAE 12,01 KLOC + EM_RAG 1,45 — 4 meses + 2 meses garantía (30% carga). Tarifa ajustada La Paz 2026 **Bs. 3.000/PM** (RAG especializado). Cubre 16 PM + 1,2 PM + **overhead RAG 15%**. Cálculo: `COCOMO II = 48,14 PM → 17,2 PM calendario × 3.000 + 15% RAG = 67.054,20` | **Bs. 67.054,20** | **Precio de venta COCOMO II. Es lo que se debe cobrar.** |
| **Opción B — COCOMO II WAE base** | WAE 12,01 KLOC, EM 1,0 — 16 + 1,2 PM × 3.000. Sin overhead RAG. `COCOMO II = 33,21 PM → 51.600 → 58.308,00` | **Bs. 58.308,00** | **Descuento de pago al contado al firmar el contrato.** |
| **Opción C — Alternativa académica (referencial)** | Bottom-Up + PF Monetizado. Piso part-time. | **Bs. 15.184,00** promedio (16.272 / 14.096) | Solo referencia. No cubre 4 meses full-time. |

**¿Cuánto debo cobrar el sistema?** **Bs. 67.054,20** (Opción A, COCOMO II WAE-RAG). La Opción B (**Bs. 58.308,00**) es únicamente el descuento por pago al contado. La Opción C acredita que el precio COCOMO II no está inflado. Ver `diagramas/wae/WAE_03.svg`.

### 3.2 Desglose de la Opción A (recomendada) — 4 meses + 2 meses de garantía

| Concepto | Valor |
|---|---|
| Tamaño WAE | 136,5 WOP (WEB 14 · SCR 7 · ACS 12 — de ellos 5 RAG) → 12,01 KLOC (88 LOC/WOP) |
| Factores de escala | SF 23,59 → B 1,1459 |
| Multiplicadores | EM_RAG 1,45 (CPLX 1,32 ★ · DATA 1,18 · TIME 1,15 · SCED 1,14) |
| Esfuerzo WAE-RAG | **48,14 PM** · T nominal 12,99 meses · P 3,71 personas |
| Periodo contractual | **4,00 meses** (16 semanas) → compresión 3,25× |
| Equipo asignado | 4 profesionales (PM/SM · UX/UI · Tech Lead RAG · Frontend/QA) |
| Personas-mes calendario | 4 pers. × 4 meses = **16,0 PM** desarrollo + **1,2 PM** garantía (30% dedicación × 2 meses) = **17,2 PM efectivos** |
| Tarifa La Paz 2026 | **Bs. 3.000 / PM** (equiv. 18,75 Bs/h × 160 h) — RAG especializado, ajustada a mercado. Tarifa de mercado referencial: Bs. 5.375/PM. |
| Factor de subsidio | 48,14 / 17,2 = **2,80×** en esfuerzo; **4,4×** vs. tarifa de mercado (5.375/3.000). |

**Memoria de cálculo COCOMO II (cuánto cobrar):**

```
COCOMO II WAE-RAG: 48,14 PM nominal → 17,2 PM calendario (16,0 dev + 1,2 garantía 30%)
COCOMO II dice:    17,2 PM × 3.000 Bs/PM = 51.600,00 Bs  (WAE base)
                 + 15% RAG (CPLX 1,32)    =  7.740,00 Bs
                 ─────────────────────────────────────
Precio COCOMO II a cobrar (Opción A):    67.054,20 Bs  (IVA incluido) ★
Precio COCOMO II con descuento contado:  58.308,00 Bs  (Opción B, IVA incluido)
```

El **Bs. 7.740,00** financia exclusivamente tuning HNSW, re-ranking, latencia <3 s y prompts en español boliviano. **COCOMO II ya entrega el precio a cobrar**.

### 3.3 Alcance económico — qué incluye y qué no incluye

**Incluye:** Diseño, desarrollo, pruebas, despliegue y documentación del sistema descrito en el numeral 1, manual técnico / de usuario / de despliegue, dos jornadas de capacitación presencial/virtual con grabaciones, y **garantía técnica de 60 días** post-producción.

**No incluye:** Costos recurrentes de infraestructura y servicios de terceros más allá de sus niveles gratuitos (Vercel Hobby USD 0, Railway USD 5-20/mes, dominio .bo aprox. Bs. 980/año, consumo OpenAI/Mistral/Pinecone), carga masiva histórica superior a 20 casos de prueba, integración con LEXIUS/ERP, aplicación móvil nativa ni redacción de contenido legal. Dichos conceptos serán asumidos directamente por el Buffet conforme a las proformas de referencia (ver numeral 6). El Equipo asesorará para minimizar dichos costos.

---

## 4. Alternativas — sustento del precio

### 4.1 Alternativa C1 — Bottom-Up por sprints

Dedicación part-time universitaria (4 pers. × 15 h/sem × 16 sem + 160 h garantía).

| Escenario | Horas | Tarifa | Base |
|---|---|---|---|
| Mínimo | 960 h | 15 Bs/h | 14.400,00 Bs |
| Medio | 960 h | 18 Bs/h | 17.280,00 Bs |
| Garantía 2 m | 160 h | 15 Bs/h | 2.400,00 Bs |
| **Total C1** | **1.120 h** | 15-18 Bs/h | **16.800 - 19.680 Bs** (IVA incl. 18.984 - 22.238) |

Acredita el piso académico, pero **no permite cumplir el plazo de 4 meses** en modalidad full-time; su cumplimiento exigiría extender a 6-7 meses.

### 4.2 Alternativa C2 — Punto de Función Monetizado

Tarifa de mercado La Paz 2026: 65-90 Bs/PF.

| PF | Tarifa | Base |
|---|---|---|
| 191,9 PFA conservador | 65 Bs/PF | 12.474,00 Bs |
| 202 PFNA | 80 Bs/PF | 16.160,00 Bs |
| 232,3 PFA realista | 90 Bs/PF | 20.907,00 Bs |

Promedio C1+C2: **13.437 / 15.184**. Dicho valor coincide con el precio mínimo COCOMO histórico (Bs. 13.800), lo que valida la razonabilidad de la cotización. WAE-RAG (35.604) equivale a **2,65×** dicho piso, justificado por la compresión y la complejidad del RAG.

---

## 5. Forma de pago — 5 hitos COCOMO II (8 sprints, IVA incluido)

Hitos calculados con **COCOMO II a cobrar (Bs. 67.054,20)**. De optarse por el descuento contado (Opción B, **Bs. 58.308,00**), se aplican los mismos % sobre ese total.

| Hito | Oportunidad | % | **Precio COCOMO II a cobrar (Bs., IVA incluido)** | Sprints | Entregables sujetos a validación |
|---|---|---|---|---|---|
| **H1** | Firma + Plan/Mockups aprobados | 20% | **13.410,84** | S1 (sem. 1-2) | E1 Plan/cronograma + E2 Figma + arquitectura + decisión BD |
| **H2** | Ingesta inteligente completada | 15% | **10.058,13** | S2-S3 (sem. 3-6) | E3 Auth+Casos + E4 Upload/chunk/embed/clasif./dedup |
| **H3** | RAG + Audiencias ★ | 25% | **16.763,55** | S4-S5 (sem. 7-10) | E5 Búsqueda+Chat RAG con citas + E6 Audiencias/checklist/PDF |
| **H4** | QA en staging superada | 15% | **10.058,13** | S6-S7 (sem. 11-14) | E7 Versiones+JWT+auditoría + E8 PWA/ZIP/notifs. + E9 QA |
| **H5** | Producción + docs + capacitación (inicio garantía) | 25% | **16.763,55** | S8 (sem. 15-16) | E10 Prod Vercel/Railway + E11 Manuales + E12 Capacitación |
| **Total Opción A (COCOMO II a cobrar)** | | 100% | **67.054,20** | 16 sem. | E1-E12 |
| Total Opción B (descuento contado) | | 100% | 58.308,00 | — | — |
| Total Opción C promedio | | 100% | 15.184,00 | — | — |

**Plazo de pago:** 15 días hábiles computados desde la aprobación del hito. La falta de pronunciamiento fundado en 5 días hábiles se tendrá por **aprobación tácita** (Contrato, Cláusula 5.2). La mora superior a 15 días habilita la suspensión del sprint siguiente, sin afectar pagos ya devengados (Cláusula Primera).

**Descuento por pago al contado:** La Opción B (Bs. 34.984,80 total) se aplicará **única y exclusivamente** cuando el **100% del precio se cancele al contado al momento de la firma del contrato**. No es acumulable con otras bonificaciones y requiere constancia de pago.

---

## 6. Plazo, garantía y condiciones comerciales

**6.1 Plazo.** 16 semanas improrrogables salvo causa justificada aprobada por escrito. Cada sprint cierra con demo funcional.

**6.2 Garantía.** **60 días calendario** desde la puesta en producción (H5). Comprende corrección sin costo de defectos atribuibles al desarrollo, re-indexado vectorial menor, ajustes de prompts RAG y tuning HNSW para cumplimiento de <3 s. **Exclusiones:** modificaciones de alcance, datos no anonimizados provistos por el Buffet, fallos de infraestructura de terceros (Vercel/Railway/LLM), y uso contrario al Manual de Usuario.

**6.3 Post-garantía.** Vencida la garantía, toda intervención constituye nuevo proyecto. Mantenimiento opcional: **Bs. 1.500/mes** (30% de 1 PM + consumo LLM).

**6.4 Propiedad intelectual y confidencialidad.** Código, documentación y diseños serán de propiedad exclusiva del Buffet tras el pago total. El Equipo mantendrá confidencialidad estricta sobre datos de víctimas/menores/familias y estrategias legales por **mínimo 3 años** post-contrato, con cifrado AES-256 en reposo, TLS 1.3 en tránsito y RBAC a nivel de *chunk* (Contrato, Cláusulas 7-8).

**6.5 Tributos.** IVA 13% discriminado conforme a Ley 843; IT y RC-IVA según régimen del oferente. El Equipo emitirá factura con desglose. El Buffet entregará comprobantes de retención en plazos legales. De acreditar exención impositiva, deberá presentarla previo a la firma.

**6.6 Infraestructura.** No incluida en el precio (numeral 3.3). Proformas de referencia a disposición del Buffet; el Equipo configurará los servicios en cuentas del Buffet o, previa autorización, en cuentas propias con *handover* documentado.

**6.7 Control de cambios.** Todo incremento >10% en PFNA/KLOC o nuevo requerimiento requiere adenda firmada (Contrato, Cláusula 11).

---

## 7. Comparativa y subsidio solidario

```
Mercado empresa (COCOMO 81 Semi 8,48 KLOC × 5.375 Bs/PM): 177.000 - 230.600 Bs  ─┐
COCOMO II realista 12 KLOC (81 PM × 4.000):                326.640 Bs           │  precio industrial
WAE-RAG nominal 48 PM × 4.000:                             192.560 Bs           ─┘

Opción A WAE-RAG solidaria 4+2 (35.604):        ████ 40.232 total  ← venta propuesta
Opción B WAE base 4+2 con descuento contado:    ███  34.985 total  ← descuento al contado
Opción C piso académico (13.437):               █    15.184 total  ← piso referencial
```

Subsidio solidario de la Opción A respecto al mercado: **5,7× a 8,1×**. La diferencia se explica por tarifa beca (1.800 vs. 5.375) y por el carácter universitario del proyecto.

---

## 8. Anexos y validez

- **Anexo técnico:** `Estimacion_COCOMO_KM_RAG.md` §§ 7 (WAE) y 8 (precio 4+2) + `diagramas/wae/WAE_01.svg` a `WAE_05.svg` (estereotipos `«action»`, `«client page»`, `«form»`, `«collection»`) y `diagramas/base_de_datos/Base_de_Datos_01.svg`.
- **Anexo contractual:** `Contrato_KM_RAG.md` y `TDR_KM_RAG.md` v2.0.
- **Vigencia y aceptación:** 30 días. La aceptación se formaliza con la suscripción del Contrato y el pago del Hito 1 (o del total en caso de acogerse al descuento de la Opción B). Precio fijo para alcance cerrado (29 RF + 19 RNF).

---

La Paz, 28 de agosto de 2026

**Equipo KM-RAG**

| | |
|---|---|
| **Mariana del Arroyo** — Project Manager / Scrum Master | Firma: _________________________ |
| **Nahomi Humerez** — Diseño UX/UI | Firma: _________________________ |
| **Santiago Acha** — Tech Lead Fullstack / RAG Engineer | Firma: _________________________ |
| **Jorge Saenz** — Frontend / QA | Firma: _________________________ |

**Aceptación del Buffet de Asistencia Familiar**

| | |
|---|---|
| Nombre y cargo: _________________________ | Firma y sello: _________________________ |
| Fecha: ____ / ____ / 2026 | Opción elegida: ☐ A (40.232,52) · ☐ B contado (34.984,80) |

> La presente cotización reemplaza cualquier precio previo (Bs. 15.000 y Bs. 13.800). El precio de venta es **COCOMO puro** para **4 meses + 2 meses de garantía** con **RAG enfatizado**.
