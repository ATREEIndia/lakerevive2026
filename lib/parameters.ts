import { DEFAULT_TARGET_TP_MG_L } from "./calculations";
import type { LakeParameters } from "./types";

// Labels, units and validation for the Step 3 form. Rename a field here and it
// changes everywhere (form, results, export).

export interface ParameterField {
  key: keyof LakeParameters;
  label: string;
  unit: string;
  help: string;
  required: boolean;
  /** Value must be strictly greater than 0 (otherwise ≥ 0). */
  positive: boolean;
  defaultValue?: number;
}

export const PARAMETER_FIELDS: ParameterField[] = [
  {
    key: "depthM",
    label: "Average lake depth",
    unit: "m",
    help: "Mean water depth across the lake. Used to estimate water volume.",
    required: true,
    positive: true,
  },
  {
    key: "tpMgL",
    label: "Total Phosphorus (TP)",
    unit: "mg/L",
    help: "Measured total phosphorus concentration in the lake water.",
    required: true,
    positive: false,
  },
  {
    // TODO: confirm what this parameter means and rename the label/help.
    key: "phosphorusMgL",
    label: "Phosphorus value",
    unit: "mg/L",
    help: "Additional phosphorus concentration (meaning to be confirmed).",
    required: true,
    positive: false,
  },
  {
    key: "targetTpMgL",
    label: "Target TP",
    unit: "mg/L",
    help: `Desired total phosphorus after treatment. Defaults to ${DEFAULT_TARGET_TP_MG_L} mg/L.`,
    required: false,
    positive: false,
    defaultValue: DEFAULT_TARGET_TP_MG_L,
  },
];

/** Returns an error message, or null if the raw input is valid. */
export function validateParameter(field: ParameterField, raw: string): string | null {
  const text = raw.trim();
  if (text === "") return field.required ? "Required" : null;
  const value = Number(text);
  if (!Number.isFinite(value)) return "Enter a number";
  if (field.positive && value <= 0) return "Must be greater than 0";
  if (value < 0) return "Must be 0 or more";
  return null;
}
