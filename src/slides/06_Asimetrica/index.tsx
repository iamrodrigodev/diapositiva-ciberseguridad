import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'
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

      <div className="flex gap-5 flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-1">
          <RSACalc />
        </div>

        <motion.div variants={fadeUp} className="w-[38%] flex flex-col gap-3">
          <div className="rounded-2xl p-5 flex-1 flex flex-col gap-3"
            style={{ background: 'rgba(96,165,250,0.04)', border: '1px solid rgba(96,165,250,0.18)' }}>
            <h3 className="text-blue-400 font-bold text-lg">ECC — Curvas Elípticas</h3>
            <ECCCanvas />
            <p className="text-white/60 text-sm leading-relaxed">
              Ecuación: <strong className="text-white/80">y² = x³ − x + 1</strong>. La seguridad viene de la dificultad del <strong className="text-white/80">Logaritmo Discreto en curvas elípticas (ECDLP)</strong> — computacionalmente insoluble con claves de 256 bits.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[['RSA-2048', '2048 bits', '#a78bfa'], ['ECC-256', '256 bits', '#60a5fa']].map(([name, bits, color]) => (
                <div key={name} className="rounded-xl px-4 py-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-sm font-bold" style={{ color }}>{name}</div>
                  <div className="text-white/50 text-sm mt-0.5">{bits} de clave</div>
                  <div className="text-xs text-white/30 mt-1">seguridad equivalente</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/45 leading-relaxed">
              ECC logra la misma seguridad que RSA con claves 8× más cortas — ideal para dispositivos móviles y TLS 1.3.
            </p>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
