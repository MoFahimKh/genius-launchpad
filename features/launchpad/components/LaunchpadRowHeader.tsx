import { Copy, ExternalLink } from "lucide-react";
import { LaunchpadItem } from "@/features/launchpad/types";

export function LaunchpadRowHeader({ item }: { item: LaunchpadItem }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-[1px] bg-gradient-to-br from-purple-600/60 via-purple-500/50 to-pink-500/40" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="max-w-[160px] truncate text-sm font-semibold text-[var(--text)]">
            {item.name}
          </span>
          <span className="text-xs text-[var(--muted)]">{item.symbol}</span>
          <Copy size={14} className="text-[var(--muted-2)]" />
          <ExternalLink size={14} className="text-[var(--muted-2)]" />
        </div>
      </div>
    </div>
  );
}
