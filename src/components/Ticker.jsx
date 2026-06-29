import './Ticker.css';
import tickerData from '../data/ticker.json';

// A single pass of items, repeated to create a seamless loop.
const TickerRun = ({ items, ariaHidden }) => (
  <div className="ticker-run" aria-hidden={ariaHidden}>
    {items.map((item, i) => {
      const external = /^https?:\/\//.test(item.url);
      return (
        <a
          key={`${item.label}-${i}`}
          className="ticker-item"
          href={item.url}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <span className="ticker-dot" aria-hidden="true">&#9679;</span>
          {item.label}
        </a>
      );
    })}
  </div>
);

const Ticker = () => {
  return (
    <div className="ticker" role="region" aria-label="Latest from NYC x DSSG">
      <div className="ticker-track">
        <TickerRun items={tickerData} />
        <TickerRun items={tickerData} ariaHidden />
      </div>
    </div>
  );
};

export default Ticker;
