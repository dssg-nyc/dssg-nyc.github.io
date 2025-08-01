import './Projects.css';
import heroData from '../data/heroimages.json';

const Projects = () => {
  const hero = heroData.find(h => h.name === 'projects');

  return (
    <section className={hero.src ? hero.shade : hero.shade === "dark" ? "black" : "white"} id="projects">
      {hero && (
        <img className="background" src={hero.src} alt={hero.alt} />
      )}
      <div className="projects-container">
        <div className="projects-column">
          <h1>For Data Professionals</h1>
          <h2>
            Use your skills to give back<br />
            Develop new skills on meaningful projects<br />
            Meet other people doing good in the world
          </h2>
          <a href="https://example.com/volunteer" className="project-button">
            Volunteer
          </a>
        </div>
        <div className="projects-column">
          <h1>For Non Profit Organisations</h1>
          <h2>
            Learn how to use your data effectively<br />
            Find out how to use data science to your benefit<br />
            Realize a project with the support of our network
          </h2>
          <a href="https://example.com/pro-bono" className="project-button">
            Pro Bono Advice
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
