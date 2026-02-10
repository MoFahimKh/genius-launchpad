"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Popup } from "@/components/common/Popup";
import { LaunchpadFilterPopup } from "@/features/launchpad/components/LaunchpadFilterPopup";

type LaunchpadFilterButtonProps = {
  label: string;
};

export function LaunchpadFilterButton({ label }: LaunchpadFilterButtonProps) {
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
      panelClassName="w-96"
    >
      <LaunchpadFilterPopup onClose={() => setOpen(false)} />
    </Popup>
  );
}
