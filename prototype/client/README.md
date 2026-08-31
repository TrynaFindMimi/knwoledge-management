# Client — Frontend KM RAG — React + AntD + Tailwind — Arquitectura en Capas

**Stack:** React 18.2 + Vite 5.0.8 + Ant Design 5.12.8 + Tailwind 3.4 (black/gold/white premium #0a0a0a/#ffffff/#c9a86a) — ver `prototype/manuales/Manual_Tecnico_KM_RAG.md` Seccion 2.1

## Capas (Clean / Hexagonal)

```
src/
├── presentation/          # CAPA PRESENTACION — React UI, sin logica de negocio
│   ├── layouts/           # AppLayout (Sider #0f0f0f + Header blanco + Drawer Chat)
│   ├── pages/             # 11 paginas (Login, Dashboard, CasosList, CasoDetail, Busqueda, Chat, Audiencias, Compartidos, Notificaciones, AdminUsuarios, AdminAuditoria)
│   └── components/        # Componentes de presentacion puros (CasoCard, DocumentoList, BusquedaResultCard, ChatBubble, Checklist, etc.)
├── application/           # CAPA APLICACION — orquesta casos de uso
│   ├── hooks/             # useCasos, useBusqueda, useChat, useAudiencias
│   ├── stores/            # Zustand: auth (JWT, rol), casos filtros, uploads
│   └── services/          # casoService, documentoService, ragService, alertaService (logica aplicativa)
├── domain/                # CAPA DOMINIO — entidades puras, sin dependencias UI/API
│   ├── entities/          # Caso, Documento, Version, Audiencia, Alerta, Permiso (tipos puros)
│   └── types/             # CasoTipo, CasoEstado, etc.
├── infrastructure/        # CAPA INFRAESTRUCTURA — detalles externos
│   ├── api/               # Axios client + casos.ts, rag.ts, audiencias.ts, compartidos.ts, auth.ts
│   └── config/            # env.ts (VITE_API_URL), antd theme tokens
└── shared/                # CAPA COMPARTIDA — transversal
    ├── ui/                # StatusChip, GoldButton, etc. (design system)
    ├── styles/            # globals.css (Tailwind + AntD overrides: 12px card, 8px control, gold #c9a86a)
    └── utils/             # formatDate, cn, validators (12 carac.)
```

**Flujo de dependencias:** `presentation -> application -> domain <- infrastructure` (inversion de dependencias: application define puertos, infrastructure implementa).

**Reglas:**
- `presentation` nunca importa `infrastructure/api` directo; usa `application/services` o `hooks`.
- `domain` no importa React/AntD/Axios.
- `shared` es transversal sin logica de negocio.

**Paleta premium:** bg #0a0a0a, panel #ffffff, panel-2 #fdfbf7, ink #1a1a1a, gold #c9a86a (ver `mockups/` y Tailwind `gold`).

**Scripts:** `npm run dev` (5173), `npm run build`, `npm run test` (Vitest), `npm run test:e2e` (Playwright).
