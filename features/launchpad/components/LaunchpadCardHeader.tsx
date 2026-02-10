import { Copy, ExternalLink } from "lucide-react";
import { LaunchpadItem } from "@/features/launchpad/types";
import { TokenIconWithChainBadge } from "@/components/common/TokenIconWithChainBadge";

export function LaunchpadCardHeader({ item }: { item: LaunchpadItem }) {
  return (
    <div className="flex items-center gap-3">
      <TokenIconWithChainBadge
        size={36}
        badgeSize={16}
        src={item.avatarUrl}
        alt={item.symbol || item.name}
        networkId={item.networkId}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="max-w-40 truncate text-sm font-semibold text-foreground">
            {item.name}
          </span>
          <span className="text-xs text-(--muted)">{item.symbol}</span>
          <Copy size={14} className="text-(--muted-2)" />
          <ExternalLink size={14} className="text-(--muted-2)" />
        </div>
      </div>
    </div>
  );
}
