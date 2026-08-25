# Fotografía pendiente

Este entorno de desarrollo no tuvo salida a internet hacia bancos de
imágenes (Unsplash / Pexels quedaron bloqueados por la política de red del
sandbox), así que **no se pudieron descargar fotografías reales**. Para no
dejar imágenes rotas, todo el proyecto usa un sistema de ilustración
editorial en línea fina y propia (`src/components/art/Illustration.jsx`),
con paleta de marca y una textura de grano sutil. Es intencional y
consistente, pero el objetivo final del producto (punto 9 del brief) es
fotografía gastronómica real.

## Cómo reemplazar una ilustración por una foto

1. Conseguí la foto (Unsplash/Pexels, licencia libre de uso comercial) y
   guardala en `/public/images/<nombre>.jpg` (o `.webp`).
2. En `src/components/ProductCard.jsx` (o donde corresponda), cambiá
   `<Illustration type={product.art} mood={mood} />` por
   `<img src="/images/<nombre>.jpg" alt={product.name} loading="lazy" />`.
3. Repetí para el `ProductModal` y para las tres imágenes del `Hero`
   (`src/sections/Hero.jsx`).

No hace falta tocar `src/data/menu.js`: el campo `art` puede convivir con
un campo nuevo `image` si se quiere migrar producto por producto.

## Lista de fotografías recomendadas

Formato: `archivo` — categoría — proporción — descripción — resolución.

### Café
- `cafe-espresso.jpg` — Café — 1:1 — espresso en taza blanca, mesa de madera oscura, luz cálida lateral — 1200×1200
- `cafe-latte.jpg` — Café — 1:1 — latte con arte en taza de cerámica, primer plano — 1200×1200
- `cafe-filtrado.jpg` — Café — 4:5 — café filtrado en V60, vapor sutil — 1200×1500
- `cafe-iced.jpg` — Café — 4:5 — iced latte con hielo, luz de mañana — 1200×1500

### Pastelería
- `pasteleria-medialunas.jpg` — Pastelería — 3:4 — medialunas de manteca apiladas, mimbre o madera clara — 1200×1600
- `pasteleria-croissant.jpg` — Pastelería — 3:4 — croissant entero, corte lateral mostrando hojaldre — 1200×1600
- `pasteleria-rollcanela.jpg` — Pastelería — 3:4 — roll de canela con glaseado — 1200×1600
- `pasteleria-tostado.jpg` — Pastelería — 3:4 — tostado de jamón y queso cortado al medio — 1200×1600

### Brunch
- `brunch-toston-palta.jpg` — Brunch — 4:5 — tostón de palta con huevo poché, mesa clara, editorial — 1600×2000
- `brunch-huevos.jpg` — Brunch — 4:5 — huevos revueltos con panceta y papas rústicas — 1600×2000
- `brunch-completo.jpg` — Brunch — 16:10 — mesa servida con brunch completo, vista cenital — 2000×1250
- `brunch-yogur.jpg` — Brunch — 4:5 — yogur con granola y frutos rojos — 1600×2000

### Cocina
- `cocina-smash.jpg` — Cocina — 5:4 — smash burger doble, cheddar derretido, fondo oscuro — 2000×1600
- `cocina-milanesa.jpg` — Cocina — 5:4 — milanesa napolitana con papas — 2000×1600
- `cocina-pasta.jpg` — Cocina — 5:4 — pasta fresca con salsa, mesa rústica — 2000×1600
- `cocina-ensalada.jpg` — Cocina — 5:4 — ensalada con pollo y palta, luz natural — 2000×1600

### Para compartir
- `compartir-papas.jpg` — Para compartir — 4:5 — papas con cheddar y panceta — 1200×1500
- `compartir-tabla.jpg` — Para compartir — 4:5 — tabla de quesos y fiambres — 1200×1500

### Postres
- `postres-chocotorta.jpg` — Postres — 1:1 — chocotorta en vaso o plato, fondo claro — 1200×1200
- `postres-cheesecake.jpg` — Postres — 1:1 — porción de cheesecake — 1200×1200
- `postres-brownie.jpg` — Postres — 1:1 — brownie con helado derritiéndose — 1200×1200

### Bar
- `bar-gintonic.jpg` — Bar — 4:5 — gin tonic con botánicos, luz nocturna, reflejos — 1200×1500
- `bar-aperol.jpg` — Bar — 4:5 — Aperol spritz, hora del atardecer — 1200×1500
- `bar-cerveza.jpg` — Bar — 4:5 — cerveza tirada con espuma, contraluz — 1200×1500

### Hero (portada)
- `hero-01.jpg` — Hero — 4:5 — composición editorial de café + medialunas, mesa de madera — 1600×2000
- `hero-02.jpg` — Hero — 1:1 — tabla o mesa servida con variedad de platos — 1600×1600
- `hero-03.jpg` — Hero — 3:4 — cóctel nocturno, ambientación de bar — 1400×1867

## Estilo a mantener

- Iluminación cálida y natural, nunca flash directo.
- Fondos neutros: madera, piedra o superficies mate en tonos crema/carbón.
- Primeros planos con profundidad de campo (fondo desenfocado).
- Coherencia entre todas las fotos: mismo tratamiento de color, sin mezclar
  estilos (evitar una foto muy saturada al lado de una muy pastel).
