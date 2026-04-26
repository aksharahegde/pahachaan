import { onBeforeUnmount, onMounted } from "vue";

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

let activeConsumers = 0;
let client: RealtimeClient | null = null;
let channel: RealtimeChannel | null = null;
let initPromise: Promise<void> | null = null;
let hasEnteredPresence = false;

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

export function useAblyVisitors() {
  const visitors = useState("ably-visitors-count", () => 0);
  const locations = useState<VisitorLocation[]>("ably-visitors-locations", () => []);
  const myLocation = useState<VisitorLocation | null>(
    "ably-visitors-location",
    () => null,
  );
  const isConnected = useState("ably-visitors-connected", () => false);
  const isLoading = useState("ably-visitors-loading", () => true);
  const error = useState<string | null>("ably-visitors-error", () => null);

  async function refreshPresence() {
    if (!channel) {
      return;
    }

    const members = await channel.presence.get();
    locations.value = normalizePresenceLocations(members);
    visitors.value = members.length;
  }

  const handlePresenceChange = () => {
    refreshPresence().catch((err) => {
      console.error("Failed to refresh visitor presence:", err);
      error.value = "Unable to refresh visitors";
    });
  };

  async function init() {
    if (!import.meta.client) {
      return;
    }

    if (initPromise) {
      return initPromise;
    }

    initPromise = (async () => {
      isLoading.value = true;
      error.value = null;

      try {
        const [{ Realtime }, location] = await Promise.all([
          import("ably"),
          readVisitorLocation(),
        ]);
        const clientId = getVisitorClientId();

        myLocation.value = location;
        client = new Realtime({
          authUrl: `/api/visitors/ably-token?clientId=${encodeURIComponent(clientId)}`,
          authMethod: "GET",
          autoConnect: true,
        }) as RealtimeClient;
        channel = client.channels.get(VISITORS_CHANNEL_NAME);

        client.connection.on("connected", () => {
          isConnected.value = true;
          isLoading.value = false;
          error.value = null;
        });
        client.connection.on("disconnected", () => {
          isConnected.value = false;
        });
        client.connection.on("failed", (change) => {
          isConnected.value = false;
          isLoading.value = false;
          error.value = change?.reason?.message ?? "Visitor connection failed";
        });

        await channel.presence.subscribe(handlePresenceChange);
        await channel.presence.enter({ location });
        hasEnteredPresence = true;
        await refreshPresence();
        isLoading.value = false;
      } catch (err) {
        console.error("Failed to initialize Ably visitors:", err);
        isConnected.value = false;
        isLoading.value = false;
        error.value = "Visitor count unavailable";
        initPromise = null;
      }
    })();

    return initPromise;
  }

  async function cleanup() {
    activeConsumers = Math.max(0, activeConsumers - 1);

    if (activeConsumers > 0 || !channel) {
      return;
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
    isConnected.value = false;
  }

  onMounted(() => {
    activeConsumers += 1;
    init();
  });

  onBeforeUnmount(() => {
    cleanup();
  });

  return {
    visitors,
    locations,
    myLocation,
    isConnected,
    isLoading,
    error,
    reconnect: init,
  };
}
