/**
 * @typedef {object} ImpactStory
 * @property {string} id
 * @property {string} kicker
 * @property {string} title
 * @property {string} url
 * @property {string} displayUrl
 * @property {string} image
 * @property {string} imageAlt
 * @property {string} what
 * @property {string} impact
 * @property {string[]} stats
 */

/**
 * One card on the coverflow ring: a browser-chrome mockup wrapping the live
 * product screenshot. The story's prose lives below the ring in a single detail
 * panel, so a card only ever has to be as tall as its screenshot.
 *
 * Position is expressed entirely through the `--offset` / `--dist` custom
 * properties, so the CSS owns the 3D maths and React never writes a transform.
 *
 * @param {object} props
 * @param {ImpactStory} props.story
 * @param {number} props.offset       signed ring distance from the active slide
 * @param {boolean} props.isActive
 * @param {number} props.position     1-based index, for the screen-reader label
 * @param {number} props.total
 * @param {() => void} props.onSelect
 */
const CarouselSlide = ({ story, offset, isActive, position, total, onSelect }) => {
  const distance = Math.abs(offset);

  return (
    <article
      className="ic-slide"
      style={{ '--offset': offset, '--dist': distance }}
      data-hidden={distance >= 2}
      data-active={isActive}
      role="group"
      aria-roledescription="slide"
      aria-label={`${position} of ${total}: ${story.title}`}
    >
      <button
        type="button"
        className="ic-frame"
        onClick={onSelect}
        tabIndex={isActive ? 0 : -1}
        aria-label={
          isActive
            ? `Open ${story.title} at ${story.displayUrl} in a new tab`
            : `Show ${story.title}`
        }
      >
        <span className="ic-chrome" aria-hidden="true">
          <span className="ic-lights">
            <i />
            <i />
            <i />
          </span>
          <span className="ic-url">{story.displayUrl}</span>
        </span>
        <img
          className="ic-shot"
          src={story.image}
          alt={story.imageAlt}
          width="1440"
          height="820"
          loading={position === 1 ? 'eager' : 'lazy'}
          decoding="async"
          draggable="false"
        />
      </button>
    </article>
  );
};

export default CarouselSlide;
