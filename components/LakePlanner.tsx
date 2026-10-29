"use client";

import dynamic from "next/dynamic";
import { LakeProvider, useLake } from "@/context/LakeContext";
import Stepper from "./Stepper";
import LocateStep from "./steps/LocateStep";
import MarkFeaturesStep from "./steps/MarkFeaturesStep";
import ParametersStep from "./steps/ParametersStep";
import ResultsStep from "./steps/ResultsStep";

// ArcGIS touches `window` on import, so the map only ever renders in the browser.
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500" role="status">
      Loading map…
    </div>
  ),
});

export default function LakePlanner() {
  return (
    <LakeProvider>
      <div className="flex min-h-dvh flex-col bg-slate-50 lg:h-dvh">
        <header className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          {/* <div className="flex items-center gap-2.5">
            <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-sky-600 text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M12 3l-3 6h6l-3-6z" />
              </svg>
            </span>
             <div>
              <h1 className="text-base leading-tight font-semibold text-slate-900">Lake Treatment Planner</h1>
              <p className="text-xs text-slate-500">Floating treatment island sizing</p>
            </div> 
          </div>
          <Stepper /> */}
        </header>

        <div className="flex flex-1 flex-col-reverse lg:min-h-0 lg:flex-row">
          <aside className="border-slate-200 bg-white p-5 lg:w-[30%] lg:max-w-[480px] lg:min-w-[360px] lg:overflow-y-auto lg:border-r">
            <CurrentStep />
          </aside>
          <main className="relative h-[55vh] lg:h-auto lg:flex-1">
            <MapView />
          </main>
        </div>
      </div>
    </LakeProvider>
  );
}

function CurrentStep() {
  const { state } = useLake();
  switch (state.step) {
    case 1:
      return <LocateStep />;
    case 2:
      return <MarkFeaturesStep />;
    case 3:
      return <ParametersStep />;
    case 4:
      return <ResultsStep />;
  }
}
