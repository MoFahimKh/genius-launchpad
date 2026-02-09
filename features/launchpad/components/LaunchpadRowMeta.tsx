import { Clock, Search, Share2, Sparkles } from "lucide-react";
import { LaunchpadItem } from "@/features/launchpad/types";

export function LaunchpadRowMeta({ item }: { item: LaunchpadItem }) {
  return (
    <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
      <div className="flex items-center gap-1 text-[var(--accent-2)]">
        <Clock size={14} />
        <span>{item.age}</span>
      </div>
      <div className="flex items-center gap-2 text-[var(--muted)]">
        <Search size={14} />
        <Share2 size={14} />
        <Sparkles size={14} />
      </div>
    </div>
  );
}
