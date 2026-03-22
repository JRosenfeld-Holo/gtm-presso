import { motion } from 'framer-motion'
import SlideWrapper from '../components/SlideWrapper'
import MonoLabel from '../components/MonoLabel'
import GlowCard from '../components/GlowCard'
import { CAPABILITIES } from '../data/slideData'

export default function Slide03() {
  return (
    <SlideWrapper>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 32 }}
      >
        <MonoLabel style={{ marginBottom: 14, display: 'block', color: 'var(--color-lime)' }}>What We Do</MonoLabel>
        <h2
          style={{
            fontFamily: 'var(--font-roobert)',
            fontWeight: 700,
            fontSize: 'clamp(36px, 4vw, 56px)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            maxWidth: 700,
            marginBottom: 14,
          }}
        >
          A data-driven GTM system built for predictable pipeline.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 660,
            lineHeight: 1.65,
            fontWeight: 400,
          }}
        >
          GTM motion is built on four interconnected capabilities that replace manual sales and
          marketing work with scalable, compounding systems.
        </p>
      </motion.div>

      {/* Cards */}
      <div style={{ display: 'flex', gap: 18, flex: 1, minHeight: 0 }}>
        {CAPABILITIES.map((cap, i) => (
          <GlowCard
            key={cap.num}
            delay={0.2 + i * 0.09}
            style={{
              flex: 1,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              minWidth: 0,
            }}
          >
            {/* Number */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 72,
                fontWeight: 600,
                color: 'var(--color-lime)',
                lineHeight: 1,
                marginBottom: 20,
                textShadow: '0 0 30px rgba(191,253,17,0.45)',
              }}
            >
              {cap.num}
            </div>

            {/* Divider */}
            <div
              style={{
                width: '100%',
                height: 1,
                background: 'rgba(191,253,17,0.12)',
                marginBottom: 16,
              }}
            />

            {/* Title */}
            <MonoLabel style={{ fontSize: 10, color: 'var(--color-lime)', marginBottom: 12, display: 'block' }}>
              {cap.title}
            </MonoLabel>

            {/* Body */}
            <p
              style={{
                fontSize: 14.5,
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.7,
                fontWeight: 400,
                flex: 1,
              }}
            >
              {cap.body}
            </p>
          </GlowCard>
        ))}
      </div>
    </SlideWrapper>
  )
}
