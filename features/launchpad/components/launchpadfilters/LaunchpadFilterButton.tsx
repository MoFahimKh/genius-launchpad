"use client";

import { useState } from "react";
import { Settings2 } from "lucide-react";
import { Popup } from "@/components/common/Popup";
import { LaunchpadFilterPopup } from "@/features/launchpad/components/launchpadfilters/LaunchpadFilterPopup";
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
      onClose={() => setOpen(false)}
      trigger={
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="group flex h-[34px] items-center gap-1 rounded-sm border border-(--border) bg-(--surface) px-2 text-[14px] font-semibold text-foreground"
        >
          {label}
          <Settings2 className="lucide lucide-settings-2 h-4 w-4 transition-all duration-300 group-hover:text-genius-cream/50" />
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
