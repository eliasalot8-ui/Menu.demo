import { business } from '../config/business';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src="/brand/logo-nomada-light.svg" alt={business.name} className="footer__logo" width="200" height="52" />

        <div className="footer__grid">
          <div>
            <span className="footer__label">Horario</span>
            <p>{business.hoursLabel}</p>
            <p>{business.hours}</p>
          </div>
          <div>
            <span className="footer__label">Ubicación</span>
            <p>{business.city}</p>
            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="footer__link">
              Cómo llegar
            </a>
          </div>
          <div>
            <span className="footer__label">Redes</span>
            <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer__link">
              Instagram — {business.instagramHandle}
            </a>
            <a
              href={`https://wa.me/${business.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <p className="footer__demo">Menú digital interactivo — Demo</p>
      </div>
    </footer>
  );
}
