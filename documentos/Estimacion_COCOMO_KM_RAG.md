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
PFA_realista = 202 * 1.15 = 232.3
```

Conversion PFA a LOC (tabla QSM/Capers Jones):

| Lenguaje | LOC por PF (promedio industria) |
|----------|---------------------------------|
| JavaScript / TypeScript (React) | 53 |
| Python (FastAPI + LangChain) | 53 |
| Mezcla JS+Python proyecto KM (promedio ponderado) | 53 |

```
KLOC_conservador = 191.9 * 53 / 1000 = 10.17 KLOC
KLOC_realista = 232.3 * 53 / 1000 = 12.31 KLOC
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


COCOMO II es el estándar vigente para software web con componentes COTS/reuso y es la base directa de **WAE (Web Application Extension)**. A diferencia de COCOMO 81 (modos Orgánico/Semi/Empotrado fijos), COCOMO II usa **factores de escala (SF)** continuos y **17 multiplicadores (EM)** calibrados, capturando mejor el RAG, Vercel/Railway y la compresión a 4 meses.

Fórmulas COCOMO II (Post-Arquitectura):

```
Esfuerzo E = A × (KLOC)^B × EAF [persona-mes, PM] A=2,94
Tiempo T = C × (E)^D [meses] C=3,67
B = 0,91 + 0,01 × ΣSF
D = 0,28 + 0,002 × ΣSF
Personal P = E / T
EAF = Π EM_i (17 multiplicadores, 0,70–1,65)
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


---

## 6. COCOMO II Post-Arquitectura (estimación detallada)

Modelo: `E = A * (KLOC)^B * EAF` con `B = 0.91 + 0.01 * sum(SF)` y `A = 2.94` (calibrado 2000).

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

### 6.4 Variables COCOMO II — Esfuerzo, Personal, Tiempo y Costo (4 meses + 2 meses garantia, RAG enfatizado)

Variables formales COCOMO II Post-Arquitectura: **E** = Esfuerzo (PM), **P** = Personal promedio = E/T, **T** = Tiempo de desarrollo (meses), **C** = Costo del proyecto (Bs.). Fórmula base: `E = 2,94 × KLOC^1,1459 × EAF` ; `T = 3,67 × E^0,3272` ; `P = E/T` ; `C = E × tarifa` + IVA 13%.

| Variable | Símbolo | WAE-RAG (12,01 KLOC, EM 1,45) — Nominal 12,99 m | WAE Nominal (EM 1,0) | COCOMO II 8,48 KLOC Optimista (30,73 PM) | COCOMO II 14,0 KLOC Realista (81,66 PM) |
|---|---|---|---|---|---|
| **Esfuerzo** | **E** | **48,14 PM** (17,2 PM calendario 4+2) | 33,21 PM | 30,73 PM | 81,66 PM |
| **Tiempo nominal** | **T** | **12,99 meses** (contrato 4,00 → comp. 3,25×) | 11,55 m | 10,63 m | 14,71 m |
| **Personal necesario** | **P** | **3,71 pers. nominal** → **4 pers. calendario** (PM/SM, UX/UI, Tech Lead RAG, Frontend/QA) para 4 meses | 2,88 | 2,89 | 5,55 |
| **Costo (tarifa La Paz 2026: 3.000 Bs/PM)** | **C** | **48,14×3.000=144.420 Bs nominal** → **51.600 Bs calendario (16+1,2 PM) + 7.740 RAG = 59.340 base → 67.054 IVA ** | 99.630 Bs nominal → 51.600 cal. → 58.308 IVA | 92.190 Bs nominal → 51.600 cal. → 58.308 IVA | 244.980 Bs nominal → 276.827 IVA |
| **Costo mercado (4.000 Bs/PM)** | C_merc | 192.560 nominal | 132.840 | 122.920 | 326.640 |


Conclusiones COCOMO II: incluso en optimista se requieren 30-54 PM y 10-13 meses. La compresión a 4 meses es extrema y solo se explica por **precio solidario universitario y alcance incremental por MVPs**, no por esfuerzo industrial típico.

---

## 7. COCOMO WAE — Web Application Extension con enfasis RAG (nuevo)


### 7.1 Motivacion WAE

COCOMO 81/II mide KLOC generico; WAE es la extension especifica para aplicaciones web y captura mejor un sistema como KM RAG: SPA React + API + Vector DB + LLM externo. Mide **Web Objects** en vez de solo lineas: pantallas web (WEB), paginas estaticas/reportes (SCR), componentes de aplicacion (ACS), componentes de base de datos (DBC) y documentos de ingenieria (NED). El RAG (chunking 500/100, embeddings ES 768d, HNSW, re-ranking, citas, `<3s`) es complejidad `CPLX Extra Alta` y concentra >50% del riesgo tecnico.

Diagramas WAE en SVG (Conallen, estereotipos UML): `diagramas/wae/WAE_01.svg` (tamano con `«action»`), `WAE_02.svg` (arquitectura con `«action»`/`«client page»`/`«form»`/`«collection»`), `WAE_03.svg` (comparativa con `«action»`), `WAE_04.svg` (clases WAE con `«action»` en metodos), `WAE_05.svg` (secuencia WAE con `«action»`). Todos incluyen `«action»` como exige la extension WAE para acciones de servidor.

### 7.2 Conteo de Web Objects (KM RAG 29 RF + 19 RNF)

| Tipo WAE | Sigla | Elementos contados (TDR v2.0) | Cantidad | Peso WAE | WOP |
|----------|-------|-------------------------------|----------|----------|-----|
| Pantallas web dinamicas (form, tabla, chat, canvas) | **WEB** | Login, Listar casos/filtros, Crear/Editar caso, Detalle caso+docs, Historial diff, Drag&Drop 50MB, Busqueda semantica <3s, Chat NL+citas, Audiencias Calendar, Compartidos JWT, Alertas config, Dashboard KPIs, Auditoria rango, Perfil/RBAC | **14** | 3.0 | **42.0** |
| Paginas / reportes estaticos | **SCR** | PDF paquete audiencia, ZIP indice, Excel auditoria, Email semanal, Resumen diario 8AM, Landing ayuda, Preview watermark | **7** | 1.5 | **10.5** |
| Componentes aplicacion (logica) | **ACS gen** | AuthService, RBACMiddleware, CasosService FSM, DocsService S3, AlertService BullMQ, ShareService, AuditService, CryptoService AES-256 | **7** | 4.5 | **31.5** |
| **Componentes RAG ** | **ACS-RAG** | RAG-Chunk 500/100, RAG-Embed ES 768d, RAG-Vector HNSW (Chroma/pgvector), RAG-Rerank, RAG-LLM (GPT-4o-mini) | **5** | **6.0** | **30.0** |
| Componentes BD | **DBC** | CASO, DOCUMENTO, VERSION, USUARIO, PERMISO, AUDIENCIA, ALERTA, LOG_ACCESO + Vector Store | **9** | 2.5 | **22.5** |
| **Total Web Object Points** | | | | | **136.5 WOP** |
| Documentos ingenieria | **NED** | TDR, Contrato, Plan 8 sprints, User Stories, Matriz, BPWin 7 procesos, C4, ER, UML, Actividades, Componentes, Ishikawa | **12** | — | — |

**WOP = 136.5**. El bloque **ACS-RAG = 30 WOP (22% del total, 49% de todo ACS)** — de ahi el enfasis RAG.


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


### 7.4 Factores de escala y multiplicadores con enfasis RAG

Se reusan los 5 SF de la seccion 6.1 (suma **23.59 → B = 0.91+0.01*23.59 = 1.1459**) — `PREC Baja 4.96` y `RESL 7.07` ya penalizan la novedad RAG juridica boliviana.

Multiplicadores EM (17 COCOMO II) recalibrados con RAG enfatizado:

| EM | Valor RAG | Justificacion |
|----|-----------|---------------|
| RELY Alta | 1.15 | Fallo afecta proteccion victimas/menores |
| DATA Alta | 1.18 | 5000+ docs, 768 dims, 50 MB, embeddings versionados |
| **CPLX Extra Alta ** | **1.32** | Chunk 500/100 overlap, HNSW tuning <3s, re-ranking, citas, RBAC chunk-level, AES campo |
| TIME Alta | 1.15 | RNF-07 <3s con 1000 docs, latencia LLM |
| STOR Alta | 1.06 | Vectores + S3 versionado |
| DOCU Alta | 1.12 | 12 NED + trazabilidad RF/US/CU/C4/ER |
| ACAP/PCAP (equipo mixto) | 1.08 c/u | Mix senior + estudiante — ni 0.86 optimista ni 1.19 pesimista |
| PCON Alta | 0.90 | Equipo 4 roles estable |
| APEX/PLEX/LTEX Baja | 1.12/1.10/1.08 | Curva RAG/LangChain/Vercel/Railway |
| TOOL Alta | 0.90 | GitHub Actions + Sentry/Vercel/Railway |
| SITE Alta | 0.93 | Colocalizado La Paz + movil |
| **SCED Comprimido ** | **1.14** | 4 meses contrato vs 11.6 meses nominal = compresion 2.9× (Boehm: >1.43 = +43% esfuerzo) |
| **Producto EM_RAG** | **≈1.45** | (vs 0.90 optimista y 1.35 realista base) |

Se deja tambien calculo con `EM=1.0` (nominal sin RAG) para aislar el sobrecosto RAG.

### 7.5 Esfuerzo y duracion WAE

Formula WAE (COCOMO II + factor NED):

```
E = A * (KLOC)^B * EAF * (NED/100)^0.2
T = C * (E)^D con C=3.67, D=0.28+0.002*sumSF = 0.3272
A=2.94, B=1.1459, NED=12, (NED/100)^0.2 = 0.654
```

| Escenario KLOC_WAE=12.01 | EM | E (PM) | T nominal (meses) | P (pers.) |
|--------------------------|----|--------|-------------------|-----------|
| WAE nominal (sin enfasis RAG) | 1.00 | **33.21** | 11.55 | 2.88 |
| **WAE-RAG (EM=1.45)** | **1.45** | **48.14** | **12.99** | **3.71** |
| WAE-RAG + SCED 1.14 ya incluido en 1.45 | 1.45 | 48.14 | 12.99 | 3.71 |
| WAE pesimista (EM=1.65) | 1.65 | 54.80 | 13.62 | 4.02 |

Para comparativa directa con COCOMO II de la seccion 6.3:

| Modelo (KLOC~12) | E nominal | E con EM_RAG |
|------------------|-----------|--------------|
| COCOMO II 12.01 (EM=1.0) | 50.75 PM | — |
| **WAE 12.01 (NED 12)** | **33.21 PM** | **48.14 PM ** |
| COCOMO 81 Semi 8.48 | 32.97 PM | — |

WAE nominal da menos que COCOMO II porque el factor `(NED/100)^0.2 = 0.654` descuenta documentacion ya contabilizada en NED; al aplicar `EM_RAG=1.45`, el esfuerzo vuelve a **~48 PM**, coherente con COCOMO II realista (46-54 PM). El RAG anade **+45%** sobre el nominal.


### 7.6 Lectura con periodo fijo 4 meses

El T nominal WAE-RAG es **13.0 meses** con 3.7 personas promedio. El contrato fija **4 meses** (16 semanas):

```
Factor compresion = T_nom / T_contrato = 12.99 / 4.00 = 3.25×
```

Segun Boehm, compresion >1.43 ya es extrema y dispara `SCED` (aqui 1.14). El 4 meses solo es viable por las palancas ya documentadas en seccion 8 (MVPs, Vercel/Railway gestionado, LLM pre-entrenado, migracion limitada a 20 casos, aprobacion tacita 5 dias) **y** por precio solidario (se reconoce el gap 48 PM → 16 PM calendario como subsidio universitario, ver seccion 8).

---

## 8. Conversion a costo monetario (Bolivia 2026) — Precio COCOMO II mercado Bs. 60,092 base (67,904 IVA) incl. margen 26.7%

Salarios referencia La Paz 2026 (mercado real, no beca solidaria):

| Rol | Bs/mes mercado | Comentario |
|-----|----------------|------------|
| PM / Scrum Master | 9,000 | 2+ anios, gestion riesgos RAG |
| UX/UI Designer | 7,500 | Design system AntD/Figma |
| Tech Lead RAG / Fullstack | 14,000 | 3+ anios Python/Node + LangChain/vector DB |
| Frontend / QA | 8,000 | 2+ anios React/Vite/AntD + Playwright/k6 |
| **Promedio ponderado** | **9,625** | |
| **Tarifa de venta adoptada** | **1,248 Bs/PM** | Costo empresa 985 + margen 26.7% (263) |

Cargas sociales: AFP 12.71% + Caja 10% + Aguinaldo/Prima/Indemnizacion ~20% = 42% conservador sobre salario. Overhead oficina/licencias/internet 15%. Margen empresarial 26.7% sobre costo empresa es estandar mercado TIC Bolivia 2026 (rango 20-35%).

Salario base de calculo para tarifa 1,248 es 620 promedio (mezcla solidaria/universitaria con Tech Lead senior parcial). Con plantilla 100% senior (prom 9,625) la tarifa seria 17,200 Bs/PM y el precio base 828,180 Bs.

### 8.1 Costo COCOMO II WAE-RAG (adoptado) — 48.15 PM

| Concepto | Calculo | Bs. |
|----------|---------|-----|
| Esfuerzo WAE-RAG | 48.15 PM | — |
| Costo empresa sin margen | 48.15 x 985 | 47,428.00 |
| Margen empresarial 26.7% | 48.15 x 263 | 12,664.00 |
| **Precio de venta base (sin IVA)** | **48.15 x 1,248** | **60,092.80** |
| IVA 13% | 60,092 x 0.13 | 7,812.21 |
| **Total con IVA** |  | **67,904.01** |
| Costo empresa con IVA (informativo) | 47,428.00 x 1.13 | 53,593.40 |

Desglose por PM: costo empresa 985 + margen 263 = 1,248 venta. Margen 26.7% sobre costo.

### 8.2 Comparativa modelos (valores anteriores retenidos como referencia historica, no vigentes)

| Modelo | KLOC | E (PM) | Tarifa (Bs/PM) | Base (Bs) | Total IVA (Bs) | Estado |
|--------|------|--------|----------------|-----------|----------------|--------|
| COCOMO 81 Intermedio Organico optimista (piso academico historico) | 8.48 | 13.80 | 1,000 beca | 13,800 | 15,594 | Deprecado — solo referencia universitaria |
| Bottom-Up 960h x 15 Bs/h solidario | — | — | 15 Bs/h | 14,400 | 16,272 | Deprecado |
| **COCOMO II WAE-RAG mercado (vigente)** | **12.01** | **48.15** | **1,248** | **60,092** | **67,904** | **Adoptado** |
| COCOMO II puro sin NED (73.58 PM) | 12.01 | 73.58 | 1,248 | 91,828 | 103,765 | Referencia sin WAE |
| KLOC 14 pesimista WAE-RAG | 14.00 | 57.40 | 1,248 | 68,390 | 77,281 | Escenario +20% alcance |

El precio base vigente es Bs. 60,092 (reemplaza estimaciones previas). Factor de actualizacion 40x refleja paso de tarifa beca 6.25 Bs/h a tarifa mercado 1,248 Bs/PM con margen incluido y esfuerzo COCOMO II completo 48 PM en lugar de 13.8 PM piso.

### 8.3 Precio final adoptado

| Concepto | Monto |
|----------|-------|
| Precio de venta base (sin IVA) | **60,092 Bs** |
| IVA 13% | 7,812 Bs |
| **Total con IVA** | **67,904 Bs** |
| Descuento pago al contado 10% | 54,083 base / 61,113 IVA |
| Cuota mensual promedio (4 meses) | 150,229 base / 169,759 IVA |

### 8.4 Precio contractual vs costo empresa

| Concepto | Monto |
|----------|-------|
| Precio de venta base | 60,092 Bs |
| Costo empresa sin margen | 474,278 Bs |
| Margen empresarial 26.7% | 126,639 Bs |
| Margen con IVA | 14,310 Bs |
| Total venta con IVA | 67,904 Bs |
| Infra anual no incluida (Vercel/Railway/dominio/LLM) | Aprox. Bs. 980 + USD 60-240/anio segun proformas INF-001 a INF-SSL-001 |

---

## 8.5 Cronograma y Hitos vs COCOMO

Cronograma contractual: 16 semanas = 3.68 meses (30.4 dias/mes).

COCOMO II WAE-RAG predice **T = 13.04 meses** con 3.69 personas. Ratio de compresion:

```
Compresion = T_cocomO / T_contrato = 13.04 / 3.68 = 3.54 (3.26 si 4.00 meses exactos)
```

Si se usa escenario KLOC 14 pesimista: `T = 13.62 meses`, compresion 3.70. Segun Boehm, compresion > 1.43 ya es extrema y dispara SCED a 1.43 (+43% esfuerzo). El contrato absorbe esa penalizacion en EM SCED 1.14 y en precio (48 PM facturados como producto, no como 17.2 PM calendario), y la hace viable por:

1. Entrega por **MVPs incrementales** (E3 Auth+Casos Sprint 2, E4 Ingesta Sprint 3, E5 RAG Sprint 4) en vez de todo al final
2. Uso de **plataformas gestionadas** (Vercel + Railway) que ahorran ~30% esfuerzo infra
3. Reutilizacion de **LLM y embeddings pre-entrenados** (no entrenar desde cero)
4. Limitacion de migracion historica a **20 casos de prueba** (no 200)
5. Definicion de **dependencias del buffet** con bloqueo Kanban y aprobacion tacita 5 dias (Plan seccion Dependencias)

Con esas palancas, el cronograma de 8 sprints es **factible academicamente** aunque no lo seria en COCOMO puro industrial sin compresion facturada.

### 8.6 Validacion hitos de pago (Contrato Clausula 6.4) — precio COCOMO II 60,092 base

| Hito | % | Bs base | Bs IVA 13% | Bs total | Sprints | Entregables |
|------|---|---------|------------|----------|---------|-------------|
| H1 Firma+Plan+Mockups | 20% | 12,018.40 | 1,562.39 | 13,580.79 | S1 (2 sem) | E1+E2 |
| H2 Ingesta completada | 15% | 9,013.80 | 1,171.79 | 10,185.59 | S2-S3 (4 sem) | E3+E4 |
| H3 RAG+Audiencias | 25% | 15,022.90 | 1,953.00 | 16,975.90 | S4-S5 (4 sem) | E5+E6 |
| H4 QA staging | 15% | 9,013.80 | 1,171.79 | 10,185.59 | S6-S7 (4 sem) | E7+E8+E9 |
| H5 Prod+docs+cap. | 25% | 15,022.90 | 1,953.00 | 16,975.90 | S8 (2 sem) | E10+E11+E12 |
| **Total** | **100%** | **60,092.00** | **7,812.21** | **67,904.21** | **16 sem** | **E1-E12** |

La distribucion sigue esfuerzo COCOMO (pico S2-S5) y no es lineal, correcto segun Putnam/Rayleigh.

## 9. Formula rapida para recalcular precio — COCOMO II WAE-RAG mercado

Para que el buffet pueda recalcular precio ante cambios de alcance, se deja formula parametrizada COCOMO II WAE:

```
Entradas:
  WOP  = WEB*3.0 + SCR*1.5 + ACS_gen*4.5 + ACS_RAG*6.0 + DBC*2.5  (actual 136.5)
  KLOC = WOP * 88 / 1000
  SF_sum = 23.59  => B=1.1459, D=0.3272
  EAF_RAG = 1.45
  NED = 12
  Tarifa venta = 1,248 Bs/PM (costo empresa 985 + margen 26.7%)
  IVA = 0.13

Pasos:
  1) KLOC = WOP * 88 / 1000
  2) E = 2.94 * KLOC^B * 1.45 * (NED/100)^0.2
  3) T = 3.67 * E^D
  4) Costo_base = E * 1,248
  5) Total_IVA = Costo_base * 1.13

Ejemplo alcance +20%: WOP 163.8 => KLOC 14.41 => E 57.90 PM => Costo 72,259 base / 81,653 IVA => requiere adenda Clausula 11
Ejemplo alcance -20%: WOP 109.2 => KLOC 9.61 => E 37.40 PM => Costo 466,752 base / 527,430 IVA
```

Script de calculo reproducible (Python 3):

```python
def cotizacion_cocomo(WOP=136.5, SF_sum=23.59, tarifa=12480):
    KLOC=WOP*88/1000
    B=0.91+0.01*SF_sum
    NED_factor=(12/100)**0.2
    E=2.94*(KLOC**B)*1.45*NED_factor
    T=3.67*(E**(0.28+0.002*SF_sum))
    return {"KLOC":KLOC,"E":E,"T":T,"Costo_base":E*tarifa,"Total_IVA":E*tarifa*1.13}

print(cotizacion_cocomo())
# {'KLOC': 12.01, 'E': 48.15, 'T': 13.04, 'Costo_base': 600916.8, 'Total_IVA': 679036.0}
print(cotizacion_cocomo(163.8))
# {'KLOC': 14.41, 'E': 57.9, 'T': 13.9, 'Costo_base': 722592.0, 'Total_IVA': 816529.0}
```

## 10. Conclusion — Precio COCOMO II mercado

1. **Tamanio 12.01 KLOC WAE-RAG (136.5 WOP)** converge con PF (12.31 KLOC) y analogia (11.50 KLOC). Rango 8.5-14 KLOC cubre escenarios conservador a pesimista.
2. **Esfuerzo COCOMO II WAE-RAG: 48.15 PM y 13.04 meses nominales** con 3.69 personas. COCOMO II puro sin factor NED daria 73.58 PM y 1,037,654 Bs con IVA. Proyecto mediano-complejo con RAG como 22% del WOP y CPLX extra alta.
3. **Compresion contractual 4 meses = 3.26x**. Solo viable por MVPs incrementales, Vercel/Railway gestionado, LLM pre-entrenado, migracion 20 casos y aprobacion tacita 5 dias, con SCED 1.14 ya incluido en EM 1.45.
4. **Precio de venta COCOMO II: Bs. 60,092 base (Bs. 67,904 con IVA)**. Costo empresa sin margen Bs. 47,428 (53,594 con IVA) + margen 26.7% Bs. 12,664 (14,310 con IVA). Tarifa 1,248 Bs/PM validada contra mercado La Paz 2026 (rango 11,000-14,000 para IA/RAG).
5. **Reemplaza estimaciones previas**: factor 40x. El precio anterior correspondia a tarifa beca 6.25 Bs/h y 13.80 PM piso; el actual es tarifa mercado con 48 PM completos y margen empresarial real.
6. **Descuento pago al contado 10%**: Bs. 54,083 base / 61,113 con IVA. Cuotas 20/15/25/15/25% segun hitos H1-H5 (ver Cotizacion Seccion 8.2).
7. **Recomendacion**: facturar Bs. 60,092 base para alcance TDR v2.0 cerrado (29 RF + 19 RNF). Incremento >10% WOP/KLOC activa adenda (Contrato Clausula 11) usando formula Seccion 9. Infra Vercel/Railway/dominio/LLM no incluida (ver proformas INF-001 a INF-SSL-001, aprox. Bs. 980 + USD 60-240/anio).

## 11. Anexos

- TDR_KM_RAG.md seccion 6-7 (29 RF + 19 RNF)
- Contrato_KM_RAG.md Clausula Sexta (hitos) y Anexos I-II
- Plan_Proyecto_Cronograma_KM_RAG.md seccion Entregables E1-E12 y Metodologia Scrum+Kanban
- COCOMO 81: Barry Boehm, Software Engineering Economics, Prentice-Hall 1981
- COCOMO II: Boehm et al., Software Cost Estimation with COCOMO II, Prentice-Hall 2000 — A=2.94, B=0.91+0.01*SF
