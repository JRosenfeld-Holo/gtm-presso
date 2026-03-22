import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ───── Animated 3D bar ───── */
function Bar3D({ position, height, label, value, delay = 0 }) {
  const groupRef = useRef()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useFrame((_, delta) => {
    if (!visible) return
    setProgress((p) => Math.min(p + delta * 1.1, 1))
  })

  const eased = 1 - Math.pow(1 - progress, 3)
  const currentH = height * eased
  const barWidth = 0.9
  const barDepth = 0.65

  if (!visible || currentH < 0.01) return null

  return (
    <group ref={groupRef} position={position}>
      {/* Main bar body */}
      <mesh position={[0, currentH / 2, 0]}>
        <boxGeometry args={[barWidth, currentH, barDepth]} />
        <meshStandardMaterial
          color="#1a6b70"
          emissive="#53F2FA"
          emissiveIntensity={0.15}
          transparent
          opacity={0.85}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Bright cap on top */}
      <mesh position={[0, currentH, 0]}>
        <boxGeometry args={[barWidth + 0.02, 0.04, barDepth + 0.02]} />
        <meshStandardMaterial
          color="#53F2FA"
          emissive="#53F2FA"
          emissiveIntensity={1.5}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Side edge glow lines */}
      <mesh position={[barWidth / 2, currentH / 2, barDepth / 2]}>
        <boxGeometry args={[0.015, currentH, 0.015]} />
        <meshBasicMaterial color="#53F2FA" transparent opacity={0.35} />
      </mesh>
      <mesh position={[-barWidth / 2, currentH / 2, barDepth / 2]}>
        <boxGeometry args={[0.015, currentH, 0.015]} />
        <meshBasicMaterial color="#53F2FA" transparent opacity={0.35} />
      </mesh>

      {/* Ground glow */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 24]} />
        <meshBasicMaterial color="#53F2FA" transparent opacity={0.06 * eased} />
      </mesh>

      {/* Value label above bar */}
      <Html
        position={[0, currentH + 0.35, 0]}
        center
        distanceFactor={6}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div style={{
          fontFamily: 'MessinaSansMono, monospace',
          fontSize: 13,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          textShadow: '0 0 8px rgba(83,242,250,0.3)',
        }}>
          {value} mo
        </div>
      </Html>

      {/* Quarter label below */}
      <Html
        position={[0, -0.35, 0]}
        center
        distanceFactor={6}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div style={{
          fontFamily: 'MessinaSansMono, monospace',
          fontSize: 11,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.06em',
          whiteSpace: 'nowrap',
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}

/* ───── Subtle grid lines ───── */
function GroundGrid() {
  const geom = useMemo(() => {
    const points = []
    for (let i = -3; i <= 3; i++) {
      points.push(new THREE.Vector3(i * 1.2, 0, -2))
      points.push(new THREE.Vector3(i * 1.2, 0, 2))
    }
    for (let j = -2; j <= 2; j++) {
      points.push(new THREE.Vector3(-3.6, 0, j))
      points.push(new THREE.Vector3(3.6, 0, j))
    }
    const g = new THREE.BufferGeometry().setFromPoints(points)
    return g
  }, [])

  return (
    <lineSegments geometry={geom}>
      <lineBasicMaterial color="#53F2FA" transparent opacity={0.06} />
    </lineSegments>
  )
}

/* ───── Scene ───── */
function Scene({ data }) {
  const groupRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseRef.current.x * 0.06,
      0.04
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseRef.current.y * 0.06 - 0.15,
      0.04
    )
  })

  const maxMonths = 16
  const maxBarHeight = 2.4
  const spacing = 2.0

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 5, 4]} intensity={0.6} color="#ffffff" />
      <pointLight position={[2, 3, 2]} intensity={0.4} color="#53F2FA" />

      <group ref={groupRef} position={[0, -0.8, 0]}>
        <GroundGrid />

        {data.map((d, i) => {
          const x = (i - (data.length - 1) / 2) * spacing
          const h = (d.months / maxMonths) * maxBarHeight
          return (
            <Bar3D
              key={d.quarter}
              position={[x, 0, 0]}
              height={h}
              label={d.quarter}
              value={d.months}
              delay={400 + i * 250}
            />
          )
        })}
      </group>

      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={0.6}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

/* ───── Exported component ───── */
export default function CACPayback3D({ data }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.0], fov: 44 }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
      }}
      frameloop="demand"
      onCreated={({ gl, invalidate }) => {
        // Switch to continuous loop once created
        gl.setAnimationLoop(() => invalidate())
      }}
    >
      <AdaptiveDpr pixelated />
      <Scene data={data} />
    </Canvas>
  )
}
