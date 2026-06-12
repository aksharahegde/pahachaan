import {
  normalizePresenceLocations,
  VISITORS_CHANNEL_NAME,
} from "~/utils/ablyVisitors";
import type { VisitorLocation } from "~/utils/visitorGlobe";

type VisitorLocationResponse = {
  location: VisitorLocation | null;
};

type PresenceMessage = {
  clientId?: string;
  data?: unknown;
};

type Presence = {
  enter(data: unknown): Promise<void>;
  get(): Promise<PresenceMessage[]>;
  leave(): Promise<void>;
  subscribe(listener: (message: PresenceMessage) => void): Promise<void> | void;
  unsubscribe(listener: (message: PresenceMessage) => void): void;
};

type RealtimeChannel = {
  presence: Presence;
};

type RealtimeClient = {
  channels: {
    get(name: string): RealtimeChannel;
  };
  close(): void;
  connection: {
    on(
      state: string,
      listener: (change?: { reason?: { message?: string } }) => void,
    ): void;
  };
};

const CLIENT_ID_STORAGE_KEY = "pahachaan.visitor.clientId";

let client: RealtimeClient | null = null;
let channel: RealtimeChannel | null = null;
let initPromise: Promise<void> | null = null;
let hasEnteredPresence = false;
let isShuttingDown = false;

function getVisitorClientId(): string {
  const existing = window.sessionStorage.getItem(CLIENT_ID_STORAGE_KEY);

  if (existing) {
    return existing;
  }

  const next = `visitor-${crypto.randomUUID()}`;
  window.sessionStorage.setItem(CLIENT_ID_STORAGE_KEY, next);
  return next;
}

async function readVisitorLocation(): Promise<VisitorLocation | null> {
  const response = await $fetch<VisitorLocationResponse>("/api/visitors/location");
  return response.location;
}

function useAblyVisitorState() {
  const visitors = useState<number | null>("ably-visitors-count", () => null);
  const locations = useState<VisitorLocation[]>("ably-visitors-locations", () => []);
  const myLocation = useState<VisitorLocation | null>(
    "ably-visitors-location",
    () => null,
  );
  const isConnected = useState("ably-visitors-connected", () => false);
  const isLoading = useState("ably-visitors-loading", () => true);
  const error = useState<string | null>("ably-visitors-error", () => null);

  return {
    visitors,
    locations,
    myLocation,
    isConnected,
    isLoading,
    error,
  };
}

async function refreshPresence() {
  const state = useAblyVisitorState();

  if (!channel) {
    return;
  }

  const members = await channel.presence.get();
  state.locations.value = normalizePresenceLocations(members);
  state.visitors.value = members.length;
}

function handlePresenceChange() {
  const state = useAblyVisitorState();

  refreshPresence().catch((err) => {
    console.error("Failed to refresh visitor presence:", err);
    state.error.value = "Unable to refresh visitors";
  });
}

export async function initAblyVisitors() {
  if (!import.meta.client || isShuttingDown) {
    return;
  }

  if (initPromise) {
    return initPromise;
  }

  const state = useAblyVisitorState();

  initPromise = (async () => {
    state.isLoading.value = true;
    state.error.value = null;

    try {
      const [{ Realtime }, location] = await Promise.all([
        import("ably"),
        readVisitorLocation(),
      ]);
      const clientId = getVisitorClientId();

      state.myLocation.value = location;
      client = new Realtime({
        authUrl: `/api/visitors/ably-token?clientId=${encodeURIComponent(clientId)}`,
        authMethod: "GET",
        autoConnect: true,
      }) as RealtimeClient;
      channel = client.channels.get(VISITORS_CHANNEL_NAME);

      client.connection.on("connected", () => {
        state.isConnected.value = true;
        state.isLoading.value = false;
        state.error.value = null;
      });
      client.connection.on("disconnected", () => {
        state.isConnected.value = false;
      });
      client.connection.on("failed", (change) => {
        state.isConnected.value = false;
        state.isLoading.value = false;
        state.error.value = change?.reason?.message ?? "Visitor connection failed";
      });

      await channel.presence.subscribe(handlePresenceChange);
      await channel.presence.enter({ location });
      hasEnteredPresence = true;
      await refreshPresence();
      state.isLoading.value = false;
    } catch (err) {
      console.error("Failed to initialize Ably visitors:", err);
      state.isConnected.value = false;
      state.isLoading.value = false;
      state.error.value = "Visitor count unavailable";
      initPromise = null;
    }
  })();

  return initPromise;
}

export async function shutdownAblyVisitors() {
  if (!import.meta.client || !channel) {
    return;
  }

  isShuttingDown = true;

  if (initPromise) {
    try {
      await initPromise;
    } catch {
      // Ignore in-flight init failures during shutdown.
    }
  }

  channel.presence.unsubscribe(handlePresenceChange);

  if (hasEnteredPresence) {
    await channel.presence.leave().catch(() => {});
    hasEnteredPresence = false;
  }

  client?.close();
  client = null;
  channel = null;
  initPromise = null;
  isShuttingDown = false;

  const state = useAblyVisitorState();
  state.isConnected.value = false;
}

export function useAblyVisitors() {
  const state = useAblyVisitorState();

  return {
    ...state,
    reconnect: initAblyVisitors,
  };
}
