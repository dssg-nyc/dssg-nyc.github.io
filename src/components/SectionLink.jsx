import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

/**
 * Link to a section by id, optionally on another page.
 *
 * HashRouter owns the URL fragment, so a plain href="#book" is read as a
 * route called "book" and renders an empty page. This goes through the
 * router instead (URL becomes #/page#section) and Header scrolls to the
 * section on arrival. A click on the current page scrolls directly too,
 * since re-clicking the same hash does not change the location.
 */
const SectionLink = ({ section, page = '/', onClick, ...rest }) => {
  const { pathname } = useLocation();

  const handleClick = (event) => {
    onClick?.(event);
    if (pathname === page) {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <Link to={{ pathname: page, hash: `#${section}` }} onClick={handleClick} {...rest} />;
};

SectionLink.propTypes = {
  section: PropTypes.string.isRequired,
  page: PropTypes.string,
  onClick: PropTypes.func,
};

export default SectionLink;
