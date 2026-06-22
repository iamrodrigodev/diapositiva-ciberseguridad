import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import CommDiagram from './CommDiagram'
import { UserFocus, Warning, Password } from '@phosphor-icons/react'

const THREATS = [
  { color: '#f87171', label: 'Intercepción (Sniffing)', Icon: Warning,    desc: 'Cualquiera en tu misma red WiFi (un café o aeropuerto) puede capturar tus datos y leer tus mensajes si van en texto plano.' },
  { color: '#fbbf24', label: 'Manipulación (Tampering)',Icon: Password,   desc: 'Un intermediario podría alterar en secreto el mensaje (por ejemplo, cambiar "transfiere $10" a "$1000") sin que te des cuenta.' },
  { color: '#a78bfa', label: 'Suplantación (Spoofing)', Icon: UserFocus,  desc: 'Un atacante puede hacerse pasar por tu banco o un amigo para engañarte. Necesitamos forma matemática de probar quién es quién.' },
]

export default function Introduccion() {
  return (
    <SlideLayout>
      <Tag>Introducción · Rodrigo</Tag>
      <Title>¿Por qué usamos Criptografía?</Title>

      <div className="flex gap-8 flex-1 overflow-hidden mt-2">
        <motion.div variants={stagger} className="w-[55%] flex flex-col gap-5">
          <motion.div variants={fadeUp} className="rounded-3xl p-6 shadow-2xl relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="absolute inset-0 bg-linear-to-br from-red-500/5 via-transparent to-orange-500/5 pointer-events-none" />
            <p className="text-white/85 text-[15px] leading-relaxed relative z-10">
              Internet es un medio <strong className="text-red-400">inseguro por defecto</strong>. 
              La criptografía es la única barrera que permite que exista el e-commerce, la banca online y la privacidad moderna, protegiéndonos de tres amenazas críticas:
            </p>
          </motion.div>

          <div className="flex flex-col gap-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {THREATS.map(({ color, label, desc, Icon }) => (
              <motion.div key={label} variants={fadeUp}
                className="rounded-2xl px-5 py-4 transition-all hover:bg-white/5 shrink-0 shadow-lg flex gap-4 items-start"
                style={{ background: `${color}08`, border: `1px solid ${color}1a` }}>
                <div className="p-2 rounded-xl shrink-0" style={{ background: `${color}15` }}>
                  <Icon size={24} weight="duotone" color={color} />
                </div>
                <div>
                  <div className="font-bold text-[15px] mb-1" style={{ color }}>{label}</div>
                  <div className="text-white/70 text-[13px] leading-relaxed">{desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>

        <motion.div variants={fadeUp} className="w-[45%] flex flex-col gap-5 h-full">
          <div className="flex-1 shadow-2xl">
            <CommDiagram />
          </div>
          
          <motion.div variants={fadeUp} className="shrink-0 rounded-3xl p-5 shadow-2xl relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 via-violet-500/5 to-amber-500/5 pointer-events-none" />
            <p className="text-[11px] font-mono text-white/50 uppercase tracking-widest mb-3 relative z-10 font-bold">Familia de Algoritmos</p>
            <div className="flex flex-col gap-2.5 relative z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-emerald-400 w-24">Simétrica</span>
                <span className="text-white/60 text-[13px]">Usa la misma clave para cifrar y descifrar.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-violet-400 w-24">Asimétrica</span>
                <span className="text-white/60 text-[13px]">Usa un par de claves (Pública y Privada).</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-400 w-24">Híbrida</span>
                <span className="text-white/60 text-[13px]">Combina ambas para velocidad y seguridad (TLS).</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SlideLayout>
  )
}
