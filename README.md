# Casa Costa — demo de sitio

Propuesta de página para Casa Costa (9 de Julio 500, Concepción del Uruguay): una landing que explica qué es la casa, muestra sus espacios, algunas marcas, la agenda del mes y cómo llegar.

Es sólo front: no hay backend ni formularios. Los botones de contacto abren el Instagram de la casa.

## Stack

El mismo que Lufinha Studio: **Next.js 16 (App Router) + React 19 + TypeScript + CSS Modules**, con **GSAP** (ScrollTrigger) y **Lenis** para el movimiento. Las tipografías (Cormorant Garamond y Jost) están autoalojadas en `src/app/fonts` y se cargan con `next/font/local`.

## Correr el proyecto

```bash
npm install     # instala las dependencias (crea node_modules)
npm run dev     # levanta el servidor de desarrollo en http://localhost:3000
npm run build   # genera la versión de producción y avisa si algo falla
```

## Dónde se edita cada cosa

- `src/content/site.ts` — todo el contenido: dirección, horarios, espacios del plano (con la posición de cada punto), marcas, agenda y pasos de "Sumá tu marca".
- `src/app/globals.css` — paleta, tipografías y escala.
- `src/components/home/*` — una sección por archivo, cada una con su `.module.css`.
- `public/img/casa` y `public/img/marcas` — fotos. Las de marcas salen del Instagram de cada una; antes de publicar conviene pedirlas en buena calidad.

## Para cambiar la agenda de otro mes

Editá `agendaMonth` y la lista `agenda` en `src/content/site.ts`. Las fechas van como `AAAA-MM-DD`; la página marca sola cuáles ya pasaron y cuál es la próxima.
