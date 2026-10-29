// All island-sizing logic lives here. Pure functions only: no React, no ArcGIS.
// To plug in the real model, replace the body of `calculateIslands` (and, if the
// split between inlets should be weighted, `distributeIslands`).


export interface LakeInputs {
  areaM2: number;
  depthM: number;
  tpMgL: number;
  phosphorusMgL: number;
  targetTpMgL: number;
  inletCount: number;
  outletCount: number;
}

export interface IslandResult {
  totalIslands: number;
  islandsPerInlet: number[];
  coverageM2: number;
  coveragePercent: number;
  notes: string[];
}

/** Each floating treatment island is a 2 m × 2 m square. */
export const ISLAND_SIDE_M = 2;
export const ISLAND_AREA_M2 = ISLAND_SIDE_M * ISLAND_SIDE_M;

export const DEFAULT_TARGET_TP_MG_L = 0.03;

// TODO: replace with real model — placeholder assumptions.
const KG_P_REMOVED_PER_ISLAND = 0.5;
const MAX_COVERAGE_FRACTION = 0.1;

export function calculateIslands(inputs: LakeInputs): IslandResult {
  const notes: string[] = [];

  // TODO: replace with real model
  // volume (m³) × concentration (mg/L) / 1000 = load (kg), since 1 m³ = 1000 L.
  const volumeM3 = inputs.areaM2 * inputs.depthM;
  const excessTp = Math.max(inputs.tpMgL - inputs.targetTpMgL, 0);
  const phosphorusLoadKg = (volumeM3 * (excessTp + inputs.phosphorusMgL)) / 1000;
  // The epsilon stops float noise (0.1 - 0.03 = 0.07000000000000001) adding an island.
  let totalIslands = Math.max(1, Math.ceil(phosphorusLoadKg / KG_P_REMOVED_PER_ISLAND - 1e-9));

  notes.push(
    `Estimated phosphorus load: ${phosphorusLoadKg.toFixed(2)} kg ` +
      `(volume ${Math.round(volumeM3).toLocaleString()} m³).`,
  );

  const maxIslands = Math.floor((inputs.areaM2 * MAX_COVERAGE_FRACTION) / ISLAND_AREA_M2);
  if (totalIslands > maxIslands) {
    notes.push(
      `Capped at ${maxIslands.toLocaleString()} islands (${MAX_COVERAGE_FRACTION * 100}% of lake ` +
        `surface); the model asked for ${totalIslands.toLocaleString()}.`,
    );
    totalIslands = maxIslands;
  }

  const coverageM2 = totalIslands * ISLAND_AREA_M2;

  return {
    totalIslands,
    islandsPerInlet: distributeIslands(totalIslands, inputs.inletCount),
    coverageM2,
    coveragePercent: inputs.areaM2 > 0 ? (coverageM2 / inputs.areaM2) * 100 : 0,
    notes,
  };
}

/**
 * Split `total` islands across inlets. Equal weights for now; pass `weights`
 * (e.g. inflow per inlet) to distribute proportionally. Uses the largest
 * remainder method so the parts always sum to `total`.
 */
export function distributeIslands(
  total: number,
  inletCount: number,
  weights: number[] = Array(inletCount).fill(1),
): number[] {
  if (inletCount <= 0) return [];
  const weightSum = weights.reduce((sum, w) => sum + w, 0) || 1;
  const exact = weights.map((w) => (total * w) / weightSum);
  const parts = exact.map(Math.floor);
  let remaining = total - parts.reduce((sum, n) => sum + n, 0);

  const byRemainder = exact
    .map((value, index) => ({ index, remainder: value - Math.floor(value) }))
    .sort((a, b) => b.remainder - a.remainder || a.index - b.index);
  for (const { index } of byRemainder) {
    if (remaining <= 0) break;
    parts[index] += 1;
    remaining -= 1;
  }
  return parts;
}
