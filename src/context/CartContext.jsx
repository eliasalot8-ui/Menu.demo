import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { orderingEnabled } from '../config/business';

const CartContext = createContext(null);

function lineKey(productId, extras, note) {
  const extrasKey = (extras ?? []).map((e) => e.id).sort().join('|');
  return `${productId}::${extrasKey}::${note ?? ''}`;
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addLine = useCallback((product, { qty = 1, extras = [], note = '' } = {}) => {
    if (!orderingEnabled) return;
    const key = lineKey(product.id, extras, note);
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      }
      const unitPrice = product.price + extras.reduce((sum, e) => sum + e.price, 0);
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          unitPrice,
          basePrice: product.price,
          extras,
          note,
          qty,
        },
      ];
    });
  }, []);

  const removeLine = useCallback((key) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const setQty = useCallback((key, qty) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => l.key !== key);
      return prev.map((l) => (l.key === key ? { ...l, qty } : l));
    });
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const totalCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const totalPrice = useMemo(
    () => lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      addLine,
      removeLine,
      setQty,
      clearCart,
      totalCount,
      totalPrice,
      isCartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      orderingEnabled,
    }),
    [lines, addLine, removeLine, setQty, clearCart, totalCount, totalPrice, isCartOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}
