import DexScreens from "@/components/icons/dex-screens";
import Virus from "@/components/icons/virus";
import { LaunchpadEvent } from "@/features/launchpad/api/useLaunchpadDataRealtime";
import { Chip, LaunchpadItem, Metric } from "@/features/launchpad/types";
import {
  formatAge,
  formatCompactNumber,
  formatCurrency,
  formatOptionalNumber,
  formatOptionalPercent,
  formatOptionalText,
  formatPercent,
  parseNumber
} from "@/utils";
import {
  Flame,
  LifeBuoy,
  Server,
  UserStar,
  ChefHat,
  Crosshair,
  HatGlasses
} from "lucide-react";


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
    { label: "TOP 10 H.", value: formatOptionalPercent(event.top10HeldPercentage), tone: "muted", icon: UserStar },
    { label: "DEV H.", value: formatPercent(event.devHeldPercentage), tone: "red", icon: ChefHat },
    { label: "SNIPERS H.", value: formatPercent(event.sniperHeldPercentage), tone: "orange", icon: Crosshair },
    { label: "INSIDERS H.", value: formatPercent(event.insiderHeldPercentage), tone: "orange", icon: HatGlasses  },
    { label: "BUNDLERS H.", value: formatPercent(event.bundlerHeldPercentage), tone: "blue", icon: Virus },
    { label: "Unpaid", value: formatOptionalPercent(event.unpaidPercentage), tone: "red", icon: LifeBuoy },
    { label: "DEX PAYMENT", value: formatOptionalText(event.dexPayment), tone: "muted", icon: DexScreens },
    { label: "Holders", value: formatOptionalNumber(event.holders), tone: "muted", icon: Server },
    { label: "LP BURNED", value: formatOptionalPercent(event.lpBurnedPercentage), tone: "green", icon: Flame }
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
      liquidityValue: parseNumber(event.liquidity),
      volumeValue: parseNumber(event.volume1),
      marketCapValue: parseNumber(event.marketCap),
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
