"use client";

import Image from "next/image";
import { useNetworkId } from "@/features/launchpad/hooks/useNetworkId";

type ChainIconProps = {
  size: number;
  className?: string;
  networkId?: number;
  showFrame?: boolean;
};

export function ChainIcon({
  size,
  className,
  networkId,
  showFrame = true
}: ChainIconProps) {
  const currentNetworkId = useNetworkId();
  const resolvedNetworkId = networkId ?? currentNetworkId;
  const isBsc = resolvedNetworkId === 56;
  const src = isBsc ? "/icons/bsc-icon.png" : "/icons/solana-icon.png";
  const label = isBsc ? "BSC chain" : "Solana chain";

  const frameClassName = showFrame
    ? "rounded-sm"
    : "";

  return (
    <div
      className={`flex items-center justify-center ${frameClassName} ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-label={label}
    >
      <Image src={src} alt={label} width={size} height={size} />
    </div>
  );
}
