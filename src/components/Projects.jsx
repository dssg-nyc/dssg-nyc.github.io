import './Projects.css';

const Projects = () => {
  return (
    <section className="projects-section white" id="projects">
      <div className="container">
        <div className="projects-header">
          <h2 className="section-title">Get Involved with DSSG NYC</h2>
          <p className="section-subtitle">
            Join our community of professionals making a difference through technology and data science
          </p>
        </div>
        
        <div className="involvement-grid">
          {/* Data & IT Professionals Section */}
          <div className="involvement-card professionals-card">
            <div className="card-header">
              <div className="card-icon professionals-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7H4C2.9 7 2 7.9 2 9V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V9C22 7.9 21.1 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 11H8M10 15H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="17" cy="13" r="1" fill="currentColor"/>
                  <path d="M22 9L12 2L2 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Data & IT Professionals</h3>
              <p className="card-tagline">Use your skills for social good</p>
            </div>
            
            <div className="card-content">
              <p className="card-description">
                Join our network of skilled technologists volunteering their expertise to help non-profit 
                organizations solve complex challenges through data science, web development, and IT solutions.
              </p>
              
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">✨</div>
                  <span>Make meaningful social impact</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🚀</div>
                  <span>Build diverse portfolio projects</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🤝</div>
                  <span>Network with like-minded professionals</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📈</div>
                  <span>Develop new skills & expertise</span>
                </div>
              </div>
              
              <div className="skills-tags">
                <span className="skill-tag">Data Science</span>
                <span className="skill-tag">Machine Learning</span>
                <span className="skill-tag">Web Development</span>
                <span className="skill-tag">Database Design</span>
                <span className="skill-tag">Cloud Architecture</span>
                <span className="skill-tag">Data Visualization</span>
              </div>
            </div>
            
            <div className="card-footer">
              <a href="https://forms.gle/your-volunteer-form" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="button">
                Join as Volunteer
              </a>
            </div>
          </div>
          
          {/* Visual Separator */}
          <div className="section-divider">
            <div className="divider-line"></div>
            <div className="divider-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8L21 12L17 16M7 16L3 12L7 8M14 4L10 20" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="divider-line"></div>
          </div>
          
          {/* Non Profit Organizations Section */}
          <div className="involvement-card nonprofits-card">
            <div className="card-header">
              <div className="card-icon nonprofits-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M12 16C16.4183 16 20 19.5817 20 24H4C4 19.5817 7.58172 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>For Non-Profit Organizations</h3>
              <p className="card-tagline">Leverage technology for greater impact</p>
            </div>
            
            <div className="card-content">
              <p className="card-description">
                Partner with our expert volunteers to unlock the power of data and technology for your mission. 
                Get professional-grade solutions tailored to your organization's unique needs and budget.
              </p>
              
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">💡</div>
                  <span>Expert pro bono consulting</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📊</div>
                  <span>Data-driven decision making</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🎯</div>
                  <span>Customized solutions</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">⚡</div>
                  <span>Operational efficiency gains</span>
                </div>
              </div>
              
              <div className="services-list">
                <div className="service-category">
                  <h4>Services We Offer:</h4>
                  <ul>
                    <li>Program impact measurement & analysis</li>
                    <li>Donor database optimization</li>
                    <li>Website development & modernization</li>
                    <li>Data visualization dashboards</li>
                    <li>Process automation solutions</li>
                    <li>Grant application data support</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="card-footer">
              <a href="https://forms.gle/your-nonprofit-form" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="button secondary">
                Request Partnership
              </a>
            </div>
          </div>
        </div>
        
        <div className="projects-bottom">
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Active Volunteers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Partner Organizations</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">$2M+</div>
              <div className="stat-label">Pro Bono Value Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;