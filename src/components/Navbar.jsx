import { useEffect, useState } from 'react';
import { business } from '../config/business';
import './Navbar.css';

export default function Navbar({ dark }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${dark ? 'navbar--dark' : ''}`}>
      <a href="#top" className="navbar__brand" aria-label={`${business.name} — inicio`}>
        <img src="/brand/isotipo-nomada.svg" alt="" width="30" height="30" />
        <span className="navbar__brand-text">{business.name}</span>
      </a>
      <span className="navbar__tagline">{business.tagline}</span>
    </header>
  );
}
