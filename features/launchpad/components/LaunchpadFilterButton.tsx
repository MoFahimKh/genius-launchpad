"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Popup } from "@/components/common/Popup";
import { LaunchpadFilterPopup } from "@/features/launchpad/components/LaunchpadFilterPopup";
import { LaunchpadFilters } from "@/features/launchpad/filters";

type LaunchpadFilterButtonProps = {
  label: string;
  filters: LaunchpadFilters;
  onChange: (next: LaunchpadFilters) => void;
};

export function LaunchpadFilterButton({ label, filters, onChange }: LaunchpadFilterButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popup
      open={open}
      trigger={
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1 rounded-sm border border-(--border) bg-(--surface) px-2 py-1 text-foreground"
        >
          <SlidersHorizontal size={14} />
          {label}
        </button>
      }
      blurBackground
      center
      panelClassName="w-[400px] bg-background p-4 border border-transparent rounded-sm shadow-lg rounded-[5px]"
    >
      <LaunchpadFilterPopup filters={filters} onChange={onChange} onClose={() => setOpen(false)} />
    </Popup>
  );
}
