import { Chip } from "@/features/launchpad/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function LaunchpadCardBadges({ chips }: { chips: Chip[] }) {
  return (
    <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto text-[10px]">
      {chips.map((chip, index) => (
        <Tooltip key={`${chip.label}-${index}`}>
          <TooltipTrigger asChild>
            <div
              className={`flex h-5.25 min-w-14 shrink-0 items-center justify-center gap-1 rounded-sm border border-(--border) px-1.5 py-0.5 ${chip.val ? (chip.val > 50 ? "text-(--chip-green)" : "text-(--chip-red)") : "text-foreground"}`}
            >
              <chip.icon size={12} />
              {chip.value !== "" ? <span className="font-semibold">{chip.value}</span> : null}
            </div>
          </TooltipTrigger>
          <TooltipContent className="font-medium">{chip.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
