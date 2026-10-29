import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import * as containsOperator from "@arcgis/core/geometry/operators/containsOperator";
import * as geodeticAreaOperator from "@arcgis/core/geometry/operators/geodeticAreaOperator";
import * as proximityOperator from "@arcgis/core/geometry/operators/proximityOperator";
import * as simplifyOperator from "@arcgis/core/geometry/operators/simplifyOperator";
import { lngLatToXY, xyToLngLat } from "@arcgis/core/geometry/support/webMercatorUtils";
import { POINT_TOLERANCE_M } from "./constants";
import type { LngLat, MapPoint, Ring } from "./types";

// Client-only ArcGIS geometry helpers. The map works in Web Mercator; app state
// is stored in WGS84, so everything crossing that boundary goes through here.

export const WEB_MERCATOR = SpatialReference.WebMercator;

/** Web Mercator units per ground metre at a given latitude. */
export function mercatorScale(lat: number): number {
  return 1 / Math.cos((lat * Math.PI) / 180);
}

export function toMercatorXY(lng: number, lat: number): [number, number] {
  return lngLatToXY(lng, lat) as [number, number];
}

export function toLngLat(x: number, y: number): LngLat {
  return xyToLngLat(x, y) as LngLat;
}

export function mercatorPoint(lng: number, lat: number): Point {
  const [x, y] = toMercatorXY(lng, lat);
  return new Point({ x, y, spatialReference: WEB_MERCATOR });
}

export function mercatorPolygon(rings: Ring[]): Polygon {
  return new Polygon({
    rings: rings.map((ring) => ring.map(([lng, lat]) => toMercatorXY(lng, lat))),
    spatialReference: WEB_MERCATOR,
  });
}

/** Simplifies a sketched (Web Mercator) polygon and converts it to WGS84 rings. */
export function ringsFromPolygon(polygon: Polygon): Ring[] | null {
  const simple = (simplifyOperator.execute(polygon) as Polygon | null) ?? polygon;
  const rings = simple.rings.map((ring) => ring.map(([x, y]) => toLngLat(x, y)));
  return rings.length > 0 && rings[0].length >= 4 ? rings : null;
}

export function lngLatFromPoint(point: Point): { lng: number; lat: number } {
  const [lng, lat] = toLngLat(point.x, point.y);
  return { lng, lat };
}

export async function geodesicAreaM2(rings: Ring[]): Promise<number> {
  if (!geodeticAreaOperator.isLoaded()) await geodeticAreaOperator.load();
  const polygon = new Polygon({ rings, spatialReference: SpatialReference.WGS84 });
  return Math.abs(geodeticAreaOperator.execute(polygon, { unit: "square-meters" }));
}

/** IDs of points that are outside the lake by more than POINT_TOLERANCE_M. */
export function findFarPoints(rings: Ring[], points: MapPoint[]): string[] {
  const lake = mercatorPolygon(rings);
  return points
    .filter((p) => {
      const point = mercatorPoint(p.lng, p.lat);
      if (containsOperator.execute(lake, point)) return false;
      const { distance } = proximityOperator.getNearestCoordinate(lake, point);
      return distance / mercatorScale(p.lat) > POINT_TOLERANCE_M;
    })
    .map((p) => p.id);
}
