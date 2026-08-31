# PROFORMA INF-010 — Comparativa Entornos de Deployment

**Fecha:** 30/08/2026
**Comparativa para decision Buffet (ver TDR 22 y Contrato 3.3)**

| Criterio | Vercel + Railway (recomendado) | Hostinger VPS | Servidor Local |
|----------|--------------------------------|---------------|----------------|
| Costo 1er anio | ~USD 60-240 + dominio Bs 980 | ~USD 156 (KVM2) + dominio | Bs 8k-15k hw + Bs 7k energia/internet |
| Setup | 1h (git push) | 4h (Docker, Nginx, Certbot) | 1 dia (hw + OS) |
| Escalabilidad | Auto (Vercel edge, Railway scale) | Manual (upgrade VPS) | Limitada (hw) |
| Backups | Auto daily | Manual (snapshot USD 2) | Manual |
| SSL | Let's Encrypt auto | Let's Encrypt manual | Let's Encrypt manual |
| Disponibilidad | 99.5% (SLA Vercel/Railway) | 99.9% (Hostinger SLA) | Depende oficina (sin UPS ~95%) |
| Privacidad | Datos en US/EU (Railway) | Datos en EU | Datos en Bolivia (maxima) |
| Recomendado para | Prod rapido, sin admin | Costo medio con control | Soberania datos victimas |

**Conclusion:** Vercel+Railway es mas rapido y sin admin (recomendado para 4 meses). Hostinger es alternativa economica con mas control. Local solo si privacidad exige. La eleccion no altera precio COCOMO (60,092 base) porque infra es por cuenta Buffet.
