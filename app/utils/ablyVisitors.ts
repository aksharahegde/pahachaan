import type { VisitorLocation } from "./visitorGlobe";

export const VISITORS_CHANNEL_NAME = "site:visitors";

type HeaderValue = string | string[] | undefined;

type PresenceMemberLike = {
  clientId?: string;
  data?: unknown;
};

type VisitorPresenceData = {
  location?: VisitorLocation | null;
};

function getHeader(
  headers: Readonly<Record<string, HeaderValue>>,
  name: string,
): string | undefined {
  const value = headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

function toCoordinate(value: VisitorLocation["latitude"]): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const coordinate = Number(value);
  return Number.isFinite(coordinate) ? coordinate : null;
}

function isLatitude(value: number): boolean {
  return value >= -90 && value <= 90;
}

function isLongitude(value: number): boolean {
  return value >= -180 && value <= 180;
}

function isValidLocation(location: VisitorLocation | null | undefined): boolean {
  const latitude = toCoordinate(location?.latitude);
  const longitude = toCoordinate(location?.longitude);

  return (
    latitude !== null &&
    longitude !== null &&
    isLatitude(latitude) &&
    isLongitude(longitude)
  );
}

function isVisitorPresenceData(value: unknown): value is VisitorPresenceData {
  return typeof value === "object" && value !== null && "location" in value;
}

export function readVisitorLocationFromHeaders(
  headers: Readonly<Record<string, HeaderValue>>,
): VisitorLocation | null {
  const latitude = getHeader(headers, "x-vercel-ip-latitude");
  const longitude = getHeader(headers, "x-vercel-ip-longitude");
  const location = { latitude, longitude };

  return isValidLocation(location) ? location : null;
}

export function normalizePresenceLocations(
  members: readonly PresenceMemberLike[],
): VisitorLocation[] {
  const locations: VisitorLocation[] = [];

  for (const member of members) {
    if (!isVisitorPresenceData(member.data)) {
      continue;
    }

    const { location } = member.data;

    if (isValidLocation(location)) {
      locations.push(location);
    }
  }

  return locations;
}
