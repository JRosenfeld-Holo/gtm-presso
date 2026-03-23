import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import SlideWrapper from '../components/SlideWrapper'
import MonoLabel from '../components/MonoLabel'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
})

/* ── Scramble text ── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function ScrambleText({ text, startDelay = 0 }) {
  const [chars, setChars] = useState(() =>
    text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
  )

  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now()
      const duration = 1400
      const id = setInterval(() => {
        const elapsed = Date.now() - start
        const resolved = Math.min(Math.floor((elapsed / duration) * text.length), text.length)
        setChars(
          text.split('').map((c, i) =>
            i < resolved ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
        )
        if (resolved >= text.length) clearInterval(id)
      }, 40)
      return () => clearInterval(id)
    }, startDelay)
    return () => clearTimeout(t)
  }, [text, startDelay])

  return <>{chars.join('')}</>
}

/* ── Hologram mark ── */
const MARK_PATH = "M234.2,67.14L119.28.83c-2.85-1.68-6.54-.72-8.26,2.21-.54.92-.82,1.97-.82,3.03v116.76L9.08,64.45c-1.38-.81-3-1.04-4.55-.64-1.55.4-2.85,1.38-3.71,2.84C.28,67.57,0,68.62,0,69.68v259.92c-.02,2.18,1.13,4.2,3.02,5.28l114.91,66.34c.95.56,1.99.82,3.02.82,2.07,0,4.09-1.08,5.24-3.03.53-.92.82-1.96.82-3.02v-116.8l101.16,58.39c2.85,1.68,6.54.72,8.26-2.21.54-.92.82-1.97.82-3.03V72.4c.01-2.18-1.16-4.2-3.05-5.26ZM220.43,215.59v98.12l-85-49.07,85-49.05ZM135.41,137.38l85-49.07v98.16l-85-49.09ZM127,122.83V24.68l85,49.07-85,49.08ZM212,201.01l-85,49.07v-98.14l85,49.07ZM110.21,279.21v98.12l-85-49.07,85-49.05ZM25.2,201l85-49.06v98.13l-85-49.07ZM16.79,186.45v-98.14l85,49.07-85,49.07ZM101.79,264.64l-85,49.06v-98.14l85,49.08Z"

const HologramMark = () => {
  const controls = useAnimation()

  useEffect(() => {
    const run = async () => {
      // Phase 1: Fade in from dark
      await controls.start({
        opacity: 0.09,
        scale: 1,
        filter: 'drop-shadow(0 0 4px rgba(191,253,17,0.05))',
        transition: { delay: 0.5, duration: 1.6, ease: [0.22, 1, 0.36, 1] },
      })
      // Phase 2: Electric pulse burst
      await controls.start({
        opacity: 0.32,
        scale: 1.012,
        filter: 'drop-shadow(0 0 36px rgba(191,253,17,0.85)) drop-shadow(0 0 8px rgba(191,253,17,0.6))',
        transition: { duration: 0.2, ease: 'easeOut' },
      })
      // Phase 3: Settle
      await controls.start({
        opacity: 0.09,
        scale: 1,
        filter: 'drop-shadow(0 0 6px rgba(191,253,17,0.08))',
        transition: { duration: 0.75, ease: 'easeOut' },
      })
      // Phase 4: Slow breathing loop
      controls.start({
        opacity: [0.09, 0.14, 0.09],
        filter: [
          'drop-shadow(0 0 4px rgba(191,253,17,0.05))',
          'drop-shadow(0 0 18px rgba(191,253,17,0.24))',
          'drop-shadow(0 0 4px rgba(191,253,17,0.05))',
        ],
        transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
      })
    }
    run()
  }, [controls])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, filter: 'drop-shadow(0 0 0px rgba(191,253,17,0))' }}
      animate={controls}
      style={{
        position: 'absolute',
        right: 40,
        top: '50%',
        transform: 'translateY(-50%)',
        height: 'clamp(380px, 68vh, 660px)',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <svg
        viewBox="0 0 237.25 402.03"
        fill="none"
        height="100%"
        width="auto"
      >
        <path fill="#bffd11" d={MARK_PATH} />
      </svg>
    </motion.div>
  )
}

export default function Slide01() {
  return (
    <SlideWrapper>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', maxWidth: 820, position: 'relative', zIndex: 2 }}>

        <motion.div {...fadeUp(0.08)} style={{ marginBottom: 24 }}>
          <MonoLabel style={{ color: 'rgba(191,253,17,0.7)' }}>March 2026</MonoLabel>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-roobert)',
            fontWeight: 700,
            fontSize: 'clamp(84px, 10.5vw, 128px)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: 'var(--color-white)',
          }}
        >
          GTM
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-roobert)',
            fontWeight: 700,
            fontSize: 'clamp(84px, 10.5vw, 128px)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: 'var(--color-lime)',
            marginBottom: 40,
          }}
        >
          <ScrambleText text="ENGINEERING" startDelay={300} />
        </motion.h1>

        {/* Lime divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 72,
            height: 2,
            background: 'var(--color-lime)',
            boxShadow: 'var(--glow-lime)',
            transformOrigin: 'left',
            marginBottom: 28,
          }}
        />

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.58)}
          style={{
            fontFamily: 'var(--font-roobert)',
            fontWeight: 400,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: 'rgba(255,255,255,0.52)',
            lineHeight: 1.5,
            maxWidth: 500,
            marginBottom: 36,
          }}
        >
          AI-powered GTM infrastructure for B2B revenue teams.
        </motion.p>

        <motion.div {...fadeUp(0.72)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
          <img
            src="/hologram-wordmark-white.svg"
            alt="Hologram"
            style={{ height: 34, width: 'auto', display: 'block' }}
          />
          <MonoLabel style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em' }}>
            Highly Confidential
          </MonoLabel>
        </motion.div>
      </div>

      <HologramMark />

    </SlideWrapper>
  )
}
