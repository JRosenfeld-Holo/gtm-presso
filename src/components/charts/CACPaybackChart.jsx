import { useMemo, useState, useEffect, useRef, useCallback } from 'react'

/**
 * CAC Payback bar chart – cyan bars showing months decreasing over time.
 * Animated bars grow upward from baseline with staggered timing.
 */
export default function CACPaybackChart({ data }) {
  const CYAN = '#53F2FA'

  // ── Layout ──
  const viewW = 420
  const viewH = 220
  const PAD_LEFT = 40
  const PAD_RIGHT = 40
  const PAD_TOP = 20
  const BAR_BOTTOM = viewH - 36
  const BAR_MAX_H = BAR_BOTTOM - PAD_TOP - 24

  const plotW = viewW - PAD_LEFT - PAD_RIGHT

  const cols = useMemo(() => {
    const maxMonths = Math.max(...data.map((d) => d.months))
    const barW = Math.min(52, plotW / data.length * 0.55)
    return data.map((d, i) => {
      const cx = PAD_LEFT + ((i + 0.5) / data.length) * plotW
      const barH = (d.months / (maxMonths * 1.18)) * BAR_MAX_H
      return { ...d, cx, barH, barW }
    })
  }, [data, plotW, BAR_MAX_H])

  // ── Animation ──
  const [progress, setProgress] = useState(() => cols.map(() => 0))
  const rafRef = useRef(null)
  const startTimeRef = useRef(null)

  const DURATION = 900
  const STAGGER = 180
  const INITIAL_DELAY = 500

  const animate = useCallback((timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp
    const elapsed = timestamp - startTimeRef.current

    const next = cols.map((_, i) => {
      const barStart = INITIAL_DELAY + i * STAGGER
      const t = Math.max(0, Math.min(1, (elapsed - barStart) / DURATION))
      return 1 - Math.pow(1 - t, 3)
    })

    setProgress(next)

    if (!next.every((p) => p >= 1)) {
      rafRef.current = requestAnimationFrame(animate)
    }
  }, [cols])

  useEffect(() => {
    startTimeRef.current = null
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* ── Animated Bars ── */}
        {cols.map((c, i) => {
          const p = progress[i] || 0
          const currentH = c.barH * p
          const barX = c.cx - c.barW / 2
          const barY = BAR_BOTTOM - currentH

          const labelOpacity = Math.max(0, (p - 0.7) / 0.3)

          return (
            <g key={`bar-${i}`}>
              {/* Bar fill */}
              {currentH > 0.5 && (
                <rect
                  x={barX}
                  y={barY}
                  width={c.barW}
                  height={currentH}
                  rx={3}
                  ry={3}
                  fill={CYAN}
                  opacity={0.82}
                />
              )}

              {/* Value label above bar */}
              {labelOpacity > 0 && (
                <text
                  x={c.cx}
                  y={barY - 8}
                  textAnchor="middle"
                  fill={CYAN}
                  fontFamily="MessinaSansMono, monospace"
                  fontSize="12"
                  fontWeight="600"
                  opacity={labelOpacity}
                >
                  {c.months} mo
                </text>
              )}
            </g>
          )
        })}

        {/* ── Baseline ── */}
        <line
          x1={PAD_LEFT - 10}
          y1={BAR_BOTTOM}
          x2={viewW - PAD_RIGHT + 10}
          y2={BAR_BOTTOM}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={1}
        />

        {/* ── Quarter labels ── */}
        {cols.map((c, i) => (
          <text
            key={`q-${i}`}
            x={c.cx}
            y={BAR_BOTTOM + 20}
            textAnchor="middle"
            fill="rgba(255,255,255,0.45)"
            fontFamily="MessinaSansMono, monospace"
            fontSize="11"
            letterSpacing="0.04em"
          >
            {c.quarter}
          </text>
        ))}
      </svg>
    </div>
  )
}
