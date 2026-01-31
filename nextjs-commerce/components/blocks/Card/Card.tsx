import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Card variants using CVA
 */
const cardVariants = cva(
  [
    "bg-[var(--background)] text-[var(--foreground)]",
    "rounded-[var(--radius-lg)]",
    "transition-shadow duration-200",
  ],
  {
    variants: {
      variant: {
        default: "border border-[var(--foreground)]/10",
        elevated: "shadow-lg",
        outline: "border-2 border-[var(--foreground)]/20",
        filled: "bg-[var(--foreground)]/5",
        interactive: [
          "border border-[var(--foreground)]/10",
          "hover:shadow-md hover:border-[var(--primary)]/30",
          "cursor-pointer",
        ],
      },
      padding: {
        none: "p-0",
        sm: "p-[var(--space-sm)]",
        md: "p-[var(--space-md)]",
        lg: "p-[var(--space-lg)]",
        xl: "p-[var(--space-xl)]",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Card component - container for grouped content
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content here</CardContent>
 *   <CardFooter>Footer actions</CardFooter>
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

/**
 * CardHeader - top section of card
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-[var(--space-xs)]", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * CardTitle - main heading of card
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-[var(--text-xl)] font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * CardDescription - secondary text in header
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[var(--text-sm)] text-[var(--foreground)]/60", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * CardContent - main content area
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pt-[var(--space-md)]", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

/**
 * CardFooter - bottom section for actions
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center pt-[var(--space-md)]",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
export default Card;
