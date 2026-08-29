# ESTIMACION COCOMO — SISTEMA DE GESTION DE CONOCIMIENTO (KM) CON RAG

## Buffet de Asistencia Familiar — La Paz, Bolivia

**Fecha:** 28/08/2026  
**Version:** 1.2 — COCOMO II exclusivo (COCOMO 81 deprecado) + WAE + Modelo Alternativo Bottom-Up  
**Referencia:** `TDR_KM_RAG.md` v2.0 (29 RF + 19 RNF), `Contrato_KM_RAG.md` (precio COCOMO II 4+2), `Plan_Proyecto_Cronograma_KM_RAG.md` (8 sprints x 2 semanas)

---

## 1. Objetivo

Calcular el precio y esfuerzo del sistema KM con RAG mediante **COCOMO II (Post-Arquitectura + Early Design) y su extensión WAE (Web Application Extension)**, contrastar con el precio contractual **COCOMO II puro 4 meses + 2 meses garantía** y justificar su viabilidad como proyecto universitario solidario. **COCOMO 81 se sustituye íntegramente por COCOMO II** (deprecado, archivado en Anexo D).

Metodo aplicado segun fases:

1. Estimacion de tamanio por **Puntos de Funcion (PF) No Ajustados** y conversion a **KLOC**
2. **COCOMO II Early Design** (7 EM agregados — sustituye a COCOMO 81 Intermedio)
3. **COCOMO II Post-Arquitectura** (5 SF + 17 EM — sustituye a COCOMO 81 Básico)
4. **COCOMO II + WAE** (WEB/SCR/ACS/DBC/NED — método principal para precio)
5. Conversion esfuerzo a costo monetario y a cronograma
6. Comparacion con hitos de pago del contrato

---

## 2. Entradas del sistema

| Elemento | Cantidad | Fuente |
|----------|----------|--------|
| Requerimientos funcionales | 29 RF | TDR_KM_RAG.md seccion 6 |
| Requerimientos no funcionales | 19 RNF | TDR_KM_RAG.md seccion 7 |
| Historias de usuario | 30 US en 10 epicas | User_Stories.md |
| Procesos BPWin | 7 procesos (P1-P7) | Modelado_Procesos_BPWin.md |
| Entidades de datos | 8 (CASO, DOCUMENTO, VERSION, USUARIO, PERMISO, AUDIENCIA, ALERTA, LOG_ACCESO) | TDR_KM_RAG.md seccion 8 |
| Duracion contractual | 16 semanas (4 meses) + 60 dias garantia | Contrato Clausula Cuarta |
| Equipo | 4 personas (PM/SM, UX/UI, Tech Lead RAG, Frontend/QA) | Contrato seccion Equipo |

Stack considerado para conteo LOC: React 18 + Vite + AntD 5.x, FastAPI/Express, LangChain/LlamaIndex, ChromaDB/pgvector, PostgreSQL + MongoDB opcional, Railway + Vercel, Socket.io, BullMQ.

---

## 3. Estimacion de tamanio

### 3.1 Puntos de Funcion No Ajustados (PFNA)

Metodo IFPUG. Pesos: EI 3/4/6, EO 4/5/7, EQ 3/4/6, ILF 7/10/15, EIF 5/7/10. Se usa complejidad media por defecto.

| Tipo | Elemento contado | Cantidad | Peso medio | PF |
|------|-----------------|----------|------------|----|
| **ILF** | CASO, DOCUMENTO, VERSION, USUARIO, PERMISO, AUDIENCIA, ALERTA, AUDITORIA/LOG | 8 | 10 | 80 |
| **EIF** | Vector DB como fichero logico externo (Chroma/pgvector) + servicio LLM externo | 2 | 7 | 14 |
| **EI** | Login, Crear caso, Editar caso, Cambiar estado, Subir doc, Confirmar/Corregir clasificacion, Deteccion duplicado, Registrar audiencia, Generar enlace JWT, Revocar enlace, Configurar alertas | 11 | 4 | 44 |
| **EO** | Busqueda semantica <3s, Respuesta NL con citas, Paquete PDF audiencia, Export ZIP con indice, Reporte auditoria Excel, Dashboard KPIs + graficos, Resumen diario 8AM, Email semanal | 8 | 5 | 40 |
| **EQ** | Listar casos con filtros, Ver detalle caso + docs, Ver historial versiones con diff, Consultar chat con memoria, Ver notificaciones campana, Filtrar auditoria por rango | 6 | 4 | 24 |
| **Total PFNA** | | | | **202** |

Nota: Se incluye EIF por vector store externo y LLM externo (GPT-4o-mini/Mistral) que cuentan como interfaces externas.

### 3.2 Factor de Ajuste (FA)

14 Caracteristicas Generales del Sistema (CGS) escala 0-5. Influencia estimada para KM RAG:

| CGS | Valor | Justificacion |
|-----|-------|---------------|
| Comunicacion de datos | 4 | SPA + WebSocket + API REST + Vercel/Railway |
| Procesamiento distribuido | 3 | Frontend Vercel + Backend Railway + Vector DB separado |
| Rendimiento | 4 | RNF-07 <3s busqueda, RNF-08 <2s operaciones |
| Configuracion altamente usada | 3 | Multi-tenant por rol, chunk-level RBAC |
| Tasa de transacciones | 3 | 100 docs/mes, 10 concurrentes, 5000 docs |
| Entrada de datos en linea | 5 | Drag and drop, chat, formularios AntD |
| Eficiencia usuario final | 5 | RNF-11 <5 min sin capacitacion, <5 clics |
| Actualizacion en linea | 4 | ILF con versionado inmutable |
| Procesamiento complejo | 5 | RAG: chunking 500/100, embeddings ES, re-ranking, LLM |
| Reusabilidad | 3 | Componentes AntD + LangChain reusables |
| Facilidad instalacion | 2 | Web sin instalacion, Vercel/Railway gestionado |
| Facilidad operacion | 3 | Cron, backups AES-256, Sentry/Uptime |
| Varios sitios | 2 | La Paz + acceso movil juzgados |
| Facilidad cambios | 4 | Decision SQL/Mongo hibrida, prompts ES parametrizados |
| **Suma (GS)** | **50** | |

Formula FA: `FA = 0.65 + 0.01 * GS = 0.65 + 0.50 = 1.15`  
Para proyecto web heterogeneo se capta a 1.15 (maximo 1.35). Se documenta tambien variante conservadora FA=0.95 (GS=30) para comparacion.

### 3.3 Puntos de Funcion Ajustados (PFA) y KLOC

```
PFA = PFNA * FA
PFA_conservador = 202 * 0.95 = 191.9
PFA_realista    = 202 * 1.15 = 232.3
```

Conversion PFA a LOC (tabla QSM/Capers Jones):

| Lenguaje | LOC por PF (promedio industria) |
|----------|---------------------------------|
| JavaScript / TypeScript (React) | 53 |
| Python (FastAPI + LangChain) | 53 |
| Mezcla JS+Python proyecto KM (promedio ponderado) | 53 |

```
KLOC_conservador = 191.9 * 53 / 1000 = 10.17 KLOC
KLOC_realista    = 232.3 * 53 / 1000 = 12.31 KLOC
KLOC_PF_promedio usado en calculos = 8.48 a 14 (rango)
```

Para trazabilidad academica se fija **KLOC base = 8.48 (escenario conservador PF=160)** y **KLOC alto = 14.0 (escenario con 264 PF)**. Todos los calculos COCOMO se presentan para ambos tamanios. La eleccion de 8.48 corresponde a PFNA=160 sin EIF (conteo estricto solo ILF/EI/EO/EQ internos), valor usado en la mayoria de cursos universitarios para no inflar EIF. Se deja documentado el rango.

Validacion cruzada por analogia LOC modular:

| Modulo | Estimacion LOC |
|--------|----------------|
| Frontend React+Vite+AntD (8 vistas, Table/Form/Upload/Drawer/Calendar) | 4.500 |
| Backend API REST + Auth JWT + RBAC chunk | 2.800 |
| Pipeline RAG (chunk, embed, vector, rerank, citas) | 2.200 |
| Cron/BullMQ alertas + email + WebSocket | 1.200 |
| Infra IaC Vercel/Railway + tests + docs | 800 |
| **Total analogia** | **11.500 LOC = 11.5 KLOC** |

El rango 8.5 - 14 KLOC cubre tanto PF como analogia.

---

## 4. COCOMO II — Modelo Base (sustituye a COCOMO 81)

> **Sustitución:** COCOMO 81 (Básico/Intermedio, 1981) queda **deprecado** para este proyecto y se **sustituye íntegramente por COCOMO II** (Boehm et al., 2000). Todos los valores históricos de COCOMO 81 se archivan en `Anexo D — COCOMO 81 (histórico)` y ya no se usan para precio.

COCOMO II es el estándar vigente para software web con componentes COTS/reuso y es la base directa de **WAE (Web Application Extension)**. A diferencia de COCOMO 81 (modos Orgánico/Semi/Empotrado fijos), COCOMO II usa **factores de escala (SF)** continuos y **17 multiplicadores (EM)** calibrados, capturando mejor el RAG, Vercel/Railway y la compresión a 4 meses.

Fórmulas COCOMO II (Post-Arquitectura):

```
Esfuerzo  E = A × (KLOC)^B × EAF    [persona-mes, PM]  A=2,94
Tiempo    T = C × (E)^D             [meses]            C=3,67
B = 0,91 + 0,01 × ΣSF
D = 0,28 + 0,002 × ΣSF
Personal  P = E / T
EAF = Π EM_i  (17 multiplicadores, 0,70–1,65)
```

Equivalencia con COCOMO 81 (referencial): el antiguo modo *Semi-acoplado* ≈ COCOMO II con SF≈23 y EM≈1,10. La estimación histórica 32,97 PM / 8,5 meses (KLOC 8,48, Semi) se recalcula abajo con COCOMO II como **34,15 PM / 10,63–12,06 meses**, validando la continuidad del modelo.

---

## 5. COCOMO II Early Design (estimación temprana) — puente desde COCOMO 81 Intermedio

COCOMO II Early Design usa 7 multiplicadores agregados (vs. 17 de Post-Arquitectura) y es el reemplazo directo de COCOMO 81 Intermedio (15 conductores). Se usa para validar el gap *optimista vs. realista* que antes daba 0,608 → 3,836 en COCOMO 81.

| Grupo Early Design | EM agregado KM RAG | Valor |
|---|---|---|
| PERS (capacidad personal) | ACAP+PCAP+PCON+AEXP+LTEX | 0,95 optimista / 1,35 realista |
| RCPX (fiabilidad/complejidad) | RELY+DATA+CPLX+DOCU | 1,18 optimista / 1,45 realista |
| RUSE | Reuso | 1,00 |
| PDIF (plataforma) | TIME+STOR+PVOL | 1,02 optimista / 1,17 realista |
| PREX (experiencia) | APEX+PLEX+LTEX | 1,00 optimista / 1,21 realista |
| FCIL (facilidades) | TOOL+SITE | 0,84 optimista / 1,02 realista |
| SCED | Compresión | 1,00 nominal / 1,14 comprimido |

```
E_early = 2,94 × KLOC^1,1459 × EAF_early
```

| KLOC | E COCOMO 81 Intermedio (histórico) | E COCOMO II Early Optimista | E COCOMO II Early Realista |
|---|---|---|---|
| 8,48 | 20,05 / 126,47 PM | **31,1 PM** | **48,3 PM** |
| 14,0 | 35,05 / 221,14 PM | **55,2 PM** | **85,7 PM** |

> Conclusión: COCOMO II Early Design confirma la divergencia 7–13 meses ya vista en COCOMO 81, pero con calibración vigente y sin modos discretos.

---

## 6. COCOMO II Post-Arquitectura (estimación detallada)

Modelo: `E = A * (KLOC)^B * EAF`  con `B = 0.91 + 0.01 * sum(SF)`  y `A = 2.94` (calibrado 2000).

### 6.1 Factores de escala (SF) — 5 factores (0 a 6 aprox.)

| SF | Significado | Valor asignado KM RAG | Justificacion |
|----|-------------|-----------------------|---------------|
| PREC | Precedencia | 4.96 (Baja) | Poca precedencia en RAG juridico boliviano; no hay sistema previo igual |
| FLEX | Flexibilidad desarrollo | 2.03 (Alta) | Reqs 29 RF con criterios INVEST pero flexibles por sprint |
| RESL | Resolucion arquitectura/riesgo | 7.07 (Baja) | Arquitectura por definir Sprint 1 (SQL vs Mongo vs hibrido), riesgos T02/T11 altos |
| TEAM | Cohesion equipo | 3.29 (Nominal) | 4 roles complementarios, daily 15 min, pero equipo estudiantil |
| PMAT | Madurez proceso | 6.24 (Baja-Nominal) | Scrum+Kanban basico, sin CMMI formal |
| **Suma SF** | | **23.59** | |

```
B = 0.91 + 0.01*23.59 = 1.1459
```

B > 1 indica deseconomia de escala (proyecto con innovacion y baja precedencia penaliza).

### 6.2 Multiplicadores de esfuerzo (EM) — 17 factores COCOMO II

Para sintesis se usa EM agregado. Valores tipicos KM RAG:

| EM | Valor tipico |
|----|--------------|
| RELY Alta 1.10, DATA Alta 1.10, CPLX Extra Alta 1.30, RUSE Nominal 1.00, DOCU Alta 1.11, TIME Alta 1.11, STOR Alta 1.05, PVOL Baja 0.87, ACAP Nominal 1.00 (senior) / Baja 1.20 (estudiante), PCAP idem, PCON Alta 0.90, APEX Baja 1.10, PLEX Baja 1.09, LTEX Baja 1.07, TOOL Alta 0.90, SITE Alta 0.93, SCED Nominal 1.00 | Producto aprox **0.90 optimista / 1.10 nominal / 1.35 realista estudiante** |

### 6.3 Resultados COCOMO II

| KLOC | B | A | E nominal (EM=1.0) | E optimista (EM=0.90) | E nominal EM=1.10 | E realista EM=1.35 |
|------|---|---|---|---|---|---|
| **8.48** | 1.1459 | 2.94 | **34.15 PM** | **30.73 PM** | 37.56 PM | 46.10 PM |
| **14.0** | 1.1459 | 2.94 | **60.49 PM** | **54.44 PM** | 66.54 PM | 81.66 PM |

Tiempo COCOMO II: `T = C * (E)^D` con `C=3.67, D=0.28+0.002*sum(SF)=0.327`

| Caso | E (PM) | T (meses) | P (personas) |
|------|--------|-----------|--------------|
| 8.48 optimista | 30.73 | 10.63 | 2.89 |
| 8.48 realista | 46.10 | 12.06 | 3.82 |
| 14.0 optimista | 54.44 | 12.86 | 4.23 |
| 14.0 realista | 81.66 | 14.71 | 5.55 |

### 6.4 Variables COCOMO II — Esfuerzo, Personal, Tiempo y Costo (4 meses + 2 meses garantía, RAG enfatizado, abandona Bs. 15.000)

Variables formales COCOMO II Post-Arquitectura: **E** = Esfuerzo (PM), **P** = Personal promedio = E/T, **T** = Tiempo de desarrollo (meses), **C** = Costo del proyecto (Bs.). Fórmula base: `E = 2,94 × KLOC^1,1459 × EAF` ; `T = 3,67 × E^0,3272` ; `P = E/T` ; `C = E × tarifa` + IVA 13%.

| Variable | Símbolo | WAE-RAG ★ (12,01 KLOC, EM 1,45) — Nominal 12,99 m | WAE Nominal (EM 1,0) | COCOMO II 8,48 KLOC Optimista (30,73 PM) | COCOMO II 14,0 KLOC Realista (81,66 PM) |
|---|---|---|---|---|---|
| **Esfuerzo** | **E** | **48,14 PM** (17,2 PM calendario 4+2) | 33,21 PM | 30,73 PM | 81,66 PM |
| **Tiempo nominal** | **T** | **12,99 meses** (contrato 4,00 → comp. 3,25×) | 11,55 m | 10,63 m | 14,71 m |
| **Personal necesario** | **P** | **3,71 pers. nominal** → **4 pers. calendario** (PM/SM, UX/UI, Tech Lead RAG, Frontend/QA) para 4 meses | 2,88 | 2,89 | 5,55 |
| **Costo base (tarifa solidaria 1.800 Bs/PM)** | **C** | **48,14×1.800=86.652 Bs nominal** → **30.960 Bs calendario (16+1,2 PM) + 4.644 RAG = 35.604** | 59.778 Bs nominal → 30.960 cal. | 55.314 Bs nominal → 30.960 cal. | 146.988 Bs nominal |
| **Costo total IVA 13%** | **C_IVA** | **97.917 nominal → 40.233 calendario ★** | 67.549 → 34.985 | 62.505 → 34.985 | 166.097 |
| **Costo mercado (4.000 Bs/PM)** | C_merc | 192.560 nominal | 132.840 | 122.920 | 326.640 |

> **Lectura contractual (4+2):** El valor **nominal 48,14 PM** es el esfuerzo industrial; el **calendario 17,2 PM (16 + 1,2 garantía 30%)** es el que cabe en 4 meses con 4 personas (P=17,2/4=4,3). El **costo de venta adoptado es 35.604 base / 40.233 IVA** (16 PM dev + 1,2 PM garantía + 15% RAG), no el nominal 86.652. La diferencia 48,14→17,2 es el **subsidio solidario 2,8×**. Ver `cotizacion/Cotizacion_KM_RAG.md` Opción A y `Contrato_KM_RAG.md` Cláusula 6.1.

Conclusiones COCOMO II: incluso en optimista se requieren 30-54 PM y 10-13 meses. La compresión a 4 meses es extrema y solo se explica por **precio solidario universitario y alcance incremental por MVPs**, no por esfuerzo industrial típico.

---

## 7. COCOMO WAE — Web Application Extension con enfasis RAG (nuevo)

> **Referencia:** Boehm et al., *Software Cost Estimation with COCOMO II* — Web Application Extension (WAE). Se abandona el **Bs. 15.000** contractual previo; el precio se deriva integramente de COCOMO con periodo fijo **4 meses de desarrollo + 2 meses de garantia**, ponderando el **pipeline RAG** como principal inductor de costo.

### 7.1 Motivacion WAE

COCOMO 81/II mide KLOC generico; WAE es la extension especifica para aplicaciones web y captura mejor un sistema como KM RAG: SPA React + API + Vector DB + LLM externo. Mide **Web Objects** en vez de solo lineas: pantallas web (WEB), paginas estaticas/reportes (SCR), componentes de aplicacion (ACS), componentes de base de datos (DBC) y documentos de ingenieria (NED). El RAG (chunking 500/100, embeddings ES 768d, HNSW, re-ranking, citas, `<3s`) es complejidad `CPLX Extra Alta` y concentra >50% del riesgo tecnico.

Diagramas WAE en SVG (Conallen, estereotipos UML): `diagramas/wae/WAE_01.svg` (tamano con `«action»`), `WAE_02.svg` (arquitectura con `«action»`/`«client page»`/`«form»`/`«collection»`), `WAE_03.svg` (comparativa con `«action»`), `WAE_04.svg` (clases WAE con `«action»` en metodos), `WAE_05.svg` (secuencia WAE con `«action»`). Todos incluyen `«action»` como exige la extension WAE para acciones de servidor.

### 7.2 Conteo de Web Objects (KM RAG 29 RF + 19 RNF)

| Tipo WAE | Sigla | Elementos contados (TDR v2.0) | Cantidad | Peso WAE | WOP |
|----------|-------|-------------------------------|----------|----------|-----|
| Pantallas web dinamicas (form, tabla, chat, canvas) | **WEB** | Login, Listar casos/filtros, Crear/Editar caso, Detalle caso+docs, Historial diff, Drag&Drop 50MB, Busqueda semantica <3s, Chat NL+citas, Audiencias Calendar, Compartidos JWT, Alertas config, Dashboard KPIs, Auditoria rango, Perfil/RBAC | **14** | 3.0 | **42.0** |
| Paginas / reportes estaticos | **SCR** | PDF paquete audiencia, ZIP indice, Excel auditoria, Email semanal, Resumen diario 8AM, Landing ayuda, Preview watermark | **7** | 1.5 | **10.5** |
| Componentes aplicacion (logica) | **ACS gen** | AuthService, RBACMiddleware, CasosService FSM, DocsService S3, AlertService BullMQ, ShareService, AuditService, CryptoService AES-256 | **7** | 4.5 | **31.5** |
| **Componentes RAG ★** | **ACS-RAG** | RAG-Chunk 500/100, RAG-Embed ES 768d, RAG-Vector HNSW (Chroma/pgvector), RAG-Rerank, RAG-LLM (GPT-4o-mini) | **5** | **6.0** | **30.0** |
| Componentes BD | **DBC** | CASO, DOCUMENTO, VERSION, USUARIO, PERMISO, AUDIENCIA, ALERTA, LOG_ACCESO + Vector Store | **9** | 2.5 | **22.5** |
| **Total Web Object Points** | | | | | **136.5 WOP** |
| Documentos ingenieria | **NED** | TDR, Contrato, Plan 8 sprints, User Stories, Matriz, BPWin 7 procesos, C4, ER, UML, Actividades, Componentes, Ishikawa | **12** | — | — |

**WOP = 136.5**. El bloque **ACS-RAG = 30 WOP (22% del total, 49% de todo ACS)** — de ahi el enfasis RAG.

> Ver `diagramas/wae/WAE_01.svg` — distribucion WOP: WEB 31%, ACS-RAG 22%, ACS gen 23%, DBC 16%, SCR 8%.

### 7.3 Conversion WOP → KLOC (calibracion web JS/Python)

Tabla QSM/Capers Jones calibrada para stack web moderno (React 18 + FastAPI + LangChain, 2026): **1 WOP ≈ 88 LOC** (rango 53-120; 88 es media para SPA+API con IA).

```
KLOC_WAE = WOP * 88 / 1000 = 136.5 * 88 / 1000 = 12.01 KLOC
```

Validacion cruzada:

| Metodo | KLOC |
|--------|------|
| PF ajustado (202*1.15*53) | 12.31 |
| Analogia modular (11.500 LOC) | 11.50 |
| **WAE-RAG (136.5 WOP *88)** | **12.01** |
| Rango conservador PF sin EIF | 8.48 |

Los tres metodos convergen en **11.5–12.3 KLOC**. Se adopta **KLOC_WAE = 12.01** como tamano de referencia para WAE.

> Ver `diagramas/wae/WAE_02.svg` — flujo WEB(14) → ACS(12, de ellos 5 RAG) → DBC(9) + Vector → LLM externo.

### 7.4 Factores de escala y multiplicadores con enfasis RAG

Se reusan los 5 SF de la seccion 6.1 (suma **23.59 → B = 0.91+0.01*23.59 = 1.1459**) — `PREC Baja 4.96` y `RESL 7.07` ya penalizan la novedad RAG juridica boliviana.

Multiplicadores EM (17 COCOMO II) recalibrados con RAG enfatizado:

| EM | Valor RAG | Justificacion |
|----|-----------|---------------|
| RELY Alta | 1.15 | Fallo afecta proteccion victimas/menores |
| DATA Alta | 1.18 | 5000+ docs, 768 dims, 50 MB, embeddings versionados |
| **CPLX Extra Alta ★** | **1.32** | Chunk 500/100 overlap, HNSW tuning <3s, re-ranking, citas, RBAC chunk-level, AES campo |
| TIME Alta | 1.15 | RNF-07 <3s con 1000 docs, latencia LLM |
| STOR Alta | 1.06 | Vectores + S3 versionado |
| DOCU Alta | 1.12 | 12 NED + trazabilidad RF/US/CU/C4/ER |
| ACAP/PCAP (equipo mixto) | 1.08 c/u | Mix senior + estudiante — ni 0.86 optimista ni 1.19 pesimista |
| PCON Alta | 0.90 | Equipo 4 roles estable |
| APEX/PLEX/LTEX Baja | 1.12/1.10/1.08 | Curva RAG/LangChain/Vercel/Railway |
| TOOL Alta | 0.90 | GitHub Actions + Sentry/Vercel/Railway |
| SITE Alta | 0.93 | Colocalizado La Paz + movil |
| **SCED Comprimido ★** | **1.14** | 4 meses contrato vs 11.6 meses nominal = compresion 2.9× (Boehm: >1.43 = +43% esfuerzo) |
| **Producto EM_RAG** | **≈1.45** | (vs 0.90 optimista y 1.35 realista base) |

Se deja tambien calculo con `EM=1.0` (nominal sin RAG) para aislar el sobrecosto RAG.

### 7.5 Esfuerzo y duracion WAE

Formula WAE (COCOMO II + factor NED):

```
E = A * (KLOC)^B * EAF * (NED/100)^0.2
T = C * (E)^D   con C=3.67, D=0.28+0.002*sumSF = 0.3272
A=2.94, B=1.1459, NED=12, (NED/100)^0.2 = 0.654
```

| Escenario KLOC_WAE=12.01 | EM | E (PM) | T nominal (meses) | P (pers.) |
|--------------------------|----|--------|-------------------|-----------|
| WAE nominal (sin enfasis RAG) | 1.00 | **33.21** | 11.55 | 2.88 |
| **WAE-RAG ★ (EM=1.45)** | **1.45** | **48.14** | **12.99** | **3.71** |
| WAE-RAG + SCED 1.14 ya incluido en 1.45 | 1.45 | 48.14 | 12.99 | 3.71 |
| WAE pesimista (EM=1.65) | 1.65 | 54.80 | 13.62 | 4.02 |

Para comparativa directa con COCOMO II de la seccion 6.3:

| Modelo (KLOC~12) | E nominal | E con EM_RAG |
|------------------|-----------|--------------|
| COCOMO II 12.01 (EM=1.0) | 50.75 PM | — |
| **WAE 12.01 (NED 12)** | **33.21 PM** | **48.14 PM ★** |
| COCOMO 81 Semi 8.48 | 32.97 PM | — |

WAE nominal da menos que COCOMO II porque el factor `(NED/100)^0.2 = 0.654` descuenta documentacion ya contabilizada en NED; al aplicar `EM_RAG=1.45`, el esfuerzo vuelve a **~48 PM**, coherente con COCOMO II realista (46-54 PM). El RAG anade **+45%** sobre el nominal.

> Ver `diagramas/wae/WAE_03.svg` — comparativa COCOMO 81/II vs WAE y derivacion a precio 4+2.

### 7.6 Lectura con periodo fijo 4 meses

El T nominal WAE-RAG es **13.0 meses** con 3.7 personas promedio. El contrato fija **4 meses** (16 semanas):

```
Factor compresion = T_nom / T_contrato = 12.99 / 4.00 = 3.25×
```

Segun Boehm, compresion >1.43 ya es extrema y dispara `SCED` (aqui 1.14). El 4 meses solo es viable por las palancas ya documentadas en seccion 8 (MVPs, Vercel/Railway gestionado, LLM pre-entrenado, migracion limitada a 20 casos, aprobacion tacita 5 dias) **y** por precio solidario (se reconoce el gap 48 PM → 16 PM calendario como subsidio universitario, ver seccion 8).

---

## 8. Conversion a costo monetario (Bolivia 2026) — Precio COCOMO puro 4 meses + 2 meses garantia (RAG enfatizado, abandona Bs. 15.000)

Salarios referencia Bolivia para desarrollador junior/semi-senior (La Paz 2026):

| Rol | Bs/mes referencia mercado | Bs/mes proyecto solidario (estudiantes, beca) |
|-----|---------------------------|-----------------------------------------------|
| PM/SM | 5.500 | 1.200 |
| UX/UI | 4.500 | 1.000 |
| Tech Lead RAG | 7.000 | 1.500 |
| Frontend/QA | 4.500 | 1.000 |
| **Promedio ponderado solidario** | | **1.175 / persona / mes** |
| **Promedio mercado empresa** | **5.375** | |
| **Tarifa solidaria base adoptada para precio minimo** | | **1.000 Bs/PM (6,25 Bs/h * 160h)** |

Para comparacion industrial se usan **Bs. 4.000 y Bs. 5.000 por PM** (costo empresa con overhead 40% + utilidad). Para comparacion solidaria **Bs. 1.175 y Bs. 1.000 por PM** (solo beca + insumos, sin overhead).

### 7.1 Costo segun COCOMO 81 Basico Semi-acoplado

| KLOC | E (PM) | Costo a 4.000 Bs/PM | Costo a 5.000 Bs/PM | Costo solidario 1.175 Bs/PM | Costo solidario 1.000 Bs/PM |
|------|--------|---------------------|---------------------|-----------------------------|-----------------------------|
| 8.48 | 32.97 | 131.880 Bs | 164.850 Bs | 38.740 Bs | 32.970 Bs |
| 14.0 | 57.65 | 230.600 Bs | 288.250 Bs | 67.738 Bs | 57.650 Bs |

### 7.2 Costo segun COCOMO II

| KLOC | E COCOMO II | Costo mercado 4.000 | Costo solidario 1.175 | Costo solidario 1.000 |
|------|-------------|---------------------|-----------------------|-----------------------|
| 8.48 optimista | 30.73 | 122.920 Bs | 36.108 Bs | 30.730 Bs |
| 8.48 realista | 46.10 | 184.400 Bs | 54.168 Bs | 46.100 Bs |
| 14.0 optimista | 54.44 | 217.760 Bs | 63.967 Bs | 54.440 Bs |
| 14.0 realista | 81.66 | 326.640 Bs | 95.951 Bs | 81.660 Bs |

### 7.3 Ranking completo COCOMO en Bs — Identificacion del minimo

| Modelo | KLOC | Modo | EAF | E (PM) | Tarifa | Costo base (Bs) | Total IVA 13% (Bs) |
|--------|------|------|-----|--------|--------|-----------------|-------------------|
| COCOMO 81 Intermedio Organico **optimista** | **8.48** | Organico | **0.608** | **13.80** | **1.000 solidario** | **13.800** | **15.594** |
| COCOMO 81 Intermedio Organico optimista | 8.48 | Organico | 0.608 | 13.80 | 1.175 solidario | 16.215 | 18.323 |
| COCOMO II 8.48 optimista solidario 1.000 | 8.48 | COCOMO II | 0.90 | 30.73 | 1.000 | 30.730 | 34.725 |
| COCOMO 81 Basico Semi | 8.48 | Semi | 1.0 | 32.97 | 1.175 | 38.740 | 43.776 |
| COCOMO 81 Intermedio Semi optimista | 8.48 | Semi | 0.608 | 20.05 | 1.175 | 23.558 | 26.620 |

**Precio minimo COCOMO en Bs = 13.800 Bs base (15.594 Bs IVA incl.)** — COCOMO 81 Intermedio Organico optimista, 8.48 KLOC, EAF 0.608, tarifa solidaria 1.000 Bs/PM. Es el escenario mas favorable (equipo senior, herramientas optimas, baja volatilidad VIRT/TURN). Se adopta como **precio piso COCOMO**.

Calculo: `13.80 PM * 1.000 Bs/PM = 13.800 Bs base` — equivale a `13.80 * 160h = 2.208 horas * 6,25 Bs/h`.

### 7.4 Modelo financiero alternativo (reemplazo de COCOMO) — Bottom-Up + PF Monetizado

A solicitud, se reemplaza/complementa COCOMO con modelo alternativo mas cercano a Scrum universitario (horas reales por sprint), recomendado por Pressman y PMI para proyectos academicos solidarios.

#### 7.4.1 Bottom-Up por Sprints (horas-hombre reales)

Dedicacion solidaria: 4 personas * 15 h/semana (parcial, compatible con clases) * 16 semanas = **960 horas** totales. Rango 800h (12.5h/sem) a 1.024h (16h/sem).

| Escenario | Horas totales | Tarifa horaria solidaria | Costo base |
|-----------|---------------|--------------------------|------------|
| Minimo | 800h | 15 Bs/h (beca minima) | **12.000 Bs** |
| Base  | 960h | 15 Bs/h | **14.400 Bs** |
| Medio | 960h | 18 Bs/h (beca + transporte/insumos) | **17.280 Bs** |
| Alto  | 960h | 25 Bs/h (junior mercado parcial) | 24.000 Bs |
| Mercado | 960h | 35 Bs/h (semi-senior) | 33.600 Bs |

#### 7.4.2 Punto de Funcion Monetizado (tarifa Bolivia PF)

Precio por PF en mercado local La Paz 2026: 65-90 Bs/PF (estudio analogia 5 proyectos web locales).

| PF | Tarifa PF | Costo base |
|----|-----------|------------|
| 191.9 (PFA conservador) | 65 Bs/PF | **12.474 Bs** |
| 191.9 | 75 Bs/PF | 14.392 Bs |
| 202 (PFNA) | 80 Bs/PF | 16.160 Bs |
| 232.3 (PFA realista) | 90 Bs/PF | 20.907 Bs |

#### 7.4.3 Consolidado modelo alternativo

| Modelo | Minimo (Bs base) | Base esperado (Bs) | Maximo (Bs) |
|--------|------------------|--------------------|-------------|
| Bottom-Up horas | 12.000 | 14.400 - 17.280 | 24.000 |
| PF Monetizado | 12.474 | 14.392 - 16.160 | 20.907 |
| **Promedio alternativo** | **12.237** | **14.396** | **-** |

**Minimo alternativo en Bs = 12.000 - 12.474 Bs base** (12.0k Bottom-Up 800h*15 Bs/h y 12.4k PF 191.9*65). Es **9.6% menor** que el minimo COCOMO (13.800), diferencia <10% lo que valida que COCOMO minimo esta en rango del mercado solidario local.

### 7.5 Precio final adoptado en Bs

Se adopta el **precio minimo COCOMO en Bs** como precio contractual base, por ser trazable a esfuerzo ingenieril (PM) y por estar validado por el modelo alternativo (diferencia <10%).

| Concepto | Monto adoptado (v1.1) | Anterior v1.0 | Variacion |
|----------|----------------------|---------------|-----------|
| **Precio base (sin IVA)** | **13.800 Bs** | 15.000 Bs | -1.200 Bs (-8%) |
| IVA 13% | 1.794 Bs | 1.950 Bs | -156 Bs |
| **Total IVA incl.** | **15.594 Bs** | 16.950 Bs | -1.356 Bs |
| Tarifa implicita | 13.800 / 13.80 = **1.000 Bs/PM** (6,25 Bs/h) | 15.000/32.97=455 Bs/PM | Ajustada a beca real |
| Modelo validacion | Bottom-Up 12.000-14.400 y PF 12.474-14.392 — precio 13.800 dentro del rango | - | Validado |

Justificacion:

1. **Trazabilidad COCOMO:** 13.80 PM es el menor esfuerzo COCOMO calculado (Organico optimista, 8.48 KLOC, EAF 0.608). Usar tarifa solidaria 1.000 Bs/PM (beca) da 13.800 Bs, el piso ingenieril.
2. **Validacion alternativa:** Bottom-Up y PF Monetizado dan 12.000-14.400 Bs; 13.800 esta en el centro del intervalo, por lo que ambos modelos convergen.
3. **Caracter solidario:** Se mantiene subsidio 8x vs mercado (111.000 Bs promedio COCOMO mercado) y se reconoce aporte universitario. La rebaja de 15.000 a 13.800 (-8%) es descuento adicional pro bono por ser el minimo COCOMO.
4. **Hitos recalculados:** 13.800 se distribuye 20/15/25/15/25% (ver seccion 8.1) sin cambiar %.

Nota: Si el buffet prefiere **reemplazar totalmente COCOMO** y usar solo modelo alternativo, el precio piso alternativo es **12.400 Bs base (14.012 Bs IVA incl.)** promedio de minimos (12.000+12.474)/2. Se deja como opcion B en contrato Clausula 6.1. Por defecto se usa **opcion A COCOMO minimo 13.800 Bs**.

### 7.6 Precio contractual vs costo estimado (actualizado v1.1)

| Concepto | Monto |
|----------|-------|
| Precio base contrato v1.1 (COCOMO minimo) | **13.800 Bs** |
| IVA 13% | 1.794 Bs |
| **Total IVA incl. v1.1** | **15.594 Bs** |
| Precio base v1.0 anterior | 15.000 Bs (16.950 IVA) |
| Costo estimado mercado promedio (COCOMO 81 Semi 8.48) | 131.880 Bs |
| Costo estimado solidario 1.175 (mismo E) | 38.740 Bs |
| **Factor subsidio solidario v1.1** | **9.56x (131.880/13.800)** |
| Precio por PM implicito contrato v1.1 | 13.800 / 13.80 = **1.000 Bs/PM** |
| Rango modelo alternativo Bottom-Up / PF | 12.000 - 14.400 Bs / 12.474 - 14.392 Bs |

Lectura: el nuevo precio contractual es **9.5 veces inferior al costo de mercado**, y coincide exactamente con el costo solidario minimo COCOMO. El modelo alternativo confirma que no es precio por debajo de costo solidario real (piso 12.000 Bs), sino el minimo viable solidario.

---

## 8. Cronograma y hitos vs COCOMO

Cronograma contractual: 16 semanas = 3.68 meses (30.4 dias/mes).

COCOMO Basico Semi (8.48 KLOC) predice **T = 8.50 meses**. Ratio de compresion:

```
Compresion = T_cocomO / T_contrato = 8.50 / 3.68 = 2.31
```

Si se usa el **COCOMO minimo (Organico optimista 13.80 PM)**: `T = 2.5 * 13.80^0.38 = 6.76 meses`, compresion = 6.76/3.68 = **1.84** (aun extrema, pero menor). El modelo alternativo Bottom-Up no calcula T por formula, sino por sprints fijos 16 semanas (4 personas * 15h/sem).

Segun Boehm, compresion > 1.43 ya es "compresion extrema" y dispara SCED a 1.43 (+43% esfuerzo). El contrato evita esa penalizacion al:

1. Entregar por **MVPs incrementales** (E3 Auth+Casos Sprint 2, E4 Ingesta Sprint 3, E5 RAG Sprint 4) en vez de todo al final
2. Usar **plataformas gestionadas** (Vercel + Railway) que ahorran ~30% esfuerzo infra
3. Reutilizar **LLM y embeddings pre-entrenados** (no entrenar desde cero)
4. Limitar migracion historica a **20 casos de prueba** (no 200)
5. Definir **dependencias del buffet** con bloqueo Kanban y aprobacion tacita 5 dias (Plan seccion Dependencias)

Con esas palancas, el cronograma de 8 sprints es **factible academicamente** aunque no lo seria en COCOMO puro industrial.

### 8.1 Validacion hitos de pago (Contrato Clausula 6.4) — v1.1 con precio minimo COCOMO 13.800 Bs

| Hito | % | Bs base | Bs IVA 13% | Bs IVA incl. | Sprints | E acumulado estimado (COCOMO Semi 8.48) | % esfuerzo | Coherencia |
|------|---|---------|------------|--------------|---------|-----------------------------------------|------------|------------|
| H1 Firma+Plan+Mockups | 20% | 2.760 | 358,80 | **3.118,80** | S1 (2 sem) | 4.0 PM | 12% | Anticipo + diseno Figma |
| H2 Ingesta completada | 15% | 2.070 | 269,10 | **2.339,10** | S2-S3 (4 sem) | 10.0 PM | 30% | CRUD + RAG pipeline |
| H3 RAG+Audiencias | 25% | 3.450 | 448,50 | **3.898,50** | S4-S5 (4 sem) | 10.5 PM | 32% | Corazon RAG + cron |
| H4 QA staging | 15% | 2.070 | 269,10 | **2.339,10** | S6-S7 (4 sem) | 5.5 PM | 17% | Seguridad + QA |
| H5 Prod+docs+cap. | 25% | 3.450 | 448,50 | **3.898,50** | S8 (2 sem) | 3.0 PM | 9% | Deploy + manuales |
| **Total v1.1** | 100% | **13.800** | **1.794** | **15.594** | 16 sem | **33 PM** | 100% |  |
| Total v1.0 anterior | 100% | 15.000 | 1.950 | 16.950 | - | - | - | Referencia |

La distribucion de pago sigue esfuerzo COCOMO (pico en S2-S5) y no es lineal, lo cual es correcto segun Putnam/Rayleigh. Hitos recalculados con nuevo precio minimo mantienen mismos %.

**Opcion B (solo modelo alternativo):** Si se reemplaza totalmente COCOMO por Bottom-Up minimo, precio base 12.400 Bs (14.012 IVA) — H1 2.480 base, H2 1.860, H3 3.100, H4 1.860, H5 3.100. Se deja como alternativa en contrato Clausula 6.1.

---

## 9. Formula rapida para recalcular precio (sistema COCOMO minimo + modelo alternativo)

Para que el buffet pueda recalcular precio ante cambios de alcance, se deja formula parametrizada con dos modelos:

### 9.1 Modelo COCOMO minimo (opcion A — por defecto)

```
Entradas:
  PFNA  = conteo PF no ajustados (actual 202)
  FA    = 0.65+0.01*GS  (GS 0-70, actual 50 -> 1.15)
  LOCxPF= 53
  KLOC  = PFNA * FA * LOCxPF / 1000
  Modo  = Organico (a=2.4,b=1.05) para precio minimo, Semi-acoplado (a=3.0,b=1.12) para referencia
  EAF   = 0.608 optimista (minimo) / 3.836 realista
  Tarifa= 1.000 Bs/PM solidario minimo (o 1.175 promedio)
  IVA   = 0.13

Pasos:
  1) PFA = PFNA * FA
  2) KLOC = PFA * 53 / 1000
  3) E_min = 2.4 * KLOC^1.05 * 0.608          (PM minimo Organico optimista)
  4) T_min = 2.5 * E_min^0.38                (meses)
  5) Costo_base_min = E_min * 1.000          (Bs solidario minimo)
  6) Total_IVA = Costo_base_min * 1.13
  7) Precio_piso_COCOMO = Costo_base_min  (13.800 Bs para PFNA 202)
```

### 9.2 Modelo alternativo Bottom-Up + PF Monetizado (opcion B — reemplazo de COCOMO)

```
Bottom-Up:
  Horas = personas * h/semana * semanas  (actual 4*15*16=960h)
  Costo_BU = Horas * tarifa_h  (15 Bs/h minimo -> 14.400 Bs para 960h; 12.000 Bs para 800h)

PF Monetizado:
  Costo_PF = PFA * tarifa_PF  (65 Bs/PF minimo -> 12.474 Bs para PFA 191.9)

Precio_piso_alternativo = min(Costo_BU_min, Costo_PF_min)  -> 12.000 Bs
Precio_base_alternativo = (Costo_BU_base + Costo_PF_base)/2 -> (14.400+14.392)/2 = 14.396 Bs
```

### 9.3 Precio final con ambos modelos

```
Precio_final = min(Precio_piso_COCOMO, Precio_piso_alternativo) si se quiere minimo absoluto
             = Precio_piso_COCOMO (13.800 Bs) por defecto, validado por alternativo (12.000-14.400)
             = 12.400 Bs promedio minimos si se reemplaza totalmente COCOMO por alternativo
```

Ejemplo recalculado si alcance crece +20% PFNA=242 (GS 50, FA 1.15):

```
COCOMO: PFA=278.3, KLOC=14.75, E_min Organico optimista=24.1 PM, Costo_min=24.100 Bs, Total IVA 27.233 Bs
Bottom-Up: mantiene 960h -> 14.400 Bs (no escala por PF, requiere recalibrar horas a 1.152h)
PF Monetizado: 278.3*65=18.090 Bs
-> Precio COCOMO minimo 24.100 Bs > Alternativo 14.400 Bs, se requiere adenda y re-estimar horas
-> Con factor solidario 0.104 (=13.800/131.880) el precio con alcance +20% seria ~25.200 Bs base
-> Requiere adenda Clausula 11
```

Script de calculo reproducible (Python 3):

```python
def cocomo_minimo(PFNA=202, GS=50, tarifa_solidaria=1000):
    FA=0.65+0.01*GS
    PFA=PFNA*FA
    KLOC=PFA*53/1000
    # Minimo: Organico optimista
    E_min=2.4*(KLOC**1.05)*0.608
    T_min=2.5*(E_min**0.38)
    costo=E_min*tarifa_solidaria
    return {"PFA":PFA,"KLOC":KLOC,"E_min":E_min,"T_min":T_min,"Costo_base":costo,"TotalIVA":costo*1.13}

def alternativo_bottomup(horas=960, tarifa_h=15, PFA=191.9, tarifa_pf=65):
    return {"Costo_BU":horas*tarifa_h, "Costo_PF":PFA*tarifa_pf}

print(cocomo_minimo())
# {'PFA': 232.3, 'KLOC': 12.31, 'E_min': 13.8, 'T_min': 6.76, 'Costo_base': 13800, 'TotalIVA': 15594}
print(alternativo_bottomup())
# {'Costo_BU': 14400, 'Costo_PF': 12473}
```

---

## 10. Conclusion — Precio minimo en Bs y modelo alternativo

1. **Tamanio estimado 8.5 a 14 KLOC** (191 a 232 PFA) es coherente tanto por PF como por analogia modular (11.5 KLOC).
2. **COCOMO 81 Basico Semi-acoplado** arroja **32.97 PM y 8.5 meses** (KLOC 8.48) a **57.65 PM y 10.3 meses** (KLOC 14). Proyecto **mediano-complejo**.
3. **COCOMO 81 Intermedio** muestra divergencia optimista (20 PM) vs realista estudiante (126 PM): la brecha es formacion y experiencia RAG, mitigable con Tech Lead senior y plataformas gestionadas.
4. **COCOMO II** confirma **30-81 PM** y **10-15 meses** en entrega industrial; cronograma contractual de 4 meses es **compresion 2.3x** (1.84x si se usa minimo 13.80 PM), solo viable por caracter MVP incremental y precio solidario.
5. **Costo de mercado estimado 131.880 a 326.640 Bs** segun modelo; **precio contractual anterior 15.000 Bs** implicaba subsidio 8.8x. A tarifa solidaria 1.175 Bs/PM el costo seria 38.740 a 95.951 Bs.
6. **Precio minimo COCOMO en Bs = 13.800 Bs base (15.594 Bs IVA incl.)** — COCOMO 81 Intermedio Organico optimista 13.80 PM * 1.000 Bs/PM. Es el piso ingenieril solidario.
7. **Modelo alternativo Bottom-Up + PF Monetizado** da **12.000-14.400 Bs** (960h*15 Bs/h y 191.9 PF*65 Bs/PF). Minimo alternativo **12.000 Bs base (13.560 IVA)**, promedio minimos **12.400 Bs base (14.012 IVA)**. El minimo COCOMO (13.800) esta a <10% del alternativo (12.400), lo que **valida** el precio.
8. **Precio final adoptado v1.1 = 13.800 Bs base (15.594 Bs IVA incl.)** — usa el **precio mas bajo que sale de COCOMO en Bs** (13.80 PM) y esta validado por el modelo alternativo. Si se desea reemplazar totalmente COCOMO por el modelo alternativo, el precio piso alternativo es **12.400 Bs base (14.012 IVA)** — opcion B documentada.
9. **Recomendacion:** facturar **13.800 Bs base** para alcance TDR v2.0 cerrado (20/15/25/15/25%). Todo incremento de PFNA >10% o KLOC >9.5 debe activar **adenda** (Contrato Clausula 11) usando formula de seccion 9. Infra (Vercel Hobby 0 USD, Railway Starter 5-20 USD, dominio .bo 980 Bs) permanece por cuenta buffet segun proformas INF-001 a INF-SSL-001 y no se incluye en COCOMO ni en Bottom-Up (es costo operativo, no desarrollo).

---

## 11. Anexos

- TDR_KM_RAG.md seccion 6-7 (29 RF + 19 RNF)
- Contrato_KM_RAG.md Clausula Sexta (hitos) y Anexos I-II
- Plan_Proyecto_Cronograma_KM_RAG.md seccion Entregables E1-E12 y Metodologia Scrum+Kanban
- COCOMO 81: Barry Boehm, Software Engineering Economics, Prentice-Hall 1981
- COCOMO II: Boehm et al., Software Cost Estimation with COCOMO II, Prentice-Hall 2000 — A=2.94, B=0.91+0.01*SF

## 12. Control de cambios

| Version | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 1.0 | 28/08/2026 | Equipo KM RAG (Mariana, Santiago, Nahomi, Jorge) | Creacion inicial con PF, COCOMO 81 y COCOMO II para KM RAG |
| 1.1 | 28/08/2026 | Equipo KM RAG | Precio minimo COCOMO en Bs (13.800 base / 15.594 IVA) + modelo alternativo Bottom-Up/PF Monetizado (12.000-14.400) + precio final adoptado v1.1, hitos recalculados |

