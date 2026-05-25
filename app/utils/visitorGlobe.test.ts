import { describe, expect, test } from "bun:test";

import { toVisitorArcs, toVisitorMarkers } from "./visitorGlobe";

describe("visitor globe utilities", () => {
  test("maps real visitor coordinates to cobe markers", () => {
    expect(
      toVisitorMarkers([
        { latitude: "12.97", longitude: "77.59" },
        { latitude: 51.5, longitude: -0.12 },
      ]),
    ).toEqual([
      { location: [12.97, 77.59], size: 0.04 },
      { location: [51.5, -0.12], size: 0.04 },
    ]);
  });

  test("drops missing and invalid visitor coordinates", () => {
    expect(
      toVisitorMarkers([
        { latitude: "0", longitude: "0" },
        { latitude: "91", longitude: "77.59" },
        { latitude: "12.97", longitude: "181" },
        { latitude: undefined, longitude: "77.59" },
      ]),
    ).toEqual([{ location: [0, 0], size: 0.04 }]);
  });

  test("maps markers to arcs from the first visitor", () => {
    expect(
      toVisitorArcs([
        { location: [12.97, 77.59], size: 0.04 },
        { location: [51.5, -0.12], size: 0.04 },
        { location: [40.71, -74], size: 0.04 },
      ]),
    ).toEqual([
      { from: [12.97, 77.59], to: [51.5, -0.12] },
      { from: [12.97, 77.59], to: [40.71, -74] },
    ]);
  });
});
