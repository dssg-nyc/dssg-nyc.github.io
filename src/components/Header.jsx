import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const handleAnchorClick = (e, hash) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      navigate(hash);
    }
  };

  return (
    <header className={`modern-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-section">
          <a href="/#home" onClick={(e) => handleAnchorClick(e, '#home')} className="logo-link">
            <img src="/images/logo3.png" alt="DSSG Logo" className="logo-img" />
            <div className="logo-text">
              <span className="logo-title">DSSG</span>
              <span className="logo-subtitle">NYC</span>
            </div>
          </a>
        </div>
        
        <nav className="nav-menu">
          <a href="/#home" onClick={(e) => handleAnchorClick(e, '#home')} className="nav-link">
            Home
          </a>
          <a href="/#projects" onClick={(e) => handleAnchorClick(e, '#projects')} className="nav-link">
            Get Involved
          </a>
          <a href="/#about" onClick={(e) => handleAnchorClick(e, '#about')} className="nav-link">
            About
          </a>
          <a href="/#writing" onClick={(e) => handleAnchorClick(e, '#writing')} className="nav-link">
            Impact Stories
          </a>
          <NavLink to="/events" className="nav-link">
            Events
          </NavLink>
          <a href="/#book" onClick={(e) => handleAnchorClick(e, '#book')} className="nav-link button-nav">
            Partner With Us
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
