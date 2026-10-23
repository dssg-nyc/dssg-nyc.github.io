import './Writing.css';

const STORIES = [
  {
    category: 'Public health equity',
    tint: 'green',
    title: 'NYC NourishAI Hackathon: AI built for health and food equity',
    image: '/images/nourishAI.png',
    value: '$15,000',
    valueLabel: 'in social and technical value',
    quote:
      'Together, we mobilized more than 168 hours of collective service, representing an estimated $15,000 in social and technical value dedicated to advancing community-driven innovation.',
    attribution: 'Sergio, Director of G.I.V.E. Inc.',
    url: 'https://medium.com/@dssgnyc/nyc-nourishai-hackathon-a-day-of-data-science-ai-built-for-health-and-food-equity-4ff226e2dad9',
  },
  {
    category: 'Transportation safety',
    tint: 'orange',
    title: 'NYC Transportation Safety Hackathon: Stop Super Speeders',
    image: '/images/superspeeder.jpg',
    value: '$19,000',
    valueLabel: 'in pro bono software',
    summary:
      'A Stop-Super-Speeder dashboard for Families for Safe Streets and Transportation Alternatives, built by data scientists, engineers, and community advocates to help prevent speeding-related crashes in NYC.',
    url: 'https://medium.com/@dssgnyc/nyc-transportation-safety-hackathon-stop-super-speeders-d474cff6e4e4',
  },
];

const PARTNERS = [
  { src: '/images/social/FSS.png', alt: 'Families for Safe Streets' },
  { src: '/images/social/TA.png', alt: 'Transportation Alternatives' },
  { src: '/images/social/BetaNYC.png', alt: 'BetaNYC' },
  { src: '/images/social/give.png', alt: 'G.I.V.E. Inc.' },
];

const Writing = () => {
  return (
    <section className="stories-section" id="writing">
      <div className="stories-wrap">
        <div className="stories-head">
          <p className="eyebrow">Impact stories</p>
          <h2 className="display-heading">What we’ve built with our partners</h2>
          <p className="stories-sub">
            Every project starts with a community organization and a problem they already know well.
          </p>
        </div>

        <div className="stories-grid">
          {STORIES.map((story) => (
            <article key={story.title} className={`story paper-card accent-${story.tint}`}>
              <div className="story-image">
                <img src={story.image} alt="" loading="lazy" />
              </div>
              <div className="story-body">
                <span className={`story-category tint-${story.tint}`}>{story.category}</span>
                <h3 className="story-title">{story.title}</h3>
                {story.quote ? (
                  <blockquote className="story-quote">
                    <p>“{story.quote}”</p>
                    <cite>— {story.attribution}</cite>
                  </blockquote>
                ) : (
                  <p className="story-summary">{story.summary}</p>
                )}
                <div className="story-footer">
                  <span className="story-value">
                    <strong>{story.value}</strong> {story.valueLabel}
                  </span>
                  <a className="story-link" href={story.url} target="_blank" rel="noopener noreferrer">
                    Read the full story →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="stories-partners">
          <h3 className="stories-partners-title">Organizations we’ve built with</h3>
          <div className="stories-partners-logos">
            {PARTNERS.map((partner) => (
              <img key={partner.alt} src={partner.src} alt={partner.alt} loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Writing;
