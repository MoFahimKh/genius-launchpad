import { Hexagon, SlidersHorizontal } from "lucide-react";

const tabs = ["P1", "P2", "P3"];

export function LaunchpadsToolbar() {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 rounded-sm border border-(--border) bg-(--surface) px-2 py-1 text-xs text-(--muted)">
        {tabs.map((tab, index) => (
          <span
            key={tab}
            className={`rounded-sm px-3 py-1 ${
              index === 0
                ? "bg-(--surface-3) text-foreground"
                : "text-(--muted)"
            }`}
          >
            {tab}
          </span>
        ))}
        <SlidersHorizontal size={14} className="text-(--muted)" />
      </div>
      <div className="flex items-center gap-2 rounded-sm border border-(--border) bg-(--surface) px-3 py-1 text-xs text-foreground">
        <span className="text-(--muted)">0</span>
        <span className="rounded-sm bg-[#f3ba2f]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#f3ba2f]">
          <Hexagon size={12} className="text-[#f3ba2f]" />
        </span>
      </div>
    </div>
  );
}
