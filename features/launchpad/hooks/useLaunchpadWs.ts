import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';



export interface LaunchpadParams {
  launchpadName?: string;
  networkId?: number;
}

export interface WsLaunchpadJoinRoomDto {
  roomType: 'launchpad';
  launchpadParams?: LaunchpadParams;
}

export interface WsJoinedRoomDto {
  room: string;
  rooms: string[];
  data?: any;
  timestamp?: number;
}

export interface WsRoomUpdateDto {
  timestamp: number;
  data?: any;
  launchpadEvent?: LaunchpadEvent[];
}

export interface LaunchpadEvent {
  address: string;
  eventType?: string;
  bundlerCount?: number;
  bundlerHeldPercentage?: number;
  buyCount1?: number;
  devHeldPercentage?: number;
  holders?: number;
  insiderCount?: number;
  insiderHeldPercentage?: number;
  launchpadName?: string;
  liquidity?: string;
  marketCap?: string;
  networkId?: number;
  price?: number;
  protocol?: string;
  sellCount1?: number;
  sniperCount?: number;
  sniperHeldPercentage?: number;
  transactions1?: number;
  volume1?: number;
  token?: {
    address: string;
    name: string;
    symbol: string;
    networkId: number;
    createdAt?: number;
    creatorAddress?: string;
    decimals?: number;
    info?: {
      name: string;
      symbol: string;
      description?: string;
      imageSmallUrl?: string;
      imageLargeUrl?: string;
      imageThumbUrl?: string;
    };
    launchpad?: {
      graduationPercent?: number;
      launchpadName?: string;
      launchpadProtocol?: string;
      completed?: boolean;
      completedAt?: number;
      migrated?: boolean;
      migratedAt?: number;
      poolAddress?: string;
      migratedPoolAddress?: string;
    };
    socialLinks?: {
      twitter?: string;
      telegram?: string;
      website?: string;
      discord?: string;
    };
  };
}

export interface UseLaunchpadDataRealtimeOptions {
  networkId?: number;
  launchpadName?: string;
  enabled?: boolean;
  showLogs?: boolean;
  onEvent?: (events: LaunchpadEvent[]) => void;
}

export function useLaunchpadDataRealtime({
  networkId,
  launchpadName,
  enabled = true,
  showLogs = false,
  onEvent,
}: UseLaunchpadDataRealtimeOptions) {
  const [launchpadData, setLaunchpadData] = useState<any | null>(null);
  const [lastEvents, setLastEvents] = useState<LaunchpadEvent[] | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const currentRoomRef = useRef<string | null>(null);
  const onEventRef = useRef(onEvent);
  const previousParamsRef = useRef<{ networkId?: number; launchpadName?: string } | null>(null);

  // Keep onEvent ref updated
  useEffect(() => {
    onEventRef.current = onEvent;
  }, [onEvent]);

  const wsUrl = 'https://dev-api.tradegenius.com'



  const leaveCurrentRoom = useCallback(() => {
    if (socketRef.current && currentRoomRef.current) {
      showLogs && console.log(`[useLaunchpadDataRealtime] Leaving room: ${currentRoomRef.current}`);

      // Stop listening to room updates
      socketRef.current.off(currentRoomRef.current);

      // Emit leave_room event
      socketRef.current.emit('leave_room', { room: currentRoomRef.current });

      currentRoomRef.current = null;
    }
  }, [showLogs]);

  const joinRoom = useCallback(
    (socket?: Socket) => {
      const socketToUse = socket || socketRef.current;
      if (!socketToUse) {
        showLogs && console.log('[useLaunchpadDataRealtime] joinRoom - no socket available');
        return;
      }

      const joinPayload: WsLaunchpadJoinRoomDto = {
        roomType: 'launchpad',
        launchpadParams: {
          ...(networkId && { networkId }),
          ...(launchpadName && { launchpadName }),
        },
      };

      showLogs && console.log('[useLaunchpadDataRealtime] Joining room with payload:', joinPayload);
      socketToUse.emit('join_room', joinPayload);
    },
    [networkId, launchpadName, showLogs]
  );

  useEffect(() => {
    if (!enabled || !wsUrl) {
      showLogs &&
        console.log('[useLaunchpadDataRealtime] Hook disabled or missing wsUrl', {
          enabled,
          wsUrl,
        });
      return;
    }

    // Check if params have changed
    const paramsChanged =
      previousParamsRef.current &&
      (previousParamsRef.current.networkId !== networkId ||
        previousParamsRef.current.launchpadName !== launchpadName);

    if (paramsChanged) {
      showLogs && console.log(`[useLaunchpadDataRealtime] Params changed, rejoining room`);
      leaveCurrentRoom();
      setLaunchpadData(null);
      setLastEvents(null);
    }

    // Update references
    previousParamsRef.current = { networkId, launchpadName };

    // Initialize socket if not already done
    if (!socketRef.current) {
      showLogs && console.log(`[useLaunchpadDataRealtime] Connecting to WebSocket at ${wsUrl}`);

      const socket = io(wsUrl, {
        path: '/data-ws/socket.io',
        transports: ['websocket'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      socket.on('connect', () => {
        showLogs &&
          console.log('[useLaunchpadDataRealtime] Connected to WebSocket, socket.id:', socket.id);
        setIsConnected(true);
        setError(null);
        // Join room after connection
        joinRoom(socket);
      });

      socket.on('disconnect', (reason) => {
        showLogs && console.log(`[useLaunchpadDataRealtime] Disconnected: ${reason}`);
        setIsConnected(false);
        currentRoomRef.current = null;
      });

      socket.on('connect_error', (err) => {
        showLogs && console.log(`[useLaunchpadDataRealtime] Connection error:`, err.message);
        setError(err.message);
        setIsConnected(false);
      });

      socket.on('joined_room', (data: WsJoinedRoomDto) => {
        showLogs &&
          console.log('[useLaunchpadDataRealtime] Joined room:', data.room, 'Full data:', data);
        currentRoomRef.current = data.room;

        // Handle initial data
        if (data.data) {
          showLogs && console.log('[useLaunchpadDataRealtime] Initial data received:', data.data);
          setLaunchpadData(data.data);
        }

        // Set up listener for room updates
        socket.on(data.room, (update: WsRoomUpdateDto) => {
          showLogs && console.log('[useLaunchpadDataRealtime] Room update received:', update);

          if (update.data) {
            setLaunchpadData(update.data);
          }

          if (update.launchpadEvent && update.launchpadEvent.length > 0) {
            setLastEvents(update.launchpadEvent);
            // Call the callback if provided
            if (onEventRef.current) {
              onEventRef.current(update.launchpadEvent);
            }
          }
        });
      });

      socket.on('left_room', (data) => {
        showLogs &&
          console.log(
            '[useLaunchpadDataRealtime] Left room:',
            data.room,
            'remaining rooms:',
            data.rooms
          );
      });

      socket.on('room_error', (error) => {
        showLogs && console.log('[useLaunchpadDataRealtime] Room error:', error);
        setError(error?.message || JSON.stringify(error));
      });

      socket.on('pong', (data) => {
        showLogs && console.log('[useLaunchpadDataRealtime] Pong received:', data);
      });

      // Listen to ALL events for debugging
      if (showLogs) {
        socket.onAny((eventName, ...args) => {
          console.log('[useLaunchpadDataRealtime] Event received:', eventName, args);
        });
      }

      socketRef.current = socket;
    } else if (socketRef.current.connected) {
      // Socket already connected, just join the room
      showLogs &&
        console.log('[useLaunchpadDataRealtime] Socket already connected, joining room...');
      joinRoom(socketRef.current);
    }

    return () => {
      // Cleanup on unmount or when dependencies change
      leaveCurrentRoom();
    };
  }, [networkId, launchpadName, enabled, wsUrl, joinRoom, leaveCurrentRoom, showLogs]);

  // Cleanup socket on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        showLogs && console.log('[useLaunchpadDataRealtime] Cleaning up socket connection');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [showLogs]);

  // Ping function for health check
  const ping = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('ping');
    }
  }, []);

  return {
    launchpadData,
    lastEvents,
    isConnected,
    error,
    ping,
  };
}