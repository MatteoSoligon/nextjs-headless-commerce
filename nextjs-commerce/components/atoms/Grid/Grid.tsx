import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  gridVariants,
  gridItemVariants,
  getResponsiveClasses,
  type ResponsiveCols,
} from "./Grid.config";

// ============================================================
// GRID CONTAINER
// ============================================================

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /** Columns at the sm breakpoint (≥ 640px) */
  colsSm?: ResponsiveCols;
  /** Columns at the md breakpoint (≥ 768px) */
  colsMd?: ResponsiveCols;
  /** Columns at the lg breakpoint (≥ 1024px) */
  colsLg?: ResponsiveCols;
  /** Columns at the xl breakpoint (≥ 1280px) */
  colsXl?: ResponsiveCols;
  /** HTML element to render. Defaults to "div". */
  as?: React.ElementType;
}

/**
 * Grid — flexible CSS Grid container for page and section layouts.
 *
 * **Quick start — use a preset layout:**
 * ```tsx
 * <Grid layout="3-col" gap="lg">
 *   <Card>A</Card>
 *   <Card>B</Card>
 *   <Card>C</Card>
 * </Grid>
 * ```
 *
 * **Responsive columns (explicit):**
 * ```tsx
 * <Grid cols={1} colsMd={2} colsLg={4} gap="lg">
 *   {products.map(p => <Card key={p.id}>{p.name}</Card>)}
 * </Grid>
 * ```
 *
 * **Page layout with sidebar:**
 * ```tsx
 * <Grid layout="sidebar-left" gap="xl" fullHeight>
 *   <aside>Sidebar</aside>
 *   <main>Content</main>
 * </Grid>
 * ```
 *
 * **12-column grid with GridItem spans:**
 * ```tsx
 * <Grid layout="12-col" gap="md">
 *   <GridItem colSpan={8}>Main content</GridItem>
 *   <GridItem colSpan={4}>Sidebar</GridItem>
 * </Grid>
 * ```
 */
const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      layout,
      cols,
      rows,
      gap,
      align,
      justify,
      flow,
      fullHeight,
      colsSm,
      colsMd,
      colsLg,
      colsXl,
      as: Component = "div",
      ...props
    },
    ref,
  ) => (
    <Component
      ref={ref}
      className={cn(
        gridVariants({ layout, cols, rows, gap, align, justify, flow, fullHeight }),
        getResponsiveClasses(colsSm, colsMd, colsLg, colsXl),
        className,
      )}
      {...props}
    />
  ),
);
Grid.displayName = "Grid";

// ============================================================
// GRID ITEM
// ============================================================

export interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  /** HTML element to render. Defaults to "div". */
  as?: React.ElementType;
}

/**
 * GridItem — optional wrapper for children inside a Grid.
 * Use it when you need to control column/row spans, start positions, or self-alignment.
 *
 * @example
 * <Grid layout="12-col" gap="md">
 *   <GridItem colSpan={8}>Main content area</GridItem>
 *   <GridItem colSpan={4}>Sidebar widget</GridItem>
 *   <GridItem colSpan={12}>Full-width banner</GridItem>
 * </Grid>
 *
 * @example — centered content with narrow layout
 * <Grid layout="content-narrow">
 *   <GridItem area="center">Centered narrow content</GridItem>
 * </Grid>
 */
const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      className,
      colSpan,
      rowSpan,
      colStart,
      rowStart,
      alignSelf,
      justifySelf,
      area,
      as: Component = "div",
      ...props
    },
    ref,
  ) => (
    <Component
      ref={ref}
      className={cn(
        gridItemVariants({ colSpan, rowSpan, colStart, rowStart, alignSelf, justifySelf, area }),
        className,
      )}
      {...props}
    />
  ),
);
GridItem.displayName = "GridItem";

// ============================================================
// EXPORTS
// ============================================================

export { Grid, GridItem, gridVariants, gridItemVariants };