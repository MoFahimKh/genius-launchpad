import { Metric } from "@/types/launchpad";
import { useDisplayMetricsStore } from "../stores/useDisplayMetricsStore";
import { formatCompactNumber, formatCurrency } from "@/utils";

export function LaunchpadCardMetrics({ metrics }: { metrics: Metric[] }) {
  const showDecimals = useDisplayMetricsStore((state) => !state.metrics.showDecimals);
  const metricSize = useDisplayMetricsStore((state) => state.metrics.metricSize);
  const valueClassName =
    metricSize === "large"
      ? "text-[16px] leading-none"
      : "text-foreground";

  return (
    <div className="grid min-w-35 gap-1 text-right text-xs">
      <MetricCard metric={metrics[0]} showDecimals={showDecimals} valueClassName={valueClassName} />
      <div className="flex items-center justify-end gap-4">
        <MetricCard metric={metrics[1]} showDecimals={showDecimals} valueClassName={valueClassName} />
        <MetricCard metric={metrics[2]} showDecimals={showDecimals} valueClassName={valueClassName} />
      </div>
      <MetricCard metric={metrics[3]} showDecimals={showDecimals} valueClassName={valueClassName} />
    </div>
  );
}

function MetricCard({
  metric,
  showDecimals,
  valueClassName
}: {
  metric: Metric;
  showDecimals: boolean;
  valueClassName: string;
}) {
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
      <span className={`font-semibold tabular-nums ${valueClassName}`}>{displayValue}</span>
    </div>
  );
}
