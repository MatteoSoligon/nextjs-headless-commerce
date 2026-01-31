"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Tabs list variants
 */
const tabsListVariants = cva(
  [
    "inline-flex items-center justify-center",
    "text-foreground/60",
  ],
  {
    variants: {
      variant: {
        default: [
          "h-10 rounded-md",
          "bg-foreground/5",
          "p-1",
        ],
        underline: [
          "border-b border-foreground/10",
          "gap-2",
        ],
        pills: [
          "gap-2",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Tab trigger variants
 */
const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "text-sm font-medium",
    "ring-offset-background",
    "transition-all",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-primary focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "rounded-sm px-3 py-1.5",
          "data-[state=active]:bg-background",
          "data-[state=active]:text-foreground",
          "data-[state=active]:shadow-sm",
        ],
        underline: [
          "px-4 py-2",
          "border-b-2 border-transparent",
          "-mb-px",
          "data-[state=active]:border-primary",
          "data-[state=active]:text-primary",
        ],
        pills: [
          "rounded-full px-4 py-2",
          "data-[state=active]:bg-primary",
          "data-[state=active]:text-foreground",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const Tabs = TabsPrimitive.Root;

/**
 * Tabs List - container for tab triggers
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, className }))}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * Tab Trigger - clickable tab button
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, className }))}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * Tab Content - panel content for each tab
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2",
      "ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-primary focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};
export default Tabs;
