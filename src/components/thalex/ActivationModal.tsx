import { useState, useEffect } from "react";
import { Check, ShieldCheck, MessageCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { ThalexService, ThalexPriceTier } from "@/lib/thalex-data";
import { buildActivationLink } from "@/lib/thalex-utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActivationModalProps {
  app: ThalexService | null;
  onClose: () => void;
}

export function ActivationModal({ app, onClose }: ActivationModalProps) {
  const open = app !== null;
  const [selectedTier, setSelectedTier] = useState<ThalexPriceTier | null>(null);

  useEffect(() => {
    if (app?.tiers && app.tiers.length > 0) {
      setSelectedTier(app.tiers[0]);
    } else {
      setSelectedTier(null);
    }
  }, [app]);

  const handleConfirm = () => {
    if (!app) return;
    toast.success("Redirigiendo a WhatsApp", {
      description: `Estamos abriendo el chat de activación para ${app.name}.`,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-w-lg border-brand/30 bg-surface/95 shadow-glow">
        {app && (
          <>
            <DialogHeader className="border-b border-border pb-4">
              <div className="flex items-center gap-4">
                <div className="rounded-lg p-2.5 flex items-center justify-center min-w-[60px] h-14 bg-gradient-to-br from-white via-white/95 to-cyan-soft border border-brand/30 shadow-[inset_0_1px_0_oklch(1_0_0/0.6),0_4px_18px_oklch(0.70_0.27_305/0.35)]">
                  <img
                    src={app.logoUrl}
                    alt={`${app.name} logo`}
                    loading="lazy"
                    className="max-h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <DialogTitle className="font-mono uppercase tracking-tight text-foreground">
                    Protocolo de Activación
                  </DialogTitle>
                  <DialogDescription className="text-brand font-mono uppercase tracking-wide">
                    {app.name} · {selectedTier ? selectedTier.price : app.price}{" "}
                    <span className="text-muted-foreground normal-case">
                      ({selectedTier ? selectedTier.label : app.unit})
                    </span>
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-5 py-2">
              {app.highlight && (
                <div className="flex items-start gap-3 rounded-md border border-brand/40 bg-brand-soft p-3">
                  <Sparkles className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <p className="text-sm font-mono text-foreground leading-snug">
                    {app.highlight}
                  </p>
                </div>
              )}

              {app.tiers && app.tiers.length > 0 && (
                <section>
                  <h4 className="font-mono text-brand text-xs uppercase tracking-widest mb-2">
                    Elige tu plan
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {app.tiers.map((tier) => {
                      const active = selectedTier?.label === tier.label;
                      return (
                        <button
                          key={tier.label}
                          type="button"
                          onClick={() => setSelectedTier(tier)}
                          className={cn(
                            "rounded-md border p-3 text-left font-mono transition-all",
                            active
                              ? "border-brand bg-brand-soft shadow-glow"
                              : "border-border bg-surface-2 hover:border-brand/50",
                          )}
                        >
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                            {tier.label}
                          </div>
                          <div
                            className={cn(
                              "text-lg font-bold",
                              active ? "text-brand text-glow" : "text-foreground",
                            )}
                          >
                            {tier.price}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

              <section>
                <h4 className="font-mono text-brand text-xs uppercase tracking-widest mb-2">
                  ¿Cómo es la entrega?
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Tu activación es inmediata vía WhatsApp tras confirmar el pago.
                </p>
              </section>

              <section>
                <h4 className="font-mono text-brand text-xs uppercase tracking-widest mb-2">
                  ¿Qué incluye?
                </h4>
                <ul className="space-y-2">
                  {app.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-sm text-foreground/90"
                    >
                      <Check className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-surface-2 p-4 border border-border rounded-md">
                <h4 className="font-mono text-brand text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Garantía Thalex
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Soporte 24/7, perfiles 100% privados y estabilidad garantizada durante toda tu
                  suscripción.
                </p>
              </section>
            </div>

            <DialogFooter className="gap-2 sm:gap-3">
              <Button
                variant="ghost-brand"
                onClick={onClose}
                size="lg"
                className="sm:flex-none"
              >
                Cancelar
              </Button>
              <Button
                asChild
                variant="brand"
                size="lg"
                className="flex-1"
                onClick={handleConfirm}
              >
                <a
                  href={buildActivationLink(app, selectedTier ?? undefined)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Confirmar vía WhatsApp
                </a>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
