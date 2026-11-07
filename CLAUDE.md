# CLAUDE.md — directivas del proyecto aula6misiones

Proyecto sin fines de lucro de padrinazgo en el Aula Satélite N° 6 (Escuela N° 120) de El Soberbio,
Misiones, Argentina. Sitio: https://aula6misiones.com.ar — **el repositorio es público**.

Comunicación con el usuario: en español rioplatense.

**Premisa: no instalar nada sin consentimiento explícito del usuario** (Node, paquetes npm,
dependencias globales o del proyecto, herramientas). Primero verificar y consultar.

## Stack

- Sitio estático con **Astro** (contenido en Markdown, fotos optimizadas por `astro:assets`).
- **Todo corre en Docker** (`docker-compose.yml`, imagen `node:24-alpine`). No usar el Node
  del host (es v20 y Astro 7 no lo soporta) ni instalar nada en el entorno local.
  - Vista previa: `docker compose up` → http://localhost:4321
  - Build: `docker compose run --rm web npm run build` → `dist/`
  - Scripts auxiliares (ej. sharp para procesar fotos): `docker compose run --rm web node ...`

## Estructura

```
src/content/historia/*.md   Hitos de la línea de tiempo (frontmatter: titulo, periodo, orden, galeria, videos)
src/content/textos/*.md     Textos sueltos (introduccion, maestra, necesidades, objetivos, agradecimientos…)
src/assets/fotos/<carpeta>/ Fotos NN.jpg (máx. 1600 px, sin EXIF); la carpeta se referencia en `galeria:`
src/components/             Galeria, Visor (lightbox único en el layout), Video (youtube-nocookie), Texto
src/layouts/Base.astro      Cabecera, menú, pie
src/pages/                  index, historia, como-ayudar, agradecimientos, 404
public/                     Se copia tal cual a dist/ (web.config, favicon.svg)
```

Origen del contenido: el Google Doc del proyecto (export `?format=txt` / `?format=zip`).

## Hosting

- Windows / IIS 10 con módulo URL Rewrite y PHP.
- SSL de Let's Encrypt para `aula6misiones.com.ar` y `www.aula6misiones.com.ar`.
- XAMPP local es Apache: **ignora `web.config`**. Las redirecciones se prueban en el servidor real.

## Redirecciones (`public/web.config`, no cambiar sin motivo)

1. `/.well-known/acme-challenge/` no se redirige (renovación del SSL).
2. `http` o `www` → `https://aula6misiones.com.ar/...` con **301**, en un solo salto, conservando ruta y query.

(En `main`, mientras el sitio no esté publicado, existe además la regla raíz `/` → Google Doc con **302**
y un `index.php` de respaldo. Al publicar el sitio se eliminan.)

## Flujo de trabajo y deploy

El deploy lo hace Claude directamente; **no** usar GitHub Actions, CI ni secrets,
ni pedirle al usuario pasos manuales.

1. Trabajar en una rama; `main` es lo que está en producción.
2. Build en Docker y revisar la vista previa.
3. Commit y push.
4. Al publicar: subir el contenido de `dist/` a la raíz `/` del hosting con el MCP `ftp-aula6misiones`.
5. Verificar con `curl -I` las variantes (`http`, `https`, con y sin `www`) y las páginas.

En el servidor **no borrar `/.well-known/`**.

## Reglas por ser repo público

- **Nunca** commitear credenciales, hosts FTP, usuarios, contraseñas ni configs de MCP
  (`.mcp.json`, `.env`, `.claude/settings.local.json` están en `.gitignore`).
- El proyecto involucra **menores de edad** (Ley 26.061): no publicar fotos donde se los
  pueda identificar, nombres de alumnos ni datos personales sin autorización escrita de
  padres o tutores. Lo que entra en git queda en el historial aunque se borre.
  Las fotos con chicos identificables del Doc quedaron **fuera** del sitio hasta que haya autorización.
