import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '../data/menu';
import './CategoryNav.css';

export default function CategoryNav({ activeId, dark }) {
  const railRef = useRef(null);
  const btnRefs = useRef({});
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    const btn = btnRefs.current[activeId];
    if (!rail || !btn) return;
    const railRect = rail.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const offset = btnRect.left - railRect.left - railRect.width / 2 + btnRect.width / 2;
    rail.scrollBy({ left: offset, behavior: 'smooth' });
  }, [activeId]);

  // Pista sutil de scroll horizontal: el degradado del borde derecho
  // desaparece solo una vez que ya no queda nada más para descubrir.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    function updateEdge() {
      const { scrollLeft, scrollWidth, clientWidth } = rail;
      setAtEnd(scrollWidth - clientWidth <= 4 || scrollLeft + clientWidth >= scrollWidth - 4);
    }

    updateEdge();
    rail.addEventListener('scroll', updateEdge, { passive: true });
    window.addEventListener('resize', updateEdge);
    return () => {
      rail.removeEventListener('scroll', updateEdge);
      window.removeEventListener('resize', updateEdge);
    };
  }, []);

  function goTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 60) - 52;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <nav className={`cat-nav ${dark ? 'cat-nav--dark' : ''} ${atEnd ? 'cat-nav--end' : ''}`} aria-label="Categorías de la carta">
      <div className="cat-nav__rail hide-scrollbar" ref={railRef}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            ref={(el) => { btnRefs.current[cat.id] = el; }}
            className={`cat-nav__item ${activeId === cat.id ? 'is-active' : ''}`}
            onClick={() => goTo(cat.id)}
            aria-current={activeId === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
