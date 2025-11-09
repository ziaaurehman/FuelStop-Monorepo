"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@repo/components";
import { cn } from "@repo/lib/utils";
import { X } from "lucide-react";

// Mock useMediaQuery hook for demo
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

interface ResponsiveModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  showCloseIcon?: boolean;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  preventClose?: boolean;
}

export function ResponsiveModal({
  children,
  open,
  onOpenChange,
  trigger,
  title,
  description,
  footer,
  closeOnOverlayClick = true,
  showCloseIcon = true,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  size = "md",
  preventClose = false,
}: ResponsiveModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && preventClose) {
      return;
    }
    setIsOpen(newOpen);
  };

  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-2xl",
    full: "sm:max-w-[95vw]",
  };

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {trigger && <div onClick={() => handleOpenChange(true)}>{trigger}</div>}
        <DialogContent
          className={cn(
            sizeClasses[size],
            "flex flex-col gap-0 p-0 pb-4 max-h-[90vh]",
            contentClassName
          )}
          onPointerDownOutside={(e: Event) => {
            if (!closeOnOverlayClick || preventClose) {
              e.preventDefault();
            }
          }}
          onInteractOutside={(e: Event) => {
            if (!closeOnOverlayClick || preventClose) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={(e: Event) => {
            if (preventClose) {
              e.preventDefault();
            }
          }}
        >
          {showCloseIcon && !preventClose && (
            <button
              onClick={() => handleOpenChange(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          )}

          {(title || description) && (
            <DialogHeader
              className={cn("px-6 pt-6 pb-4 shrink-0", headerClassName)}
            >
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}

          <div
            className={cn(
              "flex-1 overflow-y-auto overflow-x-hidden px-6",
              "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400",
              className
            )}
          >
            {children}
          </div>

          {footer && (
            <DialogFooter
              className={cn(
                "px-6 py-4 shrink-0 border-t mt-4",
                footerClassName
              )}
            >
              {footer}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <div onClick={() => handleOpenChange(true)}>{trigger}</div>}
      <DrawerContent
        className={cn("flex flex-col max-h-[85vh]", contentClassName)}
        onPointerDownOutside={(e: Event) => {
          if (!closeOnOverlayClick || preventClose) {
            e.preventDefault();
          }
        }}
        onInteractOutside={(e: Event) => {
          if (!closeOnOverlayClick || preventClose) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e: Event) => {
          if (preventClose) {
            e.preventDefault();
          }
        }}
      >
        {showCloseIcon && !preventClose && (
          <button
            onClick={() => handleOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}

        {(title || description) && (
          <DrawerHeader
            className={cn("text-left shrink-0 pb-4", headerClassName)}
          >
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
        )}

        <div
          className={cn(
            "flex-1 overflow-y-auto overflow-x-hidden px-4",
            "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400",
            className
          )}
        >
          {children}
        </div>

        {footer && (
          <DrawerFooter
            className={cn("shrink-0 border-t mt-4 pt-4", footerClassName)}
          >
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

interface ResponsiveModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveModalFooter({
  children,
  className,
}: ResponsiveModalFooterProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <DialogFooter className={className}>{children}</DialogFooter>;
  }

  return <DrawerFooter className={className}>{children}</DrawerFooter>;
}

// Preset configurations
export const ResponsiveModalPresets = {
  confirmation: {
    closeOnOverlayClick: false,
    showCloseIcon: false,
    size: "sm" as const,
    scrollBehavior: "inside" as const,
  },
  form: {
    closeOnOverlayClick: false,
    size: "md" as const,
    scrollBehavior: "inside" as const,
  },
  info: {
    closeOnOverlayClick: true,
    size: "md" as const,
    scrollBehavior: "inside" as const,
  },
  fullscreen: {
    size: "full" as const,
    closeOnOverlayClick: false,
    scrollBehavior: "inside" as const,
    maxHeight: "95vh",
  },
  longContent: {
    size: "lg" as const,
    closeOnOverlayClick: true,
    scrollBehavior: "inside" as const,
    maxHeight: "90vh",
  },
} as const;
