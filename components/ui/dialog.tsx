"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Types
interface DialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClose?: () => void;
}

// Context with default values
const DialogContext = createContext<DialogContextType>({
  open: false,
  onOpenChange: () => {},
});

// Hook for consuming dialog context
const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog provider");
  }
  return context;
};

// Root Dialog Component
const Dialog: React.FC<DialogProps> = ({
  children,
  open = false,
  onOpenChange = () => {},
}) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

// Dialog Trigger Component
const DialogTrigger: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  const { onOpenChange } = useDialog();

  return (
    <button type="button" onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  );
};

// Dialog Portal Component
const DialogPortal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
};

// Dialog Overlay Component
const DialogOverlay: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  const { open, onOpenChange } = useDialog();

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity ${
        open ? "opacity-100" : "opacity-0"
      } ${className}`}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  );
};

// Dialog Content Component
const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className = "", onClose, ...props }, ref) => {
    const { open, onOpenChange } = useDialog();
    const contentRef = useRef<HTMLDivElement | null>(null);

    // Merge refs
    const mergedRef = (node: HTMLDivElement | null) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      if (contentRef) {
        contentRef.current = node;
      }
    };

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onOpenChange(false);
          onClose?.();
        }
      };

      if (open) {
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
      }
    }, [open, onOpenChange, onClose]);

    if (!open) return null;

    return (
      <DialogPortal>
        <DialogOverlay />
        <div
          role="dialog"
          aria-modal="true"
          ref={mergedRef}
          className={`fixed left-[50%] top-[50%] z-50 grid w-full h-max max-w-7xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg ${
            open ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } ${className}`}
          {...props}
        >
          {children}
        </div>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = "DialogContent";

// Dialog Close Component
const DialogClose: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  const { onOpenChange } = useDialog();

  return (
    <button type="button" onClick={() => onOpenChange(false)} {...props}>
      {children}
    </button>
  );
};

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogPortal,
  DialogOverlay,
};
