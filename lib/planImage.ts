import { ISLAND_SIDE_M, type IslandResult } from "./calculations";

// Composes a map screenshot with a summary footer into a downloadable PNG.
// Colours match the map symbols in MapView.

const LEGEND: { label: string; color: string; shape: "square" | "circle" }[] = [
  { label: "Lake boundary", color: "rgb(37, 99, 235)", shape: "square" },
  { label: "Floating island", color: "rgb(245, 158, 11)", shape: "square" },
  { label: "Inlet", color: "rgb(22, 163, 74)", shape: "circle" },
  { label: "Outlet", color: "rgb(220, 38, 38)", shape: "circle" },
];

interface PlanSummary {
  result: IslandResult;
  areaM2: number | null;
  inletCount: number;
  outletCount: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load map screenshot."));
    img.src = src;
  });
}

export async function buildPlanImage(mapDataUrl: string, summary: PlanSummary): Promise<Blob> {
  const { result, areaM2, inletCount, outletCount } = summary;
  const map = await loadImage(mapDataUrl);
  const width = map.width;
  const u = Math.max(12, Math.round(width / 70)); // base font size, scales with the screenshot
  const pad = Math.round(u * 1.2);
  const footerHeight = Math.round(pad * 2 + u * 1.6 + u * 1.5 * 2 + u);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = map.height + footerHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported.");

  ctx.drawImage(map, 0, 0);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, map.height, width, footerHeight);
  ctx.fillStyle = "#e2e8f0";
  ctx.fillRect(0, map.height, width, Math.max(1, Math.round(u / 12)));

  const font = (size: number, weight = 400) => `${weight} ${Math.round(size)}px system-ui, -apple-system, "Segoe UI", sans-serif`;
  ctx.textBaseline = "top";
  let y = map.height + pad;

  ctx.fillStyle = "#0f172a";
  ctx.font = font(u * 1.3, 600);
  ctx.fillText(
    `${result.totalIslands.toLocaleString()} floating islands (${ISLAND_SIDE_M} m × ${ISLAND_SIDE_M} m)`,
    pad,
    y,
  );
  y += u * 1.6;

  const details = [
    `Coverage ${result.coverageM2.toLocaleString()} m²`,
    `${result.coveragePercent.toFixed(2)}% of lake surface`,
    areaM2 !== null && `Lake ${(areaM2 / 10_000).toLocaleString(undefined, { maximumFractionDigits: 2 })} ha`,
    `${inletCount} inlet${inletCount === 1 ? "" : "s"}`,
    `${outletCount} outlet${outletCount === 1 ? "" : "s"}`,
  ].filter(Boolean);
  ctx.fillStyle = "#475569";
  ctx.font = font(u);
  ctx.fillText(details.join("  ·  "), pad, y);
  y += u * 1.5;

  ctx.font = font(u * 0.85);
  let x = pad;
  const swatch = u * 0.8;
  for (const item of LEGEND) {
    ctx.fillStyle = item.color;
    if (item.shape === "circle") {
      ctx.beginPath();
      ctx.arc(x + swatch / 2, y + swatch / 2, swatch / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(x, y, swatch, swatch);
    }
    x += swatch + u * 0.4;
    ctx.fillStyle = "#475569";
    ctx.fillText(item.label, x, y);
    x += ctx.measureText(item.label).width + u * 1.2;
  }

  y += u * 1.5;

  ctx.fillStyle = "#94a3b8";
  ctx.font = font(u * 0.75);
  ctx.fillText(`Lake Treatment Planner · ${new Date().toISOString().slice(0, 10)} · Basemap © Esri`, pad, y);

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not create image."))), "image/png"),
  );
}
