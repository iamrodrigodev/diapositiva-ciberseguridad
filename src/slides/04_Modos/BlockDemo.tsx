import { motion, AnimatePresence } from 'framer-motion'
import { MODES, type Mode } from './data'

interface Props { mode: Mode }

export default function BlockDemo({ mode }: Props) {
  const spec = MODES.find(m => m.id === mode)!

  return (
    <AnimatePresence mode="wait">
      <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
        className="flex-1 flex flex-col gap-4 rounded-2xl p-6"
        style={{ background: `${spec.color}08`, border: `1px solid ${spec.color}28` }}>

        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xl font-extrabold text-white">{spec.id}</span>
            <span className="font-mono text-xs px-2.5 py-1 rounded-lg font-bold"
              style={{ background: `${spec.color}18`, color: spec.color, border: `1px solid ${spec.color}35` }}>
              {spec.status}
            </span>
          </div>
          <p className="text-sm text-white/45 font-mono">{spec.full}</p>
        </div>

        <p className="text-base text-white/75 leading-relaxed">{spec.desc}</p>

        <div>
          <p className="text-xs font-mono text-white/30 tracking-widest uppercase mb-3">Flujo de bloques</p>
          {mode === 'ECB' && (
            <div className="flex gap-3 items-center flex-wrap font-mono text-sm">
              {['M₁','M₂','M₃'].map((m, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg font-bold" style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.35)' }}>{m}</span>
                  <span className="text-white/25">→ E →</span>
                  <span className="px-3 py-1.5 rounded-lg font-bold" style={{ background: 'rgba(245,158,11,0.18)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>C{i+1}</span>
                  {i < 2 && <span className="text-red-400/60 text-xs ml-1">igual!</span>}
                </span>
              ))}
            </div>
          )}
          {mode === 'CBC' && (
            <div className="flex gap-2 items-center flex-wrap font-mono text-sm">
              <span className="px-3 py-1.5 rounded-lg font-bold" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }}>IV</span>
              {['M₁','M₂','M₃'].map((m, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-white/35 text-lg">⊕</span>
                  <span className="px-3 py-1.5 rounded-lg font-bold" style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.35)' }}>{m}</span>
                  <span className="text-white/25">→ E →</span>
                  <span className="px-3 py-1.5 rounded-lg font-bold" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }}>C{i+1}</span>
                </span>
              ))}
            </div>
          )}
          {mode === 'GCM' && (
            <div className="space-y-2 font-mono text-sm">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-lg font-bold" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }}>CTR Encrypt</span>
                <span className="text-white/25">→</span>
                <span className="px-3 py-1.5 rounded-lg" style={{ background: 'rgba(52,211,153,0.08)', color: '#34d399bb', border: '1px solid rgba(52,211,153,0.18)' }}>Ciphertext</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-lg font-bold" style={{ background: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.25)' }}>GHASH</span>
                <span className="text-white/25">→</span>
                <span className="px-3 py-1.5 rounded-lg" style={{ background: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.25)' }}>Auth Tag ✓</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
