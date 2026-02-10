"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

type TooltipProviderProps = {
  children: ReactNode;
};

type TooltipProps = {
  children: ReactNode;
};

export function TooltipProvider({ children }: TooltipProviderProps) {
  return <TooltipPrimitive.Provider delayDuration={200}>{children}</TooltipPrimitive.Provider>;
}

export function Tooltip({ children }: TooltipProps) {
  return <TooltipPrimitive.Root>{children}</TooltipPrimitive.Root>;
}

export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({
  className,
  sideOffset = 6,
  ...props
}: TooltipPrimitive.TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={`z-50 rounded-sm border border-(--border) bg-(--surface-2) px-2 py-1 text-[10px] text-foreground shadow-lg ${
          className ?? ""
        }`}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
}
