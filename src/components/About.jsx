import './About.css';
import aboutData from '../data/aboutme.json';

const VALUES = [
  {
    title: 'Community first',
    body: 'Before we are technologists, we are organizers. The relationships come first; the code follows.',
  },
  {
    title: 'Local & specific',
    body: 'Food access, housing, transit safety, public health — real NYC problems, understood up close.',
  },
  {
    title: 'Impact over output',
    body: 'We measure success in lives improved and trust built, not in lines of code deployed.',
  },
  {
    title: 'Open & ethical',
    body: 'Open-source where we can, careful with AI always, and honest about what data can and cannot do.',
  },
];

const TEAM = [
  {
    name: 'Jian',
    role: 'Founder',
    image: '/images/jianhead.png',
    bio: 'A passionate advocate for using data science to drive social change. He researched Computational Social Sciences at the Max-Planck Institute of Geoanthropology, and is drawn to open-source intelligence tools and agentic AI. With community-organizing training and years in big data, he is dedicated to civic tech.',
  },
  {
    name: 'Ursula',
    role: 'Nonprofit Lead',
    image: '/images/ursula_pic.png',
    bio: 'A Brooklyn-based data scientist who leads DSSG NYC’s nonprofit engagement. Her work spans voter engagement, economic development, and public infrastructure. She began her career as a lawyer working on open-data policy and spent three years on civic projects in Tbilisi, Georgia.',
  },
  {
    name: 'Carina',
    role: 'Data Professional',
    image: '/images/carina_pic.png',
    bio: 'A data professional with a Master’s in Data Science and a dual Bachelor’s in Quantitative Economics and Fine Arts from Tufts. She volunteers across the civic-tech space and is fascinated by the intersections of data, art, and community.',
  },
  {
    name: 'Join our team',
    role: 'Future Data Diplomat',
    image: '/images/questionmark_face.jpg',
    bio: 'We’re looking for passionate Data Diplomats to help grow NYC DSSG and expand our impact. If you’d like to help shape data science for social good in NYC, we’d love to hear from you.',
    contact: 'dssgnyc@gmail.com',
  },
];

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-lede reveal">
          <p className="eyebrow">Who we are</p>
          <h2 className="about-headline">
            First and foremost, we are community organizers — with a mission to grow
            a culture of civic technologists who build for their neighbors.
          </h2>
        </div>

        <div className="about-cols">
          <div className="about-col reveal" style={{ '--reveal-delay': '60ms' }}>
            <p>
              NYC Data Science for Social Good is a civic-tech volunteer group led by
              the Data Diplomats for Nonprofits. We unite data scientists, AI engineers,
              and IT professionals to drive social impact through pro bono nonprofit work.
            </p>
            <p>
              We focus on healthy food access, affordable housing, education equity,
              transportation safety, environmental justice, and public health — building
              cohorts of technologists and ethical AI leaders who understand local issues
              and turn them into real solutions.
            </p>
            <p>
              Founded by the Data Diplomats for Nonprofits, Inc. — a 501(c)(3) nonprofit —
              our group has grown into a vibrant community committed to using technology
              for meaningful, measurable good.
            </p>
          </div>

          <div className="about-values reveal" style={{ '--reveal-delay': '120ms' }}>
            {VALUES.map((v) => (
              <div className="value" key={v.title}>
                <h4 className="value-title">{v.title}</h4>
                <p className="value-body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-expertise reveal">
          <span className="expertise-label">Our toolkit</span>
          <div className="expertise-icons">
            {aboutData.icons.map((icon, i) => (
              <div className="expertise-icon" key={i} title={icon.alt}>
                <img src={icon.src} alt={icon.alt} />
                <span>{icon.alt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Leadership ---- */}
        <div className="team">
          <div className="team-head reveal">
            <p className="eyebrow">Leadership</p>
            <h3 className="team-title">The people behind the work</h3>
          </div>
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <article
                className="member reveal"
                key={m.name}
                style={{ '--reveal-delay': `${i * 60}ms` }}
              >
                <div className="member-portrait">
                  <img src={m.image} alt={m.name} />
                </div>
                <h4 className="member-name">{m.name}</h4>
                <span className="member-role">{m.role}</span>
                <p className="member-bio">{m.bio}</p>
                {m.contact && (
                  <a className="member-contact" href={`mailto:${m.contact}`}>{m.contact}</a>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
