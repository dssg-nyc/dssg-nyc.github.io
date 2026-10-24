import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  OPEN_CONSENT_EVENT,
  defaultPreferences,
  hasGlobalPrivacyControl,
  readConsent,
  saveConsent,
} from '../consent/consent';
import './CookieConsent.css';

const OPTIONAL_CATEGORIES = [
  {
    key: 'embeds',
    label: 'Third-party embeds',
    text: 'Event calendar (Luma) and donation form (Givebutter). These providers may set their own cookies.',
  },
  {
    key: 'analytics',
    label: 'Analytics',
    text: 'Helps us understand how the site is used (Google Analytics, only if enabled).',
  },
  {
    key: 'advertising',
    label: 'Advertising',
    text: 'Measures and personalizes our Google Ads campaigns (only if enabled).',
  },
];

const CookieConsent = () => {
  const [visible, setVisible] = useState(() => readConsent() === null);
  const [choices, setChoices] = useState(() => readConsent() || defaultPreferences());
  const gpc = hasGlobalPrivacyControl();

  useEffect(() => {
    const openSettings = () => {
      setChoices(readConsent() || defaultPreferences());
      setVisible(true);
    };

    window.addEventListener(OPEN_CONSENT_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openSettings);
  }, []);

  const finish = (next) => {
    saveConsent(next);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="consent-banner" role="dialog" aria-label="Cookie and privacy preferences">
      <div className="consent-inner">
        <p className="consent-text">
          We use only essential storage by default. With your permission we also use
          third-party embeds and, if enabled, analytics and advertising cookies.
          You can change your mind at any time. See our{' '}
          <Link to="/privacy">Privacy Policy</Link>
          {' '}and{' '}
          <Link to="/cookies">Cookie Policy</Link>
          .
          {gpc ? ' We detected a Global Privacy Control signal and are keeping advertising off.' : ''}
        </p>

        <ul className="consent-options">
          <li>
            <label>
              <input type="checkbox" checked disabled />
              {' '}
              <strong>Essential</strong>
              {' '}
              (always on)
            </label>
            <span>Remembers this choice and keeps the site working.</span>
          </li>
          {OPTIONAL_CATEGORIES.map(({ key, label, text }) => (
            <li key={key}>
              <label>
                <input
                  type="checkbox"
                  checked={!!choices[key] && !(key === 'advertising' && gpc)}
                  disabled={key === 'advertising' && gpc}
                  onChange={(event) => setChoices({
                    ...choices,
                    [key]: event.target.checked,
                  })}
                />
                {' '}
                <strong>{label}</strong>
              </label>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <div className="consent-actions">
          <button
            type="button"
            className="consent-btn consent-btn-primary"
            onClick={() => finish(choices)}
          >
            Save choices
          </button>
          <button
            type="button"
            className="consent-btn consent-btn-primary"
            onClick={() => finish({ embeds: false, analytics: false, advertising: false })}
          >
            Reject non-essential
          </button>
          <button
            type="button"
            className="consent-btn consent-btn-primary"
            onClick={() => finish({ embeds: true, analytics: true, advertising: true })}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
