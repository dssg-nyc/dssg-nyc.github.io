import './Home.css';
import heroData from '../data/heroimages.json';
import { Link } from 'react-router-dom';
import SectionLink from './SectionLink';

const PROOF_POINTS = [
  { value: '450+', label: 'trained volunteers' },
  { value: '8+', label: 'nonprofit partners' },
  { value: '$40k+', label: 'pro bono value delivered' },
];

const Home = () => {
  const hero = heroData.find((h) => h.name === 'home');

  return (
    <section className="home-hero" id="home">
      <div className="home-hero-inner">
        <div className="home-hero-copy">
          <p className="eyebrow">NYC Data Science for Social Good (DSSG) is a civic tech volunteering group in NYC</p>
          <h1 className="home-hero-title">
            Technology that serves your mission,{' '}
            <span className="home-hero-accent">built with you.</span>
          </h1>
          <p className="home-hero-sub">
            We pair nonprofits with trained volunteers for free data, AI, and IT support — grounded in
            community organizing, so the tools fit the people you serve.
          </p>
          <div className="home-hero-ctas">
            <SectionLink className="button accent" section="book">
              Get pro bono support
            </SectionLink>
            <SectionLink className="button quiet" section="writing">
              See our impact
            </SectionLink>
          </div>
          <dl className="home-proof">
            {PROOF_POINTS.map((point) => (
              <div key={point.label}>
                <dt>{point.value}</dt>
                <dd>{point.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="home-hero-media">
          {hero?.src && <img src={`/${hero.src}`} alt="Illustration of Central Park and the Manhattan skyline" />}
          <Link className="home-hero-tag" to="/diplomats">
            <span className="home-hero-tag-label">Volunteering?</span>
            <span className="home-hero-tag-text">Meet the Data Diplomats Program →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
