import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function LTVCACChart({ data }) {
  const PAD_LEFT   = 40
  const PAD_RIGHT  = 40
  const PAD_TOP    = 32
  const PAD_BOTTOM = 44
  const LABEL_AREA = 18
  const DOT_RADIUS = 4.5
  const LIME       = '#bffd11'

  const viewW = 520
  const viewH = 200
  const plotW = viewW - PAD_LEFT - PAD_RIGHT
  const plotH = viewH - PAD_TOP - PAD_BOTTOM - LABEL_AREA

  const points = useMemo(() => {
    const values = data.map((d) => d.ratio)
    const min    = Math.min(...values)
    const max    = Math.max(...values)
    const range  = max - min || 1
    const yPad   = range * 0.25
    return data.map((d, i) => {
      const x = PAD_LEFT + (i / (data.length - 1)) * plotW
      const y = PAD_TOP + plotH - ((d.ratio - (min - yPad)) / (range + yPad * 2)) * plotH
      return { x, y, label: d.period, value: d.ratio }
    })
  }, [data, plotW, plotH])

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const sepY = viewH - PAD_BOTTOM

  // Fill area under line (closed path back along bottom)
  const fillPath = linePath
    + ` L${points[points.length - 1].x},${PAD_TOP + plotH}`
    + ` L${points[0].x},${PAD_TOP + plotH} Z`

  const LINE_DURATION = 1.1
  const LINE_DELAY    = 0.35

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="ltvcacFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={LIME} stopOpacity="0.12" />
            <stop offset="100%" stopColor={LIME} stopOpacity="0"    />
          </linearGradient>
          <clipPath id="ltvcacClip">
            <motion.rect
              x={0} y={0} height={viewH} width={viewW}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: LINE_DELAY, duration: LINE_DURATION, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: '0px 0px' }}
            />
          </clipPath>
        </defs>

        {/* Fill area revealed by the same clip */}
        <path
          d={fillPath}
          fill="url(#ltvcacFill)"
          clipPath="url(#ltvcacClip)"
        />

        {/* Animated line draw via pathLength */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={LIME}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { delay: LINE_DELAY, duration: LINE_DURATION, ease: [0.22, 1, 0.36, 1] },
            opacity:    { delay: LINE_DELAY, duration: 0.15 },
          }}
        />

        {/* Dots + glow halos + value labels — timed to appear as line reaches each point */}
        {points.map((p, i) => {
          const tFraction = i / (points.length - 1)
          const dotDelay  = LINE_DELAY + LINE_DURATION * tFraction + 0.05
          const labelAbove = p.y > PAD_TOP + 18
          const labelY     = labelAbove ? p.y - 11 : p.y + 17

          return (
            <g key={i}>
              {/* Glow halo */}
              <motion.circle
                cx={p.x} cy={p.y}
                fill={LIME}
                fillOpacity={0.15}
                initial={{ r: 0 }}
                animate={{ r: DOT_RADIUS * 3 }}
                transition={{ delay: dotDelay, duration: 0.5, ease: 'easeOut' }}
              />

              {/* Filled dot */}
              <motion.circle
                cx={p.x} cy={p.y}
                fill={LIME}
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: DOT_RADIUS, opacity: 1 }}
                transition={{ delay: dotDelay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Value label */}
              <motion.text
                x={p.x}
                y={labelY}
                textAnchor="middle"
                fill={LIME}
                fontFamily="MessinaSansMono, monospace"
                fontSize="13"
                fontWeight="600"
                letterSpacing="0.04em"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: dotDelay + 0.15, duration: 0.35 }}
              >
                {p.value.toFixed(1)}
              </motion.text>
            </g>
          )
        })}

        {/* Separator line — draws left to right */}
        <motion.line
          x1={0} y1={sepY} x2={viewW} y2={sepY}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Quarter labels — stagger in */}
        {points.map((p, i) => (
          <motion.text
            key={`q-${i}`}
            x={p.x}
            y={sepY + 18}
            textAnchor="middle"
            fill="rgba(255,255,255,0.45)"
            fontFamily="MessinaSansMono, monospace"
            fontSize="12"
            letterSpacing="0.05em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.07, duration: 0.35 }}
          >
            {p.label}
          </motion.text>
        ))}
      </svg>
    </div>
  )
}
