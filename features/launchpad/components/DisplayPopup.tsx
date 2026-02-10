import { Circle, Grid2x2, Hash, LoaderCircle, Minus, RefreshCcw, Square, X } from "lucide-react";
import { DisplayMetrics, useDisplayMetricsStore } from "@/features/launchpad/stores/useDisplayMetricsStore";

type DisplayPopupProps = {
  onClose: () => void;
};

const FilledGrid = () => <Grid2x2 fill="currentColor" size={16}/>

const  METRICS= [
  {
    "key": "showDecimals",
    labels: ["decimals","no decimals"],
    icon: [Hash,Hash]
  },
  {
    "key": "shape",
    labels: ["circle","square"],
    icon: [Circle,Square]
  },
  {
    "key": "attachment",
    labels: ["detached","attached"],
    icon: [LoaderCircle,Minus]
  },
  {
    "key": "tableSpacing",
    labels: ["spaced table","compact table"],
    icon: [Grid2x2,FilledGrid]
  }
]

export function DisplayPopup({ onClose }: DisplayPopupProps) {
  const { updateMetric, metrics } = useDisplayMetricsStore();

  return (
    <div className="flex flex-col gap-4 text-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span>Metrics</span>
          <RefreshCcw size={16} />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-sm p-1 text-(--muted) hover:text-foreground"
          aria-label="Close display settings"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex flex-row items-center gap-4 font-medium">
        <button className="text-xs flex flex-col items-center justify-center rounded-sm bg-(--border) py-2 w-full">
          <p className="text-foreground/33">M.Cap <span className="text-foreground">44k</span></p>
          <p className="text-foreground">Small</p>
        </button>
        <button className="text-xs flex flex-col items-center justify-center rounded-sm border-(--border) py-2 w-full">
          <p className="text-foreground/33">M.Cap <span className="text-foreground text-[16px]">44k</span></p>
          <p className="text-foreground">Small</p>
        </button>
      </div>

      <div>
        {METRICS.map((metric, index) => {
          const Icon = metrics[metric.key as keyof DisplayMetrics] ? metric.icon[1] : metric.icon[0];
          const label = metrics[metric.key as keyof DisplayMetrics] ? metric.labels[1] : metric.labels[0];
          return (
            <div 
              key={metric.labels[0]} 
              onClick={() => updateMetric(index)}
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
    </div>
  );
}
