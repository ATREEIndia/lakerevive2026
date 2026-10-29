import type { IslandResult } from "./calculations";
import type { LakeFeatures, LakeParameters, MapPoint, PlacementResult, Ring } from "./types";

// Builds the export file. GeoJSON (RFC 7946) wants closed rings with
// counter-clockwise exteriors; ArcGIS draws them clockwise, so rings are rewound.

function signedArea(ring: Ring): number {
  let sum = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    sum += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  return sum / 2;
}

function toGeoJsonRing(ring: Ring, exterior: boolean): Ring {
  const closed: Ring = [...ring];
  const [first, last] = [closed[0], closed[closed.length - 1]];
  if (first[0] !== last[0] || first[1] !== last[1]) closed.push(first);
  const isCcw = signedArea(closed) > 0;
  return isCcw === exterior ? closed : closed.reverse();
}

function polygonGeometry(rings: Ring[]) {
  return {
    type: "Polygon" as const,
    coordinates: rings.map((ring, i) => toGeoJsonRing(ring, i === 0)),
  };
}

function pointCollection(points: MapPoint[], prefix: string) {
  return {
    type: "FeatureCollection" as const,
    features: points.map((p, i) => ({
      type: "Feature" as const,
      id: p.id,
      properties: { name: `${prefix} ${i + 1}` },
      geometry: { type: "Point" as const, coordinates: [p.lng, p.lat] },
    })),
  };
}

export function buildExport(args: {
  features: LakeFeatures;
  areaM2: number | null;
  parameters: LakeParameters;
  result: IslandResult;
  placement: PlacementResult | null;
}) {
  const { features, areaM2, parameters, result, placement } = args;
  return {
    exportedAt: new Date().toISOString(),
    lake: features.lake && {
      type: "Feature" as const,
      properties: { areaM2 },
      geometry: polygonGeometry(features.lake),
    },
    inlets: pointCollection(features.inlets, "Inlet"),
    outlets: pointCollection(features.outlets, "Outlet"),
    parameters,
    results: result,
    islands: {
      type: "FeatureCollection" as const,
      features: (placement?.islands ?? []).map((island) => ({
        type: "Feature" as const,
        id: island.id,
        properties: {
          island: island.number,
          inlet: island.inletIndex + 1,
          centerLng: island.center[0],
          centerLat: island.center[1],
        },
        geometry: polygonGeometry([island.ring]),
      })),
    },
  };
}
