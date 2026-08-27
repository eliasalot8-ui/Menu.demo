import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import GenerativePanel from "../EditorialGallery/GenerativePanel";
import "../EditorialGallery/GenerativePanel.css";
import "./HorizontalCollection.css";

const PIECES = [
  { n: "01", name: "Lounge", material: "Oak / Wool", detail: "Seat height 38cm", variant: "interior-light", align: "end" },
  { n: "02", name: "Table", material: "Travertine", detail: "Ø 120cm", variant: "stone-shadow", align: "start" },
  { n: "03", name: "Light", material: "Blown glass / Steel", detail: "Dimmable, warm 2700K", variant: "object-study", align: "end" },
  { n: "04", name: "Object", material: "Solid oak", detail: "Hand finished", variant: "wood-macro", align: "start" },
];

export default function HorizontalCollection({ reduceMotion, isNarrow }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const staticMode = reduceMotion || isNarrow;

  useLayoutEffect(() => {
    if (staticMode) return;
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [staticMode]);

  return (
    <section className={`horizontal ${staticMode ? "horizontal--static" : ""}`} ref={sectionRef}>
      <div className="horizontal__head container">
        <span className="eyebrow">Collection — 03</span>
        <span className="mono-index">Scroll to explore</span>
      </div>
      <div className="horizontal__track" ref={trackRef}>
        {PIECES.map((p) => (
          <article className={`horizontal__piece horizontal__piece--${p.align}`} key={p.n}>
            <div className="horizontal__visual">
              <GenerativePanel variant={p.variant} />
            </div>
            <div className="horizontal__data">
              <span className="horizontal__num mono-index">{p.n}</span>
              <h3 className="type-display horizontal__name">{p.name}</h3>
              <div className="horizontal__meta">
                <span>{p.material}</span>
                <span>{p.detail}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
