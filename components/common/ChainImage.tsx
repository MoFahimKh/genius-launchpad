"use client";

import { Hexagon, Sun } from "lucide-react";
import { useNetworkId } from "@/features/launchpad/hooks/useNetworkId";

type ChainImageProps = {
  size: number;
  className?: string;
};

export function ChainImage({ size, className }: ChainImageProps) {
  const networkId = useNetworkId();
  const isBsc = networkId === 56;
  const Icon = isBsc ? Hexagon : Sun;
  const iconSize = Math.max(12, Math.floor(size * 0.6));

  return (
    <div
      className={`flex items-center justify-center rounded-sm border border-(--border) bg-(--surface-2) ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-label={isBsc ? "BSC chain" : "Solana chain"}
    >
      <Icon size={iconSize} className={isBsc ? "text-[#f3ba2f]" : "text-[#8b7bff]"} />
    </div>
  );
}
