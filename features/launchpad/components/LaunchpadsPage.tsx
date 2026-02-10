"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { LaunchpadColumn } from "@/features/launchpad/components/LaunchpadColumn";
import { LaunchpadsHeader } from "@/features/launchpad/components/LaunchpadsHeader";
import { useLaunchpadDataRealtime } from "@/features/launchpad/api/useLaunchpadDataRealtime";
import { useLaunchpadItems } from "@/features/launchpad/hooks/useLaunchpadItems";
import { LaunchpadColumn as LaunchpadColumnType, LaunchpadItem } from "@/features/launchpad/types";
import { useNetworkId } from "@/features/launchpad/hooks/useNetworkId";
import { useLaunchpadFilters } from "@/features/launchpad/hooks/useLaunchpadFilters";
import { LaunchpadColumnSkeleton } from "@/features/launchpad/skeletons/LaunchpadColumnSkeleton";
import { useDisplayMetricsStore } from "../stores/useDisplayMetricsStore";

export function LaunchpadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const networkId = useNetworkId();

  const handleNetworkChange = useCallback(
    (nextNetworkId: number) => {
      const params = new URLSearchParams(searchParamsString);
      params.set("networkId", String(nextNetworkId));
      router.replace(`/launchpad?${params.toString()}`);
    },
    [router, searchParamsString]
  );

  const { lastEvents, launchpadData } = useLaunchpadDataRealtime({ networkId });
  const liveItems = useLaunchpadItems({ lastEvents, launchpadData, networkId });

  const liveColumns = useMemo<LaunchpadColumnType[]>(() => {
    if (liveItems.length === 0) return [];
    const newPairs: LaunchpadItem[] = [];
    const almostThere: LaunchpadItem[] = [];
    const graduated: LaunchpadItem[] = [];

    liveItems.forEach((item) => {
      const percent = item.progress?.percent ?? 0;
      if (percent >= 100) {
        graduated.push(item);
      } else if (percent >= 80) {
        almostThere.push(item);
      } else {
        newPairs.push(item);
      }
    });

    return [
      {
        id: "new-pairs",
        title: "New Pairs",
        fee: "0.025",
        filterLabel: "Filter",
        count: newPairs.length,
        items: newPairs
      },
      {
        id: "almost-there",
        title: "Almost There",
        fee: "0.025",
        filterLabel: "Filter",
        count: almostThere.length,
        items: almostThere
      },
      {
        id: "graduated",
        title: "Graduated",
        fee: "0.025",
        filterLabel: "Filter",
        count: graduated.length,
        items: graduated
      }
    ];
  }, [liveItems]);

  const { filtersByStatus, setFilterForStatus, resetFilterForStatus, filteredColumns } =
    useLaunchpadFilters(liveColumns);
  const showSkeleton = liveColumns.length === 0;
  const metrics = useDisplayMetricsStore(state => state.metrics);
  return (
    <Container>
      <div className="relative flex h-screen flex-col overflow-hidden py-6">
        <LaunchpadsHeader networkId={networkId} onNetworkChange={handleNetworkChange} />
        <div className={`mt-6 grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-3 ${metrics.tableSpacing ? "gap-4": "gap-0"}`}>
          {showSkeleton
            ? [0, 1, 2].map((index) => (
                <LaunchpadColumnSkeleton key={index} isFirst={index === 0} />
              ))
            : filteredColumns.map((column, index) => (
                <LaunchpadColumn
                  key={column.id}
                  column={column}
                  index={index}
                  filtersByStatus={filtersByStatus}
                  onFiltersChange={setFilterForStatus}
                  onFiltersReset={resetFilterForStatus}
                />
              ))}
        </div>
      </div>
    </Container>
  );
}
