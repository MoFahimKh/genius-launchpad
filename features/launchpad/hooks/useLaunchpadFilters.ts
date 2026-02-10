import { useMemo, useState } from "react";
import { LaunchpadFilters, LaunchpadStatus, defaultLaunchpadFilters } from "@/features/launchpad/filters";
import { LaunchpadColumn } from "@/features/launchpad/types";

const STATUS_BY_COLUMN: Record<string, LaunchpadStatus> = {
  "new-pairs": "new",
  "almost-there": "almost",
  graduated: "migrated"
};

function withinRange(value: number | undefined, min?: number, max?: number) {
  if (value === undefined) return true;
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
}

export function useLaunchpadFilters(columns: LaunchpadColumn[]) {
  const [filters, setFilters] = useState<LaunchpadFilters>(defaultLaunchpadFilters);

  const filteredColumns = useMemo(() => {
    if (columns.length === 0) return [];
    return columns
      .filter((column) => {
        if (filters.statuses.length === 0) return true;
        const status = STATUS_BY_COLUMN[column.id];
        return status ? filters.statuses.includes(status) : true;
      })
      .map((column) => ({
        ...column,
        items: column.items.filter((item) => {
          const liquidityOk = withinRange(
            item.liquidityValue,
            filters.liquidity.min,
            filters.liquidity.max
          );
          const volumeOk = withinRange(
            item.volumeValue,
            filters.volume.min,
            filters.volume.max
          );
          return liquidityOk && volumeOk;
        })
      }));
  }, [columns, filters]);

  return { filters, setFilters, filteredColumns };
}
