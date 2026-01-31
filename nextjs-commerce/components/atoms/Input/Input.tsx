import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Input variants using CVA
 * Reacts to theme variables for consistent styling
 */
const inputVariants = cva(
  // Base styles with accessibility focus
  [
    "flex w-full",
    "bg-background text-foreground",
    "border border-foreground",
    "transition-colors duration-200",
    "placeholder:text-foreground/50",
    // Focus styles - high visibility for accessibility
    "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
    // Disabled state
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-foreground/5",
    // File input styles
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ],
  {
    variants: {
      size: {
        sm: "py-1.5 px-3 text-sm rounded-md",
        md: "py-2.5 px-4 text-base rounded-md",
        lg: "py-3 px-4 text-lg rounded-lg",
      },
      variant: {
        default: "",
        filled: "bg-foreground/5 border-transparent focus:bg-background",
        flushed: "border-0 border-b-2 rounded-none px-0 focus:ring-0",
      },
      state: {
        default: "",
        error: "border-destructive focus:ring-destructive focus:border-destructive",
        success: "border-success focus:ring-success focus:border-success",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      state: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /**
   * Error message to display - also sets error state
   */
  error?: string;
}

/**
 * Accessible Input component
 *
 * @example
 * <Input placeholder="Enter email" type="email" />
 *
 * @example
 * <Input size="lg" variant="filled" error="Invalid email" />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", size, variant, state, error, ...props }, ref) => {
    // If error prop is provided, override state
    const computedState = error ? "error" : state;

    return (
      <input
        type={type}
        className={cn(inputVariants({ size, variant, state: computedState, className }))}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
export default Input;
