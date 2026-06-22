import { motion, AnimatePresence } from 'framer-motion'
import type { Mode } from './data'

interface Props { mode: Mode }

// Visual block with label
function Block({ label, color, small }: { label: string; color: string; small?: boolean }) {
  return (
    <div className={`rounded-lg font-mono font-bold flex items-center justify-center ${small ? 'px-2 py-1 text-[10px]' : 'px-3 py-2 text-xs'}`}
      style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}>
      {label}
    </div>
  )
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center shrink-0">
      {label && <span className="font-mono text-[9px] text-white/45 mb-0.5">{label}</span>}
      <span className="text-white/50 text-base">→</span>
    </div>
  )
}

function XorCircle() {
  return (
    <div className="w-6 h-6 rounded-full border border-amber-400/50 flex items-center justify-center shrink-0">
      <span className="text-amber-400 text-xs font-bold leading-none">⊕</span>
    </div>
  )
}

function EncBox({ small }: { small?: boolean }) {
  return (
    <div className={`rounded-lg border border-white/15 bg-white/[0.04] flex items-center justify-center font-mono font-bold text-white/50 ${small ? 'px-2 py-1 text-[10px]' : 'px-3 py-2 text-xs'}`}>
      AES
    </div>
  )
}

const COLORS = {
  plain:  '#60a5fa',
  cipher: '#a78bfa',
  iv:     '#34d399',
  key:    '#fbbf24',
  auth:   '#34d399',
}

function ECBDiagram() {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Cada bloque cifrado de forma independiente</p>

      {/* Show 3 independent parallel chains */}
      {[['M₁', 'C₁'], ['M₂ = M₁', 'C₂ = C₁'], ['M₃', 'C₃']].map(([m, c], i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center gap-2">
          <Block label={m} color={COLORS.plain} />
          <Arrow />
          <EncBox />
          <Arrow />
          <Block label={c} color={COLORS.cipher} />
          {i === 1 && (
            <span className="font-mono text-[9px] text-red-400/80 ml-1">← ⚠ iguales!</span>
          )}
        </motion.div>
      ))}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="rounded-xl px-4 py-2.5 mt-1"
        style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.25)' }}>
        <p className="text-red-400 text-xs font-bold mb-0.5">¿Por qué es peligroso?</p>
        <p className="text-white/75 text-xs leading-relaxed">
          Si <strong className="text-white/75">M₁ = M₂</strong>, entonces <strong className="text-white/75">C₁ = C₂</strong> siempre.
          Un atacante puede detectar patrones, bloques repetidos y frecuencias — sin siquiera descifrar.
        </p>
      </motion.div>
    </div>
  )
}

function CBCDiagram() {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Cada bloque depende del anterior (encadenamiento)</p>

      {/* Chain: IV → XOR → M1 → AES → C1 → XOR → M2 → AES → C2 */}
      <div className="flex flex-col gap-2">
        {/* Row 1 */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}
          className="flex items-center gap-2 flex-wrap">
          <Block label="IV" color={COLORS.iv} small />
          <Arrow />
          <XorCircle />
          <span className="text-white/40 text-xs">← M₁</span>
          <Block label="M₁" color={COLORS.plain} small />
          <Arrow />
          <EncBox small />
          <Arrow />
          <Block label="C₁" color={COLORS.cipher} small />
        </motion.div>

        {/* Arrow down from C1 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
          className="flex items-center gap-2 pl-[52px]">
          <div className="w-px h-4 bg-violet-400/30" />
          <span className="font-mono text-[9px] text-white/45 ml-1">C₁ alimenta el siguiente bloque</span>
        </motion.div>

        {/* Row 2 */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }}
          className="flex items-center gap-2 flex-wrap">
          <Block label="C₁" color={COLORS.cipher} small />
          <Arrow />
          <XorCircle />
          <span className="text-white/40 text-xs">← M₂</span>
          <Block label="M₂" color={COLORS.plain} small />
          <Arrow />
          <EncBox small />
          <Arrow />
          <Block label="C₂" color={COLORS.cipher} small />
        </motion.div>

        {/* Row 3 */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
          className="flex items-center gap-2 flex-wrap">
          <Block label="C₂" color={COLORS.cipher} small />
          <Arrow />
          <XorCircle />
          <span className="text-white/40 text-xs">← M₃</span>
          <Block label="M₃" color={COLORS.plain} small />
          <Arrow />
          <EncBox small />
          <Arrow />
          <Block label="C₃" color={COLORS.cipher} small />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
        className="rounded-xl px-4 py-2.5"
        style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.25)' }}>
        <p className="text-amber-400 text-xs font-bold mb-0.5">Resultado</p>
        <p className="text-white/75 text-xs leading-relaxed">
          Aunque M₁ = M₂, el C₂ es completamente distinto al C₁ porque depende de C₁ anterior.
          Los patrones desaparecen. Pero si el IV se reutiliza, el cifrado se debilita.
        </p>
      </motion.div>
    </div>
  )
}

function GCMDiagram() {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Cifrado + autenticación (AEAD)</p>

      {/* Counter encryption */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}
        className="flex flex-col gap-2 rounded-xl p-3"
        style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}>
        <p className="font-mono text-[9px] text-emerald-400/60 uppercase">1. Cifrado (Counter Mode)</p>
        <div className="flex items-center gap-2 flex-wrap">
          <Block label="Nonce+CTR₁" color="#60a5fa" small />
          <Arrow />
          <EncBox small />
          <Arrow />
          <XorCircle />
          <span className="text-white/40 text-[10px]">← M₁</span>
          <Arrow />
          <Block label="C₁" color={COLORS.cipher} small />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Block label="Nonce+CTR₂" color="#60a5fa" small />
          <Arrow />
          <EncBox small />
          <Arrow />
          <XorCircle />
          <span className="text-white/40 text-[10px]">← M₂</span>
          <Arrow />
          <Block label="C₂" color={COLORS.cipher} small />
        </div>
      </motion.div>

      {/* GHASH auth */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
        className="flex flex-col gap-2 rounded-xl p-3"
        style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.2)' }}>
        <p className="font-mono text-[9px] text-violet-400/60 uppercase">2. Autenticación (GHASH)</p>
        <div className="flex items-center gap-2 flex-wrap">
          <Block label="C₁+C₂+AAD" color={COLORS.cipher} small />
          <Arrow label="" />
          <Block label="GHASH" color="#a78bfa" small />
          <Arrow />
          <div className="rounded-lg px-2 py-1 text-[10px] font-mono font-bold"
            style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.4)', color: '#34d399' }}>
            Auth Tag ✓
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="rounded-xl px-4 py-2.5"
        style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.25)' }}>
        <p className="text-emerald-400 text-xs font-bold mb-0.5">¿Por qué es el mejor?</p>
        <p className="text-white/75 text-xs leading-relaxed">
          El Auth Tag detecta cualquier manipulación del ciphertext o los metadatos (AAD).
          Si alguien cambia un solo bit, la verificación falla. Cifra Y autentica en un solo paso.
        </p>
      </motion.div>
    </div>
  )
}

export default function BlockDiagram({ mode }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={mode}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
        className="flex-1 rounded-2xl p-5"
        style={{
          background: mode === 'ECB' ? 'rgba(248,113,113,0.04)' : mode === 'CBC' ? 'rgba(251,191,36,0.04)' : 'rgba(52,211,153,0.04)',
          border: `1px solid ${mode === 'ECB' ? 'rgba(248,113,113,0.2)' : mode === 'CBC' ? 'rgba(251,191,36,0.2)' : 'rgba(52,211,153,0.2)'}`,
        }}>
        {mode === 'ECB' && <ECBDiagram />}
        {mode === 'CBC' && <CBCDiagram />}
        {mode === 'GCM' && <GCMDiagram />}
      </motion.div>
    </AnimatePresence>
  )
}
