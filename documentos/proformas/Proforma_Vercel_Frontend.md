# PROFORMA N.º INF-003

## HOSTING VERCEL — FRONTEND React + Vite + AntD

---

**EMPRESA EMISORA:** Equipo de Desarrollo KM RAG

**CLIENTE:** Buffet de Asistencia Familiar — La Paz, Bolivia

**FECHA EMISIÓN:** 27/08/2026

**VALIDEZ:** 30 días

**N.º PROFORMA:** INF-003

---

### 1. OBJETO

Hosting **frontend SPA** `React 18 + Vite 5 + AntD 5.x` en **Vercel** — CI/CD git, previews por PR, edge CDN, SSL/TLS 1.3 auto.

### 2. CARACTERÍSTICAS

| Componente | Hobby (recomendado) | Pro (si escala) |
|------------|---------------------|-----------------|
| **Precio** | **US$ 0 / mes** | US$ 20 / mes por usuario |
| **Deploy** | `git push` → prod + preview por PR | Igual + más analytics |
| **Bandwidth** | 100 GB / mes | 1 TB / mes |
| **Builds** | 6,000 min / mes | 24,000 min / mes |
| **Dominios** | Custom `buffetkm.bo` + `vercel.app` | Igual |
| **SSL** | Let's Encrypt auto, HSTS, A+ | Igual (EV si Buffet) |
| **Env vars** | `VITE_API_URL` → Railway API cifrada | Igual |
| **Headers seguridad** | `vercel.json`: HSTS, CSP, X-Frame (ver INF-SSL-001) | Igual |
| **Soporte** | Community | Email prioritario |

### 3. DETALLE COSTO 4 MESES + 1 AÑO

| N.º | Descripción | Unidad | Precio | Subtotal 4 meses | Subtotal 12 meses |
|-----|-------------|--------|--------|------------------|-------------------|
| 1 | Vercel Hobby — React+Vite+AntD | 4 meses | US$ 0 | **US$ 0** | **US$ 0** |
| — | *Opción escala* Vercel Pro | 4 meses | US$ 20 / mes | US$ 80 (~Bs 880) | US$ 240 (~Bs 2,640) |

### 4. USO DE HERRAMIENTA EN SPRINTS

| Sprint | Uso | Verificación |
|--------|-----|--------------|
| S1 | `vercel link` + `vercel env add VITE_API_URL`, deploy preview AntD layout, `vercel.json` headers HSTS/CSP | Preview OK + SSL Labs A+ |
| S2–S7 | Cada push `develop`→preview, `main`→prod, PR preview per feature | GitHub Actions → Vercel |
| S8 | Dominio prod `buffetkm.bo` → Vercel, `vercel certs ls` | Prod A+ |
| Garantía | Monitor UptimeRobot + Vercel Analytics | 99.5% uptime |

### 5. CONDICIONES

| Condición | Detalle |
|-----------|---------|
| **Titularidad** | Buffet (cuenta Vercel con su email) o cuenta equipo con handover (Manual Despliegue §3) |
| **Pago** | Hobby US$ 0 — no requiere tarjeta si Buffet usa GitHub login; Pro tarjeta internacional |
| **Límite** | Hobby cubre 4 meses + 5000 docs sin exceder 100GB; si excede → adenda Pro per Contrato Cl. 3.2 |
| **Incluye** | CI/CD, CDN edge, SSL (INF-SSL-001), previews, rollback (`vercel rollback`) |
| **No incluye** | Dominio (INF-001/002), backend Railway (INF-004) |
| **Recomendación** | **Hobby (US$ 0)** — suficiente para 16 sem, 10 concurrentes, 100GB; Pro solo si Buffet requiere analytics avanzado o >100GB |

---
