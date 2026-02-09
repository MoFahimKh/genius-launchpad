import { SlidersHorizontal, Zap } from "lucide-react";
import { LaunchpadColumn } from "@/features/launchpad/types";

export function LaunchpadColumnHeader({ column }: { column: LaunchpadColumn }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)] bg-[#160b30] px-4 py-3">
      <div className="text-sm font-semibold text-[var(--text)]">{column.title}</div>
      <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
        <div className="flex items-center gap-1 rounded-[1px] border border-[var(--border)] bg-[var(--surface)] px-2 py-1">
          <Zap size={14} className="text-[var(--accent)]" />
          <span>{column.fee}</span>
          <span className="rounded-[1px] bg-[#f3ba2f]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#f3ba2f]">
            BSC
          </span>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 rounded-[1px] border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[var(--text)]"
        >
          <SlidersHorizontal size={14} />
          {column.filterLabel}
        </button>
      </div>
    </div>
  );
}
