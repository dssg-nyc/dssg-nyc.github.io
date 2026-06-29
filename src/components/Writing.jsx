import './Writing.css';
import { openSegmentModal } from './SegmentModal';

const STORIES = [
  {
    kicker: 'Public Health & Food Equity',
    title: 'NYC NourishAI Hackathon',
    image: '/images/nourishAI.png',
    quote:
      '“On behalf of G.I.V.E. Inc., we extend our deepest thanks to DSSG × NYC for partnering with us on our first civic-tech hackathon. Together, we mobilized more than 168 hours of collective service, representing an estimated $15,000 in social and technical value.”',
    attribution: '— Sergio, Director of G.I.V.E. Inc.',
    url: 'https://medium.com/@dssgnyc/nyc-nourishai-hackathon-a-day-of-data-science-ai-built-for-health-and-food-equity-4ff226e2dad9',
  },
  {
    kicker: 'Transportation Safety',
    title: 'Stop Super Speeders',
    image: '/images/superspeeder.jpg',
    quote:
      'We built a Stop-Super-Speeder data dashboard for Families for Safe Streets & Transportation Alternatives to help prevent speeding-related crashes in NYC — $19,000 of pro bono software bringing data scientists, engineers, and advocates together to make our streets safer.',
    attribution: '— DSSG × NYC project team',
    url: 'https://medium.com/@dssgnyc/nyc-transportation-safety-hackathon-stop-super-speeders-d474cff6e4e4',
  },
];

const Writing = () => {
  return (
    <section className="impact" id="impact">
      <div className="container">
        <div className="impact-head reveal">
          <p className="eyebrow">Impact stories</p>
          <h2 className="section-title">What this work looks like, up close.</h2>
          <p className="section-subtitle">
            Behind every dashboard and model is a partner, a neighborhood, and a
            problem worth solving. Here are a couple of them.
          </p>
        </div>

        <div className="impact-stories">
          {STORIES.map((s, i) => (
            <article className="story reveal" key={s.title} style={{ '--reveal-delay': `${i * 80}ms` }}>
              <div className="story-media">
                <img src={s.image} alt={s.title} />
              </div>
              <div className="story-body">
                <span className="story-kicker">{s.kicker}</span>
                <h3 className="story-title">{s.title}</h3>
                <p className="story-quote">{s.quote}</p>
                <p className="story-attr">{s.attribution}</p>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="story-link">
                  Read the full story <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* ---- Newsletter band (segmented) ---- */}
        <div className="impact-news reveal">
          <div className="news-text">
            <h3 className="news-title">Get the next story in your inbox.</h3>
            <p>
              Hackathons, project recaps, and ways to help — a few times a season,
              tailored to whether you’re a volunteer, a nonprofit, or just curious.
            </p>
          </div>
          <button type="button" className="button" onClick={openSegmentModal}>
            Sign up &amp; register
          </button>
        </div>
      </div>
    </section>
  );
};

export default Writing;
