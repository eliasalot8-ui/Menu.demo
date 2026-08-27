import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import "./Loader.css";

const MIN_DURATION = 2.1;

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const barRef = useRef(null);
  const wordRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counter = { v: 0 };
    const tl = gsap.timeline();

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const counterDone = new Promise((resolve) => {
      tl.to(counter, {
        v: 100,
        duration: reduceMotion ? 0.4 : MIN_DURATION,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.floor(counter.v)),
        onComplete: resolve,
      });
    });

    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: reduceMotion ? 0.4 : MIN_DURATION, ease: "power2.inOut", transformOrigin: "left center" }
    );

    gsap.fromTo(
      wordRef.current,
      { yPercent: 110 },
      { yPercent: 0, duration: 1.4, ease: "power4.out", delay: 0.15 }
    );

    Promise.all([counterDone, fontsReady]).then(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      finish();
    });

    function finish() {
      const exitTl = gsap.timeline({
        onComplete: () => onComplete?.(),
      });
      exitTl
        .to(wordRef.current, { yPercent: -110, duration: 0.9, ease: "power4.in" })
        .to(
          [barRef.current.parentElement, rootRef.current.querySelector(".loader__meta")],
          { autoAlpha: 0, duration: 0.4 },
          "<"
        )
        .to(
          panelRef.current,
          { yPercent: -100, duration: 1.1, ease: "power4.inOut" },
          "-=0.35"
        );
    }

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="loader" ref={rootRef}>
      <div className="loader__panel" ref={panelRef}>
        <div className="loader__mark">
          <span className="loader__word" ref={wordRef}>
            NOMA
          </span>
        </div>

        <div className="loader__meta">
          <span className="loader__tag">Objects for living</span>
          <span className="loader__count">{String(count).padStart(2, "0")}</span>
        </div>

        <div className="loader__bar-track">
          <div className="loader__bar" ref={barRef} />
        </div>
      </div>
    </div>
  );
}
