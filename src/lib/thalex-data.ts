// Logo servido estáticamente desde /public/flextv.webp (optimizado, compatible con Vercel)
const flextvLogo = { url: "/flextv.webp" };

export type ThalexCategory = "Streaming" | "IA";
export type ThalexTier = "vip" | "standard";

export interface ThalexPriceTier {
  label: string;
  price: string;
  priceValue: number;
}

export interface ThalexService {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  /** Unidad/modalidad mostrada junto al precio (ej. "1 Pantalla", "A tu correo", "1 Mes"). */
  unit: string;
  features: readonly string[];
  logoUrl: string;
  category: ThalexCategory;
  tier: ThalexTier;
  popular?: boolean;
  description: string;
  /** Tarifas múltiples (ej. Flex TV, Canva). */
  tiers?: readonly ThalexPriceTier[];
  /** Texto destacado en la tarjeta. */
  highlight?: string;
}

export const STREAMING_NETWORK: readonly ThalexService[] = [
  // ─── VIP ───────────────────────────────────────────────
  {
    id: "netflix",
    name: "Netflix",
    price: "$4.50",
    priceValue: 4.5,
    unit: "1 Pantalla",
    features: ["1 Pantalla privada", "4K HDR", "Cuenta 100% privada", "Entrega Inmediata"],
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    category: "Streaming",
    tier: "vip",
    popular: true,
    description: "Catálogo global Netflix con calidad 4K HDR y perfil privado garantizado.",
  },
  {
    id: "flextv",
    name: "Flex TV",
    price: "$3.50",
    priceValue: 3.5,
    unit: "Desde / 1 Mes",
    features: ["TV en Vivo", "Películas", "Series", "Deportes"],
    logoUrl: flextvLogo.url,
    category: "Streaming",
    tier: "vip",
    description: "Todo en uno: TV en vivo, películas, series y deportes en una sola app.",
    tiers: [
      { label: "1 Mes", price: "$3.50", priceValue: 3.5 },
      { label: "3 Meses", price: "$9.00", priceValue: 9.0 },
      { label: "6 Meses", price: "$15.00", priceValue: 15.0 },
      { label: "1 Año", price: "$25.00", priceValue: 25.0 },
    ],
    highlight: "4 planes de duración a elegir",
  },
  {
    id: "canva",
    name: "Canva Pro",
    price: "$2.50",
    priceValue: 2.5,
    unit: "A tu correo",
    features: ["Plantillas Pro", "Magic Studio IA", "Sin Marca de Agua", "100 GB de almacenamiento"],
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Canva_logo.svg",
    category: "IA",
    tier: "vip",
    popular: true,
    description: "Canva Pro activado en tu cuenta/correo, con Magic Studio IA y plantillas premium.",
    tiers: [
      { label: "1 Mes", price: "$2.50", priceValue: 2.5 },
      { label: "6 Meses", price: "$5.00", priceValue: 5.0 },
      { label: "1 Año", price: "$7.00", priceValue: 7.0 },
    ],
    highlight: "Activación directa en tu cuenta/correo",
  },

  // ─── ESTÁNDAR ──────────────────────────────────────────
  {
    id: "gemini",
    name: "Gemini 3.1 Pro",
    price: "$30.00",
    priceValue: 30.0,
    unit: "1 Año",
    features: [
      "Resolución avanzada de problemas",
      "Generación de imágenes con IA",
      "Generación de video (Google Veo)",
      "Integración total Google Workspace",
    ],
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    category: "IA",
    tier: "vip",
    popular: true,
    description: "Gemini 3.1 Pro con suite Google Workspace y herramientas de IA generativa por 1 año completo.",
    highlight: "5 TB de almacenamiento — Gmail + Google Drive",
  },
  {
    id: "disney",
    name: "Disney+ Premium",
    price: "$4.00",
    priceValue: 4.0,
    unit: "1 Pantalla",
    features: ["1 Pantalla privada", "Sin Anuncios", "Catálogo Disney+ completo", "Sin ESPN"],
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
    category: "Streaming",
    tier: "standard",
    description: "Disney+ Premium sin ESPN, perfil privado y sin anuncios.",
  },
  {
    id: "youtube-premium",
    name: "YouTube Premium",
    price: "$4.50",
    priceValue: 4.5,
    unit: "A tu correo",
    features: ["Sin Anuncios", "Reproducción 2do plano", "YT Music", "Descargas offline"],
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
    category: "Streaming",
    tier: "standard",
    description: "YouTube y YouTube Music sin anuncios, activado en tu correo personal.",
  },
  {
    id: "prime",
    name: "Prime Video",
    price: "$3.00",
    priceValue: 3.0,
    unit: "1 Pantalla",
    features: ["1 Pantalla", "4K UHD", "Sin Anuncios", "Catálogo Global"],
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg",
    category: "Streaming",
    tier: "standard",
    description: "Amazon Prime Video con catálogo internacional y originales exclusivos.",
  },
  {
    id: "paramount",
    name: "Paramount+",
    price: "$3.50",
    priceValue: 3.5,
    unit: "1 Pantalla",
    features: ["1 Pantalla", "UEFA Champions", "Originales", "4K"],
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Paramount_Plus.svg",
    category: "Streaming",
    tier: "standard",
    description: "Paramount+ con Champions League, NFL y biblioteca CBS.",
  },
  {
    id: "max",
    name: "HBO Max",
    price: "$3.50",
    priceValue: 3.5,
    unit: "1 Pantalla",
    features: ["1 Pantalla", "4K UHD", "Deportes en Vivo", "Biblioteca HBO"],
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Max_logo.svg",
    category: "Streaming",
    tier: "standard",
    description: "HBO Max con deportes en vivo y biblioteca premium en 4K.",
  },
  {
    id: "deezer",
    name: "Deezer",
    price: "$3.50",
    priceValue: 3.5,
    unit: "1 Pantalla",
    features: ["Música sin límite", "Sin Anuncios", "Descargas Offline", "1 Pantalla"],
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/75/Deezer_logo%2C_2023.svg",
    category: "Streaming",
    tier: "standard",
    description: "Deezer con música ilimitada y descargas sin anuncios.",
  },
  {
    id: "office",
    name: "Office",
    price: "$6.00",
    priceValue: 6.0,
    unit: "1 Mes",
    features: ["Word, Excel, PowerPoint", "OneDrive", "Activación 1 Mes", "Licencia personal"],
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/Microsoft_365_%282022%29.svg",
    category: "IA",
    tier: "standard",
    description: "Suite Microsoft Office activada por un mes en tu cuenta.",
  },
  {
    id: "vix",
    name: "Vix Premium",
    price: "$3.00",
    priceValue: 3.0,
    unit: "1 Pantalla",
    features: ["1 Pantalla", "Liga Pro Ecuador", "Deportes Exclusivos", "Full HD"],
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/ViX_Logo.svg",
    category: "Streaming",
    tier: "standard",
    description: "Vix Premium con LigaPro Ecuador y deportes exclusivos en HD.",
  },
  {
    id: "spotify",
    name: "Spotify",
    price: "$6.00",
    priceValue: 6.0,
    unit: "2 Meses",
    features: ["Música sin límites", "Sin Anuncios", "Descargas Offline", "2 Meses incluidos"],
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
    category: "Streaming",
    tier: "standard",
    description: "Spotify Premium con 2 meses de duración garantizada.",
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll Premium",
    price: "$3.50",
    priceValue: 3.5,
    unit: "1 Pantalla",
    features: ["1 Pantalla", "Anime Simulcast", "Sin Anuncios", "Full HD"],
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/Crunchyroll_Logo.svg",
    category: "Streaming",
    tier: "standard",
    description: "Todo el anime en simulcast, sin anuncios y en calidad HD.",
  },
  {
    id: "capcut",
    name: "CapCut Pro",
    price: "$5.00",
    priceValue: 5.0,
    unit: "1 Dispositivo / 1 Mes",
    features: ["Efectos y filtros Pro", "Exportación sin marca de agua", "1 Dispositivo", "Activación 1 Mes"],
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d8/CapCut_logo.svg",
    category: "IA",
    tier: "standard",
    description: "CapCut Pro con todos los efectos premium, sin marca de agua.",
  },
  {
    id: "miro",
    name: "Miro",
    price: "$3.50",
    priceValue: 3.5,
    unit: "Desde / 1 Mes",
    features: ["Pizarras ilimitadas", "Colaboración en tiempo real", "Plantillas Pro", "Integraciones premium"],
    logoUrl: "https://cdn.worldvectorlogo.com/logos/miro-2.svg",
    category: "IA",
    tier: "standard",
    description: "Miro Pro para colaboración visual, pizarras ilimitadas y plantillas premium.",
    tiers: [
      { label: "1 Mes", price: "$3.50", priceValue: 3.5 },
      { label: "3 Meses", price: "$9.00", priceValue: 9.0 },
      { label: "6 Meses", price: "$15.00", priceValue: 15.0 },
      { label: "1 Año", price: "$25.00", priceValue: 25.0 },
    ],
    highlight: "4 planes de duración a elegir",
  },
];

export const VIP_NETWORK = STREAMING_NETWORK.filter((s) => s.tier === "vip");
export const STANDARD_NETWORK = STREAMING_NETWORK.filter((s) => s.tier === "standard");
