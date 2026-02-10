import { Metric } from "@/features/launchpad/types";

export function LaunchpadCardMetrics({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid min-w-35 gap-1 text-right text-xs">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex items-center justify-end gap-2">
          <span className="text-(--muted-2)">{metric.label}</span>
          <span className="text-foreground">{metric.value}</span>
        </div>
      ))}
    </div>
  );
}
