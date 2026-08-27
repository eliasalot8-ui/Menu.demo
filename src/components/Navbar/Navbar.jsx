import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { useCursorHover } from "../../lib/CursorContext";
import "./Navbar.css";

const LINKS = [
  { n: "01", label: "Collection", href: "#collection" },
  { n: "02", label: "Philosophy", href: "#manifesto" },
  { n: "03", label: "Journal", href: "#materials" },
  { n: "04", label: "Contact", href: "#footer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const lastY = useRef(0);
  const viewHover = useCursorHover("VIEW");

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (!open) {
          setHidden(y > lastY.current && y > 160);
        }
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(overlay, { clipPath: "inset(0 0 100% 0)" }, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        linksRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.06, delay: 0.25, ease: "power4.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, {
        clipPath: "inset(100% 0 0 0)",
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: () => gsap.set(overlay, { display: "none", clipPath: "inset(0 0 100% 0)" }),
      });
    }
  }, [open]);

  const handleLink = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 350);
    }
  };

  return (
    <>
      <header className={`navbar ${hidden ? "navbar--hidden" : ""} ${open ? "navbar--open" : ""}`}>
        <div className="navbar__row container">
          <a href="#top" className="navbar__mark" {...viewHover}>
            NOMA
          </a>

          <nav className="navbar__links" aria-label="Primary">
            <a href="#collection">Collection</a>
            <a href="#manifesto">Philosophy</a>
            <a href="#materials">Journal</a>
          </nav>

          <button
            className="navbar__toggle"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="navbar__toggle-label">{open ? "Close" : "Menu"}</span>
            <span className={`navbar__burger ${open ? "is-open" : ""}`}>
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <div className="menu-overlay" ref={overlayRef} role="dialog" aria-modal="true">
        <div className="menu-overlay__grid container">
          <div className="menu-overlay__col">
            <span className="eyebrow">Navigate</span>
            <ul className="menu-overlay__list">
              {LINKS.map((l, i) => (
                <li key={l.n} className="menu-overlay__item-wrap">
                  <button
                    ref={(el) => (linksRef.current[i] = el)}
                    className="menu-overlay__item"
                    onClick={() => handleLink(l.href)}
                  >
                    <span className="menu-overlay__num">{l.n}</span>
                    <span className="menu-overlay__label">{l.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="menu-overlay__col menu-overlay__col--aside">
            <p className="type-editorial menu-overlay__quote">
              Quiet forms.
              <br />
              Honest materials.
            </p>
            <div className="menu-overlay__meta">
              <span>Copenhagen</span>
              <span>Milano</span>
              <span>Buenos Aires</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
