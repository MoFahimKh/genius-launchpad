import { create } from "zustand";

export type DisplayMetrics = {
  showDecimals: boolean; // false = decimals, true = no decimals
  shape: boolean; // false = circle, true = square
  attachment: boolean; // false = detached, true = attached
  tableSpacing: boolean; // false = spaced table, true = compact table
};

const defaultDisplayMetrics: DisplayMetrics = {
  showDecimals: false,
  shape: false,
  attachment: false,
  tableSpacing: false,
};

interface DisplayMetricsStore {
  metrics: DisplayMetrics;
  toggleDecimals: () => void;
  toggleShape: () => void;
  toggleAttachment: () => void;
  toggleTableSpacing: () => void;
  updateMetric: (index: number) => void;
}

export const useDisplayMetricsStore = create<DisplayMetricsStore>((set) => ({
  metrics: defaultDisplayMetrics,
  toggleDecimals: () =>
    set((state) => ({
      metrics: { ...state.metrics, showDecimals: !state.metrics.showDecimals },
    })),
  toggleShape: () =>
    set((state) => ({
      metrics: { ...state.metrics, shape: !state.metrics.shape },
    })),
  toggleAttachment: () =>
    set((state) => ({
      metrics: { ...state.metrics, attachment: !state.metrics.attachment },
    })),
  toggleTableSpacing: () =>
    set((state) => ({
      metrics: { ...state.metrics, tableSpacing: !state.metrics.tableSpacing },
    })),
  updateMetric: (index: number) =>
    set((state) => {
      switch (index) {
        case 0:
          return {
            metrics: { ...state.metrics, showDecimals: !state.metrics.showDecimals },
          };
        case 1:
          return {
            metrics: { ...state.metrics, shape: !state.metrics.shape },
          };
        case 2:
          return {
            metrics: { ...state.metrics, attachment: !state.metrics.attachment },
          };
        case 3:
          return {
            metrics: { ...state.metrics, tableSpacing: !state.metrics.tableSpacing },
          };
        default:
          return state;
      }
    }),
}));
