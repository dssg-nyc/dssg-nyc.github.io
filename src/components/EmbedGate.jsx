import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { readConsent, saveConsent, subscribeConsent } from '../consent/consent';
import './EmbedGate.css';

const EmbedGate = ({ provider, children }) => {
  const [allowed, setAllowed] = useState(() => readConsent()?.embeds === true);

  useEffect(() => subscribeConsent((preferences) => {
    setAllowed(preferences?.embeds === true);
  }), []);

  if (allowed) {
    return children;
  }

  return (
    <div className="embed-gate">
      <p>
        This content is provided by {provider}, which may set cookies and receive
        your IP address. Please allow third-party embeds to view it. See our{' '}
        <Link to="/cookies">Cookie Policy</Link>.
      </p>
      <button
        type="button"
        className="button accent"
        onClick={() => saveConsent({ ...readConsent(), embeds: true })}
      >
        Allow {provider} content
      </button>
    </div>
  );
};

EmbedGate.propTypes = {
  provider: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default EmbedGate;
