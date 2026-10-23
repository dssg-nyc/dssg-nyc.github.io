import './Events.css';
import Seo from './Seo';
import PageIntro from './PageIntro';
import SectionLink from './SectionLink';

const LUMA_EMBED_URL = 'https://luma.com/embed/calendar/cal-4VqcQEpR4zqBF8Q/events';
const LUMA_CALENDAR_URL = 'https://luma.com/calendar/cal-4VqcQEpR4zqBF8Q';

const EXPECTATIONS = [
  'Meet nonprofit leaders, organizers, and technologists',
  'Hands-on workshops and short talks',
  'Hackathons built around a real partner’s problem',
  'Guest speakers from community organizations',
  'Light refreshments — come as you are',
];

const Events = () => {
  return (
    <div className="events-page">
      <Seo
        title="Events - DSSG NYC"
        description="Join our upcoming Data Science for Social Good events in New York City. Connect with like-minded professionals and make a difference through technology."
        type="website"
        name="DSSG NYC Events"
      />

      <PageIntro eyebrow="Events" title={<>Come build <em>with us.</em></>}>
        Happy hours, workshops, and hackathons where nonprofits and volunteers meet in person.
        Everyone is welcome — no technical background needed.
      </PageIntro>

      <section className="events-body">
        <div className="events-layout">
          <div className="events-calendar paper-card">
            <iframe
              src={LUMA_EMBED_URL}
              className="luma-embed"
              frameBorder="0"
              allowFullScreen
              title="DSSG NYC Events Calendar"
            />
          </div>

          <aside className="events-aside">
            <div className="events-aside-card paper-card accent-orange">
              <h2 className="events-aside-title">What to expect</h2>
              <ul className="events-list">
                {EXPECTATIONS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                href={LUMA_CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button accent events-cta"
              >
                Subscribe on Luma
              </a>
            </div>

            <div className="events-aside-card events-aside-dark">
              <p className="eyebrow on-dark">Host with us</p>
              <p className="events-aside-lead">Run a nonprofit and want a hackathon built around your problem?</p>
              <SectionLink className="events-aside-link" section="book">
                Book a call with our team →
              </SectionLink>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Events;
