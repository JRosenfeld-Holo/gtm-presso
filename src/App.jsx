import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GridBackground from './components/GridBackground'
import Navigation from './components/Navigation'
import PasswordGate from './components/PasswordGate'
import Slide01 from './slides/Slide01_Title'
import Slide02 from './slides/Slide02_Confidentiality'
import Slide03 from './slides/Slide03_WhatWeDo'
import Slide04 from './slides/Slide04_CompoundingLoop'
import Slide05 from './slides/Slide05_CapabilityBreakdown'
import Slide06 from './slides/Slide06_HowWeDoIt'
import Slide07 from './slides/Slide07_Outcomes'

const SLIDES = [Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide07]

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? '60%' : '-60%',
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? '-60%' : '60%',
    opacity: 0,
    scale: 1.04,
    transition: { duration: 0.38, ease: [0.32, 0.72, 0, 1] },
  }),
}

export default function App() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('gtm-unlocked') === '1')
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [presentationMode, setPresentationMode] = useState(false)

  const onUnlock = useCallback(() => {
    sessionStorage.setItem('gtm-unlocked', '1')
    setUnlocked(true)
  }, [])

  const goNext = useCallback(() => {
    if (current < SLIDES.length - 1) {
      setDirection(1)
      setCurrent((p) => p + 1)
    }
  }, [current])

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1)
      setCurrent((p) => p - 1)
    }
  }, [current])

  const togglePresentationMode = useCallback(() => {
    setPresentationMode((p) => !p)
  }, [])

  useEffect(() => {
    const handle = (e) => {
      if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault()
        goNext()
      }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        goPrev()
      }
      // Press 'p' or 'P' to toggle presentation mode
      if (e.key === 'p' || e.key === 'P') {
        togglePresentationMode()
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [goNext, goPrev, togglePresentationMode])

  const CurrentSlide = SLIDES[current]

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--color-bg)' }}>
      <GridBackground />

      <AnimatePresence>
        {!unlocked && <PasswordGate onUnlock={onUnlock} />}
      </AnimatePresence>

      <AnimatePresence mode="wait" custom={direction}>
        {unlocked && <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        >
          <CurrentSlide />
        </motion.div>}
      </AnimatePresence>

      <Navigation
        current={current}
        total={SLIDES.length}
        presentationMode={presentationMode}
        onTogglePresentationMode={togglePresentationMode}
      />
    </div>
  )
}
