import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { splitWords } from "../../lib/splitText";
import "./Manifesto.css";

const LINE_1 = splitWords("We create objects");
const LINE_2 = splitWords("designed to remain.");

export default function Manifesto() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordsRef.current.filter(Boolean);
      gsap.set(words, { yPercent: 100, opacity: 0, rotateX: -35 });

      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.045,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 15%",
          scrub: 0.6,
        },
      });

      gsap.to(".manifesto__line", {
        letterSpacing: "0em",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 20%",
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let idx = 0;

  return (
    <section className="manifesto section container" ref={sectionRef}>
      <span className="eyebrow manifesto__eyebrow">Philosophy — 01</span>
      <p className="manifesto__text">
        <span className="manifesto__line" style={{ letterSpacing: "0.03em" }}>
          {LINE_1.map(({ word, key }) => {
            const i = idx++;
            return (
              <span className="split-line" key={key}>
                <span
                  className="type-display split-word manifesto__word"
                  ref={(el) => (wordsRef.current[i] = el)}
                >
                  {word}
                </span>
              </span>
            );
          })}
        </span>
        <span className="manifesto__line manifesto__line--dim" style={{ letterSpacing: "0.03em" }}>
          {LINE_2.map(({ word, key }) => {
            const i = idx++;
            return (
              <span className="split-line" key={key}>
                <span
                  className="type-display split-word manifesto__word"
                  ref={(el) => (wordsRef.current[i] = el)}
                >
                  {word}
                </span>
              </span>
            );
          })}
        </span>
      </p>
    </section>
  );
}
