import { useState } from 'react'
import { motion } from 'framer-motion'
import SlideWrapper from '../components/SlideWrapper'
import MonoLabel from '../components/MonoLabel'
import Zoomable from '../components/Zoomable'
import LTVCACChart from '../components/charts/LTVCACChart'
import LTVCACRatioChart from '../components/charts/LTVCACRatioChart'
import CACPaybackChart from '../components/charts/CACPaybackChart'
import { LTV_CAC_SNAPSHOTS, LTV_CAC_TREND, CAC_PAYBACK, VISIBILITY_METRICS } from '../data/slideData'

export default function Slide07() {
  const [hoveredChart, setHoveredChart] = useState(null)
  const [hoveredMetric, setHoveredMetric] = useState(null)

  return (
    <SlideWrapper>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 28 }}
      >
        <MonoLabel style={{ display: 'block', marginBottom: 8 }}>Outcomes</MonoLabel>
        <h2
          style={{
            fontFamily: 'var(--font-roobert)',
            fontWeight: 700,
            fontSize: 'clamp(26px, 3vw, 42px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 8,
          }}
        >
          Measurable payback on both return and velocity.
        </h2>
        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.5)', maxWidth: 700, lineHeight: 1.6 }}>
          Every tactic is evaluated against pipeline contribution, cost efficiency, and
          time-to-payback. Capital reallocates dynamically to the highest-performing channels.
        </p>
      </motion.div>

      {/* Middle section */}
      <div style={{ display: 'flex', gap: 20, flex: 1, minHeight: 0, marginBottom: 14 }}>

        {/* LEFT: LTV:CAC Ratio bar chart */}
        <Zoomable>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHoveredChart('ratio')}
            onMouseLeave={() => setHoveredChart(null)}
            style={{
              width: '44%',
              flexShrink: 0,
              border: `1px solid ${hoveredChart === 'ratio' ? 'rgba(191,253,17,0.35)' : 'rgba(191,253,17,0.12)'}`,
              borderRadius: 10,
              background: hoveredChart === 'ratio' ? 'rgba(191,253,17,0.03)' : 'rgba(255,255,255,0.02)',
              padding: '8px 10px',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              minHeight: 0,
              transition: 'border-color 0.22s ease, background 0.22s ease',
            }}
          >
            <div style={{ flex: 1, minHeight: 0 }}>
              <LTVCACRatioChart data={LTV_CAC_SNAPSHOTS} />
            </div>
          </motion.div>
        </Zoomable>

        {/* RIGHT: Charts stacked vertically */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
          {/* LTV:CAC trend */}
          <Zoomable
            content={
              <>
                <MonoLabel style={{ fontSize: 11, color: '#bffd11', display: 'block', marginBottom: 10, fontWeight: 600, letterSpacing: '0.1em' }}>
                  LTV:CAC
                </MonoLabel>
                <div style={{ flex: 1, minHeight: 0 }}>
                  <LTVCACChart data={LTV_CAC_TREND} />
                </div>
              </>
            }
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.32, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredChart('trend')}
              onMouseLeave={() => setHoveredChart(null)}
              style={{
                flex: 1.3,
                border: `1px solid ${hoveredChart === 'trend' ? 'rgba(191,253,17,0.30)' : 'rgba(191,253,17,0.1)'}`,
                borderRadius: 10,
                background: hoveredChart === 'trend' ? 'rgba(191,253,17,0.03)' : 'rgba(255,255,255,0.02)',
                padding: '14px 10px',
                minHeight: 0,
                transition: 'border-color 0.22s ease, background 0.22s ease',
              }}
            >
              <MonoLabel style={{
                fontSize: 9,
                color: hoveredChart === 'trend' ? '#bffd11' : 'rgba(191,253,17,0.65)',
                display: 'block', marginBottom: 6, marginLeft: 12, fontWeight: 600,
                transition: 'color 0.22s ease',
              }}>
                LTV:CAC
              </MonoLabel>
              <div style={{ height: 'calc(100% - 26px)' }}>
                <LTVCACChart data={LTV_CAC_TREND} />
              </div>
            </motion.div>
          </Zoomable>

          {/* CAC Payback */}
          <Zoomable
            content={
              <>
                <MonoLabel style={{ fontSize: 11, color: '#53F2FA', display: 'block', marginBottom: 10, fontWeight: 600, letterSpacing: '0.1em' }}>
                  CAC PAYBACK (MONTHS)
                </MonoLabel>
                <div style={{ flex: 1, minHeight: 0 }}>
                  <CACPaybackChart data={CAC_PAYBACK} />
                </div>
              </>
            }
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.44, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredChart('payback')}
              onMouseLeave={() => setHoveredChart(null)}
              style={{
                flex: 1,
                border: `1px solid ${hoveredChart === 'payback' ? 'rgba(83,242,250,0.35)' : 'rgba(83,242,250,0.1)'}`,
                borderRadius: 10,
                background: hoveredChart === 'payback' ? 'rgba(83,242,250,0.03)' : 'rgba(255,255,255,0.02)',
                padding: '14px 10px',
                minHeight: 0,
                transition: 'border-color 0.22s ease, background 0.22s ease',
              }}
            >
              <MonoLabel style={{
                fontSize: 9,
                color: hoveredChart === 'payback' ? '#53F2FA' : 'rgba(83,242,250,0.65)',
                display: 'block', marginBottom: 6, marginLeft: 12, fontWeight: 600,
                transition: 'color 0.22s ease',
              }}>
                CAC PAYBACK (MONTHS)
              </MonoLabel>
              <div style={{ height: 'calc(100% - 26px)' }}>
                <CACPaybackChart data={CAC_PAYBACK} />
              </div>
            </motion.div>
          </Zoomable>
        </div>
      </div>

      {/* Visibility metrics row */}
      <div style={{ display: 'flex', gap: 10 }}>
        {VISIBILITY_METRICS.map((m, i) => {
          const isHov = hoveredMetric === i
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredMetric(i)}
              onMouseLeave={() => setHoveredMetric(null)}
              style={{
                flex: 1,
                padding: '13px 14px',
                border: `1px solid ${isHov ? 'rgba(191,253,17,0.22)' : 'rgba(255,255,255,0.07)'}`,
                borderTop: `2px solid ${isHov ? 'rgba(191,253,17,0.75)' : 'rgba(191,253,17,0.30)'}`,
                borderRadius: 8,
                background: isHov ? 'rgba(191,253,17,0.05)' : 'rgba(255,255,255,0.03)',
                minWidth: 0,
                cursor: 'default',
                transition: 'border-color 0.22s ease, border-top-color 0.22s ease, background 0.22s ease',
              }}
            >
              <MonoLabel style={{
                fontSize: 7,
                color: isHov ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.35)',
                display: 'block', marginBottom: 6, whiteSpace: 'nowrap',
                transition: 'color 0.22s ease',
              }}>
                {m.label}
              </MonoLabel>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 24,
                  fontWeight: 600,
                  color: 'var(--color-white)',
                  lineHeight: 1,
                  textShadow: isHov ? '0 0 20px rgba(191,253,17,0.35)' : 'none',
                  transition: 'text-shadow 0.22s ease',
                }}
              >
                {m.value}
              </div>
            </motion.div>
          )
        })}
      </div>
    </SlideWrapper>
  )
}
