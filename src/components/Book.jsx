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
              <h3>Become a Member</h3>
              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon">🎓</div>
                  <div className="info-content">
                    <h4>Hands on AI Workshops</h4>
                    <p>Learn 3 Claude Code and Agentic AI courses. Interactive bootcamps designed to bootstrap small nonprofits and startups with cutting-edge agentic workflows, custom prompts, and practical tech skills.</p>
                    <ul className="info-features">
                      <li>Hands-on coding & automation building</li>
                      <li>Custom AI prompts & workflow libraries</li>
                      <li>Priority Eventbrite door fee discounts</li>
                      <li>Certificates of completion for teams</li>
                    </ul>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">🙌</div>
                  <div className="info-content">
                    <h4>Access Our Volunteer Network</h4>
                    <p>Ask for assistance from our ~500 IT, AI, data professionals. Connect directly with vetted young tech talent and senior tech mentors ready to solve your pressing software and data challenges.</p>
                    <ul className="info-features">
                      <li>Volunteers give Pro bono IT, data & software consulting</li>
                      <li>Dedicated 1-on-1 tech office hours</li>
                      <li>Matchmaking with career-ready talent</li>
                      <li>Code reviews & architecture scoping</li>
                    </ul>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">📊</div>
                  <div className="info-content">
                    <h4>Impact Unit</h4>
                    <p>Use Data Driven Impact Storytelling with Analytics for your Grants. Transform raw community metrics into compelling data stories, interactive dashboards, and grant-ready quantitative reports.</p>
                    <ul className="info-features">
                      <li>Custom grant analytics & dashboards</li>
                      <li>Key KPI & outcome tracking frameworks</li>
                      <li>Compelling donor data storytelling</li>
                      <li>Ready-to-use grant reporting templates</li>
                    </ul>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">🤖</div>
                  <div className="info-content">
                    <h4>Free Access to our Suite of AI tools</h4>
                    <p>Use our in-house built nonprofit tech AI tools for your operations. Streamline charity operations, donor outreach, and administration with specialized AI tools engineered specifically for NGOs.</p>
                    <ul className="info-features">
                      <li>AI-powered grant writing assistants</li>
                      <li>Automated donor updates & reporting</li>
                      <li>Privacy-focused NGO data handling</li>
                      <li>Continuous platform updates & support</li>
                    </ul>
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