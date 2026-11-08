// Detects a water body in a map screenshot by flood-filling pixels of similar
// colour from a clicked seed, then tracing the region's outer boundary.
// Pure pixel maths; coordinates in and out are image pixels.

export type PixelRing = [x: number, y: number][];

export type WaterTrace =
  | { ok: true; ring: PixelRing; touchesEdge: boolean }
  | { ok: false; reason: "not-water" | "too-small" };

/** Max RGB distance from the seed colour that still counts as the same water. */
const COLOR_TOLERANCE = 30;
/** Pixel radius for morphological closing, bridging gaps left by labels and anti-aliasing. */
const CLOSE_RADIUS = 2;
const MIN_PIXELS = 50;
const MAX_VERTICES = 300;

/** Map water is blue-dominant; this rejects clicks on land, roads and labels. */
function isBluish(r: number, g: number, b: number) {
  return b > r + 15 && b >= g;
}

export function traceWater(img: ImageData, seedX: number, seedY: number): WaterTrace {
  const { width: w, height: h, data } = img;
  const sx = Math.min(w - 1, Math.max(0, Math.round(seedX)));
  const sy = Math.min(h - 1, Math.max(0, Math.round(seedY)));
  const s = (sy * w + sx) * 4;
  const [r0, g0, b0] = [data[s], data[s + 1], data[s + 2]];
  if (!isBluish(r0, g0, b0)) return { ok: false, reason: "not-water" };

  const tol2 = COLOR_TOLERANCE * COLOR_TOLERANCE;
  const matches = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const dr = data[i * 4] - r0;
    const dg = data[i * 4 + 1] - g0;
    const db = data[i * 4 + 2] - b0;
    matches[i] = dr * dr + dg * dg + db * db <= tol2 ? 1 : 0;
  }

  const filled = floodFill(matches, w, h, sy * w + sx);
  const closed = erode(dilate(filled, w, h, CLOSE_RADIUS), w, h, CLOSE_RADIUS);
  // Closing can split off slivers; keep only the region containing the click.
  const region = floodFill(closed, w, h, sy * w + sx);

  let count = 0;
  let touchesEdge = false;
  for (let i = 0; i < w * h; i++) {
    if (!region[i]) continue;
    count++;
    const x = i % w;
    const y = (i / w) | 0;
    if (x === 0 || y === 0 || x === w - 1 || y === h - 1) touchesEdge = true;
  }
  if (count < MIN_PIXELS) return { ok: false, reason: "too-small" };

  const ring = simplifyRing(traceBoundary(region, w, h));
  if (ring.length < 3) return { ok: false, reason: "too-small" };
  return { ok: true, ring, touchesEdge };
}

/** 4-connected flood fill over `mask` from `start`. */
function floodFill(mask: Uint8Array, w: number, h: number, start: number): Uint8Array {
  const out = new Uint8Array(w * h);
  if (!mask[start]) return out;
  const stack = [start];
  out[start] = 1;
  while (stack.length) {
    const i = stack.pop()!;
    const x = i % w;
    const neighbours = [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, i - w, i + w];
    for (const n of neighbours) {
      if (n >= 0 && n < w * h && mask[n] && !out[n]) {
        out[n] = 1;
        stack.push(n);
      }
    }
  }
  return out;
}

/** Square-kernel max (dilate) or min (erode) filter, run separably along rows then columns. */
function boxFilter(mask: Uint8Array, w: number, h: number, r: number, keep: 0 | 1): Uint8Array {
  const pass = (src: Uint8Array, len: number, lines: number, at: (line: number, k: number) => number) => {
    const dst = new Uint8Array(w * h);
    for (let line = 0; line < lines; line++) {
      for (let k = 0; k < len; k++) {
        let v = 1 - keep;
        for (let j = Math.max(0, k - r); j <= Math.min(len - 1, k + r); j++) {
          if (src[at(line, j)] === keep) {
            v = keep;
            break;
          }
        }
        dst[at(line, k)] = v;
      }
    }
    return dst;
  };
  const rows = pass(mask, w, h, (y, x) => y * w + x);
  return pass(rows, h, w, (x, y) => y * w + x);
}

const dilate = (m: Uint8Array, w: number, h: number, r: number) => boxFilter(m, w, h, r, 1);
const erode = (m: Uint8Array, w: number, h: number, r: number) => boxFilter(m, w, h, r, 0);

// Neighbour offsets clockwise on screen (y down), starting east.
const DIRS: [number, number][] = [
  [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1],
];

function dirIndex(dx: number, dy: number) {
  return DIRS.findIndex(([x, y]) => x === dx && y === dy);
}

/** Moore-neighbour tracing of the outer boundary of a single region (pixel centres). */
function traceBoundary(region: Uint8Array, w: number, h: number): PixelRing {
  const inside = (x: number, y: number) => x >= 0 && y >= 0 && x < w && y < h && region[y * w + x] === 1;
  const first = region.indexOf(1);
  const start: [number, number] = [first % w, (first / w) | 0];
  const ring: PixelRing = [start];

  // The raster scan reached `start` from the west, so that neighbour is background.
  let [cx, cy] = start;
  let back = 4;
  let second: [number, number] | null = null;
  for (let guard = 0; guard < 4 * w * h; guard++) {
    let found = -1;
    for (let i = 1; i <= 8; i++) {
      const d = (back + i) % 8;
      if (inside(cx + DIRS[d][0], cy + DIRS[d][1])) {
        found = d;
        break;
      }
    }
    if (found < 0) break; // isolated pixel
    const nx = cx + DIRS[found][0];
    const ny = cy + DIRS[found][1];
    // Jacob's stopping criterion: back at the start, about to repeat the first step.
    if (second && cx === start[0] && cy === start[1] && nx === second[0] && ny === second[1]) break;
    second ??= [nx, ny];
    // The last background pixel checked becomes the backtrack for the next pixel.
    const prev = (found + 7) % 8;
    const bx = cx + DIRS[prev][0];
    const by = cy + DIRS[prev][1];
    back = dirIndex(bx - nx, by - ny);
    cx = nx;
    cy = ny;
    if (cx !== start[0] || cy !== start[1]) ring.push([cx, cy]);
  }
  return ring;
}

/** Douglas–Peucker on a closed ring, loosening the tolerance until it is editable. */
function simplifyRing(ring: PixelRing): PixelRing {
  if (ring.length <= 4) return ring;
  // Split the ring at the vertex farthest from the first, simplifying both halves.
  let far = 0;
  let farD = -1;
  for (let i = 1; i < ring.length; i++) {
    const d = (ring[i][0] - ring[0][0]) ** 2 + (ring[i][1] - ring[0][1]) ** 2;
    if (d > farD) [far, farD] = [i, d];
  }
  const closed = [...ring, ring[0]];
  for (let tol = 1.5; ; tol *= 1.5) {
    const a = douglasPeucker(closed.slice(0, far + 1), tol);
    const b = douglasPeucker(closed.slice(far), tol);
    const out = [...a, ...b.slice(1, -1)];
    if (out.length <= MAX_VERTICES || tol > 50) return out;
  }
}

function douglasPeucker(pts: PixelRing, tol: number): PixelRing {
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack: [number, number][] = [[0, pts.length - 1]];
  while (stack.length) {
    const [i0, i1] = stack.pop()!;
    const [x0, y0] = pts[i0];
    const [x1, y1] = pts[i1];
    const len = Math.hypot(x1 - x0, y1 - y0) || 1;
    let maxD = 0;
    let idx = -1;
    for (let i = i0 + 1; i < i1; i++) {
      const d = Math.abs((x1 - x0) * (y0 - pts[i][1]) - (x0 - pts[i][0]) * (y1 - y0)) / len;
      if (d > maxD) [maxD, idx] = [d, i];
    }
    if (idx >= 0 && maxD > tol) {
      keep[idx] = 1;
      stack.push([i0, idx], [idx, i1]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}
