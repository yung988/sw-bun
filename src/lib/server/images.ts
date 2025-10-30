import { promises as fs } from "node:fs";
import path from "node:path";

// Server-only helpers to resolve images that actually exist in public/images

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");

let cachedIndex: Set<string> | null = null;
let cachedDirMap: Map<string, string[]> | null = null;

// Normalize to served path (/images/...) using actual filenames from disk
async function buildImagesIndex(): Promise<Set<string>> {
  const index = new Set<string>();

  async function walk(dirAbs: string, base = "/images") {
    let entries: string[] = [];
    try {
      entries = await fs.readdir(dirAbs);
    } catch {
      return;
    }
    for (const name of entries) {
      const abs = path.join(dirAbs, name);
      const rel = path.join(base, name).replace(/\\/g, "/");
      const stat = await fs.stat(abs);
      if (stat.isDirectory()) {
        await walk(abs, rel);
      } else if (/(?:\.jpe?g|\.png|\.webp|\.avif)$/i.test(name)) {
        index.add(rel);
      }
    }
  }

  await walk(IMAGES_DIR);
  return index;
}

async function getIndex(): Promise<Set<string>> {
  if (!cachedIndex) {
    cachedIndex = await buildImagesIndex();
  }
  return cachedIndex;
}

function ensureDirMap(): Map<string, string[]> {
  if (cachedDirMap) return cachedDirMap;
  // Map category slugs -> preferred image directories (by priority)
  // Use directory names present in public/images
  cachedDirMap = new Map<string, string[]>([
    ["kosmetika", ["kosmetika"]],
    ["hifu", ["hifu"]],
    ["hifu-tvar", ["hifu"]],
    ["hifu-telo", ["hifu"]],
    ["budovani-svalu", ["ems"]],
    ["ems", ["ems"]],
    ["endosphere", ["stylizované", "stylizované", "lpg"]],
    ["kavitace", ["kavitace"]],
    ["lpg", ["lpg"]],
    ["hydrafacial", ["kosmetika"]],
    ["radiofrekvence", ["radiofrekvence"]],
    ["lymfodrenaz", ["stylizované", "stylizované", "salon"]],
    ["ostatni-sluzby", ["stylizované", "stylizované", "salon"]],
  ]);
  return cachedDirMap;
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function dirCandidates(categoryId: string): string[] {
  const map = ensureDirMap();
  const fromMap = map.get(categoryId) || [];
  // Always add broad fallbacks at the end
  return unique([...fromMap, "kosmetika", "salon", "stylizované", "stylizované"]);
}

async function collectFromDirs(dirs: string[]): Promise<string[]> {
  const files: string[] = [];
  for (const d of dirs) {
    const abs = path.join(IMAGES_DIR, d);
    let entries: string[] = [];
    try {
      entries = await fs.readdir(abs);
    } catch {
      continue;
    }
    const picks = entries
      .filter((n) => /\.(?:jpe?g|png|webp|avif)$/i.test(n))
      .sort((a, b) => a.localeCompare(b))
      .map((n) => `/images/${d}/${n}`);
    files.push(...picks);
  }
  return unique(files);
}

export async function resolveExisting(candidates: string[], fallback?: string): Promise<string> {
  const index = await getIndex();
  for (const c of candidates) {
    if (index.has(c)) return c;
  }
  if (fallback && index.has(fallback)) return fallback;
  // last resort – pick some salon photo if exists, or first available
  const salon = Array.from(index).find((p) => p.startsWith("/images/salon/"));
  return salon || Array.from(index)[0] || "/images/salon/recepce.jpg";
}

export async function getCategoryMosaicServer(categoryId: string, limit = 12): Promise<string[]> {
  const files = await collectFromDirs(dirCandidates(categoryId));
  return files.slice(0, limit);
}

export async function getCategoryCoverServer(categoryId: string): Promise<string> {
  const mosaic = await getCategoryMosaicServer(categoryId, 1);
  if (mosaic.length) return mosaic[0];
  return resolveExisting(["/images/salon/recepce.jpg"], "/images/salon/recepce.jpg");
}

export async function getAvatars(count = 3): Promise<string[]> {
  const preferred = ["hifu", "endosphere", "kosmetika", "ems", "salon"];
  const picks: string[] = [];
  for (const id of preferred) {
    const cover = await getCategoryCoverServer(id);
    if (cover) picks.push(cover);
    if (picks.length >= count) break;
  }
  return picks.slice(0, count);
}

export async function clearImagesCache() {
  cachedIndex = null;
  cachedDirMap = null;
}

// --- Brand assets ---------------------------------------------------------

async function existsPublic(relPath: string): Promise<boolean> {
  try {
    const abs = path.join(PUBLIC_DIR, relPath.replace(/^\/+/, ''));
    const st = await fs.stat(abs);
    return st.isFile();
  } catch {
    return false;
  }
}

/**
 * Pick the best available logo asset. Prefers SVG when present.
 */
export async function getBrandLogoServer(opts?: { preferRaster?: boolean }): Promise<string> {
  const preferRaster = !!opts?.preferRaster;
  const svgCandidates = [
    "/logo.svg",
    "/images/logo.svg",
    "/images/logo-sw.svg",
    "/branding/logo.svg",
  ];
  const rasterCandidates = [
    "/images/logo.png",
    "/images/sw-logo.png",
    "/images/salon/logonazdi.jpg",
  ];

  const firstExisting = async (cands: string[]) => {
    for (const c of cands) {
      if (await existsPublic(c)) return c;
    }
    return null;
  };

  if (!preferRaster) {
    const svg = await firstExisting(svgCandidates);
    if (svg) return svg;
  }

  const ras = await firstExisting(rasterCandidates);
  if (ras) return ras;

  // last resort: any salon image
  const index = await getIndex();
  const anySalon = Array.from(index).find((p) => p.startsWith("/images/salon/"));
  return anySalon || "/images/salon/recepce.jpg";
}

export async function getFaviconServer(): Promise<string> {
  if (await existsPublic("/favicon.ico")) return "/favicon.ico";
  // fall back to logo (browsers may still display it)
  const logo = await getBrandLogoServer();
  return logo || "/images/salon/recepce.jpg";
}

// --- Media helpers --------------------------------------------------------

export async function getMoviesListServer(subdir = "movies"): Promise<string[]> {
  const dir = path.join(PUBLIC_DIR, subdir);
  try {
    const entries = await fs.readdir(dir);
    const files = entries
      .filter((n) => /\.(mp4|webm|mov|m4v)$/i.test(n))
      .sort((a, b) => a.localeCompare(b))
      .map((n) => `/${subdir}/${n}`);
    return files;
  } catch {
    return [];
  }
}
