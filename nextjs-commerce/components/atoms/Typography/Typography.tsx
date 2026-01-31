import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Text variants using CVA
 * Supports all typography scale sizes
 */
const textVariants = cva("text-[var(--foreground)]", {
  variants: {
    size: {
      xs: "text-[var(--text-xs)]",
      sm: "text-[var(--text-sm)]",
      base: "text-[var(--text-base)]",
      lg: "text-[var(--text-lg)]",
      xl: "text-[var(--text-xl)]",
      "2xl": "text-[var(--text-2xl)]",
      "3xl": "text-[var(--text-3xl)]",
      "4xl": "text-[var(--text-4xl)]",
      "5xl": "text-[var(--text-5xl)]",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      default: "text-[var(--foreground)]",
      muted: "text-[var(--foreground)]/60",
      primary: "text-[var(--primary)]",
      secondary: "text-[var(--secondary)]",
      accent: "text-[var(--accent)]",
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
    color: "default",
  },
});

/**
 * Heading variants
 */
const headingVariants = cva(
  "text-[var(--foreground)] font-bold tracking-tight",
  {
    variants: {
      level: {
        h1: "text-[var(--text-5xl)] leading-tight",
        h2: "text-[var(--text-4xl)] leading-tight",
        h3: "text-[var(--text-3xl)] leading-snug",
        h4: "text-[var(--text-2xl)] leading-snug",
        h5: "text-[var(--text-xl)] leading-normal",
        h6: "text-[var(--text-lg)] leading-normal",
      },
      color: {
        default: "text-[var(--foreground)]",
        primary: "text-[var(--primary)]",
        secondary: "text-[var(--secondary)]",
        accent: "text-[var(--accent)]",
      },
    },
    defaultVariants: {
      level: "h2",
      color: "default",
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
  ({ className, as: Component = "p", size, weight, color, align, truncate, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ size, weight, color, align, truncate, className }))}
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
  ({ className, level = "h2", color, as, ...props }, ref) => {
    // Use the semantic 'as' prop if provided, otherwise match the visual level
    const Component = as || level;

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level, color, className }))}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

export { Text, Heading };
export default Text;
