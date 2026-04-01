import React from 'react';
import './DataDiplomats.css';
import diplomatsData from '../data/diplomats.json';
import Seo from './Seo';

const DataDiplomats = () => {
  return (
    <>
      <Seo
        title="Our Data Diplomats - Data Diplomats for Nonprofits"
        description="Meet our cohorts of Data Diplomats — trained volunteers partnering with nonprofits on data science, AI, and technology projects through DSSG NYC."
        type="website"
        name="Data Diplomats for Nonprofits"
      />
      <section className="diplomats-section" id="diplomats">
        <div className="container">
          <div className="diplomats-header">
            <h1 className="diplomats-title">{diplomatsData.sectionTitle}</h1>
            <p className="diplomats-description">{diplomatsData.sectionDescription}</p>
            <div className="diplomats-entity-note">
              <div className="entity-badge">
                <span className="entity-icon">&#9878;</span>
                <span>501(c)(3) Nonprofit</span>
              </div>
              <p>{diplomatsData.entityNote}</p>
            </div>
          </div>

          {diplomatsData.cohorts.map((cohort) => (
            <div key={cohort.id} className="cohort-block">
              <div className="cohort-header">
                <h2 className="cohort-name">{cohort.name}</h2>
                <span className="cohort-term">{cohort.term}</span>
              </div>
              <p className="cohort-description">{cohort.description}</p>
              <div className="diplomats-grid">
                {cohort.members.map((member, index) => (
                  <div key={index} className="diplomat-card">
                    <div className="diplomat-image-container">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="diplomat-image"
                      />
                    </div>
                    <div className="diplomat-info">
                      <h3 className="diplomat-name">{member.name}</h3>
                      <span className="diplomat-role">{member.role}</span>
                      <p className="diplomat-bio">{member.bio}</p>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="diplomat-linkedin"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="diplomats-cta">
            <h3>Ready to Make a Difference?</h3>
            <p>Join our next cohort of Data Diplomats and use your skills for social good.</p>
            <a
              href={diplomatsData.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              Become a Data Diplomat
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default DataDiplomats;
