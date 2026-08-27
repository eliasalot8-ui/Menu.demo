import { useEffect, useRef, useState } from "react";

/** True while the element is at least partially on screen. Used to pause
 * off-screen R3F canvases (frameloop="demand") so idle GPU cost stays low. */
export function useInView(threshold = 0) {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
