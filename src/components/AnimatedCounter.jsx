import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({
  to,
  decimals = 1,
  prefix = '',
  suffix = '',
  duration = 1400,
}) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const easeOut = (t) => 1 - Math.pow(1 - t, 3)

    const frame = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setValue(to * easeOut(progress))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  )
}
