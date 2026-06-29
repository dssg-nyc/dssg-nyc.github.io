import './ProjectFeature.css';
import { openSegmentModal } from './SegmentModal';

const STEPS = [
  {
    n: '01',
    title: 'Listen first',
    body: 'Every partnership begins with understanding your mission, your constraints, and the data you already have.',
  },
  {
    n: '02',
    title: 'Design together',
    body: 'We shape an approach that fits your goals and your capacity — not the most impressive thing we could build.',
  },
  {
    n: '03',
    title: 'Build, hand off, support',
    body: 'We build, test, and deploy with training and documentation, so the work keeps serving you after we step back.',
  },
];

const FIGURES = [
  { value: '260+', label: 'Registered volunteers' },
  { value: '8+', label: 'Partner organizations' },
  { value: '8+', label: 'Projects completed' },
  { value: '$40k+', label: 'Pro bono value delivered' },
];

const ProjectFeature = () => {
  return (
    <section className="approach" id="approach">
      <div className="container">
        <div className="approach-head reveal">
          <p className="eyebrow">Our approach</p>
          <h2 className="approach-title">Technology should serve people first.</h2>
          <p className="approach-lede lead">
            We pair data science with a deep respect for the human work of nonprofits.
            The result is software that amplifies a mission instead of complicating it.
          </p>
        </div>

        <div className="approach-steps">
          {STEPS.map((s, i) => (
            <div className="approach-step reveal" key={s.n} style={{ '--reveal-delay': `${i * 70}ms` }}>
              <span className="step-n">{s.n}</span>
              <h4 className="step-title">{s.title}</h4>
              <p className="step-body">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="approach-figures reveal">
          {FIGURES.map((f) => (
            <div className="figure" key={f.label}>
              <span className="figure-value">{f.value}</span>
              <span className="figure-label">{f.label}</span>
            </div>
          ))}
        </div>

        <div className="approach-cta reveal">
          <button type="button" className="button" onClick={openSegmentModal}>
            Sign up &amp; register
          </button>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScxK78KmTbbF2LnqqVvniWg21DrrU2B8WkvS6euTILKkR18bw/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="button secondary"
          >
            Start a project
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectFeature;
