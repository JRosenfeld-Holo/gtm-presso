import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

/**
 * Zoomable — wraps a single child element to add click-to-zoom.
 *
 * Props:
 *   children  — a single React element (e.g. motion.div). Its props are
 *               preserved; cursor: zoom-in and onClick are merged in.
 *   content   — optional JSX to show inside the zoom panel. Defaults to
 *               the child's own children, which works for most cases.
 *               Provide this when the normal layout uses height-calc tricks
 *               that need to become flex: 1 in the large zoom context.
 */
export default function Zoomable({ children, content }) {
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    if (!zoomed) return
    const handler = (e) => { if (e.key === 'Escape') setZoomed(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [zoomed])

  const child = React.Children.only(children)

  // Merge cursor + onClick into the child's own props — preserves all
  // existing motion props, style, onMouseEnter, onMouseLeave, etc.
  const trigger = React.cloneElement(child, {
    onClick: (e) => {
      child.props.onClick?.(e)
      setZoomed(true)
    },
    style: { ...child.props.style, cursor: 'zoom-in' },
  })

  const zoomContent = content ?? child.props.children

  return (
    <>
      {trigger}

      {createPortal(
        <AnimatePresence>
          {zoomed && (
            <>
              {/* Backdrop */}
              <motion.div
                key="z-bd"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={() => setZoomed(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0,4,15,0.88)',
                  zIndex: 9998,
                  cursor: 'zoom-out',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                }}
              />

              {/* Zoomed panel */}
              <motion.div
                key="z-panel"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setZoomed(false)}
                style={{
                  position: 'fixed',
                  inset: '7vh 7vw',
                  zIndex: 9999,
                  cursor: 'zoom-out',
                  border: '1px solid rgba(191,253,17,0.22)',
                  borderRadius: 16,
                  background: 'rgba(0,4,15,0.97)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 0 0 1px rgba(191,253,17,0.06), 0 48px 96px rgba(0,0,0,0.65)',
                  padding: '28px 32px',
                  overflow: 'hidden',
                }}
              >
                {/* Dismiss hint */}
                <div style={{
                  position: 'absolute',
                  top: 14,
                  right: 18,
                  fontFamily: 'MessinaSansMono, monospace',
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.2)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}>
                  ESC / click to close
                </div>

                {/* Content wrapper — flex column so both flex:1 and height:calc children work */}
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {zoomContent}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
