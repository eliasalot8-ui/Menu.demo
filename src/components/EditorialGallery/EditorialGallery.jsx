import GenerativePanel from "./GenerativePanel";
import RevealFrame from "./RevealFrame";
import "./GenerativePanel.css";
import "./EditorialGallery.css";

export default function EditorialGallery({ reduceMotion }) {
  return (
    <section className="editorial section container" aria-label="Editorial gallery">
      <div className="editorial__intro">
        <span className="eyebrow">Journal — 02</span>
        <span className="mono-index">(01 / 05)</span>
      </div>

      <div className="editorial__grid">
        <RevealFrame className="editorial__item editorial__item--wide" reduceMotion={reduceMotion} parallax={6}>
          <GenerativePanel variant="interior-light" />
        </RevealFrame>

        <div className="editorial__caption">
          <p className="type-editorial">Quiet forms. Honest materials.</p>
          <span className="mono-index">Studio, Copenhagen</span>
        </div>

        <RevealFrame className="editorial__item editorial__item--tall" reduceMotion={reduceMotion} parallax={10}>
          <GenerativePanel variant="window-grid" />
        </RevealFrame>

        <RevealFrame className="editorial__item editorial__item--small" reduceMotion={reduceMotion} parallax={8}>
          <GenerativePanel variant="stone-shadow" />
        </RevealFrame>

        <div className="editorial__caption editorial__caption--right">
          <p className="type-editorial">Made slowly.</p>
          <span className="mono-index">Atelier, Milano</span>
        </div>

        <RevealFrame className="editorial__item editorial__item--full" reduceMotion={reduceMotion} parallax={5}>
          <GenerativePanel variant="wood-macro" />
        </RevealFrame>
      </div>
    </section>
  );
}
