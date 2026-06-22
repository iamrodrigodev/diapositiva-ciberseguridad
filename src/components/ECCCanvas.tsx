// Renders y² = x³ − x + 1 as an SVG with two points P, Q and their sum P+Q
function buildPath(): string {
  const upper: string[] = [], lower: string[] = []
  for (let x = -1.5; x <= 2.0; x += 0.02) {
    const rhs = x * x * x - x + 1
    if (rhs >= 0) {
      const y = Math.sqrt(rhs)
      upper.push(`${x.toFixed(2)},${(-y).toFixed(2)}`)
      lower.push(`${x.toFixed(2)},${y.toFixed(2)}`)
    }
  }
  return (upper.length ? `M${upper.join('L')}` : '') +
         (lower.length ? ` M${lower.join('L')}` : '')
}

const PATH = buildPath()

export default function ECCCanvas({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-3 -3 6 6" className={`w-full h-36 ${className}`}
      style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
      {/* Axes */}
      <line x1="-3" y1="0" x2="3" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="0.05" />
      <line x1="0"  y1="-3" x2="0" y2="3" stroke="rgba(255,255,255,0.1)" strokeWidth="0.05" />
      {/* Curve */}
      <path d={PATH} fill="none" stroke="#60a5fa" strokeWidth="0.07" opacity="0.8" />
      {/* Points */}
      <circle cx="-0.9" cy="0.53"  r="0.14" fill="#34d399" />
      <circle cx="0.4"  cy="0.81"  r="0.14" fill="#a78bfa" />
      <circle cx="1.6"  cy="-1.34" r="0.14" fill="#fbbf24" />
      {/* Tangent line */}
      <line x1="-1.5" y1="-0.35" x2="2.2" y2="-1.8"
        stroke="rgba(251,191,36,0.3)" strokeWidth="0.04" strokeDasharray="0.15 0.1" />
      {/* Labels */}
      <text x="-1.25" y="0.25"  fontSize="0.35" fill="#34d399" fontFamily="monospace">P</text>
      <text x="0.55"  y="0.52"  fontSize="0.35" fill="#a78bfa" fontFamily="monospace">Q</text>
      <text x="1.7"   y="-0.95" fontSize="0.35" fill="#fbbf24" fontFamily="monospace">P+Q</text>
    </svg>
  )
}
