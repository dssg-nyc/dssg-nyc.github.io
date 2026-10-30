import './Home.css';
import heroData from '../data/heroimages.json';
import SectionLink from './SectionLink';

const PROOF_POINTS = [
  { value: '450+', label: 'trained volunteers' },
  { value: '8+', label: 'nonprofit partners' },
  { value: '$40k+', label: 'pro bono value delivered' },
];

const CYCLING_PHRASES = ['built with you.', 'for your community.', 'with safety and privacy.'];

const Home = () => {
  const hero = heroData.find((h) => h.name === 'home');

  return (
    <section className="home-hero" id="home">
      <div className="home-hero-inner">
        <div className="home-hero-copy">
          <p className="eyebrow">NYC Data Science for Social Good (DSSG) is a civic tech volunteering group in NYC</p>
          <h1 className="home-hero-title">
            Human-centered apps that amplify your mission,{' '}
            <span className="sr-only">{CYCLING_PHRASES[0]}</span>
            <span className="home-hero-accent home-hero-cycle" aria-hidden="true">
              {CYCLING_PHRASES.map((phrase) => (
                <span key={phrase}>{phrase}</span>
              ))}
            </span>
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
          <a className="home-hero-tag" href="https://www.datadiplomats.org">
            <span className="home-hero-tag-label">Volunteering?</span>
            <span className="home-hero-tag-text">Meet the Data Diplomats Program →</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
