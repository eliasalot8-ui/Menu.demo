import { useEffect, useRef } from 'react';
import { CATEGORIES } from '../data/menu';
import './CategoryNav.css';

export default function CategoryNav({ activeId, dark }) {
  const railRef = useRef(null);
  const btnRefs = useRef({});

  useEffect(() => {
    const rail = railRef.current;
    const btn = btnRefs.current[activeId];
    if (!rail || !btn) return;
    const railRect = rail.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const offset = btnRect.left - railRect.left - railRect.width / 2 + btnRect.width / 2;
    rail.scrollBy({ left: offset, behavior: 'smooth' });
  }, [activeId]);

  function goTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 60) - 52;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <nav className={`cat-nav ${dark ? 'cat-nav--dark' : ''}`} aria-label="Categorías de la carta">
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
