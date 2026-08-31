# REQUERIMIENTOS — SISTEMA KM CON RAG

## Buffet de Asistencia Familiar — La Paz, Bolivia

**Fecha:** 30/08/2026
**Version:** 1.0
**Referencia:** `TDR_KM_RAG.md` Seccion 6 (funcionales en TDR), `Analisis_Problematica_KM_RAG.md` Seccion 9, `User_Stories.md` 30 US, `Gestion_Riesgos_KM_RAG.md`
**Trazabilidad:** Cada RF/RNF/L esta mapeado a OE (TDR 3.2), a entrevista y a entregable E1-E12 (TDR 4.4)
**Estado:** Documento unico de requerimientos — reemplaza duplicados de RNF y limites en TDR (TDR mantiene solo RF)

---

## INDICE

1. Requerimientos Funcionales (29 RF)
2. Requerimientos No Funcionales (19 RNF)
3. Limites del Proyecto (10 L + textos legales)

---

## 1. REQUERIMIENTOS FUNCIONALES (29 RF)

29 RF organizados en 10 epicas, priorizados por entrevistas (3/3, 2/3, 1/3 pero critico). Criterios INVEST validados en `User_Stories.md`.

| ID | Funcionalidad | Prioridad | Epica | Criterio de aceptacion (medible) | Origen entrevista |
|----|---------------|-----------|-------|----------------------------------|-------------------|
| **RF-01** | Login seguro (12 carac. may/min/num/sim, bloqueo 3 intentos, 30 min expiracion, TLS 1.3) | Alta | Auth | 4to intento bloqueado HTTP 429; sesion expira tras 31 min inactividad; SSL Labs A+ | 01,03 |
| **RF-02** | Control acceso por roles (admin/abogado/asistente) + visibilidad por caso asignado + chunk-level | Alta | Auth | Abogado solo ve asignados, asistente no elimina -> test 403 pass; RBAC middleware `canAccess` | 02 |
| **RF-03** | Cifrado AES-256 reposo + campo victima (`victima.direccion`) + sin claves en texto plano | Alta | Auth | Auditoria BD/filesystem confirma AES-256; campo victima solo descifra en sesion autenticada | 03 |
| **RF-04** | Registro auditoria inmutable (usuario, fecha, accion, IP) + reporte por rango + export Excel | Alta | Auth | Intento UPDATE/DELETE en `auditoria` bloqueado; hash encadenado; reporte por rango exportable | 01 |
| **RF-05** | Crear caso (nombre cliente* + tipo obligatorio, ID unico, visible inmediato) | Alta | Casos | ID UUID unico, visible en <2s tras crear | 01,02 |
| **RF-06** | Listar casos activos (filtros tipo/estado/nombre, orden proxima audiencia, contador docs) | Alta | Casos | Filtros combinables, orden audiencia asc, paginado | 02 |
| **RF-07** | Cambiar estado caso (activo/en audiencia/cerrado-archivable-reabrible) + historial timeline | Media | Casos | Cambio 1 click, historial registrado, reabrible | 02 |
| **RF-08** | Subir documento PDF/JPG/PNG/DOCX 50MB + barra progreso + preview + confirmacion | Alta | Carga | 50MB estable, barra progreso, validacion magic-bytes | 01,03 |
| **RF-09** | Clasificacion automatica por contenido (no nombre; 7 tipos: demanda, contestacion, informe psic., cert. medico, orden proteccion, comprobante pago, otro) + confirmacion usuario + renombrado `scan001.jpg` -> descriptivo | Critica | Carga | >=90% en 20 docs prueba; `scan001.jpg` renombrado 100% | 01:40, 02 |
| **RF-10** | Deteccion duplicados por embeddings >85% -> alerta -> usuario decide cancela o versiona | Alta | Versiones | Alerta si similitud >85%; decision usuario 100% casos | 01 |
| **RF-11** | Control versiones (lista cronologica v1..., fecha/autor, descarga cualquiera, diff lado a lado) | Alta | Versiones | Timeline v1..vN, diff OK, hash SHA-256 por version | 02 |
| **RF-12** | Busqueda semantica (significado, tolera errores/sinonimos, <3s, >=85% precision) | Critica | Busqueda | p95 <3s (1000 docs, 10 conc.), precision >=85% dataset 100 queries | 01:48 |
| **RF-13** | Consulta lenguaje natural (espanol coloquial, responde citando fuente doc/fecha/caso, <3s, conversacional, memoria) | Critica | Busqueda | Respuesta <3s con citas 100%, tolera `conbenio`/`convenio` | 01 |
| **RF-14** | Chat conversacional visible siempre, coloquial, fuentes citadas, mantiene contexto (`y que mas de Mamani?`) | Alta | Busqueda | Memoria 10 turnos, typing <3s, citas linkeadas | 01 |
| **RF-15** | Alertas audiencia (48h/24h/2h con fecha/juzgado/caso/docs requeridos, in-app + email) | Alta | Alertas | Enviadas en ventana +/-10 min, in-app + email | 01:32 |
| **RF-16** | Alertas vencimiento medidas proteccion (deteccion automatica fecha doc, 7d + 48h urgente con victima/caso/accion) | Critica | Alertas | 0 vencimientos no notificados, victima/caso/accion en alerta | 03 |
| **RF-17** | Resumen diario 8AM (audiencias, faltantes, alertas) configurable + in-app + email | Media | Alertas | Entregado 8AM configurable, in-app + email sin datos sensibles | 01 |
| **RF-18** | Generar enlace temporal JWT (1h/24h/72h, single-use, log acceso quien/cuando/IP) | Alta | Compartir | JWT firmado, expiracion exacta, single-use verificado | 03 |
| **RF-19** | Compartir solo-lectura (sin descarga, watermark nombre/fecha, anti-captura best-effort) | Alta | Compartir | Watermark visible 100% previews, descarga deshabilitada | 03 |
| **RF-20** | Revocar enlace (inmediato <1s, notifica destinatario, log auditoria) | Alta | Compartir | Revocacion <1s, notif email + log | 03 |
| **RF-21** | Registrar audiencia (caso* + fecha* + hora* + juzgado* + tipo* -> checklist auto, calendario) | Alta | Audiencias | Checklist auto 100% audiencias, aparece en Calendar/Table | 01:32 |
| **RF-22** | Verificar docs faltantes (tenidos/faltantes rojo, `en tramite`, agregar manualmente) | Alta | Audiencias | Faltantes rojo, en tramite amarillo, agregar manual OK | 02 |
| **RF-23** | Generar paquete PDF consolidado (orden checklist, portada caso, muestra peso antes de descargar) | Media | Audiencias | PDF portada + orden checklist, peso preview | 01 |
| **RF-24** | Interfaz web responsive (celular/tablet/desktop, <5 clics, labels+tooltips, guia estilos 100%) | Alta | UI | <5 clics validado, usabilidad 3 abogados <5 min | 01,02 |
| **RF-25** | Modo caso urgente (boton URGENTE visible, minimos campos nombre+tipo violencia, subida inmediata) | Alta | UI | Crea caso urgente <30s, sin campos no esenciales | 03 |
| **RF-26** | Notificaciones in-app (campana + contador + agrupadas + marcar leida individual/masivo) | Media | Notif | Badge contador, agrupadas por tipo | 01 |
| **RF-27** | Notificacion email resumen semanal lunes 8AM (casos/docs/audiencias/alertas, desactivable, sin datos sensibles) | Media | Notif | Enviado lunes 8AM, desactivable, sin PII | 01 |
| **RF-28** | Imprimir documento (boton visible, dialogo navegador, tamano legal, encabezado caso/fecha) | Media | Export | Dialogo navegador, tamano legal, encabezado | 02 |
| **RF-29** | Exportar caso completo ZIP (carpetas por tipo, indice, nombres descriptivos, ZIP con contrasena opcional) | Baja | Export | ZIP carpetas por tipo + indice + nombres descriptivos | 01 |

**Prioridades:** Critica 5 (RF-09,12,13,16 + 1) | Alta 17 | Media 6 | Baja 1 = **29 RF**  
**Cobertura OE:** OE1 RF-12/13/14, OE2 RF-05/06/08/09, OE3 RF-15/16/17/21/22, OE4 RF-01/02/03/04/24/25, OE5 RF-10/11/29, OE6 RF-18/19/20

### 1.1 Mapeo RF -> OE -> Entregable -> Metrica (resumen)

| OE | RF clave | Entregable | Metrica de exito |
|----|----------|------------|------------------|
| OE1 | RF-12/13/14 | E5, E9 | p95 <3s, precision >=85%, citas 100% |
| OE2 | RF-05/08/09 | E3, E4 | clasificacion >=90%, renombrado 100% genericos |
| OE3 | RF-15/16/21 | E6 | alertas 48h/7d en ventana, checklist auto 100% |
| OE4 | RF-01/02/03/04/24 | E3, E7, E8 | A+ SSL, 0 high ZAP, <5 clics, <5 min usabilidad |
| OE5 | RF-10/11/04 | E4, E7 | dedup >85%, versionado inmutable, diff OK |
| OE6 | RF-18/19/20 | E7 | JWT expira, single-use, revoke <1s, watermark |

---

## 2. REQUERIMIENTOS NO FUNCIONALES (19 RNF)

19 RNF medibles con herramienta habilitadora (ver `TDR_KM_RAG.md` Seccion 8-9 y `Manual_Tecnico_KM_RAG.md` Seccion 2.1 para stack/versiones).

| ID | Requerimiento | Descripcion | Criterio de medicion | Prioridad | Herramienta habilitadora |
|----|---------------|-------------|----------------------|-----------|--------------------------|
| **RNF-01** | Cifrado transito | TLS 1.3 en toda comunicacion (Vercel + Railway) | SSL Labs A+ | Critica | TLS 1.3 Let's Encrypt, HSTS, vercel.json helmet |
| **RNF-02** | Cifrado reposo | AES-256-GCM en BD, archivos, backups + columna victima (`victima.direccion`) | Auditoria cifrado BD/filesystem, restore <30 min | Critica | AES-256-GCM crypto/cryptography, Boveda |
| **RNF-03** | Bloqueo intentos | Bloqueo tras 3 intentos fallidos | Prueba 4 intentos -> 429 bloqueado | Alta | JWT + bcrypt 12 + rate-limit 3 intentos |
| **RNF-04** | Sesion expiracion | 30 min inactividad expira sesion | Dejar 31 min -> logout | Alta | JWT access 30m + refresh 7d httpOnly |
| **RNF-05** | RBAC | Roles admin/abogado/asistente + chunk-level (asistente no elimina, abogado solo ve asignados) | Test permisos cruzados 100% pass | Alta | RBAC `canAccess(docId, chunkId, role)` |
| **RNF-06** | Auditoria inmutable | Logs no editables/eliminables por ningun usuario, hash encadenado | Intento UPDATE/DELETE bloqueado | Alta | Postgres `auditoria` sin grants, hash |
| **RNF-07** | Tiempo busqueda | Busqueda semantica <3s | 1000 docs indexados, 10 concurrentes, p95 <3s | Alta | Chroma/pgvector HNSW M16 efSearch 50, k6/JMeter |
| **RNF-08** | Tiempo general | Crear caso/subir/cambiar estado <2s | Monitoreo prod p95 <2s | Alta | TanStack Query + Zustand, monitoring |
| **RNF-09** | Disponibilidad | 99.5% uptime (<=4.4h downtime/mes) | UptimeRobot ping /health 1 min | Alta | Vercel Hobby + Railway Starter, Sentry |
| **RNF-10** | Carga | 10 usuarios concurrentes sin degradacion (15 en stress) | Stress 15 usuarios mixtos, 0 errores | Media | k6 0.49 + JMeter 5.6.2 15 users |
| **RNF-11** | Facilidad uso | Usuario no tecnico completa tareas (<5 min) sin ayuda | Prueba 3 abogados no tecnicos <5 min, <5 clics | Alta | AntD 5.12.8 + Vite 5.0.8, Figma design system |
| **RNF-12** | Espanol | UI 100% espanol Bolivia, 12 carac. tooltip | Revision visual 100% pantallas | Alta | AntD Theme Token, Figma |
| **RNF-13** | Consistencia | Guia estilos (colores/tipo/espaciado/botones) en 100% pantallas | Checklist guia AntD 100% | Media | AntD Theme Token 5.12.8 |
| **RNF-14** | Multi-dispositivo | Chrome/Firefox/Safari desktop+mobile responsive | Test cross-browser BrowserStack | Alta | AntD breakpoints + PWA-ready |
| **RNF-15** | Sin instalacion | Web sin plugins, solo navegador | Acceso solo navegador, sin setup | Media | Vercel SPA, PWA |
| **RNF-16** | Escalabilidad docs | 100 docs/mes sin degradacion, 5000 docs sin caida | BD 5000 docs, p95 mantenido | Media | PostgreSQL 15.4 + Chroma 0.4.18 |
| **RNF-17** | Escalabilidad usuarios | 5->20 usuarios sin cambio arquitectura | Doc agregar usuarios, sin re-arquitectura | Baja | Vercel/Railway auto-scale |
| **RNF-18** | Doc tecnica | Arquitectura, API, despliegue, troubleshooting, decisiones BD | Revision aprobada, PDFs entregados E11 | Media | Manual_Tecnico_KM_RAG.md, Markdown->PDF |
| **RNF-19** | Codigo doc. | Comentarios funciones complejas + README, cobertura >70% | Coverage >70%, ESLint 8.55 + Prettier 3.1 | Baja | VS Code 1.84, Git 2.43, GitHub Actions |

**Resumen:** Critica 2 | Alta 10 | Media 5 | Baja 2 = **19 RNF**  
Ver `Plan_Proyecto_Cronograma_KM_RAG.md` Seccion 17 y `Gestion_Riesgos_KM_RAG.md` para validacion por sprint (S7 QA integral).

---

## 3. LIMITES DEL PROYECTO (10 L + textos legales)

10 limites con justificacion detallada, impacto si se incluyera y alternativa/fase futura. Complementa `TDR_KM_RAG.md` Seccion 4 Alcance (que incluye) — ver TDR 4.1-4.4.

| # | Limite | Justificacion detallada | Impacto si se incluyera | Alternativa / Fase futura |
|---|--------|------------------------|-------------------------|---------------------------|
| L1 | No reemplaza archivo fisico (carpetas manila) | Alcance es complemento digital; destruccion de archivo fisico requiere protocolo notarial y custodia legal fuera de 16 semanas | Retraso >4 semanas, riesgo legal por perdida original | Convivencia: respaldo fisico + digital indice buscable |
| L2 | No integracion con sistema judicial LEXIUS | Requiere convenio interinstitucional con Organo Judicial, VPN certificada y API no disponible para buffet gratuito | Bloqueo >8 semanas, dependencia externa no controlable | Export ZIP + paquete PDF para carga manual en LEXIUS; fase 2 con convenio |
| L3 | No redaccion automatica de demandas/escritos | Gestion de conocimiento (almacenar/buscar/compartir), no generacion juridica; redactar implica responsabilidad profesional colegio abogados | Riesgo mala praxis, hallucination sin revisor | Cita fuente pero no redacta; plantilla vacia opcional con revisor humano |
| L4 | No modulo de facturacion | Buffet gratuito (familias vulnerables), no hay proceso cobro | Anadiria RF innecesarios | Fuera de alcance; si cambia modelo, nuevo RF en adenda |
| L5 | No abogado virtual / asesoria automatizada | Sistema gestiona conocimiento, no reemplaza consulta legal personalizada ni representa ante juez | Consejo erroneo, responsabilidad penal | Chat cita fuente, no aconseja; derivacion a humano |
| L6 | Solo espanol (Bolivia) | Embeddings/prompts calibrados para juridico boliviano + coloquial `y que mas de Mamani?` | Duplicaria esfuerzo LLM, sin demanda entrevistas | Fase futura: multilingue quechua/aymara |
| L7 | No app movil nativa (iOS/Android) | Web responsive PWA-ready (responsive desktop/tablet/celular, instalable); nativa = 2 codebases + stores | +6 semanas y +40% costo (COCOMO) | PWA en juzgados cumple RF-24; roadmap 2027 |
| L8 | No integracion WhatsApp/redes sociales | WhatsApp inseguro (sin cifrado, sin expiracion); se reemplaza por JWT 1h/24h/72h watermark | Filtracion datos victimas | Enlaces temporales single-use con log quien/cuando/IP (RF-18/19/20) |
| L9 | No migracion masiva de 200 docs historicos | Migracion masiva 2-3 semanas manual; se migra progresivo por abogado al usar sistema (20 casos prueba incluidos) | Retraso Sprint 3 | Pre-carga 20 casos variados; resto on-demand con clasificacion auto >=90% |
| L10 | No soporte 24/7 con personal dedicado | Equipo universitario horario Lun-Vie 9-18 BT; uptime 99.5% + garantia 60 dias cubre bugs, no help desk | Costo +Bs 3000/mes por guardia | Monitoreo Sentry/UptimeRobot 24/7 auto + SLA 48h critica/5d media en garantia |

**Textos legales / Paginas de politicas:** El equipo solo transcribe y publica Reglamento de Proteccion de Datos / Politica de Privacidad que el Buffet proporcione (texto plano validado por Buffet); no redacta contenido legal. El Buffet es unico responsable de redaccion/aprobacion y consentimiento para datos de prueba anonimizados. Entregable: pagina estatica markdown del Buffet, sin interpretacion juridica.

**Limites presupuestarios de infraestructura:** Dominio, hosting, LLM y vector DB mas alla de tiers gratuitos van por cuenta del Buffet segun `documentos/proformas/Carta_Entrega_Proformas_KM_RAG.md` (INF-001 a INF-SSL-001, INF-008 Hostinger, INF-009 Local, comparativa INF-010). Ver `TDR_KM_RAG.md` Seccion 22 y `Contrato_KM_RAG.md` Clausula 3.3.

---

## 4. TRAZABILIDAD Y REFERENCIAS

- **OE -> RF:** Ver `TDR_KM_RAG.md` Seccion 3.3 matriz OE->RF->Entregable->Metrica
- **Alcance vs limites:** Ver `TDR_KM_RAG.md` Seccion 4 Alcance (incluye con criterio aceptacion) y este documento Seccion 3 Limites
- **Historias:** `User_Stories.md` 30 US (10 epicas) — cada US instancia 1 RF con criterios INVEST
- **Riesgos:** `Gestion_Riesgos_KM_RAG.md` I01-I05 (informacion) trazables a RNF-07/11 y RF-09/10
- **Sede:** `documentos/requerimientos.md` es fuente unica para RNF y limites; `TDR_KM_RAG.md` mantiene solo RF (Seccion 6) para evitar duplicacion.

---

## 5. CONTROL DE COPIA

Este documento es el unico con RNF y limites detallados. TDR conserva solo RF para ligereza. Cualquier cambio de RNF/L requiere actualizar este archivo y referenciar en `Plan_Proyecto_Cronograma_KM_RAG.md` Seccion 17 y `Gestion_Riesgos_KM_RAG.md`.
