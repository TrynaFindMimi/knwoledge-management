# GESTION DE RIESGOS — SISTEMA KM CON RAG

## Buffet de Asistencia Familiar — La Paz, Bolivia

**Fecha:** 30/08/2026
**Version:** 1.0
**Referencia:** `TDR_KM_RAG.md` Seccion 11, `Contrato_KM_RAG.md` Clausula Cuarta/Decima/Decima Primera, `Plan_Proyecto_Cronograma_KM_RAG.md` Seccion 17, `Manual_Tecnico_KM_RAG.md` Seccion 8/9/11
**Metodologia:** PMI PMBOK 7, ISO 31000, matriz Probabilidad x Impacto (1-3)

---

## 1. Indice

1. Escala de evaluacion
2. Mapa resumen por categoria
3. Riesgos tecnicos y de seguridad (T01-T13)
4. Riesgos de informacion (I01-I05)
5. Riesgos operativos y de dependencia (O01-O10)
6. Riesgos de infraestructura y SSL/TLS (S01-S04)
7. Riesgos financieros (F01-F07)
8. Reserva de contingencia y plan de respuesta general
9. Seguimiento y bitacoras

---

## 2. Escala de Evaluacion

| Probabilidad | Valor | Descripcion |
|--------------|-------|-------------|
| Baja | 1 | <15% en el proyecto |
| Media | 2 | 15-40% |
| Alta | 3 | >40% |

| Impacto | Valor | Descripcion |
|---------|-------|-------------|
| Bajo | 1 | Retraso <3 dias, sin afectar hitos |
| Medio | 2 | Retraso 3-10 dias o costo <5% |
| Alto | 3 | Retraso >10 dias, brecha seguridad o perdida datos |
| Critico | 4 | Perdida datos victimas, incumplimiento legal, proyecto detenido |

| Severidad = P x I | Rango | Tratamiento |
|-------------------|-------|-------------|
| 1-2 | Baja | Aceptar, monitorear |
| 3-4 | Media | Mitigar |
| 6 | Alta | Mitigar + plan contingencia |
| 8-9 | Alta-Critica | Evitar/transferir + contingencia inmediata |
| 12 | Critica | Evitar, escalamiento a direccion |

---

## 2.1 Heatmap Probabilidad x Impacto (3x4) y Top 5

| Prob \ Imp | 1 Bajo | 2 Medio | 3 Alto | 4 Critico |
|-------------|--------|---------|--------|-----------|
| **3 Alta** | — | — | T01, T04, T11, I02, O01, O06, S01, F01 (6) | **T02 (12)** |
| **2 Media** | — | T03, T06, T07, I03, O03, O04, O05, O08, O09, S04, F02, F05 (4-6) | T01,T04,T11 | **T05 (8), T08 (8)** |
| **1 Baja** | F03, F04, F06 (1) | O07, O10, S02, F07 (2) | T10, T12, I01, I05, O02, S03 (3) | I04, S03, T13 (4) |

Celda mas critica: Prob 3 x Imp 4 = 12 (T02 fuga datos victimas). Top 5 por Severidad: T02 (12), T05 (8), T08 (8), T01/T04/T11/I02/O01/O06/S01/F01 (6). Priorizar mitigacion de Top 5 en Sprints S2-S4.

## 2.2 Valor Monetario Esperado (EMV) — Top 8

| ID | Sev | Prob | Impacto en dias | Impacto en Bs (costo directo) | EMV dias | EMV Bs |
|----|-----|------|-----------------|-------------------------------|----------|--------|
| T02 | 12 | 0.45 | 12d + legales | 4,500 (rotacion + auditoria) | 5.4d | 2,025 |
| T08 | 8 | 0.30 | 6d | 1,200 | 1.8d | 360 |
| T05 | 8 | 0.30 | 8d | 1,800 | 2.4d | 540 |
| T04 | 6 | 0.35 | 5d | 800 (escalado Railway) | 1.75d | 280 |
| I02 | 6 | 0.35 | 4d | 600 | 1.4d | 210 |
| O01 | 6 | 0.35 | 7d | 0 (mocks) | 2.45d | 0 |
| F01 | 6 | 0.35 | 10d | 0 (solo delay) | 3.5d | 0 |
| S01 | 6 | 0.35 | 2d | 0 | 0.7d | 0 |
| **Reserva recomendada** | | | **5 dias** | **Bs 800** | **19.4d expuestos -> 5d buffer cubre 26%** | **3,415 expuestos -> 800 cubre picos** |

Calculo: Prob (Alta 0.45 / Media 0.30 / Baja 0.10) x Impacto. Reserva 5 dias y Bs 800 cubre contingencia razonable sin inflar COCOMO (ver TDR 11.2 y Plan 17).

## 3. Mapa Resumen por Categoria

| Categoria | IDs | Severidad maxima | Riesgo critico |
|-----------|-----|------------------|----------------|
| Tecnicos / Seguridad | T01-T13 | 9 (Critica) | T02 Fuga datos victimas, T08 Inyeccion prompt |
| Informacion | I01-I05 | 8 | I01 Perdida corrupcion docs |
| Operativos | O01-O10 | 6 (Alta) | O01 Retraso materiales |
| Infra / SSL | S01-S04 | 6 (Alta) | S01 Cert expirado |
| Financieros | F01-F07 | 6 (Alta) | F01 Retraso pago hitos |

Total 29 riesgos activos + 5 dias reserva cronograma + Bs. 800 reserva Buffet para LLM/vector/dominio.

---

## 4. Riesgos Tecnicos y de Seguridad (T01-T13)

| ID | Riesgo | Prob | Imp | Sev | Causa | Mitigacion (preventiva) | Contingencia (reactiva) | Owner | Sprint afectado | Indicador disparo |
|----|--------|------|-----|-----|-------|--------------------------|--------------------------|-------|-----------------|-------------------|
| T01 | Embeddings drift / cambio modelo rompe retrieval | 2 | 3 | 6 Alta | Actualizacion sentence-transformers sin re-index | Fijar `embedding_version` en BD, versionar `vector_config.json`, re-index batch controlado Sprint 4 | Re-embeddings batch nocturno, rollback a version previa, re-validar dataset 100 queries | Tech Lead RAG | S3-S4 | Precision <80% en QA |
| T02 | Fuga datos victimas por RBAC chunk mal configurado | 3 | 4 | 12 Critica | Permiso chunk-level omitido | RBAC middleware `canAccess(docId, chunkId, role)` + tests 403 cruzados + AES-256 campo + auditoria | Bloquear usuario, revocar JWTs, auditar logs, notificar Buffet <24h, rotar AES_FIELD_KEY | Tech Lead + QA | S2/S6 | Log acceso no autorizado chunk |
| T03 | Clasificacion automatica erratica (<70% confianza) | 2 | 2 | 4 Media | Prompt LLM sin contexto juridico boliviano | Prompt ES con taxonomia 7 tipos + confirmacion humana RF-09 + threshold tuning | Fallback tagging manual, re-entrenar prompt, re-index batch con nuevo prompt | Tech Lead RAG | S3 | Confianza promedio <0.75 |
| T04 | Latencia busqueda >3s con 1k docs | 2 | 3 | 6 Alta | HNSW mal tunning, LLM lento | HNSW M=16 efSearch=50, cache embeddings, pgvector/Chroma index, k6/JMeter tunning | Subir efSearch 100, cache redis, escalar Railway Pro, degradar a busqueda keyword temporal | Tech Lead | S4/S7 | p95 >3000ms en k6 |
| T05 | Bypass JWT / session fixation | 2 | 4 | 8 Alta-Critica | JWT_SECRET debil, refresh sin rotacion | JWT 64 hex (openssl rand), access 30m + refresh 7d httpOnly Secure SameSite Strict + bcrypt 12 + rate limit | Rotar JWT_SECRET inmediata, invalidar sesiones, forzar logout, auditar | Tech Lead | S2/S6 | Intento 4 logins 401 |
| T06 | Carga masiva 50MB falla / timeout | 2 | 2 | 4 Media | Railway Volumes sin streaming | Upload AntD Dragger con streaming chunked, validacion magic-bytes, barra progreso | Retry con backoff, reducir a 25MB temporal, S3 multipart | Frontend + Tech Lead | S3 | Error 413/504 >5% uploads |
| T07 | Desduplicacion falso positivo/negativo >85% | 2 | 2 | 4 Media | Threshold fijo sin calibracion | Calibrar threshold con 20 casos prueba, mostrar alerta con opcion usuario | Ajustar threshold 80/90, re-embed con modelo distinto | Tech Lead RAG | S3/S7 | Quejas dedup >10% |
| T08 | Inyeccion prompt RAG (prompt injection) | 2 | 4 | 8 Alta-Critica | Usuario inyecta instrucciones en documento o chat | Sanitizacion Pydantic/Zod, delimitadores prompt, system prompt aislado, validacion LLM output | Bloquear IP, filtrar prompt, log, retornar error controlado sin revelar system | Tech Lead RAG | S4 | LLM retorna system prompt |
| T09 | LLM alucina sin citas o cita falsa | 2 | 3 | 6 Alta | Retrieval vacio, LLM genera sin fuente | Forzar generacion solo con citas (`citar fuente doc/caso/fecha`), top-k 5, rerank, fallback "no hay informacion" | Devolver "no encontre fuente", log, re-retrieve con query reformulada | Tech Lead RAG | S4 | Cita sin docId |
| T10 | Perdida embeddings tras deploy | 1 | 3 | 3 Media | Volumen Railway no persistente | Railway Volumes persistente + snapshot diario + backup S3 versionado | Restore snapshot <1h, re-index desde Postgres | Tech Lead | S8 | Health vector 500 |
| T11 | Hackeo prod (defacing, malware, ransomware vector DB) | 2 | 3 | 6 Alta | WAF no configurado, deps vulnerables | WAF Vercel, helmet CSP, ZAP semanal, npm/pip audit bloquea high, 2FA admin, rate limit | Modo mantenimiento, restore backup cifrado <1h, rotar JWT/AES, notificar Buffet <24h, Sentry | Tech Lead + QA | S6-Garantia | Spike 5xx + Sentry anomaly |
| T12 | DDoS / scraping masivo vector DB | 1 | 3 | 3 Media | Rate limit ausente | Rate limit 100/15min, WAF Vercel, Cloudflare si Hostinger | Activar challenge, bloquear IP, escalar plan | Tech Lead | Garantia | 429 >10% trafico |
| T13 | Brecha vector DB expone embeddings | 1 | 4 | 4 Media | Vector DB sin auth | Auth Chroma/pgvector + TLS + network isolate Railway private network | Revocar creds, rotar VECTOR_DB_URL, re-embed | Tech Lead | S3-Garantia | Acceso vector sin token |

---

## 5. Riesgos de Informacion (I01-I05)

| ID | Riesgo | Prob | Imp | Sev | Mitigacion | Contingencia | Owner | Indicador |
|----|--------|------|-----|-----|------------|--------------|-------|-----------|
| I01 | Perdida o corrupcion de documentos (50MB, S3) | 1 | 4 | 4 Media | Versionado inmutable v1..vN (nunca sobreescribe RB-07), S3 versionado, hash SHA-256 por version, backups daily | Restore S3 version previa <30m, hash verify, re-upload | Tech Lead | Check hash fail |
| I02 | Clasificacion erronea >30% (demanda->otro) | 2 | 3 | 6 Alta | Prompt ES juridico + confirmacion humana RF-09 + Tag sugerido con confianza | Fallback manual tagging, re-tunear prompt, re-index batch, entrenar con 20 casos Buffet | Tech Lead RAG | Precision <70% S3 |
| I03 | Embeddings drift tras nuevos tipos doc | 2 | 2 | 4 Media | Versionar embeddings, re-embeddings batch mensual si nuevos tipos | Re-embed nocturno, validar dataset 100 queries | Tech Lead RAG | Recall <80% |
| I04 | Entrenamiento LLM con datos Buffet sin anonimizar (violacion Clausula 8) | 1 | 4 | 4 Media | Bloqueado por Contrato: prohibido sin consentimiento escrito anonimizado; anonimizar antes de cualquier training | Detener training, purgar dataset, auditar, notificar Buffet | PM + Tech Lead | Deteccion dataset con PII |
| I05 | Versionado falla (presenta demanda vieja v1 en vez de vN) | 1 | 3 | 3 Media | Busqueda retorna vN por defecto RB-20, badge actual, diff lado a lado | Hotfix query ORDER BY version DESC, auditar caso afectado | Tech Lead | Reporte version vieja |

---

## 6. Riesgos Operativos y de Dependencia (O01-O10)

| ID | Riesgo | Prob | Imp | Sev | Mitigacion | Contingencia | Owner | Sprint | Indicador |
|----|--------|------|-----|-----|------------|--------------|-------|--------|-----------|
| O01 | Retraso entrega 20 casos/docs muestra anonimizados | 2 | 3 | 6 Alta | Recordatorio Semana 0/1, mocks sinteticos paralelos | Trabajar con placeholders, adelantar S2, reprogramar S3 +1 sem | PM | S1 | Semana 1 sin 20 casos |
| O02 | Vercel/Railway no obtenido (cuenta Buffet) | 1 | 3 | 3 Media | Guia proformas INF-003/004, handover o crear en cuenta equipo | Mantener staging vercel.app/railway.app, no bloquea entregables | Tech Lead | S1 | Semana 2 sin cuenta |
| O03 | Cambios alcance no controlado (scope creep) | 2 | 2 | 4 Media | Backlog Kanban, adenda escrita Clausula 11 antes de ejecutar | Congelar sprint, cotizar adenda con formula Cotizacion Secc 10 | PM | Todos | RF fuera de TDR |
| O04 | PO Buffet poco disponible (5 dias aprobacion) | 2 | 2 | 4 Media | Aprobacion tacita 5 dias habiles (Contrato 5.2), demo grabada | Escalar a representante, reprogramar demo +1 dia | PM | Todos | Demo sin feedback 5d |
| O05 | Rotacion personal equipo (examenes/fin semestre) | 2 | 2 | 4 Media | Equipo 4 roles complementarios, daily 15m, docs en Notion | Redistribuir WIP 1-2 por persona, backlog priorizado | PM | Todos | Daily ausente >2d |
| O06 | Subestimacion esfuerzo RAG (Sprint 4 critico) | 2 | 3 | 6 Alta | Spike Sprint 1 (prueba embeddings), reserva 5 dias | Extender S4 +3 dias con horas extra, recortar S5 no critico | Tech Lead RAG | S4 | Story points >30 sin avance |
| O07 | Falta dominio .bo (.bo no gestionado) | 1 | 2 | 2 Baja | Proformas INF-001/002, alternativa vercel.app sin costo | Mantener vercel.app prod temporal | Tech Lead | S8 | Semana 13 sin dominio |
| O08 | Dependencia 3 abogados para usabilidad S7 | 2 | 2 | 4 Media | Agendar Semana 12 con 48h preaviso | Usar asistentes como proxy, reprogramar +2 dias | UX/UI | S7 | <2 abogados confirmados |
| O09 | Retraso aprobacion demo (silencio no es aprobacion) | 2 | 2 | 4 Media | Clausula tacita 5 dias habiles + acta | Re-enviar acta, escalar, no iniciar siguiente sprint sin acta firmada | PM | Todos | Sprint sin acta |
| O10 | Documentacion incompleta (Manual Tecnico/Usuario) | 1 | 2 | 2 Baja | Markdown->PDF desde S5, revisor PM | Extender S8 +2 dias, priorizar Manual Tecnico Secc 4-6 | PM + Tech Lead | S8 | Docs <80% semana 15 |

---

## 7. Riesgos de Infraestructura y SSL/TLS (S01-S04)

| ID | Riesgo | Prob | Imp | Sev | Mitigacion | Contingencia | Owner | Indicador |
|----|--------|------|-----|-----|------------|--------------|-------|-----------|
| S01 | Cert TLS expirado / Vercel-Railway mismatch -> http downgrade | 2 | 3 | 6 Alta | Let's Encrypt auto 90d (Vercel/Railway gestionado), HSTS max-age 31536000, monitor UptimeRobot SSL check | Forzar `vercel certs renew`, `railway certs renew`, rollback http->https, verificar ssllabs A+ | Tech Lead | S1/Garantia | Browser warning / SSL Labs <A |
| S02 | TLS downgrade (TLS 1.2 en vez de 1.3) | 1 | 2 | 2 Baja | Forzar TLS 1.3 only (vercel.json + Railway proxy), A+ | Re-deploy con TLS 1.3 only, headers | Tech Lead | S8 | ssllabs B |
| S03 | Clave AES expuesta en repo/env | 1 | 4 | 4 Media | AES_KEY solo en Railway env (no repo), Boveda Bitwarden, .env.example sin valores, pre-commit secret scan | Rotar AES_KEY inmediata, re-encrypt campo victima, auditar git history (BFG), notificar | Tech Lead | S2-S6 | Secret en git log |
| S04 | Backup cifrado no restaurable (AES) | 1 | 3 | 3 Media | Backup daily AES-256 + test restore quincenal <30m script `restore.sh` | Usar backup S3 version previa, re-generar key, re-backup | Tech Lead | S7-Garantia | Restore test fail |

---

## 8. Riesgos Financieros (F01-F07)

| ID | Riesgo | Prob | Imp | Sev | Mitigacion | Contingencia | Owner | Indicador |
|----|--------|------|-----|-----|------------|--------------|-------|-----------|
| F01 | Retraso pago hitos H2/H3 (>15 dias) | 2 | 3 | 6 Alta | Factura 5 dias antes, Clausula Primera no suspension pero siguiente sprint suspendible 6.5 | Suspender siguiente sprint hasta regularizacion, no afecta hitos ya aprobados | PM | Todos | Factura vencida 15d |
| F02 | Costo LLM/Pinecone supera tiers gratuitos (USD 70) | 2 | 2 | 4 Media | Priorizar Chroma/pgvector USD 0 + GPT-4o-mini low cost, cuota USD 20/mes limite, monitor uso | Cambiar a Mistral 7B local, reducir pinecone, solicitar adenda si uso >Bs 800 | Tech Lead | S3-S4 | Costo >USD 20/mes |
| F03 | Dominio .bo > presupuesto (Bs 980) | 1 | 1 | 1 Baja | Proforma INF-001 .org.bo Bs 280 alternativa | Usar .org.bo o .com USD 15 o vercel.app | PM | S8 | Cotizacion >Bs 1000 |
| F04 | Hostinger/Local mas caro que Railway | 1 | 1 | 1 Baja | INF-010 comparativa, Railway USD 5-20 es mas barato | Mantener Railway, no migrar sin aprobacion | PM | S8 | Comparativa >Bs 2000/anio |
| F05 | Infra anual (Vercel Pro USD 20 + Railway Pro USD 20) no presupuestada | 2 | 2 | 4 Media | INF-003/004 proformas, Hobby USD 0 cubre prod | Mantener Hobby, escalado solo con aprobacion Buffet | PM | S8 | Limite Hobby superado |
| F06 | Variacion cambiaria USD/Bs afecta costos USD | 1 | 1 | 1 Baja | Cotizar en Bs con colchon 5% | Ajustar hitos en Bs, no en USD | PM | Todos | USD +10% |
| F07 | Garantia 60d genera costo no facturado | 1 | 2 | 2 Baja | Garantia solo bugs atribuibles, SLA 48h critica/5d media, sin nuevas features | Cotizar nuevo contrato si reporte es feature | PM | Garantia | Ticket fuera de garantia |

---

## 8.1 RACI de Riesgos y Umbral de Escalamiento

| Actividad riesgo | R (Responsible) | A (Accountable) | C (Consulted) | I (Informed) | Umbral escalamiento |
|------------------|-----------------|-----------------|---------------|--------------|---------------------|
| T02/T08 (Critica 8-12) fuga / injection | Tech Lead + QA | PM | Buffet Admin (confidencialidad) | Buffet Representante | **Inmediato <4h**: pausa deploy prod, notifica Buffet, registra bitacora |
| T04/T11 perf/hackeo (Alta 6) | Tech Lead | Tech Lead | PM | Buffet | <24h, daily siguiente |
| I02 clasificacion (Alta 6) | Tech Lead RAG | Tech Lead RAG | UX/UI (prompt) | PM | Sprint review S3 |
| O01/O04/O06 operativo (Alta 6) | PM | PM | PO Buffet | Equipo | 5 dias sin material -> reprograma S3 |
| S01 SSL (Alta 6) | Tech Lead | PM | — | Buffet | Browser warning -> <24h |
| F01 pago (Alta 6) | PM | PM | Buffet Admin | Equipo | Factura vencida 15d -> suspende siguiente sprint (Contrato 6.5) |
| Resto Media/Baja (1-4) | Owner tabla | PM | — | — | Retrospectiva quincenal |

Regla: toda contingencia con costo >Bs 400 o delay >3 dias requiere aprobacion PM + registro en bitacora; >Bs 800 o Sev >=8 requiere aprobacion Buffet (adenda si aplica). Critica 12 (T02) escala a direccion Buffet y a Tech Lead en 4h.

## 9. Reserva de Contingencia y Plan de Respuesta General

| Concepto | Reserva |
|----------|---------|
| Tiempo | 5 dias habiles al final de S8 (no asignados a story), consumibles por O01/O04/O06/S01 |
| Costo | Bs. 800 recomendados a Buffet (fuera de 60,092) para picos LLM/vector/dominio — ver TDR 11.2 |
| Equipo | WIP 1-2 por persona, buffer sprint review +1 dia |

Plan general: daily 15m detecta riesgo -> PM registra en bitacora -> evalua P/I -> ejecuta mitigacion -> si dispara contingencia, notifica Buffet <24h y registra en bitacora sprint siguiente. Riesgos Critica (T02,T08) escalan inmediato a PM + Tech Lead y pueden pausar deploy prod.

---

## 10. Seguimiento, Bitacoras y Trazabilidad Herramientas

**Trazabilidad riesgo -> herramienta (ver TDR 9.4 y Plan 2.6):**
| Riesgo | Herramienta que mitiga | Sprint | Evidencia verificable |
|--------|------------------------|--------|------------------------|
| T02/T05 | RBAC canAccess + AES-256 + Boveda Bitwarden | S2/S6 | Tests 403 cruzados, secret scan pre-commit |
| T08 | Pydantic/Zod sanitizacion + delimitadores prompt | S4 | LLM no retorna system prompt |
| T04 | pgvector HNSW M16 + k6/JMeter p95 | S4/S7 | Reporte k6 p95 <3s |
| S01/S02 | Vercel/Railway Let's Encrypt + UptimeRobot SSL | S1/Garantia | SSL Labs A+ |
| F01 | Contrato Clausula Primera + factura 5d antes | Todos | Bitacora sprint sin suspension indebida |

## 10. Seguimiento y Bitacoras (cont.)

- Bitacoras `documentos/bitacoras/Bitacora_Sprint_00.md` a `Bitacora_Sprint_08.md` registran riesgos disparados por sprint (ver Plan Seccion 17).
- Revision quincenal en retrospectiva.
- Auditoria mensual garantia: ZAP + npm audit + restore test + SSL Labs A+.

---

## 12. Anexos

- `TDR_KM_RAG.md` Seccion 11 (resumen)
- `Plan_Proyecto_Cronograma_KM_RAG.md` Seccion 17 (resumen 5 riesgos)
- `Manual_Tecnico_KM_RAG.md` Seccion 8 (seguridad) y 11 (troubleshooting)
- `Boveda_Contrasenas_KM_RAG.md` (rotacion 90d)
- `proformas/INF-003` a `INF-010` + `INF-SSL-001`
