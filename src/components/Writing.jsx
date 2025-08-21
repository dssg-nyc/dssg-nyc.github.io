import { useState } from 'react';
import Card from './Card';
import './Writing.css';
import heroData from '../data/heroimages.json';

const Writing = () => {
  const hero = heroData.find(h => h.name === 'writing');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Updated writing data specific to DSSG NYC
  const writingData = [
    {
      "title": "DSSG Berlin Chapter",
      "description": "Our annual report showcasing the measurable social impact created through data science partnerships with Berlin non-profits",
      "buttonText": "See Chapter Events",
      "url": "https://dssg-berlin.org/en/"
    },
    {
      "title": "DSSG Portugal Chapter",
      "description": "How we helped a local food bank optimize distribution routes and reduce waste by 35% using predictive analytics in Portugal",
      "buttonText": "See Chapter Events",
      "url": "https://www.dssg.pt/en/home/"
    },
    {
      "title": "DSSG Florida Chapter",
      "description": "Stories from our community of data professionals making a difference, featuring career insights and project highlights in Florida",
      "buttonText": "See Chapter Events",
      "url": "https://dssg.unf.edu"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace with your Google Apps Script URL
      const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      setSubmitStatus({ type: 'success', message: 'Thank you for subscribing!' });
      setEmail('');
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Subscription failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="writing-section dark" id="writing">
      {hero?.src && (
        <img className="background" src={hero.src} alt={hero.alt} />
      )}
      <div className="writing-overlay" />
      <div className="container">
        <div className="writing-header">
          <h2 className="section-title">Impact Stories & Resources</h2>
          <p className="section-subtitle">
            Discover the real-world impact we're creating together and access resources 
            to help your organization or volunteer journey
          </p>
        </div>
        
        <div className="writing-grid">
          {writingData.map((writing, index) => (
            <Card key={index} project={writing} />
          ))}
        </div>
        
        <div className="newsletter-section">
          <div className="newsletter-card">
            <div className="newsletter-content">
              <h3>Stay Connected</h3>
              <p>Get updates on our latest projects, success stories, and volunteer opportunities delivered to your inbox</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
              <button 
                type="submit" 
                className="button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {submitStatus && (
              <div className={`submit-status ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Writing;
