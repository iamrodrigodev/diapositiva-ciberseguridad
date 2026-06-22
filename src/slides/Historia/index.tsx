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

      <motion.div variants={stagger} className="flex-1 flex gap-8 overflow-hidden mt-2">
        {/* Timeline */}
        <div className="flex-1 relative overflow-y-auto pr-4 custom-scrollbar">
          <div className="absolute left-6.5 top-4 bottom-4 w-px"
            style={{ background: 'linear-gradient(180deg,transparent,rgba(255,255,255,0.15) 10%,rgba(255,255,255,0.15) 90%,transparent)' }} />
          <div className="flex flex-col gap-6">
            {EVENTS.map(({ year, name, desc, color, Icon }, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-start gap-5 group cursor-default">
                <div className="flex flex-col items-center shrink-0 w-13">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    style={{ background: `${color}15`, border: `1px solid ${color}40`, boxShadow: `0 0 15px ${color}10` }}>
                    <Icon size={24} weight="duotone" color={color} />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10" style={{ color }}>{year}</span>
                    <span className="text-lg font-bold text-white/95 group-hover:text-white transition-colors">{name}</span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed pr-6 group-hover:text-white/85 transition-colors">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <motion.div variants={fadeUp} className="w-[42%] flex flex-col gap-5">
          <div className="flex-1 rounded-3xl overflow-hidden flex flex-col relative group shadow-2xl"
            style={{ background: 'rgba(167,139,250,0.04)', border: '1px solid rgba(167,139,250,0.2)' }}>
            
            {/* Image Section */}
            <div className="h-[45%] w-full relative overflow-hidden">
              <img 
                src="/enigma-machine.png" 
                alt="Máquina Enigma" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <p className="font-mono text-[10px] text-violet-200 bg-violet-900/60 px-2 py-1 rounded backdrop-blur-md uppercase tracking-widest border border-violet-500/30">
                  Caso emblemático
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-6 pb-6 pt-1 flex flex-col gap-4 flex-1">
              <div>
                <h3 className="text-violet-300 font-bold text-2xl leading-tight">
                  Máquina Enigma
                </h3>
                <p className="text-white/60 text-sm mt-1">Rota por Alan Turing en Bletchley Park</p>
              </div>
              
              <div className="text-white/80 text-sm leading-relaxed space-y-3 flex-1">
                <p>
                  Enigma generaba <strong className="text-violet-300">158 quintillones</strong> de configuraciones posibles que los nazis cambiaban cada 24 horas.
                </p>
                <p>
                  Turing construyó la <strong className="text-violet-200">Bombe</strong>, un dispositivo electromecánico que descifraba los mensajes en horas, salvando millones de vidas.
                </p>
              </div>

              <div className="rounded-xl px-4 py-3 mt-auto relative overflow-hidden"
                style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)' }}>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500/50" />
                <p className="text-violet-300 text-xs font-bold mb-1 ml-2">Lección</p>
                <p className="text-white/75 text-xs leading-relaxed ml-2">
                  Complejidad no es seguridad. La criptografía moderna se basa en problemas matemáticos rigurosos probadamente difíciles.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl px-5 py-4 flex items-start gap-4 transition-colors hover:bg-emerald-500/5"
            style={{ background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.2)' }}>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 shrink-0">
              <ShieldCheck size={24} weight="duotone" className="text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-400 text-sm font-bold mb-1">Principio de Kerckhoffs</p>
              <p className="text-white/70 text-[13px] leading-relaxed italic">
                "Un sistema criptográfico debe ser seguro incluso si todo sobre él, excepto la clave secreta, es público."
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
