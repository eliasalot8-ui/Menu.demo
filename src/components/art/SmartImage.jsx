import { useEffect, useRef, useState } from 'react';
import Illustration from './Illustration';
import './SmartImage.css';

// Muestra la ilustración de línea como base y, en segundo plano,
// intenta precargar la fotografía real desde /public/images/. Solo si
// esa precarga termina en éxito se hace un crossfade hacia la foto.
// Así nunca se llega a pintar un <img> roto: si el archivo no existe
// (o falla), la ilustración simplemente se queda puesta.
//
// `eager`: precarga inmediata (hero, modal). Si no, se dispara recién
// cuando el elemento se acerca al viewport (lazy loading real).
export default function SmartImage({ src, art, mood, alt = '', className = '', eager = false }) {
  const [loaded, setLoaded] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    if (!src) return undefined;
    let cancelled = false;
    let observer;

    function probe() {
      const img = new Image();
      img.onload = () => {
        if (!cancelled) setLoaded(true);
      };
      img.src = src;
    }

    if (eager) {
      probe();
    } else if (wrapRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            probe();
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
  }, [src, eager]);

  const showPhoto = Boolean(src) && loaded;

  return (
    <span className={`smart-image-wrap ${className}`} ref={wrapRef}>
      <Illustration type={art} mood={mood} className={`smart-image-art ${showPhoto ? 'is-hidden' : ''}`} />
      {showPhoto && <img src={src} alt={alt} className="smart-image" decoding="async" />}
    </span>
  );
}
