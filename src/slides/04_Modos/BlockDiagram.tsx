import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowBendDownRight, ShieldCheck, Warning } from '@phosphor-icons/react'
import type { Mode } from './data'

interface Props { mode: Mode }

// Visual block with label
function Block({ label, color, small }: { label: string; color: string; small?: boolean }) {
  return (
    <div className={`rounded-xl font-mono font-bold flex items-center justify-center transition-all ${small ? 'px-3 py-2 text-[12px]' : 'px-4 py-2.5 text-sm'}`}
      style={{ 
        background: `${color}15`, 
        border: `1px solid ${color}40`, 
        color 
      }}>
      {label}
    </div>
  )
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center shrink-0 mx-1.5">
      {label && <span className="font-mono text-[10px] text-white/60 mb-1 font-bold tracking-wide">{label}</span>}
      <ArrowRight size={18} weight="bold" className="text-white/40" />
    </div>
  )
}

function XorCircle() {
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      style={{
        background: 'rgba(251,191,36,0.1)',
        border: '1px solid rgba(251,191,36,0.5)'
      }}>
      <span className="text-amber-400 text-base font-bold leading-none -mt-0.5">⊕</span>
    </div>
  )
}

function EncBox({ small }: { small?: boolean }) {
  return (
    <div className={`rounded-xl flex items-center justify-center font-mono font-bold text-white/80 ${small ? 'px-3 py-2 text-[12px]' : 'px-4 py-2.5 text-sm'}`}
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.15)'
      }}>
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
    <div className="flex flex-col gap-4 h-full justify-center">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <p className="font-mono text-[12px] text-white/70 uppercase tracking-widest font-bold">Cada bloque cifrado de forma independiente</p>
      </div>

      <div className="flex flex-col gap-3">
        {( [['M₁', 'C₁'], ['M₂ = M₁', 'C₂ = C₁'], ['M₃', 'C₃']] as const ).map(([m, c], i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4">
            <Block label={m} color={COLORS.plain} />
            <Arrow />
            <EncBox />
            <Arrow />
            <Block label={c} color={COLORS.cipher} />
            {i === 1 && (
              <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 2 }} className="flex items-center gap-2 ml-4 px-3.5 py-1.5 rounded-lg bg-red-400/10 border border-red-400/20">
                <Warning size={16} weight="duotone" className="text-red-400" />
                <span className="font-mono text-[12px] text-red-400 font-bold tracking-wide">¡Idénticos!</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="rounded-2xl p-5 mt-4"
        style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)' }}>
        <div className="flex items-center gap-2.5 mb-2">
          <Warning size={20} weight="duotone" className="text-red-400" />
          <p className="text-red-400 text-[15px] font-bold">¿Por qué es peligroso?</p>
        </div>
        <p className="text-white/80 text-[14px] leading-relaxed">
          Si <strong className="text-white">M₁ = M₂</strong>, entonces <strong className="text-white">C₁ = C₂</strong> siempre.
          Un atacante puede detectar patrones, bloques repetidos y frecuencias — sin siquiera tener la clave para descifrar.
        </p>
      </motion.div>
    </div>
  )
}

function CBCDiagram() {
  return (
    <div className="flex flex-col gap-3 h-full justify-center">
      <div className="flex items-center gap-2 mb-0.5">
        <div className="w-2 h-2 rounded-full bg-amber-400" />
        <p className="font-mono text-[12px] text-white/70 uppercase tracking-widest font-bold">Cada bloque depende del anterior (Encadenamiento)</p>
      </div>

      <div className="flex flex-col gap-2">
        {/* Row 1 */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}
          className="flex items-center gap-3">
          <Block label="IV" color={COLORS.iv} small />
          <Arrow />
          <XorCircle />
          <div className="flex flex-col items-center px-1.5">
            <span className="text-white/80 text-[12px] font-mono mb-1 font-bold">← M₁</span>
          </div>
          <Block label="M₁" color={COLORS.plain} small />
          <Arrow />
          <EncBox small />
          <Arrow />
          <Block label="C₁" color={COLORS.cipher} small />
        </motion.div>

        {/* Arrow down from C1 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="flex items-center pl-16 my-0.5">
          <ArrowBendDownRight size={22} weight="bold" className="text-white/30 transform translate-y-1" />
          <span className="font-mono text-[11px] text-white/70 ml-2 mt-2 font-bold tracking-wide">C₁ alimenta el siguiente bloque</span>
        </motion.div>

        {/* Row 2 */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
          className="flex items-center gap-3">
          <Block label="C₁" color={COLORS.cipher} small />
          <Arrow />
          <XorCircle />
          <div className="flex flex-col items-center px-1.5">
            <span className="text-white/80 text-[12px] font-mono mb-1 font-bold">← M₂</span>
          </div>
          <Block label="M₂" color={COLORS.plain} small />
          <Arrow />
          <EncBox small />
          <Arrow />
          <Block label="C₂" color={COLORS.cipher} small />
        </motion.div>

        {/* Row 3 */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
          className="flex items-center gap-3 mt-1">
          <Block label="C₂" color={COLORS.cipher} small />
          <Arrow />
          <XorCircle />
          <div className="flex flex-col items-center px-1.5">
            <span className="text-white/80 text-[12px] font-mono mb-1 font-bold">← M₃</span>
          </div>
          <Block label="M₃" color={COLORS.plain} small />
          <Arrow />
          <EncBox small />
          <Arrow />
          <Block label="C₃" color={COLORS.cipher} small />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="rounded-2xl p-5 mt-2"
        style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)' }}>
        <p className="text-amber-400 text-[15px] font-bold mb-1.5">Resultado Práctico</p>
        <p className="text-white/80 text-[14px] leading-relaxed">
          Aunque M₁ = M₂, el C₂ es completamente distinto al C₁ porque hereda el ruido del paso anterior.
          Los patrones desaparecen. (Pero requiere un <strong>IV aleatorio</strong> que no se repita).
        </p>
      </motion.div>
    </div>
  )
}

function GCMDiagram() {
  return (
    <div className="flex flex-col gap-4 h-full justify-center">
      <div className="flex items-center gap-2 mb-0.5">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <p className="font-mono text-[12px] text-white/70 uppercase tracking-widest font-bold">Cifrado + Autenticación Integrada (AEAD)</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Counter encryption */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-col gap-3 rounded-2xl p-4 relative overflow-hidden"
          style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.15)' }}>
          <p className="font-mono text-[11px] text-emerald-400/90 uppercase tracking-wider font-bold">1. Fase de Cifrado (Counter Mode)</p>
          <div className="flex items-center gap-3">
            <Block label="Nonce+CTR₁" color="#60a5fa" small />
            <Arrow />
            <EncBox small />
            <Arrow />
            <XorCircle />
            <span className="text-white/80 text-[12px] font-mono px-1.5 font-bold">← M₁</span>
            <Arrow />
            <Block label="C₁" color={COLORS.cipher} small />
          </div>
          <div className="flex items-center gap-3">
            <Block label="Nonce+CTR₂" color="#60a5fa" small />
            <Arrow />
            <EncBox small />
            <Arrow />
            <XorCircle />
            <span className="text-white/80 text-[12px] font-mono px-1.5 font-bold">← M₂</span>
            <Arrow />
            <Block label="C₂" color={COLORS.cipher} small />
          </div>
        </motion.div>

        {/* GHASH auth */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
          className="flex flex-col gap-3 rounded-2xl p-4 relative overflow-hidden"
          style={{ background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.15)' }}>
          <p className="font-mono text-[11px] text-violet-400/90 uppercase tracking-wider font-bold">2. Fase de Autenticación (GHASH)</p>
          <div className="flex items-center gap-3">
            <Block label="C₁ + C₂ + AAD" color={COLORS.cipher} small />
            <Arrow label="" />
            <Block label="GHASH" color="#a78bfa" small />
            <Arrow />
            <div className="rounded-xl px-4 py-2 text-[12px] font-mono font-bold flex items-center gap-2"
              style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.4)', color: '#34d399' }}>
              <ShieldCheck size={18} weight="duotone" />
              Auth Tag ✓
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="rounded-2xl p-5 mt-1"
        style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.15)' }}>
        <div className="flex items-center gap-2 mb-1.5">
          <ShieldCheck size={20} weight="duotone" className="text-emerald-400" />
          <p className="text-emerald-400 text-[15px] font-bold">¿Por qué es el Estándar de Oro?</p>
        </div>
        <p className="text-white/80 text-[14px] leading-relaxed">
          El <strong>Auth Tag</strong> detecta cualquier manipulación del ciphertext o los metadatos (AAD).
          Si alguien cambia un solo bit en tránsito, la verificación falla instantáneamente. Cifra y autentica simultáneamente.
        </p>
      </motion.div>
    </div>
  )
}

export default function BlockDiagram({ mode }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={mode}
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }} 
        transition={{ duration: 0.3 }}
        className="flex-1 rounded-3xl p-5 relative overflow-hidden flex flex-col justify-center"
        style={{
          background: mode === 'ECB' ? 'rgba(248,113,113,0.03)' : mode === 'CBC' ? 'rgba(251,191,36,0.03)' : 'rgba(52,211,153,0.03)',
          border: `1px solid ${mode === 'ECB' ? 'rgba(248,113,113,0.15)' : mode === 'CBC' ? 'rgba(251,191,36,0.15)' : 'rgba(52,211,153,0.15)'}`,
        }}>

        {mode === 'ECB' && <ECBDiagram />}
        {mode === 'CBC' && <CBCDiagram />}
        {mode === 'GCM' && <GCMDiagram />}
      </motion.div>
    </AnimatePresence>
  )
}
