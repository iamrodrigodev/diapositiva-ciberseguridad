import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PLAINTEXT = 'Hola Mundo'

// Deterministic "cipher blocks" from a seed – purely visual
function cipherBlocks(seed: number) {
  const colors = ['#6366f1','#f59e0b','#ec4899','#10b981','#f87171','#60a5fa','#a78bfa','#fbbf24']
  return Array.from({ length: 10 }, (_, i) => colors[(seed * 7 + i * 13) % colors.length])
}

const KEY_STRENGTH = [
  { algo: 'DES',    bits: 56,  rounds: 16, color: '#f87171', status: 'ROTO',     bar: 0.14 },
  { algo: '3DES',   bits: 112, rounds: 48, color: '#fbbf24', status: 'OBSOLETO', bar: 0.28 },
  { algo: 'AES-128',bits: 128, rounds: 10, color: '#60a5fa', status: 'SEGURO',   bar: 0.55 },
  { algo: 'AES-256',bits: 256, rounds: 14, color: '#34d399', status: 'ÓPTIMO',   bar: 1.00 },
]

export default function EncryptViz() {
  const [encrypted, setEncrypted] = useState(false)
  const [decrypted, setDecrypted] = useState(false)
  const [blocks, setBlocks] = useState<string[]>([])
  const seedRef = useRef(42)

  const runEncrypt = () => {
    if (encrypted) return
    seedRef.current = Math.floor(Math.random() * 100)
    setBlocks(cipherBlocks(seedRef.current))
    setEncrypted(true)
    setDecrypted(false)
  }

  const runDecrypt = () => {
    if (!encrypted || decrypted) return
    setDecrypted(true)
    setTimeout(() => { setEncrypted(false); setDecrypted(false) }, 1200)
  }

  useEffect(() => {
    setBlocks(cipherBlocks(seedRef.current))
  }, [])

  return (
    <div className="flex-1 flex flex-col gap-3 rounded-2xl p-4"
      style={{ background: 'rgba(52,211,153,0.03)', border: '1px solid rgba(52,211,153,0.15)' }}>

      <p className="font-mono text-[10px] text-white/50 tracking-widest uppercase">Cifrado simétrico — misma clave</p>

      {/* Flow diagram */}
      <div className="flex items-center gap-2">
        {/* Plaintext */}
        <div className="rounded-xl px-3 py-2.5 shrink-0"
          style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.25)' }}>
          <p className="font-mono text-[9px] text-white/50 mb-1">MENSAJE</p>
          <AnimatePresence mode="wait">
            {decrypted ? (
              <motion.p key="dec" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="font-mono text-xs font-bold text-blue-300">{PLAINTEXT} ✓</motion.p>
            ) : (
              <motion.p key="plain" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="font-mono text-xs font-bold text-blue-300">{PLAINTEXT}</motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Encrypt arrow + key */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <span className="text-xl">🔑</span>
          <div className="flex items-center gap-1">
            <div className="w-6 h-px bg-emerald-400/40" />
            <span className="font-mono text-[10px] text-emerald-400">AES</span>
            <div className="w-6 h-px bg-emerald-400/40" />
          </div>
          <span className="text-white/50 text-sm">→</span>
        </div>

        {/* Ciphertext blocks */}
        <div className="rounded-xl px-3 py-2.5 flex-1"
          style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)' }}>
          <p className="font-mono text-[9px] text-white/50 mb-1.5">CIFRADO</p>
          <div className="flex gap-1 flex-wrap">
            {blocks.map((c, i) => (
              <motion.div key={i}
                animate={{ background: encrypted && !decrypted ? c : 'rgba(255,255,255,0.06)' }}
                transition={{ duration: 0.15, delay: i * 0.04 }}
                className="w-5 h-5 rounded" />
            ))}
          </div>
        </div>

        {/* Decrypt arrow + same key */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <span className="text-xl">🔑</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-px bg-violet-400/40" />
            <span className="font-mono text-[10px] text-violet-400/70">misma</span>
            <div className="w-4 h-px bg-violet-400/40" />
          </div>
          <span className="text-white/50 text-sm">→</span>
        </div>

        {/* Output */}
        <div className="rounded-xl px-3 py-2.5 shrink-0"
          style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}>
          <p className="font-mono text-[9px] text-white/50 mb-1">ORIGINAL</p>
          <AnimatePresence mode="wait">
            {decrypted ? (
              <motion.p key="show" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="font-mono text-xs font-bold text-emerald-300">{PLAINTEXT} ✓</motion.p>
            ) : (
              <motion.p key="hide" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="font-mono text-xs text-white/45">···</motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button onClick={runEncrypt} disabled={encrypted}
          className="flex-1 py-2 rounded-xl font-mono text-xs font-bold transition-all disabled:opacity-30"
          style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }}>
          🔒 Cifrar
        </button>
        <button onClick={runDecrypt} disabled={!encrypted || decrypted}
          className="flex-1 py-2 rounded-xl font-mono text-xs font-bold transition-all disabled:opacity-30"
          style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa' }}>
          🔓 Descifrar
        </button>
      </div>

      <p className="font-mono text-[10px] text-white/45 text-center">
        La misma clave cifra Y descifra — esto es criptografía simétrica
      </p>

      {/* Divider */}
      <div className="border-t border-white/6" />

      {/* Key strength bars */}
      <div>
        <p className="font-mono text-[10px] text-white/50 tracking-widest uppercase mb-2">Fuerza de clave</p>
        <div className="flex flex-col gap-1.5">
          {KEY_STRENGTH.map(({ algo, bits, color, status, bar }) => (
            <div key={algo} className="flex items-center gap-2">
              <span className="font-mono text-[10px] w-16 text-right" style={{ color }}>{algo}</span>
              <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${bar * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="h-full rounded-full" style={{ background: color }} />
              </div>
              <span className="font-mono text-[10px] text-white/60 w-8">{bits}b</span>
              <span className="font-mono text-[9px] font-bold w-14" style={{ color }}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
