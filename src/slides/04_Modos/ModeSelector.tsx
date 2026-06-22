import { MODES, type Mode } from './data'

interface Props { active: Mode; onChange: (m: Mode) => void }

export default function ModeSelector({ active, onChange }: Props) {
  return (
    <div className="flex gap-3">
      {MODES.map(({ id, full, color, status }) => (
        <button key={id} onClick={() => onChange(id)}
          className="flex-1 py-2.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all duration-200"
          style={{
            background: active === id ? `${color}18` : 'rgba(255,255,255,0.03)',
            border:     `1px solid ${active === id ? color + '50' : 'rgba(255,255,255,0.09)'}`,
            color:      active === id ? color : 'rgba(255,255,255,0.35)',
          }}>
          <span className="font-bold text-base leading-none">{id}</span>
          <span className="text-[10px] font-mono opacity-70 mt-1 mb-1.5 text-center leading-none tracking-wide">{full}</span>
          <span className="block text-[10px] font-bold opacity-90 tracking-widest" style={{ color: active === id ? color : 'inherit' }}>{status}</span>
        </button>
      ))}
    </div>
  )
}
