export type LaunchpadStatus = "new" | "almost" | "migrated";

export type RangeFilter = {
  min?: number;
  max?: number;
};

export type LaunchpadFilters = {
  statuses: LaunchpadStatus[];
  liquidity: RangeFilter;
  volume: RangeFilter;
};

export const defaultLaunchpadFilters: LaunchpadFilters = {
  statuses: [],
  liquidity: {},
  volume: {}
};
