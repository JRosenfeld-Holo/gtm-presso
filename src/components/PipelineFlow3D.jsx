import { useRef, useState, useEffect, useReducer } from 'react'
import { useAnimationFrame } from 'framer-motion'

/* ───── data ───── */
const OUTER_NODES = [
  { label: 'INTELLIGENCE', subs: ['ICP REFRESH'] },
  { label: 'PLANNING',     subs: ['CONTENT ENGINEERING', 'CAMPAIGN STRATEGY'] },
  { label: 'TARGETING',    subs: ['FIND ICP', 'LEAD LIST ENRICHMENT'] },
  { label: 'ACTIVATION',   subs: ['PAID · SEO', 'AEO · SEM'] },
  { label: 'ENGAGEMENT',   subs: ['CAMPAIGN + OUTBOUND', 'INBOUND (CHATBOT)'] },
]
const CENTER_SUBS = ['QUALIFY', 'CONVERT', 'DEAL VELOCITY']
const N = OUTER_NODES.length
const PARTICLE_COUNT = 6
const ORBIT_SPEED = 0.000055  // rad/ms → ~114s full revolution

function easeOut3(x) {
  return 1 - Math.pow(1 - Math.min(x, 1), 3)
}

export default function PipelineFlow3D() {
  const containerRef = useRef()
  const dimsRef = useRef(null)
  const [dims, setDims] = useState(null)
  const [hoveredNode, setHoveredNode] = useState(null)  // null | 'center' | 0..N-1
  const angleRef = useRef(0)
  const timeRef = useRef(0)

  const particlesRef = useRef(
    Array.from({ length: N }, (_, i) =>
      Array.from({ length: PARTICLE_COUNT }, (_, j) => ((j / PARTICLE_COUNT) + i * 0.2) % 1)
    )
  )

  const entranceRef = useRef(new Array(N + 1).fill(0))
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const { width, height, top } = el.getBoundingClientRect()
      const d = { w: width, h: height, top }
      dimsRef.current = d
      setDims(d)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    if (!dimsRef.current) return
    timeRef.current += delta
    angleRef.current += delta * ORBIT_SPEED

    const time = timeRef.current
    if (time > 80)
      entranceRef.current[0] = Math.min(entranceRef.current[0] + delta / 550, 1)
    for (let i = 0; i < N; i++) {
      if (time > 220 + i * 130)
        entranceRef.current[i + 1] = Math.min(entranceRef.current[i + 1] + delta / 480, 1)
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < PARTICLE_COUNT; j++) {
        particlesRef.current[i][j] = (particlesRef.current[i][j] + delta * 0.00028) % 1
      }
    }
    forceUpdate()
  })

  if (!dims) {
    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
  }

  const { w, h, top } = dims
  const cx = w / 2
  // Place PIPELINE at the true viewport vertical center, not the container center.
  // The container starts below the slide header, so h/2 would be visually low.
  const cy = Math.max(h * 0.3, Math.min(h * 0.7, window.innerHeight / 2 - top))
  const RX = w * 0.31
  const RY = h * 0.30

  const pulse = 0.5 + 0.5 * Math.sin(timeRef.current * 0.0018)
  const centerEntrance = easeOut3(entranceRef.current[0])
  const isCenterHovered = hoveredNode === 'center'
  const anyHovered = hoveredNode !== null

  const nodes = OUTER_NODES.map((node, i) => {
    const angle = (i / N) * Math.PI * 2 + angleRef.current
    const x = cx + RX * Math.cos(angle)
    const y = cy + RY * Math.sin(angle)
    const depth = (Math.sin(angle) + 1) / 2
    const entrance = easeOut3(entranceRef.current[i + 1])
    const isHovered = hoveredNode === i
    // dim non-hovered nodes when something is hovered
    const dimFactor = anyHovered && !isHovered ? 0.45 : 1
    return {
      ...node,
      x, y, depth, isHovered,
      opacity: entrance * (0.45 + 0.55 * depth) * dimFactor,
      scale: 0.5 + 0.5 * entrance,
      zIndex: isHovered ? 15 : Math.round(depth * 9),
    }
  })

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>

      {/* SVG layer: orbital ring, spokes, particles */}
      <svg
        width={w} height={h}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', overflow: 'visible' }}
      >
        <defs>
          <radialGradient id="pgCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bffd11" stopOpacity={(isCenterHovered ? 0.18 : 0.09) * centerEntrance} />
            <stop offset="100%" stopColor="#bffd11" stopOpacity={0} />
          </radialGradient>
        </defs>

        <ellipse cx={cx} cy={cy} rx={RX * 0.45} ry={RY * 0.45} fill="url(#pgCenterGlow)" />

        <ellipse
          cx={cx} cy={cy} rx={RX} ry={RY}
          fill="none" stroke="#bffd11" strokeWidth={1} strokeOpacity={0.13}
        />

        {nodes.map((node, i) => {
          const isHov = node.isHovered
          return (
            <g key={i}>
              <line
                x1={node.x} y1={node.y} x2={cx} y2={cy}
                stroke="#bffd11"
                strokeWidth={isHov ? 1.6 : 0.8}
                strokeOpacity={isHov ? 0.45 : 0.11 * node.opacity}
              />
              {particlesRef.current[i].map((pct, j) => {
                const px = node.x + (cx - node.x) * pct
                const py = node.y + (cy - node.y) * pct
                return (
                  <circle
                    key={j} cx={px} cy={py}
                    r={isHov ? 3.2 : 2.3}
                    fill="#bffd11"
                    opacity={Math.sin(pct * Math.PI) * (isHov ? 1.0 : 0.82) * node.opacity}
                  />
                )
              })}
            </g>
          )
        })}
      </svg>

      {/* Center PIPELINE node */}
      <div
        onMouseEnter={() => setHoveredNode('center')}
        onMouseLeave={() => setHoveredNode(null)}
        style={{
          position: 'absolute', left: cx, top: cy,
          transform: `translate(-50%, -50%) scale(${0.5 + 0.5 * centerEntrance})`,
          zIndex: 10,
          opacity: anyHovered && !isCenterHovered ? 0.45 : centerEntrance,
          userSelect: 'none',
          cursor: 'default',
          textAlign: 'center',
        }}
      >
        <div style={{
          padding: '14px 26px',
          border: `1px solid rgba(191,253,17,${isCenterHovered ? 0.85 : 0.38 + 0.22 * pulse})`,
          borderRadius: 14,
          background: isCenterHovered ? 'rgba(12,16,8,0.92)' : 'rgba(8,10,6,0.80)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          filter: isCenterHovered
            ? 'drop-shadow(0 0 36px rgba(191,253,17,0.8)) drop-shadow(0 0 14px rgba(191,253,17,0.5))'
            : `drop-shadow(0 0 ${18 + 10 * pulse}px rgba(191,253,17,${0.42 + 0.22 * pulse}))`,
          fontFamily: 'MessinaSansMono, monospace',
          whiteSpace: 'nowrap',
          transform: isCenterHovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.22s ease, border-color 0.22s ease, filter 0.22s ease, background 0.22s ease',
        }}>
          <div style={{
            fontSize: 21, fontWeight: 700, letterSpacing: '0.07em',
            color: '#bffd11',
            textShadow: isCenterHovered
              ? '0 0 24px rgba(191,253,17,0.9)'
              : '0 0 10px rgba(191,253,17,0.4)',
            marginBottom: 8,
            transition: 'text-shadow 0.22s ease',
          }}>
            PIPELINE
          </div>
          {CENTER_SUBS.map(s => (
            <div key={s} style={{
              fontSize: 13, letterSpacing: '0.06em', lineHeight: 1.8,
              color: isCenterHovered ? 'rgba(191,253,17,0.85)' : 'rgba(191,253,17,0.55)',
              transition: 'color 0.22s ease',
            }}>{s}</div>
          ))}
        </div>
      </div>

      {/* Outer orbiting nodes */}
      {nodes.map((node, i) => (
        <div
          key={node.label}
          onMouseEnter={() => setHoveredNode(i)}
          onMouseLeave={() => setHoveredNode(null)}
          style={{
            position: 'absolute', left: node.x, top: node.y,
            transform: `translate(-50%, -50%) scale(${node.scale})`,
            zIndex: node.zIndex,
            opacity: node.opacity,
            userSelect: 'none',
            cursor: 'default',
            textAlign: 'center',
          }}
        >
          <div style={{
            padding: '10px 16px',
            minWidth: 180,
            textAlign: 'center',
            border: node.isHovered
              ? '1px solid rgba(191,253,17,0.65)'
              : '1px solid rgba(255,255,255,0.18)',
            borderRadius: 8,
            background: node.isHovered ? 'rgba(12,16,8,0.88)' : 'rgba(8,10,6,0.70)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            filter: node.isHovered
              ? 'drop-shadow(0 0 24px rgba(191,253,17,0.55)) drop-shadow(0 0 8px rgba(191,253,17,0.3))'
              : `drop-shadow(0 0 14px rgba(191,253,17,${0.22 * node.depth}))`,
            fontFamily: 'MessinaSansMono, monospace',
            whiteSpace: 'nowrap',
            transform: node.isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.2s ease, border-color 0.2s ease, filter 0.2s ease, background 0.2s ease',
          }}>
            <div style={{
              fontSize: 14, fontWeight: 600, letterSpacing: '0.05em',
              color: node.isHovered ? 'rgba(255,255,255,0.98)' : `rgba(255,255,255,${0.58 + 0.37 * node.depth})`,
              textShadow: node.isHovered ? '0 0 16px rgba(191,253,17,0.4)' : 'none',
              marginBottom: 4,
              transition: 'color 0.2s ease, text-shadow 0.2s ease',
            }}>
              {node.label}
            </div>
            {node.subs.map(s => (
              <div key={s} style={{
                fontSize: 12, letterSpacing: '0.04em', lineHeight: 1.6,
                color: node.isHovered
                  ? 'rgba(255,255,255,0.72)'
                  : `rgba(255,255,255,${0.26 + 0.19 * node.depth})`,
                transition: 'color 0.2s ease',
              }}>{s}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
