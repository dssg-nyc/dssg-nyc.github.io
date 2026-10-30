import { useEffect } from 'react';
import PropTypes from 'prop-types';

// Sends old in-site links (e.g. the former /#/diplomats page) to an external site.
const ExternalRedirect = ({ to }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
};

ExternalRedirect.propTypes = {
  to: PropTypes.string.isRequired,
};

export default ExternalRedirect;
