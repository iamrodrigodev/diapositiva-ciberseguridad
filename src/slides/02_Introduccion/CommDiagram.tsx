import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Key, Lock, EnvelopeSimple, Warning, Eye } from '@phosphor-icons/react'

function PersonIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 48" width="40" height="48">
      <circle cx="20" cy="12" r="10" fill={color} opacity="0.9" />
      <path d="M2 44 C2 30 38 30 38 44" fill={color} opacity="0.9" />
    </svg>
  )
}

function AttackerIcon() {
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.35)' }}>
      <Eye size={20} weight="duotone" color="#f87171" />
    </div>
  )
}

export default function CommDiagram() {
  const [secured, setSecured] = useState(false)

  return (
    <div className="flex flex-col gap-4 rounded-2xl p-5 h-full"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>

      {/* Toggle */}
      <div className="flex gap-2 self-center">
        {['Sin cifrado', 'Con cifrado'].map((lbl, i) => {
          const active = secured === (i === 1)
          return (
            <button key={lbl} onClick={() => setSecured(i === 1)}
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-bold transition-all"
              style={{
                background: active ? (i === 0 ? 'rgba(248,113,113,0.2)' : 'rgba(52,211,153,0.18)') : 'rgba(255,255,255,0.04)',
                border: `1px solid ${active ? (i === 0 ? 'rgba(248,113,113,0.5)' : 'rgba(52,211,153,0.45)') : 'rgba(255,255,255,0.1)'}`,
                color: active ? (i === 0 ? '#f87171' : '#34d399') : 'rgba(255,255,255,0.45)',
              }}>
              {lbl}
            </button>
          )
        })}
      </div>

      {/* Diagram */}
      <div className="flex-1 flex flex-col items-center justify-center gap-3 relative">

        {/* Top row: Alice → message → Bob */}
        <div className="flex items-center gap-3 w-full px-2">
          <div className="flex flex-col items-center gap-1 shrink-0">
            <PersonIcon color="#60a5fa" />
            <span className="font-mono text-xs text-blue-400 font-bold">ALICE</span>
          </div>

          <div className="flex-1 flex items-center gap-2">
            <div className="h-px flex-1 bg-white/15" />
            <AnimatePresence mode="wait">
              <motion.div key={secured ? 'enc' : 'plain'}
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl px-3 py-2 text-center shrink-0"
                style={{
                  background: secured ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
                  border: `1px solid ${secured ? 'rgba(52,211,153,0.35)' : 'rgba(248,113,113,0.35)'}`,
                }}>
                <div className="font-mono text-sm font-bold flex items-center gap-1.5" style={{ color: secured ? '#34d399' : '#f87171' }}>
                  {secured
                    ? <><Lock size={14} weight="duotone" /> 4f#Xq$9!</>
                    : <><EnvelopeSimple size={14} weight="duotone" /> Hola Bob</>
                  }
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="h-px flex-1 bg-white/15" />
            <div className="text-white/50 text-lg">→</div>
          </div>

          <div className="flex flex-col items-center gap-1 shrink-0">
            <PersonIcon color="#34d399" />
            <span className="font-mono text-xs text-emerald-400 font-bold">BOB</span>
          </div>
        </div>

        {/* Key line (only in secured mode) */}
        <AnimatePresence>
          {secured && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center justify-between w-full px-4">
              <div className="flex flex-col items-center gap-1">
                <Key size={24} weight="duotone" color="#34d399" />
                <span className="font-mono text-[10px] text-white/55">Clave secreta</span>
              </div>
              <div className="flex-1 border-t border-dashed border-emerald-400/30 mx-2" />
              <div className="flex flex-col items-center gap-1">
                <Key size={24} weight="duotone" color="#34d399" />
                <span className="font-mono text-[10px] text-white/55">Misma clave</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="w-full border-t border-dashed border-white/12 my-1" />

        {/* Attacker row */}
        <div className="flex items-center gap-4 w-full px-2">
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <AttackerIcon />
            <span className="font-mono text-xs text-red-400 font-bold">ATACANTE</span>
          </div>

          <motion.div animate={{ opacity: 1 }}
            className="flex-1 rounded-xl px-4 py-3"
            style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <p className="font-mono text-[10px] text-white/50 mb-1.5 uppercase tracking-wider">Intercepta y ve:</p>
            <AnimatePresence mode="wait">
              <motion.div key={secured ? 's' : 'u'}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}>
                {secured ? (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-red-400/60 line-through">4f#Xq$9!</span>
                    <span className="font-mono text-xs text-red-400 flex items-center gap-1">
                      <Lock size={12} weight="duotone" /> No puede leer
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-red-400">Hola Bob</span>
                    <span className="font-mono text-xs text-red-400/80 flex items-center gap-1">
                      <Warning size={12} weight="duotone" /> Lee todo
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Result label */}
        <AnimatePresence mode="wait">
          <motion.div key={secured ? 's' : 'u'}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 rounded-xl px-5 py-2.5 font-mono text-sm font-bold text-center w-full"
            style={{
              background: secured ? 'rgba(52,211,153,0.09)' : 'rgba(248,113,113,0.08)',
              border: `1px solid ${secured ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.25)'}`,
              color: secured ? '#34d399' : '#f87171',
            }}>
            {secured
              ? '✓ Confidencialidad garantizada — solo Bob puede leer'
              : '✗ Cualquiera que intercepte la red puede leer el mensaje'}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
