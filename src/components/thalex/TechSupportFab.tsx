import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wrench, MessageCircle, Mail, X, ShieldCheck } from "lucide-react";
import { buildWhatsAppLink, getWhatsAppDisplay } from "@/lib/thalex-utils";

const SUPPORT_EMAIL = "serviciotecnico@thalexec.com";

/**
 * Floating Servicio Técnico launcher. Expands into a small panel that lets the
 * client choose WhatsApp or email contact.
 */
export function TechSupportFab() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const waLink = buildWhatsAppLink(
    "Hola Thalex, necesito asistencia de Servicio Técnico con mi cuenta.",
  );
  const mailLink = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    "Solicitud de Servicio Técnico",
  )}&body=${encodeURIComponent(
    "Hola equipo Thalex,\n\nNecesito asistencia con mi servicio. Detalles:\n- Servicio:\n- Problema:\n\nGracias.",
  )}`;

  return (
    <div className="fixed bottom-24 right-6 sm:bottom-28 sm:right-8 z-[100]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute bottom-16 right-0 w-[300px] rounded-xl border border-purple/40 bg-surface/95 backdrop-blur-xl shadow-[0_20px_60px_oklch(0.55_0.22_300/0.45)] overflow-hidden"
          >
            {/* Header */}
            <div className="relative px-5 py-4 border-b border-purple/30 bg-gradient-to-br from-purple/25 via-transparent to-brand/15">
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple/30 blur-2xl pointer-events-none"
                aria-hidden
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="absolute top-3 right-3 w-6 h-6 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-2 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex w-7 h-7 items-center justify-center rounded-md bg-purple/20 border border-purple/50">
                  <Wrench className="w-3.5 h-3.5 text-purple-soft" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-purple-soft">
                  Servicio Técnico
                </span>
              </div>
              <h4 className="font-mono text-sm text-foreground uppercase tracking-tight">
                ¿En qué te ayudamos?
              </h4>
              <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                Elige cómo prefieres que te contactemos.
              </p>
            </div>

            {/* Options */}
            <div className="p-3 flex flex-col gap-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-border bg-surface-2 hover:border-whatsapp hover:bg-whatsapp/10 px-3 py-3 transition-all"
              >
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-md bg-whatsapp/15 border border-whatsapp/40 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-4 h-4 text-whatsapp" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-foreground">
                    WhatsApp
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {getWhatsAppDisplay()}
                  </div>
                </div>
              </a>

              <a
                href={mailLink}
                className="group flex items-center gap-3 rounded-lg border border-border bg-surface-2 hover:border-purple hover:bg-purple/10 px-3 py-3 transition-all"
              >
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-md bg-purple/20 border border-purple/40 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4 text-purple-soft" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-foreground">
                    Correo
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {SUPPORT_EMAIL}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-2 px-2 pt-1 text-[10px] text-muted-foreground/80 font-mono uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3 text-purple-soft" />
                Respuesta &lt; 15 min · 24/7
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Servicio Técnico"
        aria-expanded={open}
        className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple to-[oklch(0.4_0.22_295)] text-white border border-purple-soft/70 shadow-[0_0_30px_oklch(0.55_0.22_300/0.55)] hover:scale-105 active:scale-95 transition-transform"
      >
        <span
          className="absolute inset-0 rounded-full bg-purple/50 animate-ping"
          aria-hidden
        />
        {open ? <X className="w-6 h-6 relative" /> : <Wrench className="w-6 h-6 relative" />}
      </button>
    </div>
  );
}
