import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

/**
 * Mask-reveals its children on scroll (clip-path + scale), with a slow
 * inner parallax drift layered on top once revealed.
 */
export default function RevealFrame({ children, className = "", parallax = 10, reduceMotion }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        outerRef.current,
        { clipPath: "inset(0% 0 100% 0)" },
        {
          clipPath: "inset(0% 0 0% 0)",
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: outerRef.current, start: "top 88%" },
        }
      );
      gsap.fromTo(
        innerRef.current,
        { scale: 1.18, yPercent: -parallax },
        {
          scale: 1,
          yPercent: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: { trigger: outerRef.current, start: "top 88%" },
        }
      );
    }, outerRef);

    return () => ctx.revert();
  }, [parallax, reduceMotion]);

  return (
    <div ref={outerRef} className={`reveal-frame ${className}`}>
      <div ref={innerRef} className="reveal-frame__inner">
        {children}
      </div>
    </div>
  );
}
