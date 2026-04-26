export type VisitorLocation = {
  latitude?: number | string | null;
  longitude?: number | string | null;
};

export type GlobeMarker = {
  location: [number, number];
  size: number;
};

export type GlobeArc = {
  from: GlobeMarker["location"];
  to: GlobeMarker["location"];
};

type VisitorCoordinate = VisitorLocation["latitude"];

const MARKER_SIZE = 0.04;

function toCoordinate(value: VisitorCoordinate): number | null {
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

export function toVisitorMarkers(
  locations: readonly VisitorLocation[] | null | undefined,
): GlobeMarker[] {
  const markers: GlobeMarker[] = [];

  for (const location of locations ?? []) {
    const latitude = toCoordinate(location.latitude);
    const longitude = toCoordinate(location.longitude);

    if (
      latitude === null ||
      longitude === null ||
      !isLatitude(latitude) ||
      !isLongitude(longitude)
    ) {
      continue;
    }

    markers.push({
      location: [latitude, longitude],
      size: MARKER_SIZE,
    });
  }

  return markers;
}

export function toVisitorArcs(markers: readonly GlobeMarker[]): GlobeArc[] {
  const [origin, ...destinations] = markers;

  if (!origin) {
    return [];
  }

  return destinations.map((destination) => ({
    from: origin.location,
    to: destination.location,
  }));
}
