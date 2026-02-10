"use client";

import Image from "next/image";
import { useState } from "react";
import { ChainIcon } from "@/components/common/ChainIcon";
import { Popup } from "@/components/common/Popup";
import { useDisplayMetricsStore } from "@/features/launchpad/stores/useDisplayMetricsStore";

type TokenIconWithChainBadgeProps = {
  size: number;
  src?: string | null;
  alt: string;
  networkId?: number;
  badgeSize?: number;
  className?: string;
};

export function TokenIconWithChainBadge({
  size,
  src,
  alt,
  networkId,
  badgeSize = 18,
  className
}: TokenIconWithChainBadgeProps) {
  const [open, setOpen] = useState(false);
  const metrics = useDisplayMetricsStore((state) => state.metrics);
  const tokenImage = src ? (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`h-full w-full object-cover ${metrics.shape ? "rounded-full" : "rounded-sm"}`}
    />
  ) : (
    <div className="h-full w-full rounded-sm bg-linear-to-br from-purple-600/60 via-purple-500/50 to-pink-500/40" />
  );

  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Popup
        open={open}
        trigger={<div className="h-full w-full">{tokenImage}</div>}
        blurBackground
        panelClassName="h-[300px] w-[300px] flex items-center justify-center"
      >
        <div className="h-full w-full p-px">
          {src ? (
            <Image
              src={src}
              alt={alt}
              width={280}
              height={280}
              className="h-full w-full rounded-sm object-cover"
            />
          ) : (
            <div className="h-full w-full rounded-sm bg-linear-to-br from-purple-600/60 via-purple-500/50 to-pink-500/40" />
          )}
        </div>
      </Popup>
      <div className="absolute -bottom-1 -right-1">
        <ChainIcon size={badgeSize} networkId={networkId} />
      </div>
    </div>
  );
}
