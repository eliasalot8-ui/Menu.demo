/**
 * Generative stand-in for architectural/interior photography — layered
 * gradients + fine line work, no external images. Kept in one palette so
 * every "photograph" reads as part of the same shoot.
 */
const VARIANTS = {
  "interior-light": (
    <>
      <div className="gpanel__wash gpanel__wash--warm" />
      <div className="gpanel__beam" />
      <div className="gpanel__lines" />
    </>
  ),
  "stone-shadow": (
    <>
      <div className="gpanel__wash gpanel__wash--stone" />
      <div className="gpanel__arc" />
    </>
  ),
  "wood-macro": (
    <>
      <div className="gpanel__wash gpanel__wash--oak" />
      <div className="gpanel__grain" />
    </>
  ),
  "window-grid": (
    <>
      <div className="gpanel__wash gpanel__wash--carbon" />
      <div className="gpanel__grid" />
    </>
  ),
  "object-study": (
    <>
      <div className="gpanel__wash gpanel__wash--bone" />
      <div className="gpanel__orb" />
    </>
  ),
};

export default function GenerativePanel({ variant = "interior-light", className = "" }) {
  return <div className={`gpanel ${className}`}>{VARIANTS[variant]}</div>;
}
