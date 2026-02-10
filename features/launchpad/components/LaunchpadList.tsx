import { LaunchpadItem } from "@/features/launchpad/types";
import { LaunchpadCard } from "@/features/launchpad/components/LaunchpadCard";
import { NothingHereYet } from "@/components/common/NothingHereYet";

export function LaunchpadList({ items }: { items: LaunchpadItem[] }) {
  return (
    <div className="bg-background divide-y divide-(--border)">
      {items.length === 0 ? (
        <NothingHereYet />
      ) : (
        items.map((item) => <LaunchpadCard key={item.id} item={item} />)
      )}
    </div>
  );
}
