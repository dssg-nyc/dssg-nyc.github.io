import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import './workmap.css';
import workmapData from '../../data/workmap.json';
import { buildLayout, ringDash, VIEW } from './layout';

const DIM = 0.1; // opacity for de-emphasised nodes
const ZOOM_MIN = 0.6;
const ZOOM_MAX = 6;

export default function WorkMap({ data = workmapData }) {
  const layout = useMemo(() => buildLayout(data), [data]);
  const roleById = useMemo(() => {
    const m = {};
    layout.roles.forEach((r) => (m[r.id] = r));
    return m;
  }, [layout]);

  const [sector, setSector] = useState('all'); // group id or 'all'
  const [focusText, setFocusText] = useState('');
  const [hoverGroup, setHoverGroup] = useState(null);
  const [hoverRole, setHoverRole] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [zoom, setZoom] = useState({ s: 1, x: 0, y: 0 });

  const svgRef = useRef(null);
  const drag = useRef(null);

  // resolve the role the focus box points at (exact name match)
  const focusRoleId = useMemo(() => {
    const q = focusText.trim().toLowerCase();
    if (!q) return null;
    const hit = layout.roles.find((r) => r.name.toLowerCase() === q);
    return hit ? hit.id : null;
  }, [focusText, layout]);

  const selectedRole = selectedRoleId ? roleById[selectedRoleId] : null;

  // active isolation targets (hover wins, then explicit selection/filter)
  const activeGroup = hoverGroup || (sector !== 'all' ? sector : null);
  const activeRoleId = hoverRole || focusRoleId || selectedRoleId;
  const activeRole = activeRoleId ? roleById[activeRoleId] : null;
  const isolating = Boolean(activeGroup || activeRole);

  const reset = useCallback(() => {
    setSector('all');
    setFocusText('');
    setHoverGroup(null);
    setHoverRole(null);
    setSelectedRoleId(null);
    setZoom({ s: 1, x: 0, y: 0 });
  }, []);

  // opacity for a node given current isolation state
  const opacityFor = useCallback(
    (node) => {
      if (!isolating) return 1;
      if (activeRole) {
        if (node.id === activeRole.id) return 1;
        if (node.roleId === activeRole.id) return 1; // skills/benchmarks of that role
        if (node.groupId === activeRole.groupId) return 0.28;
        return DIM;
      }
      return node.groupId === activeGroup ? 1 : DIM;
    },
    [isolating, activeRole, activeGroup]
  );

  const linkOpacity = useCallback(
    (link) => {
      if (!isolating) return 0.14;
      if (activeRole) {
        if (link.roleId === activeRole.id) return 0.4;
        if (link.groupId === activeRole.groupId && link.tier !== 'role') return 0.16;
        return 0.03;
      }
      return link.groupId === activeGroup ? 0.28 : 0.03;
    },
    [isolating, activeRole, activeGroup]
  );

  // ---- zoom (wheel, non-passive so we can preventDefault) ----
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * VIEW;
      const py = ((e.clientY - rect.top) / rect.height) * VIEW;
      setZoom((z) => {
        const factor = Math.exp(-e.deltaY * 0.0015);
        const s2 = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z.s * factor));
        const wx = (px - z.x) / z.s;
        const wy = (py - z.y) / z.s;
        return { s: s2, x: px - wx * s2, y: py - wy * s2 };
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY, ox: zoom.x, oy: zoom.y };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const dx = ((e.clientX - drag.current.x) / rect.width) * VIEW;
    const dy = ((e.clientY - drag.current.y) / rect.height) * VIEW;
    setZoom((z) => ({ ...z, x: drag.current.ox + dx, y: drag.current.oy + dy }));
  };
  const endDrag = () => {
    drag.current = null;
  };

  const showRoleLabel = (r) =>
    !isolating || r.groupId === activeGroup || (activeRole && r.groupId === activeRole.groupId);

  return (
    <div className="wm">
      <div className="wm-topbar">
        <div className="wm-field">
          <label>WORK SETTING</label>
          <select value={sector} onChange={(e) => setSector(e.target.value)}>
            <option value="all">All sectors</option>
            {layout.groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <div className="wm-field">
          <input
            list="wm-roles"
            placeholder="Focus role…"
            value={focusText}
            onChange={(e) => setFocusText(e.target.value)}
          />
          <datalist id="wm-roles">
            {layout.roles.map((r) => (
              <option key={r.id} value={r.name} />
            ))}
          </datalist>
        </div>
        <button className="wm-reset" onClick={reset}>
          Reset
        </button>
        <p className="wm-caption">
          each group is a color · benchmark dots: <b>pale</b> = weak/thin, <b>deep</b> = direct evidence
          <span className="wm-shapes"> ○ ◇ ● job · skill/task · benchmark</span>
        </p>
      </div>

      <div className="wm-stage">
        <svg
          ref={svgRef}
          className="wm-svg"
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          role="img"
          aria-label="Interactive work map of jobs, skills and AI benchmark evidence"
        >
          <g transform={`translate(${zoom.x} ${zoom.y}) scale(${zoom.s})`}>
            {/* links */}
            <g>
              {layout.links.map((l) => (
                <line
                  key={l.id}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  stroke="#8a8578"
                  strokeWidth={l.tier === 'center' ? 1.1 : 0.7}
                  opacity={linkOpacity(l)}
                />
              ))}
            </g>

            {/* benchmark dots */}
            <g>
              {layout.benchmarks.map((b) => {
                const deep = b.strength === 'direct';
                const op = (deep ? 0.55 + 0.45 * b.score : 0.2 + 0.4 * b.score) * opacityFor(b);
                return (
                  <circle
                    key={b.id}
                    cx={b.x}
                    cy={b.y}
                    r={3 + b.score * 2.6}
                    fill={b.color}
                    opacity={op}
                  />
                );
              })}
            </g>

            {/* skill diamonds */}
            <g>
              {layout.skills.map((s) => {
                const size = 6 + s.score * 4;
                return (
                  <rect
                    key={s.id}
                    x={s.x - size / 2}
                    y={s.y - size / 2}
                    width={size}
                    height={size}
                    transform={`rotate(45 ${s.x} ${s.y})`}
                    fill={s.color}
                    fillOpacity={0.25 + 0.55 * s.score}
                    stroke={s.color}
                    strokeWidth={0.8}
                    opacity={opacityFor(s)}
                  />
                );
              })}
            </g>

            {/* role rings (job nodes) with coverage arc */}
            <g>
              {layout.roles.map((r) => {
                const on = r.id === activeRoleId;
                const R = on ? 13 : 10;
                return (
                  <g
                    key={r.id}
                    opacity={opacityFor(r)}
                    className="wm-role"
                    onMouseEnter={() => setHoverRole(r.id)}
                    onMouseLeave={() => setHoverRole(null)}
                    onClick={() => setSelectedRoleId((cur) => (cur === r.id ? null : r.id))}
                  >
                    <circle cx={r.x} cy={r.y} r={R} fill="#fbfaf7" stroke={r.color} strokeWidth={on ? 3 : 2} />
                    <circle
                      cx={r.x}
                      cy={r.y}
                      r={R}
                      fill="none"
                      stroke={r.color}
                      strokeWidth={on ? 3 : 2.4}
                      strokeDasharray={ringDash(r.coverage, R)}
                      transform={`rotate(-90 ${r.x} ${r.y})`}
                      strokeLinecap="round"
                    />
                    {showRoleLabel(r) && (
                      <text className="wm-role-label" x={r.x} y={r.y - R - 5} textAnchor="middle">
                        {r.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>

            {/* group labels */}
            <g>
              {layout.groups.map((g) => (
                <text
                  key={g.id}
                  className="wm-group-label"
                  x={g.x}
                  y={g.y}
                  fill={g.color}
                  textAnchor="middle"
                  opacity={!isolating || g.id === activeGroup || (activeRole && g.id === activeRole.groupId) ? 1 : DIM}
                  onMouseEnter={() => setHoverGroup(g.id)}
                  onMouseLeave={() => setHoverGroup(null)}
                >
                  {g.name}
                </text>
              ))}
            </g>

            {/* center */}
            <g>
              <circle cx={layout.center.x} cy={layout.center.y} r={30} fill="#1d3557" />
              <text className="wm-center-label" x={layout.center.x} y={layout.center.y} textAnchor="middle">
                <tspan x={layout.center.x} dy="-0.1em">HUMAN</tspan>
                <tspan x={layout.center.x} dy="1.05em">WORK</tspan>
              </text>
            </g>
          </g>
        </svg>

        <WorkMapLegend />

        {selectedRole && <EvidencePanel role={selectedRole} onClose={() => setSelectedRoleId(null)} />}
      </div>

      <p className="wm-hint">hover a group or role to isolate it · scroll = zoom · drag = pan · click a role for evidence</p>
    </div>
  );
}

function WorkMapLegend() {
  return (
    <div className="wm-legend" aria-hidden="true">
      <div className="wm-legend-row">
        <span className="wm-lg-job" /> <span className="wm-lg-skill" /> <span className="wm-lg-bench" />
        <span>shape = job / skill-task / benchmark</span>
      </div>
      <div className="wm-legend-row">
        <span className="wm-lg-dot d1" /> <span className="wm-lg-dot d2" /> <span className="wm-lg-dot d3" />
        <span>dot intensity = coverage / score</span>
      </div>
      <div className="wm-legend-row">
        <span className="wm-lg-bar" />
        <span>ring = role aggregate coverage · colour = group</span>
      </div>
    </div>
  );
}

function EvidencePanel({ role, onClose }) {
  const skills = role.raw.skills || [];
  const pct = (n) => `${Math.round(n * 100)}%`;
  return (
    <aside className="wm-panel">
      <div className="wm-panel-head" style={{ borderColor: role.color }}>
        <div>
          <p className="wm-panel-eyebrow" style={{ color: role.color }}>
            Role evidence
          </p>
          <h3>{role.name}</h3>
          <p className="wm-panel-cov">
            Aggregate coverage <b>{pct(role.coverage)}</b> · {skills.length} skills
          </p>
        </div>
        <button className="wm-panel-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      <ul className="wm-skill-list">
        {skills.map((s, i) => (
          <li key={i}>
            <div className="wm-skill-top">
              <span className="wm-skill-name">{s.name}</span>
              <span className="wm-skill-score">{pct(s.score)}</span>
            </div>
            <div className="wm-skill-bar">
              <span style={{ width: pct(s.score), background: role.color }} />
            </div>
            <div className="wm-bench-row">
              {(s.benchmarks || []).length === 0 && <span className="wm-bench-none">no benchmark evidence</span>}
              {(s.benchmarks || []).map((b, j) => (
                <span
                  key={j}
                  className={`wm-bench-chip ${b.strength === 'direct' ? 'direct' : 'weak'}`}
                  style={{ '--c': role.color }}
                >
                  {b.name} · {pct(b.score)}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
