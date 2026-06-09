import type { ThalexCategory, ThalexService, ThalexPriceTier } from "./thalex-data";

/**
 * WhatsApp business number. Configurable via VITE_WHATSAPP_NUMBER without
 * leaking secrets — number is public-facing, env just keeps it parameterizable.
 */
const FALLBACK_WHATSAPP = "593993703912";

export function getWhatsAppNumber(): string {
  const fromEnv = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
  return fromEnv && fromEnv.length > 0 ? fromEnv : FALLBACK_WHATSAPP;
}

export function getWhatsAppDisplay(): string {
  return "+593 993 703 912";
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export function categoryLabel(category: ThalexCategory | "All"): string {
  if (category === "All") return "Todos";
  if (category === "IA") return "IA";
  return "Streaming";
}

export function buildWhatsAppLink(message: string): string {
  const number = getWhatsAppNumber();
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}

export function buildActivationLink(service: ThalexService, tier?: ThalexPriceTier): string {
  if (tier) {
    return buildWhatsAppLink(
      `Hola Thalex, deseo contratar ${service.name} — plan ${tier.label} por ${tier.price}. Espero instrucciones.`,
    );
  }
  return buildWhatsAppLink(
    `Hola Thalex, deseo contratar el servicio de ${service.name} por ${service.price} (${service.unit}). Espero instrucciones.`,
  );
}

export function buildGeneralContactLink(): string {
  return buildWhatsAppLink(
    "Hola Thalex, deseo contratar un servicio. Espero instrucciones.",
  );
}
