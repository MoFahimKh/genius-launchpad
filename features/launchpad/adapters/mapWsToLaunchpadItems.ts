import { LaunchpadEvent } from "@/features/launchpad/api/useLaunchpadDataRealtime";
import { Chip, LaunchpadItem, Metric } from "@/features/launchpad/types";
import {
  formatAge,
  formatCompactNumber,
  formatCurrency,
  formatOptionalNumber,
  formatOptionalPercent,
  formatOptionalText,
  formatPercent
} from "@/utils";

function buildMetrics(event: LaunchpadEvent): Metric[] {
  return [
    { label: "M.Cap", value: formatCurrency(event.marketCap) },
    { label: "Vol", value: formatCurrency(event.volume1) },
    { label: "Liq", value: formatCurrency(event.liquidity) },
    { label: "TX", value: formatCompactNumber(event.transactions1) }
  ];
}

function buildChips(event: LaunchpadEvent): Chip[] {
  return [
    { label: "TOP 10 H.", value: formatOptionalPercent(event.top10HeldPercentage), tone: "muted" },
    { label: "DEV H.", value: formatPercent(event.devHeldPercentage), tone: "red" },
    { label: "SNIPERS H.", value: formatPercent(event.sniperHeldPercentage), tone: "orange" },
    { label: "INSIDERS H.", value: formatPercent(event.insiderHeldPercentage), tone: "orange" },
    { label: "BUNDLERS H.", value: formatPercent(event.bundlerHeldPercentage), tone: "blue" },
    { label: "Unpaid", value: formatOptionalPercent(event.unpaidPercentage), tone: "red" },
    { label: "DEX PAYMENT", value: formatOptionalText(event.dexPayment), tone: "muted" },
    { label: "Holders", value: formatOptionalNumber(event.holders), tone: "muted" },
    { label: "LP BURNED", value: formatOptionalPercent(event.lpBurnedPercentage), tone: "green" }
  ];
}

function resolveName(event: LaunchpadEvent) {
  return (
    event.token?.info?.name ||
    event.token?.name ||
    event.token?.symbol ||
    event.launchpadName ||
    "Unknown"
  );
}

function resolveSymbol(event: LaunchpadEvent) {
  return event.token?.info?.symbol || event.token?.symbol || "";
}

export function mapWsToLaunchpadItems(events: LaunchpadEvent[]): LaunchpadItem[] {
  return events.map((event) => {
    const graduationPercent = event.token?.launchpad?.graduationPercent ?? 0;
    return {
      id: event.address,
      name: resolveName(event),
      symbol: resolveSymbol(event),
      age: formatAge(event.token?.createdAt),
      networkId: event.networkId ?? event.token?.networkId,
      metrics: buildMetrics(event),
      progress: {
        percent: Math.min(100, Math.max(0, graduationPercent)),
        label: `${Math.min(100, Math.max(0, graduationPercent)).toFixed(0)}%`
      },
      chips: buildChips(event),
      avatarUrl:
        event.token?.info?.imageSmallUrl ||
        event.token?.info?.imageThumbUrl ||
        event.token?.info?.imageLargeUrl
    };
  });
}
