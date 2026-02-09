import { LaunchpadItem } from "@/features/launchpad/types";
import { LaunchpadRow } from "@/features/launchpad/components/LaunchpadRow";

export function LaunchpadList({ items }: { items: LaunchpadItem[] }) {
  return (
    <div className="bg-background divide-y divide-(--border)">
      {items.map((item) => (
        <LaunchpadRow key={item.id} item={item} />
      ))}
    </div>
  );
}
