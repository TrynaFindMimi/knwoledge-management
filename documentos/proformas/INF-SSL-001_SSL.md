# PROFORMA INF-SSL-001 — SSL/TLS (SCCL)

**Fecha:** 30/08/2026
**Proveedor:** Let's Encrypt (via Vercel/Railway) / Sectigo EV

| Opcion | Costo | Renovacion | Nota |
|--------|-------|------------|------|
| Let's Encrypt (recomendado) | USD 0 | Auto 90 dias (Vercel/Railway gestionado) | Calificacion A+ SSL Labs, HSTS, TLS 1.3 |
| Sectigo EV (sello verde) | USD 50 /anio | Manual | Solo si Buffet exige validacion extendida |

**Headers:** HSTS max-age=31536000; includeSubDomains; preload, CSP, X-Frame-Options DENY.
**Verificacion:** ssllabs.com A+ cada deploy, securityheaders.com A en Sprint 7.
