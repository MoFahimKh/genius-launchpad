import {
  Circle,
  Grid2x2,
  Hash,
  LoaderCircle,
  Minus,
  Square
} from "lucide-react";
import { DisplayMetrics } from "@/features/launchpad/stores/useDisplayMetricsStore";

const FilledGrid = () => <Grid2x2 fill="currentColor" size={16} />;

const METRICS = [
  {
    key: "showDecimals",
    labels: ["decimals", "no decimals"],
    icon: [Hash, Hash]
  },
  {
    key: "shape",
    labels: ["circle", "square"],
    icon: [Circle, Square]
  },
  {
    key: "attachment",
    labels: ["detached", "attached"],
    icon: [LoaderCircle, Minus]
  },
  {
    key: "tableSpacing",
    labels: ["spaced table", "compact table"],
    icon: [Grid2x2, FilledGrid]
  }
];

type DisplayPopupMetricListProps = {
  metrics: DisplayMetrics;
  onToggle: (index: number) => void;
};

export function DisplayPopupMetricList({ metrics, onToggle }: DisplayPopupMetricListProps) {
  return (
    <div>
      {METRICS.map((metric, index) => {
        const Icon = metrics[metric.key as keyof DisplayMetrics]
          ? metric.icon[1]
          : metric.icon[0];
        const label = metrics[metric.key as keyof DisplayMetrics]
          ? metric.labels[1]
          : metric.labels[0];
        return (
          <div
            key={metric.labels[0]}
            onClick={() => onToggle(index)}
            className="flex flex-col gap-4 hover:bg-(--border) transition-all duration-100 rounded-sm cursor-pointer"
          >
            <div className="flex items-center gap-2 p-2">
              <Icon size={16} />
              <span className="text-md font-medium">{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
