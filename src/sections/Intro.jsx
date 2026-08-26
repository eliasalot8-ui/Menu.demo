import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { business } from '../config/business';
import './Intro.css';

export default function Intro({ onDone }) {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef(null);
  const doneRef = useRef(false);

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    gsap.to(rootRef.current, {
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        setVisible(false);
        onDone();
      },
    });
  }

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      const t = setTimeout(finish, 400);
      return () => clearTimeout(t);
    }

    // Secuencia estrictamente en orden — isotipo, nombre, tagline, claim
    // y por último el CTA — pensada para durar ~2.2s en total antes de
    // pasar al menú, sin cortes bruscos entre pasos.
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo('.intro__mark', { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' })
      .fromTo('.intro__title', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.15')
      .fromTo('.intro__tagline', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, '-=0.15')
      .fromTo('.intro__claim', { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.1')
      .fromTo(
        '.intro__skip',
        { opacity: 0, visibility: 'hidden', y: 6 },
        { opacity: 0.5, visibility: 'visible', y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.05'
      )
      .to({}, { duration: 0.3 })
      .call(finish);

    const skip = setTimeout(finish, 2800);
    return () => {
      tl.kill();
      clearTimeout(skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div className="intro" ref={rootRef}>
      <div className="intro__mark">
        <img src="/brand/isotipo-nomada.svg" alt="" width="56" height="56" />
      </div>
      <h1 className="intro__title headline">{business.name}</h1>
      <p className="intro__tagline">{business.tagline}</p>
      <p className="intro__claim">{business.claim}</p>
      <button
        className="intro__skip"
        style={{ opacity: 0, visibility: 'hidden' }}
        onClick={finish}
      >
        Explorar la carta
      </button>
    </div>
  );
}
