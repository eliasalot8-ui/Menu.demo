import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import ProductScene from "./ProductScene";
import ChairSilhouette from "../ChairSilhouette";
import "./ProductShowcase.css";

export default function ProductShowcase({ reduceMotion, isNarrow }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const panelsRef = useRef([]);
  const progressRef = useRef(0);
  // Pinning a flex-column stage taller than one viewport clips the lower
  // panels on narrow screens, so mobile skips the pin and just shows every
  // panel in normal stacked flow instead of scrubbing between them.
  const staticMode = reduceMotion || isNarrow;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current.filter(Boolean);

      if (staticMode) {
        gsap.set(panels, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(panels, { autoAlpha: 0, y: 26 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      // One ScrollTrigger handles the pin, the progress readout and the
      // panel timeline together — see StorySection for why splitting this
      // across multiple ScrollTrigger.create calls desyncs the pin.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.6}`,
          scrub: 1,
          pin: stageRef.current,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      });

      tl.to(panels[0], { autoAlpha: 0, y: -20, duration: 0.22 }, 0.16)
        .fromTo(panels[1], { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.22 }, 0.24)
        .to(panels[1], { autoAlpha: 0, y: -20, duration: 0.22 }, 0.5)
        .fromTo(panels[2], { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.22 }, 0.58)
        .to(panels[2], { autoAlpha: 0, y: -20, duration: 0.2 }, 0.85);
    }, sectionRef);

    return () => ctx.revert();
  }, [staticMode]);

  return (
    <section className="product-showcase" ref={sectionRef} id="collection">
      <div className="product-showcase__stage" ref={stageRef}>
        <span className="product-showcase__giant" aria-hidden="true">
          N01
        </span>

        {reduceMotion ? (
          <ChairSilhouette className="product-showcase__silhouette" />
        ) : (
          <ProductScene progressRef={progressRef} />
        )}

        <div className="product-showcase__panel product-showcase__panel--a" ref={(el) => (panelsRef.current[0] = el)}>
          <span className="eyebrow">Product — 01</span>
          <h2 className="type-display product-showcase__title">
            N01 Lounge
            <br />
            Chair
          </h2>
        </div>

        <div className="product-showcase__panel product-showcase__panel--b" ref={(el) => (panelsRef.current[1] = el)}>
          <span className="eyebrow">Materials</span>
          <p className="type-editorial product-showcase__line">Oak / Wool / Steel</p>
        </div>

        <div className="product-showcase__panel product-showcase__panel--c" ref={(el) => (panelsRef.current[2] = el)}>
          <span className="eyebrow">Designed 2026</span>
          <p className="type-editorial product-showcase__line">Made to order.</p>
        </div>
      </div>
    </section>
  );
}
