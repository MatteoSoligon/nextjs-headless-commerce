import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Text variants using CVA
 * Supports all typography scale sizes
 */
const textVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    textColor: {
      default: "text-foreground",
      muted: "text-foreground/60",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    truncate: {
      true: "truncate",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    textColor: "default",
  },
});

/**
 * Heading variants
 */
const headingVariants = cva(
  "text-foreground font-bold tracking-tight",
  {
    variants: {
      level: {
        h1: "text-5xl leading-tight",
        h2: "text-4xl leading-tight",
        h3: "text-3xl leading-snug",
        h4: "text-2xl leading-snug",
        h5: "text-xl leading-normal",
        h6: "text-lg leading-normal",
      },
      textColor: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent",
      },
    },
    defaultVariants: {
      level: "h2",
      textColor: "default",
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /**
   * The semantic heading level (h1-h6)
   * Defaults to matching the visual level
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Text component for body text and labels
 *
 * @example
 * <Text size="lg" weight="medium">Hello world</Text>
 * <Text color="muted" size="sm">Secondary text</Text>
 */
const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as: Component = "p", size, weight, textColor, align, truncate, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ size, weight, textColor, align, truncate, className }))}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

/**
 * Heading component with semantic HTML and visual variants
 *
 * @example
 * <Heading level="h1">Page Title</Heading>
 * <Heading level="h2" as="h3">Visually h2, semantically h3</Heading>
 */
const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = "h2", textColor, as, ...props }, ref) => {
    // Use the semantic 'as' prop if provided, otherwise match the visual level
    const Component = as || level || 'h1';

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level, textColor, className }))}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

export { Text, Heading };
export default Text;
