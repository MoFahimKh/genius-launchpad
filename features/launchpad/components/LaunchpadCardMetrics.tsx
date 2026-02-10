import { Metric } from "@/features/launchpad/types";

export function LaunchpadCardMetrics({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid min-w-35 gap-1 text-right text-xs">
      <MetricCard metric={metrics[0]} />
      <div className="flex items-center gap-2">
        <MetricCard metric={metrics[1]} />
        <MetricCard metric={metrics[2]} />
      </div>
      <MetricCard metric={metrics[3]}/>
    </div>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div key={metric.label} className="flex items-center justify-end gap-2">
      <span className="text-[#eee0ff80] font-medium">{metric.label}</span>
      <span className="text-foreground font-medium">{metric.value}</span>
    </div>
  );
}
