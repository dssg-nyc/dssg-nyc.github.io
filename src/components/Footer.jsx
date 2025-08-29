import PropTypes from 'prop-types';
import './Footer.css';
import siteProperties from '../data/siteproperties.json';
import socialIcons from '../data/socialicons.json';

const Footer = () => {
  if (Object.keys(siteProperties).length === 0 || Object.keys(socialIcons).length === 0) {
    return (
      <footer className="modern-footer">
        <div className="container">
          <p>Loading...</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="modern-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/images/logo3.png" alt="DSSG Logo" className="logo-img" />
                <div className="brand-text">
                  <h3>NYC DSSG</h3>
                  <p>Data Science for Social Good</p>
                </div>
              </div>
              <p className="brand-description">
                Connecting skilled technology professionals with non-profit organizations 
                to create meaningful social impact through data science and innovation.
              </p>
            </div>
            
            <div className="footer-links">
              <div className="link-group">
                <h4>Get Involved</h4>
                <ul>
                  <li><a href="#projects">Volunteer</a></li>
                  <li><a href="#projects">Partner With Us</a></li>
                  <li><a href="#writing">Success Stories</a></li>
                  <li><a href="#book">Schedule Meeting</a></li>
                </ul>
              </div>
              
              <div className="link-group">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#writing">Impact Reports</a></li>
                  <li><a href="#writing">Case Studies</a></li>
                  <li><a href="#writing">Best Practices</a></li>
                  <li><a href="#writing">Newsletter</a></li>
                </ul>
              </div>
              
              <div className="link-group">
                <h4>Connect</h4>
                <ul>
                  <li><a href="mailto:dssgnyc@gmail.com">Contact Us</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="/blog">Blog</a></li>
                </ul>
                <div className="social-links">
                  {Object.entries(siteProperties.socialProfiles).map(([key, value]) => {
                    return socialIcons[key] ? (
                      <a href={value} target="_blank" rel="noopener noreferrer" key={key} className="social-link">
                        <img src={socialIcons[key]} alt={key} />
                      </a>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-legal">
              <p>&copy; 2025 {siteProperties.name}. All rights reserved.</p>
            </div>
            <div className="footer-attribution">
              <p>Built with ❤️ in New York City</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  foregroundColor: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Footer;