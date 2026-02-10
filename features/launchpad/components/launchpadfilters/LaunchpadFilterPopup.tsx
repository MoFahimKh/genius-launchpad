import { useEffect, useState } from "react";
import { ChevronDown, Pencil, RotateCw, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  LaunchpadFilterGroup,
  LaunchpadFiltersState,
  LaunchpadStatus,
  countActiveFilters
} from "@/features/launchpad/filters";

type LaunchpadFilterPopupProps = {
  filters: LaunchpadFiltersState;
  activeStatus: LaunchpadStatus;
  onStatusChange: (status: LaunchpadStatus) => void;
  onChange: (status: LaunchpadStatus, next: LaunchpadFilterGroup) => void;
  onReset: (status: LaunchpadStatus) => void;
  onClose: () => void;
};

const STATUS_TABS: { label: string; value: LaunchpadStatus }[] = [
  { label: "New Pairs", value: "new" },
  { label: "Almost There", value: "almost" },
  { label: "Migrated", value: "migrated" }
];

const SECTION_TABS = ["Metrics", "Audit", "Socials"];

const RANGE_FIELDS = [
  { key: "liquidity", label: "LIQUIDITY ($)" },
  { key: "volume", label: "VOLUME ($)" },
  { key: "marketCap", label: "M.CAP ($)" },
  { key: "transactions", label: "TRANSACTIONS" },
  { key: "buys", label: "BUYS" }
] as const;

export function LaunchpadFilterPopup({
  filters,
  activeStatus,
  onStatusChange,
  onChange,
  onReset,
  onClose
}: LaunchpadFilterPopupProps) {
  const currentFilters = filters[activeStatus];
  const activeCount = countActiveFilters(currentFilters);
  const [nameDraft, setNameDraft] = useState(currentFilters.name ?? "");

  useEffect(() => {
    setNameDraft(currentFilters.name ?? "");
  }, [activeStatus, currentFilters.name]);

  const updateRange = (
    key: (typeof RANGE_FIELDS)[number]["key"],
    field: "min" | "max",
    value: string
  ) => {
    const parsed = value === "" ? undefined : Number(value);
    onChange(activeStatus, {
      ...currentFilters,
      [key]: {
        ...currentFilters[key],
        [field]: Number.isFinite(parsed) ? parsed : undefined
      }
    });
  };

  const applyName = () => {
    onChange(activeStatus, {
      ...currentFilters,
      name: nameDraft.trim()
    });
  };

  return (
    <div className="flex flex-col gap-4 text-foreground font-semibold">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span>Filter</span>
          {activeCount > 0 ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => onReset(activeStatus)}
                  className="inline-flex h-4 w-4 cursor-pointer items-center justify-center text-genius-cream transition-all duration-300 hover:opacity-70"
                  aria-label="Remove Filter"
                >
                  <RotateCw className="lucide lucide-rotate-cw h-4 w-4 transition-all duration-300 hover:text-genius-cream/50" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Remove Filter</TooltipContent>
            </Tooltip>
          ) : null}
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
        <div className="flex items-center gap-2 rounded-sm border border-(--border) bg-(--surface) px-3 py-2 text-sm text-foreground">
          <Pencil className="h-4 w-4 text-(--muted)" />
          <input
            type="text"
            value={nameDraft}
            onChange={(event) => setNameDraft(event.target.value)}
            placeholder="Add name"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-(--muted) outline-none"
          />
          <button
            type="button"
            onClick={applyName}
            className="text-sm text-(--accent-2) hover:opacity-80"
          >
            Apply
          </button>
          <ChevronDown className="h-4 w-4 text-(--muted)" />
        </div>
        <div className="rounded-sm border border-(--border) bg-(--surface) px-3 py-2 text-xs text-(--muted)">
          Adding names to filters allows you to save and toggle states. You don’t need to
          save filter names for filters to apply.
        </div>
      </div>

      <div className="flex gap-2 rounded-sm border border-(--border) bg-(--surface) p-1 text-xs">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onStatusChange(tab.value)}
            className={`flex-1 rounded-sm px-3 py-1 text-center ${
              activeStatus === tab.value ? "bg-(--surface-3) text-foreground" : "text-(--muted)"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 rounded-sm border border-(--border) bg-(--surface) p-1 text-xs">
        {SECTION_TABS.map((tab, index) => (
          <button
            key={tab}
            type="button"
            disabled={index !== 0}
            className={`flex-1 rounded-sm px-3 py-1 text-center ${
              index === 0 ? "bg-(--surface-3) text-foreground" : "text-(--muted) opacity-70"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">Dex Paid</div>
        <button
          type="button"
          onClick={() =>
            onChange(activeStatus, {
              ...currentFilters,
              dexPaidOnly: !currentFilters.dexPaidOnly
            })
          }
          className={`flex h-5 w-9 items-center rounded-sm border border-(--border) bg-(--surface) p-0.5 ${
            currentFilters.dexPaidOnly ? "justify-end" : "justify-start"
          }`}
          aria-pressed={currentFilters.dexPaidOnly}
        >
          <span className="h-3.5 w-3.5 rounded-sm bg-pink-200" />
        </button>
      </div>

      <div className="grid gap-3">
        {RANGE_FIELDS.map((field) => (
          <div key={field.key} className="grid gap-2">
            <div className="text-xs text-(--muted)">{field.label}</div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={currentFilters[field.key].min ?? ""}
                onChange={(event) => updateRange(field.key, "min", event.target.value)}
                className="w-full rounded-sm border border-(--border) bg-(--surface) px-3 py-2 text-xs text-foreground placeholder:text-(--muted)"
              />
              <input
                type="number"
                placeholder="Max"
                value={currentFilters[field.key].max ?? ""}
                onChange={(event) => updateRange(field.key, "max", event.target.value)}
                className="w-full rounded-sm border border-(--border) bg-(--surface) px-3 py-2 text-xs text-foreground placeholder:text-(--muted)"
              />
            </div>
          </div>
        ))}
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
