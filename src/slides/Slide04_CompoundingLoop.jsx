import { motion } from 'framer-motion'
import SlideWrapper from '../components/SlideWrapper'
import MonoLabel from '../components/MonoLabel'
import PipelineFlow3D from '../components/PipelineFlow3D'
import { FLOW_LAYERS } from '../data/slideData'

export default function Slide04() {
  return (
    <SlideWrapper>
      {/* Header — natural position in flex column */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 2, pointerEvents: 'none', flexShrink: 0 }}
      >
        <MonoLabel style={{ display: 'block', marginBottom: 8 }}>Compounding GTM System</MonoLabel>
        <h2
          style={{
            fontFamily: 'var(--font-roobert)',
            fontWeight: 700,
            fontSize: 'clamp(26px, 3vw, 40px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Four components, one compounding GTM system.
        </h2>
      </motion.div>

      {/* Animation — breaks out of slide's 80px horizontal padding via negative margins */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.7 }}
        style={{
          flex: 1,
          marginLeft: -80,
          marginRight: -80,
          position: 'relative',
          minHeight: 0,
          zIndex: 1,
        }}
      >
        <PipelineFlow3D />
      </motion.div>

      {/* Four-component subheader — bottom */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          gap: 0,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 8,
          paddingTop: 6,
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {FLOW_LAYERS.map((layer, i) => (
          <motion.span
            key={layer.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            whileHover={{ opacity: 1, scale: 1.04, transition: { duration: 0.15 } }}
            transition={{ delay: 0.85 + i * 0.1, duration: 0.4 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: layer.textColor,
              textShadow: `0 0 14px ${layer.textColor}`,
              cursor: 'default',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0,
            }}
          >
            {layer.label}
            {i < FLOW_LAYERS.length - 1 && (
              <span style={{
                margin: '0 18px',
                color: 'rgba(255,255,255,0.18)',
                fontWeight: 300,
                fontSize: 16,
              }}>
                /
              </span>
            )}
          </motion.span>
        ))}
      </motion.div>
    </SlideWrapper>
  )
}
