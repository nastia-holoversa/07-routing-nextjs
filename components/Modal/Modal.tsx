"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void; // ← залишаємо опціональним
}

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  // ✅ обгортаємо у useCallback, щоб уникнути перегенерації функції
  const handleClose = useCallback(() => {
    if (onClose) onClose();
    else router.back();
  }, [onClose, router]);

  // Закриття через Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  // Закриття при кліку поза модалкою
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {children}
        <button className={css.closeBtn} onClick={handleClose}>
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
}

