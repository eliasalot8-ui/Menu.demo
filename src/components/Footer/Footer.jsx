import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer container" id="footer">
      <div className="footer__top">
        <span className="footer__mark">NOMA</span>
        <nav className="footer__links" aria-label="Footer">
          <a href="#top">Instagram</a>
          <a href="#materials">Journal</a>
          <a href="#footer">Contact</a>
        </nav>
      </div>

      <div className="hairline" />

      <div className="footer__bottom">
        <span className="footer__cities">Copenhagen — Milano — Buenos Aires</span>
        <span className="footer__tagline type-editorial">Objects for living.</span>
        <span className="footer__year mono-index">© 2026</span>
      </div>
    </footer>
  );
}
