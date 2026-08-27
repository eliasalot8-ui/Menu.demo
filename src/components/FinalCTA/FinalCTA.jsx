import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useMagnetic } from "../../hooks/useMagnetic";
import { useCursorHover } from "../../lib/CursorContext";
import "./FinalCTA.css";

export default function FinalCTA({ reduceMotion, isTouch }) {
  const sectionRef = useRef(null);
  const linesRef = useRef([]);
  const magneticRef = useMagnetic(0.4, isTouch);
  const viewHover = useCursorHover("VIEW");

  useLayoutEffect(() => {
    if (reduceMotion) {
      gsap.set(linesRef.current, { yPercent: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        linesRef.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section className="final-cta section container" ref={sectionRef}>
      <h2 className="final-cta__headline">
        <span className="split-line">
          <span className="type-display" ref={(el) => (linesRef.current[0] = el)}>
            Live
          </span>
        </span>
        <span className="split-line">
          <span className="type-display" ref={(el) => (linesRef.current[1] = el)}>
            with less.
          </span>
        </span>
      </h2>

      <a href="#collection" className="final-cta__link" ref={magneticRef} {...viewHover}>
        <span>Explore the collection</span>
        <span className="final-cta__arrow" aria-hidden="true">
          →
        </span>
      </a>
    </section>
  );
}
