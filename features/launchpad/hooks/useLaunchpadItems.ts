import { useEffect, useRef, useState } from "react";
import { LaunchpadEvent, WsRoomUpdateDto } from "@/features/launchpad/api/useLaunchpadDataRealtime";
import { mapWsToLaunchpadItems } from "@/features/launchpad/adapters/mapWsToLaunchpadItems";
import { LaunchpadItem } from "@/features/launchpad/types";

type UseLaunchpadItemsArgs = {
  lastEvents: LaunchpadEvent[] | null;
  launchpadData: WsRoomUpdateDto["data"] | null;
  networkId: number;
};

const MAX_ITEMS = 80;

function isLaunchpadEvent(value: unknown): value is LaunchpadEvent {
  return typeof value === "object" && value !== null && "address" in value;
}

function normalizeEvents(input: WsRoomUpdateDto["data"] | null): LaunchpadEvent[] {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.filter(isLaunchpadEvent);
  }
  if (typeof input === "object" && input) {
    const maybeEvents = (input as { launchpadEvent?: unknown }).launchpadEvent;
    if (Array.isArray(maybeEvents)) {
      return maybeEvents.filter(isLaunchpadEvent);
    }
  }
  return [];
}

export function useLaunchpadItems({ lastEvents, launchpadData, networkId }: UseLaunchpadItemsArgs) {
  const [items, setItems] = useState<LaunchpadItem[]>([]);
  const itemsByIdRef = useRef<Map<string, LaunchpadItem>>(new Map());
  const orderRef = useRef<string[]>([]);

  useEffect(() => {
    itemsByIdRef.current = new Map();
    orderRef.current = [];
    setItems([]);
  }, [networkId]);

  useEffect(() => {
    const snapshot = normalizeEvents(launchpadData);
    if (snapshot.length === 0) return;
    const nextItems = mapWsToLaunchpadItems(snapshot);
    itemsByIdRef.current = new Map(nextItems.map((item) => [item.id, item]));
    orderRef.current = nextItems.map((item) => item.id);
    setItems(nextItems.slice(0, MAX_ITEMS));
  }, [launchpadData]);

  useEffect(() => {
    if (!lastEvents || lastEvents.length === 0) return;
    const incomingItems = mapWsToLaunchpadItems(lastEvents, itemsByIdRef.current);
    const map = new Map(itemsByIdRef.current);
    const order = [...orderRef.current];

    incomingItems.forEach((item) => {
      if (!map.has(item.id)) {
        order.unshift(item.id);
      }
      map.set(item.id, item);
    });

    const nextOrder = order.filter((id) => map.has(id)).slice(0, MAX_ITEMS);
    const nextItems = nextOrder.map((id) => map.get(id)!).filter(Boolean);

    itemsByIdRef.current = map;
    orderRef.current = nextOrder;
    setItems(nextItems);
  }, [lastEvents]);

  return items;
}
