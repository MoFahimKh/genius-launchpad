import { useCallback, useMemo, useState } from "react";
import {
  LaunchpadFiltersState,
  LaunchpadStatus,
  STATUS_BY_COLUMN_ID,
  createDefaultFilterGroup,
  defaultLaunchpadFiltersState
} from "@/features/launchpad/filters";
import { LaunchpadColumn } from "@/features/launchpad/types";

function withinRange(value: number | undefined, min?: number, max?: number) {
  if (value === undefined) return true;
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
}

export function useLaunchpadFilters(columns: LaunchpadColumn[]) {
  const [filtersByStatus, setFiltersByStatus] = useState<LaunchpadFiltersState>(
    defaultLaunchpadFiltersState
  );

  const setFilterForStatus = useCallback(
    (status: LaunchpadStatus, nextFilters: LaunchpadFiltersState[LaunchpadStatus]) => {
      setFiltersByStatus((prev) => ({ ...prev, [status]: nextFilters }));
    },
    []
  );

  const resetFilterForStatus = useCallback((status: LaunchpadStatus) => {
    setFiltersByStatus((prev) => ({ ...prev, [status]: createDefaultFilterGroup() }));
  }, []);

  const filteredColumns = useMemo(() => {
    if (columns.length === 0) return [];
    return columns.map((column) => {
      const status = STATUS_BY_COLUMN_ID[column.id];
      const filters = status ? filtersByStatus[status] : createDefaultFilterGroup();
      return {
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
          const marketCapOk = withinRange(
            item.marketCapValue,
            filters.marketCap.min,
            filters.marketCap.max
          );
          const transactionsOk = withinRange(
            item.transactionsValue,
            filters.transactions.min,
            filters.transactions.max
          );
          const buysOk = withinRange(
            item.buysValue,
            filters.buys.min,
            filters.buys.max
          );
          const dexPaidOk = filters.dexPaidOnly ? item.dexPaid === true : true;
          return liquidityOk && volumeOk && marketCapOk && transactionsOk && buysOk && dexPaidOk;
        })
      };
    });
  }, [columns, filtersByStatus]);

  return { filtersByStatus, setFilterForStatus, resetFilterForStatus, filteredColumns };
}
