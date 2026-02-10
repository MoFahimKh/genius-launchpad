import { LaunchpadFilters } from "@/features/launchpad/filters";
import { LaunchpadColumn as LaunchpadColumnType } from "@/features/launchpad/types";
import { LaunchpadColumnHeader } from "@/features/launchpad/components/LaunchpadColumnHeader";
import { LaunchpadList } from "@/features/launchpad/components/LaunchpadList";
import { LaunchpadsToolbar } from "@/features/launchpad/components/LaunchpadsToolbar";

export function LaunchpadColumn({
  column,
  isFirst,
  filters,
  onFiltersChange
}: {
  column: LaunchpadColumnType;
  isFirst?: boolean;
  filters: LaunchpadFilters;
  onFiltersChange: (next: LaunchpadFilters) => void;
}) {
  return (
    <div className={`flex flex-col gap-3 ${isFirst ? "" : "xl:-ml-px"}`}>
      <LaunchpadsToolbar />
      <div className="overflow-hidden rounded-sm border border-(--border) bg-(--surface-2)">
        <LaunchpadColumnHeader column={column} filters={filters} onFiltersChange={onFiltersChange} />
        <LaunchpadList items={column.items} />
      </div>
    </div>
  );
}
