/**
 * Genera public/sitemap.xml y public/robots.txt antes de cada build,
 * usando VITE_SITE_URL y el catálogo real de productos (src/data/products.js).
 *
 * Así, agregar un producto nuevo agrega automáticamente su URL al sitemap,
 * sin tener que tocar el XML a mano.
 *
 * Se ejecuta con: node scripts/generate-seo-files.js
 * (ya está enganchado en "npm run build", ver package.json)
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createServer } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

/* ── Cargar VITE_SITE_URL desde .env (si existe) sin depender de dotenv ── */
function loadSiteUrl() {
  const envPath = resolve(root, '.env');
  if (existsSync(envPath)) {
    const match = readFileSync(envPath, 'utf-8').match(/^VITE_SITE_URL=(.*)$/m);
    if (match) return match[1].trim().replace(/\/$/, '');
  }
  // En Vercel, las Environment Variables ya están en process.env durante el build
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL.replace(/\/$/, '');
  return 'https://aceros-peru.vercel.app';
}

const SITE_URL = loadSiteUrl();

/* ── Traer el catálogo real ──
   Se usa el resolvedor de Vite (no el de Node) porque products.js
   importa sin extensión (./categories, no ./categories.js), algo
   que Vite resuelve pero Node por sí solo no. */
const viteServer = await createServer({
  root,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'silent',
});
const { products } = await viteServer.ssrLoadModule('/src/data/products.js');
await viteServer.close();

/* ── Construir el sitemap ── */
const staticUrls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/categories', priority: '0.9', changefreq: 'weekly' },
];

const productUrls = products.map((p) => ({
  loc: `/product/${p.id}`,
  priority: '0.7',
  changefreq: 'monthly',
}));

const allUrls = [...staticUrls, ...productUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml);

/* ── robots.txt (mismo dominio, referencia al sitemap) ── */
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(resolve(root, 'public/robots.txt'), robots);

console.log(`✅ sitemap.xml generado con ${allUrls.length} URLs (${SITE_URL})`);
console.log('✅ robots.txt actualizado');
