import esriConfig from "@arcgis/core/config";

// Import this module (for its side effect) before any ArcGIS service call.
export const ARCGIS_API_KEY = process.env.NEXT_PUBLIC_ARCGIS_API_KEY ?? "";

if (ARCGIS_API_KEY) {
  esriConfig.apiKey = ARCGIS_API_KEY;
}
