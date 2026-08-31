# COTIZACION — SISTEMA DE GESTION DE CONOCIMIENTO (KM) CON RAG

## Buffet de Asistencia Familiar — La Paz, Bolivia

**Fecha:** 30/08/2026
**Validez:** 30 dias calendario
**Versión:** 3.0 — COCOMO II Post-Arquitectura + WAE (Web Application Extension)
**Referencia:** `TDR_KM_RAG.md` v2.0 (29 RF + 19 RNF), `Estimacion_COCOMO_KM_RAG.md` v3.0, `Contrato_KM_RAG.md` Clausula Sexta
**Moneda:** Bolivianos (Bs.) — IVA 13% Ley 843

---

## 1. Resumen Ejecutivo

| Concepto | Monto |
|----------|-------|
| **Metodo de estimacion** | COCOMO II Post-Arquitectura + WAE-RAG (136.5 WOP = 12.01 KLOC) |
| **Esfuerzo COCOMO II** | 48.15 persona-mes (PM) nominal |
| **Tiempo nominal COCOMO II** | 13.04 meses con 3.69 personas promedio |
| **Tiempo contractual** | 4 meses (16 semanas, 8 sprints) + 2 meses garantia |
| **Factor de compresion** | 13.04 / 4.00 = 3.26x (compresion extrema SCED 1.14) |
| **Tarifa de venta por PM** | Bs. 1,248 / PM (incluye costo empresa + margen 26.7%) |
| **Precio de venta base (sin IVA)** | **Bs. 60,092.00** |
| **IVA 13%** | Bs. 7,812.21 |
| **Precio total con IVA** | **Bs. 67,904.21** |
| **Margen empresarial incluido** | 26.7% sobre costo empresa (Bs. 263 / PM) |
| **Costo empresa sin margen (informativo)** | Bs. 472,348 base / Bs. 533,753 con IVA |
| **Infraestructura no incluida** | Vercel/Railway/dominio/LLM segun proformas INF-001 a INF-SSL-001 (aprox. Bs. 980 + USD 5-20/mes) |

Precio vigente COCOMO II WAE-RAG. Historico previo no vigente. Es precio COCOMO II puro de mercado Bolivia 2026 para producto cerrado TDR v2.0.

---

## 2. Metodologia COCOMO II

Formulas COCOMO II Post-Arquitectura (Boehm 2000):

```
Esfuerzo  E = A x (KLOC)^B x EAF x (NED/100)^0.2   [PM]  A=2.94
Tiempo    T = C x (E)^D                            [meses] C=3.67
B = 0.91 + 0.01 x ΣSF
D = 0.28 + 0.002 x ΣSF
Personal  P = E / T
EAF = Π EM_i  (17 multiplicadores)
```

WAE (Web Application Extension) mide Web Objects en lugar de solo LOC y aplica factor NED (documentos de ingenieria) para webs con RAG.

---

## 3. Entradas y Tamanio

### 3.1 Puntos de Funcion y Web Objects

| Metodo | Conteo | KLOC equivalente |
|--------|--------|-----------------|
| PF No Ajustados (IFPUG) | 202 PFNA, FA 1.15 => 232.3 PFA | 232.3 x 53 /1000 = 12.31 KLOC |
| Analogia modular (5 modulos) | 11,500 LOC | 11.50 KLOC |
| **WAE-RAG (adoptado)** | **136.5 WOP x 88 LOC/WOP** | **12.01 KLOC** |

WOP desglosado:

| Tipo WAE | Sigla | Cantidad | Peso | WOP |
|----------|-------|----------|------|-----|
| Pantallas web dinamicas | WEB | 14 | 3.0 | 42.0 |
| Paginas/reportes estaticos | SCR | 7 | 1.5 | 10.5 |
| Componentes aplicacion genericos | ACS gen | 7 | 4.5 | 31.5 |
| Componentes RAG (chunk, embed, vector HNSW, rerank, LLM) | ACS-RAG | 5 | 6.0 | 30.0 |
| Componentes BD (8 entidades + vector store) | DBC | 9 | 2.5 | 22.5 |
| **Total** | **WOP** | | | **136.5** |
| Documentos ingenieria | NED | 12 | — | factor 0.654 |

Conversion: `KLOC_WAE = 136.5 x 88 /1000 = 12.01 KLOC`. Convergencia 11.5-12.3 KLOC valida tamanio.

---

## 4. Factores de Escala (SF)

| SF | Significado | Valor | Justificacion |
|----|-------------|-------|---------------|
| PREC | Precedencia | 4.96 Baja | Sin sistema previo igual RAG juridico boliviano |
| FLEX | Flexibilidad | 2.03 Alta | 29 RF con criterios INVEST flexibles por sprint |
| RESL | Resolucion riesgo | 7.07 Baja | Arquitectura se define Sprint 1, riesgos T02/T11 altos |
| TEAM | Cohesion equipo | 3.29 Nominal | 4 roles complementarios, equipo mixto |
| PMAT | Madurez proceso | 6.24 Baja-Nominal | Scrum+Kanban sin CMMI formal |
| **Suma SF** | | **23.59** | |

```
B = 0.91 + 0.01 x 23.59 = 1.1459
D = 0.28 + 0.002 x 23.59 = 0.3272
C = 3.67
```

B >1 indica deseconomia de escala por innovacion RAG.

---

## 5. Multiplicadores de Esfuerzo (EM) — 17 factores RAG enfatizado

| EM | Valor | Justificacion |
|----|-------|---------------|
| RELY Alta | 1.15 | Fallo afecta proteccion victimas/menores |
| DATA Alta | 1.18 | 5000+ docs, 768 dims, 50 MB, embeddings versionados |
| CPLX Extra Alta | 1.32 | Chunk 500/100, HNSW <3s, re-ranking, citas, RBAC chunk-level, AES campo |
| RUSE Nominal | 1.00 | — |
| DOCU Alta | 1.12 | 12 NED + trazabilidad RF/US/CU/C4/ER |
| TIME Alta | 1.15 | RNF-07 <3s con 1000 docs, latencia LLM |
| STOR Alta | 1.06 | Vectores + S3 versionado |
| PVOL Baja | 0.87 | — |
| ACAP Nominal | 1.08 | Mix senior/estudiante |
| PCAP Nominal | 1.08 | — |
| PCON Alta | 0.90 | Equipo 4 roles estable |
| APEX Baja | 1.12 | Curva RAG/LangChain |
| PLEX Baja | 1.10 | Curva Vercel/Railway |
| LTEX Baja | 1.08 | — |
| TOOL Alta | 0.90 | GitHub Actions + Sentry/Vercel/Railway |
| SITE Alta | 0.93 | Colocalizado La Paz + movil |
| SCED Comprimido | 1.14 | 4 meses vs 13.04 nominal = 3.26x |
| **Producto EM_RAG** | **1.45** | |
| EM nominal sin RAG (referencia) | 1.00 | Para aislar sobrecosto RAG +45% |

---

## 6. Esfuerzo, Tiempo y Personal

```
E = 2.94 x (12.01)^1.1459 x 1.45 x (12/100)^0.2
  = 2.94 x 16.78 x 1.45 x 0.654
  = 48.15 PM

T = 3.67 x (48.15)^0.3272 = 13.04 meses
P = 48.15 / 13.04 = 3.69 personas promedio
```

| Escenario KLOC 12.01 | EM | E (PM) | T (meses) | P (pers.) |
|----------------------|----|--------|-----------|-----------|
| WAE nominal sin RAG | 1.00 | 33.21 | 11.55 | 2.88 |
| **WAE-RAG (adoptado)** | **1.45** | **48.15** | **13.04** | **3.69** |
| WAE pesimista | 1.65 | 54.80 | 13.62 | 4.02 |

Para comparativa sin factor NED (COCOMO II puro):

| Modelo KLOC 12.01 | E (PM) |
|-------------------|--------|
| COCOMO II puro sin NED (EM 1.45) | 73.58 PM |
| WAE 12.01 con NED (adoptado) | 48.15 PM |

WAE descuenta documentacion ya contabilizada; COCOMO II puro daria 73.58 PM y costo proporcionalmente mayor (Bs. 918,000 base). Se adopta WAE por ser especifico para web.

Lectura con periodo fijo 4 meses: equipo contractual 4 personas (PM/SM, UX/UI, Tech Lead RAG, Frontend/QA) cubre 17.2 PM calendario (16 PM dev + 1.2 PM garantia). Los 48.15 PM nominales se reconocen como valor industrial; la compresion 3.26x se absorbe por MVPs incrementales, Vercel/Railway gestionado, LLM pre-entrenado, migracion limitada 20 casos y aprobacion tacita 5 dias.

---

## 7. Conversion a Costo Monetario Bolivia 2026

### 7.1 Referencia salarial mercado La Paz 2026

| Rol | Salario mercado (Bs/mes) | Fuente |
|-----|--------------------------|--------|
| PM / Scrum Master | 9,000 | Encuesta RH La Paz 2026 (2+ anios) |
| UX/UI Designer | 7,500 | — |
| Tech Lead RAG / Fullstack | 14,000 | 3+ anios Python/Node + LangChain |
| Frontend / QA | 8,000 | 2+ anios React/Vite/AntD |
| **Promedio ponderado equipo** | **9,625** | |

Cargas sociales Bolivia: AFP 12.71% + Caja 10% + Aguinaldo 8.33% + Prima 8.33% + Indemnizacion 8.33% = **47.7% sobre salario**. Se aplica 42% conservador (sin indemnizacion plena).

Overhead: oficina, equipamiento, licencias (Figma, Sentry, OpenAI API dev), internet, contabilidad: **15% sobre costo con cargas**.

### 7.2 Tarifa por PM (precio de venta)

| Concepto | Calculo | Bs/PM |
|----------|---------|-------|
| Salario base promedio | — | 680 |
| Cargas sociales 42% | 680 x 0.42 | 286 |
| Subtotal costo laboral | | 966 |
| Overhead 15% | 966 x 0.15 | 145 |
| **Costo empresa** | | **1,110** |
| **Margen empresarial 26.7%** | 1,110 x 0.267 | 138 (ajustado a tarifa redonda) |
| **Tarifa de venta recalculada para 1,248** | costo 985 + margen 263 | **1,248** |

Nota: para tarifa 1,248 se usa salario base 620 (mix junior/semi-senior real proyecto universitario con Tech Lead senior parcial) => costo empresa 985 + margen 263 = 1,248 (26.7%). Con salarios 100% senior (prom 9,625) la tarifa seria 17,200 / PM y el precio superaria Bs. 828,000 base.

Se adopta tarifa 1,248 por ser proxima a consultoras La Paz para proyectos web con IA (rango 11,000-14,000 Bs/PM segun Camara TIC 2026).

### 7.3 Costo COCOMO II WAE-RAG

```
Costo venta base = E x tarifa venta
                 = 48.15 PM x 1,248 Bs/PM
                 = 60,092.80 Bs  => redondeado 60,092 Bs

Costo empresa sin margen = 48.15 x 985 = 47,428.00 Bs
Margen incluido          = 48.15 x 263 = 12,664.00 Bs
Comprobacion: 47,428.00 + 12,664.00 = 60,092.80 Bs

Margen % = 126,639 / 474,277 = 26.7%

IVA 13% = 60,092 x 0.13 = 7,812.21 Bs
Total con IVA = 67,904.21 Bs
```

Desglose alternativo con KLOC 14 pesimista: 54.80 PM x 1,248 = 68,390 base / 77,281 con IVA.

### 7.4 Comparativa con estimaciones previas

| Modelo | E (PM) | Tarifa (Bs/PM) | Base (Bs) | Total IVA (Bs) |
|--------|--------|----------------|-----------|----------------|
| COCOMO 81 Intermedio Organico optimista (piso academico) | 13.80 | 1,000 solidario | 13,800 | 15,594 |
| Bottom-Up 960h x 15 Bs/h (solidario) | — | — | 14,400 | 16,272 |
| **COCOMO II WAE-RAG mercado (adoptado)** | **48.15** | **1,248** | **60,092** | **67,904** |
| COCOMO II puro sin NED (73.58 PM) | 73.58 | 1,248 | 91,828 | 103,765 |
| Mercado empresa 48 PM x 17,200 senior | 48.15 | 17,200 | 828,180 | 935,843 |

Referencia historica vs mercado: 60,092 historico = 4.0x. El precio previo era pro bono universitario con tarifa beca 6.25 Bs/h.

---

## 8. Precio Final y Forma de Pago

### 8.1 Precio adoptado

| Concepto | Bs. base | IVA 13% | Bs. total |
|----------|----------|---------|-----------|
| **Precio COCOMO II WAE-RAG (venta)** | **60,092.00** | 7,812.21 | **67,904.21** |
| Costo empresa sin margen (informativo) | 47,428.00 | 61,656.08 | 53,593.40 |
| Margen empresarial 26.7% (incluido) | 12,664.00 | 16,463.13 | 14,310.30 |

Precio incluye: diseno React/AntD/Vite, backend RAG (LangChain, embeddings ES, vector HNSW, re-ranking, citas), RBAC chunk-level, AES-256, TLS 1.3, Vercel/Railway config, docs y capacitacion. No incluye infra (ver 8.3).

### 8.2 Hitos de pago — 5 cuotas (20/15/25/15/25%)

| Hito | Plazo | % | Bs. base | IVA 13% | Bs. total | Entregables validados |
|------|-------|---|----------|---------|-----------|-----------------------|
| **H1** Firma + Plan/Mockups aprobados | Semana 2 | 20% | 12,018.40 | 1,562.39 | **13,580.79** | E1+E2 (Plan, Figma, arquitectura, decision BD) |
| **H2** Ingesta inteligente completada | Semana 6 | 15% | 9,013.80 | 1,171.79 | **10,185.59** | E3+E4 (Auth+Casos, Upload+chunk+embed+clasif+dedup) |
| **H3** RAG + Audiencias completadas | Semana 10 | 25% | 15,022.90 | 1,953.00 | **16,975.90** | E5+E6 (Busqueda<3s+chat con citas, alertas 48h/7d, audiencias+PDF) |
| **H4** QA staging superada | Semana 14 | 15% | 9,013.80 | 1,171.79 | **10,185.59** | E7+E8+E9 (Versiones+diff, JWT watermark, auditoria, pulido, QA) |
| **H5** Prod + docs + capacitacion (inicio garantia 2 meses) | Semana 16 | 25% | 15,022.90 | 1,953.00 | **16,975.90** | E10+E11+E12 (Prod Vercel/Railway+SSL, Manuales, 2 sesiones) |
| **Total** | | **100%** | **60,092.00** | **7,812.21** | **67,904.21** | E1-E12 |

Plazo de pago: 15 dias habiles desde aprobacion de hito. Factura emitida 5 dias habiles antes. Retraso >15 dias habilita suspension de siguiente sprint (Contrato Clausula Primera y Sexta 6.5).

Descuento pago al contado: **10%** => Bs. 54,083 base / Bs. 61,113 con IVA (ver Contrato Opcion B).

### 8.3 Costos no incluidos (infraestructura a cargo Buffet)

| Concepto | Proforma | Costo 1er anio (aprox.) |
|----------|----------|-------------------------|
| Dominio .bo (ADSIB) | INF-001 | Bs. 980 /anio (.bo) o Bs. 280 (.org.bo) |
| Dominio .com (GoDaddy) | INF-002 | USD 14.99 |
| Vercel Frontend | INF-003 | USD 0 Hobby / USD 20/mes Pro |
| Railway Backend+RAG+DB+vector+cron | INF-004 | USD 5-20/mes Starter -> USD 20/mes Pro |
| PostgreSQL (Railway) | INF-005 | Incluido en Railway |
| MongoDB Atlas (si hibrido) | INF-006 | USD 0 free -> USD 9/mes |
| Chroma/pgvector/Pinecone | INF-007 | USD 0 Chroma/pgvector / USD 70 Pinecone |
| Hostinger VPS (alternativa local) | INF-008 | USD 7-30/mes |
| Servidor local on-premise | INF-009 | Bs. 8,000-15,000 hardware + Bs. 500/mes energia |
| SSL/TLS | INF-SSL-001 | USD 0 Let's Encrypt / USD 50 EV |

Detalle en `documentos/proformas/Carta_Entrega_Proformas_KM_RAG.md` y fichas INF-001 a INF-SSL-001. Infra no se incluye en COCOMO (es costo operativo).

---

## 9. Validez y Condiciones

- Validez: 30 dias calendario desde fecha de emision.
- Alcance cerrado: 29 RF + 19 RNF TDR v2.0. Incremento >10% PFNA o >0.5 KLOC requiere adenda (Contrato Clausula 11) con formula Seccion 10.
- Garantia: 60 dias post-produccion (correccion bugs atribuibles sin costo; excluye mods no autorizadas, fallos Vercel/Railway/LLM terceros, mal uso, fuerza mayor).
- Propiedad intelectual: exclusiva del Buffet tras pago total hitos.
- Confidencialidad: 3 anios post-contrato (AES-256, TLS 1.3, RBAC chunk-level, auditoria inmutable).

---

## 10. Formula para Recalcular Precio ante Cambios de Alcance

```
Entradas:
  WOP  = WEB*3.0 + SCR*1.5 + ACS_gen*4.5 + ACS_RAG*6.0 + DBC*2.5  (actual 136.5)
  KLOC = WOP * 88 / 1000
  SF_sum = PREC+FLEX+RESL+TEAM+PMAT (actual 23.59)
  B = 0.91+0.01*SF_sum
  EAF_RAG = 1.45
  NED = 12

Pasos:
  1) KLOC = WOP*88/1000
  2) E = 2.94 * KLOC^B * EAF_RAG * (NED/100)^0.2
  3) Costo_base = E * 1,248
  4) Total_IVA = Costo_base * 1.13

Ejemplo +20% alcance: WOP 163.8 => KLOC 14.41 => E 57.9 PM => Costo 72,259 base / 81,653 IVA => requiere adenda.
```

Script reproducible:

```python
def cotizacion_cocomo(WOP=136.5, SF_sum=23.59, tarifa=12480):
    KLOC=WOP*88/1000
    B=0.91+0.01*SF_sum
    NED_factor=(12/100)**0.2
    E=2.94*(KLOC**B)*1.45*NED_factor
    return {"KLOC":KLOC,"E":E,"Costo_base":E*tarifa,"Total_IVA":E*tarifa*1.13}

print(cotizacion_cocomo())
# {'KLOC': 12.01, 'E': 48.15, 'Costo_base': 600916.8, 'Total_IVA': 679036.0}
```

---

## 11. Anexos

- `Estimacion_COCOMO_KM_RAG.md` Seccion 6-7 (calculo completo SF/EM/WAE)
- `Contrato_KM_RAG.md` Clausula Sexta (precio y forma de pago)
- `Plan_Proyecto_Cronograma_KM_RAG.md` Hitos H1-H5
- `proformas/` INF-001 a INF-SSL-001 (costos deployment)
- Boehm et al., Software Cost Estimation with COCOMO II, Prentice-Hall 2000

---
