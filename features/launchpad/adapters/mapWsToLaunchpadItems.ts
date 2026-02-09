import { LaunchpadEvent } from "@/features/launchpad/api/useLaunchpadDataRealtime";
import { Chip, LaunchpadItem, Metric } from "@/features/launchpad/types";
import { formatAge, formatCompactNumber, formatCurrency, formatPercent } from "@/utils";

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
    { label: "Dev", value: formatPercent(event.devHeldPercentage), tone: "red" },
    { label: "Insider", value: formatPercent(event.insiderHeldPercentage), tone: "orange" },
    { label: "Sniper", value: formatPercent(event.sniperHeldPercentage), tone: "orange" },
    { label: "Bundler", value: formatPercent(event.bundlerHeldPercentage), tone: "blue" },
    { label: "Holders", value: formatCompactNumber(event.holders), tone: "muted" }
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
