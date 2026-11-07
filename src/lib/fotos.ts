import type { ImageMetadata } from 'astro';

// Todas las fotos de src/assets/fotos/<carpeta>/<NN>.jpg
const todas = import.meta.glob<{ default: ImageMetadata }>('../assets/fotos/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
});

/** Devuelve las fotos de una carpeta, ordenadas por nombre de archivo. */
export function fotosDe(carpeta: string): ImageMetadata[] {
  return Object.entries(todas)
    .filter(([ruta]) => ruta.includes(`/fotos/${carpeta}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, modulo]) => modulo.default);
}

/** Devuelve una foto puntual: foto('portada', 1) -> portada/01.jpg */
export function foto(carpeta: string, numero: number): ImageMetadata {
  const lista = fotosDe(carpeta);
  const encontrada = lista[numero - 1];
  if (!encontrada) throw new Error(`No existe la foto ${numero} en src/assets/fotos/${carpeta}/`);
  return encontrada;
}
