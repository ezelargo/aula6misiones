// Sitemap para buscadores, generado en el build (sin plugins extra).
// Toma todas las páginas de src/pages salvo la 404 y este mismo archivo.
import type { APIRoute } from 'astro';

const paginas = Object.keys(import.meta.glob('./**/*.astro'))
  .map((archivo) => archivo.replace(/^\.\//, '').replace(/\.astro$/, ''))
  .filter((nombre) => nombre !== '404')
  .map((nombre) => (nombre === 'index' ? '/' : `/${nombre.replace(/\/index$/, '')}/`))
  .sort();

export const GET: APIRoute = ({ site }) => {
  const urls = paginas
    .map((ruta) => `  <url><loc>${new URL(ruta, site).href}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
