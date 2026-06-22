import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import { RADAR_DATA, COMPARISONS } from './data'
import { Key, Lightning, ShareNetwork, HardDrives, LockKey, GitMerge } from '@phosphor-icons/react'

const ICON_MAP: Record<string, any> = {
  'Misma clave': Key,
  'Velocidad': Lightning,
  'Distribución clave': ShareNetwork,
  'Uso real': HardDrives,
  'TLS 1.3': LockKey
}

export default function Comparativa() {
  return (
    <SlideLayout>
      <Tag>Comparativa · Ambos</Tag>
      <Title>Simétrica vs Asimétrica</Title>

      <div className="flex gap-6 flex-1 overflow-hidden mt-1">
        {/* Radar Chart */}
        <motion.div variants={fadeUp} className="w-[45%] flex flex-col justify-center items-center relative">
          {/* Circular Glowing Auras */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[40%] w-64 h-64 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <ResponsiveContainer width="100%" height={380}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="subject"
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: 'JetBrains Mono', fontWeight: 'bold' }} />
              <Tooltip
                contentStyle={{ background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: 4 }} />
              <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'JetBrains Mono', paddingTop: 10, opacity: 0.8 }} />
              <Radar name="Simétrica"  dataKey="Simetrica"  stroke="#34d399" fill="#34d399" fillOpacity={0.25} strokeWidth={2.5} />
              <Radar name="Asimétrica" dataKey="Asimetrica" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.25} strokeWidth={2.5} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Comparison List */}
        <motion.div variants={fadeUp} className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 pb-1">
          
          {/* Header */}
          <div className="grid grid-cols-[auto_1fr_1fr] gap-3 mb-1 px-4 items-center">
            <span className="w-8"></span> {/* Spacer for icon */}
            <span className="text-[12px] font-bold text-emerald-400 uppercase tracking-widest text-center bg-emerald-500/10 py-1 rounded-lg border border-emerald-500/20">Simétrica</span>
            <span className="text-[12px] font-bold text-violet-400 uppercase tracking-widest text-center bg-violet-500/10 py-1 rounded-lg border border-violet-500/20">Asimétrica</span>
          </div>

          {/* Rows */}
          {COMPARISONS.map(({ label, sym, asym }) => {
            const Icon = ICON_MAP[label] || Key
            return (
              <div key={label} className="grid grid-cols-[auto_1fr_1fr] gap-3 rounded-2xl p-2 items-center group transition-colors hover:bg-white/5"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative shrink-0">
                  <Icon size={18} weight="duotone" className="text-white/60 group-hover:text-white transition-colors" />
                  <div className="absolute -top-2.5 -left-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-[9px] px-2 py-0.5 rounded whitespace-nowrap border border-white/10 pointer-events-none z-20">{label}</div>
                </div>
                
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-2 flex items-center justify-center text-center h-full">
                  <span className="text-[11px] font-medium text-emerald-100/90">{sym}</span>
                </div>
                
                <div className="bg-violet-500/5 border border-violet-500/10 rounded-xl p-2 flex items-center justify-center text-center h-full">
                  <span className="text-[11px] font-medium text-violet-100/90">{asym}</span>
                </div>
              </div>
            )
          })}

          {/* Hybrid Box */}
          <div className="rounded-3xl p-4 mt-auto relative overflow-hidden group">
            {/* Gradient Backgrounds */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-gradient-to-r from-emerald-500/40 via-amber-500/40 to-violet-500/40 blur-xl" />
            <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md" />
            <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors" />
            
            <div className="relative z-10 flex gap-3 items-start">
              <div className="p-2.5 bg-amber-500/20 rounded-2xl border border-amber-500/30 shrink-0">
                <GitMerge size={20} weight="duotone" className="text-amber-400" />
              </div>
              <div>
                <p className="text-amber-400 font-bold text-[14px] mb-1 flex items-center gap-2">
                  La Solución Real: Criptografía Híbrida
                </p>
                <p className="text-white/70 text-[12px] leading-relaxed">
                  Los protocolos modernos (TLS, SSH) usan <strong className="text-violet-300 font-bold bg-violet-500/20 px-1 rounded">Asimétrica</strong> para intercambiar claves de forma segura, y cifran los datos a máxima velocidad usando <strong className="text-emerald-300 font-bold bg-emerald-500/20 px-1 rounded">Simétrica</strong>. ¡Lo mejor de ambos mundos!
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </SlideLayout>
  )
}
