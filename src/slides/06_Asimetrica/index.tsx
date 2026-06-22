import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'
import { Zap, ShieldCheck, Cpu } from 'lucide-react'
import SlideLayout from '../../components/SlideLayout'
import ECCCanvas from '../../components/ECCCanvas'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import RSACalc from './RSACalc'

export default function Asimetrica() {
  return (
    <SlideLayout>
      <Tag>Criptografía Asimétrica · Carlos</Tag>
      <Title>RSA y Curvas Elípticas (ECC)</Title>

      <div className="flex gap-6 flex-1 overflow-hidden mt-2">
        <div className="flex-1 overflow-y-auto pr-2">
          <RSACalc />
        </div>

        <motion.div variants={fadeUp} className="w-[45%] flex flex-col gap-3">
          <div className="rounded-3xl p-5 flex-1 flex flex-col gap-3 relative overflow-hidden"
            style={{ background: 'rgba(96,165,250,0.03)', border: '1px solid rgba(96,165,250,0.15)' }}>
            
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none" 
              style={{ background: '#60a5fa' }} />

            <h3 className="font-bold text-[20px] bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">ECC — Curvas Elípticas</h3>
            
            <div className="my-0">
              <ECCCanvas />
            </div>

            <div className="flex flex-col gap-2 mt-0.5">
              <div className="flex gap-2.5 items-start">
                <div className="mt-0.5 bg-blue-500/10 p-1.5 rounded-xl border border-blue-500/20 shrink-0">
                  <Zap size={16} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-[14px] mb-0.5">Geometría en lugar de Primos</h4>
                  <p className="text-white/65 text-[12.5px] leading-snug">
                    En vez de factorizar gigantes, ECC rebota puntos matemáticos en la curva <strong className="font-mono text-white/80 bg-white/5 px-1 py-0.5 rounded">y²=x³-x+1</strong>.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2.5 items-start">
                <div className="mt-0.5 bg-emerald-500/10 p-1.5 rounded-xl border border-emerald-500/20 shrink-0">
                  <ShieldCheck size={16} className="text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-[14px] mb-0.5">Magia Unidireccional (ECDLP)</h4>
                  <p className="text-white/65 text-[12.5px] leading-snug">
                    Calcular los rebotes hacia adelante es fácil, pero adivinar el punto de origen es matemáticamente imposible.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-auto pt-2">
              {[['RSA-2048', '2048 bits', '#a78bfa', 'rgba(167,139,250,0.06)', 'rgba(167,139,250,0.2)'], ['ECC-256', '256 bits', '#60a5fa', 'rgba(96,165,250,0.06)', 'rgba(96,165,250,0.2)']].map(([name, bits, color, bg, border]) => (
                <div key={name as string} className="rounded-2xl px-4 py-2.5 transition-all hover:scale-[1.02]"
                  style={{ background: bg as string, border: `1px solid ${border}` }}>
                  <div className="text-[15px] font-bold" style={{ color: color as string }}>{name as string}</div>
                  <div className="text-white/60 text-[12px] mt-0.5 font-mono">{bits as string} de clave</div>
                  <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1.5">seguridad eq.</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 mt-0.5">
              <Cpu size={24} className="text-white/30 shrink-0" />
              <p className="text-[12px] text-white/60 leading-snug">
                Al usar claves <strong className="text-white/80">8× más cortas</strong>, ECC ahorra CPU y batería, siendo el estándar moderno para móviles y TLS 1.3.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
