import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge variants using CVA
 * Uses theme variables for consistent theming
 */
const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-medium",
    "transition-colors duration-200",
    "whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        default: "bg-[var(--foreground)]/10 text-[var(--foreground)]",
        primary: "bg-[var(--primary)] text-white",
        secondary: "bg-[var(--secondary)] text-white",
        accent: "bg-[var(--accent)] text-[var(--foreground)]",
        outline: "border border-[var(--foreground)]/30 text-[var(--foreground)] bg-transparent",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
      },
      size: {
        sm: "h-5 px-2 text-[var(--text-xs)] rounded-[var(--radius-sm)]",
        md: "h-6 px-2.5 text-[var(--text-sm)] rounded-[var(--radius-md)]",
        lg: "h-7 px-3 text-[var(--text-base)] rounded-[var(--radius-md)]",
      },
      pill: {
        true: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge component for status indicators, labels, and counts
 *
 * @example
 * <Badge>Default</Badge>
 * <Badge variant="primary">New</Badge>
 * <Badge variant="success" pill>Active</Badge>
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, pill, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, pill, className }))}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
export default Badge;
