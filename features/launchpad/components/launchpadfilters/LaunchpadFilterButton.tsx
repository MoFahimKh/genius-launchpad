"use client";

import { useEffect, useState } from "react";
import { ChevronDown, RotateCw, Settings2 } from "lucide-react";
import { Popup } from "@/components/common/Popup";
import { LaunchpadFilterPopup } from "@/features/launchpad/components/launchpadfilters/LaunchpadFilterPopup";
import {
  LaunchpadFiltersState,
  LaunchpadStatus,
  countActiveFilters
} from "@/features/launchpad/filters";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type LaunchpadFilterButtonProps = {
  label: string;
  status: LaunchpadStatus;
  filtersByStatus: LaunchpadFiltersState;
  onChange: (status: LaunchpadStatus, next: LaunchpadFiltersState[LaunchpadStatus]) => void;
  onReset: (status: LaunchpadStatus) => void;
};

export function LaunchpadFilterButton({
  label,
  status,
  filtersByStatus,
  onChange,
  onReset
}: LaunchpadFilterButtonProps) {
  const [open, setOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState<LaunchpadStatus>(status);

  useEffect(() => {
    if (open) {
      setActiveStatus(status);
    }
  }, [open, status]);

  const currentFilters = filtersByStatus[status];
  const activeCount = countActiveFilters(currentFilters);
  const trimmedName = currentFilters.name?.trim();
  const hasName = Boolean(trimmedName);
  const displayLabel = hasName ? trimmedName : label;
  const showReset = activeCount > 0;

  return (
    <Popup
      open={open}
      onClose={() => setOpen(false)}
      trigger={
        <div className="flex h-8.5 items-center gap-2 rounded-sm border border-(--border) bg-(--surface) px-2 text-[14px] font-semibold text-foreground">
          {showReset ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onReset(status);
                  }}
                  className="inline-flex h-4 w-4 items-center justify-center text-genius-cream transition-all duration-300 hover:opacity-70"
                  aria-label="Remove Filter"
                >
                  <RotateCw className="lucide lucide-rotate-cw h-4 w-4 transition-all duration-300 hover:text-genius-cream/50" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Remove Filter</TooltipContent>
            </Tooltip>
          ) : null}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className={`group flex items-center gap-2 ${showReset ? "" : "pl-1"}`}
          >
            {activeCount > 0 ? (
              <span className="min-w-6 rounded-sm bg-(--surface-3) px-2 py-0.5 text-center text-[14px]">
                {activeCount}
              </span>
            ) : null}
            <span className="max-w-28 truncate">{displayLabel}</span>
            {hasName ? <ChevronDown className="h-4 w-4 text-(--muted)" /> : null}
            <Settings2 className="lucide lucide-settings-2 h-4 w-4 transition-all duration-300 group-hover:text-genius-cream/50" />
          </button>
        </div>
      }
      blurBackground
      center
      panelClassName="w-[400px] bg-background p-4 border border-transparent rounded-sm shadow-lg rounded-[5px]"
    >
      <LaunchpadFilterPopup
        filters={filtersByStatus}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        onChange={onChange}
        onReset={onReset}
        onClose={() => setOpen(false)}
      />
    </Popup>
  );
}
