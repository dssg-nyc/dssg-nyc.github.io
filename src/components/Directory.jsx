import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import './Directory.css';
import directoryData from '../data/directory.json';

// Parallel filter dimensions rendered as horizontal pill selectors.
const AXES = [
  { key: 'focus', label: 'Focus area' },
  { key: 'type', label: 'Type' },
  { key: 'skills', label: 'Skill', multi: true },
  { key: 'status', label: 'Status' },
  { key: 'audience', label: 'For' },
  { key: 'place', label: 'Location' },
];

const valuesOf = (item, axis) => (axis.multi ? item[axis.key] : [item[axis.key]]);

// Unique values per axis, preserving first-seen order.
const optionsByAxis = AXES.reduce((acc, axis) => {
  const seen = [];
  directoryData.forEach((item) => {
    valuesOf(item, axis).forEach((v) => {
      if (v && !seen.includes(v)) seen.push(v);
    });
  });
  acc[axis.key] = seen;
  return acc;
}, {});

const emptySelection = () =>
  AXES.reduce((acc, axis) => ({ ...acc, [axis.key]: [] }), {});

const Directory = () => {
  const [selected, setSelected] = useState(emptySelection);

  const matched = useMemo(
    () =>
      directoryData.filter((item) =>
        AXES.every((axis) => {
          const picks = selected[axis.key];
          if (!picks.length) return true;
          return valuesOf(item, axis).some((v) => picks.includes(v));
        })
      ),
    [selected]
  );

  const activeCount = AXES.reduce((n, a) => n + selected[a.key].length, 0);

  const togglePill = (axisKey, value) => {
    setSelected((prev) => {
      const picks = prev[axisKey];
      return {
        ...prev,
        [axisKey]: picks.includes(value)
          ? picks.filter((v) => v !== value)
          : [...picks, value],
      };
    });
  };

  const clearAxis = (axisKey) =>
    setSelected((prev) => ({ ...prev, [axisKey]: [] }));

  const resetAll = () => setSelected(emptySelection());

  // ---- FLIP: smoothly reflow surviving cards instead of snapping ----
  const gridRef = useRef(null);
  const prevRects = useRef(new Map());

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = grid.querySelectorAll('[data-key]');

    nodes.forEach((node) => {
      const key = node.getAttribute('data-key');
      const next = node.getBoundingClientRect();
      const prev = prevRects.current.get(key);

      if (!prev) {
        // entering card: quiet fade + small rise
        if (!reduce) {
          node.animate(
            [
              { opacity: 0, transform: 'translateY(12px) scale(0.98)' },
              { opacity: 1, transform: 'none' },
            ],
            { duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
          );
        }
      } else if (!reduce) {
        const dx = prev.left - next.left;
        const dy = prev.top - next.top;
        if (dx || dy) {
          node.animate(
            [
              { transform: `translate(${dx}px, ${dy}px)` },
              { transform: 'none' },
            ],
            { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
          );
        }
      }
    });

    const map = new Map();
    nodes.forEach((node) => map.set(node.getAttribute('data-key'), node.getBoundingClientRect()));
    prevRects.current = map;
  }, [matched]);

  return (
    <section className="directory" id="initiatives">
      <div className="container">
        <header className="directory-head reveal">
          <p className="eyebrow">The work</p>
          <h2 className="section-title">Initiatives &amp; ways to plug in</h2>
          <p className="section-subtitle">
            Every card is a real project, program, or service. Filter by what you
            care about — the grid responds instantly.
          </p>
        </header>

        {/* ---- Multi-axis filter rail ---- */}
        <div className="filters reveal" style={{ '--reveal-delay': '60ms' }}>
          {AXES.map((axis) => {
            const picks = selected[axis.key];
            return (
              <div className="filter-axis" key={axis.key}>
                <div className="filter-axis-head">
                  <span className="filter-axis-label">{axis.label}</span>
                  {picks.length > 0 && (
                    <button
                      type="button"
                      className="axis-clear"
                      onClick={() => clearAxis(axis.key)}
                      aria-label={`Clear ${axis.label} filter`}
                    >
                      &times;
                    </button>
                  )}
                </div>
                <div className="filter-pills" role="group" aria-label={axis.label}>
                  {optionsByAxis[axis.key].map((value) => {
                    const on = picks.includes(value);
                    return (
                      <button
                        type="button"
                        key={value}
                        className={`pill ${on ? 'is-on' : ''}`}
                        aria-pressed={on}
                        onClick={() => togglePill(axis.key, value)}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="filters-foot">
            <span className="result-count">
              {matched.length} {matched.length === 1 ? 'result' : 'results'}
            </span>
            <button
              type="button"
              className="reset-all"
              onClick={resetAll}
              disabled={activeCount === 0}
            >
              Reset all
            </button>
          </div>
        </div>

        {/* ---- Card grid ---- */}
        {matched.length > 0 ? (
          <div className="directory-grid" ref={gridRef}>
            {matched.map((item) => {
              const external = /^https?:\/\//.test(item.url);
              return (
                <article className="dir-card" data-key={item.title} key={item.title}>
                  <div className="dir-card-top">
                    <span className={`dir-status status-${item.status.replace(/\s+/g, '-').toLowerCase()}`}>
                      {item.status}
                    </span>
                    <span className="dir-type">{item.type}</span>
                  </div>
                  <h3 className="dir-title">{item.title}</h3>
                  <p className="dir-blurb">{item.blurb}</p>
                  <div className="dir-tags">
                    <span className="dir-tag accent">{item.focus}</span>
                    {item.skills.map((s) => (
                      <span className="dir-tag" key={s}>{s}</span>
                    ))}
                  </div>
                  <a
                    className="dir-link"
                    href={item.url}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {item.cta} <span aria-hidden="true">&rarr;</span>
                  </a>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="directory-empty">
            <p className="empty-mark" aria-hidden="true">&mdash;</p>
            <p className="empty-text">
              Nothing matched your filters. Remove a few, or reset to see everything.
            </p>
            <button type="button" className="button secondary" onClick={resetAll}>
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Directory;
