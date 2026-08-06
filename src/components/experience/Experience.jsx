import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ExperienceScene from './ExperienceScene'
import { phases } from './keyframes'
import './experience.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll-driven 3D homepage narrative: Hero -> Problem A -> Problem B -> Solution.
 * A single ScrollTrigger writes a progress ref (read by the R3F render loop) plus a
 * set of CSS custom properties that drive the DOM overlays and sprite billboards.
 * Copy + CTA links are passed in as props so this module owns no data files.
 */
export default function Experience({
  title = 'NYC Data Science for Social Good',
  description = '',
  primaryCta = { label: 'Volunteer', href: '/get-involved' },
  secondaryCta = { label: 'Get Advice', href: '/partner-with-us' },
}) {
  const wrapRef = useRef(null)
  const stickyRef = useRef(null)
  const progress = useRef(0)

  useEffect(() => {
    const sticky = stickyRef.current
    const apply = (p) => {
      progress.current = p
      const ph = phases(p)
      const s = sticky.style
      s.setProperty('--p', p.toFixed(4))
      s.setProperty('--drift', (ph.drift * (1 - ph.converge)).toFixed(3))
      s.setProperty('--conv', ph.converge.toFixed(3))
      s.setProperty('--op-hero', ph.hero.toFixed(3))
      s.setProperty('--op-a', ph.problemA.toFixed(3))
      s.setProperty('--op-b', ph.problemB.toFixed(3))
      s.setProperty('--op-sol', ph.solution.toFixed(3))
      s.setProperty('--mood-dark', (Math.max(ph.problemA, ph.problemB) * 0.9).toFixed(3))
      s.setProperty('--mood-warm', (ph.solution * 0.5).toFixed(3))
      sticky.dataset.sol = ph.solution > 0.5 ? '1' : '0'
    }
    apply(0)
    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => apply(self.progress),
    })
    return () => st.kill()
  }, [])

  return (
    <section className="exp-wrap" ref={wrapRef} aria-label="Our story, in four chapters">
      <div className="exp-sticky" ref={stickyRef} data-sol="0">
        <div className="exp-mood exp-mood--dark" aria-hidden="true" />
        <div className="exp-mood exp-mood--warm" aria-hidden="true" />

        <div className="exp-canvas">
          <Suspense fallback={null}>
            <Canvas
              dpr={[1, 1.75]}
              gl={{ antialias: true, alpha: true }}
              camera={{ fov: 45, position: [0, 0.2, 6.5] }}
            >
              <ExperienceScene progress={progress} />
            </Canvas>
          </Suspense>
        </div>

        <div className="exp-sprites" aria-hidden="true">
          <div className="exp-laptops">
            <img className="exp-laptop l1" src="/experience/sprite-laptop.svg" alt="" />
            <img className="exp-laptop l2" src="/experience/sprite-laptop.svg" alt="" />
            <img className="exp-laptop l3" src="/experience/sprite-laptop.svg" alt="" />
          </div>
          <img className="exp-ngo" src="/experience/sprite-ngo.svg" alt="" />
          <div className="exp-bars">
            {[0, 1, 2, 3, 4].map((i) => (
              <span className="exp-bar" key={i} style={{ '--i': i }} />
            ))}
          </div>
          <img className="exp-eco" src="/experience/sprite-ecosystem.svg" alt="" />
        </div>

        <div className="exp-overlays">
          <div className="exp-block exp-hero">
            <p className="exp-eyebrow">Data Science for Social Good · NYC</p>
            <h1 className="exp-title">{title}</h1>
            <p className="exp-lead">{description}</p>
            <p className="exp-scrollcue">Scroll to see why we exist ↓</p>
          </div>

          <div className="exp-block exp-a">
            <p className="exp-eyebrow">The problem, part one</p>
            <h2 className="exp-headline">Local talent, left idle.</h2>
            <p className="exp-body">
              Skilled young developers — many from underserved NYC communities — sit
              underemployed while their potential fragments and drifts apart.
            </p>
          </div>

          <div className="exp-block exp-b">
            <p className="exp-eyebrow">The problem, part two</p>
            <h2 className="exp-headline">Nonprofits, starved of tech.</h2>
            <p className="exp-body">
              Mission-driven organizations fall behind as funding thins and modern,
              human-centered technology stays out of reach.
            </p>
          </div>

          <div className="exp-block exp-sol">
            <p className="exp-eyebrow">The solution</p>
            <h2 className="exp-headline">The Data Diplomats.</h2>
            <p className="exp-body">
              We connect displaced technologists directly into nonprofit
              infrastructure — one integrated network, pro bono, for social good.
            </p>
            <div className="exp-cta-row">
              <a
                className="exp-cta exp-cta--primary"
                href={primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {primaryCta.label}
              </a>
              <a
                className="exp-cta exp-cta--ghost"
                href={secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
