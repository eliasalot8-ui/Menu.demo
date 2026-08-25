import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SmartImage from './art/SmartImage';
import Badge from './Badge';
import { formatPrice } from '../utils/format';
import { getExtrasFor, CATEGORIES } from '../data/menu';
import { useCart } from '../context/CartContext';
import { productImagePath } from '../config/images';
import './ProductModal.css';

export default function ProductModal({ product, onClose }) {
  const { addLine, orderingEnabled } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [note, setNote] = useState('');
  const sheetRef = useRef(null);
  const backdropRef = useRef(null);

  const category = CATEGORIES.find((c) => c.id === product.category);
  const extras = getExtrasFor(product);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(backdropRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
    gsap.fromTo(
      sheetRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.5, ease: 'power3.out' }
    );
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  function handleClose() {
    gsap.to(sheetRef.current, { yPercent: 100, duration: 0.35, ease: 'power2.in' });
    gsap.to(backdropRef.current, { autoAlpha: 0, duration: 0.3, onComplete: onClose });
  }

  function toggleExtra(extra) {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id) ? prev.filter((e) => e.id !== extra.id) : [...prev, extra]
    );
  }

  const unitTotal = product.price + selectedExtras.reduce((sum, e) => sum + e.price, 0);

  function handleAdd() {
    addLine(product, { qty, extras: selectedExtras, note: note.trim() });
    handleClose();
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={product.name}>
      <div className="modal__backdrop" ref={backdropRef} onClick={handleClose} />
      <div className="modal__sheet" ref={sheetRef}>
        <button className="modal__close" onClick={handleClose} aria-label="Cerrar">
          ✕
        </button>
        <div className="modal__media">
          <SmartImage
            src={productImagePath(product.id)}
            art={product.art}
            mood={category?.mood}
            alt={product.name}
            eager
          />
        </div>
        <div className="modal__content">
          {product.badges?.length > 0 && (
            <div className="modal__badges">
              {product.badges.map((b) => (
                <Badge key={b} type={b} />
              ))}
            </div>
          )}
          <h3 className="modal__name headline">{product.name}</h3>
          {product.description && <p className="modal__desc">{product.description}</p>}
          <p className="modal__price">{formatPrice(product.price)}</p>

          {orderingEnabled && (
            <>
              {extras.length > 0 && (
                <div className="modal__extras">
                  <span className="modal__label">Extras</span>
                  {extras.map((extra) => {
                    const active = selectedExtras.some((e) => e.id === extra.id);
                    return (
                      <button
                        key={extra.id}
                        className={`modal__extra ${active ? 'is-active' : ''}`}
                        onClick={() => toggleExtra(extra)}
                      >
                        <span>{extra.name}</span>
                        <span>+{formatPrice(extra.price)}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="modal__note">
                <label className="modal__label" htmlFor="note">Notas para la cocina</label>
                <textarea
                  id="note"
                  rows={2}
                  placeholder="Ej: sin cebolla, punto de la carne, etc."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <div className="modal__footer">
                <div className="modal__qty">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Restar">−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="Sumar">+</button>
                </div>
                <button className="modal__add" onClick={handleAdd}>
                  Agregar · {formatPrice(unitTotal * qty)}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
