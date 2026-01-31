"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Checkbox variants
 */
const checkboxVariants = cva(
  [
    "peer shrink-0",
    "border border-[var(--foreground)]/30",
    "bg-[var(--background)]",
    "transition-colors duration-200",
    // Focus styles for accessibility
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
    // Disabled state
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Invalid state
    "aria-[invalid=true]:border-[var(--destructive)] aria-[invalid=true]:ring-[var(--destructive)]/20",
    "data-[invalid=true]:border-[var(--destructive)] data-[invalid=true]:ring-[var(--destructive)]/20",
    // Checked state
    "data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)]",
    "data-[state=checked]:text-white",
    // Indeterminate state
    "data-[state=indeterminate]:bg-[var(--primary)] data-[state=indeterminate]:border-[var(--primary)]",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4 rounded-[var(--radius-sm)]",
        md: "h-5 w-5 rounded-[var(--radius-sm)]",
        lg: "h-6 w-6 rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Checkmark icon sizes
 */
const iconSizes = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

/**
 * Accessible Checkbox component built on Radix Checkbox
 *
 * @example
 * <div className="flex items-center gap-2">
 *   <Checkbox id="terms" />
 *   <Label htmlFor="terms">Accept terms and conditions</Label>
 * </div>
 *
 * @example
 * // Controlled
 * <Checkbox checked={checked} onCheckedChange={setChecked} />
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size = "md", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ size, className }))}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      {/* Checkmark icon */}
      <svg
        className={iconSizes[size || "md"]}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
export default Checkbox;
