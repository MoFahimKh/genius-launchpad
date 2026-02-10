"use client";

import { useState } from "react";
import { SlidersHorizontal, Zap } from "lucide-react";
import { LaunchpadColumn } from "@/features/launchpad/types";
import { ChainIcon } from "@/components/common/ChainIcon";
import { Popup } from "@/components/common/Popup";
import { LaunchpadFilterPopup } from "@/features/launchpad/components/LaunchpadFilterPopup";

export function LaunchpadColumnHeader({ column }: { column: LaunchpadColumn }) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="flex items-center justify-between border-b border-(--border) bg-[#160b30] px-4 py-3">
      <div className="text-sm font-semibold text-foreground">{column.title}</div>
      <div className="flex items-center gap-2 text-xs text-(--muted)">
        <div className="flex items-center gap-1 rounded-sm border border-(--border) bg-(--surface) px-2 py-1">
          <Zap size={14} className="text-(--accent)" />
          <span>{column.fee}</span>
          <ChainIcon size={16} />
        </div>
        <Popup
          open={filterOpen}
          trigger={
            <button
              type="button"
              onClick={() => setFilterOpen((prev) => !prev)}
              className="flex items-center gap-1 rounded-sm border border-(--border) bg-(--surface) px-2 py-1 text-foreground"
            >
              <SlidersHorizontal size={14} />
              {column.filterLabel}
            </button>
          }
          blurBackground
          align="right"
          panelClassName="w-96"
        >
          <LaunchpadFilterPopup onClose={() => setFilterOpen(false)} />
        </Popup>
      </div>
    </div>
  );
}
