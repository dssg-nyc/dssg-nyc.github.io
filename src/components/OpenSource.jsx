import './OpenSource.css';
import heroData from '../data/heroimages.json';
import opensourceData from '../data/opensource.json';

const OpenSource = () => {
  const hero = heroData.find(h => h.name === 'open-source');

  return (
    <section className={hero?.src ? hero?.shade : hero?.shade === "dark" ? "black" : "white"} id="open-source">
      {hero?.src && (
        <img className="background" src={hero.src} alt={hero.alt} />
      )}
      <div>
        <div className="open-source-header">
          <h1>Civic Tech Open Source</h1>
          <p>
            Open source projects advancing civic engagement, government transparency,
            and social good through technology.
          </p>
        </div>
        <div className="open-source-grid">
          {opensourceData.map((project, index) => (
            <div key={index} className="os-card">
              <div className="os-card-title">
                <h3>{project.title}</h3>
              </div>
              <div className="os-card-body">
                <p>{project.description}</p>
                {project.tags && (
                  <div className="os-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="os-tag">{tag}</span>
                    ))}
                  </div>
                )}
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="button">
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
