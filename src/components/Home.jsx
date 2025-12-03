import './Home.css';
import siteProperties from '../data/siteproperties.json';
import heroData from '../data/heroimages.json';

const Home = () => {
  const hero = heroData.find(h => h.name === 'home');

  if (Object.keys(siteProperties).length === 0 || Object.keys(hero).length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <section className="hero-section" id="home">
      {hero.src && (
        <img
          className="background"
          src={hero.src}
          alt={hero.alt}
        />
      )}
      <div className="hero-overlay" />
      <div className="hero-content container">
        <div className="hero-text">
          <h1 className="hero-title">
            {siteProperties.name}
          </h1>
          <p className="hero-subtitle lead">
            
          </p>
          <p className="hero-description">
            Data Science for Social Good (DSSG) is a global community of passionate data scientists, AI developers, and technology professionals dedicated to creating positive social impact through pro bono volunteer work.
          </p>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}

export default Home;
