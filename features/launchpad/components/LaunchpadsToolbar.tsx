import { Settings2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const tabs = ["P1", "P2", "P3"];

export function LaunchpadsToolbar() {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 rounded-sm border border-(--border) bg-(--surface) px-2 py-1 text-xs text-(--muted)">
        {tabs.map((tab) => (
          <Tooltip key={tab}>
            <TooltipTrigger asChild>
              <span
                className="rounded-sm px-1.5 py-px text-sm font-medium text-(--text)/40 cursor-not-allowed"
                aria-disabled="true"
              >
                {tab}
              </span>
            </TooltipTrigger>
            <TooltipContent>Coming soon</TooltipContent>
          </Tooltip>
        ))}
        <Settings2 size={14} className="text-(--muted)" />
      </div>
    </div>
  );
}
