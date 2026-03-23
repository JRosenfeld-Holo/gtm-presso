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
        style={{ marginBottom: 28 }}
      >
        <MonoLabel style={{ display: 'block', marginBottom: 12 }}>How We Do It</MonoLabel>
        <h2
          style={{
            fontFamily: 'var(--font-roobert)',
            fontWeight: 700,
            fontSize: 'clamp(32px, 3.6vw, 52px)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            maxWidth: 680,
            marginBottom: 12,
          }}
        >
          A builder culture optimized for speed and continuous improvement
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 660, lineHeight: 1.6 }}>
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
              padding: '32px 36px',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            {/* Icon + title row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
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
                  <svg
                    viewBox="0 0 52 26"
                    width="46"
                    height="23"
                    fill="none"
                    stroke="#bffd11"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(191,253,17,0.55))' }}
                  >
                    <path d="M 26 13 C 26 7 22 2 13 2 C 4 2 1 7 1 13 C 1 19 4 24 13 24 C 22 24 26 19 26 13 C 26 7 30 2 39 2 C 48 2 51 7 51 13 C 51 19 48 24 39 24 C 30 24 26 19 26 13" />
                  </svg>
                ) : (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 16,
                      fontWeight: 700,
                      color: 'var(--color-lime)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      textShadow: '0 0 12px rgba(191,253,17,0.4)',
                    }}
                  >
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
                fontSize: 17,
                color: 'rgba(255,255,255,0.68)',
                lineHeight: 1.8,
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
