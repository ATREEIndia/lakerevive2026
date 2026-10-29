"use client";

import "@arcgis/core/assets/esri/themes/light/main.css";
import Graphic from "@arcgis/core/Graphic";
import ArcGISMap from "@arcgis/core/Map";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import Extent from "@arcgis/core/geometry/Extent";
import type Point from "@arcgis/core/geometry/Point";
import type Polygon from "@arcgis/core/geometry/Polygon";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import EsriMapView from "@arcgis/core/views/MapView";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import { useEffect, useRef, useState } from "react";
import { useLake } from "@/context/LakeContext";
import { ARCGIS_API_KEY } from "@/lib/arcgisConfig";
import {
  findFarPoints,
  geodesicAreaM2,
  lngLatFromPoint,
  mercatorPoint,
  mercatorPolygon,
  mercatorScale,
  ringsFromPolygon,
} from "@/lib/geo";
import type { Basemap, FeatureKind } from "@/lib/types";
import { Button, formatArea } from "./ui";

const KINDS: FeatureKind[] = ["lake", "inlet", "outlet"];

const SYMBOLS = {
  lake: new SimpleFillSymbol({
    color: [37, 99, 235, 0.3],
    outline: { color: [29, 78, 216, 1], width: 2 },
  }),
  inlet: new SimpleMarkerSymbol({
    style: "circle",
    size: 13,
    color: [22, 163, 74, 1],
    outline: { color: [255, 255, 255, 1], width: 2 },
  }),
  outlet: new SimpleMarkerSymbol({
    style: "circle",
    size: 13,
    color: [220, 38, 38, 1],
    outline: { color: [255, 255, 255, 1], width: 2 },
  }),
  location: new SimpleMarkerSymbol({
    style: "circle",
    size: 16,
    color: [13, 148, 136, 1],
    outline: { color: [255, 255, 255, 1], width: 3 },
  }),
  island: new SimpleFillSymbol({
    color: [245, 158, 11, 0.9],
    outline: { color: [180, 83, 9, 1], width: 1 },
  }),
  /** A drawn lake awaiting confirmation. */
  pendingLake: new SimpleFillSymbol({
    color: [37, 99, 235, 0.2],
    outline: { color: [29, 78, 216, 1], width: 2, style: "dash" },
  }),
};

const ISLAND_POPUP = new PopupTemplate({
  title: "Island {number}",
  content: [
    {
      type: "fields",
      fieldInfos: [
        { fieldName: "inlet", label: "Assigned inlet" },
        { fieldName: "latitude", label: "Latitude" },
        { fieldName: "longitude", label: "Longitude" },
      ],
    },
  ],
});

const TOOL_HINTS: Record<FeatureKind, string> = {
  lake: "Click to add vertices around the shoreline; double-click to finish. Esc cancels.",
  inlet: "Click on the map to add inlets. Press Esc or click the tool again when done.",
  outlet: "Click on the map to add outlets. Press Esc or click the tool again when done.",
};

interface MapObjects {
  view: EsriMapView;
  layers: Record<FeatureKind | "pendingLake" | "labels" | "location" | "islands", GraphicsLayer>;
  sketch: Record<FeatureKind, SketchViewModel>;
}

interface DesiredGraphic {
  id: string;
  key: string;
  geometry: Point | Polygon;
}

/**
 * Makes a layer match the desired graphics, touching only what changed so an
 * in-progress edit on an unrelated graphic is not interrupted.
 */
function reconcile(layer: GraphicsLayer, svm: SketchViewModel, symbol: Graphic["symbol"], desired: DesiredGraphic[]) {
  const wanted = new Map(desired.map((d) => [d.id, d]));
  for (const graphic of layer.graphics.toArray()) {
    const target = wanted.get(graphic.attributes?.fid);
    if (target && target.key === graphic.attributes.key) {
      wanted.delete(target.id);
      continue;
    }
    if (svm.updateGraphics.includes(graphic)) svm.cancel();
    if (target) {
      graphic.geometry = target.geometry;
      graphic.attributes = { fid: target.id, key: target.key };
      wanted.delete(target.id);
    } else {
      layer.remove(graphic);
    }
  }
  layer.addMany(
    [...wanted.values()].map(
      (d) => new Graphic({ geometry: d.geometry, symbol, attributes: { fid: d.id, key: d.key } }),
    ),
  );
}

function labelGraphic(point: Point, text: string) {
  return new Graphic({
    geometry: point,
    symbol: new TextSymbol({
      text,
      color: "white",
      haloColor: [15, 23, 42, 0.9],
      haloSize: 1.5,
      yoffset: 13,
      font: { size: 10, weight: "bold" },
    }),
  });
}

/** Extent around graphics, padded to at least `minMetres` across. */
function paddedExtent(graphics: Graphic[], minMetres: number): Extent | null {
  let extent: Extent | null = null;
  for (const g of graphics) {
    const e = g.geometry?.extent;
    if (e) extent = extent ? extent.union(e) : e.clone();
  }
  if (!extent) return null;
  const minSize = minMetres * mercatorScale(extent.center.latitude ?? 0);
  const size = Math.max(extent.width, extent.height);
  return size < minSize ? extent.expand(minSize / Math.max(size, 1e-6)) : extent.expand(1.3);
}

export default function MapView() {
  const { state, dispatch, mapHandle } = useLake();
  const containerRef = useRef<HTMLDivElement>(null);
  const objects = useRef<MapObjects | null>(null);
  const latest = useRef(state);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(
    ARCGIS_API_KEY ? null : "No ArcGIS API key found. Add NEXT_PUBLIC_ARCGIS_API_KEY to .env.local and restart the dev server.",
  );

  // Event handlers registered once read the latest state through this ref.
  useEffect(() => {
    latest.current = state;
  });

  // Create the map once; tear everything down on unmount (strict mode mounts twice in dev).
  useEffect(() => {
    if (!ARCGIS_API_KEY || !containerRef.current) return;
    let destroyed = false;

    const layers: MapObjects["layers"] = {
      lake: new GraphicsLayer({ title: "Lake boundary" }),
      pendingLake: new GraphicsLayer({ title: "Unconfirmed lake boundary" }),
      islands: new GraphicsLayer({ title: "Floating islands", visible: false }),
      outlet: new GraphicsLayer({ title: "Outlets" }),
      inlet: new GraphicsLayer({ title: "Inlets" }),
      labels: new GraphicsLayer({ title: "Labels" }),
      location: new GraphicsLayer({ title: "Search location" }),
    };
    const map = new ArcGISMap({ basemap: latest.current.basemap, layers: Object.values(layers) });
    const view = new EsriMapView({
      container: containerRef.current,
      map,
      // center: [0, 20],
       center: [78.9629, 20.5937], // India
      zoom: 5,
      constraints: { snapToZoom: false },
    });
    view.ui.move("zoom", "bottom-right");

    const sketch: MapObjects["sketch"] = {
      lake: new SketchViewModel({
        view,
        layer: layers.lake,
        polygonSymbol: SYMBOLS.lake,
        updateOnGraphicClick: false,
        defaultUpdateOptions: { tool: "reshape", toggleToolOnClick: false },
      }),
      inlet: new SketchViewModel({
        view,
        layer: layers.inlet,
        pointSymbol: SYMBOLS.inlet,
        updateOnGraphicClick: false,
        defaultUpdateOptions: { tool: "move", toggleToolOnClick: false },
      }),
      outlet: new SketchViewModel({
        view,
        layer: layers.outlet,
        pointSymbol: SYMBOLS.outlet,
        updateOnGraphicClick: false,
        defaultUpdateOptions: { tool: "move", toggleToolOnClick: false },
      }),
    };
    objects.current = { view, layers, sketch };

    const commit = (kind: FeatureKind, id: string | null, geometry: Graphic["geometry"]) => {
      if (!geometry) return;
      if (kind === "lake") {
        const rings = ringsFromPolygon(geometry as Polygon);
        // A newly drawn boundary waits for confirmation; a reshape applies directly.
        if (rings) dispatch(id ? { type: "SET_LAKE", rings } : { type: "PROPOSE_LAKE", rings });
        else if (!id) dispatch({ type: "SET_TOOL", tool: null });
        return;
      }
      const { lng, lat } = lngLatFromPoint(geometry as Point);
      if (id) dispatch({ type: "MOVE_POINT", kind, id, lng, lat });
      else dispatch({ type: "ADD_POINT", kind, id: crypto.randomUUID(), lng, lat });
    };

    const handles = KINDS.flatMap((kind) => {
      const svm = sketch[kind];
      let changed = false;
      return [
        svm.on("create", (event) => {
          if (event.state === "cancel") {
            if (latest.current.activeTool === kind) dispatch({ type: "SET_TOOL", tool: null });
          } else if (event.state === "complete") {
            // The graphic is re-added from app state, which is the source of truth.
            layers[kind].remove(event.graphic);
            commit(kind, null, event.graphic.geometry);
            // Points keep adding until the tool is turned off; the lake ends drawing via PROPOSE_LAKE.
            if (kind !== "lake" && latest.current.activeTool === kind) svm.create("point");
          }
        }),
        svm.on("update", (event) => {
          const id: string = event.graphics[0]?.attributes?.fid;
          if (event.state === "start") {
            changed = false;
            dispatch({ type: "SELECT", feature: { kind, id } });
          } else if (event.state === "active") {
            changed ||= Boolean(event.toolEventInfo);
          } else {
            if (!event.aborted && changed) commit(kind, id, event.graphics[0].geometry);
            if (latest.current.selected?.id === id) dispatch({ type: "SELECT", feature: null });
          }
        }),
        svm.on("delete", (event) => {
          for (const g of event.graphics) {
            dispatch({ type: "DELETE_FEATURE", feature: { kind, id: g.attributes.fid } });
          }
        }),
      ];
    });

    // Selecting a feature to move/reshape it (Step 2 only, when no draw tool is active).
    handles.push(
      view.on("click", async (event) => {
        const { step, activeTool, pendingLake } = latest.current;
        if (step !== 2 || activeTool || pendingLake) return;
        const hit = await view.hitTest(event, { include: [layers.inlet, layers.outlet, layers.lake] });
        const result = hit.results.find((r) => r.type === "graphic");
        const graphic = result?.type === "graphic" ? result.graphic : null;
        const kind = KINDS.find((k) => layers[k] === graphic?.layer);
        for (const k of KINDS) {
          if (sketch[k].updateGraphics.length && !(graphic && sketch[k].updateGraphics.includes(graphic))) {
            sketch[k].complete();
          }
        }
        if (graphic && kind && !sketch[kind].updateGraphics.includes(graphic)) {
          sketch[kind].update(graphic);
        }
      }),
      view.on("layerview-create-error", () => {
        if (!destroyed) setError("Some map layers failed to load. Check that your ArcGIS API key is valid.");
      }),
    );

    const zoomTo = (graphics: Graphic[], minMetres: number) => {
      const target = paddedExtent(graphics, minMetres);
      if (target) view.goTo(target).catch(() => {});
    };

    view.when(
      () => {
        if (destroyed) return;
        mapHandle.current = {
          zoomToLake: () => zoomTo(layers.lake.graphics.toArray(), 200),
          zoomToIslands: (inletIndex) =>
            zoomTo(
              layers.islands.graphics
                .toArray()
                .filter((g) => inletIndex === undefined || g.attributes.inletIndex === inletIndex),
              60,
            ),
          takeScreenshot: async () => (await view.takeScreenshot({ format: "png" })).dataUrl,
        };
        setReady(true);
      },
      () => {
        if (!destroyed) setError("The map failed to load. Check your ArcGIS API key and network connection.");
      },
    );

    return () => {
      destroyed = true;
      handles.forEach((h) => h.remove());
      KINDS.forEach((k) => sketch[k].destroy());
      view.destroy();
      objects.current = null;
      mapHandle.current = null;
      setReady(false);
    };
  }, [dispatch, mapHandle]);

  // Basemap toggle.
  useEffect(() => {
    if (!ready || !objects.current) return;
    const map = objects.current.view.map;
    if (map) map.basemap = state.basemap;
  }, [ready, state.basemap]);

  // Zoom to a newly chosen location.
  const { location } = state;
  useEffect(() => {
    if (!ready || !objects.current || !location) return;
    objects.current.view.goTo({ center: [location.lng, location.lat], zoom: 15.5 },{ duration: 2000, easing: "ease-in-out" })
    .catch(() => {});
  }, [ready, location]);

  // Temporary search marker (Step 1) and per-step layer visibility.
  const { step } = state;
  useEffect(() => {
    if (!ready || !objects.current) return;
    const { layers, sketch } = objects.current;
    layers.location.removeAll();
    if (location && step === 1) {
      layers.location.add(new Graphic({ geometry: mercatorPoint(location.lng, location.lat), symbol: SYMBOLS.location }));
    }
    layers.islands.visible = step === 4;
    if (step !== 2) KINDS.forEach((k) => sketch[k].updateGraphics.length && sketch[k].complete());
  }, [ready, location, step]);

  // Start/stop drawing when the active tool changes.
  const { activeTool } = state;
  useEffect(() => {
    if (!ready || !objects.current) return;
    const { sketch } = objects.current;
    KINDS.forEach((k) => sketch[k].cancel());
    if (activeTool) sketch[activeTool].create(activeTool === "lake" ? "polygon" : "point");
  }, [ready, activeTool]);

  // A just-drawn lake awaiting confirmation: dashed outline plus its area.
  const { pendingLake } = state;
  const [pendingArea, setPendingArea] = useState<number | null>(null);
  useEffect(() => {
    if (!ready || !objects.current) return;
    const layer = objects.current.layers.pendingLake;
    layer.removeAll();
    setPendingArea(null);
    if (!pendingLake) return;
    layer.add(new Graphic({ geometry: mercatorPolygon(pendingLake), symbol: SYMBOLS.pendingLake }));
    let stale = false;
    geodesicAreaM2(pendingLake)
      .then((area) => !stale && setPendingArea(area))
      .catch(() => {});
    return () => {
      stale = true;
    };
  }, [ready, pendingLake]);

  // Mirror lake/inlet/outlet state onto the map.
  const { features } = state;
  useEffect(() => {
    if (!ready || !objects.current) return;
    const { layers, sketch } = objects.current;
    const lake = features.lake;
    reconcile(
      layers.lake,
      sketch.lake,
      SYMBOLS.lake,
      lake ? [{ id: "lake", key: JSON.stringify(lake), geometry: mercatorPolygon(lake) }] : [],
    );
    for (const kind of ["inlet", "outlet"] as const) {
      const points = kind === "inlet" ? features.inlets : features.outlets;
      reconcile(
        layers[kind],
        sketch[kind],
        SYMBOLS[kind],
        points.map((p) => ({ id: p.id, key: `${p.lng},${p.lat}`, geometry: mercatorPoint(p.lng, p.lat) })),
      );
    }
    layers.labels.removeAll();
    layers.labels.addMany([
      ...features.inlets.map((p, i) => labelGraphic(mercatorPoint(p.lng, p.lat), `Inlet ${i + 1}`)),
      ...features.outlets.map((p, i) => labelGraphic(mercatorPoint(p.lng, p.lat), `Outlet ${i + 1}`)),
    ]);
  }, [ready, features]);

  // Live lake area and inlet/outlet proximity warnings.
  useEffect(() => {
    let stale = false;
    const lake = features.lake;
    (async () => {
      const areaM2 = lake ? await geodesicAreaM2(lake) : null;
      const farPointIds = lake ? findFarPoints(lake, [...features.inlets, ...features.outlets]) : [];
      if (!stale) dispatch({ type: "SET_MEASUREMENTS", measurements: { areaM2, farPointIds } });
    })().catch(() => {});
    return () => {
      stale = true;
    };
  }, [features, dispatch]);

  // Floating islands (Step 4).
  const { placement } = state;
  useEffect(() => {
    if (!ready || !objects.current) return;
    const { islands } = objects.current.layers;
    islands.removeAll();
    if (!placement) return;
    islands.addMany(
      placement.islands.map(
        (island) =>
          new Graphic({
            geometry: mercatorPolygon([island.ring]),
            symbol: SYMBOLS.island,
            popupTemplate: ISLAND_POPUP,
            attributes: {
              number: island.number,
              inletIndex: island.inletIndex,
              inlet: `Inlet ${island.inletIndex + 1}`,
              latitude: island.center[1].toFixed(6),
              longitude: island.center[0].toFixed(6),
            },
          }),
      ),
    );
    mapHandle.current?.zoomToIslands();
  }, [ready, placement, mapHandle]);

  return (
    <div className="relative h-full w-full bg-slate-200">
      <div ref={containerRef} className="absolute inset-0" aria-label="Map" />

      {!ready && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/80" role="status">
          <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm text-slate-600 shadow">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
            Loading map…
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/90 p-6" role="alert">
          <div className="max-w-sm rounded-2xl border border-red-200 bg-white p-5 text-sm text-slate-700 shadow-lg">
            <p className="mb-1 font-semibold text-red-700">Map unavailable</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {ready && activeTool && (
        <div className="pointer-events-none absolute inset-x-0 top-14 flex justify-center px-4">
          <p className="rounded-full bg-slate-900/80 px-4 py-2 text-center text-xs text-white shadow">
            {TOOL_HINTS[activeTool]}
          </p>
        </div>
      )}

      {ready && pendingLake && (
        <ConfirmLakeDialog
          areaM2={pendingArea}
          replacing={features.lake !== null}
          onConfirm={() => dispatch({ type: "CONFIRM_LAKE" })}
          onRedraw={() => dispatch({ type: "DISCARD_LAKE", redraw: true })}
          onDiscard={() => dispatch({ type: "DISCARD_LAKE", redraw: false })}
        />
      )}

      {ready && <BasemapToggle value={state.basemap} onChange={(basemap) => dispatch({ type: "SET_BASEMAP", basemap })} />}
    </div>
  );
}

function ConfirmLakeDialog(props: {
  areaM2: number | null;
  replacing: boolean;
  onConfirm: () => void;
  onRedraw: () => void;
  onDiscard: () => void;
}) {
  const { areaM2, replacing, onConfirm, onRedraw, onDiscard } = props;
  const area = areaM2 !== null ? formatArea(areaM2) : null;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[50%] flex justify-center px-4">
      <div
        role="alertdialog"
        aria-labelledby="confirm-lake-title"
        aria-describedby="confirm-lake-desc"
        onKeyDown={(e) => e.key === "Escape" && onDiscard()}
        className="pointer-events-auto w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-xl"
      >
        <p id="confirm-lake-title" className="text-sm font-semibold text-slate-900">
          Use this as the lake boundary?
        </p>
        <p id="confirm-lake-desc" className="mt-1 text-xs text-slate-500">
          {area ? `${area.hectares} (${area.squareMetres}).` : "Calculating area…"}{" "}
          {replacing && "This replaces the current boundary."}
        </p>
        <div className="mt-3 flex flex-wrap justify-end gap-2">
          <Button variant="ghost" onClick={onDiscard}>
            Discard
          </Button>
          <Button onClick={onRedraw}>Redraw</Button>
          <Button variant="primary" onClick={onConfirm} autoFocus>
            Confirm boundary
          </Button>
        </div>
      </div>
    </div>
  );
}

function BasemapToggle({ value, onChange }: { value: Basemap; onChange: (b: Basemap) => void }) {
  const options: { id: Basemap; label: string }[] = [
    { id: "arcgis/imagery", label: "Satellite" },
    { id: "arcgis/topographic", label: "Topographic" },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Basemap"
      className="absolute right-3 top-3 flex rounded-lg bg-white/95 p-1 text-xs font-medium shadow-md"
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          className={`rounded-md px-3 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-teal-600 ${
            value === o.id ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
