import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PW = '1loveH0l0gr4m!'

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(0)

  const attempt = () => {
    if (value === PW) {
      onUnlock()
    } else {
      setError(true)
      setValue('')
      setShake((n) => n + 1)
      setTimeout(() => setError(false), 2200)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') attempt()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        background: 'var(--color-bg)',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(191,253,17,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        key={shake}
        animate={error ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Mark */}
        <motion.img
          src="/hologram-mark.svg"
          alt="Hologram"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: 52, width: 'auto', filter: 'drop-shadow(0 0 14px rgba(191,253,17,0.35))' }}
        />

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(191,253,17,0.6)',
          }}
        >
          Enter Password
        </motion.div>

        {/* Input + button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: 10, alignItems: 'center' }}
        >
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false) }}
            onKeyDown={onKeyDown}
            autoFocus
            placeholder="••••••••••••••"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              letterSpacing: '0.06em',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${error ? 'rgba(255,80,80,0.5)' : 'rgba(191,253,17,0.2)'}`,
              borderRadius: 8,
              color: error ? 'rgba(255,120,120,0.9)' : 'var(--color-white)',
              padding: '12px 18px',
              outline: 'none',
              width: 260,
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
          />
          <motion.button
            onClick={attempt}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: 'rgba(191,253,17,0.1)',
              border: '1px solid rgba(191,253,17,0.35)',
              borderRadius: 8,
              color: 'var(--color-lime)',
              padding: '12px 20px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
          >
            Unlock →
          </motion.button>
        </motion.div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.08em',
                color: 'rgba(255,100,100,0.75)',
                marginTop: -16,
              }}
            >
              Incorrect password. Try again.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
