import { Hexagon, SlidersHorizontal } from "lucide-react";

const tabs = ["P1", "P2", "P3"];

export function LaunchpadsToolbar() {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 rounded-[4px] border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs text-[var(--muted)]">
        {tabs.map((tab, index) => (
          <span
            key={tab}
            className={`rounded-[4px] px-3 py-1 ${
              index === 0
                ? "bg-[var(--surface-3)] text-[var(--text)]"
                : "text-[var(--muted)]"
            }`}
          >
            {tab}
          </span>
        ))}
        <SlidersHorizontal size={14} className="text-[var(--muted)]" />
      </div>
      <div className="flex items-center gap-2 rounded-[4px] border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text)]">
        <span className="text-[var(--muted)]">0</span>
        <span className="rounded-[4px] bg-[#f3ba2f]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#f3ba2f]">
          <Hexagon size={12} className="text-[#f3ba2f]" />
        </span>
      </div>
    </div>
  );
}
