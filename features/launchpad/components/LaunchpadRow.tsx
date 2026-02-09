import { LaunchpadItem } from "@/features/launchpad/types";
import { LaunchpadRowHeader } from "@/features/launchpad/components/LaunchpadRowHeader";
import { LaunchpadRowMeta } from "@/features/launchpad/components/LaunchpadRowMeta";
import { LaunchpadRowMetrics } from "@/features/launchpad/components/LaunchpadRowMetrics";
import { LaunchpadRowProgress } from "@/features/launchpad/components/LaunchpadRowProgress";
import { LaunchpadRowChips } from "@/features/launchpad/components/LaunchpadRowChips";

export function LaunchpadRow({ item }: { item: LaunchpadItem }) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
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
