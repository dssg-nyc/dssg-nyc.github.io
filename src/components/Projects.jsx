import './Projects.css';
import useInViewReveal from './carousel/useInViewReveal';
import StatCounter from './StatCounter';
import diplomatsData from '../data/diplomats.json';
import siteProperties from '../data/siteproperties.json';
import { Link } from 'react-router-dom';
import SectionLink from './SectionLink';

const ADVICE_FORM_URL = siteProperties.adviceFormUrl;
const VOLUNTEER_FORM_URL = siteProperties.volunteerFormUrl;

const STATS = [
  { value: '450+', label: 'Registered volunteers' },
  { value: '8+', label: 'Partner organizations' },
  { value: '8+', label: 'Projects completed' },
  { value: '$40k+', label: 'Pro bono value delivered' },
];

const STEPS = [
  {
    title: 'Tell us what’s hard',
    body: 'A short form or a call. We start from the problem your team lives with, not a tool we want to sell.',
  },
  {
    title: 'Meet your diplomats',
    body: 'We match you with trained volunteers who’ve studied organizing as well as data and AI.',
  },
  {
    title: 'Build it together',
    body: 'We build alongside your staff, measure what changed, and hand off something your team can run.',
  },
];

const icon = (paths) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    {paths}
  </svg>
);

const SERVICES = [
  {
    title: 'Data dashboards',
    body: 'Grant-ready reporting your funders and board can read.',
    icon: icon(
      <path d="M4 20V13M10 20V9M16 20V5M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Responsible AI',
    body: 'Agents and automation scoped to your data, policies, and people.',
    icon: icon(
      <path d="M12 3L13.8 9.2L20 11L13.8 12.8L12 19L10.2 12.8L4 11L10.2 9.2L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Websites & tools',
    body: 'Modernized sites, intake forms, and internal tools.',
    icon: icon(
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 8H21M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Databases & pipelines',
    body: 'Clean up scattered spreadsheets into one source of truth.',
    icon: icon(
      <>
        <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="2" />
        <path d="M5 6V18C5 19.66 8.13 21 12 21C15.87 21 19 19.66 19 18V6M5 12C5 13.66 8.13 15 12 15C15.87 15 19 13.66 19 12" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
  {
    title: 'Impact research',
    body: 'Causal analysis that shows what your programs actually change.',
    icon: icon(
      <>
        <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M20 20L15.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Staff training',
    body: 'Hands-on AI workshops so your team keeps the skills.',
    icon: icon(
      <>
        <path d="M12 3L2 8L12 13L22 8L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M6 10.5V15.5C6 15.5 8.5 17.5 12 17.5C15.5 17.5 18 15.5 18 15.5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
];

const BAND_PORTRAITS = diplomatsData.cohorts.flatMap((cohort) => cohort.members).slice(0, 5);

const Projects = () => {
  const [statsRef, areStatsRevealed] = useInViewReveal();

  return (
    <section className="np-section" id="projects">
      <div className="np-wrap">
        <div className="np-head">
          <div>
            <p className="eyebrow">For nonprofits</p>
            <h2 className="display-heading np-title">
              Free technology support, <span className="marker-highlight">built around your mission</span>
            </h2>
          </div>
          <p className="np-head-sub">
            Small teams carry big missions with almost no technical help. We close that gap with
            pro bono data, AI, and IT work — at no cost to your organization.
          </p>
        </div>

        <ol className="np-steps">
          {STEPS.map((step, index) => (
            <li key={step.title} className="np-step paper-card">
              <span className="np-step-number">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="np-step-title">{step.title}</h3>
              <p className="np-step-body">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="np-services">
          <h3 className="np-services-title">What we can help with</h3>
          <div className="np-services-grid">
            {SERVICES.map((service) => (
              <div key={service.title} className="np-service">
                <span className="np-service-icon">{service.icon}</span>
                <span className="np-service-text">
                  <span className="np-service-title">{service.title}</span>
                  <span className="np-service-body">{service.body}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="np-ctas">
            <SectionLink className="button accent" section="book">
              Book a free call
            </SectionLink>
            <a className="button quiet" href={ADVICE_FORM_URL} target="_blank" rel="noopener noreferrer">
              Request advice
            </a>
          </div>
        </div>

        <div className="np-stats" ref={statsRef}>
          {STATS.map((stat) => (
            <div className="np-stat" key={stat.label}>
              <span className="np-stat-number">
                <StatCounter value={stat.value} isActive={areStatsRevealed} />
              </span>
              <span className="np-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Volunteers who land here get pointed at the program page. */}
        <div className="np-volunteer">
          <div className="np-volunteer-copy">
            <p className="eyebrow on-dark">For volunteers</p>
            <h3 className="np-volunteer-title">Want to be on the other side of the table?</h3>
            <p className="np-volunteer-body">
              Join our volunteer network to take on pro bono projects as your schedule allows, or apply to
              the Data Diplomats Program for leadership and human-centered AI training.
            </p>
            <div className="np-volunteer-ctas">
              <a className="button accent" href={VOLUNTEER_FORM_URL} target="_blank" rel="noopener noreferrer">
                Volunteer with us
              </a>
              <Link className="np-volunteer-link" to="/diplomats">
                Explore the Data Diplomats Program →
              </Link>
            </div>
          </div>
          <div className="np-volunteer-faces" aria-hidden="true">
            {BAND_PORTRAITS.map((member) => (
              <span key={member.name} className={`duotone duotone-${member.tint}`}>
                <img
                  src={member.image}
                  alt=""
                  loading="lazy"
                  style={member.photoZoom ? { transform: `scale(${member.photoZoom})` } : undefined}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
