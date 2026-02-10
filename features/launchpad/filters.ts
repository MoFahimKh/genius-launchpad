export type LaunchpadStatus = "new" | "almost" | "migrated";

export type RangeFilter = {
  min?: number;
  max?: number;
};

export type LaunchpadFilterGroup = {
  name?: string;
  dexPaidOnly?: boolean;
  liquidity: RangeFilter;
  volume: RangeFilter;
  marketCap: RangeFilter;
  transactions: RangeFilter;
  buys: RangeFilter;
};

export type LaunchpadFiltersState = Record<LaunchpadStatus, LaunchpadFilterGroup>;

export const createDefaultFilterGroup = (): LaunchpadFilterGroup => ({
  name: "",
  dexPaidOnly: false,
  liquidity: {},
  volume: {},
  marketCap: {},
  transactions: {},
  buys: {}
});

export const defaultLaunchpadFiltersState: LaunchpadFiltersState = {
  new: createDefaultFilterGroup(),
  almost: createDefaultFilterGroup(),
  migrated: createDefaultFilterGroup()
};

export const STATUS_BY_COLUMN_ID: Record<string, LaunchpadStatus> = {
  "new-pairs": "new",
  "almost-there": "almost",
  graduated: "migrated"
};

export function countActiveFilters(group: LaunchpadFilterGroup) {
  let count = 0;
  if (group.liquidity.min !== undefined) count += 1;
  if (group.liquidity.max !== undefined) count += 1;
  if (group.volume.min !== undefined) count += 1;
  if (group.volume.max !== undefined) count += 1;
  if (group.marketCap.min !== undefined) count += 1;
  if (group.marketCap.max !== undefined) count += 1;
  if (group.transactions.min !== undefined) count += 1;
  if (group.transactions.max !== undefined) count += 1;
  if (group.buys.min !== undefined) count += 1;
  if (group.buys.max !== undefined) count += 1;
  if (group.dexPaidOnly) count += 1;
  return count;
}
