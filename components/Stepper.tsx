"use client";

import { canVisitStep, useLake } from "@/context/LakeContext";
import type { Step } from "@/lib/types";

const STEPS: { step: Step; label: string }[] = [
  { step: 1, label: "Locate lake" },
  { step: 2, label: "Mark features" },
  { step: 3, label: "Parameters" },
  { step: 4, label: "Results" },
];

export default function Stepper() {
  const { state, dispatch } = useLake();

  return (
    <nav aria-label="Progress">
      <ol className="flex items-center gap-1 sm:gap-2">
        {STEPS.map(({ step, label }, i) => {
          const current = state.step === step;
          const done = state.step > step;
          const enabled = !current && canVisitStep(state, step);
          return (
            <li key={step} className="flex items-center gap-1 sm:gap-2">
              {i > 0 && <span aria-hidden className={`h-px w-4 sm:w-8 ${done || current ? "bg-teal-500" : "bg-slate-200"}`} />}
              <button
                type="button"
                disabled={!enabled}
                aria-current={current ? "step" : undefined}
                onClick={() => dispatch({ type: "GO_TO_STEP", step })}
                className="group flex items-center gap-2 rounded-full py-1 pr-2 pl-1 text-sm focus-visible:outline-2 focus-visible:outline-teal-600 enabled:hover:bg-slate-100 disabled:cursor-default"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    current
                      ? "bg-teal-600 text-white ring-4 ring-teal-100"
                      : done
                        ? "bg-teal-100 text-teal-700"
                        : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {done ? "✓" : step}
                </span>
                <span
                  className={`hidden md:inline ${current ? "font-semibold text-slate-900" : "text-slate-500"}`}
                >
                  {label}
                </span>
                <span className="sr-only md:hidden">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
