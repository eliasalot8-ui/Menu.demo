// Fuente única de verdad del menú de NÓMADA.
// Todos los componentes leen los productos desde acá.
// Los precios son ficticios y están en pesos argentinos (ARS).

export const EXTRAS = {
  cafeteria: [
    { id: 'ex-leche-vegetal', name: 'Leche vegetal', price: 800 },
    { id: 'ex-shot-extra', name: 'Shot extra', price: 900 },
  ],
  cocina: [
    { id: 'ex-huevo', name: 'Huevo', price: 1200 },
    { id: 'ex-palta', name: 'Palta', price: 2500 },
    { id: 'ex-cheddar', name: 'Cheddar', price: 1500 },
    { id: 'ex-panceta', name: 'Panceta', price: 1800 },
    { id: 'ex-medallon', name: 'Medallón extra', price: 3000 },
  ],
};

export const CATEGORIES = [
  {
    id: 'cafe',
    label: 'Café',
    kicker: 'MAÑANA',
    mood: 'dawn',
    layout: 'carousel',
    description: 'Grano de especialidad, extracción lenta y la primera pausa del día.',
  },
  {
    id: 'pasteleria',
    label: 'Pastelería',
    kicker: 'MAÑANA',
    mood: 'morning',
    layout: 'overlay-grid',
    description: 'Manteca, hojaldre y horno propio desde las siete de la mañana.',
  },
  {
    id: 'brunch',
    label: 'Brunch',
    kicker: 'MEDIODÍA',
    mood: 'midday',
    layout: 'editorial',
    description: 'Composiciones de mesa larga para quedarse un buen rato.',
  },
  {
    id: 'cocina',
    label: 'Cocina',
    kicker: 'MEDIODÍA',
    mood: 'midday-warm',
    layout: 'feature',
    description: 'Platos de cocina de fuego vivo, hechos para compartir mesa.',
  },
  {
    id: 'compartir',
    label: 'Para compartir',
    kicker: 'TARDE',
    mood: 'amber',
    layout: 'carousel',
    description: 'Picoteo para el medio de la tarde o el previa de la noche.',
  },
  {
    id: 'postres',
    label: 'Postres',
    kicker: 'TARDE',
    mood: 'blush',
    layout: 'soft-grid',
    description: 'Dulce de leche, chocolate y algo cremoso para cerrar.',
  },
  {
    id: 'sin-alcohol',
    label: 'Sin alcohol',
    kicker: 'TODO EL DÍA',
    mood: 'dusk',
    layout: 'minimal-list',
    description: 'Frescos, simples, para cualquier hora de la carta.',
  },
  {
    id: 'bar',
    label: 'Bar',
    kicker: 'NOCHE',
    mood: 'night',
    layout: 'night-editorial',
    description: 'La barra se enciende cuando el sol ya se fue.',
  },
];

export const PRODUCTS = [
  // ---------- CAFÉ ----------
  { id: 'espresso', category: 'cafe', name: 'Espresso', price: 3000, art: 'espresso', extrasGroup: 'cafeteria' },
  { id: 'doble-espresso', category: 'cafe', name: 'Doble espresso', price: 3800, art: 'espresso', extrasGroup: 'cafeteria' },
  { id: 'cortado', category: 'cafe', name: 'Cortado', price: 3500, art: 'milk-cup', extrasGroup: 'cafeteria' },
  { id: 'cafe-con-leche', category: 'cafe', name: 'Café con leche', price: 4200, art: 'milk-cup', extrasGroup: 'cafeteria' },
  { id: 'flat-white', category: 'cafe', name: 'Flat white', price: 4800, art: 'milk-cup', badges: ['recomendado'], extrasGroup: 'cafeteria' },
  { id: 'cappuccino', category: 'cafe', name: 'Cappuccino', price: 4800, art: 'milk-cup', extrasGroup: 'cafeteria' },
  { id: 'latte', category: 'cafe', name: 'Latte', price: 4900, art: 'milk-cup', badges: ['mas-pedido'], extrasGroup: 'cafeteria' },
  { id: 'iced-latte', category: 'cafe', name: 'Iced latte', price: 5500, art: 'iced-cup', badges: ['nuevo'], extrasGroup: 'cafeteria' },

  // ---------- PASTELERÍA ----------
  { id: 'medialunas', category: 'pasteleria', name: 'Medialunas de manteca', description: '2 unidades', price: 4200, art: 'viennoiserie' },
  { id: 'croissant', category: 'pasteleria', name: 'Croissant', price: 4500, art: 'viennoiserie' },
  { id: 'croissant-jyq', category: 'pasteleria', name: 'Croissant de jamón y queso', price: 6500, art: 'viennoiserie', badges: ['mas-pedido'] },
  { id: 'roll-canela', category: 'pasteleria', name: 'Roll de canela', price: 5500, art: 'viennoiserie', badges: ['nuevo'] },
  { id: 'tostado-jyq', category: 'pasteleria', name: 'Tostado de jamón y queso', price: 7500, art: 'toast' },
  { id: 'budin', category: 'pasteleria', name: 'Porción de budín', price: 4800, art: 'viennoiserie' },

  // ---------- BRUNCH ----------
  {
    id: 'toston-palta',
    category: 'brunch',
    name: 'Tostón de palta',
    description: 'Pan de masa madre, palta, huevo poché y semillas.',
    price: 10900,
    art: 'toast',
    badges: ['recomendado', 'veggie'],
    extrasGroup: 'cocina',
  },
  {
    id: 'huevos-nomada',
    category: 'brunch',
    name: 'Huevos Nómada',
    description: 'Huevos revueltos, panceta, tostadas y papas rústicas.',
    price: 12900,
    art: 'plate-egg',
    badges: ['mas-pedido'],
    extrasGroup: 'cocina',
  },
  {
    id: 'brunch-completo',
    category: 'brunch',
    name: 'Brunch completo',
    description: 'Huevos, tostadas, palta, frutas, medialuna y café.',
    price: 16500,
    art: 'board',
    badges: ['recomendado'],
    extrasGroup: 'cocina',
  },
  {
    id: 'toston-caprese',
    category: 'brunch',
    name: 'Tostón caprese',
    description: 'Masa madre, tomate, mozzarella, pesto y rúcula.',
    price: 10500,
    art: 'toast',
    badges: ['veggie'],
    extrasGroup: 'cocina',
  },
  {
    id: 'yogur-granola',
    category: 'brunch',
    name: 'Yogur & granola',
    description: 'Yogur, granola artesanal, frutas y miel.',
    price: 8900,
    art: 'bowl',
    badges: ['veggie', 'sin-tacc'],
  },

  // ---------- COCINA ----------
  {
    id: 'smash-nomada',
    category: 'cocina',
    name: 'Smash Nómada',
    description: 'Doble carne, cheddar, cebolla caramelizada, pepinos y salsa de la casa.',
    price: 16900,
    art: 'burger',
    badges: ['mas-pedido'],
    extrasGroup: 'cocina',
  },
  {
    id: 'milanesa-napolitana',
    category: 'cocina',
    name: 'Milanesa napolitana',
    description: 'Milanesa, jamón, mozzarella, tomate y papas.',
    price: 19500,
    art: 'milanesa',
    badges: ['recomendado'],
    extrasGroup: 'cocina',
  },
  {
    id: 'sandwich-bondiola',
    category: 'cocina',
    name: 'Sándwich de bondiola',
    description: 'Bondiola braseada, cebolla caramelizada, rúcula y BBQ.',
    price: 16500,
    art: 'toast',
    extrasGroup: 'cocina',
  },
  {
    id: 'pasta-del-dia',
    category: 'cocina',
    name: 'Pasta del día',
    description: 'Pasta fresca con salsa rotativa.',
    price: 17900,
    art: 'pasta',
    badges: ['nuevo'],
  },
  {
    id: 'ensalada-nomada',
    category: 'cocina',
    name: 'Ensalada Nómada',
    description: 'Verdes, pollo, palta, tomates, parmesano y semillas.',
    price: 14900,
    art: 'bowl',
    badges: ['sin-tacc'],
    extrasGroup: 'cocina',
  },

  // ---------- PARA COMPARTIR ----------
  {
    id: 'papas-nomada',
    category: 'compartir',
    name: 'Papas Nómada',
    description: 'Papas, cheddar, panceta y verdeo.',
    price: 11500,
    art: 'fries',
    badges: ['mas-pedido'],
  },
  { id: 'muzzarella-bastones', category: 'compartir', name: 'Bastones de muzzarella', price: 10500, art: 'fries', badges: ['veggie'] },
  { id: 'hummus-pan', category: 'compartir', name: 'Hummus & pan', description: 'Hummus casero y pan tostado.', price: 9900, art: 'bowl', badges: ['veggie'] },
  {
    id: 'tabla-nomada',
    category: 'compartir',
    name: 'Tabla Nómada',
    description: 'Quesos, fiambres, panes, aceitunas y dips.',
    price: 24900,
    art: 'board',
    badges: ['recomendado'],
  },

  // ---------- POSTRES ----------
  { id: 'chocotorta', category: 'postres', name: 'Chocotorta', price: 8900, art: 'dessert-slice', badges: ['mas-pedido'] },
  { id: 'cheesecake', category: 'postres', name: 'Cheesecake', price: 9500, art: 'dessert-slice' },
  { id: 'brownie-helado', category: 'postres', name: 'Brownie con helado', price: 9900, art: 'dessert-slice', badges: ['recomendado'] },
  { id: 'panqueque-dl', category: 'postres', name: 'Panqueque con dulce de leche', price: 8500, art: 'dessert-slice' },

  // ---------- SIN ALCOHOL ----------
  { id: 'limonada', category: 'sin-alcohol', name: 'Limonada', price: 5500, art: 'juice-glass' },
  { id: 'limonada-frutos-rojos', category: 'sin-alcohol', name: 'Limonada de frutos rojos', price: 6500, art: 'juice-glass', badges: ['nuevo'] },
  { id: 'jugo-naranja', category: 'sin-alcohol', name: 'Jugo de naranja', price: 5900, art: 'juice-glass' },
  { id: 'agua', category: 'sin-alcohol', name: 'Agua', price: 3500, art: 'soda' },
  { id: 'gaseosa', category: 'sin-alcohol', name: 'Gaseosa', price: 4500, art: 'soda' },

  // ---------- BAR ----------
  { id: 'fernet-coca', category: 'bar', name: 'Fernet con coca', price: 8500, art: 'cocktail-glass', badges: ['mas-pedido'] },
  { id: 'gin-tonic', category: 'bar', name: 'Gin tonic', price: 9500, art: 'cocktail-glass', badges: ['recomendado'] },
  { id: 'aperol-spritz', category: 'bar', name: 'Aperol spritz', price: 9500, art: 'cocktail-glass', badges: ['recomendado'] },
  { id: 'vermut-soda', category: 'bar', name: 'Vermut & soda', price: 8500, art: 'cocktail-glass' },
  { id: 'campari-orange', category: 'bar', name: 'Campari orange', price: 8900, art: 'cocktail-glass' },
  { id: 'cerveza-tirada', category: 'bar', name: 'Cerveza tirada', price: 6500, art: 'beer', badges: ['mas-pedido'] },
];

export function getProductsByCategory(categoryId) {
  return PRODUCTS.filter((p) => p.category === categoryId);
}

export function getExtrasFor(product) {
  if (!product?.extrasGroup) return [];
  return EXTRAS[product.extrasGroup] ?? [];
}
