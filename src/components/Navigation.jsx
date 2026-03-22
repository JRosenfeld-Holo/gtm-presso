import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation({ current, total, presentationMode, onTogglePresentationMode }) {
  return (
    <>
      {/* ── Slide indicator dots & counter ── */}
      <AnimatePresence>
        {!presentationMode && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 28,
              left: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === current ? 22 : 8,
                      height: 8,
                      borderRadius: 4,
                      background: i === current ? 'var(--color-lime)' : 'rgba(255,255,255,0.18)',
                      boxShadow: i === current ? '0 0 10px var(--color-lime)' : 'none',
                      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'rgba(191,253,17,0.6)',
                  letterSpacing: '0.12em',
                }}
              >
                {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Presentation mode toggle — Hologram mark in circle (hidden on cover slide) ── */}
      <AnimatePresence>
      {current > 0 && (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={onTogglePresentationMode}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        title={presentationMode ? 'Exit presentation mode (P)' : 'Enter presentation mode (P)'}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 28,
          zIndex: 30,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: presentationMode
            ? '1.5px solid rgba(191,253,17,0.6)'
            : '1.5px solid rgba(255,255,255,0.15)',
          background: presentationMode
            ? 'rgba(191,253,17,0.08)'
            : 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          outline: 'none',
          transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
          boxShadow: presentationMode
            ? '0 0 16px rgba(191,253,17,0.25), 0 0 4px rgba(191,253,17,0.15)'
            : '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <img
          src="/hologram-mark.svg"
          alt="Toggle presentation mode"
          style={{
            width: 18,
            height: 18,
            opacity: presentationMode ? 1 : 0.45,
            transition: 'opacity 0.3s ease',
            filter: presentationMode
              ? 'brightness(1.1) drop-shadow(0 0 4px rgba(191,253,17,0.5))'
              : 'none',
          }}
        />
      </motion.button>
      )}
      </AnimatePresence>
    </>
  )
}
