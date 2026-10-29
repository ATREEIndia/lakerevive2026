import "./arcgisConfig";
import Point from "@arcgis/core/geometry/Point";
import * as locator from "@arcgis/core/rest/locator";
import type { LocationInfo } from "./types";

// Client-only: load with `await import("@/lib/geocode")`.

const GEOCODE_URL = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

export interface Suggestion {
  text: string;
  magicKey: string;
}

export async function suggest(text: string, near?: { lng: number; lat: number }): Promise<Suggestion[]> {
  const results = await locator.suggestLocations(GEOCODE_URL, {
    text,
    // Optional at runtime: biases results toward a point when we have one.
    location: (near ? new Point({ longitude: near.lng, latitude: near.lat }) : undefined) as Point,
  });
  return results
    .filter((s) => s.text && s.magicKey && !s.isCollection)
    .map((s) => ({ text: s.text!, magicKey: s.magicKey! }));
}

export async function geocode(text: string, magicKey?: string): Promise<LocationInfo | null> {
  const [candidate] = await locator.addressToLocations(GEOCODE_URL, {
    address: { SingleLine: text },
    magicKey,
    maxLocations: 1,
    outFields: ["PlaceName"],
  });
  if (!candidate?.location) return null;
  const { longitude, latitude } = candidate.location;
  return { lng: longitude!, lat: latitude!, label: candidate.address || text };
}
