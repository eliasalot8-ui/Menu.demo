# Prioridad de fotografías

El sitio ahora resuelve cada imagen en tres niveles, de más a menos
específico:

1. **Foto específica del producto** (43 nombres, ver `ASSETS_NEEDED.md`)
2. **Foto compartida de su categoría** (2 o 3 por categoría — este archivo)
3. **Ilustración editorial de línea** (siempre disponible, nunca falla)

`src/config/images.js` reparte automáticamente los productos de una
categoría entre sus fotos de fallback, y `SmartImage` prueba cada nivel
en orden hasta encontrar el primero que exista de verdad — nunca se
muestra una imagen rota, con foto real o sin ella.

Para lanzar la demo **no hace falta ninguna de las 43 fotos
específicas**. Con las 20 fotos de PRIORIDAD 1 el sitio entero se ve
con fotografía real y coherente. Cualquier foto específica que se suba
después reemplaza automáticamente a la de categoría para ESE producto
puntual, sin tocar código.

---

## PRIORIDAD 1 — DEMO INICIAL (20 fotos)

### Hero (portada) — 3 fotos

| Archivo | Proporción | Resolución | Descripción |
| --- | --- | --- | --- |
| `hero-01.jpg` | 4:5 | 1600×2000 | Café con leche o latte recién servido, luz de mañana, mesa de madera clara |
| `hero-02.jpg` | 1:1 | 1600×1600 | Mesa compartida de mediodía — tabla o plato central, composición editorial |
| `hero-03.jpg` | 3:4 | 1400×1867 | Trago de bar (gin tonic o Aperol) en ambiente nocturno, reflejos cálidos |

Ubicación: `/public/images/`

### Café — 2 fotos
Cubren los 8 productos de la categoría (espressos, cortados, bebidas con leche, iced latte).

| Archivo | Proporción | Resolución | Descripción |
| --- | --- | --- | --- |
| `cafe-fallback-1.jpg` | 1:1 | 1200×1200 | Espresso o cortado en taza chica blanca, mesa oscura, luz lateral cálida — estilo "café negro" |
| `cafe-fallback-2.jpg` | 1:1 | 1200×1200 | Latte o cappuccino con arte en taza de cerámica, primer plano — estilo "con leche" |

### Pastelería — 2 fotos
Cubren medialunas, croissants, roll de canela, tostado y budín.

| Archivo | Proporción | Resolución | Descripción |
| --- | --- | --- | --- |
| `pasteleria-fallback-1.jpg` | 3:4 | 1200×1600 | Medialunas o croissants recién horneados, dorados, apilados en mimbre o madera clara |
| `pasteleria-fallback-2.jpg` | 3:4 | 1200×1600 | Pieza de pastelería cortada al medio mostrando textura interior (hojaldre o relleno) |

### Brunch — 2 fotos
Cubren tostones, huevos, brunch completo y yogur con granola.

| Archivo | Proporción | Resolución | Descripción |
| --- | --- | --- | --- |
| `brunch-fallback-1.jpg` | 4:5 | 1600×2000 | Tostón de masa madre con huevo o palta, mesa clara, luz natural editorial |
| `brunch-fallback-2.jpg` | 16:10 | 2000×1250 | Mesa de brunch completa vista desde arriba: varios platos, café, frutas |

### Cocina — 2 fotos
Cubren smash burger, milanesa, sándwich, pasta y ensalada.

| Archivo | Proporción | Resolución | Descripción |
| --- | --- | --- | --- |
| `cocina-fallback-1.jpg` | 5:4 | 2000×1600 | Hamburguesa smash o sándwich con papas, fondo oscuro, plato de cocina de fuego vivo |
| `cocina-fallback-2.jpg` | 5:4 | 2000×1600 | Milanesa, pasta o ensalada servida, mesa rústica, luz cálida |

### Para compartir — 2 fotos
Cubren papas, bastones de muzzarella, hummus y tabla.

| Archivo | Proporción | Resolución | Descripción |
| --- | --- | --- | --- |
| `compartir-fallback-1.jpg` | 4:5 | 1200×1500 | Papas o bastones fritos para picotear, servidos en el centro de la mesa |
| `compartir-fallback-2.jpg` | 4:5 | 1200×1500 | Tabla de quesos/fiambres o dips con pan, vista desde arriba |

### Postres — 2 fotos
Cubren chocotorta, cheesecake, brownie y panqueque.

| Archivo | Proporción | Resolución | Descripción |
| --- | --- | --- | --- |
| `postres-fallback-1.jpg` | 1:1 | 1200×1200 | Porción de torta en capas (estilo chocotorta o cheesecake) en plato claro |
| `postres-fallback-2.jpg` | 1:1 | 1200×1200 | Brownie con helado o panqueque con dulce de leche, fondo claro, luz suave |

### Sin alcohol — 2 fotos
Cubren limonadas, jugo, agua y gaseosa.

| Archivo | Proporción | Resolución | Descripción |
| --- | --- | --- | --- |
| `sinalcohol-fallback-1.jpg` | 4:5 | 1200×1500 | Limonada con hielo y fruta, luz natural, vaso alto |
| `sinalcohol-fallback-2.jpg` | 4:5 | 1200×1500 | Jugo de naranja o botella/vaso simple, composición minimalista |

### Bar — 3 fotos
Cubren fernet, gin tonic, aperol, vermut, campari y cerveza.

| Archivo | Proporción | Resolución | Descripción |
| --- | --- | --- | --- |
| `bar-fallback-1.jpg` | 4:5 | 1200×1500 | Cóctel con hielo y botánicos (gin tonic), luz nocturna, reflejos |
| `bar-fallback-2.jpg` | 4:5 | 1200×1500 | Trago de aperitivo color rojo/naranja (Aperol, Campari o fernet), atardecer o luz cálida |
| `bar-fallback-3.jpg` | 4:5 | 1200×1500 | Cerveza tirada con espuma, contraluz, ambiente de barra |

---

## PRIORIDAD 2 — MEJORA FUTURA

Fotos específicas por producto. Ninguna es necesaria para lanzar: hasta
que se suban, cada producto usa automáticamente la foto de categoría de
arriba. Subir cualquiera de estas, con el nombre exacto, en
`/public/images/`, hace que ESE producto puntual pase a tener su propia
foto sin tocar código. Detalle de proporción/resolución en `ASSETS_NEEDED.md`.

**Café:** `cafe-espresso.jpg`, `cafe-doble-espresso.jpg`, `cafe-cortado.jpg`, `cafe-con-leche.jpg`, `cafe-flat-white.jpg`, `cafe-cappuccino.jpg`, `cafe-latte.jpg`, `cafe-iced-latte.jpg`

**Pastelería:** `pasteleria-medialunas.jpg`, `pasteleria-croissant.jpg`, `pasteleria-croissant-jyq.jpg`, `pasteleria-roll-canela.jpg`, `pasteleria-tostado-jyq.jpg`, `pasteleria-budin.jpg`

**Brunch:** `brunch-toston-palta.jpg`, `brunch-huevos-nomada.jpg`, `brunch-completo.jpg`, `brunch-toston-caprese.jpg`, `brunch-yogur-granola.jpg`

**Cocina:** `cocina-smash-nomada.jpg`, `cocina-milanesa-napolitana.jpg`, `cocina-sandwich-bondiola.jpg`, `cocina-pasta-del-dia.jpg`, `cocina-ensalada-nomada.jpg`

**Para compartir:** `compartir-papas-nomada.jpg`, `compartir-muzzarella-bastones.jpg`, `compartir-hummus-pan.jpg`, `compartir-tabla-nomada.jpg`

**Postres:** `postres-chocotorta.jpg`, `postres-cheesecake.jpg`, `postres-brownie-helado.jpg`, `postres-panqueque-dulce-leche.jpg`

**Sin alcohol:** `sinalcohol-limonada.jpg`, `sinalcohol-limonada-frutos-rojos.jpg`, `sinalcohol-jugo-naranja.jpg`, `sinalcohol-agua.jpg`, `sinalcohol-gaseosa.jpg`

**Bar:** `bar-fernet-coca.jpg`, `bar-gin-tonic.jpg`, `bar-aperol-spritz.jpg`, `bar-vermut-soda.jpg`, `bar-campari-orange.jpg`, `bar-cerveza-tirada.jpg`

## Estilo a mantener en todas las fotos

- Iluminación cálida y natural, nunca flash directo.
- Fondos neutros: madera, piedra o superficies mate en tonos crema/carbón.
- Primeros planos con profundidad de campo (fondo desenfocado).
- Mismo tratamiento de color en todas — evitar mezclar una foto muy
  saturada al lado de una muy pastel.
- Bar y sin-alcohol pueden tener temperatura de color más fría/nocturna
  que café y pastelería (acompaña la transición día→noche del sitio).
