import { currency } from '../config/business';

const formatter = new Intl.NumberFormat(currency.locale, {
  style: 'currency',
  currency: currency.code,
  maximumFractionDigits: 0,
});

export function formatPrice(value) {
  return formatter.format(value);
}

export const BADGE_LABELS = {
  recomendado: 'Recomendado',
  nuevo: 'Nuevo',
  veggie: 'Veggie',
  'sin-tacc': 'Sin TACC',
  'mas-pedido': 'Más pedido',
  picante: 'Picante',
};
