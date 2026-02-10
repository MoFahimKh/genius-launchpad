import { LaunchpadFiltersState, LaunchpadStatus, STATUS_BY_COLUMN_ID } from "@/features/launchpad/filters";
import { LaunchpadColumn as LaunchpadColumnType } from "@/types/launchpad";
import { LaunchpadColumnHeader } from "@/features/launchpad/components/LaunchpadColumnHeader";
import { LaunchpadList } from "@/features/launchpad/components/LaunchpadList";
import { LaunchpadsToolbar } from "@/features/launchpad/components/LaunchpadsToolbar";

export function LaunchpadColumn({
  column,
  index,
  filtersByStatus,
  onFiltersChange,
  onFiltersReset,
}: {
  column: LaunchpadColumnType;
  index: number;
  filtersByStatus: LaunchpadFiltersState;
  onFiltersChange: (status: LaunchpadStatus, next: LaunchpadFiltersState[LaunchpadStatus]) => void;
  onFiltersReset: (status: LaunchpadStatus) => void;
}) {
  const status = STATUS_BY_COLUMN_ID[column.id];

  return (
    <div className={`flex h-full min-h-0 flex-col gap-3 ${index === 0 ? "" : "xl:-ml-px"}`}>
      <LaunchpadsToolbar />
      <div
        className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm border border-(--border) bg-(--surface-2) ${index === 2 && "rounded-l-none"} ${index === 0 && "rounded-r-none"} ${index === 1 && "rounded-l-none rounded-r-none"}`}
      >
        <LaunchpadColumnHeader
          column={column}
          status={status}
          filtersByStatus={filtersByStatus}
          onFiltersChange={onFiltersChange}
          onFiltersReset={onFiltersReset}
        />
        <LaunchpadList items={column.items} />
      </div>
    </div>
  );
}
