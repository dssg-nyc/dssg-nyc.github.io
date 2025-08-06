import Card from './Card';
import './Writing.css';
import heroData from '../data/heroimages.json';

const Writing = () => {
  const hero = heroData.find(h => h.name === 'writing');

  // Updated writing data specific to DSSG NYC
  const writingData = [
    {
      "title": "Impact Report 2024",
      "description": "Our annual report showcasing the measurable social impact created through data science partnerships with NYC non-profits",
      "buttonText": "Read Report",
      "url": "#"
    },
    {
      "title": "Case Study: Food Security Analytics",
      "description": "How we helped a local food bank optimize distribution routes and reduce waste by 35% using predictive analytics",
      "buttonText": "View Case Study",
      "url": "#"
    },
    {
      "title": "Volunteer Spotlight Series",
      "description": "Stories from our community of data professionals making a difference, featuring career insights and project highlights",
      "buttonText": "Read Stories",
      "url": "#"
    },
    {
      "title": "Data for Good Best Practices",
      "description": "A comprehensive guide for non-profits on how to leverage data science effectively while maintaining ethical standards",
      "buttonText": "Download Guide",
      "url": "#"
    }
  ];

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
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="email-input"
                />
                <button className="button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Writing;