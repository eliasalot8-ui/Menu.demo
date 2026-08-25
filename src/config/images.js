// Registro central de fotografías.
// Cada producto y cada slot del hero tiene un nombre de archivo fijo
// dentro de /public/images/. Si el archivo todavía no fue subido,
// <SmartImage> lo detecta (onError) y muestra la ilustración de línea
// como fallback automático — nunca queda una imagen rota.
//
// Para pasar a fotografía real: exportar la foto con el nombre exacto
// listado acá (ver ASSETS_NEEDED.md) y guardarla en /public/images/.
// No hay que tocar ningún componente ni animación.

export const IMAGE_BASE = '/images/';

export const PRODUCT_IMAGES = {
  // Café
  espresso: 'cafe-espresso.jpg',
  'doble-espresso': 'cafe-doble-espresso.jpg',
  cortado: 'cafe-cortado.jpg',
  'cafe-con-leche': 'cafe-con-leche.jpg',
  'flat-white': 'cafe-flat-white.jpg',
  cappuccino: 'cafe-cappuccino.jpg',
  latte: 'cafe-latte.jpg',
  'iced-latte': 'cafe-iced-latte.jpg',

  // Pastelería
  medialunas: 'pasteleria-medialunas.jpg',
  croissant: 'pasteleria-croissant.jpg',
  'croissant-jyq': 'pasteleria-croissant-jyq.jpg',
  'roll-canela': 'pasteleria-roll-canela.jpg',
  'tostado-jyq': 'pasteleria-tostado-jyq.jpg',
  budin: 'pasteleria-budin.jpg',

  // Brunch
  'toston-palta': 'brunch-toston-palta.jpg',
  'huevos-nomada': 'brunch-huevos-nomada.jpg',
  'brunch-completo': 'brunch-completo.jpg',
  'toston-caprese': 'brunch-toston-caprese.jpg',
  'yogur-granola': 'brunch-yogur-granola.jpg',

  // Cocina
  'smash-nomada': 'cocina-smash-nomada.jpg',
  'milanesa-napolitana': 'cocina-milanesa-napolitana.jpg',
  'sandwich-bondiola': 'cocina-sandwich-bondiola.jpg',
  'pasta-del-dia': 'cocina-pasta-del-dia.jpg',
  'ensalada-nomada': 'cocina-ensalada-nomada.jpg',

  // Para compartir
  'papas-nomada': 'compartir-papas-nomada.jpg',
  'muzzarella-bastones': 'compartir-muzzarella-bastones.jpg',
  'hummus-pan': 'compartir-hummus-pan.jpg',
  'tabla-nomada': 'compartir-tabla-nomada.jpg',

  // Postres
  chocotorta: 'postres-chocotorta.jpg',
  cheesecake: 'postres-cheesecake.jpg',
  'brownie-helado': 'postres-brownie-helado.jpg',
  'panqueque-dl': 'postres-panqueque-dulce-leche.jpg',

  // Sin alcohol
  limonada: 'sinalcohol-limonada.jpg',
  'limonada-frutos-rojos': 'sinalcohol-limonada-frutos-rojos.jpg',
  'jugo-naranja': 'sinalcohol-jugo-naranja.jpg',
  agua: 'sinalcohol-agua.jpg',
  gaseosa: 'sinalcohol-gaseosa.jpg',

  // Bar
  'fernet-coca': 'bar-fernet-coca.jpg',
  'gin-tonic': 'bar-gin-tonic.jpg',
  'aperol-spritz': 'bar-aperol-spritz.jpg',
  'vermut-soda': 'bar-vermut-soda.jpg',
  'campari-orange': 'bar-campari-orange.jpg',
  'cerveza-tirada': 'bar-cerveza-tirada.jpg',
};

// Las tres imágenes del hero (composición editorial de portada).
export const HERO_IMAGES = ['hero-01.jpg', 'hero-02.jpg', 'hero-03.jpg'];

export function productImagePath(productId) {
  const file = PRODUCT_IMAGES[productId];
  return file ? `${IMAGE_BASE}${file}` : null;
}

export function heroImagePath(index) {
  const file = HERO_IMAGES[index];
  return file ? `${IMAGE_BASE}${file}` : null;
}
