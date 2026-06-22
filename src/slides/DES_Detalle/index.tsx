import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import { 
  Skull, Bandaids, DesktopTower, ChartBar, 
  CalendarBlank, Key, Clock, ShieldWarning, WarningCircle, ShieldCheck
} from '@phosphor-icons/react'

const BITS = [
  { algo: 'DES',     bits: 56,  power: '56', time: 'Segundos hoy', color: '#f87171', status: 'ROTO',     bar: 0.15 },
  { algo: '3DES',    bits: 112, power: '112', time: 'Días / Semanas', color: '#fbbf24', status: 'OBSOLETO',  bar: 0.35 },
  { algo: 'AES-128', bits: 128, power: '128', time: 'Billones de años', color: '#60a5fa', status: 'SEGURO',    bar: 0.70 },
  { algo: 'AES-256', bits: 256, power: '256', time: '> Edad del universo', color: '#34d399', status: 'ÓPTIMO',    bar: 1.00 },
]

export default function DES_Detalle() {
  return (
    <SlideLayout>
      <Tag>Simétrica · Rodrigo</Tag>
      <Title>DES y 3DES Por qué fallaron</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-5 overflow-hidden mt-2">
        <div className="flex-1 flex flex-col gap-4">
          
          {/* DES CARD */}
          <motion.div variants={fadeUp} className="rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col gap-3"
            style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px] pointer-events-none" />
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-red-500/10 border border-red-500/30 shadow-[0_0_15px_rgba(248,113,113,0.2)]">
                <Skull size={24} weight="duotone" color="#f87171" />
              </div>
              <div>
                <h3 className="text-red-400 font-bold text-[16px] tracking-wide">DES <span className="text-red-400/50 text-[12px] font-mono ml-2">Data Encryption Standard</span></h3>
                <p className="text-white/50 text-[11px] font-mono">El primer estándar federal (1977)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 relative z-10">
              <div className="flex items-start gap-2 bg-black/30 rounded-lg p-2.5 border border-white/5">
                <CalendarBlank size={16} color="#94a3b8" className="mt-0.5 shrink-0" />
                <p className="text-[11px] text-white/70 leading-snug">Creado por <strong>IBM</strong> y adoptado por la NSA. Se convirtió en el estándar mundial.</p>
              </div>
              <div className="flex items-start gap-2 bg-red-500/10 rounded-lg p-2.5 border border-red-500/20">
                <Key size={16} color="#f87171" className="mt-0.5 shrink-0" />
                <p className="text-[11px] text-red-200 leading-snug">Clave muy corta: solo <strong>56 bits</strong>. Decisión influenciada por la NSA para poder romperlo.</p>
              </div>
            </div>
          </motion.div>

          {/* 3DES CARD */}
          <motion.div variants={fadeUp} className="rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col gap-3"
            style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)' }}>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-amber-500/10 border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                <Bandaids size={24} weight="duotone" color="#fbbf24" />
              </div>
              <div>
                <h3 className="text-amber-400 font-bold text-[16px] tracking-wide">3DES <span className="text-amber-400/50 text-[12px] font-mono ml-2">Triple DES</span></h3>
                <p className="text-white/50 text-[11px] font-mono">El parche temporal</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2 relative z-10">
              <div className="flex items-center gap-2 bg-black/30 rounded-lg p-2.5 border border-white/5">
                <ShieldWarning size={16} color="#fbbf24" className="shrink-0" />
                <p className="text-[11px] text-white/70 leading-snug">
                  Ante la debilidad de DES, decidieron aplicarlo <strong>tres veces seguidas</strong> con claves distintas.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-amber-500/10 rounded-lg p-2.5 border border-amber-500/20">
                <WarningCircle size={16} color="#fbbf24" className="shrink-0" />
                <p className="text-[11px] text-amber-200 leading-snug">
                  Ataques como <strong className="text-amber-400">Sweet32 (2016)</strong> demostraron que tampoco era seguro para volúmenes altos. NIST lo deprecó en 2019.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Banner */}
          <motion.div variants={fadeUp} className="rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-3"
            style={{ background: 'linear-gradient(90deg, rgba(52,211,153,0.1), rgba(52,211,153,0.02))', border: '1px solid rgba(52,211,153,0.2)' }}>
            <ShieldCheck size={28} weight="duotone" color="#34d399" className="shrink-0" />
            <p className="text-white/80 text-[12px] leading-snug">
              <strong>Lección:</strong> El poder de cómputo crece rápido (Ley de Moore). 
              <strong className="text-emerald-400"> AES de 128+ bits</strong> fue creado para tener un margen de décadas.
            </p>
          </motion.div>

        </div>

        {/* Right Column: Key size & Deep Crack */}
        <motion.div variants={fadeUp} className="w-[45%] flex flex-col gap-4">
          
          {/* Chart */}
          <div className="rounded-3xl p-5 flex flex-col gap-4 flex-1 shadow-2xl relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 mb-1">
              <ChartBar size={20} weight="duotone" color="rgba(255,255,255,0.6)" />
              <p className="font-mono text-[12px] text-white/50 uppercase tracking-widest font-bold">Fuerza Bruta</p>
            </div>

            <div className="flex flex-col justify-center gap-4 flex-1">
              {BITS.map(({ algo, bits, power, time, color, status, bar }) => (
                <div key={algo} className="flex flex-col gap-1.5 group">
                  <div className="flex items-end justify-between">
                    <span className="font-mono text-[13px] font-bold" style={{ color }}>{algo}</span>
                    <span className="font-mono text-[10px] text-white/40 flex items-center gap-0.5">
                      {bits} bits · <span>2<sup className="text-[7.5px] ml-[0.5px]">{power}</sup></span> combos
                    </span>
                  </div>
                  <div className="h-4 rounded-full bg-black/50 border border-white/5 overflow-hidden relative">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${bar * 100}%` }}
                      transition={{ duration: 1, delay: 0.2, type: 'spring' }}
                      className="absolute top-0 left-0 bottom-0 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${color}40, ${color})`, boxShadow: `0 0 10px ${color}80` }} 
                    />
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded font-bold"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                      {status}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock size={12} color={color} />
                      <span className="text-[10px] font-mono text-white/60">{time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Crack Box */}
          <div className="rounded-3xl p-5 shrink-0 shadow-2xl relative overflow-hidden"
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)' }}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/40 shadow-[0_0_15px_rgba(248,113,113,0.3)]">
                <DesktopTower size={24} weight="duotone" color="#f87171" className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-red-400 font-bold text-[15px] uppercase tracking-wider">Deep Crack (1998)</h3>
                <p className="text-white/50 text-[10px] font-mono">Electronic Frontier Foundation</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-3 border border-red-500/20 relative z-10 flex flex-col gap-2.5">
              <p className="text-white/80 text-[12px] leading-relaxed">
                Máquina de <strong className="text-red-300">$250,000</strong> con <strong>1,856 chips</strong> dedicados.
                Rompió DES en <strong>22 horas</strong> probando <span className="text-red-400 font-bold font-mono">90 billones</span> de claves/segundo.
              </p>
              
              <div className="pt-2.5 border-t border-red-500/20">
                <p className="text-[11px] text-white/70 leading-relaxed">
                  <strong className="text-red-400">¿Por qué es importante histórico?</strong> 
                  <br/>
                  Demostró públicamente que el estándar del gobierno ya era inseguro. Esto forzó un cambio de paradigma total: de algoritmos creados en secreto por agencias de inteligencia, se pasó a un <strong>concurso público, transparente y mundial</strong> para elegir al sucesor (AES), permitiendo que la comunidad global lo auditara.
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
