import { Chip } from "@/features/launchpad/types";

const toneStyles: Record<Chip["tone"], string> = {
  green: "bg-[var(--chip-green-bg)] text-[var(--chip-green)] border-[var(--chip-green)]/40",
  red: "bg-[var(--chip-red-bg)] text-[var(--chip-red)] border-[var(--chip-red)]/40",
  orange:
    "bg-[var(--chip-orange-bg)] text-[var(--chip-orange)] border-[var(--chip-orange)]/40",
  blue: "bg-[var(--chip-blue-bg)] text-[var(--chip-blue)] border-[var(--chip-blue)]/40",
  muted: "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)]"
};

export function LaunchpadRowChips({ chips }: { chips: Chip[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
      {chips.map((chip, index) => (
        <div
          key={`${chip.label}-${index}`}
          className={`flex h-[21px] min-w-[56px] items-center justify-center gap-1 rounded-[4px] border px-2 ${toneStyles[chip.tone]}`}
        >
          <span>{chip.label}</span>
          <span className="font-semibold">{chip.value}</span>
        </div>
      ))}
    </div>
  );
}
