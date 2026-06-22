import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import { RADAR_DATA, COMPARISONS } from './data'

export default function Comparativa() {
  return (
    <SlideLayout>
      <Tag>Comparativa · Ambos</Tag>
      <Title>Simétrica vs Asimétrica</Title>

      <div className="flex gap-6 flex-1 overflow-hidden">
        <motion.div variants={fadeUp} className="w-[46%] flex items-center">
          <ResponsiveContainer width="100%" height={340}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="subject"
                tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 13, fontFamily: 'JetBrains Mono' }} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, fontSize: 13 }}
                labelStyle={{ color: '#fff' }} />
              <Legend wrapperStyle={{ fontSize: 13, fontFamily: 'JetBrains Mono', paddingTop: 8 }} />
              <Radar name="Simétrica"  dataKey="Simetrica"  stroke="#34d399" fill="#34d399" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Asimétrica" dataKey="Asimetrica" stroke="#818cf8" fill="#818cf8" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={fadeUp} className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
          <div className="grid grid-cols-[1fr_1.3fr_1.3fr] gap-2 mb-1">
            <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Aspecto</span>
            <span className="text-sm font-bold text-emerald-400">Simétrica</span>
            <span className="text-sm font-bold text-violet-400">Asimétrica</span>
          </div>

          {COMPARISONS.map(({ label, sym, asym }) => (
            <div key={label} className="grid grid-cols-[1fr_1.3fr_1.3fr] gap-2 rounded-xl px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="text-sm font-mono text-white/45">{label}</span>
              <span className="text-sm text-emerald-400/85">{sym}</span>
              <span className="text-sm text-violet-400/85">{asym}</span>
            </div>
          ))}

          <div className="rounded-2xl p-5 mt-2" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.22)' }}>
            <p className="text-amber-400 font-bold text-base mb-2">La solución real: Criptografía Híbrida</p>
            <p className="text-white/65 text-sm leading-relaxed">
              TLS 1.3, PGP y SSH usan <strong className="text-white/85">asimétrica solo para el intercambio de clave</strong> (handshake), y luego cifran todo el tráfico con <strong className="text-white/85">AES o ChaCha20</strong> (simétrica). Así combinan la seguridad de una con la velocidad de la otra.
            </p>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
