import { useMemo, useState, useEffect, useRef, useCallback } from 'react'

/**
 * LTV:CAC Ratio bar chart – lime-green bars with a data table header
 * showing LTV ($K) and CAC ($K) per quarter.
 * Bars animate upward from the baseline on mount with staggered timing.
 */
export default function LTVCACRatioChart({ data }) {
  const LIME = '#bffd11'

  // ── Layout ──
  const viewW = 440
  const viewH = 340
  const PAD_LEFT = 90
  const PAD_RIGHT = 40
  const TABLE_TOP = 50
  const TABLE_ROW_H = 24
  const BAR_TOP = TABLE_TOP + TABLE_ROW_H * 2 + 16
  const BAR_BOTTOM = viewH - 44
  const BAR_MAX_H = BAR_BOTTOM - BAR_TOP - 24

  const plotW = viewW - PAD_LEFT - PAD_RIGHT

  const cols = useMemo(() => {
    const maxRatio = Math.max(...data.map((d) => d.ratio))
    const barW = Math.min(56, plotW / data.length * 0.65)
    return data.map((d, i) => {
      const cx = PAD_LEFT + ((i + 0.5) / data.length) * plotW
      const barH = (d.ratio / (maxRatio * 1.15)) * BAR_MAX_H
      return { ...d, cx, barH, barW }
    })
  }, [data, plotW, BAR_MAX_H])

  // ── Animation state ──
  const [progress, setProgress] = useState(() => cols.map(() => 0))
  const rafRef = useRef(null)
  const startTimeRef = useRef(null)

  const DURATION = 900       // ms per bar
  const STAGGER = 180        // ms delay between bars
  const INITIAL_DELAY = 350  // ms before first bar begins

  const animate = useCallback((timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp
    const elapsed = timestamp - startTimeRef.current

    const next = cols.map((_, i) => {
      const barStart = INITIAL_DELAY + i * STAGGER
      const t = Math.max(0, Math.min(1, (elapsed - barStart) / DURATION))
      // ease-out cubic
      return 1 - Math.pow(1 - t, 3)
    })

    setProgress(next)

    const allDone = next.every((p) => p >= 1)
    if (!allDone) {
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
        {/* ── Title ── */}
        <text
          x={viewW / 2}
          y={30}
          textAnchor="middle"
          fill={LIME}
          fontFamily="MessinaSansMono, monospace"
          fontSize="15"
          fontWeight="700"
          letterSpacing="0.12em"
        >
          LTV:CAC RATIO
        </text>

        {/* ── Data table rows ── */}
        {/* LTV row */}
        <text
          x={PAD_LEFT - 12}
          y={TABLE_TOP + TABLE_ROW_H * 0.7}
          textAnchor="end"
          fill="rgba(255,255,255,0.4)"
          fontFamily="MessinaSansMono, monospace"
          fontSize="12"
          letterSpacing="0.04em"
        >
          LTV ($K)
        </text>
        {/* Separator after label */}
        <line
          x1={PAD_LEFT - 4}
          y1={TABLE_TOP}
          x2={PAD_LEFT - 4}
          y2={TABLE_TOP + TABLE_ROW_H * 2}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
        />
        {/* Horizontal separator between rows */}
        <line
          x1={PAD_LEFT - 4}
          y1={TABLE_TOP + TABLE_ROW_H}
          x2={viewW - PAD_RIGHT + 10}
          y2={TABLE_TOP + TABLE_ROW_H}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />

        {cols.map((c, i) => (
          <text
            key={`ltv-${i}`}
            x={c.cx}
            y={TABLE_TOP + TABLE_ROW_H * 0.7}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            fontFamily="MessinaSansMono, monospace"
            fontSize="13"
            fontWeight="500"
            opacity={Math.min(1, (progress[i] || 0) * 4)}
          >
            ${(c.ltv / 1000).toFixed(1)}
          </text>
        ))}

        {/* CAC row */}
        <text
          x={PAD_LEFT - 12}
          y={TABLE_TOP + TABLE_ROW_H + TABLE_ROW_H * 0.7}
          textAnchor="end"
          fill="rgba(255,255,255,0.4)"
          fontFamily="MessinaSansMono, monospace"
          fontSize="12"
          letterSpacing="0.04em"
        >
          CAC($K)
        </text>
        {cols.map((c, i) => (
          <text
            key={`cac-${i}`}
            x={c.cx}
            y={TABLE_TOP + TABLE_ROW_H + TABLE_ROW_H * 0.7}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            fontFamily="MessinaSansMono, monospace"
            fontSize="13"
            fontWeight="500"
            opacity={Math.min(1, (progress[i] || 0) * 4)}
          >
            ${(c.cac / 1000).toFixed(1)}
          </text>
        ))}

        {/* ── Animated Bars ── */}
        {cols.map((c, i) => {
          const p = progress[i] || 0
          const currentH = c.barH * p
          const barX = c.cx - c.barW / 2
          const barY = BAR_BOTTOM - currentH

          // Value label fades in as bar nears full height
          const labelOpacity = Math.max(0, (p - 0.7) / 0.3)

          return (
            <g key={`bar-${i}`}>
              {/* Bar fill — grows from baseline upward */}
              {currentH > 0.5 && (
                <rect
                  x={barX}
                  y={barY}
                  width={c.barW}
                  height={currentH}
                  rx={3}
                  ry={3}
                  fill={LIME}
                  opacity={0.92}
                />
              )}

              {/* Value label above bar */}
              {labelOpacity > 0 && (
                <text
                  x={c.cx}
                  y={barY - 8}
                  textAnchor="middle"
                  fill={LIME}
                  fontFamily="MessinaSansMono, monospace"
                  fontSize="15"
                  fontWeight="600"
                  opacity={labelOpacity}
                >
                  {c.ratio.toFixed(1)}
                </text>
              )}
            </g>
          )
        })}

        {/* ── Baseline ── */}
        <line
          x1={PAD_LEFT - 20}
          y1={BAR_BOTTOM}
          x2={viewW - PAD_RIGHT + 20}
          y2={BAR_BOTTOM}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={1}
        />

        {/* ── Quarter labels ── */}
        {cols.map((c, i) => (
          <text
            key={`q-${i}`}
            x={c.cx}
            y={BAR_BOTTOM + 22}
            textAnchor="middle"
            fill="rgba(255,255,255,0.45)"
            fontFamily="MessinaSansMono, monospace"
            fontSize="13"
            letterSpacing="0.04em"
            opacity={Math.max(0, (progress[i] || 0) - 0.5) * 2}
          >
            {c.quarter}
          </text>
        ))}
      </svg>
    </div>
  )
}
