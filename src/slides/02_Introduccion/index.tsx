import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import CommDiagram from './CommDiagram'

const PILLARS = [
  { color: '#34d399', label: 'Confidencialidad', desc: 'Solo el destinatario autorizado puede leer los datos. Nadie que intercepte el mensaje podrá entenderlo.' },
  { color: '#60a5fa', label: 'Integridad',        desc: 'Garantiza que el mensaje no fue alterado en tránsito. Cualquier modificación es detectable.' },
  { color: '#a78bfa', label: 'Autenticidad',      desc: 'Verifica que el remitente es quien dice ser. Previene ataques de suplantación de identidad.' },
]

export default function Introduccion() {
  return (
    <SlideLayout>
      <Tag>Introducción · Rodrigo</Tag>
      <Title>¿Por qué criptografía?</Title>

      <div className="flex gap-6 flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4">
          <motion.p variants={fadeUp} className="text-white/80 text-base leading-relaxed">
            La criptografía convierte información legible en datos ininteligibles para quien no tenga la clave.
            Sin ella no existiría HTTPS, banca online, autenticación ni ningún protocolo seguro moderno.
          </motion.p>

          <div className="flex flex-col gap-2.5">
            {PILLARS.map(({ color, label, desc }) => (
              <motion.div key={label} variants={fadeUp}
                className="rounded-xl px-5 py-4"
                style={{ background: `${color}09`, border: `1px solid ${color}22` }}>
                <div className="font-bold text-base mb-1" style={{ color }}>{label}</div>
                <div className="text-white/75 text-sm leading-relaxed">{desc}</div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="rounded-xl px-5 py-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-mono text-white/50 uppercase tracking-widest mb-2">Tipos de criptografía</p>
            <div className="flex gap-4 flex-wrap">
              <span className="text-sm"><strong className="text-emerald-400">Simétrica</strong> <span className="text-white/60">— misma clave</span></span>
              <span className="text-sm"><strong className="text-violet-400">Asimétrica</strong> <span className="text-white/60">— par pública/privada</span></span>
              <span className="text-sm"><strong className="text-amber-400">Híbrida</strong> <span className="text-white/60">— ambas (TLS, PGP)</span></span>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="w-[42%] flex">
          <CommDiagram />
        </motion.div>
      </div>
    </SlideLayout>
  )
}
