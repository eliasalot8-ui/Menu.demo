import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SmartImage from '../components/art/SmartImage';
import Button from '../components/Button';
import { business } from '../config/business';
import { heroImagePath } from '../config/images';
import './Hero.css';

export default function Hero() {
  const rootRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero__eyebrow, .hero__title span, .hero__sub, .hero__cta',
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.1 }
      );
      gsap.fromTo(
        '.hero__frame',
        { autoAlpha: 0, scale: 1.08, clipPath: 'inset(12% round 24px)' },
        { autoAlpha: 1, scale: 1, clipPath: 'inset(0% round 24px)', duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.2 }
      );
    }, rootRef);

    const isTouch = window.matchMedia('(hover: none)').matches;
    let onMove;
    if (!isTouch) {
      const setters = layersRef.current.map((el, i) =>
        el ? { x: gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' }), y: gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' }), depth: (i + 1) * 6 } : null
      );
      onMove = (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        setters.forEach((s) => {
          if (!s) return;
          s.x(dx * s.depth);
          s.y(dy * s.depth);
        });
      };
      window.addEventListener('mousemove', onMove);
    }

    return () => {
      ctx.revert();
      if (onMove) window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section className="hero" ref={rootRef} id="top">
      <div className="hero__visuals">
        <div className="hero__frame hero__frame--a" ref={(el) => (layersRef.current[0] = el)}>
          <SmartImage
            src={heroImagePath(0)}
            art="milk-cup"
            mood="dawn"
            alt="Café con leche recién servido en NÓMADA"
            eager
          />
        </div>
        <div className="hero__frame hero__frame--b" ref={(el) => (layersRef.current[1] = el)}>
          <SmartImage
            src={heroImagePath(1)}
            art="board"
            mood="midday-warm"
            alt="Mesa compartida de mediodía en NÓMADA"
            eager
          />
        </div>
        <div className="hero__frame hero__frame--c" ref={(el) => (layersRef.current[2] = el)}>
          <SmartImage
            src={heroImagePath(2)}
            art="cocktail-glass"
            mood="night"
            alt="Trago de bar por la noche en NÓMADA"
          />
        </div>
      </div>

      <div className="hero__copy container">
        <span className="eyebrow hero__eyebrow">{business.tagline}</span>
        <h1 className="headline hero__title">
          <span>COMÉ.</span> <span>TOMÁ.</span> <span>QUEDATE.</span>
        </h1>
        <p className="hero__sub">Una carta para cualquier momento del día.</p>
        <div className="hero__cta">
          <Button as="a" href="#cafe" variant="primary">
            Descubrir el menú
          </Button>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-dot" />
      </div>
    </section>
  );
}
