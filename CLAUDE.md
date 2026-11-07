# CLAUDE.md — directivas del proyecto aula6misiones

Proyecto sin fines de lucro de padrinazgo en el Aula N° 6 de El Soberbio, Misiones, Argentina.
Sitio: https://aula6misiones.com.ar — **el repositorio es público**.

Comunicación con el usuario: en español rioplatense.

**Premisa: no instalar nada sin consentimiento explícito del usuario** (Node, paquetes npm,
dependencias globales o del proyecto, herramientas). Primero verificar y consultar.

## Estructura

```
public/        Lo que se sube al servidor, tal cual
  web.config   Redirecciones (IIS + URL Rewrite)
  index.php    Respaldo de las redirecciones en PHP
README.md
LICENSE        Apache 2.0 (código). Contenido: CC BY 4.0
```

Fase 2 (futura): sitio estático en **Astro** en `src/` con el contenido en Markdown
(migrado del Google Doc); se compila y se sube `dist/` en lugar de `public/`.

## Hosting

- Windows / IIS 10 con módulo URL Rewrite y PHP.
- SSL de Let's Encrypt para `aula6misiones.com.ar` y `www.aula6misiones.com.ar`.
- XAMPP local es Apache: **ignora `web.config`**. Las redirecciones se prueban en el servidor real.

## Redirecciones (no cambiar sin motivo)

1. `/.well-known/acme-challenge/` no se redirige (renovación del SSL).
2. `http` o `www` → `https://aula6misiones.com.ar/...` con **301**, en un solo salto, conservando ruta y query.
3. Raíz `/` → Google Doc con **302** (temporal: se reemplazará por el sitio). Nunca usar 301 acá.

Si se cambia el link del Doc, actualizarlo en `web.config` **y** en `index.php`.

## Flujo de deploy

El deploy lo hace Claude directamente; **no** usar GitHub Actions, CI ni secrets,
ni pedirle al usuario pasos manuales.

1. Hacer los cambios en el repo local.
2. Commit y push a `main`.
3. Subir los archivos de `public/` a la raíz `/` del hosting con el MCP `ftp-aula6misiones`.
4. Verificar con `curl -I` las variantes (`http`, `https`, con y sin `www`).

En el servidor **no borrar `/.well-known/`**.

## Reglas por ser repo público

- **Nunca** commitear credenciales, hosts FTP, usuarios, contraseñas ni configs de MCP
  (`.mcp.json`, `.env`, `.claude/settings.local.json` están en `.gitignore`).
- El proyecto involucra **menores de edad** (Ley 26.061): no subir fotos donde se los
  pueda identificar, nombres completos ni datos personales sin autorización escrita de
  padres o tutores. Lo que entra en git queda en el historial aunque se borre.
