import { useEffect, useRef, useState } from 'react';

const DEFAULT_THRESHOLD = 0.2;

/**
 * One-shot reveal. Returns a ref to attach to the element and a boolean that
 * flips to true the first time that element intersects the viewport, then stays
 * true — the reveal is an entrance, not a scroll-linked toggle.
 *
 * On a tall viewport the target is already intersecting at mount, so the
 * observer fires immediately and the reveal chains straight off the page's own
 * entrance.
 *
 * @param {number} [threshold]
 * @returns {[React.RefObject<HTMLElement>, boolean]}
 */
export default function useInViewReveal(threshold = DEFAULT_THRESHOLD) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    // Older Safari and any non-browser render pass: show the content rather
    // than trapping it at opacity 0.
    if (typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isRevealed];
}
