import { useCallback, useEffect, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * True when the visitor has asked for reduced motion. Re-evaluated on change so
 * a mid-session OS toggle takes effect without a reload.
 *
 * @returns {boolean}
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }

    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => setPrefersReduced(query.matches);

    sync();
    query.addEventListener('change', sync);

    return () => query.removeEventListener('change', sync);
  }, []);

  return prefersReduced;
}

/**
 * Drives carousel auto-advance. The interval only runs while the carousel is
 * enabled, not manually paused, and the tab is visible — a background tab
 * should not burn through slides the visitor never saw.
 *
 * @param {object} options
 * @param {boolean} options.isEnabled  false until the band has revealed, or when reduced motion is on
 * @param {number}  options.intervalMs
 * @param {() => void} options.onTick
 * @returns {{ pause: () => void, resume: () => void }}
 */
export default function useCarouselAutoplay({ isEnabled, intervalMs, onTick }) {
  const [isPaused, setIsPaused] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const sync = () => setIsTabVisible(!document.hidden);

    sync();
    document.addEventListener('visibilitychange', sync);

    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  useEffect(() => {
    if (!isEnabled || isPaused || !isTabVisible) {
      return undefined;
    }

    const timer = setInterval(onTick, intervalMs);

    return () => clearInterval(timer);
  }, [isEnabled, isPaused, isTabVisible, intervalMs, onTick]);

  return { pause, resume };
}
