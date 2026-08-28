import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useCursor } from "../../lib/CursorContext";
import "./CustomCursor.css";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const { label } = useCursor();

  useEffect(() => {
    document.body.classList.add("cursor-active");
    const dot = dotRef.current;
    const ring = ringRef.current;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const setDot = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setRing = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setDot(pos.x);
      setDotY(pos.y);
      setRing(pos.x);
      setRingY(pos.y);
    };

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.3, ease: "power2.out" });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });
    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.25 });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove("cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  useEffect(() => {
    const ring = ringRef.current;
    gsap.to(ring, {
      scale: label ? 2.6 : 1,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [label]);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef}>
        <span className="cursor-ring__label">{label}</span>
      </div>
    </div>
  );
}
