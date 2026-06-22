import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import ColorMixer from './ColorMixer'

export default function DiffieHellman() {
  const [aliceHue, setAliceHue] = useState(0)
  const [bobHue,   setBobHue]   = useState(240)

  return (
    <SlideLayout>
      <Tag>Intercambio de Claves · Carlos</Tag>
      <Title>Diffie-Hellman</Title>

      <div className="flex gap-6 flex-1 overflow-hidden">
        <motion.div variants={fadeUp} className="w-[48%] overflow-y-auto pr-1">
          <ColorMixer aliceHue={aliceHue} bobHue={bobHue} onAlice={setAliceHue} onBob={setBobHue} />
        </motion.div>

        <div className="flex flex-col gap-3 flex-1">
          <motion.div variants={fadeUp} className="flex-1 rounded-2xl p-5 flex flex-col gap-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-mono text-white/30 uppercase tracking-widest">Matemática — aritmética modular</p>

            <div className="p-4 rounded-xl" style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.18)' }}>
              <p className="text-xs font-mono text-white/35 uppercase tracking-wider mb-1">Parámetros públicos (conocidos por todos)</p>
              <p className="text-base font-mono text-white/85">p = primo grande &nbsp; g = generador</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ['#60a5fa', 'ALICE', 'Elige secreto a (privado)', 'Publica A = gᵃ mod p'],
                ['#a78bfa', 'BOB',   'Elige secreto b (privado)', 'Publica B = gᵇ mod p'],
              ].map(([c, who, l1, l2]) => (
                <div key={who} className="p-4 rounded-xl" style={{ background: `${c}0c`, border: `1px solid ${c}25` }}>
                  <div className="text-sm font-bold mb-2" style={{ color: c }}>{who}</div>
                  <div className="text-white/60 text-sm">{l1}</div>
                  <div className="text-sm mt-1" style={{ color: c }}>{l2}</div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.22)' }}>
              <p className="text-amber-400 text-sm font-bold mb-1">Secreto compartido</p>
              <div className="text-sm text-white/65 space-y-0.5 font-mono">
                <div>Alice: s = B<sup>a</sup> mod p</div>
                <div>Bob: &nbsp;&nbsp;s = A<sup>b</sup> mod p</div>
              </div>
              <p className="text-emerald-400 text-sm mt-2">¡Ambos llegan al mismo s sin haberlo transmitido!</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-2xl p-4"
            style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.20)' }}>
            <p className="text-red-400 font-bold text-sm mb-1">¿Por qué es seguro?</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Un atacante puede ver A y B, pero calcular a o b desde ellos requiere resolver el <strong className="text-white/80">Logaritmo Discreto</strong> — imposible en tiempo razonable con primos de cientos de bits.
            </p>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  )
}
