import { useState } from "react";
import { Circle, Grid2x2, Hash, LoaderCircle, Minus, RefreshCcw, Square, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
  const { updateMetric, metrics, resetMetrics } = useDisplayMetricsStore();
  const [selectedTab, setSelectedTab] = useState<string>("Layout");

  const tabs = ["Layout", "Metrics", "Row", "Other"];

  const [selectedSize, setSelectedSize] = useState<string>("small");

  return (
    <div className="flex flex-col gap-4 text-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span>Metrics</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={resetMetrics}
                className="inline-flex h-3 w-3 cursor-pointer items-center justify-center text-genius-cream transition-all duration-300 hover:opacity-70"
                aria-label="Reset to default"
              >
                <RefreshCcw className="lucide lucide-refresh-ccw h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Reset to Default</TooltipContent>
          </Tooltip>
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
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex w-full">
              <button
                type="button"
                disabled
                className={`text-xs flex flex-col items-center justify-center rounded-sm py-2 w-full transition-colors border border-(--border) h-13 cursor-not-allowed opacity-60 ${
                  selectedSize === "small"
                    && "bg-(--border)"
                }`}
              >
                <p className="text-foreground/33">M.Cap <span className="text-foreground">44k</span></p>
                <p className="text-foreground">Small</p>
              </button>
            </span>
          </TooltipTrigger>
          <TooltipContent>Coming soon</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex w-full">
              <button
                type="button"
                disabled
                className={`text-xs flex flex-col items-center justify-center rounded-sm py-2 w-full transition-colors border border-(--border) h-13 cursor-not-allowed opacity-60 ${
                  selectedSize === "large"
                    && "bg-(--border)"
                }`}
              >
                <p className="text-foreground/33">M.Cap <span className="text-foreground text-[16px]">44k</span></p>
                <p className="text-foreground">Large</p>
              </button>
            </span>
          </TooltipTrigger>
          <TooltipContent>Coming soon</TooltipContent>
        </Tooltip>
        </div>

      <div className="flex flex-row items-center gap-0 border border-(--border) rounded-sm font-medium p-1">
        {tabs.map((tab) => (
          <Tooltip key={tab}>
            <TooltipTrigger asChild>
              <span className="flex w-full">
                <button
                  type="button"
                  disabled
                  className={`text-xs flex items-center justify-center rounded-sm py-2 px-4 w-full transition-colors cursor-not-allowed opacity-60 ${
                    selectedTab === tab
                      ? "bg-(--border)"
                      : ""
                  }`}
                >
                  {tab}
                </button>
              </span>
            </TooltipTrigger>
            <TooltipContent>Coming soon</TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div>

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
