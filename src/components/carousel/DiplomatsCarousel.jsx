import { useCallback, useState } from 'react';
import './diplomats-carousel.css';
import useCarouselAutoplay, { usePrefersReducedMotion } from './useCarouselAutoplay';

const AUTOPLAY_INTERVAL_MS = 2000;

const SLIDES = [
  { src: '/images/social/DSSG-NYC Intro.svg', alt: 'DSSG-NYC introduction' },
  { src: '/images/social/dssg-bridge.svg', alt: 'DSSG-NYC bridge illustration' },
  { src: '/images/social/dssg-bike.svg', alt: 'DSSG-NYC bike illustration' },
  { src: '/images/social/dssg-change.svg', alt: 'DSSG-NYC change illustration' }
];

const TOTAL = SLIDES.length;

const DiplomatsCarousel = () => {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const goTo = useCallback((index) => {
    setActive(((index % TOTAL) + TOTAL) % TOTAL);
  }, []);

  const advance = useCallback(() => setActive((current) => (current + 1) % TOTAL), []);

  const { pause, resume } = useCarouselAutoplay({
    isEnabled: !prefersReducedMotion,
    intervalMs: AUTOPLAY_INTERVAL_MS,
    onTick: advance
  });

  const step = useCallback(
    (delta) => {
      pause();
      goTo(active + delta);
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

  return (
    <div
      className="dc-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Data Diplomats slideshow"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <div className="dc-viewport" tabIndex={0} onKeyDown={handleKeyDown}>
        <div
          className="dc-track"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {SLIDES.map((slide) => (
            <div className="dc-slide" key={slide.src}>
              <img src={slide.src} alt={slide.alt} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="dc-arrow dc-arrow-prev"
          onClick={() => step(-1)}
          aria-label="Previous slide"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="dc-arrow dc-arrow-next"
          onClick={() => step(1)}
          aria-label="Next slide"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <ul className="dc-dots">
        {SLIDES.map((slide, index) => (
          <li key={slide.src}>
            <button
              type="button"
              className="dc-dot"
              onClick={() => step(index - active)}
              aria-current={index === active}
              aria-label={`Go to slide ${index + 1}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiplomatsCarousel;
