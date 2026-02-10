import { Copy, ExternalLink } from "lucide-react";
import { LaunchpadItem } from "@/types/launchpad";
import { TokenIconWithChainBadge } from "@/components/common/TokenIconWithChainBadge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function LaunchpadCardHeader({ item }: { item: LaunchpadItem }) {
  const showNameTooltip = item.name.length > 15;
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
          {showNameTooltip ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="max-w-61.75 truncate text-md font-semibold text-foreground">
                  {item.name}
                </span>
              </TooltipTrigger>
              <TooltipContent>{item.name}</TooltipContent>
            </Tooltip>
          ) : (
            <span className="max-w-61.75 truncate text-md font-semibold text-foreground">
              {item.name}
            </span>
          )}
          <span className="text-sm text-(--muted)">{item.symbol}</span>
          <Copy size={14} className="text-(--muted-2)" />
          <ExternalLink size={14} className="text-(--muted-2)" />
        </div>
      </div>
    </div>
  );
}
