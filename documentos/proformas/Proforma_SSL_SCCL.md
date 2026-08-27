# PROFORMA N.º INF-SSL-001

## SSL/TLS 1.3 (SCCL) — CERTIFICADOS Y HEADERS DE SEGURIDAD

---

**EMPRESA EMISORA:** Equipo de Desarrollo KM RAG

**CLIENTE:** Buffet de Asistencia Familiar — La Paz, Bolivia

**FECHA EMISIÓN:** 27/08/2026

**VALIDEZ:** 30 días

**N.º PROFORMA:** INF-SSL-001 (SCCL)

---

### 1. OBJETO

Cotización **SSL/TLS (SCCL — siglas locales SSL)** para cumplir **RNF-01** (TLS 1.3, SSL Labs A+) y **RNF-02** (AES-256 reposo) + mitigar riesgos **S01–S04** y **T02/T05/T11**.

### 2. OPCIONES

| Código | Producto | Emisor | Precio | Validez | Cuándo |
|--------|----------|--------|--------|---------|--------|
| **INF-SSL-001A** | **Let's Encrypt** (auto) | Let's Encrypt | **US$ 0** | **90 días auto-renew** (Vercel+Railway gestionado) | **Recomendado** — cubre RNF-01 A+, HSTS, gratis |
| **INF-SSL-001B** | **EV (Extended Validation)** | Sectigo / DigiCert | ≈ **US$ 50 / año** | 1 año | Solo si Buffet exige sello verde barra navegador |

*Vercel y Railway auto-provisionan Let's Encrypt sin costo extra (INF-003/004). INF-SSL-001 cotiza por separado para transparencia.*

### 3. DETALLE

| N.º | Descripción | Unidad | Precio | Subtotal |
|-----|-------------|--------|--------|----------|
| 1 | Let's Encrypt TLS 1.3 — Vercel (frontend) + Railway (backend) auto-renew 90d, HSTS `max-age=31536000; includeSubDomains; preload`, http→https | 12 meses | US$ 0 | **US$ 0** |
| — | *Opción* EV Sectigo (si Buffet exige) | 1 año | US$ 50 | ~Bs 550 |
| — | Headers seguridad (`helmet` + `vercel.json`): `CSP`, `X-Frame-Options DENY`, `X-Content-Type-Options nosniff`, `Referrer-Policy strict-origin` | — | US$ 0 | **US$ 0** |

### 4. CONFIG TÉCNICA (Herramientas SCCL)

**Vercel (`vercel.json`):**
```json
{ "headers": [
  { "source": "/(.*)", "headers": [
    { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
    { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'" },
    { "key": "X-Frame-Options", "value": "DENY" },
    { "key": "X-Content-Type-Options", "value": "nosniff" },
    { "key": "Referrer-Policy", "value": "strict-origin" }
  ]}
]}
```

**Railway (backend Express):**
```js
import helmet from 'helmet';
app.use(helmet({ hsts: { maxAge: 31536000, includeSubDomains: true, preload: true } }));
// trust proxy + Secure SameSite Strict
app.set('trust proxy', 1);
// cookie JWT
res.cookie('refresh', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7*24*60*60*1000 });
```

**Railway (FastAPI):**
```python
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
app.add_middleware(HTTPSRedirectMiddleware)
# + uvicorn --ssl-certfile / --ssl-keyfile / Railway proxy handles TLS
```

### 5. VERIFICACIÓN (TDR §12.2 / Plan §HerrSeg / Riesgos Anexo C)

| # | Check | Herramienta | Frecuencia | Criterio |
|---|-------|-------------|------------|----------|
| 1 | SSL Labs A+ | `ssllabs.com/ssltest?d=buffetkm.bo` | Cada deploy prod | **A+** (RNF-01) |
| 2 | Headers A | `securityheaders.com/?q=buffetkm.bo` | S7 | **A** |
| 3 | TLS 1.3 only | `nmap --script ssl-enum-ciphers -p 443 buffetkm.bo` | S7 | Solo TLS1.3 |
| 4 | Cert expiry | UptimeRobot SSL monitor (30/7/1d) | Diario auto | >30d |
| 5 | HSTS preload | `curl -I https://buffetkm.bo \| grep -i strict` | S8 | `max-age=31536000` |
| 6 | No key in repo | `gitleaks detect` (CI) | Cada push | 0 leaks (S03) |

### 6. CONDICIONES

| Condición | Detalle |
|-----------|---------|
| **Recomendación** | **Let's Encrypt US$ 0 (INF-SSL-001A)** — auto-renew Vercel+Railway, A+, HSTS preload, cubre 99.5% + RNF-01 sin costo. EV US$ 50 solo si Buffet exige validación extendida (barra verde) |
| **Incluido** | Ya incluido en INF-003 (Vercel) + INF-004 (Railway) — INF-SSL-001 es desglose para transparencia |
| **Límite** | No genera costo extra sin aprobación; si Buffet exige EV → adenda US$ 50 per Contrato Cl. 3.2 |
| **Garantía** | Monitor SSL UptimeRobot 30/7/1d + auto-renew 90d → riesgo S01 mitigado a Baja |
| **Entrega** | Equipo configura en S1 (staging) y S8 (prod) — verifica `ssllabs.com` A+ antes E10 |

**Véase:** `TDR_KM_RAG.md §12`, `Plan_Proyecto_Cronograma_KM_RAG.md §HerramientasSeguridad`, `TDR_Gestion_Riesgos_KM_RAG.md §4.3 S01–S04 + Anexo C`.

---
