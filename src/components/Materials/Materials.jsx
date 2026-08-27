import { useState } from "react";
import MaterialTextures from "./MaterialTextures";
import { useCursorHover } from "../../lib/CursorContext";
import "./Materials.css";

const MATERIALS = [
  { key: "oak", label: "Oak", note: "Solid European oak, oiled by hand." },
  { key: "travertine", label: "Travertine", note: "Quarried stone, honed finish." },
  { key: "steel", label: "Steel", note: "Brushed, cold-rolled." },
  { key: "wool", label: "Wool", note: "Undyed, double-woven bouclé." },
];

export default function Materials() {
  const [active, setActive] = useState("oak");
  const exploreHover = useCursorHover("EXPLORE");

  return (
    <section className="materials section container" id="materials">
      <MaterialTextures />

      <div className="materials__head">
        <span className="eyebrow">Materials — 04</span>
        <h2 className="type-editorial materials__title">Material matters.</h2>
      </div>

      <div className="materials__body">
        <ul className="materials__list" {...exploreHover}>
          {MATERIALS.map((m) => (
            <li key={m.key}>
              <button
                className={`materials__item ${active === m.key ? "is-active" : ""}`}
                onMouseEnter={() => setActive(m.key)}
                onFocus={() => setActive(m.key)}
                onClick={() => setActive(m.key)}
              >
                <span className="type-display materials__label">{m.label}</span>
                <span className="materials__note">{m.note}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="materials__swatch" aria-hidden="true">
          {MATERIALS.map((m) => (
            <div
              key={m.key}
              className={`materials__layer ${active === m.key ? "is-visible" : ""}`}
              style={{ filter: `url(#tex-${m.key})` }}
            />
          ))}
          <div className="materials__swatch-frame" />
        </div>
      </div>
    </section>
  );
}
