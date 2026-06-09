import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

type ThalexVariant = "primary" | "whatsapp" | "ghost";

interface BaseButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: ThalexVariant;
  size?: ButtonProps["size"];
}

const variantMap: Record<ThalexVariant, ButtonProps["variant"]> = {
  primary: "brand",
  whatsapp: "whatsapp",
  ghost: "ghost-brand",
};

/**
 * Thin Thalex wrapper around the shadcn Button. Keeps the legacy API
 * (`variant="primary" | "whatsapp" | "ghost"`) used across the site but
 * delegates styling to the semantic design tokens.
 */
export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ children, className, variant = "primary", size = "xl", ...props }, ref) => (
    <Button
      ref={ref}
      variant={variantMap[variant]}
      size={size}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {children}
    </Button>
  ),
);
BaseButton.displayName = "BaseButton";
