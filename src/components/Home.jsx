import './Home.css';
import Illustration from './Illustration';

const Home = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-inner container">
        <p className="eyebrow reveal">A civic-tech volunteer community in New York City</p>

        <h1 className="hero-title reveal" style={{ '--reveal-delay': '70ms' }}>
          Data science,<br />for the public good.
        </h1>

        <div className="hero-plate reveal" style={{ '--reveal-delay': '140ms' }}>
          <Illustration variant="hero" />
        </div>

        <p className="hero-lede lead reveal" style={{ '--reveal-delay': '210ms' }}>
          We are NYC grassroots organizers uniting data scientists, AI engineers,
          and IT professionals — led by the Data Diplomats for Nonprofits — to turn
          pro bono technical work into real social impact across the five boroughs.
        </p>

        <div className="hero-actions reveal" style={{ '--reveal-delay': '280ms' }}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf8bvJdbx70NBQwizsA2UKAUiZ5AILtc7bWUH0KxOT_ej6MJw/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            Sign up to volunteer
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScxK78KmTbbF2LnqqVvniWg21DrrU2B8WkvS6euTILKkR18bw/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="button secondary"
          >
            Partner with us
          </a>
        </div>

        <p className="hero-meta reveal" style={{ '--reveal-delay': '340ms' }}>
          260+ volunteers · 8+ partner nonprofits · $40k+ pro bono value delivered
        </p>
      </div>
    </section>
  );
};

export default Home;
