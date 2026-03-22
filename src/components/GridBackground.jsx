export default function GridBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(191,253,17,0.07)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>
      {/* Radial vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,4,15,0.65) 100%)',
        }}
      />
      {/* Lime ambient glow — bottom-right */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 78% 85%, rgba(191,253,17,0.10) 0%, transparent 55%)',
        }}
      />
      {/* Cyan ambient glow — top-left */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 12% 18%, rgba(83,242,250,0.08) 0%, transparent 50%)',
        }}
      />
      {/* Lime warmth — top-center */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(191,253,17,0.03) 0%, transparent 55%)',
        }}
      />
    </div>
  )
}
