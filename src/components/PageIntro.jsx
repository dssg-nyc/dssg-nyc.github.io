import PropTypes from 'prop-types';

/** Eyebrow, display heading and one-line lede that open a secondary page. */
const PageIntro = ({ eyebrow, title, children }) => (
  <header className="page-intro">
    <div className="page-intro-inner">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-intro-title">{title}</h1>
      {children && <p className="page-intro-sub">{children}</p>}
    </div>
  </header>
);

PageIntro.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
};

export default PageIntro;
