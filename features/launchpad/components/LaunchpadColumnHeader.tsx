"use client";

import { Zap } from "lucide-react";
import { LaunchpadFiltersState, LaunchpadStatus } from "@/features/launchpad/filters";
import { LaunchpadColumn } from "@/types/launchpad";
import { ChainIcon } from "@/components/common/ChainIcon";
import { LaunchpadFilterButton } from "@/features/launchpad/components/launchpadfilters/LaunchpadFilterButton";

export function LaunchpadColumnHeader({
  column,
  status,
  filtersByStatus,
  onFiltersChange,
  onFiltersReset
}: {
  column: LaunchpadColumn;
  status: LaunchpadStatus;
  filtersByStatus: LaunchpadFiltersState;
  onFiltersChange: (status: LaunchpadStatus, next: LaunchpadFiltersState[LaunchpadStatus]) => void;
  onFiltersReset: (status: LaunchpadStatus) => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-(--border) bg-[#160b30] py-1 pl-4 pr-2">
      <div className="text-md font-semibold text-foreground">{column.title}</div>
      <div className="flex items-center gap-2 text-xs text-(--muted)">
        <div
          className="flex h-[34px] items-center gap-1 rounded-sm border border-(--border) bg-(--surface) px-2 text-(--text)/60 cursor-not-allowed"
          aria-disabled="true"
        >
          <Zap size={14} className="text-(--accent)" />
          <span>{column.fee}</span>
          <ChainIcon size={16} />
        </div>
        <LaunchpadFilterButton
          label={column.filterLabel}
          status={status}
          filtersByStatus={filtersByStatus}
          onChange={onFiltersChange}
          onReset={onFiltersReset}
        />
      </div>
    </div>
  );
}
