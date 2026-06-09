import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardBorderProps {
  children: ReactNode;
  className?: string;
}

/**
 * Glass card with an animated conic-gradient border + brand glow on hover.
 * Pure presentational wrapper — no business logic.
 */
export function CardBorder({ children, className }: CardBorderProps) {
  return (
    <div
      className={cn(
        "relative group rounded-md border border-purple/40 bg-surface/60 backdrop-blur-xl transition-all duration-500 conic-border",
        "hover:border-purple hover:shadow-[0_0_40px_oklch(0.55_0.22_300/0.5)] hover:-translate-y-1",
        "flex flex-col h-full overflow-hidden",
        className,
      )}
    >
      <div className="pointer-events-none absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,oklch(0.55_0.22_300/0.25),transparent_60%)]" />
      <div className="relative z-10 flex flex-col h-full">{children}</div>
    </div>
  );
}
