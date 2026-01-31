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
        default: "bg-foreground/10 text-foreground",
        primary: "bg-primary text-foreground",
        secondary: "bg-secondary text-foreground",
        accent: "bg-accent text-foreground",
        outline: "border border-foreground/30 text-foreground bg-transparent",
        success: "bg-success text-foreground",
        warning: "bg-warning text-foreground",
        error: "bg-destructive text-foreground",
      },
      size: {
        sm: "py-1 px-2 text-xs rounded-sm",
        md: "py-1.5 px-2.5 text-sm rounded-md",
        lg: "py-2 px-3 text-base rounded-md",
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
