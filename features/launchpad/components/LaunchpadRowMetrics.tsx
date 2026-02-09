import { Metric } from "@/features/launchpad/types";

export function LaunchpadRowMetrics({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid min-w-[140px] gap-1 text-right text-xs">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex items-center justify-end gap-2">
          <span className="text-[var(--muted-2)]">{metric.label}</span>
          <span className="text-[var(--text)]">{metric.value}</span>
        </div>
      ))}
    </div>
  );
}
