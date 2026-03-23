import { useState } from 'react'
import { motion } from 'framer-motion'
import SlideWrapper from '../components/SlideWrapper'
import MonoLabel from '../components/MonoLabel'
import { PILLARS } from '../data/slideData'

export default function Slide05() {
  const [hoveredRow, setHoveredRow] = useState(null)

  return (
    <SlideWrapper>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 28 }}
      >
        <MonoLabel style={{ display: 'block', marginBottom: 10, color: 'var(--color-lime)' }}>
          Capability Breakdown
        </MonoLabel>
        <h2
          style={{
            fontFamily: 'var(--font-roobert)',
            fontWeight: 700,
            fontSize: 'clamp(28px, 3.2vw, 46px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Five capabilities. One compounding system.
        </h2>
      </motion.div>

      {/* Editorial row list */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 0 }}>
        {PILLARS.map((pillar, i) => {
          const isHovered = hoveredRow === i

          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.16 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 12px',
                paddingLeft: 0,
                borderBottom: i < PILLARS.length - 1
                  ? `1px solid ${isHovered ? 'rgba(191,253,17,0.22)' : 'rgba(191,253,17,0.08)'}`
                  : 'none',
                flex: 1,
                minHeight: 0,
                borderRadius: 6,
                background: isHovered ? 'rgba(191,253,17,0.04)' : 'transparent',
                cursor: 'default',
                transition: 'background 0.25s ease, border-color 0.25s ease',
              }}
            >
              {/* Large number */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.22 + i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(36px, 4vw, 58px)',
                  fontWeight: 600,
                  color: 'var(--color-lime)',
                  textShadow: isHovered
                    ? '0 0 40px rgba(191,253,17,0.85), 0 0 12px rgba(191,253,17,0.5)'
                    : '0 0 28px rgba(191,253,17,0.5)',
                  lineHeight: 1,
                  width: 86,
                  flexShrink: 0,
                  letterSpacing: '-0.02em',
                  transition: 'text-shadow 0.25s ease',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </motion.div>

              {/* Vertical accent line */}
              <div
                style={{
                  width: 2,
                  height: isHovered ? 42 : 34,
                  background: isHovered
                    ? 'linear-gradient(to bottom, rgba(191,253,17,1), rgba(191,253,17,0.15))'
                    : 'linear-gradient(to bottom, rgba(191,253,17,0.6), transparent)',
                  marginRight: 20,
                  flexShrink: 0,
                  borderRadius: 1,
                  boxShadow: isHovered ? '0 0 8px rgba(191,253,17,0.5)' : 'none',
                  transition: 'height 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
                }}
              />

              {/* Pillar title */}
              <div style={{ width: 220, flexShrink: 0, marginRight: 28 }}>
                <MonoLabel
                  style={{
                    fontSize: 13,
                    color: 'var(--color-lime)',
                    lineHeight: 1.4,
                    textShadow: isHovered
                      ? '0 0 20px rgba(191,253,17,0.6)'
                      : '0 0 12px rgba(191,253,17,0.25)',
                    transition: 'text-shadow 0.25s ease',
                  }}
                >
                  {pillar.title}
                </MonoLabel>
              </div>

              {/* Item pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 7px', flex: 1, alignContent: 'center' }}>
                {pillar.items.map((item, j) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 + j * 0.045, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{
                      scale: 1.06,
                      color: 'rgba(255,255,255,0.98)',
                      borderColor: 'rgba(191,253,17,0.6)',
                      background: 'rgba(191,253,17,0.13)',
                      boxShadow: '0 0 14px rgba(191,253,17,0.22)',
                      transition: { duration: 0.18 },
                    }}
                    style={{
                      padding: '4px 11px',
                      border: '1px solid rgba(191,253,17,0.2)',
                      borderRadius: 20,
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.62)',
                      background: 'rgba(191,253,17,0.04)',
                      lineHeight: 1.45,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.01em',
                      whiteSpace: 'nowrap',
                      cursor: 'default',
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </SlideWrapper>
  )
}
