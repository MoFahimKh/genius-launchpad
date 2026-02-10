import { LaunchpadItem } from "@/features/launchpad/types";
import { LaunchpadCardHeader } from "@/features/launchpad/components/LaunchpadCardHeader";
import { LaunchpadCardMeta } from "@/features/launchpad/components/LaunchpadCardMeta";
import { LaunchpadCardMetrics } from "@/features/launchpad/components/LaunchpadCardMetrics";
import { LaunchpadCardProgress } from "@/features/launchpad/components/LaunchpadCardProgress";
import { LaunchpadCardBadges } from "@/features/launchpad/components/LaunchpadCardBadges";

export function LaunchpadCard({ item }: { item: LaunchpadItem }) {
  return (
    <div className="h-32.5 w-full max-w-full cursor-pointer overflow-hidden bg-background px-4 py-2 transition-all hover:bg-linear-to-l hover:from-[#09001A] hover:via-[rgba(28,16,58,0.80)] hover:to-[rgba(36,23,71,0.50)]">
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-1.5">
          <LaunchpadCardHeader item={item} />
          <LaunchpadCardMeta item={item} />
          <LaunchpadCardProgress progress={item.progress} />
        </div>
        <LaunchpadCardMetrics metrics={item.metrics} />
      </div>
      <LaunchpadCardBadges chips={item.chips} />
    </div>
  );
}
