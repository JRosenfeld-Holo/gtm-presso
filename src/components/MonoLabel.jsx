export default function MonoLabel({ children, style = {}, size = 11 }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        fontSize: size,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--color-lime)',
        ...style,
      }}
    >
      {children}
    </span>
  )
}
