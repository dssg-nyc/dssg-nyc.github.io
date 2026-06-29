import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';

const NAV_LINKS = [
  { label: 'Initiatives', hash: '#initiatives' },
  { label: 'About', hash: '#about' },
  { label: 'Impact', hash: '#impact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const handleAnchorClick = (e, hash) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== '/') navigate(`/${hash}`);
    else navigate(hash);
  };

  return (
    <header className={`ed-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="ed-header-inner">
        <a
          href="/#home"
          onClick={(e) => handleAnchorClick(e, '#home')}
          className="ed-brand"
          aria-label="NYC x DSSG — home"
        >
          <span className="ed-brand-mark">NYC&#8202;&times;&#8202;DSSG</span>
          <span className="ed-brand-sub">Data Science for Social Good</span>
        </a>

        <button
          className={`ed-burger ${menuOpen ? 'open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <nav className={`ed-nav ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.hash}
              href={`/${l.hash}`}
              onClick={(e) => handleAnchorClick(e, l.hash)}
              className="ed-nav-link"
            >
              {l.label}
            </a>
          ))}
          <NavLink to="/diplomats" className="ed-nav-link" onClick={() => setMenuOpen(false)}>
            Diplomats
          </NavLink>
          <NavLink to="/events" className="ed-nav-link" onClick={() => setMenuOpen(false)}>
            Events
          </NavLink>

          {/* Gated / secondary-audience link, visually set apart */}
          <a
            href="https://www.linkedin.com/groups/13349223/"
            target="_blank"
            rel="noopener noreferrer"
            className="ed-nav-link ed-nav-gated"
            onClick={() => setMenuOpen(false)}
          >
            Member Login
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
