"use client";

import { SectionCard } from "@/components/ui/SectionCard";
import { useTrendingTokens } from "@/features/tokens/api/useTrendingTokens";
import { TokenPill } from "@/features/tokens/components/TokenPill";

export function TrendingTokensStrip() {
  const { data = [] } = useTrendingTokens();

  return (
    <SectionCard>
      <div className="mb-3 text-sm font-semibold text-slate-700">Trending</div>
      <div className="flex flex-wrap gap-2">
        {data.slice(0, 6).map((token) => (
          <TokenPill key={token.id} token={token} />
        ))}
      </div>
    </SectionCard>
  );
}
