import { useState, useEffect } from "react";
import { InlineWidget } from "react-calendly";
import "./Book.css";
import siteProperties from "../data/siteproperties.json";

const Book = () => {
  const [height, setHeight] = useState(getIframeHeight());
  const calendlyUrl = siteProperties.calendlyUrl;

  function getIframeHeight() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 999) {
      return '690px';
    } else {
      return '900px';
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setHeight(getIframeHeight());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <section className="book-section" id="book">
      <div className="container">
        <div className="book-content">
          <div className="book-header">
            <h2 className="section-title">Partner With Us</h2>
            <p className="section-subtitle">
              Ready to make a difference? Whether you're a skilled professional looking to volunteer 
              or a non-profit seeking data-driven solutions, let's start a conversation about how we can work together.
            </p>
          </div>
          
          <div className="partnership-grid">
            <div className="partnership-info">
              <h3>Become a Partner-Sponsor</h3>
              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon">🎯</div>
                  <div className="info-content">
                    <h4>Tailored Solutions</h4>
                    <p>Every partnership is customized to your organization's unique needs and goals</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">👥</div>
                  <div className="info-content">
                    <h4>Expert Team</h4>
                    <p>Access to a diverse network of senior-level data professionals and technologists</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">⚡</div>
                  <div className="info-content">
                    <h4>Proven Impact</h4>
                    <p>Track record of delivering measurable results that amplify your mission</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">🔄</div>
                  <div className="info-content">
                    <h4>Long-term Support</h4>
                    <p>Ongoing mentorship and support beyond project completion</p>
                  </div>
                </div>
              </div>
              
              <div className="contact-alternatives">
                <h4>Prefer a Different Way to Connect?</h4>
                <div className="contact-options">
                <h5>Contact: dssgnyc@gmail.com</h5>
                  <a href="mailto:dssgnyc@gmail.com" 
                     className="button outline">
                    Email Us
                  </a>
                </div>
              </div>
            </div>
            
            <div className="calendly-container">
              <div className="calendly-wrapper">
                <InlineWidget 
                  url={calendlyUrl}
                  styles={{ 
                    height,
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;