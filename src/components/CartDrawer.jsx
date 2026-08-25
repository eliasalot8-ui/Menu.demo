import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { buildWhatsappMessage, buildWhatsappUrl } from '../utils/whatsapp';
import './CartDrawer.css';

export default function CartDrawer() {
  const { lines, setQty, removeLine, totalPrice, isCartOpen, closeCart, clearCart } = useCart();
  const sheetRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!isCartOpen) return undefined;
    document.body.style.overflow = 'hidden';
    gsap.fromTo(backdropRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
    gsap.fromTo(sheetRef.current, { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: 'power3.out' });
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  function handleClose() {
    gsap.to(sheetRef.current, { yPercent: 100, duration: 0.3, ease: 'power2.in' });
    gsap.to(backdropRef.current, { autoAlpha: 0, duration: 0.3, onComplete: closeCart });
  }

  function handleWhatsapp() {
    const message = buildWhatsappMessage(lines, totalPrice);
    window.open(buildWhatsappUrl(message), '_blank', 'noopener');
  }

  return (
    <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="Tu pedido">
      <div className="cart-drawer__backdrop" ref={backdropRef} onClick={handleClose} />
      <div className="cart-drawer__sheet" ref={sheetRef}>
        <div className="cart-drawer__head">
          <h3 className="headline">Tu pedido</h3>
          <button onClick={handleClose} aria-label="Cerrar">✕</button>
        </div>

        {lines.length === 0 ? (
          <p className="cart-drawer__empty">Todavía no agregaste nada.</p>
        ) : (
          <ul className="cart-drawer__lines">
            {lines.map((line) => (
              <li key={line.key} className="cart-line">
                <div className="cart-line__info">
                  <span className="cart-line__name">{line.name}</span>
                  {line.extras?.length > 0 && (
                    <span className="cart-line__extras">
                      + {line.extras.map((e) => e.name).join(', ')}
                    </span>
                  )}
                  {line.note && <span className="cart-line__note">“{line.note}”</span>}
                  <span className="cart-line__price">{formatPrice(line.unitPrice * line.qty)}</span>
                </div>
                <div className="cart-line__actions">
                  <div className="cart-line__qty">
                    <button onClick={() => setQty(line.key, line.qty - 1)} aria-label="Restar">−</button>
                    <span>{line.qty}</span>
                    <button onClick={() => setQty(line.key, line.qty + 1)} aria-label="Sumar">+</button>
                  </div>
                  <button className="cart-line__remove" onClick={() => removeLine(line.key)}>
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total">
              <span>Total estimado</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
            <button className="cart-drawer__whatsapp" onClick={handleWhatsapp}>
              Pedir por WhatsApp
            </button>
            <button className="cart-drawer__clear" onClick={clearCart}>
              Vaciar pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
