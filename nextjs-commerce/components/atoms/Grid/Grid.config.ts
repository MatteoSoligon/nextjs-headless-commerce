import { cva } from "class-variance-authority";

// ============================================================
// GRID CONTAINER VARIANTS
// ============================================================

/**
 * Grid container variants using CVA.
 *
 * Use `layout` for preset responsive page patterns (recommended).
 * Use `cols` for explicit column count (combine with colsSm/colsMd/colsLg/colsXl for responsive).
 * Both can be combined with gap, align, justify, and flow.
 */
export const gridVariants = cva("grid", {
  variants: {
    /**
     * Preset responsive layouts for common page/section patterns.
     * These include built-in responsive behavior.
     */
    layout: {
      /** Single column — stacks everything vertically */
      "1-col": "grid-cols-1",
      /** Two equal columns */
      "2-col": "grid-cols-1 md:grid-cols-2",
      /** Three equal columns */
      "3-col": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      /** Four equal columns */
      "4-col": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      /** Fixed left sidebar (280px) + fluid content */
      "sidebar-left": "grid-cols-1 lg:grid-cols-[280px_1fr]",
      /** Fluid content + fixed right sidebar (280px) */
      "sidebar-right": "grid-cols-1 lg:grid-cols-[1fr_280px]",
      /** Two sidebars (240px each) flanking fluid content */
      "sidebar-both": "grid-cols-1 lg:grid-cols-[240px_1fr_240px]",
      /** Centered narrow content area (max 720px) with gutters */
      "content-narrow": "grid-cols-1 lg:grid-cols-[1fr_minmax(0,720px)_1fr]",
      /** Auto-fill: wraps cards into rows, min 280px each */
      "auto-fill": "grid-cols-[repeat(auto-fill,minmax(280px,1fr))]",
      /** Auto-fit: like auto-fill but collapses empty tracks */
      "auto-fit": "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
      /** 12-column base grid for fine-grained control with GridItem spans */
      "12-col": "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
    },

    /** Explicit column count (base breakpoint). Combine with colsSm…colsXl props for responsive. */
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },

    /** Row count (rarely needed — most grids auto-row) */
    rows: {
      1: "grid-rows-1",
      2: "grid-rows-2",
      3: "grid-rows-3",
      4: "grid-rows-4",
      6: "grid-rows-6",
      none: "grid-rows-none",
    },

    /** Gap between grid items */
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      "2xl": "gap-12",
      "3xl": "gap-16",
    },

    /** Vertical alignment of items within their cells */
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },

    /** Horizontal alignment of items within their cells */
    justify: {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      stretch: "justify-items-stretch",
    },

    /** Grid auto-flow direction */
    flow: {
      row: "grid-flow-row",
      col: "grid-flow-col",
      dense: "grid-flow-dense",
      "row-dense": "grid-flow-row-dense",
      "col-dense": "grid-flow-col-dense",
    },

    /** Stretch container to full viewport height (useful for page layouts) */
    fullHeight: {
      true: "min-h-screen",
    },
  },
  defaultVariants: {
    gap: "md",
    align: "stretch",
  },
});

// ============================================================
// GRID ITEM VARIANTS
// ============================================================

/**
 * GridItem variants using CVA.
 * Controls how a child spans and positions itself within the Grid.
 */
export const gridItemVariants = cva("", {
  variants: {
    /** Number of columns this item spans */
    colSpan: {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
      7: "col-span-7",
      8: "col-span-8",
      9: "col-span-9",
      10: "col-span-10",
      11: "col-span-11",
      12: "col-span-12",
      full: "col-span-full",
    },

    /** Number of rows this item spans */
    rowSpan: {
      1: "row-span-1",
      2: "row-span-2",
      3: "row-span-3",
      4: "row-span-4",
      5: "row-span-5",
      6: "row-span-6",
      full: "row-span-full",
    },

    /** Column start position (1-based) */
    colStart: {
      1: "col-start-1",
      2: "col-start-2",
      3: "col-start-3",
      4: "col-start-4",
      5: "col-start-5",
      6: "col-start-6",
      7: "col-start-7",
      8: "col-start-8",
      9: "col-start-9",
      10: "col-start-10",
      11: "col-start-11",
      12: "col-start-12",
      13: "col-start-13",
      auto: "col-start-auto",
    },

    /** Row start position (1-based) */
    rowStart: {
      1: "row-start-1",
      2: "row-start-2",
      3: "row-start-3",
      4: "row-start-4",
      auto: "row-start-auto",
    },

    /** Per-item vertical alignment override */
    alignSelf: {
      start: "self-start",
      center: "self-center",
      end: "self-end",
      stretch: "self-stretch",
    },

    /** Per-item horizontal alignment override */
    justifySelf: {
      start: "justify-self-start",
      center: "justify-self-center",
      end: "justify-self-end",
      stretch: "justify-self-stretch",
    },

    /** Convenience: place item in the center area of a content-narrow grid */
    area: {
      center: "col-start-2",
    },
  },
});

// ============================================================
// RESPONSIVE COLUMN HELPERS
// ============================================================

export type ResponsiveCols = 1 | 2 | 3 | 4 | 5 | 6 | 12;

/** Maps breakpoint → column count → Tailwind class */
const RESPONSIVE_COLS: Record<string, Record<ResponsiveCols, string>> = {
  sm: { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4", 5: "sm:grid-cols-5", 6: "sm:grid-cols-6", 12: "sm:grid-cols-12" },
  md: { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4", 5: "md:grid-cols-5", 6: "md:grid-cols-6", 12: "md:grid-cols-12" },
  lg: { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6", 12: "lg:grid-cols-12" },
  xl: { 1: "xl:grid-cols-1", 2: "xl:grid-cols-2", 3: "xl:grid-cols-3", 4: "xl:grid-cols-4", 5: "xl:grid-cols-5", 6: "xl:grid-cols-6", 12: "xl:grid-cols-12" },
};

export function getResponsiveClasses(
  colsSm?: ResponsiveCols,
  colsMd?: ResponsiveCols,
  colsLg?: ResponsiveCols,
  colsXl?: ResponsiveCols,
): string {
  return [
    colsSm && RESPONSIVE_COLS.sm[colsSm],
    colsMd && RESPONSIVE_COLS.md[colsMd],
    colsLg && RESPONSIVE_COLS.lg[colsLg],
    colsXl && RESPONSIVE_COLS.xl[colsXl],
  ]
    .filter(Boolean)
    .join(" ");
}
