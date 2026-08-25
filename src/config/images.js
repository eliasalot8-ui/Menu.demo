import { PRODUCTS } from '../data/menu';

// Registro central de fotografías, con jerarquía de fallback en tres
// niveles para que la demo pueda lanzarse con muy pocas fotos reales
// sin perder la posibilidad de tener una foto específica por producto
// más adelante:
//
//   1. Foto específica del producto (PRODUCT_IMAGES)
//   2. Foto compartida de su categoría (CATEGORY_FALLBACK_IMAGES)
//   3. Ilustración editorial de línea (siempre disponible, nunca falla)
//
// <SmartImage> recibe la lista de candidatos en ese orden y prueba
// cada uno hasta encontrar el primero que cargue de verdad. Si el
// archivo específico de un producto no existe todavía, automáticamente
// se ve la foto de su categoría; si tampoco existe, la ilustración.
// Nada de esto requiere tocar componentes ni volver a compilar: solo
// subir el archivo con el nombre exacto a /public/images/.

export const IMAGE_BASE = '/images/';

// Los 43 nombres específicos originales. Se mantienen intactos: subir
// cualquiera de estos archivos hace que ESE producto puntual pase a
// usar su propia foto en vez de la de categoría.
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

// Fotos "de arranque": 2 o 3 por categoría, compartidas entre todos
// sus productos hasta que exista una foto específica de cada uno.
// Este es el set chico (17 fotos) que permite lanzar la demo entera
// viéndose profesional. Ver ASSETS_PRIORITY.md.
export const CATEGORY_FALLBACK_IMAGES = {
  cafe: ['cafe-fallback-1.jpg', 'cafe-fallback-2.jpg'],
  pasteleria: ['pasteleria-fallback-1.jpg', 'pasteleria-fallback-2.jpg'],
  brunch: ['brunch-fallback-1.jpg', 'brunch-fallback-2.jpg'],
  cocina: ['cocina-fallback-1.jpg', 'cocina-fallback-2.jpg'],
  compartir: ['compartir-fallback-1.jpg', 'compartir-fallback-2.jpg'],
  postres: ['postres-fallback-1.jpg', 'postres-fallback-2.jpg'],
  'sin-alcohol': ['sinalcohol-fallback-1.jpg', 'sinalcohol-fallback-2.jpg'],
  bar: ['bar-fallback-1.jpg', 'bar-fallback-2.jpg', 'bar-fallback-3.jpg'],
};

// Las tres imágenes del hero (composición editorial de portada).
export const HERO_IMAGES = ['hero-01.jpg', 'hero-02.jpg', 'hero-03.jpg'];

function categoryFallbackFile(categoryId, productId) {
  const files = CATEGORY_FALLBACK_IMAGES[categoryId];
  if (!files || files.length === 0) return null;
  // Reparte los productos de una misma categoría entre sus 2-3 fotos
  // compartidas, así una grilla no muestra la misma foto repetida.
  const siblings = PRODUCTS.filter((p) => p.category === categoryId).map((p) => p.id);
  const index = siblings.indexOf(productId);
  return files[(index < 0 ? 0 : index) % files.length];
}

// Lista de candidatos en orden de prioridad para un producto:
// [foto específica, foto de categoría]. <SmartImage> prueba cada uno
// y se queda con el primero que cargue; si ninguno carga, ilustración.
export function productImageCandidates(product) {
  const specificFile = PRODUCT_IMAGES[product.id];
  const fallbackFile = categoryFallbackFile(product.category, product.id);
  return [specificFile, fallbackFile].filter(Boolean).map((file) => `${IMAGE_BASE}${file}`);
}

export function heroImagePath(index) {
  const file = HERO_IMAGES[index];
  return file ? `${IMAGE_BASE}${file}` : null;
}
