// Pure, deterministic radial layout for the Work Map.
// Center -> group ring -> role ring -> skill diamonds -> benchmark dot clouds.
// Positions are seeded (stable across re-renders) so the map never jumps.

export const VIEW = 1200; // square coordinate space
const CX = VIEW / 2;
const CY = VIEW / 2;

const R_GROUP = 175;
const R_ROLE = 360;
const R_SKILL = 452;
const R_BENCH = 512;

const TWO_PI = Math.PI * 2;

function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// small seeded PRNG (mulberry32)
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function polar(r, angle) {
  return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
}

const clamp01 = (n) => Math.max(0, Math.min(1, n));

/**
 * @returns {{ center, groups, roles, skills, benchmarks, links, view:number }}
 * Each node: { id, x, y, groupId, ... }. links: { id, x1, y1, x2, y2, groupId, tier }.
 */
export function buildLayout(data) {
  const groupsIn = data.groups || [];
  const G = groupsIn.length || 1;
  const sector = TWO_PI / G;

  const center = { id: '__center', x: CX, y: CY, name: data.center || 'HUMAN WORK' };
  const groups = [];
  const roles = [];
  const skills = [];
  const benchmarks = [];
  const links = [];

  groupsIn.forEach((g, gi) => {
    const gAngle = -Math.PI / 2 + sector * gi; // start at top
    const gPos = polar(R_GROUP, gAngle);
    const roleList = g.roles || [];
    const coverage =
      roleList.length > 0
        ? roleList.reduce((s, r) => s + (r.coverage || 0), 0) / roleList.length
        : 0;

    groups.push({
      id: g.id,
      groupId: g.id,
      name: g.name,
      color: g.color,
      angle: gAngle,
      coverage,
      roleCount: roleList.length,
      x: gPos.x,
      y: gPos.y,
    });
    links.push({ id: `c-${g.id}`, tier: 'center', groupId: g.id, x1: CX, y1: CY, x2: gPos.x, y2: gPos.y });

    // roles fan across the group's angular sector
    const spread = sector * 0.66;
    roleList.forEach((r, ri) => {
      const t = roleList.length > 1 ? ri / (roleList.length - 1) - 0.5 : 0;
      const rAngle = gAngle + t * spread;
      const rPos = polar(R_ROLE, rAngle);
      const rand = rng(hashStr(g.id + r.id));

      roles.push({
        id: r.id,
        groupId: g.id,
        name: r.name,
        color: g.color,
        coverage: clamp01(r.coverage || 0),
        skillCount: (r.skills || []).length,
        angle: rAngle,
        x: rPos.x,
        y: rPos.y,
        raw: r,
      });
      links.push({ id: `g-${r.id}`, tier: 'group', groupId: g.id, x1: gPos.x, y1: gPos.y, x2: rPos.x, y2: rPos.y });

      const skillList = r.skills || [];
      skillList.forEach((sk, si) => {
        const st = skillList.length > 1 ? si / (skillList.length - 1) - 0.5 : 0;
        const sAngle = rAngle + st * spread * 0.42 + (rand() - 0.5) * 0.05;
        const sPos = polar(R_SKILL + (rand() - 0.5) * 26, sAngle);
        const skillId = `${r.id}__${si}`;

        skills.push({
          id: skillId,
          roleId: r.id,
          groupId: g.id,
          name: sk.name,
          color: g.color,
          score: clamp01(sk.score || 0),
          x: sPos.x,
          y: sPos.y,
        });
        links.push({ id: `r-${skillId}`, tier: 'role', groupId: g.id, roleId: r.id, x1: rPos.x, y1: rPos.y, x2: sPos.x, y2: sPos.y });

        // benchmark dots scatter in a small cloud beyond each skill
        const benchList = sk.benchmarks || [];
        benchList.forEach((b, bi) => {
          const jAngle = sAngle + (rand() - 0.5) * 0.16;
          const jr = R_BENCH + rand() * 64;
          const bPos = polar(jr, jAngle);
          benchmarks.push({
            id: `${skillId}__b${bi}`,
            roleId: r.id,
            groupId: g.id,
            skill: sk.name,
            name: b.name,
            score: clamp01(b.score || 0),
            strength: b.strength === 'direct' ? 'direct' : 'weak',
            color: g.color,
            x: bPos.x,
            y: bPos.y,
          });
        });
      });
    });
  });

  return { center, groups, roles, skills, benchmarks, links, view: VIEW };
}

// coverage/score -> ring dash fraction helper (0..circumference)
export function ringDash(fraction, radius) {
  const c = TWO_PI * radius;
  const on = clamp01(fraction) * c;
  return `${on} ${c - on}`;
}
