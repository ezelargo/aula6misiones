# aula6misiones

Proyecto de padrinazgo en el Aula Satélite N° 6 de la Escuela N° 120 de El Soberbio, Misiones, Argentina.

Sitio: https://aula6misiones.com.ar

Sitio estático hecho con [Astro](https://astro.build). El contenido está en Markdown para
que cualquier voluntario pueda editarlo desde GitHub, sin saber programar.

## Editar el contenido

| Qué | Dónde |
|---|---|
| Hitos de la historia (texto, videos, galería) | `src/content/historia/*.md` |
| Textos del sitio (introducción, la maestra, necesidades, objetivos, agradecimientos…) | `src/content/textos/*.md` |
| Fotos | `src/assets/fotos/<carpeta>/NN.jpg` |

Para agregar fotos a un hito, ponelas en la carpeta indicada en `galeria:` del `.md`,
numeradas (`01.jpg`, `02.jpg`…). Astro las optimiza automáticamente al compilar.

## Desarrollo local (con Docker, sin instalar Node)

```bash
docker compose up                          # vista previa en http://localhost:4321
docker compose run --rm web npm run build  # genera dist/ listo para subir
docker compose down -v                     # borra contenedor y dependencias
```

## Estructura

```
src/
  content/       Contenido en Markdown (historia y textos)
  assets/fotos/  Fotos originales (se optimizan al compilar)
  components/    Galería, visor de fotos, video, texto
  layouts/       Plantilla general (cabecera, menú, pie)
  pages/         Páginas: inicio, historia, cómo ayudar, agradecimientos, 404
  styles/        Estilos globales
public/          Se copia tal cual al sitio (web.config, favicon)
dist/            Resultado de la compilación (no se versiona)
```

## Deploy

Se compila (`npm run build` en Docker) y se sube el contenido de `dist/` por FTP a la
raíz del hosting (IIS). **Nunca** commitear credenciales.

No borrar `.well-known/` en el servidor: Let's Encrypt lo usa para renovar el certificado SSL.

## Privacidad

Este repositorio es público y el proyecto involucra a menores de edad.
No subir fotos donde se los pueda identificar, nombres completos ni datos personales
sin autorización escrita de sus padres o tutores (Ley 26.061). Lo que se sube a git
queda en el historial aunque después se borre.

## Licencias

- Código: [Apache 2.0](LICENSE)
- Contenido (textos e imágenes): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es), salvo indicación en contrario.
