import { Flame, Star, Clock, Hexagon, SlidersHorizontal } from "lucide-react";

export function LaunchpadsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[var(--muted)]">
          <Flame size={18} />
          <Star size={18} />
          <Clock size={18} />
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-[var(--text)]">Launchpads</h1>
          <SlidersHorizontal size={14} className="text-[var(--muted)]" />
          <span className="rounded bg-[#f3ba2f]/20 px-1.5 py-0.5 text-[10px] text-[#f3ba2f]">
            <Hexagon size={12} className="text-[#f3ba2f]" />
          </span>
        </div>
      </div>
      <button
        type="button"
        className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm font-medium text-[var(--text)] shadow-sm"
      >
        Display
      </button>
    </div>
  );
}
