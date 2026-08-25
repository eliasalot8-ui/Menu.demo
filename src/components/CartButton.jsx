import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import './CartButton.css';

export default function CartButton() {
  const { totalCount, totalPrice, openCart, orderingEnabled } = useCart();

  if (!orderingEnabled || totalCount === 0) return null;

  return (
    <button className="cart-fab" onClick={openCart}>
      <span className="cart-fab__count">{totalCount}</span>
      <span className="cart-fab__label">Ver pedido</span>
      <span className="cart-fab__price">{formatPrice(totalPrice)}</span>
    </button>
  );
}
