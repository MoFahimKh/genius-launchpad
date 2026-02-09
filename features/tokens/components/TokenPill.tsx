import { TrendingToken } from "@/features/tokens/types";

export function TokenPill({ token }: { token: TrendingToken }) {
  return (
    <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium">
      {token.symbol}
    </div>
  );
}
