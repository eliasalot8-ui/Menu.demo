# Fotografía pendiente

El entorno de desarrollo no tuvo salida a internet hacia bancos de imágenes
(Unsplash / Pexels quedaron bloqueados por la política de red del sandbox),
así que **no se pudieron descargar fotografías reales**. El sitio está
100% terminado y funcional con un sistema de ilustración editorial propio
como reemplazo temporal (`src/components/art/Illustration.jsx`).

## Cómo funciona el reemplazo automático

No hace falta tocar ningún componente, animación ni layout para pasar a
fotografía real. El sistema resuelve cada imagen en tres niveles, de más
a menos específico:

1. **Foto específica del producto** — nombre fijo por producto, tabla
   completa más abajo.
2. **Foto compartida de su categoría** — 2 o 3 fotos por categoría que
   alcanzan para que toda la demo se vea con fotografía real desde el
   día uno. Ver **`ASSETS_PRIORITY.md`** para la lista corta (20 fotos)
   que conviene conseguir primero.
3. **Ilustración editorial de línea** — siempre disponible, nunca falla.

`<SmartImage>` (`src/components/art/SmartImage.jsx`) prueba cada nivel
en ese orden y se queda con el primero que cargue de verdad. Si un
archivo todavía no fue subido (o falla la carga), pasa solo al
siguiente nivel — **nunca se ve un ícono de imagen rota**, ni con la
foto específica ni con la de categoría.

Para agregar una foto real: exportarla con el nombre **exacto** de la
tabla (específica) o de `ASSETS_PRIORITY.md` (de categoría) y guardarla
en `/public/images/`. Listo — no requiere rebuild de código, ningún
componente cambia. Este archivo (`ASSETS_NEEDED.md`) es la referencia
técnica completa de los 43 nombres específicos; `ASSETS_PRIORITY.md` es
la guía de qué conseguir primero.

Si en algún momento se quiere renombrar un archivo, el único lugar que hay
que tocar es `src/config/images.js` (mapa `PRODUCT_IMAGES` / `HERO_IMAGES`).

## 1. Imágenes del Hero (portada)

| Archivo | Proporción | Resolución | Descripción |
| --- | --- | --- | --- |
| `hero-01.jpg` | 4:5 | 1600×2000 | Café con leche o latte recién servido, luz de mañana, mesa de madera clara |
| `hero-02.jpg` | 1:1 | 1600×1600 | Mesa compartida de mediodía — tabla o plato central, composición editorial |
| `hero-03.jpg` | 3:4 | 1400×1867 | Trago de bar (gin tonic o Aperol) en ambiente nocturno, reflejos cálidos |

Ubicación: `/public/images/hero-01.jpg`, `/public/images/hero-02.jpg`, `/public/images/hero-03.jpg`

## 2. Imágenes por producto

Todas van en `/public/images/<archivo>`. Formato sugerido: 1200×1200 a
1600×2000 según proporción, JPG o WEBP, buena compresión (~150–300 KB).

### Café — cuadradas (1:1), luz cálida, taza protagonista
| Producto | Archivo |
| --- | --- |
| Espresso | `cafe-espresso.jpg` |
| Doble espresso | `cafe-doble-espresso.jpg` |
| Cortado | `cafe-cortado.jpg` |
| Café con leche | `cafe-con-leche.jpg` |
| Flat white | `cafe-flat-white.jpg` |
| Cappuccino | `cafe-cappuccino.jpg` |
| Latte | `cafe-latte.jpg` |
| Iced latte | `cafe-iced-latte.jpg` |

### Pastelería — verticales (3:4), horno propio, mimbre o madera clara
| Producto | Archivo |
| --- | --- |
| Medialunas de manteca | `pasteleria-medialunas.jpg` |
| Croissant | `pasteleria-croissant.jpg` |
| Croissant de jamón y queso | `pasteleria-croissant-jyq.jpg` |
| Roll de canela | `pasteleria-roll-canela.jpg` |
| Tostado de jamón y queso | `pasteleria-tostado-jyq.jpg` |
| Porción de budín | `pasteleria-budin.jpg` |

### Brunch — verticales (4:5) salvo el combo, editorial y luminoso
| Producto | Archivo |
| --- | --- |
| Tostón de palta | `brunch-toston-palta.jpg` |
| Huevos Nómada | `brunch-huevos-nomada.jpg` |
| Brunch completo | `brunch-completo.jpg` (16:10, vista cenital de mesa) |
| Tostón caprese | `brunch-toston-caprese.jpg` |
| Yogur & granola | `brunch-yogur-granola.jpg` |

### Cocina — 5:4, platos grandes, fondo oscuro o mesa rústica
| Producto | Archivo |
| --- | --- |
| Smash Nómada | `cocina-smash-nomada.jpg` |
| Milanesa napolitana | `cocina-milanesa-napolitana.jpg` |
| Sándwich de bondiola | `cocina-sandwich-bondiola.jpg` |
| Pasta del día | `cocina-pasta-del-dia.jpg` |
| Ensalada Nómada | `cocina-ensalada-nomada.jpg` |

### Para compartir — verticales (4:5)
| Producto | Archivo |
| --- | --- |
| Papas Nómada | `compartir-papas-nomada.jpg` |
| Bastones de muzzarella | `compartir-muzzarella-bastones.jpg` |
| Hummus & pan | `compartir-hummus-pan.jpg` |
| Tabla Nómada | `compartir-tabla-nomada.jpg` |

### Postres — cuadradas (1:1), fondos claros, cremosidad a la vista
| Producto | Archivo |
| --- | --- |
| Chocotorta | `postres-chocotorta.jpg` |
| Cheesecake | `postres-cheesecake.jpg` |
| Brownie con helado | `postres-brownie-helado.jpg` |
| Panqueque con dulce de leche | `postres-panqueque-dulce-leche.jpg` |

### Sin alcohol — verticales (4:5), frescas, luz natural
| Producto | Archivo |
| --- | --- |
| Limonada | `sinalcohol-limonada.jpg` |
| Limonada de frutos rojos | `sinalcohol-limonada-frutos-rojos.jpg` |
| Jugo de naranja | `sinalcohol-jugo-naranja.jpg` |
| Agua | `sinalcohol-agua.jpg` |
| Gaseosa | `sinalcohol-gaseosa.jpg` |

### Bar — verticales (4:5), nocturnas, reflejos y contraluz
| Producto | Archivo |
| --- | --- |
| Fernet con coca | `bar-fernet-coca.jpg` |
| Gin tonic | `bar-gin-tonic.jpg` |
| Aperol spritz | `bar-aperol-spritz.jpg` |
| Vermut & soda | `bar-vermut-soda.jpg` |
| Campari orange | `bar-campari-orange.jpg` |
| Cerveza tirada | `bar-cerveza-tirada.jpg` |

**Total del catálogo completo: 43 fotos de producto + 3 del hero = 46
archivos.** Ninguna de las 43 específicas es necesaria para lanzar la
demo — con las 20 fotos de `ASSETS_PRIORITY.md` (3 hero + 17 de
categoría) alcanza. Estas 43 son la mejora incremental de PRIORIDAD 2.

## Estilo a mantener en todas las fotos

- Iluminación cálida y natural, nunca flash directo.
- Fondos neutros: madera, piedra o superficies mate en tonos crema/carbón.
- Primeros planos con profundidad de campo (fondo desenfocado).
- Mismo tratamiento de color en todas — evitar mezclar una foto muy
  saturada al lado de una muy pastel.
- Bar y sin-alcohol pueden tener temperatura de color más fría/nocturna
  que café y pastelería (acompaña la transición día→noche del sitio).

## Mejoras recomendadas una vez subidas las fotos reales

1. **Object-position por producto**: si alguna foto queda mal encuadrada
   dentro del recorte cuadrado/vertical, agregar un `focalPoint` opcional
   por producto en `images.js` y pasarlo como `object-position` en
   `SmartImage`.
2. **Formatos modernos**: exportar también `.webp` (o `.avif`) de cada
   archivo y sumar un `<picture>` con fallback a `.jpg` dentro de
   `SmartImage` para bajar peso sin tocar el resto del sitio.
3. **Imágenes responsive**: generar 2 tamaños por foto (ej. 800px y
   1600px de ancho) y usar `srcSet`/`sizes` en `SmartImage` para no bajar
   la versión grande en mobile.
4. **Retirar el grano SVG** de `Illustration.jsx` deja de ser necesario
   una vez que casi todo el catálogo tenga foto — pero como es fallback
   automático, podés dejarlo indefinidamente sin costo.
5. **Ajustar el bloom nocturno de `.p-card--night-editorial`** (glow
   interior color terracota) puede quedar demasiado marcado sobre una
   foto de trago muy oscura; conviene bajar su opacidad ~15% al ver la
   primera tanda de fotos del bar.
6. **Revisar contraste de texto** sobre `overlay-grid` (pastelería) y
   `night-editorial` (bar) con las fotos reales puestas — el gradiente
   está calibrado para las ilustraciones planas y puede necesitar un
   pelín más de opacidad si las fotos son muy claras u oscuras en esa
   zona.
