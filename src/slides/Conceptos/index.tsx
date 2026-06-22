import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import {
  FileText, LockKey, Key, Gear,
  LockSimple, CheckSquare, IdentificationCard, NotePencil,
} from '@phosphor-icons/react'

const TERMS = [
  { term: 'Plaintext',   color: '#60a5fa', Icon: FileText,           def: 'Datos originales legibles. El mensaje antes de cifrar.' },
  { term: 'Ciphertext',  color: '#a78bfa', Icon: LockSimple,         def: 'Datos cifrados ininteligibles. El resultado del cifrado.' },
  { term: 'Clave (Key)', color: '#34d399', Icon: Key,                def: 'Secreto que controla el cifrado/descifrado. Su tamaño determina la seguridad.' },
  { term: 'Algoritmo',   color: '#fbbf24', Icon: Gear,               def: 'Proceso matemático público. La seguridad NO depende de que sea secreto.' },
]

const PROPERTIES = [
  { name: 'Confidencialidad', Icon: LockKey,           desc: 'Solo el destinatario puede leer el mensaje', color: '#34d399' },
  { name: 'Integridad',       Icon: CheckSquare,       desc: 'El mensaje no fue alterado en tránsito',     color: '#60a5fa' },
  { name: 'Autenticidad',     Icon: IdentificationCard,desc: 'El remitente es quien dice ser',              color: '#a78bfa' },
  { name: 'No repudio',       Icon: NotePencil,        desc: 'El emisor no puede negar haber enviado',      color: '#fbbf24' },
]

export default function Conceptos() {
  return (
    <SlideLayout>
      <Tag>Fundamentos · Rodrigo</Tag>
      <Title>Conceptos Clave</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-6 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4">
          {/* Visual flow */}
          <motion.div variants={fadeUp} className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-3">Flujo de cifrado</p>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Plaintext */}
              <div className="rounded-xl px-4 py-3 text-center"
                style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.3)' }}>
                <FileText size={24} weight="duotone" color="#60a5fa" className="mx-auto mb-1" />
                <div className="font-mono text-xs text-blue-300 font-bold">Plaintext</div>
                <div className="font-mono text-xs text-white/60 mt-0.5">"Hola Mundo"</div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Key size={20} weight="duotone" color="#34d399" />
                <div className="flex items-center gap-1">
                  <div className="w-5 h-px bg-emerald-400/40" />
                  <div className="rounded px-2 py-0.5 font-mono text-[9px] text-emerald-400"
                    style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)' }}>E(P,K)</div>
                  <div className="w-5 h-px bg-emerald-400/40" />
                </div>
                <span className="text-white/40 text-xs">→</span>
              </div>

              {/* Ciphertext */}
              <div className="rounded-xl px-4 py-3 text-center"
                style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.3)' }}>
                <LockSimple size={24} weight="duotone" color="#a78bfa" className="mx-auto mb-1" />
                <div className="font-mono text-xs text-violet-300 font-bold">Ciphertext</div>
                <div className="font-mono text-xs text-white/60 mt-0.5">"4f#Xq$9!"</div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Key size={20} weight="duotone" color="#34d399" />
                <div className="flex items-center gap-1">
                  <div className="w-5 h-px bg-emerald-400/40" />
                  <div className="rounded px-2 py-0.5 font-mono text-[9px] text-emerald-400"
                    style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)' }}>D(C,K)</div>
                  <div className="w-5 h-px bg-emerald-400/40" />
                </div>
                <span className="text-white/40 text-xs">→</span>
              </div>

              {/* Output */}
              <div className="rounded-xl px-4 py-3 text-center"
                style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)' }}>
                <FileText size={24} weight="duotone" color="#34d399" className="mx-auto mb-1" />
                <div className="font-mono text-xs text-emerald-300 font-bold">Plaintext</div>
                <div className="font-mono text-xs text-white/60 mt-0.5">"Hola Mundo" ✓</div>
              </div>
            </div>
          </motion.div>

          {/* Terms grid */}
          <div className="grid grid-cols-2 gap-2 flex-1">
            {TERMS.map(({ term, color, Icon, def }) => (
              <motion.div key={term} variants={fadeUp} className="rounded-xl p-4"
                style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon size={18} weight="duotone" color={color} />
                  <span className="font-bold text-sm" style={{ color }}>{term}</span>
                </div>
                <p className="text-white/75 text-xs leading-relaxed">{def}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Properties + Kerckhoffs */}
        <motion.div variants={fadeUp} className="w-[34%] flex flex-col gap-3">
          <div className="rounded-2xl p-4 flex flex-col gap-2"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Propiedades de seguridad</p>
            {PROPERTIES.map(({ name, Icon, desc, color }) => (
              <div key={name} className="flex items-start gap-3 rounded-xl px-3 py-2.5"
                style={{ background: `${color}08`, border: `1px solid ${color}1a` }}>
                <Icon size={20} weight="duotone" color={color} className="shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs mb-0.5" style={{ color }}>{name}</div>
                  <div className="text-white/65 text-xs">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4"
            style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <p className="font-mono text-[10px] text-amber-400/70 uppercase tracking-widest mb-2">Principio de Kerckhoffs</p>
            <p className="text-white/65 text-sm leading-relaxed">
              El <strong className="text-amber-300">algoritmo</strong> puede ser público.<br />
              La <strong className="text-amber-300">clave</strong> debe ser secreta.
            </p>
            <p className="text-white/60 text-xs mt-2 leading-relaxed">
              AES, RSA, DH son algoritmos completamente públicos. Su seguridad está en la imposibilidad matemática de encontrar la clave.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
