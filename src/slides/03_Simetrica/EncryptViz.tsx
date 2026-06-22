import { useState } from 'react'
import { motion } from 'framer-motion'
import { Key, LockKey, LockOpen, FileText, ShieldCheck, WarningCircle, CheckCircle } from '@phosphor-icons/react'
import { simulateEncrypt } from '../../lib/crypto'

const PLAINTEXT = 'Hola Mundo'
const CIPHERTEXT = simulateEncrypt(PLAINTEXT)

const KEY_STRENGTH = [
  { algo: 'DES',    bits: 56,  rounds: 16, color: '#f87171', status: 'ROTO',     bar: 0.14 },
  { algo: '3DES',   bits: 112, rounds: 48, color: '#fbbf24', status: 'OBSOLETO', bar: 0.28 },
  { algo: 'AES-128',bits: 128, rounds: 10, color: '#60a5fa', status: 'SEGURO',   bar: 0.55 },
  { algo: 'AES-256',bits: 256, rounds: 14, color: '#34d399', status: 'ÓPTIMO',   bar: 1.00 },
]

export default function EncryptViz() {
  const [cryptoState, setCryptoState] = useState<'plain' | 'ciphered' | 'deciphered'>('plain')

  const runEncrypt = () => setCryptoState('ciphered')
  const runDecrypt = () => {
    setCryptoState('deciphered')
    setTimeout(() => setCryptoState('plain'), 2000) // auto reset after a bit
  }

  const encrypted = cryptoState === 'ciphered' || cryptoState === 'deciphered'
  const decrypted = cryptoState === 'deciphered'

  return (
    <div className="flex-1 flex flex-col gap-4 rounded-3xl p-5 shadow-2xl relative overflow-hidden"
      style={{ background: 'rgba(52,211,153,0.03)', border: '1px solid rgba(52,211,153,0.15)' }}>
      
      <div className="absolute inset-0 bg-linear-to-b from-emerald-500/5 to-transparent pointer-events-none" />

      <p className="font-mono text-[11px] text-white/50 tracking-widest uppercase mb-1 relative z-10 font-bold">Cifrado simétrico — misma clave</p>

      {/* Flow diagram */}
      <div className="flex items-center justify-between gap-1.5 relative z-10 py-1">
        {/* Plaintext */}
        <div className="rounded-xl px-2.5 py-2 shrink-0 flex flex-col items-center gap-1.5 transition-all duration-300"
          style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.25)', opacity: decrypted ? 0.4 : 1 }}>
          <FileText size={20} weight="duotone" color="#60a5fa" />
          <p className="font-mono text-[9px] text-white/50">MENSAJE</p>
          <div className="font-mono text-[11px] font-bold text-blue-300 bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
            {PLAINTEXT}
          </div>
        </div>

        {/* Encrypt arrow + key */}
        <div className="flex flex-col items-center gap-1 shrink-0 transition-opacity duration-300" style={{ opacity: decrypted ? 0.4 : 1 }}>
          <Key size={16} weight="duotone" color="#34d399" />
          <div className="flex items-center gap-0.5">
            <div className="w-2.5 h-px bg-emerald-400/40" />
            <span className="font-mono text-[9px] text-emerald-400 font-bold">AES</span>
            <div className="w-2.5 h-px bg-emerald-400/40" />
          </div>
          <span className="text-white/40 text-sm">→</span>
        </div>

        {/* Ciphertext Box */}
        <div className="rounded-xl px-2.5 py-2 flex-1 flex flex-col items-center gap-1.5 transition-all duration-300"
          style={{ 
            background: encrypted ? 'rgba(167,139,250,0.1)' : 'rgba(167,139,250,0.02)', 
            border: `1px solid ${encrypted ? 'rgba(167,139,250,0.4)' : 'rgba(167,139,250,0.1)'}`,
            boxShadow: encrypted && !decrypted ? '0 0 15px rgba(167,139,250,0.15)' : 'none'
          }}>
          <LockKey size={20} weight="duotone" color="#a78bfa" className={encrypted && !decrypted ? 'animate-bounce' : ''} />
          <p className="font-mono text-[9px] text-white/50">CIFRADO</p>
          <div className="w-full max-w-21.25 overflow-hidden text-ellipsis text-center font-mono text-[11px] font-bold bg-black/40 px-1.5 py-0.5 rounded border border-white/5 transition-colors"
               style={{ color: encrypted ? '#c4b5fd' : 'rgba(255,255,255,0.2)' }}>
            {encrypted ? CIPHERTEXT : '???'}
          </div>
        </div>

        {/* Decrypt arrow + same key */}
        <div className="flex flex-col items-center gap-1 shrink-0 transition-opacity duration-300" style={{ opacity: encrypted ? 1 : 0.3 }}>
          <Key size={16} weight="duotone" color="#34d399" />
          <div className="flex items-center gap-0.5">
            <div className="w-2 h-px bg-emerald-400/40" />
            <span className="font-mono text-[9px] text-emerald-400/70">misma</span>
            <div className="w-2 h-px bg-emerald-400/40" />
          </div>
          <span className="text-white/40 text-sm">→</span>
        </div>

        {/* Output */}
        <div className="rounded-xl px-2.5 py-2 shrink-0 flex flex-col items-center gap-1.5 transition-all duration-300"
          style={{ 
            background: decrypted ? 'rgba(52,211,153,0.1)' : 'rgba(52,211,153,0.02)', 
            border: `1px solid ${decrypted ? 'rgba(52,211,153,0.4)' : 'rgba(52,211,153,0.1)'}`,
            boxShadow: decrypted ? '0 0 15px rgba(52,211,153,0.15)' : 'none'
          }}>
          <LockOpen size={20} weight="duotone" color="#34d399" />
          <p className="font-mono text-[9px] text-white/50">ORIGINAL</p>
          <div className="font-mono text-[11px] font-bold bg-black/40 px-1.5 py-0.5 rounded border border-white/5 transition-colors"
               style={{ color: decrypted ? '#6ee7b7' : 'rgba(255,255,255,0.2)' }}>
            {decrypted ? PLAINTEXT : '???'}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 relative z-10 mt-1">
        <button onClick={runEncrypt} disabled={encrypted}
          className="flex-1 py-2.5 rounded-xl font-mono text-[13px] font-bold transition-all disabled:opacity-30 disabled:scale-100 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.4)', color: '#34d399' }}>
          <LockKey size={16} weight="bold" /> Cifrar
        </button>
        <button onClick={runDecrypt} disabled={!encrypted || decrypted}
          className="flex-1 py-2.5 rounded-xl font-mono text-[13px] font-bold transition-all disabled:opacity-30 disabled:scale-100 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.4)', color: '#a78bfa' }}>
          <LockOpen size={16} weight="bold" /> Descifrar
        </button>
      </div>

      <div className="flex justify-center mt-1">
        <span className="font-mono text-[11px] px-3 py-1.5 rounded-lg bg-black/30 border border-white/5 text-emerald-400/80 flex items-center gap-2">
          <Key size={14} /> La misma clave cifra Y descifra — esto es criptografía simétrica
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 my-1 relative z-10" />

      {/* Info Section (Pros/Cons/Uses) to fill the gap */}
      <div className="relative z-10 flex flex-col gap-2 flex-1 justify-center py-2">
        <div className="grid grid-cols-2 gap-3">
          {/* Ventajas & Desventajas */}
          <div className="rounded-xl bg-white/5 border border-white/5 p-2.5 flex flex-col gap-1.5">
            <p className="font-mono text-[9px] text-white/50 tracking-wider uppercase font-bold">Ventajas y Desventajas</p>
            <div className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold text-[10px] mt-0.5">+</span>
              <p className="text-[10px] text-white/80 leading-snug">Extremadamente rápida y eficiente. Ideal para cifrar <strong>gigabytes de datos</strong> sin consumir mucha CPU.</p>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="text-red-400 font-bold text-[10px] mt-0.5">-</span>
              <p className="text-[10px] text-white/80 leading-snug">El "Problema de Distribución": ¿Cómo le envías la clave secreta a la otra persona sin que la intercepten?</p>
            </div>
          </div>

          {/* Casos de Uso en el mundo real y Programación */}
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-2.5 flex flex-col gap-1.5">
            <p className="font-mono text-[9px] text-emerald-400/70 tracking-wider uppercase font-bold">Usos Reales y Programación</p>
            <ul className="text-[10px] text-white/80 space-y-1.5 leading-snug list-disc pl-3 marker:text-emerald-500/50">
              <li><strong>Empresas:</strong> Cifrado de discos duros (BitLocker, FileVault) y bases de datos enteras.</li>
              <li><strong>Desarrollo:</strong> Para cifrar la "carga útil" (payload) de los tokens JWT o información en bases de datos (usando librerías como <code className="text-emerald-300 bg-black/30 px-1 rounded">crypto</code> en Node.js).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key strength bars */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-1">
        <p className="font-mono text-[11px] text-white/50 tracking-widest uppercase mb-3 font-bold">Fuerza de clave (Seguridad vs Tiempo)</p>
        <div className="flex flex-col gap-2.5">
          {KEY_STRENGTH.map(({ algo, bits, color, status, bar }) => {
            let StatusIcon = ShieldCheck;
            if (status === 'ROTO') StatusIcon = WarningCircle;
            if (status === 'OBSOLETO') StatusIcon = WarningCircle;
            if (status === 'ÓPTIMO') StatusIcon = CheckCircle;

            return (
              <div key={algo} className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold w-16 text-right" style={{ color }}>{algo}</span>
                <div className="flex-1 h-3.5 rounded-full bg-black/40 overflow-hidden border border-white/5">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${bar * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
                    className="h-full rounded-full relative overflow-hidden" 
                    style={{ background: color }}>
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent w-[200%] animate-[slide_2s_infinite]" />
                  </motion.div>
                </div>
                <span className="font-mono text-[11px] text-white/60 w-8">{bits}b</span>
                <span className="font-mono text-[10px] font-bold w-20 flex items-center gap-1.5" style={{ color }}>
                  <StatusIcon size={14} weight="fill" /> {status}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
