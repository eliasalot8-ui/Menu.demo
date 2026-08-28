import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import ChairScene from "./ChairScene";
import ChairSilhouette from "../ChairSilhouette";
import "./Hero.css";

export default function Hero({ ready, reduceMotion, isTouch, isNarrow }) {
  const scrollRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight || 1;
      scrollRef.current = Math.min(1.4, window.scrollY / h);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let onMove;
    if (!isTouch) {
      onMove = (e) => {
        pointerRef.current = {
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        };
      };
      window.addEventListener("mousemove", onMove);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (onMove) window.removeEventListener("mousemove", onMove);
    };
  }, [isTouch]);

  useEffect(() => {
    if (!ready) return;
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      linesRef.current,
      { yPercent: 115 },
      { yPercent: 0, duration: 1.3, stagger: 0.09, ease: "power4.out" }
    ).fromTo(
      heroRef.current.querySelectorAll(".hero__meta, .hero__scroll"),
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" },
      "-=0.6"
    );
  }, [ready]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero__scene" aria-hidden="true">
        {reduceMotion ? (
          <ChairSilhouette className="hero__silhouette" />
        ) : (
          <ChairScene
            scrollRef={scrollRef}
            pointerRef={pointerRef}
            quality={isNarrow ? "low" : "high"}
            isNarrow={isNarrow}
          />
        )}
      </div>

      <div className="hero__grid container">
        <div className="hero__topline">
          <span className="eyebrow split-line">
            <span ref={(el) => (linesRef.current[0] = el)} className="split-word">
              NOMA / 2026
            </span>
          </span>
          <span className="eyebrow split-line hero__topline-right">
            <span ref={(el) => (linesRef.current[1] = el)} className="split-word">
              Collection 01
            </span>
          </span>
        </div>

        <h1 className="hero__headline">
          <span className="split-line">
            <span className="type-display hero__word" ref={(el) => (linesRef.current[2] = el)}>
              Objects
            </span>
          </span>
          <span className="split-line hero__line--right">
            <span className="type-display hero__word" ref={(el) => (linesRef.current[3] = el)}>
              for living
            </span>
          </span>
        </h1>

        <div className="hero__meta">
          <p className="hero__sub type-editorial">Designed for slower living.</p>
          <span className="hero__index mono-index">N01 — Lounge Chair</span>
        </div>
      </div>

      <div className="hero__scroll">
        <span className="hero__scroll-line" />
        <span className="eyebrow">Scroll</span>
      </div>
    </section>
  );
}
