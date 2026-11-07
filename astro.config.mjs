// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://aula6misiones.com.ar',
  output: 'static',
  build: {
    // /historia/ -> /historia/index.html (IIS lo sirve como documento por defecto)
    format: 'directory',
  },
});
