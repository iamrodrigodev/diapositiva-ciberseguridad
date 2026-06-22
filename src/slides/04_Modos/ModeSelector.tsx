import { MODES, type Mode } from './data'

interface Props { active: Mode; onChange: (m: Mode) => void }

export default function ModeSelector({ active, onChange }: Props) {
  return (
    <div className="flex gap-3">
      {MODES.map(({ id, color, status }) => (
        <button key={id} onClick={() => onChange(id)}
          className="flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-200"
          style={{
            background: active === id ? `${color}18` : 'rgba(255,255,255,0.03)',
            border:     `1px solid ${active === id ? color + '50' : 'rgba(255,255,255,0.09)'}`,
            color:      active === id ? color : 'rgba(255,255,255,0.35)',
          }}>
          {id}
          <span className="block text-xs mt-0.5 font-normal opacity-70">{status}</span>
        </button>
      ))}
    </div>
  )
}
