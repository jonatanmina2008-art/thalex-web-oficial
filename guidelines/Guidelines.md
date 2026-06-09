# Thalex — Guidelines de Diseño y Código

## 1. Identidad visual

- **Estética**: Cyberpunk moderno, dark-first.
- **Color principal**: púrpura neón. Tokens semánticos en `src/styles.css`.
- **Tipografías**: `JetBrains Mono` para titulares/etiquetas; `Inter` para cuerpo.

### Paleta semántica (NO usar hex directos en componentes)

| Token | Uso |
|---|---|
| `bg-background` | Fondo base de la app (violeta near-black). |
| `bg-surface` / `bg-surface-2` | Tarjetas, navbar elevado, secciones alternas. |
| `text-foreground` | Texto principal. |
| `text-muted-foreground` | Texto secundario y descripciones. |
| `bg-brand` / `text-brand` | CTA y acentos púrpura neón. |
| `bg-brand-soft` | Hover sutiles, badges, fondos de pills. |
| `border-brand` | Bordes iluminados al hover. |
| `shadow-glow` / `shadow-glow-strong` | Glow púrpura para CTAs y cards. |
| `bg-whatsapp` / `text-whatsapp` | Acento verde WhatsApp. |

### Utilidades de marca

- `.glass` — superficie translúcida con blur (glassmorphism).
- `.bg-hero-radial` — gradientes radiales púrpura del hero.
- `.text-glow` — sombra de texto púrpura sutil.

## 2. Componentes

- Antes de crear un componente nuevo, revisa `src/components/ui/` (shadcn).
- Componentes de negocio van en `src/components/thalex/`, uno por archivo.
- Los datos del catálogo se editan **únicamente** en `src/lib/thalex-data.ts`.
- Las URLs y helpers (WhatsApp, formato, categorías) en `src/lib/thalex-utils.ts`.

## 3. Código

- TypeScript estricto, sin `any`. Usa `interface` para shapes públicos y `readonly` para arrays inmutables.
- Sin `console.log` en código entregado.
- Sin imports huérfanos ni variables sin uso.
- Modular: si un archivo supera ~400 líneas, divídelo.

## 4. UX

- Toda acción dispara feedback: `toast` de `sonner` para éxito/error/info, `Skeleton` para cargas.
- Botones icon-only requieren `aria-label`.
- Mobile-first (objetivo 390px) y respeto a `prefers-reduced-motion` cuando se añadan animaciones intensivas.

## 5. PRs y commits

- Conventional Commits.
- 1 PR = 1 propósito.
- Sin secretos (incluyendo `.env`) en el diff.
