import { Chip } from "@/features/launchpad/types";

const toneStyles: Record<Chip["tone"], string> = {
  green: "bg-[var(--chip-green-bg)] text-[var(--chip-green)] border-[var(--chip-green)]/40",
  red: "bg-[var(--chip-red-bg)] text-[var(--chip-red)] border-[var(--chip-red)]/40",
  orange:
    "bg-[var(--chip-orange-bg)] text-[var(--chip-orange)] border-[var(--chip-orange)]/40",
  blue: "bg-[var(--chip-blue-bg)] text-[var(--chip-blue)] border-[var(--chip-blue)]/40",
  muted: "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)]"
};

export function LaunchpadCardBadges({ chips }: { chips: Chip[] }) {
  return (
    <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto text-[11px]">
      {chips.map((chip, index) => (
        <div
          key={`${chip.label}-${index}`}
          className={`flex h-5.25 min-w-14 shrink-0 items-center justify-center gap-1 rounded-sm border px-2 ${toneStyles[chip.tone]}`}
        >
          <span>{chip.label}</span>
          <span className="font-semibold">{chip.value}</span>
        </div>
      ))}
    </div>
  );
}
