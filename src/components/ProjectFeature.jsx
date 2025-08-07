import './ProjectFeature.css';

const ProjectFeature = () => {
  return (
    <section className="feature-section" id="project-feature">
      <div className="container">
        <div className="feature-content">
          <div className="feature-text">
            <h2 className="feature-title">Our Approach to Social Impact</h2>
            <div className="feature-description">
              <p className="lead">
                We believe that technology should serve humanity. Our approach combines cutting-edge data science 
                with deep understanding of non-profit challenges to create solutions that truly make a difference.
              </p>
              <p>
                Every partnership begins with listening. We take time to understand your mission, your challenges, 
                and your goals. Then we apply our collective expertise in data science, machine learning, and 
                software development to create tailored solutions that amplify your impact.
              </p>
            </div>
            
            <div className="approach-steps">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Discovery & Assessment</h4>
                  <p>We start by understanding your organization's unique needs and current data landscape.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Solution Design</h4>
                  <p>Our team designs a customized approach that aligns with your goals and resources.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Implementation & Support</h4>
                  <p>We build, test, and deploy solutions with ongoing support and training for your team.</p>
                </div>
              </div>
            </div>
            
            <div className="feature-cta">
              <a href="#book" className="button">
                Start Your Project
              </a>
              <a href="#writing" className="button secondary">
                View Success Stories
              </a>
            </div>
          </div>
          
          <div className="feature-visual">
            <div className="visual-container">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" 
                alt="DSSG NYC team collaborating on social impact projects"
                className="feature-image"
              />
              <div className="visual-overlay">
                <div className="overlay-stats">
                  <div className="overlay-stat">
                    <span className="stat-number">85%</span>
                    <span className="stat-label">Partner Satisfaction</span>
                  </div>
                  <div className="overlay-stat">
                    <span className="stat-number">3x</span>
                    <span className="stat-label">Average Impact Increase</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectFeature;
