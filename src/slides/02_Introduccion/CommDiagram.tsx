import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Key, Lock, EnvelopeSimple, Warning, Skull, ShieldCheck } from '@phosphor-icons/react'

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
    <div className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(248,113,113,0.3)]"
      style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.4)' }}>
      <Skull size={24} weight="duotone" color="#f87171" className="relative z-10" />
      <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
    </div>
  )
}

export default function CommDiagram() {
  const [secured, setSecured] = useState(false)

  return (
    <div className="flex flex-col gap-4 rounded-2xl p-5 h-full relative"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>

      {/* Toggle */}
      <div className="flex gap-2 self-center relative z-20">
        {['Sin cifrado', 'Con cifrado'].map((lbl, i) => {
          const active = secured === (i === 1)
          return (
            <button key={lbl} onClick={() => setSecured(i === 1)}
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer"
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
      <div className="flex-1 flex flex-col items-center justify-center gap-3 relative mt-2">

        {/* Top row: Alice → message → Bob */}
        <div className="flex items-center gap-3 w-full px-2 relative z-10">
          <div className="flex flex-col items-center gap-1 shrink-0">
            <PersonIcon color="#60a5fa" />
            <span className="font-mono text-xs text-blue-400 font-bold">ALICE</span>
          </div>

          <div className="flex-1 flex items-center gap-2 relative">
            <div className="h-px flex-1 bg-white/15" />
            
            {/* The message traveling */}
            <AnimatePresence mode="wait">
              <motion.div key={secured ? 'enc' : 'plain'}
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl px-3 py-2 text-center shrink-0 shadow-lg relative z-10"
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
        <div className="h-7.5 w-full relative">
          <AnimatePresence>
            {secured && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center justify-between w-full px-4 absolute inset-0">
                <div className="flex flex-col items-center gap-1">
                  <Key size={20} weight="duotone" color="#34d399" />
                  <span className="font-mono text-[9px] text-white/55">Clave secreta</span>
                </div>
                <div className="flex-1 border-t border-dashed border-emerald-400/30 mx-2" />
                <div className="flex flex-col items-center gap-1">
                  <Key size={20} weight="duotone" color="#34d399" />
                  <span className="font-mono text-[9px] text-white/55">Misma clave</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Attacker row */}
        <div className="flex items-center gap-4 w-full px-2 relative mt-2">
          
          {/* Vertical dashed line dropping to attacker */}
          <div className="absolute left-1/2 -top-12 bottom-1/2 w-px border-l-2 border-dashed -translate-x-1/2" 
               style={{ borderColor: secured ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.4)' }}>
             {/* Animated dot dropping */}
             <motion.div 
               animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
               className="absolute -left-0.75 w-1.5 h-1.5 rounded-full"
               style={{ background: secured ? '#34d399' : '#f87171', boxShadow: `0 0 5px ${secured ? '#34d399' : '#f87171'}` }}
             />
          </div>

          <div className="flex-1 flex justify-end">
            <div className="flex flex-col items-center gap-1.5 shrink-0 z-10 bg-[#0a0a0f] p-1 rounded-xl">
              <AttackerIcon />
              <span className="font-mono text-[11px] text-red-400 font-bold uppercase tracking-wider">Hacker</span>
            </div>
          </div>

          <div className="flex-1 z-10 bg-[#0a0a0f] rounded-xl">
            <motion.div animate={{ opacity: 1 }}
              className="w-full rounded-xl px-4 py-3 shadow-lg"
              style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)' }}>
              <p className="font-mono text-[10px] text-white/50 mb-1.5 uppercase tracking-wider">Captura de Red:</p>
              <AnimatePresence mode="wait">
                <motion.div key={secured ? 's' : 'u'}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}>
                  {secured ? (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-red-400/40 line-through">4f#Xq$9!</span>
                      <span className="font-mono text-xs text-emerald-400 flex items-center gap-1 ml-auto">
                        <ShieldCheck size={14} weight="duotone" /> Incomprensible
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-red-400">Hola Bob</span>
                      <span className="font-mono text-xs text-red-400 flex items-center gap-1 ml-auto">
                        <Warning size={14} weight="duotone" /> Texto Plano
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Result label */}
        <AnimatePresence mode="wait">
          <motion.div key={secured ? 's' : 'u'}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 rounded-xl px-4 py-3 font-mono text-xs font-bold text-center w-full shadow-lg"
            style={{
              background: secured ? 'rgba(52,211,153,0.09)' : 'rgba(248,113,113,0.08)',
              border: `1px solid ${secured ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.25)'}`,
              color: secured ? '#34d399' : '#f87171',
            }}>
            {secured
              ? '✓ Confidencialidad garantizada — el atacante solo ve ruido'
              : '✗ Peligro crítico — el atacante puede leer todo el mensaje'}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
