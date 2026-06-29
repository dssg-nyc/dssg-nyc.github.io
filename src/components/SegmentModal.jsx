import { useEffect, useRef, useState } from 'react';
import './SegmentModal.css';
import siteProperties from '../data/siteproperties.json';

const OPEN_EVENT = 'dssg:segment-open';

// Fire from anywhere: openSegmentModal()
export const openSegmentModal = () => window.dispatchEvent(new Event(OPEN_EVENT));

// Audience segmentation — ask "who are you?" first, then route each role.
const ROLES = [
  {
    key: 'volunteer',
    label: 'Data / IT professional',
    blurb: 'You want to use your skills for social good.',
    next: 'We’ll point you to volunteer sign-up and the next Data Diplomats cohort.',
    cta: {
      label: 'Sign up to volunteer',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSf8bvJdbx70NBQwizsA2UKAUiZ5AILtc7bWUH0KxOT_ej6MJw/viewform?usp=header',
    },
  },
  {
    key: 'nonprofit',
    label: 'Nonprofit organization',
    blurb: 'You want pro bono data, AI, or IT support.',
    next: 'We’ll help you scope a project and get matched with volunteers.',
    cta: {
      label: 'Request pro bono support',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLScxK78KmTbbF2LnqqVvniWg21DrrU2B8WkvS6euTILKkR18bw/viewform?usp=header',
    },
  },
  {
    key: 'partner',
    label: 'Funder or sponsor',
    blurb: 'You want to support civic tech in NYC.',
    next: 'Let’s talk about partnership and sponsorship.',
    cta: { label: 'Email the team', url: 'mailto:dssgnyc@gmail.com' },
  },
  {
    key: 'curious',
    label: 'Just curious',
    blurb: 'You want to follow the work and find events.',
    next: 'We’ll keep you posted on stories, hackathons, and meetups.',
    cta: { label: 'Browse upcoming events', url: '/#/events' },
  },
];

const SegmentModal = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setRole(null);
      setDone(false);
      setError('');
      setEmail('');
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    setTimeout(() => dialogRef.current?.focus(), 30);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const selectedRole = ROLES.find((r) => r.key === role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    const formId = siteProperties.convertKitFormId;
    try {
      const body = new FormData();
      body.append('email_address', email);
      body.append('fields[role]', role || 'unknown');
      await fetch(`https://app.convertkit.com/forms/${formId}/subscriptions`, {
        method: 'POST',
        mode: 'no-cors',
        body,
      });
    } catch (_) {
      /* no-cors hides the response; we proceed optimistically */
    }
    setDone(true);
  };

  return (
    <div
      className="seg-backdrop"
      onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div
        className="seg-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Join the NYC x DSSG community"
        tabIndex={-1}
        ref={dialogRef}
      >
        <button className="seg-close" aria-label="Close" onClick={() => setOpen(false)}>
          &times;
        </button>

        {!role && (
          <div className="seg-step">
            <p className="eyebrow">Before we send anything</p>
            <h3 className="seg-title">Who are you?</h3>
            <p className="seg-sub">
              Tell us how you’d like to connect so we can send the right things —
              not a generic blast.
            </p>
            <div className="seg-roles">
              {ROLES.map((r) => (
                <button key={r.key} className="seg-role" onClick={() => setRole(r.key)}>
                  <span className="seg-role-label">{r.label}</span>
                  <span className="seg-role-blurb">{r.blurb}</span>
                  <span className="seg-role-arrow" aria-hidden="true">&rarr;</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {role && !done && (
          <div className="seg-step">
            <button className="seg-back" onClick={() => setRole(null)}>
              &larr; Not you?
            </button>
            <p className="eyebrow">{selectedRole.label}</p>
            <h3 className="seg-title">Where should we reach you?</h3>
            <p className="seg-sub">{selectedRole.next}</p>
            <form className="seg-form" onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                className="seg-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                autoFocus
              />
              {error && <p className="seg-error">{error}</p>}
              <button type="submit" className="button seg-submit">
                Sign up &amp; register
              </button>
            </form>
            <a
              className="seg-skip"
              href={selectedRole.cta.url}
              target={selectedRole.cta.url.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
            >
              Or go straight to: {selectedRole.cta.label} &rarr;
            </a>
          </div>
        )}

        {role && done && (
          <div className="seg-step seg-done">
            <p className="seg-check" aria-hidden="true">&#10003;</p>
            <h3 className="seg-title">You’re in.</h3>
            <p className="seg-sub">
              Thanks — check your inbox to confirm. {selectedRole.next}
            </p>
            <a
              className="button seg-submit"
              href={selectedRole.cta.url}
              target={selectedRole.cta.url.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
            >
              {selectedRole.cta.label}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SegmentModal;
