import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import { Key, LockKey, LockOpen, Lightning, WarningCircle } from '@phosphor-icons/react'

export default function SimetricaIntro() {
  return (
    <SlideLayout>
      <Tag>Criptografía Simétrica · Rodrigo</Tag>
      <Title>¿Qué es la Criptografía Simétrica?</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-5 overflow-hidden">
        
        {/* Left: Concept and Analogy */}
        <div className="w-[50%] flex flex-col gap-4">
          <motion.div variants={fadeUp} className="rounded-3xl p-6 relative overflow-hidden shadow-2xl flex-1"
            style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.15)' }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none" style={{ background: '#34d399' }} />
            
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                <Key size={28} weight="duotone" color="#34d399" />
              </div>
              <div>
                <h3 className="text-emerald-400 font-bold text-[18px] tracking-wide">Una Sola Llave</h3>
                <p className="text-white/50 text-[12px] font-mono">Cifrado y Descifrado idénticos</p>
              </div>
            </div>
            
            <p className="text-white/80 text-[14px] leading-relaxed mb-6 relative z-10">
              La criptografía simétrica es el enfoque tradicional: <strong>la misma clave</strong> secreta se utiliza tanto para <span className="text-emerald-400">ocultar</span> el mensaje como para <span className="text-emerald-400">revelarlo</span>.
            </p>

            {/* Visual Analogy */}
            <div className="bg-black/30 rounded-2xl p-4 border border-white/5 flex flex-col items-center justify-center gap-4 relative z-10 mb-4">
              <p className="text-[12px] text-white/40 uppercase tracking-widest font-bold">La Analogía de la Caja Fuerte</p>
              
              <div className="flex w-full items-center justify-between px-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <LockKey size={24} className="text-emerald-400" />
                  </div>
                  <span className="text-[11px] font-bold text-white/60">CIFRAR</span>
                </div>

                <div className="flex-1 flex items-center justify-center relative">
                  <div className="h-0.5 w-full bg-white/10 absolute top-1/2 -translate-y-1/2" />
                  <div className="bg-emerald-500 text-black font-bold px-3 py-1 rounded-full text-[12px] z-10 border border-emerald-400 flex items-center gap-1.5 shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                    <Key size={14} weight="fill" /> Llave Única
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <LockOpen size={24} className="text-emerald-400" />
                  </div>
                  <span className="text-[11px] font-bold text-white/60">DESCIFRAR</span>
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="mt-auto pt-4 border-t border-emerald-500/20 relative z-10">
              <p className="text-[11px] font-mono text-emerald-400/80 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Datos Históricos Curiosos
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-[12px] text-white/70 leading-relaxed bg-black/20 p-2.5 rounded-lg border border-white/5">
                  <strong className="text-emerald-300">Julio César</strong> usaba criptografía simétrica hace 2000 años (Cifrado César) desplazando el abecedario.
                </p>
                <p className="text-[12px] text-white/70 leading-relaxed bg-black/20 p-2.5 rounded-lg border border-white/5">
                  <strong className="text-emerald-300">Máquina Enigma:</strong> En la 2da Guerra Mundial, los nazis usaban una máquina de cifrado simétrico electromecánica complejísima.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Pros and Cons */}
        <div className="w-[50%] flex flex-col gap-4">
          
          {/* Pros & Uses */}
          <motion.div variants={fadeUp} className="rounded-3xl p-6 shadow-2xl relative overflow-hidden"
            style={{ background: 'rgba(96,165,250,0.05)', border: '1px solid rgba(96,165,250,0.15)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(96,165,250,0.2)]">
                <Lightning size={24} weight="duotone" color="#60a5fa" />
              </div>
              <h3 className="text-blue-400 font-bold text-[18px]">Velocidad y Usos Reales</h3>
            </div>
            
            <p className="text-[14px] text-white/80 leading-relaxed mb-5">
              Es <strong className="text-blue-300">extremadamente rápida</strong> y segura. Es el estándar mundial para cifrar datos en reposo y grandes volúmenes de tráfico.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">💻</div>
                <span className="text-[12px] font-bold text-white/70">Discos Duros (BitLocker)</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">🗄️</div>
                <span className="text-[12px] font-bold text-white/70">Bases de Datos</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">📺</div>
                <span className="text-[12px] font-bold text-white/70">Streaming (Netflix)</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">🌐</div>
                <span className="text-[12px] font-bold text-white/70">Carga de HTTPS</span>
              </div>
            </div>
          </motion.div>

          {/* Cons */}
          <motion.div variants={fadeUp} className="flex-1 rounded-3xl p-6 shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden group"
            style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)' }}>
            
            {/* Pulsing red glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-500/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-red-500/10 transition-colors duration-700" />

            <div className="w-12 h-12 mb-4 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(248,113,113,0.3)] relative z-10">
              <WarningCircle size={28} weight="duotone" color="#f87171" />
            </div>
            
            <h3 className="text-red-400 font-bold text-[20px] mb-3 relative z-10">El Gran Problema</h3>
            
            <p className="text-[15px] text-white/80 leading-relaxed max-w-sm mb-6 relative z-10">
              Si nunca se han visto en persona... <br/><br/>
              <strong className="text-red-300 text-[16px]">¿Cómo se envían la llave a través de Internet sin que un hacker la copie?</strong>
            </p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2 relative z-10">
              <span className="text-[11px] font-mono text-red-200 font-bold uppercase tracking-widest flex items-center gap-2">
                <LockOpen size={14} weight="bold" />
                Spoiler: Se resuelve en la parte 2
              </span>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </SlideLayout>
  )
}
