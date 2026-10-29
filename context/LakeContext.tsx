"use client";

import { createContext, useContext, useReducer, useRef, type ReactNode, type RefObject } from "react";
import type {
  Basemap,
  FeatureKind,
  LakeFeatures,
  LakeMeasurements,
  LakeParameters,
  LocationInfo,
  PlacementResult,
  Ring,
  SelectedFeature,
  Step,
} from "@/lib/types";

export interface LakeState {
  step: Step;
  location: LocationInfo | null;
  features: LakeFeatures;
  /** Previous feature snapshots for "Undo last". */
  history: LakeFeatures[];
  activeTool: FeatureKind | null;
  /** A just-drawn lake polygon awaiting the user's confirmation. */
  pendingLake: Ring[] | null;
  selected: SelectedFeature | null;
  measurements: LakeMeasurements;
  parameters: LakeParameters | null;
  placement: PlacementResult | null;
  basemap: Basemap;
}

export type LakeAction =
  | { type: "GO_TO_STEP"; step: Step }
  | { type: "SET_LOCATION"; location: LocationInfo }
  | { type: "SET_TOOL"; tool: FeatureKind | null }
  /** Replaces the lake directly (used when reshaping an existing boundary). */
  | { type: "SET_LAKE"; rings: Ring[] }
  /** A newly drawn boundary; it is only applied once confirmed. */
  | { type: "PROPOSE_LAKE"; rings: Ring[] }
  | { type: "CONFIRM_LAKE" }
  | { type: "DISCARD_LAKE"; redraw: boolean }
  | { type: "ADD_POINT"; kind: "inlet" | "outlet"; id: string; lng: number; lat: number }
  | { type: "MOVE_POINT"; kind: "inlet" | "outlet"; id: string; lng: number; lat: number }
  | { type: "DELETE_FEATURE"; feature: SelectedFeature }
  | { type: "UNDO" }
  | { type: "CLEAR_ALL" }
  | { type: "SELECT"; feature: SelectedFeature | null }
  | { type: "SET_MEASUREMENTS"; measurements: LakeMeasurements }
  | { type: "SET_PARAMETERS"; parameters: LakeParameters }
  | { type: "SET_PLACEMENT"; placement: PlacementResult }
  | { type: "SET_BASEMAP"; basemap: Basemap }
  | { type: "RESET" };

const EMPTY_FEATURES: LakeFeatures = { lake: null, inlets: [], outlets: [] };
const MAX_HISTORY = 50;

const initialState: LakeState = {
  step: 1,
  location: null,
  features: EMPTY_FEATURES,
  history: [],
  activeTool: null,
  pendingLake: null,
  selected: null,
  measurements: { areaM2: null, farPointIds: [] },
  parameters: null,
  placement: null,
  basemap: "arcgis/imagery",
};

const pointsKey = (kind: "inlet" | "outlet") => (kind === "inlet" ? "inlets" : "outlets");

/** Applies a feature edit, recording the previous state for undo. */
function editFeatures(state: LakeState, features: LakeFeatures): LakeState {
  return {
    ...state,
    features,
    history: [...state.history, state.features].slice(-MAX_HISTORY),
    selected: null,
    placement: null,
  };
}

function reducer(state: LakeState, action: LakeAction): LakeState {
  switch (action.type) {
    case "GO_TO_STEP":
      return { ...state, step: action.step, activeTool: null, selected: null, pendingLake: null };
    case "SET_LOCATION":
      return { ...state, location: action.location };
    case "SET_TOOL":
      return { ...state, activeTool: action.tool, selected: null, pendingLake: null };
    case "SET_LAKE":
      return editFeatures(state, { ...state.features, lake: action.rings });
    case "PROPOSE_LAKE":
      return { ...state, activeTool: null, pendingLake: action.rings };
    case "CONFIRM_LAKE":
      if (!state.pendingLake) return state;
      return { ...editFeatures(state, { ...state.features, lake: state.pendingLake }), pendingLake: null };
    case "DISCARD_LAKE":
      return { ...state, pendingLake: null, activeTool: action.redraw ? "lake" : null };
    case "ADD_POINT": {
      const key = pointsKey(action.kind);
      const point = { id: action.id, lng: action.lng, lat: action.lat };
      return editFeatures(state, { ...state.features, [key]: [...state.features[key], point] });
    }
    case "MOVE_POINT": {
      const key = pointsKey(action.kind);
      const moved = state.features[key].map((p) =>
        p.id === action.id ? { ...p, lng: action.lng, lat: action.lat } : p,
      );
      return editFeatures(state, { ...state.features, [key]: moved });
    }
    case "DELETE_FEATURE": {
      const { kind, id } = action.feature;
      if (kind === "lake") return editFeatures(state, { ...state.features, lake: null });
      const key = pointsKey(kind);
      return editFeatures(state, { ...state.features, [key]: state.features[key].filter((p) => p.id !== id) });
    }
    case "UNDO": {
      if (state.history.length === 0) return state;
      return {
        ...state,
        features: state.history[state.history.length - 1],
        history: state.history.slice(0, -1),
        selected: null,
        placement: null,
      };
    }
    case "CLEAR_ALL":
      return editFeatures(state, EMPTY_FEATURES);
    case "SELECT":
      return { ...state, selected: action.feature };
    case "SET_MEASUREMENTS":
      return { ...state, measurements: action.measurements };
    case "SET_PARAMETERS":
      return { ...state, parameters: action.parameters, placement: null };
    case "SET_PLACEMENT":
      return { ...state, placement: action.placement };
    case "SET_BASEMAP":
      return { ...state, basemap: action.basemap };
    case "RESET":
      return { ...initialState, basemap: state.basemap };
  }
}

/** Imperative map helpers, registered by MapView once the view is ready. */
export interface MapHandle {
  zoomToLake(): void;
  zoomToIslands(inletIndex?: number): void;
  /** PNG data URL of the current map view. */
  takeScreenshot(): Promise<string>;
}

interface LakeContextValue {
  state: LakeState;
  dispatch: React.Dispatch<LakeAction>;
  mapHandle: RefObject<MapHandle | null>;
}

const LakeContext = createContext<LakeContextValue | null>(null);

export function LakeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapHandle = useRef<MapHandle | null>(null);
  return <LakeContext.Provider value={{ state, dispatch, mapHandle }}>{children}</LakeContext.Provider>;
}

export function useLake(): LakeContextValue {
  const value = useContext(LakeContext);
  if (!value) throw new Error("useLake must be used inside <LakeProvider>");
  return value;
}

/** Which steps the user may jump to from the stepper. */
export function canVisitStep(state: LakeState, step: Step): boolean {
  const { location, features, parameters } = state;
  const mapped = features.lake !== null && features.inlets.length > 0;
  switch (step) {
    case 1:
      return true;
    case 2:
      return location !== null || features.lake !== null;
    case 3:
      return mapped;
    case 4:
      return mapped && parameters !== null;
  }
}
