import './Illustration.css';

/*
 * Hand-drawn, engraving/toile-style line illustration — the signature
 * brand asset. Authored as fine ink strokes (no fill) so it reads like a
 * print-journal plate. Used full as the hero, and as a slim footer divider.
 *
 * Everything else on the page stays plain so this art carries the personality.
 */

const HeroPlate = () => (
  <svg
    className="ill-svg ill-hero-svg"
    viewBox="0 0 720 420"
    role="img"
    aria-label="Engraving-style illustration of the New York City skyline framed by botanical sprigs, a radiant sun, and circling birds"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* ---- radiant sun behind the skyline ---- */}
    <g className="ill-draw" opacity="0.9">
      <circle cx="360" cy="150" r="46" />
      <circle cx="360" cy="150" r="58" strokeDasharray="2 6" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const r1 = 66;
        const r2 = i % 2 === 0 ? 92 : 80;
        return (
          <line
            key={i}
            x1={360 + Math.cos(a) * r1}
            y1={150 + Math.sin(a) * r1}
            x2={360 + Math.cos(a) * r2}
            y2={150 + Math.sin(a) * r2}
          />
        );
      })}
    </g>

    {/* ---- skyline ---- */}
    <g className="ill-draw">
      {/* ground line */}
      <line x1="40" y1="330" x2="680" y2="330" />

      {/* left low buildings */}
      <path d="M70 330 V250 H110 V330" />
      <path d="M82 250 V238 H98 V250" />
      <path d="M118 330 V210 H150 V330" />
      <line x1="118" y1="232" x2="150" y2="232" />
      <line x1="118" y1="256" x2="150" y2="256" />
      <line x1="118" y1="280" x2="150" y2="280" />
      <line x1="134" y1="210" x2="134" y2="330" />

      {/* art-deco center tower (Empire-ish) */}
      <path d="M300 330 V150 H330 V150" />
      <path d="M330 330 V120 H390 V330" />
      <path d="M330 330 V120 H390" />
      <path d="M340 120 V92 H380 V120" />
      <path d="M350 92 V70 H370 V92" />
      <line x1="360" y1="70" x2="360" y2="46" />
      <circle cx="360" cy="42" r="3" />
      {/* tower window grid */}
      {Array.from({ length: 8 }).map((_, r) => (
        <line key={`h${r}`} x1="332" y1={140 + r * 24} x2="388" y2={140 + r * 24} />
      ))}
      <line x1="346" y1="120" x2="346" y2="330" />
      <line x1="374" y1="120" x2="374" y2="330" />

      {/* right cluster */}
      <path d="M430 330 V200 H470 V330" />
      {Array.from({ length: 5 }).map((_, r) => (
        <line key={`r${r}`} x1="430" y1={216 + r * 22} x2="470" y2={216 + r * 22} />
      ))}
      <path d="M482 330 V170 L512 150 L512 330" />
      <line x1="482" y1="200" x2="512" y2="186" />
      <line x1="482" y1="230" x2="512" y2="222" />
      <line x1="482" y1="260" x2="512" y2="260" />
      <path d="M540 330 V236 H578 V330" />
      <path d="M548 236 V224 H570 V236" />

      {/* water tower */}
      <g>
        <path d="M250 250 h34 l-6 22 h-22 z" />
        <line x1="250" y1="262" x2="284" y2="262" />
        <path d="M256 272 v34 M278 272 v34" />
        <path d="M250 306 h34" />
      </g>
    </g>

    {/* ---- circling birds ---- */}
    <g className="ill-draw" opacity="0.85">
      <path d="M150 96 q12 -10 24 0 q12 -10 24 0" />
      <path d="M196 70 q9 -8 18 0 q9 -8 18 0" />
      <path d="M520 80 q10 -9 20 0 q10 -9 20 0" />
    </g>

    {/* ---- botanical sprigs framing the plate ---- */}
    <g className="ill-draw ill-botanical" opacity="0.92">
      {/* left sprig */}
      <path d="M58 360 C 78 320, 70 280, 96 250" />
      {[260, 285, 310, 335].map((y, i) => (
        <g key={`lf${i}`}>
          <path d={`M${82 - i * 2} ${y} q -18 -6 -30 -22`} />
          <path d={`M${84 - i * 2} ${y + 6} q 16 -4 30 -18`} />
        </g>
      ))}
      <circle cx="96" cy="250" r="3.5" />

      {/* right sprig (mirrored) */}
      <path d="M662 360 C 642 320, 650 280, 624 250" />
      {[260, 285, 310, 335].map((y, i) => (
        <g key={`rf${i}`}>
          <path d={`M${638 + i * 2} ${y} q 18 -6 30 -22`} />
          <path d={`M${636 + i * 2} ${y + 6} q -16 -4 -30 -18`} />
        </g>
      ))}
      <circle cx="624" cy="250" r="3.5" />
    </g>

    {/* thin framing flourish */}
    <g className="ill-draw" opacity="0.5">
      <path d="M40 372 H680" strokeDasharray="1 7" />
    </g>
  </svg>
);

const DividerPlate = () => (
  <svg
    className="ill-svg ill-divider-svg"
    viewBox="0 0 720 70"
    role="img"
    aria-label="Engraving-style botanical divider"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <g className="ill-draw">
      <line x1="0" y1="35" x2="280" y2="35" />
      <line x1="440" y1="35" x2="720" y2="35" />
      {/* central rosette */}
      <circle cx="360" cy="35" r="14" />
      <circle cx="360" cy="35" r="4" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={360 + Math.cos(a) * 14}
            y1={35 + Math.sin(a) * 14}
            x2={360 + Math.cos(a) * 21}
            y2={35 + Math.sin(a) * 21}
          />
        );
      })}
      {/* leaf scrolls */}
      <path d="M346 35 C 322 18, 300 18, 286 35 C 300 52, 322 52, 346 35 Z" />
      <path d="M374 35 C 398 18, 420 18, 434 35 C 420 52, 398 52, 374 35 Z" />
      <path d="M286 35 q -10 -14 -26 -16" />
      <path d="M434 35 q 10 -14 26 -16" />
      <circle cx="258" cy="18" r="2.5" />
      <circle cx="462" cy="18" r="2.5" />
    </g>
  </svg>
);

const Illustration = ({ variant = 'hero', className = '' }) => (
  <div className={`ill ill-${variant} ${className}`} aria-hidden={variant === 'divider' ? 'true' : undefined}>
    {variant === 'divider' ? <DividerPlate /> : <HeroPlate />}
  </div>
);

export default Illustration;
