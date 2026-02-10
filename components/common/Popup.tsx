import { ReactNode } from "react";

type PopupProps = {
  open: boolean;
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  offset?: number;
  blurBackground?: boolean;
  className?: string;
  panelClassName?: string;
};

export function Popup({
  open,
  trigger,
  children,
  align = "left",
  offset = 8,
  blurBackground = false,
  className,
  panelClassName
}: PopupProps) {
  const alignmentClass = align === "right" ? "right-0" : "left-0";
  const blurClasses = blurBackground ? "backdrop-blur bg-(--surface-2)/60" : "bg-(--surface-2)";

  return (
    <div className={`relative inline-flex ${className ?? ""}`}>
      {trigger}
      {open ? (
        <div className={`absolute z-50 ${alignmentClass}`} style={{ top: `calc(100% + ${offset}px)` }}>
          <div
            className={`rounded-sm border border-(--border) p-3 shadow-lg ${blurClasses} ${
              panelClassName ?? ""
            }`}
          >
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}
