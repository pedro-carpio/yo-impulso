import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, "src", "assets", "empre.json");
const OUTPUT_PATH = path.join(ROOT, "supabase", "seed", "empre_seed.sql");
const BASE_URL = (process.env.EMPRE_BASE_URL || "https://main.d2qngvf75g8j96.amplifyapp.com").replace(/\/$/, "");
const ASSETS_PATH = process.env.EMPRE_ASSETS_PATH || "/assets/empre-images";

const assetBase = `${BASE_URL}${ASSETS_PATH.startsWith("/") ? "" : "/"}${ASSETS_PATH}`;

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
    .filter((item) => item.length > 0);
};

const sqlString = (value) => {
  if (value === null || value === undefined) return "NULL";
  const trimmed = String(value).trim();
  if (!trimmed) return "NULL";
  return `'${trimmed.replace(/'/g, "''")}'`;
};

const toJsonbArray = (values) => {
  if (!values || values.length === 0) return "'[]'::jsonb";
  const items = values.map((value) => sqlString(value)).join(", ");
  return `to_jsonb(ARRAY[${items}])`;
};

const splitName = (fullName) => {
  const clean = String(fullName || "").trim().replace(/\s+/g, " ");
  if (!clean) return { firstName: "Sin", lastName: "Nombre" };
  const parts = clean.split(" ");
  if (parts.length === 1) return { firstName: parts[0], lastName: "NA" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
};

const toBoolean = (value) => {
  if (!value) return null;
  const clean = String(value).trim().toLowerCase();
  if (clean === "si" || clean === "sí") return true;
  if (clean === "no") return false;
  return null;
};

const isVirtual = (entry) => {
  const haystack = `${entry.direccion || ""} ${entry.gps || ""}`.toLowerCase();
  return haystack.includes("virtual");
};

const buildFileName = (slug, type, index) => {
  const indexLabel = String(index + 1).padStart(2, "0");
  return `${slug}-${type}-${indexLabel}.webp`;
};

const buildAssetPaths = (entry, entryIndex) => {
  const slug = toAsciiSlug(`${entry.emprendimiento || "emprendimiento"}-${entryIndex + 1}`);
  const bannerUrls = splitUrls(entry.banner);
  const productUrls = splitUrls(entry.imagenesProductos);

  const bannerPaths = bannerUrls.map((_, index) => `${assetBase}/${buildFileName(slug, "banner", index)}`);
  const productPaths = productUrls.map((_, index) => `${assetBase}/${buildFileName(slug, "producto", index)}`);

  return { bannerPaths, productPaths };
};

const main = async () => {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  const entries = JSON.parse(raw);

  const categories = new Set();
  entries.forEach((entry) => {
    splitUrls(entry.rubro).forEach((category) => {
      categories.add(category);
    });
  });

  if (categories.size === 0) {
    categories.add("Sin categoria");
  }

  const categoryInserts = Array.from(categories)
    .sort()
    .map((category) => `(${sqlString(category)}, NULL)`)
    .join(",\n");

  const userInserts = entries
    .map((entry, index) => {
      const { firstName, lastName } = splitName(entry.emprendedor);
      const email = `user-${toAsciiSlug(entry.emprendimiento || "emprendimiento")}-${index + 1}@seed.local`;
      const phone = entry.telefono || null;
      return `(
  1,
  ${sqlString(firstName)},
  ${sqlString(lastName)},
  ${sqlString(phone)},
  ${sqlString(email)},
  ${sqlString("changeme")},
  TRUE
)`;
    })
    .join(",\n");

  const entrepreneurshipInserts = entries
    .map((entry, index) => {
      const rubros = splitUrls(entry.rubro);
      const category = rubros[0] || "Sin categoria";
      const { bannerPaths, productPaths } = buildAssetPaths(entry, index);
      const mainImage = bannerPaths[0] || null;
      const extraBanners = bannerPaths.slice(1);
      const allImages = productPaths.concat(extraBanners);
      const email = `user-${toAsciiSlug(entry.emprendimiento || "emprendimiento")}-${index + 1}@seed.local`;

      const sustainable = entry["¿Qué actividades de producción y operaciones sostenibles realizas en tu emprendimiento?"] || null;
      const reduceNonBiodegradable = toBoolean(entry["¿Tu proceso de producción busca reducir el uso de materiales o empaques no biodegradables?"]);
      const impact = entry["Impacto ambiental/social"] || "";
      const note = entry.nota || "";

      const infoParts = [];
      if (impact.trim()) infoParts.push(`impacto: ${impact}`);
      if (note.trim()) infoParts.push(`nota: ${note}`);
      const additionalInfo = infoParts.join(" | ");

      const socialNetworks = splitUrls(entry.redesSociales);

      return `(
  (SELECT "PK_user" FROM tbusers WHERE email = ${sqlString(email)}),
  (SELECT "PK_category" FROM tbmarketplacecategories WHERE category = ${sqlString(category)}),
  ${sqlString(entry.emprendimiento)},
  ${sqlString(entry.descripcion)},
  NULL,
  ${sqlString(entry.direccion)},
  ${sqlString(entry.gps)},
  ${sqlString(entry.horario)},
  ${sqlString(sustainable)},
  ${reduceNonBiodegradable === null ? "NULL" : reduceNonBiodegradable ? "TRUE" : "FALSE"},
  NULL,
  ${sqlString(additionalInfo)},
  ${sqlString(mainImage)},
  ${toJsonbArray(allImages)},
  ${sqlString(entry.catalogo)},
  ${toJsonbArray(socialNetworks)},
  ${isVirtual(entry) ? "TRUE" : "FALSE"},
  TRUE,
  NULL
)`;
    })
    .join(",\n");

  const sql = `-- Generated from src/assets/empre.json\n\nBEGIN;\n\nINSERT INTO tbmarketplacecategories (category, description)\nVALUES\n${categoryInserts}\nON CONFLICT (category) DO NOTHING;\n\nINSERT INTO tbusers (\n  "FK_privilege",\n  "firstName",\n  "lastName",\n  "phoneNumber",\n  email,\n  password,\n  status\n)\nVALUES\n${userInserts}\nON CONFLICT (email) DO NOTHING;\n\nINSERT INTO tbentrepreneurships (\n  "FK_user",\n  "FK_category",\n  "businessName",\n  description,\n  "locationType",\n  address,\n  "googleMapsUrl",\n  "businessHours",\n  "sustainableActivities",\n  "reduceNonBiodegradable",\n  "solvesEnvironmentalProblem",\n  "additionalInfo",\n  "mainImage",\n  images,\n  "catalogPdf",\n  "socialNetworks",\n  "isVirtual",\n  "isActive",\n  "actionHistory"\n)\nVALUES\n${entrepreneurshipInserts};\n\nCOMMIT;\n`;

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, sql, "utf-8");
  console.log(`SQL written to ${OUTPUT_PATH}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
