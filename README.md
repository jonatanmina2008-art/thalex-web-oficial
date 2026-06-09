# Thalex — Streaming & IA Premium

Plataforma web de Thalex para venta y gestión de suscripciones digitales premium (Netflix, Disney+, Max, ChatGPT Plus, Gemini, IPTV, etc.) con entrega inmediata por WhatsApp.

## Stack

- **Framework**: TanStack Start v1 + React 19 (SSR sobre Cloudflare Workers).
- **Build**: Vite 7.
- **Lenguaje**: TypeScript estricto.
- **Estilos**: Tailwind CSS v4 + tokens semánticos `oklch` definidos en `src/styles.css`.
- **UI**: shadcn/ui (`src/components/ui/`) + componentes específicos de marca (`src/components/thalex/`).
- **Animaciones**: Motion for React.
- **Notificaciones**: Sonner.

## Setup local

```bash
bun install
cp .env.example .env  # edita los valores
bun run dev
```

## Variables de entorno

Todas las variables expuestas al cliente deben prefijarse con `VITE_`. **Nunca** se commitea `.env` — solo `.env.example`.

| Variable | Descripción |
|---|---|
| `VITE_WHATSAPP_NUMBER` | Número de WhatsApp para activaciones (sin `+`). |
| `VITE_SITE_URL` | URL canónica del sitio para SEO. |

## Estructura

```
src/
├── components/
│   ├── thalex/   # Componentes de negocio (BaseButton, CardBorder, ActivationModal)
│   └── ui/       # shadcn primitives (Button, Dialog, Sonner, …)
├── lib/
│   ├── thalex-data.ts    # Catálogo tipado (precios, features, logos)
│   ├── thalex-utils.ts   # Helpers (WhatsApp links, formateo, categorías)
│   └── utils.ts          # cn() y utilidades genéricas
├── routes/       # File-based routing TanStack
└── styles.css    # Design system (tokens oklch + utilidades)
```

## Convenciones

- **Diseño**: cyberpunk púrpura. Solo tokens semánticos en componentes (`bg-brand`, `text-foreground`, `border-border`). Nada de hex inline.
- **Tipos**: prohibido `any`. Interfaces y `readonly` cuando aplique.
- **Commits**: Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`). Mantén commits pequeños y atómicos.
- **Mobile-first**: diseñar a 390px y escalar con breakpoints `sm:`/`md:`/`lg:`.
- **Lint**: no dejes `console.log`, imports huérfanos ni variables sin usar.

## Scripts

```bash
bun run dev      # servidor de desarrollo
bun run build    # build de producción
```

## Seguridad

- **Nunca** comitees claves, tokens ni URLs sensibles. Usa `.env` (gitignored).
- El número de WhatsApp es público pero se mantiene parametrizable vía `.env`.
- No introducir dependencias Node-only (incompatibles con Cloudflare Workers).

## Licencia

© Thalex Digital Services. Todos los derechos reservados.
