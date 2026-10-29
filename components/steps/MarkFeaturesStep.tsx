"use client";

import { useLake } from "@/context/LakeContext";
import { POINT_TOLERANCE_M } from "@/lib/constants";
import type { FeatureKind } from "@/lib/types";
import { Alert, Button, Card, StepFooter, StepHeading, formatArea } from "../ui";

const TOOLS: { kind: FeatureKind; label: string; swatch: string; activeRing: string; description: string }[] = [
  {
    kind: "lake",
    label: "Lake boundary",
    swatch: "bg-blue-600/40 border-2 border-blue-700 rounded-sm",
    activeRing: "border-blue-500 ring-blue-100",
    description: "Click around the shoreline, double-click to finish. Redrawing replaces it.",
  },
  {
    kind: "inlet",
    label: "Inlets",
    swatch: "bg-green-600 rounded-full ring-2 ring-white",
    activeRing: "border-green-500 ring-green-100",
    description: "Click to add water entry points.",
  },
  {
    kind: "outlet",
    label: "Outlets",
    swatch: "bg-red-600 rounded-full ring-2 ring-white",
    activeRing: "border-red-500 ring-red-100",
    description: "Click to add water exit points.",
  },
];

export default function MarkFeaturesStep() {
  const { state, dispatch } = useLake();
  const { features, activeTool, selected, measurements, history, pendingLake } = state;

  const counts: Record<FeatureKind, number> = {
    lake: features.lake ? 1 : 0,
    inlet: features.inlets.length,
    outlet: features.outlets.length,
  };
  const hasAnything = counts.lake + counts.inlet + counts.outlet > 0;
  const canContinue = features.lake !== null && features.inlets.length > 0;

  const nameOf = (id: string) => {
    const inlet = features.inlets.findIndex((p) => p.id === id);
    if (inlet >= 0) return `Inlet ${inlet + 1}`;
    return `Outlet ${features.outlets.findIndex((p) => p.id === id) + 1}`;
  };
  const selectedName = selected && (selected.kind === "lake" ? "Lake boundary" : nameOf(selected.id));
  const area = measurements.areaM2 !== null ? formatArea(measurements.areaM2) : null;

  return (
    <div>
      <StepHeading title="Mark lake features">
        Pick a tool, then draw on the map. Click an existing feature to select it, then drag to move or reshape it.
      </StepHeading>

      <div className="space-y-2" role="group" aria-label="Drawing tools">
        {TOOLS.map((tool) => {
          const active = activeTool === tool.kind;
          const awaitingConfirm = tool.kind === "lake" && pendingLake !== null;
          return (
            <button
              key={tool.kind}
              type="button"
              aria-pressed={active}
              onClick={() => dispatch({ type: "SET_TOOL", tool: active ? null : tool.kind })}
              className={`flex w-full items-center gap-3 rounded-xl border bg-white px-3 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-teal-600 ${
                active ? `${tool.activeRing} ring-4` : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span aria-hidden className={`h-4 w-4 shrink-0 ${tool.swatch}`} />
              <span className="flex-1">
                <span className="block text-sm font-medium text-slate-900">{tool.label}</span>
                <span className={`block text-xs ${awaitingConfirm ? "font-medium text-blue-700" : "text-slate-500"}`}>
                  {awaitingConfirm
                    ? "Confirm or redraw the boundary on the map."
                    : active
                      ? "Drawing… click to stop"
                      : tool.description}
                </span>
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 tabular-nums">
                {counts[tool.kind]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="secondary" disabled={history.length === 0} onClick={() => dispatch({ type: "UNDO" })}>
          ↶ Undo last
        </Button>
        <Button variant="danger" disabled={!hasAnything} onClick={() => dispatch({ type: "CLEAR_ALL" })}>
          Clear all
        </Button>
      </div>

      {selected && selectedName && (
        <Card className="mt-4 flex items-center justify-between gap-3 py-3">
          <p className="text-sm text-slate-700">
            Selected: <span className="font-medium text-slate-900">{selectedName}</span>
            <span className="block text-xs text-slate-500">Drag on the map to move. Press Delete to remove.</span>
          </p>
          <Button variant="danger" onClick={() => dispatch({ type: "DELETE_FEATURE", feature: selected })}>
            Delete
          </Button>
        </Card>
      )}

      <Card className="mt-4">
        <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Lake area</p>
        {area ? (
          <p className="mt-1">
            <span className="text-2xl font-semibold text-slate-900">{area.hectares}</span>
            <span className="ml-2 text-sm text-slate-500">{area.squareMetres}</span>
          </p>
        ) : (
          <p className="mt-1 text-sm text-slate-500">
            {features.lake ? "Calculating…" : "Draw the lake boundary to see its area."}
          </p>
        )}
      </Card>

      {measurements.farPointIds.length > 0 && (
        <div className="mt-4">
          <Alert tone="warning">
            {measurements.farPointIds.map(nameOf).join(", ")}{" "}
            {measurements.farPointIds.length === 1 ? "is" : "are"} more than {POINT_TOLERANCE_M} m from the lake
            boundary. Check that {measurements.farPointIds.length === 1 ? "it is" : "they are"} placed correctly.
          </Alert>
        </div>
      )}

      <StepFooter>
        <Button variant="ghost" onClick={() => dispatch({ type: "GO_TO_STEP", step: 1 })}>
          ← Back
        </Button>
        <div className="flex items-center gap-3">
          {!canContinue && (
            <span className="text-xs text-slate-500">
              {features.lake ? "Add at least one inlet" : "Draw the lake boundary"}
            </span>
          )}
          <Button variant="primary" disabled={!canContinue} onClick={() => dispatch({ type: "GO_TO_STEP", step: 3 })}>
            Continue
          </Button>
        </div>
      </StepFooter>
    </div>
  );
}
