// Paletas de "clima" por categoría — alimentan tanto la ilustración
// de producto como la ambientación día→noche del fondo global.
export const TONES = {
  dawn: { blobA: '#F2E9DA', blobB: '#C45D3C', stroke: '#151515', bg: '#F8F6F1' },
  morning: { blobA: '#F2E9DA', blobB: '#6A4433', stroke: '#151515', bg: '#F8F6F1' },
  midday: { blobA: '#F2E9DA', blobB: '#747552', stroke: '#151515', bg: '#F2E9DA' },
  'midday-warm': { blobA: '#E9CBAE', blobB: '#C45D3C', stroke: '#151515', bg: '#F2E9DA' },
  amber: { blobA: '#E3C79C', blobB: '#C45D3C', stroke: '#151515', bg: '#EFE2CC' },
  blush: { blobA: '#F2E9DA', blobB: '#C45D3C', stroke: '#151515', bg: '#F6ECE3' },
  dusk: { blobA: '#CBB79A', blobB: '#6A4433', stroke: '#151515', bg: '#E7DAC6' },
  night: { blobA: '#2A2622', blobB: '#C45D3C', stroke: '#F2E9DA', bg: '#151515' },
};

export function toneFor(mood) {
  return TONES[mood] ?? TONES.midday;
}
