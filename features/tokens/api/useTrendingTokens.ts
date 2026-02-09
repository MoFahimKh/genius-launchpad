import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api/client";
import { TrendingToken } from "@/features/tokens/types";

export function useTrendingTokens() {
  return useQuery({
    queryKey: ["trendingTokens"],
    queryFn: () => apiGet<TrendingToken[]>("/tokens/trending")
  });
}
