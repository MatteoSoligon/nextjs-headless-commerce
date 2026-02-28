import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("container mx-auto px-4", {
  variants: {
    /** Maximum width constraint */
    maxWidth: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      prose: "max-w-prose",
      full: "max-w-full",
      none: "",
    },
    /** Vertical padding */
    py: {
      none: "py-0",
      sm: "py-4",
      md: "py-8",
      lg: "py-10",
      xl: "py-16",
    },
  },
  defaultVariants: {
    maxWidth: "none",
    py: "none",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /** HTML element to render. Defaults to "div". */
  as?: React.ElementType;
}

/**
 * Container — centered, max-width-constrained wrapper for page content.
 *
 * @example
 * <Container maxWidth="xl" py="lg">
 *   <Grid layout="3-col" gap="lg">…</Grid>
 * </Container>
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, py, as: Component = "div", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(containerVariants({ maxWidth, py }), className)}
      {...props}
    />
  ),
);
Container.displayName = "Container";

export { Container, containerVariants };