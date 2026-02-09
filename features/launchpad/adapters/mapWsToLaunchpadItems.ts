import { LaunchpadEvent } from "@/features/launchpad/api/useLaunchpadDataRealtime";
import { LaunchpadItem } from "@/features/launchpad/types";

export function mapWsToLaunchpadItems(_events: LaunchpadEvent[]): LaunchpadItem[] {
  // TODO: Replace mock data with websocket mapping once UI is approved.
  return [];
}
