import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, "src", "assets", "empre.json");
const OUT_DIR = path.join(ROOT, process.env.EMPRE_ASSETS_DIR || "src/assets/empre-images");
const MAX_WIDTH = Number(process.env.EMPRE_MAX_WIDTH || 1200);
const WEBP_QUALITY = Number(process.env.EMPRE_WEBP_QUALITY || 82);

const toAsciiSlug = (value) => {
  const normalized = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return normalized || "emprendimiento";
};

const splitUrls = (value) => {
  if (!value || typeof value !== "string") return [];
  return value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter((item) => item.startsWith("http"));
};

const extractDriveId = (url) => {
  const openIdMatch = url.match(/[?&]id=([^&]+)/i);
  if (openIdMatch?.[1]) return openIdMatch[1];
  const fileMatch = url.match(/\/file\/d\/([^/]+)/i);
  if (fileMatch?.[1]) return fileMatch[1];
  return null;
};

const normalizeUrl = (url) => {
  if (!url.includes("drive.google.com")) return url;
  const id = extractDriveId(url);
  if (!id) return url;
  return `https://drive.google.com/uc?export=download&id=${id}`;
};

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const downloadAndConvert = async (url, outPath) => {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status} ${response.statusText}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await sharp(buffer)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outPath);
};

const buildFileName = (slug, type, index) => {
  const indexLabel = String(index + 1).padStart(2, "0");
  return `${slug}-${type}-${indexLabel}.webp`;
};

const main = async () => {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  const entries = JSON.parse(raw);
  await ensureDir(OUT_DIR);

  const tasks = [];
  const seen = new Set();

  entries.forEach((entry, entryIndex) => {
    const slug = toAsciiSlug(`${entry.emprendimiento || "emprendimiento"}-${entryIndex + 1}`);
    const bannerUrls = splitUrls(entry.banner);
    const productUrls = splitUrls(entry.imagenesProductos);

    bannerUrls.forEach((url, index) => {
      const normalized = normalizeUrl(url);
      const fileName = buildFileName(slug, "banner", index);
      const outPath = path.join(OUT_DIR, fileName);
      if (seen.has(outPath)) return;
      seen.add(outPath);
      tasks.push({ normalized, outPath });
    });

    productUrls.forEach((url, index) => {
      const normalized = normalizeUrl(url);
      const fileName = buildFileName(slug, "producto", index);
      const outPath = path.join(OUT_DIR, fileName);
      if (seen.has(outPath)) return;
      seen.add(outPath);
      tasks.push({ normalized, outPath });
    });
  });

  for (const task of tasks) {
    try {
      await fs.access(task.outPath);
      console.log(`Skip (exists): ${task.outPath}`);
      continue;
    } catch (error) {
      if (error?.code !== "ENOENT") {
        console.warn(`Skip (access error): ${task.outPath}`);
        continue;
      }
    }

    try {
      console.log(`Downloading: ${task.normalized}`);
      await downloadAndConvert(task.normalized, task.outPath);
      console.log(`Saved: ${task.outPath}`);
    } catch (error) {
      console.warn(`Failed: ${task.normalized}`);
      console.warn(error?.message || error);
    }
  }

  console.log("Done.");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
