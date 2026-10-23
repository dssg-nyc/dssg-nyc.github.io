import PropTypes from 'prop-types';
import './DataDiplomats.css';
import diplomatsData from '../data/diplomats.json';
import siteProperties from '../data/siteproperties.json';
import Seo from './Seo';
import { Link } from 'react-router-dom';
import SectionLink from './SectionLink';

const APPLY_URL = diplomatsData.applyUrl;
const VOLUNTEER_FORM_URL = siteProperties.volunteerFormUrl;
const COHORT_LABEL = 'Cohort 3 · Spring 2027';

// The headline cycles through these; the full list is also read out once to
// screen readers so nothing depends on the animation.
const CYCLING_PHRASES = [
  ['Leadership', 'training.'],
  ['Technology', 'workshops.'],
  ['Community', 'building.'],
  ['Solving real', 'problems.'],
];

const AT_A_GLANCE = [
  { label: 'Format', value: 'Hybrid', detail: 'In-person and remote sessions' },
  { label: 'Time', value: 'One session a week', detail: 'Plus up to 5 hours on your own' },
  { label: 'Structure', value: 'Workshops + capstone', detail: '4 leadership, 5 AI, then ~4 weeks to build' },
  { label: 'Open to', value: 'All career backgrounds', detail: 'No tech experience required' },
];

// Two rows that scroll in opposite directions. Each row is rendered twice so
// the -50% translate loops seamlessly.
const ROLES_ROW_ONE = [
  { label: 'Community organizers' },
  { label: 'Teachers', fill: 'orange' },
  { label: 'Nurses & care workers' },
  { label: 'Social workers', fill: 'blue' },
  { label: 'Tenant advocates' },
  { label: 'Students' },
  { label: 'Artists', fill: 'green' },
  { label: 'Librarians' },
];

const ROLES_ROW_TWO = [
  { label: 'Public-health workers' },
  { label: 'Case managers', fill: 'blue' },
  { label: 'Journalists' },
  { label: 'Career-changers' },
  { label: 'Engineers', fill: 'orange' },
  { label: 'Researchers' },
  { label: 'Parents', fill: 'green' },
  { label: 'Faith leaders' },
];

const PHASES = [
  {
    tint: 'blue',
    phase: 'Phase 1',
    meta: '4 weeks · required',
    title: 'Leadership & organizing',
    summary:
      'Grassroots community organizing, grounded in Dr. Marshall Ganz’s leadership framework. Find your personal mission and why you’re called to lead.',
    items: [
      { marker: 'Wk 1', title: 'Public narrative', detail: 'Your story of self, us, and now' },
      { marker: 'Wk 2', title: 'Relational leadership', detail: 'One-on-ones and relationship mapping' },
      { marker: 'Wk 3', title: 'Strategy & structure', detail: 'Plan a real event or campaign with a nonprofit partner' },
      { marker: 'Wk 4', title: 'Leadership capstone', detail: 'Present your growth strategy and draft mission' },
    ],
    note: {
      title: 'Why nonprofits?',
      body: 'They hold a community’s trust — and often its data. Partnering with them is how we reach the people the technology is for.',
    },
  },
  {
    tint: 'orange',
    phase: 'Phase 2',
    meta: '5 weeks',
    title: 'Human-centered AI',
    summary:
      'Learn by doing. Hands-on, discussion-driven sessions on how AI is built — and how to deploy it responsibly in the communities it affects.',
    items: [
      { marker: 'Wk 1', title: 'AI & ethics', detail: 'Society-wide impact, from water and power to jobs' },
      { marker: 'Wk 2', title: 'AI in practice', detail: 'A trauma-informed AI case study' },
      { marker: 'Wk 3', title: 'AI security', detail: 'Safety and security practices from the field' },
      { marker: 'Wk 4', title: 'Building with AI, part 1', detail: 'From classic machine learning to LLMs, plus a hands-on lab' },
      { marker: 'Wk 5', title: 'Building with AI, part 2', detail: 'A focused, collaborative build session' },
    ],
  },
  {
    tint: 'green',
    phase: 'Phase 3',
    meta: '~4 weeks',
    title: 'Social innovation capstone',
    summary:
      'Partner with a nonprofit or take on an internal project, and carry a solution from problem to measurable impact.',
    items: [
      { marker: '01', title: 'Build', detail: 'A human-centered solution, from backend tools to user-facing AI' },
      { marker: '02', title: 'Go to market', detail: 'Problem and solution interviews, plus a deployment plan' },
      { marker: '03', title: 'Measure impact', detail: 'Show the pain point moved: hours saved, strain reduced' },
    ],
    note: {
      title: 'Demo day',
      body: 'Present to guest reviewers, then celebrate with the community.',
    },
  },
];

const BEYOND = [
  {
    tint: 'blue',
    title: 'Learn from practitioners',
    body: 'Guest speakers ranging from nonprofit leaders and organizers to AI policy researchers and industry professionals.',
  },
  {
    tint: 'orange',
    title: 'Build community',
    body: 'Volunteer days, hackathons, and a way into the wider Data Science for Social Good community.',
  },
  {
    tint: 'green',
    title: 'Build with real tools',
    body: 'In-kind access to Claude and a datadiplomats.org email account for every diplomat.',
  },
];

const REQUIREMENTS = [
  {
    title: 'One session a week',
    body: 'In person or remote, plus up to 5 hours of work on your own. That’s the most we’ll ask.',
  },
  {
    title: 'All four leadership workshops',
    body: 'Required for every session in weeks 1–4 — they’re the prerequisite for the AI workshops.',
  },
  {
    title: 'A real desire to learn',
    body: 'About community organizing, new technology tools, and connecting with nonprofits and your own community.',
  },
  {
    title: 'Show up and take part',
    body: 'Come ready to participate in workshops, events, and lectures — not just listen.',
  },
];

const OUTCOMES = [
  {
    label: 'Climate',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle cx="24" cy="24" r="13" fill="none" stroke="var(--accent-green)" strokeWidth="3" />
        <path d="M24 11 L24 4 M24 44 L24 37 M11 24 L4 24 M44 24 L37 24" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Affordable housing',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M6 22 L24 8 L42 22 L42 42 L6 42 Z" fill="none" stroke="var(--accent-orange)" strokeWidth="3" strokeLinejoin="round" />
        <rect x="19" y="28" width="10" height="14" fill="none" stroke="var(--ink)" strokeWidth="3" />
      </svg>
    ),
  },
  {
    label: 'Safer streets',
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M8 40 L20 8 L28 8 L40 40" fill="none" stroke="var(--primary-blue)" strokeWidth="3" strokeLinejoin="round" />
        <path d="M24 12 L24 18 M24 24 L24 30 M24 36 L24 40" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

// Carried over from the original site's "Data & IT Professionals" card.
const VOLUNTEER_SKILLS = [
  'Applied data science',
  'Machine learning & AI agents',
  'Web development',
  'Database design',
  'Cloud architecture',
  'Data storytelling',
];

const KEY_DATES = [
  { label: 'Applications open', value: 'TBA' },
  { label: 'Applications close', value: 'TBA' },
  { label: 'In-person kickoff', value: 'TBA' },
  { label: 'Capstone showcase', value: 'TBA' },
];

// Same four faces and inks as the design's hero grid.
const HERO_PORTRAITS = [
  { name: 'Carina', tint: 'blue' },
  { name: 'Aarya', tint: 'orange' },
  { name: 'Ursula', tint: 'green' },
  { name: 'Mia', tint: 'blue' },
];

const allMembers = diplomatsData.cohorts.flatMap((cohort) => cohort.members);
const findMember = (name) => allMembers.find((member) => member.name === name);

const Duotone = ({ src, alt = '', tint, className = '', zoom, loading }) => (
  <span className={`duotone duotone-${tint} ${className}`}>
    <img
      src={src}
      alt={alt}
      loading={loading}
      style={zoom ? { transform: `scale(${zoom})` } : undefined}
    />
  </span>
);

const RoleChip = ({ role }) => (
  <span className={`dd-chip${role.fill ? ` dd-chip-${role.fill}` : ''}`}>{role.label}</span>
);

const DiplomatCard = ({ member }) => (
  <article className={`dd-diplomat paper-card accent-${member.tint}`}>
    <Duotone
      className="dd-diplomat-photo"
      src={member.image}
      tint={member.tint}
      zoom={member.photoZoom}
      loading="lazy"
    />
    <div className="dd-diplomat-body">
      <h3 className="dd-diplomat-name">{member.name}</h3>
      <p className="dd-diplomat-role">{member.role}</p>
      <p className="dd-diplomat-motivation">{member.motivation}</p>
    </div>
  </article>
);

// Rendered twice inside the track so the loop has no visible seam.
const Marquee = ({ direction, speed, children }) => (
  <div className="dd-marquee">
    <div className={`dd-marquee-track dd-marquee-${direction}`} style={{ animationDuration: speed }}>
      <div className="dd-marquee-group">{children}</div>
      <div className="dd-marquee-group" aria-hidden="true">{children}</div>
    </div>
  </div>
);

const tintType = PropTypes.oneOf(['blue', 'orange', 'green']);

Duotone.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  tint: tintType.isRequired,
  className: PropTypes.string,
  zoom: PropTypes.number,
  loading: PropTypes.oneOf(['lazy', 'eager']),
};

RoleChip.propTypes = {
  role: PropTypes.shape({
    label: PropTypes.string.isRequired,
    fill: tintType,
  }).isRequired,
};

DiplomatCard.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    motivation: PropTypes.string.isRequired,
    tint: tintType.isRequired,
    photoZoom: PropTypes.number,
  }).isRequired,
};

Marquee.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  speed: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const DataDiplomats = () => {
  return (
    <div className="dd-page">
      <Seo
        title="Data Diplomats Program - NYC x DSSG"
        description="A leadership and human-centered AI program for people who want to build something for their community — plus a flexible volunteer network. Open to all career backgrounds."
        type="website"
        name="Data Diplomats for Nonprofits"
      />

      {/* Breadcrumb + in-page nav, after the way Girls Who Code and Mozilla
          orient you inside a long program page. */}
      <div className="dd-subbar">
        <div className="dd-subbar-inner">
          <nav aria-label="Breadcrumb" className="dd-breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Data Diplomats Program</span>
          </nav>
          <nav aria-label="On this page" className="dd-jump">
            <SectionLink page="/diplomats" section="ways">Ways to volunteer</SectionLink>
            <SectionLink page="/diplomats" section="program">What you’ll learn</SectionLink>
            <SectionLink page="/diplomats" section="expectations">Requirements</SectionLink>
            <SectionLink page="/diplomats" section="cohort">The diplomats</SectionLink>
            <SectionLink page="/diplomats" section="apply">Apply</SectionLink>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="dd-section dd-hero">
        <div className="dd-wrap dd-hero-inner">
          <div className="dd-hero-copy">
            <p className="eyebrow">{COHORT_LABEL} · Applications open soon</p>
            <h1 className="dd-hero-title">
              <span className="dd-hero-title-fixed">
                Data Diplomats
                <br />
                Program
              </span>
              <span className="sr-only">
                Leadership training. Technology workshops. Community building. Solving real problems.
              </span>
              <span className="dd-cycle" aria-hidden="true">
                {CYCLING_PHRASES.map(([first, second]) => (
                  <span key={first}>
                    {first}
                    <br />
                    {second}
                  </span>
                ))}
              </span>
            </h1>
            <p className="dd-hero-sub">
              Leadership and human-centered AI workshops, then a capstone project — for people who
              want to build something for their community.
            </p>
            <div className="dd-cta-row">
              <a className="button accent" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
                Apply now
              </a>
              <SectionLink className="button quiet" page="/diplomats" section="program">
                What you’ll learn
              </SectionLink>
            </div>
            <p className="dd-hero-alt">
              Want something more flexible?{' '}
              <SectionLink page="/diplomats" section="ways">Join our volunteer network →</SectionLink>
            </p>
          </div>

          <div className="dd-hero-media">
            <div className="dd-portrait-grid">
              {HERO_PORTRAITS.map(({ name, tint }) => {
                const member = findMember(name);
                if (!member) return null;
                return (
                  <Duotone
                    key={name}
                    className="dd-portrait"
                    src={member.image}
                    alt={`${member.name}, Data Diplomat`}
                    tint={tint}
                    zoom={member.photoZoom}
                  />
                );
              })}
            </div>
            {/* Swap for a Cohort 3 group photo once there is one. */}
            <figure className="dd-group-photo">
              <Duotone
                className="dd-group-photo-image"
                src="/images/nourishAI.png"
                alt="DSSG NYC volunteers and diplomats together at the NourishAI hackathon"
                tint="blue"
              />
              <figcaption>The community at the NYC NourishAI Hackathon</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="dd-section dd-glance-section" aria-label="Program at a glance">
        <div className="dd-wrap">
          <div className="dd-glance">
            {AT_A_GLANCE.map((item) => (
              <div className="dd-glance-item" key={item.label}>
                <span className="dd-glance-label">{item.label}</span>
                <span className="dd-glance-value">{item.value}</span>
                <span className="dd-glance-detail">{item.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO WAYS TO VOLUNTEER — a program-chooser, after Girls Who Code's
          programs page: the structured cohort, or the flexible network. */}
      <section className="dd-section dd-ways" id="ways">
        <div className="dd-wrap">
          <p className="eyebrow">Get involved</p>
          <h2 className="display-heading dd-ways-title">Two ways to volunteer</h2>
          <div className="dd-ways-grid">
            <article className="dd-way paper-card accent-blue">
              <div className="dd-way-head">
                <span className="dd-way-tag tint-blue">Structured cohort</span>
                <span className="dd-way-meta">Weekly sessions + capstone</span>
              </div>
              <h3 className="dd-way-title">Data Diplomats Program</h3>
              <p className="dd-way-body">
                Train in community organizing and human-centered AI with a cohort, then build a capstone
                with a nonprofit partner. No tech background required.
              </p>
              <ul className="dd-way-points">
                <li>Leadership workshops grounded in Marshall Ganz’s framework</li>
                <li>Hands-on AI and data sessions with practitioners</li>
                <li>A capstone that ships to a real organization</li>
              </ul>
              <div className="dd-way-ctas">
                <a className="button accent" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
                  Apply for Cohort 3
                </a>
                <SectionLink className="dd-way-link" page="/diplomats" section="program">
                  See the curriculum ↓
                </SectionLink>
              </div>
            </article>

            <article className="dd-way paper-card accent-green">
              <div className="dd-way-head">
                <span className="dd-way-tag tint-green">Flexible</span>
                <span className="dd-way-meta">As your schedule allows</span>
              </div>
              <h3 className="dd-way-title">Volunteer network</h3>
              <p className="dd-way-body">
                Join 450+ data, AI, and IT professionals who take on pro bono projects, hackathons, and
                office hours with nonprofits — pick up work when you have the time.
              </p>
              <ul className="dd-way-skills" aria-label="Skills you can put to work">
                {VOLUNTEER_SKILLS.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <div className="dd-way-ctas">
                <a className="button ink" href={VOLUNTEER_FORM_URL} target="_blank" rel="noopener noreferrer">
                  Join as a volunteer
                </a>
                <Link className="dd-way-link" to="/events">
                  Meet us at an event →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="dd-section dd-why">
        <div className="dd-wrap dd-why-inner">
          <span className="dd-why-rule" aria-hidden="true" />
          <div className="dd-why-copy">
            <p className="eyebrow on-dark">Why this program exists</p>
            <p className="dd-why-lead">
              New technology gives nonprofits and communities real ways to solve their own problems —
              if it is built ethically, by people who understand those problems firsthand.
            </p>
            <p className="dd-why-body">
              That is why we built this program. Bringing technology into a community takes grassroots
              engagement, relationship building, and understanding the AI models and data tools well
              enough to know good practice from harmful practice.
            </p>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="dd-section dd-who" id="who">
        <div className="dd-wrap">
          <p className="eyebrow">Who it’s for</p>
          <h2 className="display-heading dd-who-title">
            Open to applicants from
            <br />
            all career backgrounds
          </h2>
        </div>

        <div className="dd-marquees">
          <Marquee direction="left" speed="46s">
            {ROLES_ROW_ONE.map((role) => (
              <RoleChip key={role.label} role={role} />
            ))}
          </Marquee>
          <Marquee direction="right" speed="52s">
            {ROLES_ROW_TWO.map((role) => (
              <RoleChip key={role.label} role={role} />
            ))}
          </Marquee>
        </div>

        <div className="dd-wrap dd-who-cards">
          <div className="dd-especially paper-card">
            <span className="dd-especially-label">And especially</span>
            <p className="dd-especially-text">
              People with lived experience and a real desire to solve a problem in their own community.
            </p>
          </div>
          <div className="dd-promise">
            <p className="dd-promise-top">Bring the problem you care about —</p>
            <p className="dd-promise-bottom">we’ll teach the tools.</p>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="dd-section dd-program" id="program">
        <div className="dd-wrap">
          <div className="dd-program-head">
            <div>
              <p className="eyebrow">What you’ll learn</p>
              <h2 className="display-heading">
                From your story
                <br />
                to a working solution
              </h2>
            </div>
            <p className="dd-program-note">
              Readings happen on your own before each session. Time together is for guest speakers,
              discussion, and hands-on practice.
            </p>
          </div>

          <div className="dd-kickoff">
            <span className="dd-kickoff-label">Kickoff</span>
            <span className="dd-kickoff-title">In-person welcome &amp; meet-and-greet</span>
            <span className="dd-kickoff-detail">Get to know your cohort before the work begins.</span>
          </div>

          <div className="dd-phases">
            {PHASES.map((phase) => (
              <article key={phase.phase} className={`dd-phase paper-card accent-${phase.tint}`}>
                <div className="dd-phase-head">
                  <span className={`dd-phase-label tint-${phase.tint}`}>{phase.phase}</span>
                  <span className="dd-phase-meta">{phase.meta}</span>
                </div>
                <h3 className="dd-phase-title">{phase.title}</h3>
                <p className="dd-phase-summary">{phase.summary}</p>
                <ul className="dd-week-list">
                  {phase.items.map((item) => (
                    <li key={item.marker}>
                      <span className={`dd-week-marker tint-${phase.tint}`}>{item.marker}</span>
                      <span className="dd-week-body">
                        <span className="dd-week-title">{item.title}</span>
                        <span className="dd-week-detail">{item.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                {phase.note && (
                  <div className={`dd-phase-note tint-${phase.tint}`}>
                    <span className="dd-phase-note-title">{phase.note.title}</span>
                    <span className="dd-phase-note-body">{phase.note.body}</span>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="dd-beyond">
            <h3 className="dd-beyond-title">Beyond the workshops</h3>
            <div className="dd-beyond-grid">
              {BEYOND.map((item) => (
                <div key={item.title} className={`dd-beyond-card tint-${item.tint}`}>
                  <span className="dd-beyond-card-title">{item.title}</span>
                  <span className="dd-beyond-card-body">{item.body}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dd-cta-row dd-program-cta">
            <a className="button accent" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
              Apply now
            </a>
            <span className="dd-cta-note">Applications for Cohort 3 open soon.</span>
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="dd-section dd-requirements" id="expectations">
        <div className="dd-wrap dd-requirements-inner">
          <div className="dd-requirements-head">
            <p className="eyebrow">Requirements</p>
            <h2 className="display-heading">
              Requirements
              <br />
              &amp; expectations
            </h2>
            <p className="dd-requirements-sub">Built to fit around work, school, and your schedule.</p>
          </div>
          <ol className="dd-requirements-list">
            {REQUIREMENTS.map((item, index) => (
              <li key={item.title}>
                <span className="dd-requirements-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="dd-requirements-body">
                  <span className="dd-requirements-title">{item.title}</span>
                  <span className="dd-requirements-detail">{item.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* THE DIPLOMATS */}
      <section className="dd-section dd-cohort" id="cohort">
        <div className="dd-wrap">
          <p className="eyebrow on-dark">Meet the diplomats</p>
          <h2 className="display-heading on-dark">The diplomats</h2>
        </div>

        {diplomatsData.cohorts.map((cohort, index) => (
          <div className="dd-cohort-block" key={cohort.id}>
            <div className="dd-wrap">
              <p className="dd-cohort-label">
                <span>{cohort.name} · {cohort.term}</span>
                <span className="dd-cohort-rule" aria-hidden="true" />
              </p>
            </div>
            <Marquee direction={index % 2 === 0 ? 'left' : 'right'} speed={index % 2 === 0 ? '72s' : '78s'}>
              {cohort.members.map((member) => (
                <DiplomatCard key={member.name} member={member} />
              ))}
            </Marquee>
          </div>
        ))}
      </section>

      {/* WHERE THEY GO NEXT */}
      <section className="dd-section dd-outcomes">
        <div className="dd-wrap">
          <p className="eyebrow">Where diplomats go next</p>
          <h2 className="dd-outcomes-title">
            Diplomats have gone on to host their own events and build solutions touching climate,
            affordable housing, and safer streets.
          </h2>
          <div className="dd-outcomes-grid">
            {OUTCOMES.map((outcome) => (
              <div className="dd-outcome paper-card" key={outcome.label}>
                {outcome.icon}
                <span>{outcome.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section className="dd-section dd-apply" id="apply">
        <div className="dd-wrap dd-apply-inner">
          <div className="dd-apply-copy">
            <p className="eyebrow">Apply</p>
            <h2 className="dd-apply-title">
              Join Cohort 3
              <br />
              <span>Spring 2027</span>
            </h2>
            <p className="dd-apply-sub">
              Tell us what you would fix if someone handed you the tools. That is most of the application.
            </p>
            <div className="dd-cta-row">
              <a className="button ink" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
                Start your application
              </a>
            </div>
            <p className="dd-apply-note">
              Not ready for a cohort?{' '}
              <a href={VOLUNTEER_FORM_URL} target="_blank" rel="noopener noreferrer">
                Join the volunteer network
              </a>{' '}
              or <Link to="/events">come to an event</Link> first.
            </p>
          </div>
          <div className="dd-dates">
            <span className="dd-dates-label">Key dates</span>
            <dl className="dd-dates-list">
              {KEY_DATES.map((date) => (
                <div key={date.label}>
                  <dt>{date.label}</dt>
                  <dd>{date.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataDiplomats;
