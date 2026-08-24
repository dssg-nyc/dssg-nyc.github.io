# DSSG NYC — Scroll-Driven 3D Homepage Experience

Build spec + generation prompts + scroll-trigger mapping + R3F/GSAP integration for the
homepage narrative: **Hero → Problem A (youth/developer unemployment) → Problem B (NGO tech
starvation) → Solution (The Data Diplomats)**.

Aesthetic: modern split-tech **flat-vector / 3D-hybrid** — one avatar whose face is split
down the center (human half / algorithmic-lattice half), matching the reference art.

## Brand palette (locked into every generation + the scene)

| Token | Hex | Role |
|-------|-----|------|
| Navy | `#1D3557` | Structure, hair, dark surfaces, text |
| Orange | `#F95738` | Human half, warmth, primary CTA |
| Sky | `#4EA8DE` | Tech half, nodes, links |
| White | `#FFFFFF` | Collar, highlights, screen glow |
| Cream | `#EAE7DC` | Background, atmosphere |

---

## Asset manifest (generated via the media MCP — Higgsfield-portable)

Final shipped assets in `public/experience/`:

| Asset | Model | Key params | Output | Credits |
|-------|-------|-----------|--------|---------|
| `avatar-hero.png` (hero character) | `nano_banana_pro` (Google, image-to-image) | reference = the user's split-face avatar; prompt = "same exact avatar, cartoonish"; then `remove_background` for transparency | transparent PNG | ~4 |
| `sprite-laptop.svg` (State 2) | `recraft_v4_1` (Recraft V4.1) | `model_type=vector`, palette-locked | SVG | 1.25 |
| `sprite-ngo.svg` (State 3) | `recraft_v4_1` | `model_type=vector` | SVG | 1.25 |
| `sprite-ecosystem.svg` (State 4) | `recraft_v4_1` | `model_type=vector` | SVG | 1.25 |

> The hero avatar renders as a **2.5D textured plane** inside the R3F canvas (not a polygon mesh):
> a custom shader applies scroll-driven desaturation + per-half emissive glow while the camera
> dollies and pans in 3D for parallax depth. Flat cartoon art lifts poorly to a real mesh, so this
> keeps the character razor-sharp and on-brand. (An earlier `image_to_3d` Meshy GLB and Recraft
> avatars were explored, then dropped when the art direction settled on the cartoon reference.)

The **animated connective tissue** (node constellation, converging links, depleting grant bars,
desaturation, bloom) is **procedural** — R3F Points/lines plus CSS-variable-driven DOM — because
it must animate/desaturate/converge across scroll, which baked raster cannot do. The three
generated SVG sprites ride as depth-offset DOM billboards driven by the same scroll variables.

---

## Deliverable 1 — Higgsfield / MCP generation prompts per state

Each state lists: **image prompt**, **camera motion**, **light setup**, and **depth/normal**
guidance. Prompts are written to port 1:1 into Higgsfield's image / motion tools; the `colors`
array pins the palette on every call.

Shared negative direction: `no text, no watermark, no busy background, no extra characters`.
Shared `colors`: `["#1D3557","#F95738","#4EA8DE","#FFFFFF","#EAE7DC"]`.

### State 1 — Hero Landing

- **Image prompt:** *"Flat-vector-meets-3D hybrid portrait, single character, head and shoulders,
  front-facing and symmetrical. Face split vertically: left half a glowing sky-blue algorithmic
  circuit lattice (nodes, geometric plates, thin links); right half a warm-orange human face,
  calm and confident. Navy hair swept back, crisp white collar, flat warm-cream studio
  background, soft dimensional shading, centered, generous negative space."*
- **Camera motion:** slow push-in from wide establishing to mid — `z 6.5 → 5.0`, dead-center,
  a 3–5° idle yaw drift on the avatar. Balanced, inviting.
- **Light setup:** warm key (orange) camera-right + cool key (sky) camera-left at **equal**
  intensity (1.0 / 1.0), soft cream ambient (0.6). Both halves equally alive.
- **Depth/normal:** use the Meshy GLB's own geometry + vertex normals (no 2D depth map needed in
  the hybrid path). For an image-sequence fallback, run a depth-estimation pass on `avatar-3d.png`
  and drive a displacement plane.

### State 2 — Problem A: Youth & Developer Unemployment

- **Image prompt (supporting sprites):** *"Minimal flat-vector laptop icon, three-quarter view,
  navy + sky-blue, white screen glow, clean geometric, a sense of quiet isolation, transparent
  background."* Generate 3–5 as a drifting, disconnected cluster.
- **Camera motion:** dolly toward the **human (orange) half**, slight orbit so it faces camera —
  `pos → (-1.6, 0.0, 3.2)`, `lookAt (-0.5,0,0)`, avatar yaw `+0.35 rad`.
- **Light setup:** human key rises (1.0 → 1.4) but the **whole frame desaturates** toward cool
  grey (sat 0 → 0.7); tech key collapses (1.0 → 0.35); ambient dips (0.6 → 0.45). Laptop sprites
  and unlinked nodes drift **outward** (entropy). Melancholic, underutilized.
- **Depth/normal:** sprites are flat billboards on staggered `z` (−2 … +2) for parallax; no maps.

### State 3 — Problem B: NGO Funding & Tech Starvation

- **Image prompt (supporting sprite):** *"Minimal flat-vector classical non-profit civic building,
  front elevation, columns, small banner with a heart, navy + sky-blue with a subtle orange
  accent, iconic, transparent background."*
- **Camera motion:** pan across to the **algorithmic (sky) half** — `pos → (1.6, 0.1, 3.2)`,
  `lookAt (0.5,0,0)`, avatar yaw `-0.35 rad`.
- **Light setup:** tech key **decays** (0.9 → 0.35) — starvation; node scales shrink, link opacity
  fades, "grant bars" (procedural) deplete top-down. NGO building fades in dim. Frame stays
  desaturated (~0.6). Urgent, falling behind.
- **Depth/normal:** procedural beams use additive-blended planes fading to transparent — cheap
  glow, no postprocessing / no maps.

### State 4 — Solution: The Data Diplomats

- **Image prompt (emblem):** *"Flat-vector emblem of a thriving interconnected network ecosystem:
  a central glowing node radiating perfectly balanced orange and sky-blue links to smaller nodes
  in a unified circular mesh — unity of human warmth and technology, bold, symmetrical, iconic,
  transparent background."*
- **Camera motion:** pull back to centered front — `pos → (0, 0.15, 5.2)`, `lookAt (0,0,0)`,
  avatar yaw back to `0`. Convergence beat.
- **Light setup:** **both** keys surge (→ 1.6 / 1.6), emissive orange + sky bloom on both halves,
  desaturation releases (→ 0). A converging mesh **bridges** the drifted laptop nodes into the NGO
  core; the ecosystem emblem blooms; CTAs (**Volunteer** / **Get Advice**) resolve in.
- **Depth/normal:** convergence is animated node positions (`lerp` from scattered → mesh lattice)
  — pure geometry, GPU-cheap.

> Optional Higgsfield **motion/video** path: to pre-render transitions as a scrubbed video
> instead of live WebGL, feed `avatar-3d.png` + each state prompt into a Higgsfield image-to-video
> "camera move" generation (push-in / orbit / pull-back), export frames, and scrub on scroll.
> The live R3F path (below) is what this build ships.

---

## Deliverable 2 — Scroll-trigger mapping (0.0 → 1.0)

Single pinned section, ~`400vh` of scroll → normalized progress `p ∈ [0,1]`. deck values are
three.js world units (avatar ≈ 2u tall at origin, facing `+z`). Signs of `camX`/`yaw` are verified
against the loaded model at runtime.

| `p` | State | camX | camY | camZ | lookAt | yaw (rad) | humanLight | techLight | ambient | desat | Active elements |
|-----|-------|------|------|------|--------|-----------|-----------|-----------|---------|-------|-----------------|
| 0.00 | Hero settle | 0.0 | 0.20 | 6.5 | (0,0,0) | 0.00 | 1.0 | 1.0 | 0.60 | 0.0 | Avatar, balanced |
| 0.12 | Hero hold | 0.0 | 0.10 | 5.0 | (0,0,0) | +0.04 idle | 1.0 | 1.0 | 0.60 | 0.0 | Title + scroll cue |
| 0.22 | → Problem A | -0.8 | 0.05 | 4.0 | (-0.3,0,0) | +0.18 | 1.2 | 0.6 | 0.52 | 0.4 | Laptops begin drift |
| 0.35 | Problem A peak | -1.6 | 0.00 | 3.2 | (-0.5,0,0) | +0.35 | 1.4 | 0.35 | 0.45 | 0.7 | Laptops/nodes scattered |
| 0.48 | → Problem B | 0.6 | 0.05 | 3.4 | (0.2,0,0) | -0.10 | 0.7 | 0.9 | 0.48 | 0.65 | NGO fades in |
| 0.60 | Problem B peak | 1.6 | 0.10 | 3.2 | (0.5,0,0) | -0.35 | 0.5 | 0.35 | 0.45 | 0.6 | Grant bars deplete, links decay |
| 0.74 | → Solution | 0.8 | 0.12 | 4.2 | (0.2,0,0) | -0.12 | 1.1 | 1.1 | 0.55 | 0.3 | Mesh starts bridging |
| 0.88 | Convergence | 0.2 | 0.15 | 4.8 | (0,0,0) | 0.00 | 1.6 | 1.6 | 0.65 | 0.0 | Full mesh + emblem bloom |
| 1.00 | Resolve / CTA | 0.0 | 0.15 | 5.2 | (0,0,0) | 0.00 | 1.5 | 1.5 | 0.62 | 0.0 | CTAs active |

All channels are **eased lerps** between rows (GSAP drives a single `progress` value; the render
loop interpolates). `desat` lerps each material's color toward its luminance-grey.

---

## Deliverable 3 — R3F + GSAP ScrollTrigger structure

Live implementation lives in `src/components/experience/`. Shape:

```jsx
// ExperienceCanvas.jsx — pinned <Canvas>, single source of truth = scrollProgress ref
import { Canvas } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Avatar from './Avatar'
import SceneRig from './SceneRig'
gsap.registerPlugin(ScrollTrigger)

export default function ExperienceCanvas() {
  const progress = useRef(0)            // 0..1, mutated by ScrollTrigger, read in useFrame
  const wrapRef = useRef(null)

  useGSAP(() => {                        // bind scroll depth -> progress ref
    ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,                          // smoothed, frame-independent
      onUpdate: (self) => { progress.current = self.progress },
    })
  }, { scope: wrapRef })

  return (
    <div ref={wrapRef} style={{ height: '400vh' }}>
      <div className="exp-sticky">       {/* position:sticky; top:0; height:100vh */}
        <Canvas camera={{ fov: 45, position: [0, 0.2, 6.5] }} dpr={[1, 1.75]}>
          <Suspense fallback={null}>
            <SceneRig progress={progress} />   {/* camera + lights + procedural nodes */}
            <Avatar progress={progress} />     {/* GLB, per-frame yaw + desat */}
          </Suspense>
        </Canvas>
        <StateOverlays progress={progress} /> {/* copy + CTAs, pointer-events on State 4 */}
      </div>
    </div>
  )
}
```

```jsx
// keyframe interpolation shared by camera + lights (from Deliverable 2 table)
import { KEYS } from './keyframes'          // the table above as an array
export function sample(p) {
  let a = KEYS[0], b = KEYS[KEYS.length - 1]
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (p >= KEYS[i].p && p <= KEYS[i + 1].p) { a = KEYS[i]; b = KEYS[i + 1]; break }
  }
  const t = a.p === b.p ? 0 : (p - a.p) / (b.p - a.p)
  const e = t * t * (3 - 2 * t)             // smoothstep
  return lerpKey(a, b, e)                   // returns {camX,camY,camZ,lookAt,yaw,human,tech,ambient,desat}
}
```

```jsx
// SceneRig.jsx — apply sampled state every frame (no React re-render on scroll)
useFrame(({ camera }) => {
  const s = sample(progress.current)
  camera.position.set(s.camX, s.camY, s.camZ)
  camera.lookAt(s.lookAt[0], s.lookAt[1], s.lookAt[2])
  humanLight.current.intensity = s.human
  techLight.current.intensity  = s.tech
  ambient.current.intensity    = s.ambient
  updateNodeField(s)                        // drift (State2) → decay (State3) → converge (State4)
})
```

State overlays are plain DOM (crisp text, a11y-friendly), opacity-cross-faded by the same
`progress` via `requestAnimationFrame` — the WebGL canvas never owns the copy or the buttons.

---

## Integration, performance & accessibility

- **Perf:** three + R3F + drei + gsap are lazy-loaded (`React.lazy` + dynamic import) so they stay
  out of the initial bundle. Measured production build: initial `index.js` ≈ **81 kB gzip**; the
  `Experience` chunk ≈ **270 kB gzip**, fetched only after first paint for motion-OK visitors. The
  static hero (`avatar-hero.png`) shows instantly; WebGL hydrates after. `dpr` capped at 1.75; the
  hero art is a single transparent PNG on a plane (no mesh to compress).
- **Reduced motion:** `prefers-reduced-motion: reduce` → skip the Canvas entirely, render the flat
  `avatar-hero.png` hero + the four narrative sections as static stacked panels with the same copy
  and CTAs. Same story, no motion.
- **No-WebGL / low-power:** feature-detect; on failure fall back to the same static panels.
- **GitHub Pages:** all assets are static under `public/experience/`; no server code. `.glb`,
  `.svg`, `.png` ship as-is.
- **CTAs preserved:** **Volunteer** (Data & IT Professionals) and **Get Advice** (Non-Profit
  Organizations) remain real links, revealed at State 4 and always present in the fallback.
