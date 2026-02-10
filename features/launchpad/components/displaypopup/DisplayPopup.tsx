import { useState } from "react";
import { useDisplayMetricsStore } from "@/features/launchpad/stores/useDisplayMetricsStore";
import { DisplayPopupHeader } from "@/features/launchpad/components/displaypopup/DisplayPopupHeader";
import { DisplayPopupSizeToggle } from "@/features/launchpad/components/displaypopup/DisplayPopupSizeToggle";
import { DisplayPopupTabs } from "@/features/launchpad/components/displaypopup/DisplayPopupTabs";
import { DisplayPopupMetricList } from "@/features/launchpad/components/displaypopup/DisplayPopupMetricList";

type DisplayPopupProps = {
  onClose: () => void;
};

export function DisplayPopup({ onClose }: DisplayPopupProps) {
  const { updateMetric, metrics, resetMetrics, setMetricSize } = useDisplayMetricsStore();
  const [selectedTab, setSelectedTab] = useState<string>("Layout");

  const tabs = ["Layout", "Metrics", "Row", "Other"];

  return (
    <div className="flex flex-col gap-4 text-foreground">
      <DisplayPopupHeader onReset={resetMetrics} onClose={onClose} />
      <DisplayPopupSizeToggle selectedSize={metrics.metricSize} onChange={setMetricSize} />
      <DisplayPopupTabs tabs={tabs} selectedTab={selectedTab} />
      <DisplayPopupMetricList metrics={metrics} onToggle={updateMetric} />
    </div>
  );
}
