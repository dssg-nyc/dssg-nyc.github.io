import PropTypes from 'prop-types';
import useCountUp, { parseStatValue } from '../hooks/useCountUp';
import { usePrefersReducedMotion } from './carousel/useCarouselAutoplay';

/**
 * Renders a stat like "$40k+" and counts its numeric part up from zero the
 * first time `isActive` is true. Decoration ("$", "k", "+") never animates.
 */
const StatCounter = ({ value, isActive }) => {
  const parsed = parseStatValue(value);
  const prefersReducedMotion = usePrefersReducedMotion();

  const count = useCountUp({
    target: parsed ? parsed.target : 0,
    decimals: parsed ? parsed.decimals : 0,
    isActive,
    isEnabled: !prefersReducedMotion
  });

  // A value with no digits in it has nothing to count — show it verbatim.
  if (!parsed) {
    return value;
  }

  const formatted = count.toLocaleString('en-US', {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals
  });

  return `${parsed.prefix}${formatted}${parsed.suffix}`;
};

StatCounter.propTypes = {
  value: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default StatCounter;
