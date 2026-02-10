import { RefreshCcw, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type DisplayPopupHeaderProps = {
  onReset: () => void;
  onClose: () => void;
};

export function DisplayPopupHeader({ onReset, onClose }: DisplayPopupHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span>Metrics</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onReset}
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
  );
}
