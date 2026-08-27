import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import GenerativePanel from "../EditorialGallery/GenerativePanel";
import "../EditorialGallery/GenerativePanel.css";
import "./StorySection.css";

const STAGES = [
  { word: "Form", variant: "object-study" },
  { word: "Material", variant: "wood-macro" },
  { word: "Time", variant: "stone-shadow" },
];

export default function StorySection({ reduceMotion }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const layersRef = useRef([]);
  const wordsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const layers = layersRef.current.filter(Boolean);
      const words = wordsRef.current.filter(Boolean);

      gsap.set(layers, { autoAlpha: 0 });
      gsap.set(layers[0], { autoAlpha: 1 });
      gsap.set(words, { autoAlpha: 0, scale: 1.3 });
      gsap.set(words[0], { autoAlpha: 1, scale: 1 });

      if (reduceMotion) return;

      // A single ScrollTrigger drives the pin + every animation below —
      // reusing one trigger config across multiple ScrollTrigger.create
      // calls let each recompute "end" against a height already inflated
      // by the previous one's pin-spacer, so they desynced. One instance
      // avoids that entirely, with end expressed in real pixels.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.8}`,
          scrub: 0.7,
          pin: stageRef.current,
          invalidateOnRefresh: true,
        },
      });

      tl.to(layers, { scale: 1.18, ease: "none", duration: 1 }, 0)
        .to(words[0], { autoAlpha: 0, scale: 0.85, duration: 0.16 }, 0.2)
        .fromTo(layers[1], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.24)
        .fromTo(words[1], { autoAlpha: 0, scale: 1.3 }, { autoAlpha: 1, scale: 1, duration: 0.16 }, 0.3)
        .to(words[1], { autoAlpha: 0, scale: 0.85, duration: 0.16 }, 0.56)
        .fromTo(layers[2], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.6)
        .fromTo(words[2], { autoAlpha: 0, scale: 1.3 }, { autoAlpha: 1, scale: 1, duration: 0.16 }, 0.66);
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section className="story" ref={sectionRef}>
      <div className="story__stage" ref={stageRef}>
        {STAGES.map((s, i) => (
          <div className="story__bg" key={s.word} ref={(el) => (layersRef.current[i] = el)}>
            <GenerativePanel variant={s.variant} />
          </div>
        ))}

        <div className="story__scrim" />

        <div className="story__words">
          {STAGES.map((s, i) => (
            <span
              className="type-display story__word"
              key={s.word}
              ref={(el) => (wordsRef.current[i] = el)}
            >
              {s.word}
            </span>
          ))}
        </div>

        <span className="eyebrow story__eyebrow">Form — Material — Time</span>
      </div>
    </section>
  );
}
