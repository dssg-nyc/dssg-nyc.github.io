import './Portfolio.css';
import Seo from './Seo';
import PageIntro from './PageIntro';
import ImpactCarousel from './carousel/ImpactCarousel';
import stories from '../data/impactstories.json';
import SectionLink from './SectionLink';

const TINTS = ['blue', 'orange', 'green'];

const Portfolio = () => (
  <div className="portfolio-page">
    <Seo
      title="Our Work - NYC x DSSG"
      description="Open source civic tech built by NYC x DSSG volunteers — FOIA Fluent, Unredacted Monitor, GrantPilot AI, the NYC Land Use & ZAP Tracker, and The City Ledger."
      type="website"
      name="Our Work"
    />

    <PageIntro eyebrow="Our work" title={<>Open-source civic tech, <em>free to use.</em></>}>
      Tools our volunteers have built for nonprofits, reporters, and residents — each one aimed at
      making a public system easier to see, use, or fund.
    </PageIntro>

    <ImpactCarousel />

    <section className="portfolio-list" aria-labelledby="portfolio-list-title">
      <div className="portfolio-wrap">
        <div className="portfolio-list-head">
          <p className="eyebrow">Every project</p>
          <h2 className="display-heading" id="portfolio-list-title">What each tool does</h2>
        </div>

        <div className="portfolio-grid">
          {stories.map((story, index) => (
            <article key={story.id} className={`portfolio-card paper-card accent-${TINTS[index % 3]}`}>
              <a
                className="portfolio-shot"
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img src={`/${story.image}`} alt="" loading="lazy" />
              </a>
              <div className="portfolio-body">
                <span className={`portfolio-kicker tint-${TINTS[index % 3]}`}>{story.kicker}</span>
                <h3 className="portfolio-title">{story.title}</h3>
                <p className="portfolio-impact">{story.impact}</p>
                <ul className="portfolio-stats">
                  {story.stats.map((stat) => (
                    <li key={stat}>{stat}</li>
                  ))}
                </ul>
                <a className="portfolio-link" href={story.url} target="_blank" rel="noopener noreferrer">
                  Visit {story.displayUrl} →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="portfolio-cta">
          <div>
            <h2 className="portfolio-cta-title">Need something like this for your organization?</h2>
            <p className="portfolio-cta-body">Tell us what’s hard. Our volunteers build it with you, pro bono.</p>
          </div>
          <SectionLink className="button accent" section="book">
            Book a free call
          </SectionLink>
        </div>
      </div>
    </section>
  </div>
);

export default Portfolio;
