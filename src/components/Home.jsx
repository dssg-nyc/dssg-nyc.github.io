import './Home.css';
import heroData from '../data/heroimages.json';

const PROOF_POINTS = [
  { value: '260+', label: 'trained volunteers' },
  { value: '8+', label: 'nonprofit partners' },
  { value: '$40k+', label: 'pro bono value delivered' },
];

const Home = () => {
  const hero = heroData.find((h) => h.name === 'home');

  return (
    <section className="home-hero" id="home">
      <div className="home-hero-inner">
        <div className="home-hero-copy">
          <p className="eyebrow">A nonprofit organization in New York City</p>
          <h1 className="home-hero-title">
            Technology that serves your mission,{' '}
            <span className="home-hero-accent">built with you.</span>
          </h1>
          <p className="home-hero-sub">
            We pair nonprofits with trained volunteers for free data, AI, and IT support — grounded in
            community organizing, so the tools fit the people you serve.
          </p>
          <div className="home-hero-ctas">
            <a className="button accent" href="/#book">
              Get pro bono support
            </a>
            <a className="button quiet" href="/#writing">
              See our impact
            </a>
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
          <a className="home-hero-tag" href="/#/diplomats">
            <span className="home-hero-tag-label">Volunteering?</span>
            <span className="home-hero-tag-text">Meet the Data Diplomats Program →</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
