// Shared app types. Geometries are stored in WGS84 (longitude, latitude) so the
// app state stays independent of the map's spatial reference.

export type LngLat = [lng: number, lat: number];
export type Ring = LngLat[];

export type Step = 1 | 2 | 3 | 4;

export type FeatureKind = "lake" | "inlet" | "outlet";

export interface MapPoint {
  id: string;
  lng: number;
  lat: number;
}

export interface LakeFeatures {
  /** Polygon rings of the lake boundary, or null if not drawn yet. */
  lake: Ring[] | null;
  inlets: MapPoint[];
  outlets: MapPoint[];
}

export interface SelectedFeature {
  kind: FeatureKind;
  id: string;
}

export interface LocationInfo {
  lng: number;
  lat: number;
  label: string;
}

export interface LakeMeasurements {
  /** Geodesic area of the lake polygon in m², null while not computed. */
  areaM2: number | null;
  /** Inlets/outlets that are more than the tolerance away from the lake. */
  farPointIds: string[];
}

export interface LakeParameters {
  depthM: number;
  tpMgL: number;
  phosphorusMgL: number;
  targetTpMgL: number;
}

export interface PlacedIsland {
  id: string;
  /** 1-based island number, unique across the whole lake. */
  number: number;
  /** 0-based index into the inlets array. */
  inletIndex: number;
  center: LngLat;
  ring: Ring;
}

export interface PlacementResult {
  islands: PlacedIsland[];
  /** Islands that could not be fitted inside the lake, per inlet. */
  unplacedPerInlet: number[];
}

export type Basemap = "arcgis/imagery" | "arcgis/topographic";
