import PropTypes from 'prop-types';
import './LogoCloud.css';

/* Continuous right-to-left logo ribbon (like code-crew.org's Supporters
   ticker): edge-faded, pauses on hover/focus, still when reduced motion is
   preferred. The track holds two copies of the logo set so the loop is
   seamless; copies are hidden from assistive tech. */
const LogoCloud = ({ title, logos }) => {
  // Repeat short lists so one loop unit always overflows the container.
  const repeats = Math.max(1, Math.ceil(6 / logos.length));
  const unit = Array.from({ length: repeats }, () => logos).flat();
  const track = [...unit, ...unit];

  return (
    <div className="logo-cloud">
      <h3 className="logo-cloud-title">{title}</h3>
      <div className="logo-ribbon" aria-label={title}>
        <div className="logo-ribbon-track">
          {track.map((logo, index) => {
            const duplicate = index >= unit.length;
            const img = <img src={logo.src} alt={duplicate ? '' : logo.alt} loading="lazy" />;
            return logo.href ? (
              <a
                key={`${logo.alt}-${index}`}
                className="logo-cloud-item"
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={duplicate ? 'true' : undefined}
                tabIndex={duplicate ? -1 : undefined}
              >
                {img}
              </a>
            ) : (
              <span key={`${logo.alt}-${index}`} className="logo-cloud-item" aria-hidden={duplicate ? 'true' : undefined}>
                {img}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

LogoCloud.propTypes = {
  title: PropTypes.string.isRequired,
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      href: PropTypes.string,
    }),
  ).isRequired,
};

export default LogoCloud;
