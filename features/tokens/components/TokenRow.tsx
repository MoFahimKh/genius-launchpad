import { TrendingToken } from "@/features/tokens/types";

export function TokenRow({ token }: { token: TrendingToken }) {
  const changeClass = token.change24h >= 0 ? "text-emerald-600" : "text-rose-600";

  return (
    <tr className="border-t border-slate-100 text-sm">
      <td className="py-3 font-medium text-slate-900">{token.name}</td>
      <td className="text-slate-600">{token.symbol}</td>
      <td className="text-slate-900">${token.priceUsd.toFixed(2)}</td>
      <td className={changeClass}>{token.change24h.toFixed(2)}%</td>
    </tr>
  );
}
