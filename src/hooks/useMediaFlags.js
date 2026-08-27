import { useEffect, useState } from "react";

function readFlags() {
  return {
    isTouch: window.matchMedia("(hover: none), (pointer: coarse)").matches,
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    isNarrow: window.matchMedia("(max-width: 860px)").matches,
  };
}

/**
 * Central place for environment flags that change the experience:
 * touch devices lose the custom cursor & hover-only interactions,
 * reduced-motion users lose scroll-pinning/parallax choreography.
 *
 * Read synchronously on first render (not via an effect defaulting to
 * guessed values) so sections that branch their layout on `isNarrow`
 * — HorizontalCollection in particular — never mount once in the wrong
 * mode and re-mount into the pinned mode after siblings below it have
 * already measured their own ScrollTrigger positions against the
 * shorter, unpinned layout.
 */
export function useMediaFlags() {
  const [flags, setFlags] = useState(() =>
    typeof window !== "undefined" ? readFlags() : { isTouch: true, reduceMotion: false, isNarrow: true }
  );

  useEffect(() => {
    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(max-width: 860px)");

    const update = () => setFlags(readFlags());

    touchQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    widthQuery.addEventListener("change", update);

    return () => {
      touchQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
      widthQuery.removeEventListener("change", update);
    };
  }, []);

  return flags;
}
