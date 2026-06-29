import './Footer.css';
import siteProperties from '../data/siteproperties.json';
import socialIcons from '../data/socialicons.json';
import Illustration from './Illustration';
import { openSegmentModal } from './SegmentModal';

const Footer = () => {
  const social = siteProperties.socialProfiles || {};

  return (
    <footer className="ed-footer">
      {/* Footer-divider illustration — bookends the hero plate */}
      <div className="footer-divider reveal">
        <Illustration variant="divider" />
      </div>

      <div className="container footer-grid">
        {/* Column 1 — brand lockup + copyright */}
        <div className="footer-brand">
          <span className="footer-mark">NYC&#8202;&times;&#8202;DSSG</span>
          <p className="footer-tagline">Data Science for Social Good</p>
          <p className="footer-note">
            A civic-tech volunteer community led by the Data Diplomats for Nonprofits, Inc.
            — a 501(c)(3) nonprofit. Connecting skilled technologists with NYC nonprofits
            to create meaningful social impact.
          </p>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} {siteProperties.name}. All rights reserved.
          </p>
        </div>

        {/* Column 2 — repeated nav */}
        <nav className="footer-nav" aria-label="Footer">
          <h4 className="footer-col-title">Explore</h4>
          <ul>
            <li><a href="/#initiatives">Initiatives</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#impact">Impact stories</a></li>
            <li><a href="/#/diplomats">Data Diplomats</a></li>
            <li><a href="/#/events">Events</a></li>
            <li><a href="/#/blog">Blog</a></li>
          </ul>
          <button type="button" className="footer-cta" onClick={openSegmentModal}>
            Sign up &amp; register &rarr;
          </button>
        </nav>

        {/* Column 3 — social handles */}
        <div className="footer-social">
          <h4 className="footer-col-title">Connect</h4>
          <ul>
            <li><a href="mailto:dssgnyc@gmail.com">dssgnyc@gmail.com</a></li>
          </ul>
          <div className="footer-handles">
            {Object.entries(social).map(([key, value]) =>
              socialIcons[key] ? (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-handle"
                  aria-label={key}
                >
                  <img src={socialIcons[key]} alt={key} />
                </a>
              ) : null
            )}
          </div>
          <p className="footer-credit">Support civic tech in New York City.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
