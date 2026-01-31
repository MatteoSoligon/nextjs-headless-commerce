"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * RadioGroup variants
 */
const radioGroupVariants = cva("grid gap-2", {
  variants: {
    orientation: {
      vertical: "grid-flow-row",
      horizontal: "grid-flow-col",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

/**
 * RadioItem variants
 */
const radioItemVariants = cva(
  [
    "aspect-square rounded-full",
    "border border-foreground/30",
    "bg-background",
    "transition-colors duration-200",
    // Focus styles for accessibility
    "focus:outline-none focus-visible:ring-2",
    "focus-visible:ring-primary focus-visible:ring-offset-2",
    // Disabled state
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Invalid state
    "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive",
    "data-[invalid=true]:border-destructive data-[invalid=true]:ring-destructive",
    // Checked state
    "data-[state=checked]:border-primary",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Radio indicator sizes
 */
const indicatorSizes = {
  sm: "h-2 w-2", 
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
};

export interface RadioGroupProps extends RadioGroupPrimitive.RadioGroupProps {
  orientation?: "vertical" | "horizontal";
}

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioItemVariants> {}

/**
 * Accessible RadioGroup component built on Radix RadioGroup
 *
 * @example
 * <RadioGroup defaultValue="option-1">
 *   <div className="flex items-center gap-2">
 *     <RadioGroupItem value="option-1" id="option-1" />
 *     <Label htmlFor="option-1">Option 1</Label>
 *   </div>
 *   <div className="flex items-center gap-2">
 *     <RadioGroupItem value="option-2" id="option-2" />
 *     <Label htmlFor="option-2">Option 2</Label>
 *   </div>
 * </RadioGroup>
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, orientation, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(radioGroupVariants({ orientation, className }))}
      ref={ref}
      {...props}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * RadioGroupItem - individual radio button
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size = "md", ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioItemVariants({ size, className }))}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span
          className={cn(
            "rounded-full bg-primary",
            indicatorSizes[size || "md"]
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
export default RadioGroup;
