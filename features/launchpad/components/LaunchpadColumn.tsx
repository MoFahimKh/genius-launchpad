import { LaunchpadFilters } from "@/features/launchpad/filters";
import { LaunchpadColumn as LaunchpadColumnType } from "@/features/launchpad/types";
import { LaunchpadColumnHeader } from "@/features/launchpad/components/LaunchpadColumnHeader";
import { LaunchpadList } from "@/features/launchpad/components/LaunchpadList";
import { LaunchpadsToolbar } from "@/features/launchpad/components/LaunchpadsToolbar";

export function LaunchpadColumn({
  column,
  index,
  filters,
  onFiltersChange,
}: {
  column: LaunchpadColumnType;
  index: number;
  filters: LaunchpadFilters;
  onFiltersChange: (next: LaunchpadFilters) => void;
}) {
  return (
    <div className={`flex h-full min-h-0 flex-col gap-3 ${index === 0 ? "" : "xl:-ml-px"}`}>
      <LaunchpadsToolbar />
      <div
        className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm border border-(--border) bg-(--surface-2) ${index === 2 && "rounded-l-none"} ${index === 0 && "rounded-r-none"} ${index === 1 && "rounded-l-none rounded-r-none"}`}
      >
        <LaunchpadColumnHeader
          column={column}
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
        <LaunchpadList items={column.items} />
      </div>
    </div>
  );
}
