import { motion } from 'framer-motion'
import SlideWrapper from '../components/SlideWrapper'
import MonoLabel from '../components/MonoLabel'
import GlowCard from '../components/GlowCard'
import { HOW_PILLARS } from '../data/slideData'

export default function Slide06() {
  return (
    <SlideWrapper>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 18 }}
      >
        <MonoLabel style={{ display: 'block', marginBottom: 10 }}>How We Do It</MonoLabel>
        <h2
          style={{
            fontFamily: 'var(--font-roobert)',
            fontWeight: 700,
            fontSize: 'clamp(26px, 3vw, 44px)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            maxWidth: 680,
            marginBottom: 10,
          }}
        >
          A builder culture optimized for speed and continuous improvement
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 660, lineHeight: 1.6 }}>
          Hologram's GTM team operates like a product team: lean, instrumented, and oriented toward
          building the systems that generate pipeline rather than just running them.
        </p>
      </motion.div>

      {/* 2x2 grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 16,
          flex: 1,
          minHeight: 0,
        }}
      >
        {HOW_PILLARS.map((pillar, i) => (
          <GlowCard
            key={pillar.title}
            delay={0.2 + i * 0.1}
            style={{
              padding: '20px 26px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {/* Icon + title row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  border: '1px solid rgba(191,253,17,0.35)',
                  background: 'rgba(191,253,17,0.07)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {pillar.abbr === '∞' ? (
                  /* Constant measurement — infinity */
                  <svg viewBox="0 0 52 26" width="40" height="20" fill="none" stroke="#bffd11" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(191,253,17,0.55))' }}>
                    <path d="M 26 13 C 26 7 22 2 13 2 C 4 2 1 7 1 13 C 1 19 4 24 13 24 C 22 24 26 19 26 13 C 26 7 30 2 39 2 C 48 2 51 7 51 13 C 51 19 48 24 39 24 C 30 24 26 19 26 13" />
                  </svg>
                ) : pillar.abbr === 'LEAN' ? (
                  /* Lean — double forward chevrons (speed) */
                  <svg viewBox="0 0 30 28" width="28" height="26" fill="none" stroke="#bffd11" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(191,253,17,0.55))' }}>
                    <path d="M 3 4 L 12 14 L 3 24" />
                    <path d="M 15 4 L 24 14 L 15 24" />
                  </svg>
                ) : pillar.abbr === 'BUILD' ? (
                  /* Build — 3D cube (construction) */
                  <svg viewBox="0 0 28 26" width="28" height="26" fill="none" stroke="#bffd11" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(191,253,17,0.55))' }}>
                    <path d="M 4 9 L 14 3 L 24 9 L 14 15 Z" />
                    <path d="M 24 9 L 24 19 L 14 25 L 14 15" />
                    <path d="M 4 9 L 4 19 L 14 25" />
                  </svg>
                ) : pillar.abbr === 'GROW' ? (
                  /* Grow — upward trend line with arrow */
                  <svg viewBox="0 0 26 24" width="26" height="24" fill="none" stroke="#bffd11" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(191,253,17,0.55))' }}>
                    <path d="M 2 20 L 8 12 L 14 15 L 22 5" />
                    <path d="M 17 5 L 22 5 L 22 10" />
                    <line x1="2" y1="22" x2="24" y2="22" strokeOpacity="0.3" />
                  </svg>
                ) : (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--color-lime)', textShadow: '0 0 12px rgba(191,253,17,0.4)' }}>
                    {pillar.abbr}
                  </span>
                )}
              </div>
              <MonoLabel style={{ fontSize: 12, color: 'var(--color-lime)', lineHeight: 1.4 }}>
                {pillar.title}
              </MonoLabel>
            </div>

            {/* Body */}
            <p
              style={{
                fontSize: 15,
                color: 'rgba(255,255,255,0.68)',
                lineHeight: 1.65,
                fontWeight: 400,
                flex: 1,
              }}
            >
              {pillar.body}
            </p>
          </GlowCard>
        ))}
      </div>
    </SlideWrapper>
  )
}
