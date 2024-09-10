import React, { ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import "./style.css";
import Image from "next/image";
import { close } from "@/public/inpoter";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  closeOnOverlayClick?: boolean;
}

const DialogComponent: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      dialogRef.current?.showModal();
      document.addEventListener("keydown", handleEscape);
    } else {
      dialogRef.current?.close();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Duration of the close animation
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (
      closeOnOverlayClick &&
      dialogRef.current &&
      event.target === dialogRef.current
    ) {
      handleClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={clsx(
        "rounded-lg overflow-hidden shadow-xl transform transition-transform",
        "bg-primary_light border border-primary_light_4 p-0",
        size === "sm" && "max-w-sm",
        size === "md" && "max-w-md",
        size === "lg" && "max-w-lg",
        "w-full",
        isClosing ? "animate-close" : "animate-open"
      )}
      onClick={handleOverlayClick}
    >
      <div className="px-4 py-2 flex border-primary_light_4 justify-between items-center border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={handleClose}
          className="bg-primary_dark border p-1 shadow-md rounded-md"
        >
          <Image src={close} alt="close" width={24} height={24} />
        </button>
      </div>
      <div className="p-4">{children}</div>
      {footer && (
        <div className="px-4 py-2 flex justify-end border-t border-primary_light_4">
          {footer}
        </div>
      )}
    </dialog>
  );
};

export default DialogComponent;
