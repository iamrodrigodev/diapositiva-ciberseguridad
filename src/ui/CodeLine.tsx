interface Props { label?: string; value: string; color?: string; className?: string }

export default function CodeLine({ label, value, color = 'rgba(255,255,255,0.85)', className = '' }: Props) {
  return (
    <div className={`flex gap-4 font-mono text-sm leading-relaxed ${className}`}>
      {label && <span className="text-white/35 shrink-0 w-44">{label}</span>}
      <span style={{ color }}>{value}</span>
    </div>
  )
}
