import { LaunchpadItem } from "@/features/launchpad/types";
import { LaunchpadRowHeader } from "@/features/launchpad/components/LaunchpadRowHeader";
import { LaunchpadRowMeta } from "@/features/launchpad/components/LaunchpadRowMeta";
import { LaunchpadRowMetrics } from "@/features/launchpad/components/LaunchpadRowMetrics";
import { LaunchpadRowProgress } from "@/features/launchpad/components/LaunchpadRowProgress";
import { LaunchpadRowChips } from "@/features/launchpad/components/LaunchpadRowChips";

export function LaunchpadRow({ item }: { item: LaunchpadItem }) {
  return (
    <div className="h-32.5 cursor-pointer bg-background px-4 py-2 transition-all hover:bg-linear-to-l hover:from-[#09001A] hover:via-[rgba(28,16,58,0.80)] hover:to-[rgba(36,23,71,0.50)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1.5">
          <LaunchpadRowHeader item={item} />
          <LaunchpadRowMeta item={item} />
          <LaunchpadRowProgress progress={item.progress} />
        </div>
        <LaunchpadRowMetrics metrics={item.metrics} />
      </div>
      <LaunchpadRowChips chips={item.chips} />
    </div>
  );
}
