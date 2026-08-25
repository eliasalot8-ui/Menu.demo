import { useEffect, useRef, useState } from 'react';
import Illustration from './Illustration';
import './SmartImage.css';

// Prueba, en segundo plano y en orden de prioridad, una lista de
// posibles fotografías (ej.: foto específica del producto → foto
// compartida de su categoría) y hace crossfade hacia la primera que
// cargue de verdad. Si ninguna existe todavía, la ilustración de
// línea se queda puesta. Nunca se llega a montar un <img> con src
// inválido, así que no hay riesgo de ícono de imagen rota ni con
// conexiones lentas.
//
// `sources`: array de rutas candidatas, en orden de prioridad.
// `src`: atajo para una única ruta (se normaliza a [src]).
// `eager`: precarga inmediata (hero, modal). Si no, recién se prueba
// cuando el elemento se acerca al viewport (lazy loading real).
export default function SmartImage({ src, sources, art, mood, alt = '', className = '', eager = false }) {
  const candidates = sources ?? (src ? [src] : []);
  const candidatesKey = candidates.join('|');
  const [resolvedSrc, setResolvedSrc] = useState(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    setResolvedSrc(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidatesKey]);

  useEffect(() => {
    if (!candidatesKey) return undefined;
    let cancelled = false;
    let observer;

    function tryLoad(i) {
      if (cancelled || i >= candidates.length) return;
      const img = new Image();
      img.onload = () => {
        if (!cancelled) setResolvedSrc(candidates[i]);
      };
      img.onerror = () => tryLoad(i + 1);
      img.src = candidates[i];
    }

    if (eager) {
      tryLoad(0);
    } else if (wrapRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            tryLoad(0);
            observer.disconnect();
          }
        },
        { rootMargin: '500px' }
      );
      observer.observe(wrapRef.current);
    }

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidatesKey, eager]);

  const showPhoto = Boolean(resolvedSrc);

  return (
    <span className={`smart-image-wrap ${className}`} ref={wrapRef}>
      <Illustration type={art} mood={mood} className={`smart-image-art ${showPhoto ? 'is-hidden' : ''}`} />
      {showPhoto && <img src={resolvedSrc} alt={alt} className="smart-image" decoding="async" />}
    </span>
  );
}
