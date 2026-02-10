import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

const DEFAULT_NETWORK_ID = 56;

export function useNetworkId(defaultNetworkId = DEFAULT_NETWORK_ID) {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  return useMemo(() => {
    const params = new URLSearchParams(searchParamsString);
    const param = params.get("networkId");
    const parsed = param ? Number(param) : defaultNetworkId;
    return Number.isFinite(parsed) ? parsed : defaultNetworkId;
  }, [defaultNetworkId, searchParamsString]);
}
