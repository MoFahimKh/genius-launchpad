"use client";

import { Zap } from "lucide-react";
import { LaunchpadColumn } from "@/features/launchpad/types";
import { ChainIcon } from "@/components/common/ChainIcon";
import { LaunchpadFilterButton } from "@/features/launchpad/components/LaunchpadFilterButton";

export function LaunchpadColumnHeader({ column }: { column: LaunchpadColumn }) {
  return (
    <div className="flex items-center justify-between border-b border-(--border) bg-[#160b30] px-4 py-3">
      <div className="text-md font-medium text-foreground">{column.title}</div>
      <div className="flex items-center gap-2 text-xs text-(--muted)">
        <div className="flex items-center gap-1 rounded-sm border border-(--border) bg-(--surface) px-2 py-1">
          <Zap size={14} className="text-(--accent)" />
          <span>{column.fee}</span>
          <ChainIcon size={16} />
        </div>
        <LaunchpadFilterButton label={column.filterLabel} />
      </div>
    </div>
  );
}
