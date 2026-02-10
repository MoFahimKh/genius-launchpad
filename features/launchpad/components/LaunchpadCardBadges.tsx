import { Chip } from "@/features/launchpad/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const toneStyles: Record<Chip["tone"], string> = {
  green: "bg-[var(--chip-green-bg)] text-[var(--chip-green)] border-[var(--chip-green)]/40",
  red: "bg-[var(--chip-red-bg)] text-[var(--chip-red)] border-[var(--chip-red)]/40",
  orange:
    "bg-[var(--chip-orange-bg)] text-[var(--chip-orange)] border-[var(--chip-orange)]/40",
  blue: "bg-[var(--chip-blue-bg)] text-[var(--chip-blue)] border-[var(--chip-blue)]/40",
  muted: "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)]"
};

const BADGE_TOOLTIPS: Record<string, string> = {
  "TOP 10 H.": "TOP10 H.",
  "DEV H.": "Dev Holds",
  "SNIPERS H.": "Snipers",
  "INSIDERS H.": "asset.insiders",
  "BUNDLERS H.": "asset.bundlers",
  Unpaid: "Unpaid",
  "DEX PAYMENT": "Dex Paid",
  Holders: "Holders",
  "LP BURNED": "LP Burnt"
};

export function LaunchpadCardBadges({ chips }: { chips: Chip[] }) {
  return (
    <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto text-[10px]">
      {chips.map((chip, index) => (
        <Tooltip key={`${chip.label}-${index}`}>
          <TooltipTrigger asChild>
            <div
              className={`flex h-5.25 min-w-14 shrink-0 items-center justify-center gap-1 rounded-sm border px-1.5 py-0.5 ${toneStyles[chip.tone]}`}
            >
              <span>{chip.label}</span>
              {chip.value !== "" ? <span className="font-semibold">{chip.value}</span> : null}
            </div>
          </TooltipTrigger>
          <TooltipContent>{BADGE_TOOLTIPS[chip.label] ?? chip.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
