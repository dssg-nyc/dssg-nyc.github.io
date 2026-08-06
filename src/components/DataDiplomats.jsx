import { lazy, Suspense, useState } from 'react';
import './DataDiplomats.css';
import diplomatsData from '../data/diplomats.json';
import Seo from './Seo';

const Experience = lazy(() => import('./experience/Experience'));

// Hero copy + CTAs for the scroll-driven 3D narrative (and its static fallback).
const HERO_TITLE = 'Data Science for Social Good';
const HERO_DESCRIPTION =
  'Meet the Data Diplomats — trained volunteers turning idle tech talent into pro bono impact for NYC nonprofits.';
const CTA_PRIMARY = { label: 'Become a Data Diplomat', href: diplomatsData.applyUrl };
const CTA_SECONDARY = {
  label: 'Get Advice',
  href: 'https://docs.google.com/forms/d/e/1FAIpQLScxK78KmTbbF2LnqqVvniWg21DrrU2B8WkvS6euTILKkR18bw/viewform?usp=header',
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const webglSupported = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

// Shown for reduced-motion / no-WebGL visitors and while the 3D chunk loads.
// Same story beat + CTAs as the narrative's final "Solution" state, no motion.
const StaticHero = () => (
  <section className="dd-hero" id="diplomats-hero">
    <div className="dd-hero-content container">
      <p className="dd-hero-eyebrow">The solution</p>
      <h1 className="dd-hero-title">The Data Diplomats</h1>
      <p className="dd-hero-description">{HERO_DESCRIPTION}</p>
      <div className="dd-hero-cta-row">
        <a className="button" href={CTA_PRIMARY.href} target="_blank" rel="noopener noreferrer">
          {CTA_PRIMARY.label}
        </a>
        <a className="button secondary" href={CTA_SECONDARY.href} target="_blank" rel="noopener noreferrer">
          {CTA_SECONDARY.label}
        </a>
      </div>
    </div>
  </section>
);

const DiplomatsHero = () => {
  // Decide once on the client (SPA, no SSR): scroll-driven 3D or static fallback.
  const [useCanvas] = useState(() => !prefersReducedMotion() && webglSupported());

  if (!useCanvas) {
    return <StaticHero />;
  }

  return (
    <Suspense fallback={<StaticHero />}>
      <Experience
        title={HERO_TITLE}
        description={HERO_DESCRIPTION}
        primaryCta={CTA_PRIMARY}
        secondaryCta={CTA_SECONDARY}
      />
    </Suspense>
  );
};

const DataDiplomats = () => {
  return (
    <>
      <Seo
        title="Our Data Diplomats - Data Diplomats for Nonprofits"
        description="Meet our cohorts of Data Diplomats — trained volunteers partnering with nonprofits on data science, AI, and technology projects through DSSG NYC."
        type="website"
        name="Data Diplomats for Nonprofits"
      />

      <DiplomatsHero />

      <section className="diplomats-section" id="diplomats">
        <div className="container">
          <div className="diplomats-header">
            <h2 className="diplomats-title">{diplomatsData.sectionTitle}</h2>
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
