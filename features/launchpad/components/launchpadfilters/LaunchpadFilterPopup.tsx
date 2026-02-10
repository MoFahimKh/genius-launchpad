import { RefreshCcw, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LaunchpadFilters, LaunchpadStatus } from "@/features/launchpad/filters";

type LaunchpadFilterPopupProps = {
  filters: LaunchpadFilters;
  onChange: (next: LaunchpadFilters) => void;
  onClose: () => void;
};

const STATUS_TABS: { label: string; value: LaunchpadStatus }[] = [
  { label: "New Pairs", value: "new" },
  { label: "Almost There", value: "almost" },
  { label: "Migrated", value: "migrated" }
];

const LAUNCHPADS = [
  "Pump",
  "LaunchLab",
  "Bonk",
  "Dynamic BC",
  "Boop",
  "Moon.it",
  "Jupiter Studio",
  "Believe",
  "Cooking.City"
];

export function LaunchpadFilterPopup({ filters, onChange, onClose }: LaunchpadFilterPopupProps) {
  const toggleStatus = (status: LaunchpadStatus) => {
    const exists = filters.statuses.includes(status);
    const statuses = exists
      ? filters.statuses.filter((value) => value !== status)
      : [...filters.statuses, status];
    onChange({ ...filters, statuses });
  };

  const updateRange = (
    key: "liquidity" | "volume",
    field: "min" | "max",
    value: string
  ) => {
    const parsed = value === "" ? undefined : Number(value);
    onChange({
      ...filters,
      [key]: {
        ...filters[key],
        [field]: Number.isFinite(parsed) ? parsed : undefined
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 text-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span>Filter</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex h-3 w-3 cursor-pointer items-center justify-center text-(--muted) transition-all duration-300 hover:opacity-70"
                aria-label="Reset to default"
              >
                <RefreshCcw className="h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Reset to Default</TooltipContent>
          </Tooltip>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-sm p-1 text-(--muted) hover:text-foreground"
          aria-label="Close filter"
        >
          <X size={16} />
        </button>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Add name"
          className="w-full rounded-sm border border-(--border) bg-(--surface) px-3 py-2 text-sm text-foreground placeholder:text-(--muted)"
        />
        <div className="rounded-sm border border-(--border) bg-(--surface) px-3 py-2 text-xs text-(--muted)">
          Adding names to filters allows you to save and toggle states. You don’t need to
          save filter names for filters to apply.
        </div>
      </div>

      <div className="flex gap-2 rounded-sm border border-(--border) bg-(--surface) p-1 text-xs text-(--muted)">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => toggleStatus(tab.value)}
            className={`flex-1 rounded-sm px-3 py-1 text-center ${
              filters.statuses.includes(tab.value) ? "bg-(--surface-3) text-foreground" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        <div className="text-xs text-(--muted)">Liquidity ($)</div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.liquidity.min ?? ""}
            onChange={(event) => updateRange("liquidity", "min", event.target.value)}
            className="w-full rounded-sm border border-(--border) bg-(--surface) px-3 py-2 text-xs text-foreground placeholder:text-(--muted)"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.liquidity.max ?? ""}
            onChange={(event) => updateRange("liquidity", "max", event.target.value)}
            className="w-full rounded-sm border border-(--border) bg-(--surface) px-3 py-2 text-xs text-foreground placeholder:text-(--muted)"
          />
        </div>
        <div className="text-xs text-(--muted)">Volume ($)</div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.volume.min ?? ""}
            onChange={(event) => updateRange("volume", "min", event.target.value)}
            className="w-full rounded-sm border border-(--border) bg-(--surface) px-3 py-2 text-xs text-foreground placeholder:text-(--muted)"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.volume.max ?? ""}
            onChange={(event) => updateRange("volume", "max", event.target.value)}
            className="w-full rounded-sm border border-(--border) bg-(--surface) px-3 py-2 text-xs text-foreground placeholder:text-(--muted)"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-(--muted)">Launchpads</div>
        <div className="flex flex-wrap gap-2">
          {LAUNCHPADS.map((label) => (
            <div
              key={label}
              className="rounded-sm border border-(--border) bg-(--surface) px-3 py-2 text-xs text-(--muted)"
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">Dex Paid</div>
        <div className="h-5 w-9 rounded-full bg-(--surface-3)" />
      </div>

      <button
        type="button"
        onClick={onClose}
        className="rounded-sm bg-pink-300 px-4 py-2 text-sm font-semibold text-black"
      >
        Confirm Filters
      </button>
    </div>
  );
}
