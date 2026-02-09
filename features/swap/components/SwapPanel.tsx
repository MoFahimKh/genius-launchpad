import { SectionCard } from "@/components/ui/SectionCard";
import { SwapIcon } from "@/components/icons";

export function SwapPanel() {
  return (
    <SectionCard>
      <div className="flex items-center gap-2">
        <SwapIcon size={18} />
        <h2 className="text-base font-semibold text-slate-900">Swap</h2>
      </div>
      <p className="mt-3 text-sm text-slate-600">
        Swap UI will live here. Keep this file focused and compose subcomponents for
        form fields, token selectors, and pricing rows.
      </p>
    </SectionCard>
  );
}
