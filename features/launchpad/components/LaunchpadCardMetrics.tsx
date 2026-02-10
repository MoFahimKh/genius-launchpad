import { Metric } from "@/features/launchpad/types";
import { useDisplayMetricsStore } from "../stores/useDisplayMetricsStore";
import { formatCompactNumber, formatCurrency } from "@/utils";

export function LaunchpadCardMetrics({ metrics }: { metrics: Metric[] }) {
  const showDecimals = useDisplayMetricsStore((state) => !state.metrics.showDecimals);

  return (
    <div className="grid min-w-35 gap-1 text-right text-xs">
      <MetricCard metric={metrics[0]} showDecimals={showDecimals} />
      <div className="flex items-center justify-end gap-4">
        <MetricCard metric={metrics[1]} showDecimals={showDecimals} />
        <MetricCard metric={metrics[2]} showDecimals={showDecimals} />
      </div>
      <MetricCard metric={metrics[3]} showDecimals={showDecimals} />
    </div>
  );
}

function MetricCard({ metric, showDecimals }: { metric: Metric; showDecimals: boolean }) {
  const decimals = showDecimals ? 2 : 0;
  const displayValue =
    metric.rawValue !== undefined
      ? metric.label === "TX"
        ? formatCompactNumber(metric.rawValue, decimals)
        : formatCurrency(metric.rawValue, decimals)
      : metric.value === ""
        ? "--"
        : (metric.value ?? "--");

  return (
    <div key={metric.label} className="flex items-center justify-end gap-2">
      <span className="text-[#eee0ff80] font-medium">{metric.label}</span>
      <span className="text-foreground font-medium tabular-nums">{displayValue}</span>
    </div>
  );
}
