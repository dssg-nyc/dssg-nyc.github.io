import { useEffect, useState } from 'react';

const DEFAULT_DURATION_MS = 1500;

// Splits a display value like "260+", "8+", or "$40k+" into the parts around
// its number so only the number animates and the decoration stays put.
const VALUE_PATTERN = /^(\D*?)(\d+(?:\.\d+)?)(.*)$/;

/** easeOutCubic — fast off the mark, slow landing on the final value. */
const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);

/**
 * @param {string} value
 * @returns {{ prefix: string, target: number, suffix: string, decimals: number } | null}
 */
export function parseStatValue(value) {
  const match = VALUE_PATTERN.exec(value);

  if (!match) {
    return null;
  }

  const [, prefix, digits, suffix] = match;
  const fraction = digits.split('.')[1];

  return {
    prefix,
    target: Number(digits),
    suffix,
    decimals: fraction ? fraction.length : 0
  };
}

/**
 * Counts from zero up to `target` once `isActive` flips true, then holds.
 * With `isEnabled` false (reduced motion) it snaps straight to the target.
 *
 * @param {{ target: number, isActive: boolean, durationMs?: number, decimals?: number, isEnabled?: boolean }} options
 * @returns {number}
 */
export default function useCountUp({
  target,
  isActive,
  durationMs = DEFAULT_DURATION_MS,
  decimals = 0,
  isEnabled = true
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    if (!isEnabled) {
      setCurrent(target);
      return undefined;
    }

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / durationMs, 1);
      setCurrent(Number((easeOutCubic(progress) * target).toFixed(decimals)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [target, isActive, durationMs, decimals, isEnabled]);

  return current;
}
