import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import { Key, LockKey, LockOpen, Lightning, Infinity as InfinityIcon, WarningCircle } from '@phosphor-icons/react'

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
            <div className="bg-black/30 rounded-2xl p-4 border border-white/5 flex flex-col items-center justify-center gap-4 relative z-10">
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
          </motion.div>
        </div>

        {/* Right: Pros and Cons */}
        <div className="w-[50%] flex flex-col gap-4">
          
          {/* Pros */}
          <motion.div variants={fadeUp} className="rounded-3xl p-6 shadow-2xl relative overflow-hidden"
            style={{ background: 'rgba(96,165,250,0.05)', border: '1px solid rgba(96,165,250,0.15)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(96,165,250,0.2)]">
                <Lightning size={24} weight="duotone" color="#60a5fa" />
              </div>
              <h3 className="text-blue-400 font-bold text-[16px]">Fuerza Bruta y Velocidad</h3>
            </div>
            
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <Lightning size={16} className="text-blue-400 mt-0.5 shrink-0" weight="fill" />
                <p className="text-[13px] text-white/70 leading-relaxed">
                  <strong className="text-blue-300">Extremadamente rápida:</strong> Puede cifrar gigabytes de datos en milisegundos. Ideal para discos duros, bases de datos y streaming de video.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <InfinityIcon size={16} className="text-blue-400 mt-0.5 shrink-0" weight="bold" />
                <p className="text-[13px] text-white/70 leading-relaxed">
                  <strong className="text-blue-300">Seguridad probada:</strong> Algoritmos como AES-256 son tan robustos que tomaría millones de años romperlos por fuerza bruta.
                </p>
              </li>
            </ul>
          </motion.div>

          {/* Cons */}
          <motion.div variants={fadeUp} className="flex-1 rounded-3xl p-6 shadow-2xl flex flex-col"
            style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(248,113,113,0.2)]">
                <WarningCircle size={24} weight="duotone" color="#f87171" />
              </div>
              <div>
                <h3 className="text-red-400 font-bold text-[16px]">El Gran Problema</h3>
              </div>
            </div>
            
            <p className="text-[13px] text-white/70 leading-relaxed mb-4">
              Si Alice y Bob quieren hablar de forma segura, ambos deben tener la llave. 
              Pero si nunca se han visto en persona... <strong className="text-red-400">¿Cómo se envían la llave a través de un internet público sin que un hacker la copie?</strong>
            </p>

            <div className="mt-auto bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
              <span className="text-[11px] font-mono text-red-300 font-bold uppercase tracking-widest">
                Problema de Distribución de Claves
              </span>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </SlideLayout>
  )
}
