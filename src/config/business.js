// Configuración central del negocio.
// Cambiar estos valores adapta toda la experiencia a un local real.
export const business = {
  name: 'NÓMADA',
  tagline: 'CAFÉ · COCINA · BAR',
  claim: 'DE LA MAÑANA A LA ÚLTIMA COPA.',
  city: 'Santa Fe, Argentina',
  address: 'Bv. Gálvez 1420, Santa Fe',
  hoursLabel: 'Todos los días',
  hours: '08:00 — 01:00',
  instagramHandle: '@nomada.ar',
  instagramUrl: 'https://instagram.com/nomada.ar',
  whatsappNumber: '5493492000000', // formato internacional sin '+' ni espacios
  mapsUrl: 'https://maps.google.com/?q=Nomada+Cafe+Cocina+Bar+Santa+Fe',
};

// Si orderingEnabled es false, el carrito y el pedido por WhatsApp
// se desactivan por completo y NÓMADA funciona como carta digital pura.
export const orderingEnabled = true;

// Pensado para uso por QR: si es true, la intro completa solo se ve la
// primera vez en cada sesión del navegador (sessionStorage); las
// aperturas siguientes entran directo al menú. Poner en false para que
// la intro completa se vea siempre, en cada apertura.
export const skipIntroOnRevisit = true;

export const currency = {
  locale: 'es-AR',
  code: 'ARS',
};
