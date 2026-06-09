
## Objetivo
Reorganizar el catálogo Thalex en dos secciones jerarquizadas, alinear precios/modalidades a la lista nueva, dar protagonismo a Netflix · Flex TV · Gemini 3.1 Pro, virar los acentos del tema a púrpura neón cyberpunk y limpiar el footer.

## 1. Datos del catálogo (`src/lib/thalex-data.ts`)
Reescribir el dataset:

- Añadir campos al tipo `ThalexService`:
  - `tier: "vip" | "standard"` (define en qué sección se renderiza).
  - `unit: string` — texto que sustituye al `/mes` actual (`"1 Pantalla"`, `"A tu correo"`, `"1 Mes"`, `"2 Meses"`, `"18 Meses"`, `"Por mes"`).
  - `tiers?: { label: string; price: string; priceValue: number }[]` — sólo para Flex TV.
  - `highlight?: string` — destacado visual (Gemini: "5 TB Gmail + Drive").

- Sección VIP (`tier: "vip"`):
  1. **Netflix Premium** — $4.50 · 1 Pantalla · 4K HDR · Cuenta Privada · Entrega Inmediata.
  2. **Flex TV** — tarifas: $3.50 (1 Mes) · $9.00 (3 Meses) · $15.00 (6 Meses) · $25.00 (1 Año). Características: TV en vivo, Películas, Series, Deportes. `price` por defecto = `$3.50`, `unit` = "Desde / 1 Mes".
  3. **Gemini 3.1 Pro** — $30.00 · 18 Meses · `highlight`: "5 TB de almacenamiento expandido (Gmail + Google Drive)". Features: resolución avanzada de problemas, generación de imágenes y video con IA (Google Veo), integración Workspace.

- Sección estándar (`tier: "standard"`), todos con `unit` indicado:
  | Servicio | Precio | Unit |
  |---|---|---|
  | Disney+ Premium (sin ESPN) | $4.00 | 1 Pantalla |
  | YouTube Premium | $4.50 | A tu correo |
  | Prime Video | $3.00 | 1 Pantalla |
  | Paramount+ | $3.50 | 1 Pantalla |
  | HBO Max | $3.50 | 1 Pantalla |
  | Deezer | $3.50 | 1 Pantalla |
  | IPTV Smarters Pro | $3.00 | 1 Pantalla |
  | Office | $6.00 | 1 Mes |
  | Vix Premium | $3.00 | 1 Pantalla |
  | Canva | $2.50 | 1 Mes |
  | Spotify | $6.00 | 2 Meses |
  | Crunchyroll Premium | $3.50 | 1 Pantalla |
  | Google One | $5.00 | A tu correo |

- Quitar del dataset los servicios que ya no aplican (Apple TV+, ChatGPT Plus, Claude Pro, Perplexity, Midjourney, Duolingo). Mantener categoría `Streaming`/`IA` para los filtros.
- Añadir `logoUrl` para Flex TV (placeholder con icono Lucide Tv si no hay logo oficial), HBO Max (reusar Max logo), Office (logo Microsoft 365), Google One (logo Google One Wikimedia), Gemini 3.1 Pro (reusar logo Gemini).

## 2. Home (`src/routes/index.tsx`)
- Dividir la sección `#vault` en dos bloques:
  - **VIP** (3 tarjetas grandes en `lg:grid-cols-3`, padding mayor, borde `border-brand/60`, doble glow, badge "VIP / TOP" superior, escala +5%). Cada tarjeta usa `<CardBorder>` con clases extra para acentuar.
    - Netflix: layout estándar con `unit` mostrado tras el precio.
    - Flex TV: bloque de 4 chips de precios (tiers) y CTA "Adquirir" que abre modal con selector de duración.
    - Gemini 3.1 Pro: bloque destacado "5 TB Gmail + Drive" con icono `Sparkles`/`Database`, debajo lista de features.
  - **Catálogo General**: encabezado secundario "Catálogo General" y grid existente (`sm:grid-cols-2 lg:grid-cols-3`) usando sólo `tier === "standard"`. Reutiliza el filtro por categoría sólo en este bloque.
- Reemplazar el sufijo fijo `"/mes"` por `item.unit` (renderizar `unit` en mayúsculas mono).
- Añadir banner de confianza centrado entre VIP y catálogo general:
  - Texto: **"TODOS LOS PERFILES TIENEN GARANTÍA"** + chip con icono WhatsApp y `+593 993 703 912` enlazado a `buildGeneralContactLink()`.
  - Estilo: `glass`, borde brand, glow tenue.
- Footer: eliminar la línea "Jonathan Alexander Mina · Founder & CEO · Thalex Digital Services". Dejar logo + tagline + datos de contacto (`www.thalexec.com · ventas@thalexec.com · Quito, Ecuador`) + WhatsApp.

## 3. Modal de activación (`src/components/thalex/ActivationModal.tsx`)
- Mostrar `unit` junto al precio.
- Si el servicio tiene `tiers`, renderizar un selector de duración (radio group de chips); el mensaje de WhatsApp incluye la duración elegida y el precio del tier.
- Si tiene `highlight`, mostrarlo como bloque destacado en el modal.

## 4. Utilidades (`src/lib/thalex-utils.ts`)
- Extender `buildActivationLink(service, tierLabel?)` para que cuando exista `tierLabel`/`tierPrice` los inserte en el mensaje (ej.: `"...Flex TV plan 3 Meses por $9.00..."`).

## 5. Tema púrpura neón (`src/styles.css`)
- Reasignar tokens `--brand`, `--brand-glow`, `--brand-deep`, `--brand-soft`, `--shadow-glow`, `--shadow-glow-strong` y gradiente `text-holo` a una paleta púrpura neón en oklch (ej.: `oklch(0.70 0.27 305)` base, `oklch(0.82 0.22 305)` glow, `oklch(0.40 0.18 300)` deep, `oklch(0.30 0.10 300 / 0.25)` soft).
- Mantener `--cyan` como acento secundario para conservar contraste en los logos y el badge "Activación inmediata".
- Ajustar el comentario de cabecera (ya dice "Cyberpunk Purple", coherente).

## 6. Stats hero
- Cambiar `+100 CLIENTES` se conserva. Mantener el resto de cifras.

## Notas técnicas
- `STREAMING_NETWORK` se exporta tal cual y se sigue usando para el marquee (incluye VIP + standard).
- Se añade selector derivado `VIP_NETWORK` y `STANDARD_NETWORK` en `thalex-data.ts` para evitar `.filter` repetido en el render.
- No se tocan rutas ni server functions; cambio puramente frontend.

## Archivos a modificar
- `src/lib/thalex-data.ts`
- `src/lib/thalex-utils.ts`
- `src/components/thalex/ActivationModal.tsx`
- `src/routes/index.tsx`
- `src/styles.css`
