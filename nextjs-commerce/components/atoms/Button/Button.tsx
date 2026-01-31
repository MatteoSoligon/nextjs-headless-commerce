import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button variants using CVA
 * All colors use CSS variables so they react to theme classes
 */
const buttonVariants = cva(
  // Base styles - accessibility focused
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium whitespace-nowrap",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
    // Use theme variables for focus ring
    "focus-visible:ring-primary",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-foreground",
          "hover:bg-primary/90",
          "active:bg-primary/80",
        ],
        secondary: [
          "bg-secondary text-foreground",
          "hover:bg-secondary/90",
          "active:bg-secondary/80",
        ],
        accent: [
          "bg-accent text-foreground",
          "hover:bg-accent/90",
          "active:bg-accent/80",
        ],
        outline: [
          "border-2 border-primary text-primary",
          "bg-transparent",
          "hover:bg-primary/10",
          "active:bg-primary",
        ],
        ghost: [
          "text-foreground",
          "hover:bg-foreground/10",
          "active:bg-foreground",
        ],
        link: [
          "text-primary underline-offset-4",
          "hover:underline",
          "active:opacity-80",
        ],
        destructive: [
          "bg-destructive text-foreground",
          "hover:bg-destructive/90",
          "active:bg-destructive/80",
        ],
      },
      size: {
        xs: "py-1 px-2 text-xs rounded-sm",
        sm: "py-2 px-3 text-sm rounded-md",
        md: "py-2.5 px-4 text-base rounded-md",
        lg: "py-3 px-6 text-lg rounded-lg",
        xl: "py-3.5 px-8 text-xl rounded-lg",
        icon: "h-10 w-10 rounded-md",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, the button will render as its child element (Slot pattern)
   * Useful for wrapping links or other elements with button styles
   */
  asChild?: boolean;
  /**
   * Loading state - shows spinner and disables interactions
   */
  loading?: boolean;
}

/**
 * Accessible Button component built on Radix Slot
 *
 * @example
 * <Button variant="primary" size="lg">Click me</Button>
 *
 * @example
 * // As a link
 * <Button asChild variant="outline">
 *   <a href="/page">Go to page</a>
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">Loading</span>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
export default Button;
