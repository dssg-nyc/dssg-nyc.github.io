import { useEffect } from 'react';

/**
 * Editorial scroll reveal.
 * Watches the DOM for elements with the `.reveal` class and adds
 * `.is-visible` once they scroll into view. Staggering is handled in
 * markup via `style={{ '--reveal-delay': '60ms' }}`.
 *
 * Respects prefers-reduced-motion (the CSS short-circuits the transform;
 * we still flip the class so nothing stays invisible).
 */
export default function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    const seen = new WeakSet();
    const scan = () => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          observer.observe(el);
        }
      });
    };

    scan();

    // Re-scan when routes/sections mount new content.
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);
}
