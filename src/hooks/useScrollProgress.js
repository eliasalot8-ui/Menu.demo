import { useEffect, useState } from 'react';

// Progreso 0..1 de scroll a lo largo de un contenedor (usado para
// la transición ambiental día → noche mientras se recorre la carta).
export function useScrollProgress(containerRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height - viewportH;
      const scrolled = -rect.top;
      const p = total > 0 ? scrolled / total : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [containerRef]);

  return progress;
}
