"use client";

import Image from "next/image";
import { ChainIcon } from "@/components/common/ChainIcon";

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
  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="h-full w-full rounded-sm object-cover"
        />
      ) : (
        <div className="h-full w-full rounded-sm bg-linear-to-br from-purple-600/60 via-purple-500/50 to-pink-500/40" />
      )}
      <div className="absolute -bottom-1 -right-1">
        <ChainIcon size={badgeSize} networkId={networkId} />
      </div>
    </div>
  );
}
