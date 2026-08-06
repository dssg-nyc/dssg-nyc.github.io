// Scroll keyframes for the DSSG NYC homepage 3D experience.
// A single scroll progress value `p` in [0,1] drives camera, lights, and mood.
// Values are three.js world units; the avatar plane sits ~2u tall at the origin,
// facing +z toward the camera. See HOMEPAGE_3D_EXPERIENCE.md (Deliverable 2).

export const KEYS = [
  { p: 0.0,  camX:  0.0, camY: 0.20, camZ: 6.5, lookX:  0.0, yaw:  0.0,  human: 1.0, tech: 1.0,  ambient: 0.6,  desat: 0.0 },
  { p: 0.12, camX:  0.0, camY: 0.10, camZ: 5.0, lookX:  0.0, yaw:  0.04, human: 1.0, tech: 1.0,  ambient: 0.6,  desat: 0.0 },
  { p: 0.22, camX: -0.8, camY: 0.05, camZ: 4.0, lookX: -0.3, yaw:  0.18, human: 1.2, tech: 0.6,  ambient: 0.52, desat: 0.4 },
  { p: 0.35, camX: -1.6, camY: 0.00, camZ: 3.2, lookX: -0.5, yaw:  0.35, human: 1.4, tech: 0.35, ambient: 0.45, desat: 0.7 },
  { p: 0.48, camX:  0.6, camY: 0.05, camZ: 3.4, lookX:  0.2, yaw: -0.10, human: 0.7, tech: 0.9,  ambient: 0.48, desat: 0.65 },
  { p: 0.6,  camX:  1.6, camY: 0.10, camZ: 3.2, lookX:  0.5, yaw: -0.35, human: 0.5, tech: 0.35, ambient: 0.45, desat: 0.6 },
  { p: 0.74, camX:  0.8, camY: 0.12, camZ: 4.2, lookX:  0.2, yaw: -0.12, human: 1.1, tech: 1.1,  ambient: 0.55, desat: 0.3 },
  { p: 0.88, camX:  0.2, camY: 0.15, camZ: 4.8, lookX:  0.0, yaw:  0.0,  human: 1.6, tech: 1.6,  ambient: 0.65, desat: 0.0 },
  { p: 1.0,  camX:  0.0, camY: 0.15, camZ: 5.2, lookX:  0.0, yaw:  0.0,  human: 1.5, tech: 1.5,  ambient: 0.62, desat: 0.0 },
]

const CHANNELS = ['camX', 'camY', 'camZ', 'lookX', 'yaw', 'human', 'tech', 'ambient', 'desat']

export const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x)
export const lerp = (a, b, t) => a + (b - a) * t
const smoothstep = (t) => t * t * (3 - 2 * t)

/** Interpolate all channels at scroll progress `p` with eased (smoothstep) blending. */
export function sample(p) {
  const x = clamp01(p)
  let a = KEYS[0]
  let b = KEYS[KEYS.length - 1]
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (x >= KEYS[i].p && x <= KEYS[i + 1].p) {
      a = KEYS[i]
      b = KEYS[i + 1]
      break
    }
  }
  const span = b.p - a.p
  const t = span <= 0 ? 0 : smoothstep((x - a.p) / span)
  const out = {}
  for (const k of CHANNELS) out[k] = lerp(a[k], b[k], t)
  return out
}

/** Ramp up over [in0,in1], hold, ramp down over [out0,out1]. Returns 0..1. */
export function windowRamp(p, in0, in1, out0, out1) {
  if (p <= in0 || p >= out1) return 0
  if (p < in1) return smoothstep((p - in0) / (in1 - in0))
  if (p <= out0) return 1
  return 1 - smoothstep((p - out0) / (out1 - out0))
}

/** Narrative phase factors (0..1) for procedural elements + DOM overlays. */
export const phases = (p) => ({
  hero: windowRamp(p, -1, 0.0, 0.12, 0.22),
  problemA: windowRamp(p, 0.16, 0.28, 0.4, 0.5), // youth & developer unemployment
  problemB: windowRamp(p, 0.46, 0.56, 0.66, 0.76), // NGO tech starvation
  solution: windowRamp(p, 0.72, 0.86, 1.1, 1.2), // the data diplomats
  drift: clamp01((p - 0.16) / 0.2), // laptop nodes scatter outward
  converge: clamp01((p - 0.72) / 0.22), // mesh bridges + emblem bloom
})
