"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";

/**
 * Accordion root variants
 */
const accordionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "",
      bordered: "border rounded-lg overflow-hidden",
      separated: "space-y-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Accordion item variants
 */
const accordionItemVariants = cva("border-b last:border-b-0", {
  variants: {
    variant: {
      default: "border-[var(--foreground)]/10",
      bordered: "border-[var(--foreground)]/10",
      separated:
        "border rounded-lg border-[var(--foreground)]/10 overflow-hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Accordion trigger variants
 */
const accordionTriggerVariants = cva(
  [
    "flex flex-1 items-center justify-between py-4 px-4",
    "text-sm font-medium transition-all",
    "hover:underline cursor-pointer",
    "[&[data-state=open]>svg]:rotate-180",
    // Focus styles for accessibility
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
    // Disabled state
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "py-2 px-3 text-xs",
        md: "py-4 px-4 text-sm",
        lg: "py-5 px-5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Accordion content variants
 */
const accordionContentVariants = cva(
  [
    "overflow-hidden text-sm",
    "data-[state=closed]:animate-accordion-up",
    "data-[state=open]:animate-accordion-down",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ========================================
// Accordion Root
// ========================================

export interface AccordionProps extends AccordionPrimitive.AccordionMultipleProps {
    variant?: "default" | "bordered" | "separated";
  }

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, variant, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={cn(accordionVariants({ variant }), className)}
    {...props}
  >
    {props.children}
  </AccordionPrimitive.Root>
));
Accordion.displayName = "Accordion";

// ========================================
// Accordion Item
// ========================================

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
    VariantProps<typeof accordionItemVariants> {}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(accordionItemVariants({ variant }), className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

// ========================================
// Accordion Trigger
// ========================================

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof accordionTriggerVariants> {}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, size, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(accordionTriggerVariants({ size }), className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 shrink-0 text-[var(--foreground)]/50 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

// ========================================
// Accordion Content
// ========================================

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
    VariantProps<typeof accordionContentVariants> {}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, size, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants({ size }), className)}
    {...props}
  >
    <div className="pb-4 pt-0 px-4">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export default Accordion;
