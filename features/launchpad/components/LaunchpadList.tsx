import { LaunchpadItem } from "@/features/launchpad/types";
import { LaunchpadCard } from "@/features/launchpad/components/LaunchpadCard";

export function LaunchpadList({ items }: { items: LaunchpadItem[] }) {
  return (
    <div className="bg-background divide-y divide-(--border)">
      {items.map((item) => (
        <LaunchpadCard key={item.id} item={item} />
      ))}
    </div>
  );
}
