"use client";

import { useState, type FormEvent } from "react";
import { useLake } from "@/context/LakeContext";
import { PARAMETER_FIELDS, validateParameter, type ParameterField } from "@/lib/parameters";
import type { LakeParameters } from "@/lib/types";
import { Button, Card, StepFooter, StepHeading, formatArea } from "../ui";

type RawValues = Record<keyof LakeParameters, string>;

export default function ParametersStep() {
  const { state, dispatch } = useLake();
  const { features, measurements, parameters } = state;

  const [values, setValues] = useState<RawValues>(() => {
    const entries = PARAMETER_FIELDS.map((f) => [f.key, String(parameters?.[f.key] ?? f.defaultValue ?? "")]);
    return Object.fromEntries(entries) as RawValues;
  });
  const [touched, setTouched] = useState<Partial<Record<keyof LakeParameters, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = Object.fromEntries(PARAMETER_FIELDS.map((f) => [f.key, validateParameter(f, values[f.key])])) as Record<
    keyof LakeParameters,
    string | null
  >;
  const isValid = Object.values(errors).every((e) => e === null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;
    const parsed = Object.fromEntries(
      PARAMETER_FIELDS.map((f) => [f.key, values[f.key].trim() === "" ? (f.defaultValue ?? 0) : Number(values[f.key])]),
    ) as unknown as LakeParameters;
    dispatch({ type: "SET_PARAMETERS", parameters: parsed });
    dispatch({ type: "GO_TO_STEP", step: 4 });
  };

  const area = measurements.areaM2 !== null ? formatArea(measurements.areaM2) : null;

  return (
    <form onSubmit={onSubmit} noValidate>
      <StepHeading title="Water-quality parameters">Enter the lake measurements used to size the treatment.</StepHeading>

      <div className="space-y-4">
        {PARAMETER_FIELDS.map((field) => (
          <ParameterInput
            key={field.key}
            field={field}
            value={values[field.key]}
            error={submitted || touched[field.key] ? errors[field.key] : null}
            onChange={(v) => setValues((prev) => ({ ...prev, [field.key]: v }))}
            onBlur={() => setTouched((prev) => ({ ...prev, [field.key]: true }))}
          />
        ))}
      </div>

      <Card className="mt-5 bg-slate-50">
        <p className="mb-2 text-xs font-medium tracking-wide text-slate-500 uppercase">From the map</p>
        <dl className="grid grid-cols-3 gap-2 text-center">
          <Summary label="Lake area" value={area?.hectares ?? "—"} sub={area?.squareMetres} />
          <Summary label="Inlets" value={String(features.inlets.length)} />
          <Summary label="Outlets" value={String(features.outlets.length)} />
        </dl>
      </Card>

      <StepFooter>
        <Button variant="ghost" onClick={() => dispatch({ type: "GO_TO_STEP", step: 2 })}>
          ← Back
        </Button>
        <Button type="submit" variant="primary" disabled={measurements.areaM2 === null}>
          Calculate results
        </Button>
      </StepFooter>
    </form>
  );
}

function ParameterInput(props: {
  field: ParameterField;
  value: string;
  error: string | null;
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  const { field, value, error, onChange, onBlur } = props;
  const id = `param-${field.key}`;
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {field.label}
          {field.required ? <span className="text-red-600"> *</span> : <span className="font-normal text-slate-400"> (optional)</span>}
        </label>
        <span className="group relative">
          <button
            type="button"
            aria-label={`About ${field.label}`}
            aria-describedby={`${id}-help`}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600 focus-visible:outline-2 focus-visible:outline-teal-600"
          >
            ?
          </button>
          <span
            id={`${id}-help`}
            role="tooltip"
            className="invisible absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
          >
            {field.help}
          </span>
        </span>
      </div>
      <div
        className={`mt-1 flex rounded-lg border shadow-sm focus-within:ring-2 ${
          error ? "border-red-400 focus-within:ring-red-200" : "border-slate-300 focus-within:border-teal-500 focus-within:ring-teal-200"
        }`}
      >
        <input
          id={id}
          inputMode="decimal"
          value={value}
          placeholder={field.defaultValue !== undefined ? String(field.defaultValue) : undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-required={field.required}
          aria-describedby={error ? `${id}-error` : `${id}-help`}
          className="w-full min-w-0 rounded-l-lg px-3 py-2 text-sm focus:outline-none"
        />
        <span className="flex items-center rounded-r-lg border-l border-slate-200 bg-slate-50 px-3 text-xs text-slate-500">
          {field.unit}
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function Summary({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="text-base font-semibold text-slate-900">{value}</dd>
      {sub && <dd className="text-[11px] text-slate-500">{sub}</dd>}
    </div>
  );
}
