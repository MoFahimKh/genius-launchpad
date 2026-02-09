"use client";

import { SectionCard } from "@/components/ui/SectionCard";
import { useTrendingTokens } from "@/features/tokens/api/useTrendingTokens";
import { TokenRow } from "@/features/tokens/components/TokenRow";

export function TokenTable() {
  const { data = [] } = useTrendingTokens();

  return (
    <SectionCard>
      <div className="mb-3 text-sm font-semibold text-slate-700">Market</div>
      <table className="w-full border-collapse text-left">
        <thead className="text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="pb-2">Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>24h</th>
          </tr>
        </thead>
        <tbody>
          {data.map((token) => (
            <TokenRow key={token.id} token={token} />
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}
