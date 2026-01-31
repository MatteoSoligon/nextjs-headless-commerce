"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Dialog overlay variants
 */
const overlayVariants = cva([
  "fixed inset-0 z-50",
  "bg-black/50 backdrop-blur-sm",
  // Animations
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
]);

/**
 * Dialog content variants
 */
const contentVariants = cva(
  [
    "fixed z-50",
    "bg-[var(--background)] text-[var(--foreground)]",
    "shadow-xl rounded-[var(--radius-lg)]",
    "border border-[var(--foreground)]/10",
    // Focus trap visible styles
    "focus:outline-none",
    // Animations
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  ],
  {
    variants: {
      position: {
        center: [
          "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        ],
        top: [
          "left-1/2 top-[10%] -translate-x-1/2",
        ],
      },
      size: {
        sm: "w-full max-w-sm p-[var(--space-md)]",
        md: "w-full max-w-lg p-[var(--space-lg)]",
        lg: "w-full max-w-2xl p-[var(--space-lg)]",
        xl: "w-full max-w-4xl p-[var(--space-xl)]",
        full: "w-[95vw] h-[95vh] p-[var(--space-xl)]",
      },
    },
    defaultVariants: {
      position: "center",
      size: "md",
    },
  }
);

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

/**
 * Dialog Overlay
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(overlayVariants(), className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof contentVariants> {}

/**
 * Dialog Content - main modal container
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, position, size, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(contentVariants({ position, size, className }))}
      {...props}
    >
      {children}
      {/* Close button */}
      <DialogPrimitive.Close
        className={cn(
          "absolute right-4 top-4",
          "rounded-[var(--radius-sm)] p-1",
          "opacity-70 transition-opacity hover:opacity-100",
          "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]",
          "disabled:pointer-events-none"
        )}
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * Dialog Header - contains title and description
 */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col gap-[var(--space-xs)] mb-[var(--space-md)]", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

/**
 * Dialog Footer - contains action buttons
 */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end gap-[var(--space-sm)]",
      "mt-[var(--space-lg)]",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

/**
 * Dialog Title
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-[var(--text-xl)] font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * Dialog Description
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-[var(--text-sm)] text-[var(--foreground)]/60", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
export default Dialog;
