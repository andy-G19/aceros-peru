/**
 * Prerenderiza cada URL de public/sitemap.xml a un HTML estático dentro de
 * dist/, para que los bots que no ejecutan JS (previews de WhatsApp,
 * Facebook, Twitter/X, LinkedIn) reciban el <title>/OG/canonical/JSON-LD
 * reales de cada página, no los del Home.
 *
 * Se ejecuta con: node scripts/prerender.js
 * (ya está enganchado en "npm run build", después de "vite build", ver package.json)
 *
 * Requiere que "vite build" ya haya corrido (usa dist/ + el sitemap generado
 * por generate-seo-files.js).
 *
 * Usa puppeteer-core + @sparticuz/chromium en vez de Playwright: ese Chromium
 * viene empaquetado dentro del propio paquete de npm (sin descargas externas
 * ni "apt-get"), compilado específicamente para entornos de build restringidos
 * como el de Vercel — Playwright con Chromium normal falla ahí por librerías
 * del sistema faltantes (libnspr4.so y otras) que no se pueden instalar sin
 * permisos de administrador.
 */
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { preview } from 'vite';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const PORT = 4173;

function loadSiteUrl() {
  const envPath = resolve(root, '.env');
  try {
    const match = readFileSync(envPath, 'utf-8').match(/^VITE_SITE_URL=(.*)$/m);
    if (match) return match[1].trim().replace(/\/$/, '');
  } catch {
    // .env no existe, seguir con las otras fuentes
  }
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL.replace(/\/$/, '');
  return 'https://aceros-peru.vercel.app';
}

const SITE_URL = loadSiteUrl();

/* ── Rutas a prerenderizar: todas las del sitemap salvo el home,
   que ya sale correcto de "vite build" ── */
const sitemapXml = readFileSync(resolve(root, 'public/sitemap.xml'), 'utf-8');
const routes = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((m) => m[1].replace(SITE_URL, '') || '/')
  .filter((route) => route !== '/');

const previewServer = await preview({
  root,
  preview: { port: PORT, strictPort: true },
  logLevel: 'silent',
});

const browser = await puppeteer.launch({
  executablePath: await chromium.executablePath(),
  args: chromium.args,
  headless: chromium.headless,
});
const page = await browser.newPage();

for (const route of routes) {
  const expectedCanonical = `${SITE_URL}${route}`;
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' });
  await page.waitForFunction(
    // eslint-disable-next-line no-undef -- runs in the browser page, not Node
    (expected) => document.querySelector('link[rel="canonical"]')?.href === expected,
    { timeout: 10000 },
    expectedCanonical
  );

  const html = await page.content();
  const outDir = resolve(root, `dist${route}`);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'index.html'), html);
}

await browser.close();
await previewServer.close();

console.log(`✅ ${routes.length} rutas prerenderizadas en dist/`);
