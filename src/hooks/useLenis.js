import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Drives smooth scroll and keeps ScrollTrigger in sync with it.
 * Disabled automatically for prefers-reduced-motion.
 */
export function useLenis({ enabled = true } = {}) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!enabled || reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });
    lenisRef.current = lenis;
    document.documentElement.classList.add("has-lenis");

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      document.documentElement.classList.remove("has-lenis");
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}
