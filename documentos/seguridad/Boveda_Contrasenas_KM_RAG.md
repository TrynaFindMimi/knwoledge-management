# BOVEDA DE CONTRASENAS — SISTEMA KM CON RAG

## Buffet de Asistencia Familiar — La Paz, Bolivia

**Fecha:** 30/08/2026
**Version:** 1.0
**Clasificacion:** CONFIDENCIAL — Acceso restringido (RBAC admin + Tech Lead)
**Referencia:** `TDR_KM_RAG.md` RNF-01/02/03/05, `Contrato_KM_RAG.md` Clausula Octava, `prototype/manuales/Manual_Tecnico_KM_RAG.md` Seccion Seguridad

---

## 1. Proposito

Centralizar de forma cifrada todos los secretos del sistema KM con RAG (claves AES-256, JWT, bases de datos, APIs, dominios, Vercel/Railway/Hostinger) para garantizar confidencialidad de datos de victimas/menores y cumplir RNF-02 (AES-256 reposo + campo) y Clausula Octava (3 anios confidencialidad).

No se almacenan claves en texto plano en repo, Drive ni WhatsApp. Toda clave vive en la boveda y se inyecta como variable de entorno cifrada en Vercel/Railway.

---

## 2. Alcance y Principios

| Principio | Detalle |
|-----------|---------|
| Cifrado reposo | Boveda cifrada AES-256-GCM, master password con KDF Argon2id |
| Cifrado transito | TLS 1.3 entre boveda y clientes |
| Minimo privilegio | Solo PM y Tech Lead tienen acceso escritura; Buffet admin solo lectura tras handover |
| No reutilizacion | Cada servicio tiene clave unica, 32+ caracteres |
| Rotacion | 90 dias o tras incidente (ver Seccion 7) |
| Auditoria | Todo acceso queda en log inmutable (quien/cuando/IP) |
| Handover | Al cierre (H5) se transfiere boveda completa al Buffet y se revocan accesos del equipo tras garantia |

Herramienta recomendada: **Bitwarden Organization** (vault compartido) o **1Password Business**. Alternativa offline: **KeePassXC** con archivo `.kdbx` + entrega segura por canal cifrado. Nunca usar Excel/Drive sin cifrar.

---

## 3. Estructura de la Boveda

```
Boveda KM-RAG/
├── 01_Infra/
│   ├── Vercel (frontend)
│   ├── Railway (backend/RAG/DB)
│   ├── Hostinger VPS (alternativa INF-008)
│   └── Servidor Local (INF-009)
├── 02_Bases_Datos/
│   ├── PostgreSQL (Railway Postgres)
│   ├── MongoDB Atlas (si hibrido)
│   └── Vector DB (Chroma/pgvector/Pinecone)
├── 03_Seguridad/
│   ├── JWT / Auth
│   ├── AES-256 (reposo y campo)
│   └── Backups
├── 04_APIs_Externas/
│   ├── OpenAI / LLM
│   ├── Embeddings
│   └── Email (Resend/Nodemailer)
├── 05_Dominios_SSL/
│   ├── NIC Bolivia (.bo)
│   └── Let's Encrypt / EV
└── 06_Usuarios_Admin/
    └── Admin inicial Buffet
```

---

## 4. Inventario de Secretos (plantilla)

> Los valores mostrados son placeholders. En boveda real se generan con `openssl rand -base64 32` o generador Bitwarden.

| ID | Servicio | Variable / Campo | Valor (placeholder) | Longitud | Rotacion | Ubicacion |
|----|----------|------------------|---------------------|----------|----------|-----------|
| SEC-001 | Auth JWT | `JWT_SECRET` | `__GENERAR_64_HEX__` | 64 hex | 90d | Railway + Vercel env |
| SEC-002 | Auth JWT | `JWT_REFRESH_SECRET` | `__GENERAR_64_HEX__` | 64 hex | 90d | Railway env |
| SEC-003 | Cifrado reposo | `AES_KEY` (AES-256-GCM) | `__BASE64_32_BYTES__` | 32 bytes | 90d | Railway env (no repo) |
| SEC-004 | Cifrado campo victima | `AES_FIELD_KEY` | `__BASE64_32_BYTES__` | 32 bytes | 90d | Railway env |
| SEC-005 | PostgreSQL | `DATABASE_URL` | `postgresql://km_user:__PWD__@postgres.railway.internal:5432/km_rag` | 24+ | 90d | Railway Postgres |
| SEC-006 | PostgreSQL | `PG_PASSWORD` | `__PWD_24__` | 24 | 90d | Railway |
| SEC-007 | MongoDB Atlas | `MONGODB_URI` | `mongodb+srv://km_user:__PWD__@cluster.mongodb.net/km_rag` | 24+ | 90d | Railway env |
| SEC-008 | Chroma/pgvector | `VECTOR_DB_URL` | `http://chroma.railway.internal:8000` | — | — | Railway |
| SEC-009 | Storage S3 | `S3_ACCESS_KEY` / `S3_SECRET_KEY` | `__AK__` / `__SK__` | 40 | 90d | Railway Volumes |
| SEC-010 | OpenAI | `OPENAI_API_KEY` | `sk-proj-__GENERAR__` | 51 | 60d | Railway env |
| SEC-011 | Email Resend | `RESEND_API_KEY` | `re_...` | — | 90d | Railway env |
| SEC-012 | Vercel | `VERCEL_TOKEN` | `vercel_...` | — | 90d | GitHub Actions secret |
| SEC-013 | Railway | `RAILWAY_TOKEN` | `railway_...` | — | 90d | GitHub Actions secret |
| SEC-014 | Sentry | `SENTRY_DSN` | `https://...@sentry.io/...` | — | — | Vercel + Railway |
| SEC-015 | Admin inicial | `ADMIN_EMAIL` / `ADMIN_PASSWORD` | `admin@buffet.bo` / `__12_CARAC__` (may/min/num/sim) | 12+ | Inicial | Crear en Sprint 2 |
| SEC-016 | Dominio .bo | Cuenta ADSIB NIC Bolivia | `usuario: __ / pwd: __` | — | — | INF-001 |
| SEC-017 | Hostinger | `HOSTINGER_API_TOKEN` | `__` | — | 90d | INF-008 |
| SEC-018 | Servidor Local | `SSH_ROOT` / `SSH_PWD` | `root / __PWD__` + llave ed25519 | — | 90d | INF-009 |
| SEC-019 | Backups | `BACKUP_ENCRYPTION_KEY` | `__BASE64_32_BYTES__` | 32 bytes | 90d | Script restore.sh |
| SEC-020 | GitHub | `GITHUB_PAT` | `ghp_...` | — | 90d | Equipo |

Notas:
- `ADMIN_PASSWORD` debe cumplir RNF-03: 12 caracteres may/min/num/sim, bloqueo 3 intentos.
- `JWT_SECRET` y `AES_KEY` nunca se commitean; se cargan via `railway variables` y `vercel env`.
- Dominios y Hostinger quedan a nombre del Buffet; el equipo solo configura y hace handover.

---

## 5. Generacion Segura

```bash
# JWT 64 hex
openssl rand -hex 32

# AES 256 key base64
openssl rand -base64 32

# Password 24 con simbolos
openssl rand -base64 18 | tr -d '\n'

# Verificacion longitud
echo -n "clave" | wc -c
```

En Bitwarden: Generador -> Longitud 32 -> May/min/num/sim -> Generar.

---

## 6. Almacenamiento y Acceso

| Entorno | Donde se guarda | Como se inyecta |
|---------|-----------------|-----------------|
| Desarrollo | Boveda Bitwarden + `.env` local (no commit) | `cp .env.example .env` |
| Staging | Railway env (staging) + Vercel preview env | `railway variables set JWT_SECRET=... --env staging` |
| Produccion | Railway env (prod) + Vercel prod env | Solo Tech Lead + PM; Buffet admin tras H5 |
| CI/CD | GitHub Actions Secrets | `RAILWAY_TOKEN`, `VERCEL_TOKEN` |

`.env.example` (sin valores reales) se commitea:

```
JWT_SECRET=
JWT_REFRESH_SECRET=
AES_KEY=
AES_FIELD_KEY=
DATABASE_URL=
MONGODB_URI=
OPENAI_API_KEY=
RESEND_API_KEY=
SENTRY_DSN=
```

`.env` real nunca se commitea (`.gitignore`).

---

## 7. Rotacion y Revocacion

| Evento | Accion | SLA |
|--------|--------|-----|
| Cada 90 dias | Regenerar SEC-001 a SEC-004 y SEC-010 | Tech Lead genera, actualiza Railway/Vercel, prueba ` /health` y login |
| Cambio de personal | Revocar accesos Bitwarden del saliente, rotar SEC-001/002/012/013 | 24h |
| Sospecha filtracion | Rotar inmediata SEC-001..011, invalidar JWTs, forzar logout, auditar logs, notificar Buffet | 4h |
| Fin garantia (semana 24) | Transferir ownership boveda a Buffet, revocar accesos equipo, entregar archivo `.kdbx` cifrado + master password en sobre sellado | H5 |

Procedimiento rotacion JWT/AES:

```
1. Generar nueva clave en boveda
2. Actualizar Railway: railway variables set AES_KEY=NEW --env prod
3. Redeploy backend (Railway auto)
4. Invalidar sesiones activas (tabla refresh_tokens)
5. Probar login + crear caso + busqueda RAG
6. Archivar clave antigua 7 dias por rollback, luego purgar
```

---

## 8. Handover al Buffet (H5)

Entregables:

- [ ] Boveda Bitwarden transferida a correo admin Buffet (owner)
- [ ] Archivo `boveda-km-rag-2026-08-30.kdbx` + master password en sobre
- [ ] Documento `env.prod.example` con lista de variables sin valores
- [ ] Instrucciones de rotacion (esta Seccion 7)
- [ ] Verificacion: Buffet hace login con nueva password, rota SEC-015

El equipo borra copias locales tras confirmacion de acceso del Buffet.

---

## 9. Auditoria y Cumplimiento

- Cada acceso a boveda se loguea (Bitwarden audit log)
- Intento de acceso no autorizado dispara alerta Sentry + email a PM
- Cumple RNF-01 (TLS 1.3), RNF-02 (AES-256), RNF-06 (auditoria inmutable), Clausula Octava (confidencialidad 3 anios)
- Prohibido: compartir claves por WhatsApp/email sin cifrar, guardar en Drive/Sheets, hardcodear en codigo

---

## 10. Contacto y Responsables

| Rol | Responsable | Acceso |
|-----|-------------|--------|
| Owner boveda (dev) | Santiago Acha — Tech Lead RAG | Escritura |
| Co-owner | Mariana del Arroyo — PM | Escritura |
| Lector | Jorge Saenz, Nahomi Humerez | Lectura |
| Owner final (prod) | Admin Buffet (a designar) | Escritura tras H5 |

---

## 11. Anexos

- `TDR_KM_RAG.md` Seccion 12 (SSL/TLS)
- `prototype/manuales/Manual_Tecnico_KM_RAG.md` Seccion 4 (Seguridad)
- `documentos/proformas/INF-SSL-001` (SSL) y `INF-004` (Railway env)
- Bitwarden Help: https://bitwarden.com/help/
