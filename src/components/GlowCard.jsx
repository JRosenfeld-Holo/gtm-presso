import { motion } from 'framer-motion'
import { useState } from 'react'

export default function GlowCard({ children, style = {}, delay = 0, className = '' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        border: `1px solid ${hovered ? 'rgba(191,253,17,0.40)' : 'rgba(255,255,255,0.10)'}`,
        background: hovered ? 'rgba(191,253,17,0.05)' : 'rgba(255,255,255,0.04)',
        borderRadius: 10,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: hovered
          ? 'var(--glow-lime-hover), inset 0 1px 0 rgba(255,255,255,0.08)'
          : 'inset 0 1px 0 rgba(255,255,255,0.06)',
        transition: 'border-color 200ms ease, box-shadow 250ms ease, background 200ms ease',
        cursor: 'default',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}
