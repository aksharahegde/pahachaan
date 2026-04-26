import { describe, expect, test } from "bun:test";

import {
  normalizePresenceLocations,
  readVisitorLocationFromHeaders,
} from "./ablyVisitors";

describe("Ably visitor helpers", () => {
  test("reads valid Vercel visitor coordinates from request headers", () => {
    expect(
      readVisitorLocationFromHeaders({
        "x-vercel-ip-latitude": "12.97",
        "x-vercel-ip-longitude": "77.59",
      }),
    ).toEqual({ latitude: "12.97", longitude: "77.59" });
  });

  test("omits missing and invalid request coordinates", () => {
    expect(
      readVisitorLocationFromHeaders({
        "x-vercel-ip-latitude": "91",
        "x-vercel-ip-longitude": "77.59",
      }),
    ).toBeNull();

    expect(readVisitorLocationFromHeaders({})).toBeNull();
  });

  test("normalizes Ably presence members with valid location data", () => {
    expect(
      normalizePresenceLocations([
        {
          clientId: "visitor-a",
          data: { location: { latitude: "12.97", longitude: "77.59" } },
        },
        {
          clientId: "visitor-b",
          data: { location: { latitude: 51.5, longitude: -0.12 } },
        },
        {
          clientId: "visitor-c",
          data: { location: { latitude: "91", longitude: "77.59" } },
        },
        {
          clientId: "visitor-d",
          data: {},
        },
      ]),
    ).toEqual([
      { latitude: "12.97", longitude: "77.59" },
      { latitude: 51.5, longitude: -0.12 },
    ]);
  });
});
