"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PopupProps = {
  open: boolean;
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  offset?: number;
  blurBackground?: boolean;
  center?: boolean;
  className?: string;
  panelClassName?: string;
  onClose?: () => void;
};

export function Popup({
  open,
  trigger,
  children,
  align = "left",
  offset = 8,
  blurBackground = false,
  center = false,
  className,
  panelClassName,
  onClose
}: PopupProps) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  const blurClasses = blurBackground ? "backdrop-blur bg-(--surface-2)/60" : "bg-(--surface-2)";

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = () => {
    const triggerEl = triggerRef.current;
    if (!triggerEl) return;
    const rect = triggerEl.getBoundingClientRect();
    const panelWidth = panelRef.current?.offsetWidth ?? 0;
    const left =
      align === "right" && panelWidth ? rect.right - panelWidth : rect.left;
    setPosition({ top: rect.bottom + offset, left });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, align, offset]);

  useEffect(() => {
    if (!open) return;
    const handle = () => updatePosition();
    window.addEventListener("resize", handle);
    window.addEventListener("scroll", handle, true);
    return () => {
      window.removeEventListener("resize", handle);
      window.removeEventListener("scroll", handle, true);
    };
  }, [open, align, offset]);

  useEffect(() => {
    if (!open || !center) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, center]);

  useEffect(() => {
    if (!open || !onClose) return;
    const handlePointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      onClose();
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
    };
  }, [open, onClose]);

  return (
    <div className={`relative inline-flex ${className ?? ""}`}>
      <div ref={triggerRef}>{trigger}</div>
      {open && mounted
        ? createPortal(
            center ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-slate-800/80"
                  onMouseDown={() => onClose?.()}
                  role="presentation"
                />
                <div
                  ref={panelRef}
                  className={`relative rounded-sm border-2 border-(--border) p-0.5 shadow-lg ${blurClasses} ${
                    panelClassName ?? ""
                  }`}
                >
                  {children}
                </div>
              </div>
            ) : position ? (
              <div className="fixed z-50" style={{ top: position.top, left: position.left }}>
                <div
                  ref={panelRef}
                  className={`rounded-sm border-2 border-(--border) p-0.5 shadow-lg ${blurClasses} ${
                    panelClassName ?? ""
                  }`}
                >
                  {children}
                </div>
              </div>
            ) : null,
            document.body
          )
        : null}
    </div>
  );
}
