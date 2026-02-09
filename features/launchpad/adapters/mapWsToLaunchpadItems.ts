import { LaunchpadEvent } from "@/features/launchpad/api/useLaunchpadDataRealtime";
import { Chip, LaunchpadItem, Metric } from "@/features/launchpad/types";

function formatCompactNumber(value?: number | string) {
  if (value === undefined || value === null) return "0";
  const num = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(num)) return String(value);
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
  return num.toFixed(2);
}

function formatCurrency(value?: number | string) {
  if (value === undefined || value === null) return "$0";
  const num = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(num)) return `$${value}`;
  return `$${formatCompactNumber(num)}`;
}

function formatPercent(value?: number | string) {
  if (value === undefined || value === null) return "0%";
  const num = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(num)) return `${value}%`;
  return `${num.toFixed(2)}%`;
}

function formatAge(createdAt?: number) {
  if (!createdAt) return "--";
  const ts = createdAt > 1e12 ? createdAt : createdAt * 1000;
  const diff = Math.max(0, Date.now() - ts);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}D ${hours % 24}h`;
  if (hours > 0) return `${hours}H ${minutes % 60}m`;
  return `${minutes}m ${Math.floor((diff % 60000) / 1000)}s`;
}

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
