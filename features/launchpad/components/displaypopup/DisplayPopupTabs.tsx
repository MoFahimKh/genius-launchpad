import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type DisplayPopupTabsProps = {
  tabs: string[];
  selectedTab: string;
};

export function DisplayPopupTabs({ tabs, selectedTab }: DisplayPopupTabsProps) {
  return (
    <div className="flex flex-row items-center gap-0 border border-(--border) rounded-sm font-medium p-1">
      {tabs.map((tab) => (
        <Tooltip key={tab}>
          <TooltipTrigger asChild>
            <span className="flex w-full">
              <button
                type="button"
                disabled
                className={`text-xs flex items-center justify-center rounded-sm py-2 px-4 w-full transition-colors cursor-not-allowed opacity-60 ${
                  selectedTab === tab ? "bg-(--border)" : ""
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
  );
}
