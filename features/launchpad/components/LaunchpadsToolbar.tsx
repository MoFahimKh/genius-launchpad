import { Settings2 } from "lucide-react";

const tabs = ["P1", "P2", "P3"];

export function LaunchpadsToolbar() {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 rounded-sm border border-(--border) bg-(--surface) px-2 py-1 text-xs text-(--muted)">
        {tabs.map((tab, index) => (
          <span
            key={tab}
            className={`rounded-sm text-sm px-1.5 py-px font-medium ${
              index === 0
                ? "bg-(--accent-2)/20 text-(--accent-2)"
                : "text-(--text)/50"
            }`}
          >
            {tab}
          </span>
        ))}
        <Settings2 size={14} className="text-(--muted)" />
      </div>
    </div>
  );
}
