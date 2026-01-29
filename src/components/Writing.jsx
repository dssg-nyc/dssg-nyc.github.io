import { useState } from 'react';
import Card from './Card';
import './Writing.css';
import heroData from '../data/heroimages.json';

const Writing = () => {
  const hero = heroData.find(h => h.name === 'writing');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Updated writing data specific to NYC
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
          <h2 className="section-title">Our Impact Stories</h2>
          <p className="section-subtitle">
            Discover the real-world impact we're creating together and access resources 
            to help your organization or volunteer journey
          </p>
        </div>
        
        {/* Medium Articles Row - Side by side */}
        <div className="medium-articles-row">
          {/* Public Health Equity - Left */}
          <div className="medium-article-section">
            <div className="medium-article-card" style={{backgroundImage: "url('/images/nourishAI.png')"}}>
              <div className="medium-article-overlay"></div>
              <div className="medium-article-content">
                <h3>Public Health Equity</h3>
                <h4>NYC NourishAI Hackathon: AI Built for Health and Food Equity</h4>
                <p className="article-excerpt">
                  "On behalf of G.I.V.E. Inc., we extend our deepest thanks to DSSG × NYC for partnering with us on our first civic-tech hackathon. Together, we mobilized more than 168 hours of collective service, representing an estimated $15,000 in social and technical value dedicated to advancing community-driven innovation." - Sergio, Director of GIVE Inc.</p>
                <a 
                  href="https://medium.com/@dssgnyc/nyc-nourishai-hackathon-a-day-of-data-science-ai-built-for-health-and-food-equity-4ff226e2dad9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="button medium-button"
                >
                  Read Full Story
                </a>
              </div>
            </div>
          </div>
          
          {/* Transportation Safety - Right */}
          <div className="medium-article-section">
            <div className="medium-article-card" style={{backgroundImage: "url('/images/superspeeder.jpg')"}}>
              <div className="medium-article-overlay"></div>
              <div className="medium-article-content">
                <h3>Transportation Safety</h3>
                <h4>NYC Transportation Safety Hackathon: Stop Super Speeders</h4>
                <p className="article-excerpt">
                  We built a Stop-Super-Speeder data dashboard for Families for Safe Streets & Transportation Alternatives to prevent speeding-related accidents in NYC. With a pro bono value of $19,000 delivered in software, we brought together data scientists, engineers, and community advocates to develop solutions that can save lives and make our streets safer for everyone.</p>
                <a 
                  href="https://medium.com/@dssgnyc/nyc-transportation-safety-hackathon-stop-super-speeders-d474cff6e4e4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="button medium-button"
                >
                  Read Full Story
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="writing-grid">
          {writingData
            .filter(writing => 
              writing.title !== "DSSG Berlin Chapter" && 
              writing.title !== "DSSG Portugal Chapter" && 
              writing.title !== "DSSG Florida Chapter"
            )
            .map((writing, index) => (
              <Card key={index} project={writing} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Writing;
