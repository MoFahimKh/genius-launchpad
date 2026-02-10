import { X } from "lucide-react";

type LaunchpadFilterPopupProps = {
  onClose: () => void;
};

const STATUS_TABS = ["New Pairs", "Almost There", "Migrated"];

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

export function LaunchpadFilterPopup({ onClose }: LaunchpadFilterPopupProps) {
  return (
    <div className="flex flex-col gap-4 text-foreground">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Filter</div>
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
        <div className="rounded-sm border border-(--border) bg-(--surface) px-3 py-2 text-sm text-(--muted)">
          Add name
        </div>
        <div className="rounded-sm border border-(--border) bg-(--surface) px-3 py-2 text-xs text-(--muted)">
          Adding names to filters allows you to save and toggle states. You don’t need to
          save filter names for filters to apply.
        </div>
      </div>

      <div className="flex gap-2 rounded-sm border border-(--border) bg-(--surface) p-1 text-xs text-(--muted)">
        {STATUS_TABS.map((tab, index) => (
          <div
            key={tab}
            className={`flex-1 rounded-sm px-3 py-1 text-center ${
              index === 0 ? "bg-(--surface-3) text-foreground" : ""
            }`}
          >
            {tab}
          </div>
        ))}
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
        className="rounded-sm bg-pink-300 px-4 py-2 text-sm font-semibold text-black"
      >
        Confirm Filters
      </button>
    </div>
  );
}
