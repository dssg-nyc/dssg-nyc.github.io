import React from 'react';
import './About.css';
import aboutData from '../data/aboutme.json';

const About = () => {
  return (
    <section className="about-section light" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <div className="about-text">
              <h2 className="about-title">About NYC DSSG</h2>
              <div className="about-description">
                <p className="lead">
                  We are a community of passionate data scientists, developers, and technology professionals 
                  dedicated to creating positive social impact through pro bono consulting and volunteer work.
                </p>
                <p>
                  Our mission is to bridge the gap between cutting-edge technology and social good by connecting 
                  skilled professionals with non-profit organizations that need data-driven solutions to amplify 
                  their impact.
                </p>
                <p>
                  Founded as part of the global Data Science for Social Good network, our NYC chapter has grown 
                  into a vibrant community of professionals who believe that technology should serve humanity 
                  and create meaningful change in our communities.
                </p>
              </div>
              
              <div className="values-grid">
                <div className="value-item">
                  <div className="value-icon">🎯</div>
                  <h4>Mission-Driven</h4>
                  <p>Every project we undertake directly supports organizations making a difference in our communities.</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🤝</div>
                  <h4>Collaborative</h4>
                  <p>We believe the best solutions come from diverse perspectives working together toward common goals.</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">⚡</div>
                  <h4>Impact-Focused</h4>
                  <p>We measure success not just in code deployed, but in lives improved and communities strengthened.</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🌱</div>
                  <h4>Growth-Oriented</h4>
                  <p>We're committed to continuous learning and helping both volunteers and partners grow their capabilities.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-visual">
            <div className="about-image-container">
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" 
                alt="NYC DSSG team collaborating on data science projects"
                className="about-image"
              />
              <div className="image-overlay">
                <div className="overlay-content">
                  <div className="stat-highlight">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Active Volunteers</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="tech-skills">
              <h4>Our Expertise</h4>
              <div className="skills-grid">
                {aboutData.icons.map((icon, index) => (
                  <div key={index} className="skill-item">
                    <img src={icon.src} alt={icon.alt} className="skill-icon" />
                    <span className="skill-name">{icon.alt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="team-section">
          <h3 className="team-title">Our Team</h3>
          <div className="team-grid">
            <div className="founder-card">
              <div className="founder-image-container">
                <img 
                  src="/images/jianhead.png" 
                  alt="Founder of NYC DSSG" 
                  className="founder-image"
                />
              </div>
              <div className="founder-info">
                <h4 className="founder-name">Jian</h4>
                <p className="founder-bio">
                  He is passionate advocate for using data science to drive social change. He previously did research in Comutational Social Sciences for Max-Planck Institute of Geoanthropology. He is interested in open-source intelligence tools and AI agentic systems.
                  With community organizing training and years of experience in the big data industry, he is dedicated to social good and civic tech.
                </p>
              </div>
            </div>

            <div className="founder-card">
              <div className="founder-image-container">
                <img 
                  src="/images/ursula_pic.png" 
                  alt="Ursula - Nonprofit Lead" 
                  className="founder-image"
                />
              </div>
              <div className="founder-info">
                <h4 className="founder-name">Ursula</h4>
                <p className="founder-bio">
                   Ursula is a Brooklyn-based data scientist focused on civic tech and leads DSSG NYC’s nonprofit engagement efforts. She concentrates her research on voter engagement, economic development, and public infrastructure and services. She began her career as a lawyer working on open data policy and spent three years working on civic projects in Tbilisi, Georgia. 
                </p>
              </div>
            </div>

            <div className="founder-card">
              <div className="founder-image-container">
                <img 
                  src="/images/carina_pic.png" 
                  alt="Carina Ye - Data Professional" 
                  className="founder-image"
                />
              </div>
              <div className="founder-info">
                <h4 className="founder-name">Carina</h4>
                <p className="founder-bio">
                  Carina is a data professional with a Master's in Data Science and a dual Bachelor's in Quantitative Economics and Fine Arts from Tufts University. In her free time, she volunteers with several nonprofits in the data and civic tech space and enjoys exploring NYC's museums, food, yoga studios, and the city's many spontaneous events. She's especially interested in the interdisciplinary intersections between data, art, and community.
                </p>
              </div>
            </div>
            
            <div className="founder-card">
              <div className="founder-image-container">
                <img 
                  src="/images/questionmark_face.jpg" 
                  alt="Join Our Team - Future Team Member" 
                  className="founder-image"
                />
              </div>
              <div className="founder-info">
                <h4 className="founder-name">Join Our Team!</h4>
                <p className="founder-bio">
                  We're looking for passionate Data-Diplomats to help grow NYC DSSG and expand our impact. 
                  If you're interested in joining our leadership team and helping shape the future of 
                  data science for social good in NYC, we'd love to hear from you!
                </p>
                <p className="callout-contact">
                  Contact us at: <a href="mailto:contact@dssg.nyc">dssgnyc@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
