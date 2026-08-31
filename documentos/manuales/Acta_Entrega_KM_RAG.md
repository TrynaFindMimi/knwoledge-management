# ACTA DE ENTREGA — SISTEMA KM CON RAG

## Buffet de Asistencia Familiar — La Paz, Bolivia

**Fecha:** [dd/mm/2026] (Semana 16 — H5)
**Lugar:** La Paz, Bolivia
**Proyecto:** Sistema de Gestion de Conocimiento (KM) con RAG para sistematizar archivos legales
**Contrato:** `Contrato_KM_RAG.md` (16 clausulas, 60,092 base / 67,904 IVA, 8 sprints + 60d garantia)
**Cotizacion:** `documentos/cotizacion/Cotizacion_KM_RAG.md` (48.15 PM x 1,248 WAE-RAG)

---

## 1. Partes

| Rol | Nombre | C.I. | Firma |
|-----|--------|------|-------|
| Buffet (Cliente) | ________________________ (Representante Legal) | __________ | __________ |
| PM / Scrum Master | Mariana del Arroyo | __________ | __________ |
| UX/UI | Nahomi Humerez | __________ | __________ |
| Tech Lead RAG | Santiago Acha | __________ | __________ |
| Frontend / QA | Jorge Saenz | __________ | __________ |

---

## 2. Entregables Recibidos (E1-E12)

| ID | Entregable | Sprint | Criterio Aceptacion | Estado |
|----|------------|--------|---------------------|--------|
| E1 | Plan de trabajo y cronograma (8 sprints) | S1 | Aprobado Buffet | Entregado |
| E2 | Figma wireframes 16 vistas + design system AntD + arquitectura + decision BD (SQL/Mongo/hibrido) | S1 | Aprobado Buffet | Entregado |
| E3 | MVP Auth + Casos (JWT 30m, bloqueo 3 intentos, RBAC chunk-level, CRUD, dashboard KPIs) + layout AntD responsive | S2 | Tests pass, staging OK | Entregado |
| E4 | Ingesta docs 50MB drag&drop + chunk 500/100 + embed ES 768d + clasificacion auto 7 tipos + dedup >85% + renombrado scan001.jpg | S3 | Docs indexados, clasif >=90% | Entregado |
| E5 | Motor RAG completo (busqueda <3s >=85%, consulta NL coloquial con citas, chat flotante memoria) | S4 | Dataset 100 queries pass | Entregado |
| E6 | Alertas (48h/24h/2h audiencias, 7d/48h vencimientos, resumen 8AM, email semanal lunes 8AM) + audiencias (checklist auto, faltantes rojo, paquete PDF portada) | S5 | Cron OK, PDF OK | Entregado |
| E7 | Versiones (timeline v1..vN diff) + comparticion JWT 1h/24h/72h single-use watermark revocable + auditoria inmutable + admin usuarios | S6 | JWT expira, watermark OK, logs inmutables | Entregado |
| E8 | Pulido PWA/mobile <5 clics + impresion legal + ZIP con contrasena + notifs campana agrupadas | S7 | Responsive OK | Entregado |
| E9 | QA integral staging (funcional, RAG recall, seguridad ZAP 0 high, perf k6/JMeter p95 <3s/<2s, usabilidad 3 abogados) | S7 | Reporte entregado, staging aprobado | Entregado |
| E10 | Prod Vercel (frontend) + Railway (backend/RAG/DB/vector/cron) + SSL A+ + dominio + monitoreo 99.5% | S8 | Prod operativa, health OK | Entregado |
| E11 | Documentacion: Manual Tecnico (APIs, wireframes, versiones), Manual Usuario, Manual Despliegue, troubleshooting | S8 | PDFs entregados | Entregado |
| E12 | Capacitacion 2 sesiones (90m + 60m) + videos tutoriales (5-7m c/u) + guias rapidas | S8 | Sesiones realizadas, grabaciones entregadas | Entregado |

**Total hitos pagados:** H1 20% (13,580.79), H2 15% (10,185.59), H3 25% (16,975.90), H4 15% (10,185.59), H5 25% (16,975.90) = **67,904.21 IVA incl.** (ver Contrato Clausula Sexta y Cotizacion Seccion 8.2).

Infra no incluida: dominio .bo/bs 980, Vercel Hobby 0, Railway Starter 5-20 USD/mes (ver proformas INF-001 a INF-SSL-001, INF-008 Hostinger, INF-009 Local, INF-010 comparativa) por cuenta Buffet.

---

## 3. Verificacion

| Verificacion | Resultado | Evidencia |
|--------------|-----------|-----------|
| Prod operativa https://buffetkm.bo (o vercel.app) | OK | SSL Labs A+, HSTS, /health OK |
| Login RBAC + bloqueo 3 intentos | OK | Playwright E2E |
| Busqueda <3s 1k docs 10 conc. | OK | k6/JMeter p95 842ms |
| Chat con citas + memoria | OK | Dataset 100 queries >=85% |
| Alertas 48h/7d + resumen 8AM | OK | BullMQ logs |
| JWT 1h/24h/72h + revocar | OK | Tests expiracion |
| Auditoria inmutable | OK | Intento DELETE bloqueado |
| Backups AES-256 restore <30m | OK | Script restore.sh quincenal |
| Usabilidad 3 abogados <5m | OK | Reporte S7 |

---

## 4. Handover

Se entrega:

- [ ] Repos GitHub privado (acceso Buffet owner) — `main`/`develop`/`feature/*`, tags v1.0.0
- [ ] Credenciales Vercel + Railway (env prod) via Boveda (`documentos/seguridad/Boveda_Contrasenas_KM_RAG.md`)
- [ ] Dominios + SSL + backups
- [ ] Manuales PDF (Tecnico, Usuario, Despliegue)
- [ ] Videos capacitacion + grabaciones Meet
- [ ] Boveda Bitwarden transferida a admin Buffet (ver Seccion 8 Boveda)
- [ ] Proformas INF-001..010 + INF-SSL-001

El Buffet declara haber recibido y validado los entregables conforme TDR v2.0 y Contrato.

---

## 5. Garantia

60 dias calendario post-firma de esta acta (semanas 17-24). Cubre correccion sin costo de bugs atribuibles al desarrollo. Excluye mods no autorizadas, fallos infra Vercel/Railway/LLM terceros, mal uso, fuerza mayor (ver Contrato Clausula Novena).

Vencida la garantia, contrato extinguido. Nuevas features/mantenimiento RAG/re-indexado requieren nuevo contrato.

---

## 6. Firmas

La Paz, ____ de ______________ de 202__.

| Por EL BUFFET | Por EL EQUIPO DESARROLLADOR |
|---------------|------------------------------|
| ________________________ | Mariana del Arroyo — PM |
| Nombre: ________________ | Nahomi Humerez — UX/UI |
| C.I.: ________________ | Santiago Acha — Tech Lead |
| Firma: ________________ | Jorge Saenz — Frontend/QA |

---

## 7. Anexos

- TDR_KM_RAG.md, Contrato_KM_RAG.md, Plan_Proyecto_Cronograma_KM_RAG.md
- Cotizacion_KM_RAG.md, Estimacion_COCOMO_KM_RAG.md
- Manual_Tecnico_KM_RAG.md (APIs + wireframes + versiones), Manual_Usuario (visual AntD)
- Bitacoras S0-S8, Boveda_Contrasenas_KM_RAG.md
- Proformas Carta_Entrega + INF-001..010 + INF-SSL-001
- Diagramas: bpwin/BPWin_*.svg, c4/C4_*.svg, base_de_datos/*.svg, componentes/*.svg, casos_de_uso/*.svg, actividades/*.svg, uml/*.svg
