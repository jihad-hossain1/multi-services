import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import "./style.css";
import { Icons } from "../ui/icons";

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
    children,
    closeOnOverlayClick = true,
}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [mouseDownTarget, setMouseDownTarget] = useState<EventTarget | null>(null);

    const handleClose = useCallback(() => {
        if (!isClosing) {
            setIsClosing(true);
            setTimeout(() => {
                setIsClosing(false);
                onClose();
            }, 300);
        }
    }, [isClosing, onClose]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };

        if (isOpen) {
            dialogRef.current?.showModal();
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        } else {
            dialogRef.current?.close();
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [handleClose, isOpen]);



    const handleMouseDown = (event: React.MouseEvent) => {
        setMouseDownTarget(event.target);
    };

    const handleMouseUp = (event: React.MouseEvent) => {
        if (
            closeOnOverlayClick &&
            mouseDownTarget === dialogRef.current &&
            event.target === dialogRef.current &&
            !contentRef.current?.contains(event.target as Node)
        ) {
            handleClose();
        }
        setMouseDownTarget(null);
    };

    return (
        <dialog
            ref={dialogRef}
            className={clsx(
                "rounded-md shadow-xl transform transition-transform relative",
                " p-0 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl bg-zinc-700",
                "w-full backdrop:bg-black/50",
                isClosing ? "animate-close" : "animate-open",
            )}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div
                ref={contentRef}
                className="relative"
            >
                <div className='absolute top-2 right-2'>
                    <button
                        onClick={handleClose}
                        className='bg-red-500 p-1 shadow-sm rounded-md hover:bg-red-600 transition-colors'
                    >
                        <Icons.close
                            className='w-5 h-5'
                            color='white'
                            strokeColor='white'
                            size={16}
                        />
                    </button>
                </div>
                <div className='p-4'>
                    {children}
                </div>
            </div>
        </dialog>
    );
};

export default DialogComponent;