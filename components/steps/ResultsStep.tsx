"use client";

import { useEffect, useState } from "react";
import { useLake } from "@/context/LakeContext";
import { ISLAND_SIDE_M, calculateIslands } from "@/lib/calculations";
import { buildExport } from "@/lib/geojson";
import { Alert, Button, Card, StepHeading } from "../ui";

export default function ResultsStep() {
  const { state, dispatch, mapHandle } = useLake();
  const { features, measurements, parameters, placement } = state;
  const [placementError, setPlacementError] = useState<string | null>(null);
  const [imageState, setImageState] = useState<"idle" | "busy" | "error">("idle");

  const result =
    parameters && measurements.areaM2 !== null
      ? calculateIslands({
          areaM2: measurements.areaM2,
          ...parameters,
          inletCount: features.inlets.length,
          outletCount: features.outlets.length,
        })
      : null;

  // Place islands on the map whenever inputs change (placement is reset by the reducer).
  const lake = features.lake;
  const inlets = features.inlets;
  const perInletKey = result?.islandsPerInlet.join(",") ?? "";
  useEffect(() => {
    if (placement || !lake || !perInletKey) return;
    let stale = false;
    import("@/lib/placement")
      .then(({ placeIslands }) => {
        const next = placeIslands(lake, inlets, perInletKey.split(",").map(Number));
        if (!stale) {
          setPlacementError(null);
          dispatch({ type: "SET_PLACEMENT", placement: next });
        }
      })
      .catch(() => !stale && setPlacementError("Could not place islands on the map."));
    return () => {
      stale = true;
    };
  }, [placement, lake, inlets, perInletKey, dispatch]);

  if (!result || !parameters) {
    return (
      <p className="text-sm text-slate-500" role="status">
        Calculating…
      </p>
    );
  }

  const unplacedTotal = placement?.unplacedPerInlet.reduce((a, b) => a + b, 0) ?? 0;

  const exportJson = () => {
    const data = buildExport({ features, areaM2: measurements.areaM2, parameters, result, placement });
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `lake-treatment-plan-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportImage = async () => {
    const map = mapHandle.current;
    if (!map) return;
    setImageState("busy");
    try {
      const [{ buildPlanImage }, screenshot] = await Promise.all([import("@/lib/planImage"), map.takeScreenshot()]);
      const blob = await buildPlanImage(screenshot, {
        result,
        areaM2: measurements.areaM2,
        inletCount: features.inlets.length,
        outletCount: features.outlets.length,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lake-treatment-plan-${new Date().toISOString().slice(0, 10)}.png`;
      a.click();
      URL.revokeObjectURL(url);
      setImageState("idle");
    } catch {
      setImageState("error");
    }
  };

  const startOver = () => {
    if (window.confirm("Start over? This clears the lake, features and parameters.")) dispatch({ type: "RESET" });
  };

  return (
    <div>
      <StepHeading title="Treatment plan" />

      <Card className="border-teal-200 bg-gradient-to-br from-teal-600 to-sky-700 text-white">
        <p className="text-sm text-teal-50">Floating islands required</p>
        <p className="mt-1 text-5xl font-semibold tracking-tight tabular-nums">{result.totalIslands.toLocaleString()}</p>
        <p className="mt-1 text-xs text-teal-100">
          Each {ISLAND_SIDE_M} m × {ISLAND_SIDE_M} m
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-white/20 pt-3">
          <div>
            <dt className="text-xs text-teal-100">Total coverage</dt>
            <dd className="text-lg font-semibold tabular-nums">{result.coverageM2.toLocaleString()} m²</dd>
          </div>
          <div>
            <dt className="text-xs text-teal-100">Of lake surface</dt>
            <dd className="text-lg font-semibold tabular-nums">{result.coveragePercent.toFixed(2)}%</dd>
          </div>
        </dl>
      </Card>

      {result.notes.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-slate-500">
          {result.notes.map((note) => (
            <li key={note}>• {note}</li>
          ))}
        </ul>
      )}

      <Card className="mt-4 p-0">
        <table className="w-full text-sm">
          <caption className="px-4 pt-3 text-left text-xs font-medium tracking-wide text-slate-500 uppercase">
            Islands per inlet
          </caption>
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs text-slate-500">
              <th scope="col" className="px-4 py-2 font-medium">Inlet</th>
              <th scope="col" className="px-4 py-2 text-right font-medium">Assigned</th>
              <th scope="col" className="px-4 py-2 text-right font-medium">Placed</th>
              <th scope="col" className="px-2 py-2"><span className="sr-only">Map</span></th>
            </tr>
          </thead>
          <tbody>
            {result.islandsPerInlet.map((count, i) => {
              const placed = placement ? count - placement.unplacedPerInlet[i] : null;
              return (
                <tr key={features.inlets[i]?.id ?? i} className="border-b border-slate-50 last:border-0">
                  <th scope="row" className="px-4 py-2 text-left font-medium text-slate-800">
                    <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-green-600" aria-hidden />
                    Inlet {i + 1}
                  </th>
                  <td className="px-4 py-2 text-right tabular-nums">{count.toLocaleString()}</td>
                  <td className={`px-4 py-2 text-right tabular-nums ${placed !== null && placed < count ? "text-amber-700" : ""}`}>
                    {placed?.toLocaleString() ?? "…"}
                  </td>
                  <td className="px-2 py-1 text-right">
                    <Button
                      variant="ghost"
                      className="px-2 py-1 text-xs"
                      disabled={!placed}
                      onClick={() => mapHandle.current?.zoomToIslands(i)}
                      aria-label={`Zoom to islands for inlet ${i + 1}`}
                    >
                      Zoom
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <div className="mt-3 space-y-2">
        {!placement && !placementError && <Alert tone="info">Placing islands on the map…</Alert>}
        {placementError && <Alert tone="error">{placementError}</Alert>}
        {imageState === "error" && <Alert tone="error">Could not create the map image. Please try again.</Alert>}
        {unplacedTotal > 0 && (
          <Alert tone="warning">
            {unplacedTotal.toLocaleString()} island{unplacedTotal === 1 ? "" : "s"} could not fit inside the lake near
            {" "}their inlet. Consider redrawing the boundary or adjusting the inlets.
          </Alert>
        )}
        {placement && placement.islands.length > 0 && (
          <p className="text-xs text-slate-500">Click an island on the map to see its details.</p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
        <Button onClick={() => dispatch({ type: "GO_TO_STEP", step: 3 })}>Edit parameters</Button>
        <Button onClick={() => dispatch({ type: "GO_TO_STEP", step: 2 })}>Edit map</Button>
        <Button variant="ghost" onClick={startOver}>
          Start over
        </Button>
        {/* <Button variant="primary" onClick={exportJson}>
          ⤓ Export JSON
        </Button> */}
        <Button
          variant="primary"
          className="col-span-2"
          onClick={exportImage}
          disabled={!placement || imageState === "busy"}
        >
          {imageState === "busy" ? "Preparing image…" : "⤓ Download map image (PNG)"}
        </Button>
      </div>
    </div>
  );
}
