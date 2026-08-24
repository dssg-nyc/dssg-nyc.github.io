import { useCallback, useRef, useState } from 'react';
import './carousel.css';
import stories from '../../data/impactstories.json';
import CarouselSlide from './CarouselSlide';
import useCarouselAutoplay, { usePrefersReducedMotion } from './useCarouselAutoplay';
import useInViewReveal from './useInViewReveal';

const AUTOPLAY_INTERVAL_MS = 6000;
const DRAG_THRESHOLD_PX = 60;
const TOTAL = stories.length;

/**
 * Signed distance from the active slide, wrapped so the ring always takes the
 * short way round: with four slides the values are -1, 0, 1, 2.
 *
 * @param {number} index
 * @param {number} active
 * @returns {number}
 */
const ringOffset = (index, active) => {
  const half = Math.floor(TOTAL / 2);
  return ((index - active + TOTAL + half) % TOTAL) - half;
};

const ImpactCarousel = () => {
  const [active, setActive] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [sectionRef, isRevealed] = useInViewReveal();
  const prefersReducedMotion = usePrefersReducedMotion();
  const dragStartX = useRef(null);
  const activeStory = stories[active];

  const goTo = useCallback((index) => {
    setActive(((index % TOTAL) + TOTAL) % TOTAL);
  }, []);

  const advance = useCallback(() => setActive((current) => (current + 1) % TOTAL), []);

  const { pause, resume } = useCarouselAutoplay({
    isEnabled: isRevealed && !prefersReducedMotion,
    intervalMs: AUTOPLAY_INTERVAL_MS,
    onTick: advance
  });

  // Any deliberate move stops the rotation taking the slide out from under the
  // visitor, and switches the live region on for screen readers.
  const step = useCallback(
    (delta) => {
      setHasInteracted(true);
      pause();
      goTo(active + delta);
    },
    [active, goTo, pause]
  );

  const selectSlide = useCallback(
    (index) => {
      if (index === active) {
        window.open(stories[index].url, '_blank', 'noopener,noreferrer');
        return;
      }

      setHasInteracted(true);
      pause();
      goTo(index);
    },
    [active, goTo, pause]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      }
    },
    [step]
  );

  const handlePointerDown = useCallback(
    (event) => {
      dragStartX.current = event.clientX;
      pause();
    },
    [pause]
  );

  const handlePointerUp = useCallback(
    (event) => {
      const startX = dragStartX.current;
      dragStartX.current = null;

      if (startX === null) {
        return;
      }

      const travelled = event.clientX - startX;

      if (Math.abs(travelled) >= DRAG_THRESHOLD_PX) {
        step(travelled < 0 ? 1 : -1);
      }
    },
    [step]
  );

  return (
    <section
      className={`impact-carousel ${isRevealed ? 'is-revealed' : ''}`}
      id="impact-stories"
      aria-labelledby="impact-stories-heading"
      ref={sectionRef}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
    >
      <header className="ic-header">
        <p className="ic-eyebrow" id="impact-stories-heading">Open source civic tech</p>
      </header>

      <div className="ic-stage">
        <button
          type="button"
          className="ic-arrow ic-arrow-prev"
          onClick={() => step(-1)}
          aria-label="Previous impact story"
        >
          <span aria-hidden="true">←</span>
        </button>

        <div
          className="ic-viewport"
          role="region"
          aria-roledescription="carousel"
          aria-label="Impact stories"
          aria-live={hasInteracted ? 'polite' : 'off'}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            dragStartX.current = null;
          }}
        >
          <div className="ic-track">
            {stories.map((story, index) => (
              <CarouselSlide
                key={story.id}
                story={story}
                offset={ringOffset(index, active)}
                isActive={index === active}
                position={index + 1}
                total={TOTAL}
                onSelect={() => selectSlide(index)}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="ic-arrow ic-arrow-next"
          onClick={() => step(1)}
          aria-label="Next impact story"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Remounting on id change restarts the entrance animation, which is the
          cheapest way to make the copy swap read as a deliberate transition. */}
      <div className="ic-detail" key={activeStory.id}>
        <h3 className="ic-title">{activeStory.title}</h3>
        <p className="ic-impact">
          <span className="ic-impact-label">Impact</span>
          {activeStory.impact}
        </p>
        <a
          className="ic-link"
          href={activeStory.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit {activeStory.displayUrl}
          <span aria-hidden="true"> →</span>
        </a>
      </div>

      <div className="ic-controls">
        <ul className="ic-dots">
          {stories.map((story, index) => (
            <li key={story.id}>
              <button
                type="button"
                className="ic-dot"
                onClick={() => step(index - active)}
                aria-current={index === active}
                aria-label={`Show ${story.title}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ImpactCarousel;
