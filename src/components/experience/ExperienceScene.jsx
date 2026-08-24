import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { sample, phases, lerp } from './keyframes'

const SKY = new THREE.Color('#4EA8DE')
const ORANGE = new THREE.Color('#F95738')
const NODE_COUNT = 40

// Avatar: flat cartoon on a plane. Shader adds desaturation (problem states)
// and per-half emissive glow (left = tech/sky, right = human/orange).
const avatarVert = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`
const avatarFrag = `
  uniform sampler2D uMap; uniform float uDesat, uHuman, uTech;
  uniform vec3 uHumanColor, uTechColor; varying vec2 vUv;
  void main() {
    vec4 tex = texture2D(uMap, vUv);
    if (tex.a < 0.02) discard;
    vec3 col = tex.rgb;
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, vec3(lum), uDesat);
    float rightMask = smoothstep(0.46, 0.54, vUv.x);
    float leftMask = 1.0 - rightMask;
    float techB = mix(0.45, 1.12, clamp(uTech / 1.6, 0.0, 1.0));
    float humanB = mix(0.45, 1.12, clamp(uHuman / 1.6, 0.0, 1.0));
    col *= leftMask * techB + rightMask * humanB;
    col += uTechColor * max(uTech - 1.05, 0.0) * leftMask * 0.8;
    col += uHumanColor * max(uHuman - 1.05, 0.0) * rightMask * 0.8;
    gl_FragColor = vec4(col, tex.a);
  }`

function radialTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(64, 64, 4, 64, 64, 64)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.4, 'rgba(255,255,255,0.5)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
}

function buildNodes() {
  const scattered = []
  const converged = []
  const colors = []
  for (let i = 0; i < NODE_COUNT; i++) {
    const side = i % 2 === 0 ? -1 : 1 // left = developers, right = NGO core
    converged.push(new THREE.Vector3(side * (1.4 + Math.random() * 0.9), -0.9 + Math.random() * 2.0, -1.6 + Math.random() * 1.2))
    const a = Math.random() * Math.PI * 2
    const r = 3.2 + Math.random() * 2.4
    scattered.push(new THREE.Vector3(Math.cos(a) * r, (Math.random() - 0.5) * 4.5, -0.5 - Math.random() * 2.5))
    colors.push(new THREE.Color().lerpColors(SKY, ORANGE, side < 0 ? 0.15 : 0.85))
  }
  const links = []
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (converged[i].distanceTo(converged[j]) < 1.5) links.push([i, j])
    }
  }
  return { scattered, converged, colors, links }
}

export default function ExperienceScene({ progress }) {
  const { camera } = useThree()
  const groupRef = useRef()
  const matRef = useRef()
  const nodeRefs = useRef([])
  const linesRef = useRef()
  const bloomRef = useRef()

  const map = useTexture('/experience/avatar-hero.png')
  map.colorSpace = THREE.SRGBColorSpace

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uMap: { value: map },
          uDesat: { value: 0 },
          uHuman: { value: 1 },
          uTech: { value: 1 },
          uHumanColor: { value: ORANGE },
          uTechColor: { value: SKY },
        },
        vertexShader: avatarVert,
        fragmentShader: avatarFrag,
      }),
    [map]
  )
  matRef.current = material

  const nodes = useMemo(buildNodes, [])
  const bloomTex = useMemo(radialTexture, [])
  const live = useMemo(() => nodes.scattered.map((v) => v.clone()), [nodes])
  const linkGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(nodes.links.length * 6), 3))
    return g
  }, [nodes])

  useFrame((state) => {
    const p = progress.current ?? 0
    const s = sample(p)
    const ph = phases(p)
    const t = state.clock.elapsedTime

    camera.position.set(s.camX, s.camY + Math.sin(t * 0.4) * 0.03, s.camZ)
    camera.lookAt(s.lookX, 0, 0)

    if (groupRef.current) {
      groupRef.current.rotation.y = s.yaw
      groupRef.current.position.y = 0.28 + Math.sin(t * 0.6) * 0.025
    }
    if (matRef.current) {
      matRef.current.uniforms.uDesat.value = s.desat
      matRef.current.uniforms.uHuman.value = s.human
      matRef.current.uniforms.uTech.value = s.tech
    }

    const conv = ph.converge
    const nodeOpacity = Math.max(0.1, conv) * (0.5 + 0.5 * Math.min(1, s.tech + s.human))
    const drift = ph.drift * (1 - conv)
    for (let i = 0; i < NODE_COUNT; i++) {
      const sc = nodes.scattered[i]
      const cv = nodes.converged[i]
      const lp = live[i]
      const wob = 0.25 * drift
      lp.x = lerp(sc.x, cv.x, conv) + Math.sin(t * 0.7 + i) * wob
      lp.y = lerp(sc.y, cv.y, conv) + Math.cos(t * 0.6 + i * 1.3) * wob
      lp.z = lerp(sc.z, cv.z, conv)
      const m = nodeRefs.current[i]
      if (m) {
        m.position.copy(lp)
        m.material.opacity = nodeOpacity
        m.scale.setScalar(0.6 + 0.6 * conv)
      }
    }

    const pos = linkGeo.attributes.position.array
    for (let k = 0; k < nodes.links.length; k++) {
      const [a, b] = nodes.links[k]
      pos[k * 6] = live[a].x
      pos[k * 6 + 1] = live[a].y
      pos[k * 6 + 2] = live[a].z
      pos[k * 6 + 3] = live[b].x
      pos[k * 6 + 4] = live[b].y
      pos[k * 6 + 5] = live[b].z
    }
    linkGeo.attributes.position.needsUpdate = true
    if (linesRef.current) linesRef.current.material.opacity = conv * 0.5
    if (bloomRef.current) bloomRef.current.material.opacity = ph.solution * 0.55
  })

  return (
    <group>
      <mesh ref={bloomRef} position={[0, 0.1, -1.9]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial map={bloomTex} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} color="#ffd9b0" />
      </mesh>

      {nodes.converged.map((_, i) => (
        <mesh key={i} ref={(el) => (nodeRefs.current[i] = el)}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={nodes.colors[i]} transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}

      <lineSegments ref={linesRef} geometry={linkGeo}>
        <lineBasicMaterial color="#4EA8DE" transparent opacity={0} depthWrite={false} />
      </lineSegments>

      <group ref={groupRef}>
        <mesh material={material}>
          <planeGeometry args={[3, 3]} />
        </mesh>
      </group>
    </group>
  )
}
