# NÓMADA — Café · Cocina · Bar

Menú digital interactivo (demo comercial). React + Vite + GSAP.

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

Listo para deploy en Vercel (framework preset: Vite).

## Adaptar a un negocio real

| Qué cambiar | Dónde |
| --- | --- |
| Nombre, WhatsApp, Instagram, horarios, dirección | `src/config/business.js` |
| Activar/desactivar pedidos por WhatsApp | `orderingEnabled` en `src/config/business.js` |
| Productos, precios, categorías, extras | `src/data/menu.js` |
| Logo / isotipo | `public/brand/*.svg` |
| Colores de marca | `src/styles/tokens.css` y `src/components/art/tones.js` |
| Fotografía real (reemplaza las ilustraciones) | ver `ASSETS_NEEDED.md` |

## Estructura

```
src/
  components/     UI reutilizable (cards, modal, carrito, nav, ilustración)
  sections/       Intro, Hero, MenuSection, Footer
  data/menu.js    fuente única de productos y categorías
  config/         negocio y ordering flag
  context/        estado del carrito
  hooks/          scrollspy, progreso de scroll (día→noche)
  utils/          formato de precios y mensaje de WhatsApp
```
