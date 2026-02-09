import { LaunchpadColumn as LaunchpadColumnType } from "@/features/launchpad/types";
import { LaunchpadColumnHeader } from "@/features/launchpad/components/LaunchpadColumnHeader";
import { LaunchpadList } from "@/features/launchpad/components/LaunchpadList";
import { LaunchpadsToolbar } from "@/features/launchpad/components/LaunchpadsToolbar";

export function LaunchpadColumn({
  column,
  isFirst
}: {
  column: LaunchpadColumnType;
  isFirst?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-3 ${isFirst ? "" : "xl:-ml-px"}`}>
      <LaunchpadsToolbar />
      <div className="overflow-hidden rounded-[4px] border border-[var(--border)] bg-[var(--surface-2)]">
        <LaunchpadColumnHeader column={column} />
        <LaunchpadList items={column.items} />
      </div>
    </div>
  );
}
