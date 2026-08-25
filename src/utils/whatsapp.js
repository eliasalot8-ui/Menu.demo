import { business } from '../config/business';
import { formatPrice } from './format';

export function buildWhatsappMessage(cartItems, total) {
  const lines = cartItems.map((item) => {
    const extrasText = item.extras?.length
      ? ` (+ ${item.extras.map((e) => e.name).join(', ')})`
      : '';
    const noteText = item.note ? ` — nota: ${item.note}` : '';
    return `${item.qty}x ${item.name}${extrasText}${noteText}`;
  });

  const message = [
    `Hola ${business.name} 👋`,
    'Quiero hacer este pedido:',
    ...lines,
    '',
    `Total estimado: ${formatPrice(total)}`,
  ].join('\n');

  return message;
}

export function buildWhatsappUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${business.whatsappNumber}?text=${encoded}`;
}
