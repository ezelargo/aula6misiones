# aula6misiones

Proyecto de padrinazgo en el Aula N° 6 de El Soberbio, Misiones, Argentina.

Sitio: https://aula6misiones.com.ar

## Estado actual

Por ahora el dominio redirige a un Google Doc con la información del proyecto.
El plan es reemplazarlo por un sitio estático (Astro), con el contenido en Markdown
para que cualquier voluntario pueda editarlo desde GitHub.

## Estructura

```
public/                        Archivos que se suben tal cual al servidor
  web.config                   Redirecciones (https, sin www, raíz → Google Doc)
  index.php                    Respaldo de las redirecciones si falla web.config
```

Fase 2: se agrega `src/` con el sitio en Astro; se compila y se sube `dist/`.

## Deploy

El contenido de `public/` se sube por FTP a la raíz del hosting (IIS).
**Nunca** commitear credenciales.

No borrar `.well-known/` en el servidor: Let's Encrypt lo usa para renovar el certificado SSL.

## Privacidad

Este repositorio es público y el proyecto involucra a menores de edad.
No subir fotos donde se los pueda identificar, nombres completos ni datos personales
sin autorización escrita de sus padres o tutores (Ley 26.061). Lo que se sube a git
queda en el historial aunque después se borre.

## Licencias

- Código: [Apache 2.0](LICENSE)
- Contenido (textos e imágenes): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es), salvo indicación en contrario.
