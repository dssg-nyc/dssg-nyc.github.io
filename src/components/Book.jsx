import { useState, useEffect, useRef } from "react";
import { InlineWidget } from "react-calendly";
import "./Book.css";
import siteProperties from "../data/siteproperties.json";

const benefits = [
  {
    title: "Hands on AI Workshops",
    description: "We run hands-on Claude Code and agentic AI bootcamps that build your nonprofit team's automation skills, with member discounts and completion certificates included.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L2 8L12 13L22 8L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 10.5V15.5C6 15.5 8.5 17.5 12 17.5C15.5 17.5 18 15.5 18 15.5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 8V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    title: "Access Our Volunteer Network",
    description: "Tap our network of roughly 500 vetted IT, AI, and data professionals for pro bono consulting, dedicated office hours, and hands-on project support.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="18" r="2.5" stroke="currentColor" strokeWidth="2"/>
        <path d="M8.3 7.2L10.4 15.8M15.7 7.2L13.6 15.8M8.5 6H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    title: "Impact Unit",
    description: "Our Impact Unit turns your program data into grant-ready dashboards and compelling donor stories, backed by dedicated analytics support.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 20V13M10 20V9M16 20V5M20 20V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    title: "Free Access to our Suite of AI tools",
    description: "Get free, privacy-focused access to our in-house AI tools, built to streamline grant writing, donor outreach, and day-to-day nonprofit operations.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L13.8 9.2L20 11L13.8 12.8L12 19L10.2 12.8L4 11L10.2 9.2L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M19 3.5L19.5 5.2L21.2 5.7L19.5 6.2L19 7.9L18.5 6.2L16.8 5.7L18.5 5.2L19 3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    )
  }
];

const Book = () => {
  const infoRef = useRef(null);
  const [height, setHeight] = useState('700px');
  const calendlyUrl = siteProperties.calendlyUrl;

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth >= 1024 && infoRef.current) {
        setHeight(`${infoRef.current.offsetHeight}px`);
      } else {
        setHeight('900px');
      }
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    if (infoRef.current) observer.observe(infoRef.current);
    window.addEventListener('resize', updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
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
            <div className="partnership-info" ref={infoRef}>
              <h3>Become a Member</h3>
              <div className="info-list">
                {benefits.map((benefit) => (
                  <div className="info-item" key={benefit.title}>
                    <div className="info-icon">{benefit.icon}</div>
                    <div className="info-content">
                      <h4>{benefit.title}</h4>
                      <p>{benefit.description}</p>
                    </div>
                  </div>
                ))}
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
                    width: '100%',
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
