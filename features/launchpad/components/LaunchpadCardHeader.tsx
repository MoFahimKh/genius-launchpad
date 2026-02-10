import { Copy, ExternalLink } from "lucide-react";
import { LaunchpadItem } from "@/features/launchpad/types";

export function LaunchpadCardHeader({ item }: { item: LaunchpadItem }) {
  return (
    <div className="flex items-center gap-3">
      {item.avatarUrl ? (
        <img
          src={item.avatarUrl}
          alt={item.symbol || item.name}
          className="h-9 w-9 rounded-sm object-cover"
        />
      ) : (
        <div className="h-9 w-9 rounded-sm bg-linear-to-br from-purple-600/60 via-purple-500/50 to-pink-500/40" />
      )}
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
