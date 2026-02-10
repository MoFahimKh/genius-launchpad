import { ArrowLeftRight } from "lucide-react";
import { SectionCard } from "@/components/ui/SectionCard";

export function SwapPanel() {
  return (
    <SectionCard>
      <div className="flex items-center gap-2">
        <ArrowLeftRight size={18} className="text-(--accent)" />
        <h2 className="text-base font-semibold text-foreground">Swap</h2>
      </div>
      <p className="mt-3 text-sm text-(--muted)">
        Swap UI will live here. Keep this file focused and compose subcomponents for
        form fields, token selectors, and pricing rows.
      </p>
    </SectionCard>
  );
}
