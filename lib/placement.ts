import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";
import * as centroidOperator from "@arcgis/core/geometry/operators/centroidOperator";
import * as containsOperator from "@arcgis/core/geometry/operators/containsOperator";
import * as proximityOperator from "@arcgis/core/geometry/operators/proximityOperator";
import { ISLAND_SIDE_M } from "./calculations";
import { WEB_MERCATOR, mercatorPolygon, mercatorScale, toLngLat, toMercatorXY } from "./geo";
import type { MapPoint, PlacedIsland, PlacementResult, Ring } from "./types";

// Island placement geometry (client-only, uses ArcGIS operators).
//
// For each inlet we build a grid aligned with the direction "into the lake",
// starting just inside the shoreline, and fill it in square shells of growing
// size so the cluster stays compact. Each candidate square must be fully
// contained by the lake and keep clear of islands placed for other inlets.

const SPACING_M = 1;
const PITCH_M = ISLAND_SIDE_M + SPACING_M;
const HALF_M = ISLAND_SIDE_M / 2;
/** Minimum centre distance to islands of other inlets (squares may be rotated). */
const CLEARANCE_M = ISLAND_SIDE_M * Math.SQRT2 + SPACING_M;
/** Max grid reach from an inlet, in cells. Bounds the work on huge lakes. */
const MAX_REACH_CELLS = 200;

type Vec = [number, number];

export function placeIslands(
  lakeRings: Ring[],
  inlets: MapPoint[],
  islandsPerInlet: number[],
): PlacementResult {
  const lake = mercatorPolygon(lakeRings);
  containsOperator.accelerateGeometry(lake);
  const shoreline = new Polyline({ paths: lake.rings, spatialReference: WEB_MERCATOR });
  const placedCenters = new CenterIndex(CLEARANCE_M * mercatorScale(inlets[0]?.lat ?? 0));
  const islands: PlacedIsland[] = [];
  const unplacedPerInlet: number[] = [];

  inlets.forEach((inlet, inletIndex) => {
    const wanted = islandsPerInlet[inletIndex] ?? 0;
    const scale = mercatorScale(inlet.lat);
    const { start, dir } = gridOrigin(lake, shoreline, inlet);
    const normal: Vec = [-dir[1], dir[0]];
    const extent = lake.extent!;
    const lakeDiagonalM = Math.hypot(extent.width, extent.height) / scale;
    const reach = Math.min(MAX_REACH_CELLS, Math.ceil(lakeDiagonalM / PITCH_M));
    const clearance = CLEARANCE_M * scale;
    const ownCenters: Vec[] = [];

    for (const [row, col] of gridCells(reach)) {
      if (ownCenters.length >= wanted) break;
      const along = (SPACING_M + HALF_M + row * PITCH_M) * scale;
      const across = col * PITCH_M * scale;
      const center: Vec = [
        start[0] + dir[0] * along + normal[0] * across,
        start[1] + dir[1] * along + normal[1] * across,
      ];
      if (placedCenters.hasNeighbor(center, clearance)) continue;

      const ring = squareRing(center, dir, normal, HALF_M * scale);
      const square = new Polygon({ rings: [ring], spatialReference: WEB_MERCATOR });
      if (!containsOperator.execute(lake, square)) continue;

      ownCenters.push(center);
      islands.push({
        id: `island-${islands.length + 1}`,
        number: islands.length + 1,
        inletIndex,
        center: toLngLat(center[0], center[1]),
        ring: ring.map(([x, y]) => toLngLat(x, y)),
      });
    }

    // Only block other inlets' islands once this inlet's cluster is done, so
    // the inlet's own grid (pitch < clearance) isn't blocked by itself.
    ownCenters.forEach((c) => placedCenters.add(c));
    unplacedPerInlet.push(wanted - ownCenters.length);
  });

  return { islands, unplacedPerInlet };
}

/**
 * Where the grid starts and which way it grows. Inlets outside the lake start
 * at the nearest shoreline point heading inward; inlets inside start at the
 * inlet heading away from the nearest shore.
 */
function gridOrigin(lake: Polygon, shoreline: Polyline, inlet: MapPoint) {
  const [px, py] = toMercatorXY(inlet.lng, inlet.lat);
  const point = new Point({ x: px, y: py, spatialReference: WEB_MERCATOR });
  const inside = containsOperator.execute(lake, point);
  const { coordinate } = proximityOperator.getNearestCoordinate(shoreline, point);

  let start: Vec = inside ? [px, py] : [coordinate.x, coordinate.y];
  let dir: Vec = inside ? [px - coordinate.x, py - coordinate.y] : [coordinate.x - px, coordinate.y - py];

  // Inlet sits right on the shoreline: head toward the lake's centre instead.
  if (Math.hypot(dir[0], dir[1]) < 1e-6) {
    const centroid = centroidOperator.execute(lake);
    start = [coordinate.x, coordinate.y];
    dir = [centroid.x - start[0], centroid.y - start[1]];
  }
  const length = Math.hypot(dir[0], dir[1]) || 1;
  return { start, dir: [dir[0] / length, dir[1] / length] as Vec };
}

/**
 * Grid cells (row ≥ 0 into the lake, col sideways) in half-square shells of
 * growing size; within a shell, nearest cells come first.
 */
function* gridCells(reach: number): Generator<[number, number]> {
  for (let k = 0; k <= reach; k++) {
    const shell: [number, number][] = [];
    for (let col = -k; col <= k; col++) shell.push([k, col]);
    for (let row = 0; row < k; row++) shell.push([row, -k], [row, k]);
    shell.sort((a, b) => a[0] ** 2 + a[1] ** 2 - (b[0] ** 2 + b[1] ** 2) || a[0] - b[0] || b[1] - a[1]);
    yield* shell;
  }
}

/** Closed square ring, clockwise as ArcGIS expects for exterior rings. */
function squareRing(center: Vec, dir: Vec, normal: Vec, half: number): Vec[] {
  const corner = (a: number, b: number): Vec => [
    center[0] + (dir[0] * a + normal[0] * b) * half,
    center[1] + (dir[1] * a + normal[1] * b) * half,
  ];
  const ring = [corner(-1, -1), corner(-1, 1), corner(1, 1), corner(1, -1)];
  let doubleArea = 0;
  for (let i = 0; i < 4; i++) {
    const [a, b] = [ring[i], ring[(i + 1) % 4]];
    doubleArea += a[0] * b[1] - b[0] * a[1];
  }
  if (doubleArea > 0) ring.reverse();
  return [...ring, ring[0]];
}

/** Spatial hash of island centres for fast clearance checks. */
class CenterIndex {
  private cells = new Map<string, Vec[]>();

  constructor(private cellSize: number) {}

  add(center: Vec) {
    const [cx, cy] = this.cell(center);
    const key = `${cx},${cy}`;
    const bucket = this.cells.get(key);
    if (bucket) bucket.push(center);
    else this.cells.set(key, [center]);
  }

  hasNeighbor(center: Vec, radius: number): boolean {
    const [cx, cy] = this.cell(center);
    const reach = Math.ceil(radius / this.cellSize);
    for (let dx = -reach; dx <= reach; dx++) {
      for (let dy = -reach; dy <= reach; dy++) {
        for (const other of this.cells.get(`${cx + dx},${cy + dy}`) ?? []) {
          if (Math.hypot(other[0] - center[0], other[1] - center[1]) < radius) return true;
        }
      }
    }
    return false;
  }

  private cell(center: Vec): [number, number] {
    return [Math.floor(center[0] / this.cellSize), Math.floor(center[1] / this.cellSize)];
  }
}
