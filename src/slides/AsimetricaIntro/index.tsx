import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import {
  LockOpen, Key, Mailbox, WarningCircle,
  MathOperations, Ghost, ShieldCheck
} from '@phosphor-icons/react'

const TRAPDOORS = [
  {
    problem: 'Factorización (RSA)',
    easy: 'p × q = N  (Fácil de multiplicar)',
    hard: 'N → ¿p y q?  (Imposible de dividir)',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.1)',
  },
  {
    problem: 'Logaritmo Discreto (ECC)',
    easy: 'k × G = Q  (Fácil seguir la curva)',
    hard: 'Q y G → ¿k?  (Imposible retroceder)',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.1)',
  },
]

export default function AsimetricaIntro() {
  return (
    <SlideLayout>
      <Tag>Criptografía Simétrica · Rodrigo</Tag>
      <Title>El Problema de la Distribución</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-5 overflow-hidden">
        {/* Left Column: The Problem & The Solution */}
        <div className="w-[55%] flex flex-col gap-4">
          
          {/* El Problema */}
          <motion.div variants={fadeUp} className="rounded-3xl p-5 relative overflow-hidden shadow-2xl"
            style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)' }}>
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-red-500/10 border border-red-500/20 shadow-[0_0_15px_rgba(248,113,113,0.2)]">
                <WarningCircle size={24} weight="duotone" color="#f87171" />
              </div>
              <div>
                <h3 className="text-red-400 font-bold text-[15px] tracking-wide">La debilidad Simétrica</h3>
                <p className="text-white/50 text-[11px] font-mono">El dilema del huevo y la gallina</p>
              </div>
            </div>
            
            <p className="text-white/75 text-[13px] leading-relaxed mb-4">
              Para hablar en secreto necesitas compartir la llave. Pero si envías la llave por Internet... <strong className="text-red-400">¿Cómo evitas que un hacker la intercepte?</strong>
            </p>

            <div className="flex gap-2 mt-2">
              <div className="flex-1 bg-black/40 rounded-xl p-4 border border-white/5 flex flex-col relative overflow-hidden">
                {/* Characters */}
                <div className="flex justify-between items-end relative z-10 px-2">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
                      <div className="w-4 h-4 rounded-full border-2 border-blue-400" />
                    </div>
                    <span className="text-[10px] font-mono text-blue-400 font-bold">ALICE</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-1.5 relative -top-3">
                    <div className="w-9 h-9 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/40 shadow-[0_0_15px_rgba(248,113,113,0.3)]">
                      <Ghost size={20} color="#f87171" weight="fill" className="animate-pulse" />
                    </div>
                    <span className="text-[10px] font-mono text-red-400 font-bold">HACKER</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
                      <div className="w-4 h-4 rounded-full border-2 border-blue-400" />
                    </div>
                    <span className="text-[10px] font-mono text-blue-400 font-bold">BOB</span>
                  </div>
                </div>

                {/* Connection Line */}
                <div className="relative h-0.5 w-[85%] mx-auto bg-white/10 mt-3">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-4 bottom-0 w-px border-l border-dashed border-red-500/50" />
                  
                  {/* Moving Key Animation */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 -ml-3 flex items-center justify-center drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] z-20"
                    animate={{ left: ['0%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Key size={18} weight="fill" color="#34d399" />
                  </motion.div>
                  
                  {/* Intercept effect */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/80 bg-red-500/20 z-10"
                    animate={{ 
                      width: [10, 40, 10], 
                      height: [10, 40, 10], 
                      opacity: [0, 0, 1, 0, 0] 
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', times: [0, 0.45, 0.5, 0.55, 1] }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* La Solución */}
          <motion.div variants={fadeUp} className="flex-1 rounded-3xl p-5 relative overflow-hidden shadow-2xl flex flex-col"
            style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.15)' }}>
            <div className="absolute inset-0 bg-linear-to-b from-emerald-500/5 to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                <ShieldCheck size={24} weight="duotone" color="#34d399" />
              </div>
              <div>
                <h3 className="text-emerald-400 font-bold text-[15px] tracking-wide">Criptografía Asimétrica</h3>
                <p className="text-white/50 text-[11px] font-mono">El avance más grande del siglo XX</p>
              </div>
            </div>

            <p className="text-white/80 text-[13px] leading-relaxed mb-4 relative z-10">
              En 1976, Diffie y Hellman tuvieron una idea brillante: <strong className="text-emerald-400">Separar la llave en dos partes.</strong>
            </p>

            <div className="grid grid-cols-2 gap-3 flex-1 relative z-10">
              <div className="rounded-2xl p-4 text-center bg-black/40 border border-emerald-500/20 flex flex-col justify-center transition-transform hover:scale-[1.02]">
                <LockOpen size={28} weight="duotone" color="#34d399" className="mx-auto mb-2 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                <div className="font-bold text-emerald-400 text-[13px] mb-1">Pública (Cerradura)</div>
                <div className="text-white/60 text-[11px] leading-snug">
                  Se la das a todo el mundo. Sirve solo para <strong>cifrar</strong> el mensaje.
                </div>
              </div>
              <div className="rounded-2xl p-4 text-center bg-black/40 border border-violet-500/20 flex flex-col justify-center transition-transform hover:scale-[1.02]">
                <Key size={28} weight="duotone" color="#a78bfa" className="mx-auto mb-2 drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
                <div className="font-bold text-violet-300 text-[13px] mb-1">Privada (Llave real)</div>
                <div className="text-white/60 text-[11px] leading-snug">
                  La escondes y no la compartes jamás. Sirve para <strong>descifrar</strong>.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Analogies & Math */}
        <div className="w-[45%] flex flex-col gap-4">
          
          {/* Analogía Buzón */}
          <motion.div variants={fadeUp} className="rounded-3xl p-5 shadow-2xl relative overflow-hidden"
            style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                <Mailbox size={24} weight="duotone" color="#fbbf24" />
              </div>
              <h3 className="text-amber-400 font-bold text-[14px]">La analogía del buzón</h3>
            </div>
            <div className="bg-black/30 rounded-xl p-3 border border-white/5">
              <p className="text-white/80 text-[12px] leading-relaxed">
                Imagina un buzón en la calle: <br/>
                <span className="text-emerald-400 font-bold">1. La ranura</span> es la clave pública. Cualquiera puede meter una carta (cifrar).<br/>
                <span className="text-violet-400 font-bold">2. Tu llave física</span> es la clave privada. Solo tú puedes abrir el buzón y leer las cartas (descifrar).
              </p>
            </div>
          </motion.div>

          {/* Funciones Trampa */}
          <motion.div variants={fadeUp} className="flex-1 rounded-3xl p-5 shadow-2xl flex flex-col"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <MathOperations size={24} weight="duotone" color="rgba(255,255,255,0.7)" />
              </div>
              <div>
                <h3 className="text-white/90 font-bold text-[14px]">¿Cómo funciona por debajo?</h3>
                <p className="text-white/50 text-[11px] font-mono">Funciones Matemáticas "Trampa" (Trapdoor)</p>
              </div>
            </div>
            
            <p className="text-white/70 text-[12px] leading-relaxed mb-4">
              Son operaciones que son súper fáciles de hacer hacia adelante, pero <strong>imposibles de revertir</strong> a menos que tengas el truco (la clave privada).
            </p>

            <div className="flex flex-col gap-3 flex-1 justify-end">
              {TRAPDOORS.map((t) => (
                <div key={t.problem} className="rounded-2xl p-3 border group transition-all hover:bg-white/5"
                  style={{ borderColor: `${t.color}30`, background: 'rgba(0,0,0,0.4)' }}>
                  <div className="font-bold text-[12px] mb-2" style={{ color: t.color }}>{t.problem}</div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-400 w-15 text-center">FÁCIL</span>
                      <span className="font-mono text-[11px] text-white/70">{t.easy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-red-500/20 text-red-400 w-15 text-center">DIFÍCIL</span>
                      <span className="font-mono text-[11px] text-white/50">{t.hard}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </SlideLayout>
  )
}
