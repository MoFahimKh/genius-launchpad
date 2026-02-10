import DexScreens from "@/components/icons/dex-screens";
import Virus from "@/components/icons/virus";
import { LaunchpadEvent } from "@/features/launchpad/api/useLaunchpadDataRealtime";
import { Chip, LaunchpadItem, Metric } from "@/types/launchpad";
import {
  formatAge,
  formatCompactNumber,
  formatCurrency,
  formatOptionalNumber,
  formatOptionalPercent,
  formatPercent,
  parseNumber
} from "@/utils";
import {
  Flame,
  ChefHat,
  Crosshair,
  HatGlasses,
  Users
} from "lucide-react";

function resolveDexPaid(value: LaunchpadEvent["dexPayment"]) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.toLowerCase();
    return normalized === "paid" || normalized === "true" || normalized === "1";
  }
  return false;
}


function buildMetrics(event: LaunchpadEvent): Metric[] {
  return [
    { label: "M.Cap", value: formatCurrency(event.marketCap), rawValue: parseNumber(event.marketCap) },
    { label: "Vol", value: formatCurrency(event.volume1), rawValue: parseNumber(event.volume1) },
    { label: "Liq", value: formatCurrency(event.liquidity), rawValue: parseNumber(event.liquidity) },
    { label: "TX", value: formatCompactNumber(event.transactions1), rawValue: parseNumber(event.transactions1) }
  ];
}

const isMissingValue = (value: unknown) => value === undefined || value === null || value === "";

function buildChips(event: LaunchpadEvent, previous?: LaunchpadItem): Chip[] {
  const previousChips = previous?.chips ?? [];
  const previousByLabel = new Map(previousChips.map((chip) => [chip.label, chip]));
  const resolveChip = (label: string, value: unknown, factory: () => Chip) => {
    if (isMissingValue(value)) {
      const prev = previousByLabel.get(label);
      if (prev) return prev;
    }
    return factory();
  };
  const dexPaid = resolveDexPaid(event.dexPayment);
  return [
    resolveChip("DEV H.", event.devHeldPercentage, () => ({
      label: "DEV H.",
      value: formatPercent(event.devHeldPercentage),
      icon: ChefHat,
      val: event.devHeldPercentage
    })),
    resolveChip("SNIPERS H.", event.sniperHeldPercentage, () => ({
      label: "SNIPERS H.",
      value: formatPercent(event.sniperHeldPercentage),
      icon: Crosshair,
      val: event.sniperHeldPercentage
    })),
    resolveChip("INSIDERS H.", event.insiderHeldPercentage, () => ({
      label: "INSIDERS H.",
      value: formatPercent(event.insiderHeldPercentage),
      icon: HatGlasses,
      val: event.insiderHeldPercentage
    })),
    resolveChip("BUNDLERS H.", event.bundlerHeldPercentage, () => ({
      label: "BUNDLERS H.",
      value: formatPercent(event.bundlerHeldPercentage),
      icon: Virus,
      val: event.bundlerHeldPercentage
    })),
    resolveChip("DEX PAYMENT", event.dexPayment, () => ({
      label: "DEX PAYMENT",
      value: dexPaid ? "Paid" : "Unpaid",
      icon: DexScreens,
      val: dexPaid ? 1 : 0
    })),
    resolveChip("Holders", event.holders, () => ({
      label: "Holders",
      value: formatOptionalNumber(event.holders),
      icon: Users
    })),
    resolveChip("LP BURNED", event.lpBurnedPercentage, () => ({
      label: "LP BURNED",
      value: formatOptionalPercent(event.lpBurnedPercentage),
      icon: Flame,
      val: event.lpBurnedPercentage
    }))
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

export function mapWsToLaunchpadItems(
  events: LaunchpadEvent[],
  previousItems?: Map<string, LaunchpadItem>
): LaunchpadItem[] {
  return events.map((event) => {
    const previous = previousItems?.get(event.address);
    const graduationPercent = event.token?.launchpad?.graduationPercent ?? 0;
    return {
      id: event.address,
      name: resolveName(event),
      symbol: resolveSymbol(event),
      age: formatAge(event.token?.createdAt),
      networkId: event.networkId ?? event.token?.networkId,
      liquidityValue: parseNumber(event.liquidity),
      volumeValue: parseNumber(event.volume1),
      marketCapValue: parseNumber(event.marketCap),
      transactionsValue: parseNumber(event.transactions1),
      buysValue: parseNumber(event.buyCount1),
      dexPaid: resolveDexPaid(event.dexPayment),
      metrics: buildMetrics(event),
      progress: {
        percent: Math.min(100, Math.max(0, graduationPercent)),
        label: `${Math.min(100, Math.max(0, graduationPercent)).toFixed(0)}%`
      },
      chips: buildChips(event, previous),
      avatarUrl:
        event.token?.info?.imageSmallUrl ||
        event.token?.info?.imageThumbUrl ||
        event.token?.info?.imageLargeUrl,
      socialLinks: event.token?.socialLinks
    };
  });
}
