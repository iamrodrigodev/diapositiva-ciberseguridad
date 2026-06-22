import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import {
  Buildings, Scroll, Cpu, LockKey, Trophy, Eye, ShieldCheck,
} from '@phosphor-icons/react'

const EVENTS = [
  { year: '~100 a.C.', name: 'Cifrado César',    desc: 'Julio César desplazaba cada letra 3 posiciones. Fácil de romper por análisis de frecuencia.', color: '#94a3b8', Icon: Buildings  },
  { year: '1553',      name: 'Vigenère',          desc: 'Cifrado polialfabético con clave de palabra. Considerado irrompible durante 300 años.',          color: '#60a5fa', Icon: Scroll     },
  { year: '1940–45',   name: 'Enigma & Turing',   desc: 'Los nazis cifraban con máquinas de rotores. Alan Turing la rompió en Bletchley Park, acortando la WWII.', color: '#a78bfa', Icon: Cpu     },
  { year: '1977',      name: 'DES + RSA',         desc: 'DES: primer estándar NIST de criptografía simétrica. RSA: primera criptografía de clave pública viable.', color: '#fbbf24', Icon: LockKey },
  { year: '2001',      name: 'AES (Rijndael)',    desc: 'El algoritmo belga Rijndael gana la competencia NIST. Reemplaza DES. Estándar mundial vigente.',  color: '#34d399', Icon: Trophy     },
  { year: '2013',      name: 'Era Post-Snowden',  desc: 'NSA revelada con vigilancia masiva. El cifrado end-to-end se vuelve prioridad. WhatsApp, Signal nacen.', color: '#f87171', Icon: Eye    },
  { year: '2018+',     name: 'TLS 1.3 & PQC',    desc: 'TLS 1.3 elimina algoritmos débiles. NIST estandariza criptografía post-cuántica para resistir computadoras cuánticas.', color: '#34d399', Icon: ShieldCheck },
]

export default function Historia() {
  return (
    <SlideLayout>
      <Tag>Fundamentos · Rodrigo</Tag>
      <Title>Historia de la Criptografía</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-6 overflow-hidden">
        {/* Timeline */}
        <div className="flex-1 relative overflow-y-auto pr-2">
          <div className="absolute left-[52px] top-1 bottom-1 w-px"
            style={{ background: 'linear-gradient(180deg,transparent,rgba(255,255,255,0.1) 10%,rgba(255,255,255,0.1) 90%,transparent)' }} />
          <div className="flex flex-col gap-3">
            {EVENTS.map(({ year, name, desc, color, Icon }, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-start gap-4">
                <div className="flex flex-col items-center shrink-0 w-12">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center relative z-10"
                    style={{ background: `${color}15`, border: `1px solid ${color}35` }}>
                    <Icon size={18} weight="duotone" color={color} />
                  </div>
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[10px] font-bold" style={{ color }}>{year}</span>
                    <span className="text-sm font-bold text-white/90">{name}</span>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <motion.div variants={fadeUp} className="w-[36%] flex flex-col gap-3">
          <div className="flex-1 rounded-2xl p-5 flex flex-col gap-4"
            style={{ background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.2)' }}>
            <p className="font-mono text-[10px] text-violet-400/60 uppercase tracking-widest">Caso emblemático</p>
            <Cpu size={36} weight="duotone" color="#a78bfa" />
            <h3 className="text-violet-300 font-bold text-lg leading-tight">
              Máquina Enigma<br />
              <span className="text-white/80 text-base font-normal">y Alan Turing</span>
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Enigma generaba <strong className="text-white/80">158 quintillones</strong> de configuraciones posibles.
              Los nazis cambiaban la configuración cada 24 horas.
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Turing construyó la <strong className="text-violet-300">Bombe</strong> — una máquina electromecánica
              que encontraba la configuración diaria en horas. Salvó millones de vidas.
            </p>
            <div className="rounded-xl px-4 py-3"
              style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)' }}>
              <p className="text-violet-300 text-xs font-bold mb-1">Lección</p>
              <p className="text-white/75 text-xs leading-relaxed">
                Complejidad no es seguridad. La criptografía moderna se basa en problemas matemáticos probadamente difíciles.
              </p>
            </div>
          </div>

          <div className="rounded-2xl px-4 py-3"
            style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}>
            <p className="text-emerald-400 text-xs font-bold mb-1">Principio de Kerckhoffs (1883)</p>
            <p className="text-white/75 text-xs leading-relaxed italic">
              "Un sistema criptográfico debe ser seguro incluso si todo sobre él, excepto la clave, es de conocimiento público."
            </p>
          </div>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
