"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Switch root variants
 */
const switchVariants = cva(
  [
    "peer inline-flex shrink-0 cursor-pointer items-center",
    "rounded-full border-2 border-transparent",
    "transition-colors duration-200",
    // Focus styles for accessibility
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-primary focus-visible:ring-offset-2",
    // Disabled state
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Invalid state
    "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive",
    "data-[invalid=true]:border-destructive data-[invalid=true]:ring-destructive",
    // States
    "data-[state=unchecked]:bg-foreground",
    "data-[state=checked]:bg-primary",
  ],
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Switch thumb variants
 */
const switchThumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-white shadow-lg",
    "ring-0 transition-transform duration-200",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        md: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

/**
 * Accessible Switch component built on Radix Switch
 *
 * @example
 * <Switch aria-label="Enable notifications" />
 *
 * @example
 * <div className="flex items-center gap-2">
 *   <Switch id="airplane" />
 *   <Label htmlFor="airplane">Airplane Mode</Label>
 * </div>
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(switchVariants({ size, className }))}
    ref={ref}
    {...props}
  >
    <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }))} />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
export default Switch;
