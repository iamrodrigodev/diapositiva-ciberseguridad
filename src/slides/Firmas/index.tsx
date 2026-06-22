import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import {
  Globe, Package, CurrencyBtc, EnvelopeSimple,
  Key, Terminal, Signature, ShieldCheck, Handshake,
} from '@phosphor-icons/react'

const USES = [
  { Icon: Globe,           name: 'HTTPS (TLS)',        detail: 'Certificados X.509 usan RSA o ECDSA para el servidor.', color: '#60a5fa' },
  { Icon: Package,         name: 'Software Updates',   detail: 'Apple/Google firman cada release. El OS verifica.', color: '#34d399' },
  { Icon: CurrencyBtc,     name: 'Bitcoin / Crypto',   detail: 'Transacciones firmadas con ECDSA. Protege tus fondos.', color: '#fbbf24' },
  { Icon: EnvelopeSimple,  name: 'Email (S/MIME)',     detail: 'Garantiza que el email no fue falsificado ni modificado.', color: '#a78bfa' },
  { Icon: Key,             name: 'JWT (RS256)',         detail: 'Tokens de autenticación web firmados por el servidor.', color: '#f87171' },
  { Icon: Terminal,        name: 'SSH (Host Key)',      detail: 'El servidor firma un reto; el cliente lo verifica.', color: '#94a3b8' },
]

export default function Firmas() {
  return (
    <SlideLayout>
      <Tag>Asimétrica · Carlos</Tag>
      <Title>Firmas Digitales</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-5 overflow-hidden mt-1">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Key insight */}
          <motion.div variants={fadeUp} className="rounded-3xl p-5 relative overflow-hidden shrink-0"
            style={{ background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.2)' }}>
            
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none" 
              style={{ background: '#a78bfa' }} />

            <div className="flex items-center gap-2 mb-2 relative z-10">
              <Signature size={20} weight="duotone" color="#a78bfa" />
              <p className="font-mono text-[11px] text-violet-400 uppercase tracking-widest font-bold">El truco maestro</p>
            </div>
            <p className="text-white/80 text-[14px] leading-relaxed relative z-10">
              A diferencia del cifrado (donde usas la pública del receptor),
              <strong className="text-violet-300"> la firma usa tu clave PRIVADA</strong>.
              Cualquiera puede verificarla con tu clave pública, pero <strong className="text-white">solo tú</strong> pudiste haberla firmado.
            </p>
          </motion.div>

          {/* Process */}
          <motion.div variants={fadeUp} className="rounded-3xl p-5 flex-1 flex flex-col justify-center"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[11px] text-white/50 uppercase tracking-widest mb-3 font-bold">Proceso de firma (Alice → Bob)</p>
            <div className="flex flex-col gap-2">
              {[
                { n: '1', title: 'Hash del mensaje', color: '#60a5fa', code: 'H = SHA-256(mensaje)', desc: '— se firma el hash de tamaño fijo, no el archivo gigante.' },
                { n: '2', title: 'Firma con clave privada', color: '#a78bfa', code: 'S = Sign(H, privKey_A)', desc: '— Alice "sella" el hash matemáticamente. S se adjunta.' },
                { n: '3', title: 'Bob verifica', color: '#34d399', code: 'Verify(msg, S, pubKey_A) → ✓', desc: '— Bob comprueba usando la clave pública de Alice.' },
              ].map(({ n, title, color, code, desc }) => (
                <div key={n} className="flex items-start gap-3 rounded-2xl px-4 py-3 transition-all hover:scale-[1.01]"
                  style={{ background: `${color}06`, border: `1px solid ${color}15` }}>
                  <span className="font-mono text-[15px] font-bold shrink-0 mt-0.5" style={{ color }}>{n}.</span>
                  <div>
                    <div className="text-[14px] font-bold text-white/90 mb-1">{title}</div>
                    <div className="text-white/60 text-[12px] leading-snug">
                      <span className="font-mono bg-white/5 px-1 py-0.5 rounded text-[11px] border border-white/10 mr-1" style={{ color }}>{code}</span>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Guarantees */}
          <motion.div variants={fadeUp} className="rounded-3xl p-4 shrink-0"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={14} weight="duotone" color="rgba(255,255,255,0.4)" />
              <p className="font-mono text-[11px] text-white/50 uppercase tracking-widest font-bold">Garantías absolutas</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <Handshake size={18} weight="duotone" color="#34d399" />, title: 'Autenticidad', desc: 'El mensaje vino de Alice', c: '#34d399' },
                { icon: <ShieldCheck size={18} weight="duotone" color="#60a5fa" />, title: 'Integridad', desc: 'No fue alterado', c: '#60a5fa' },
                { icon: <Signature size={18} weight="duotone" color="#a78bfa" />, title: 'No repudio', desc: 'Alice no puede negarlo', c: '#a78bfa' },
              ].map(({ icon, title, desc, c }) => (
                <div key={title} className="rounded-2xl px-2 py-2.5 text-center transition-all hover:scale-[1.02]"
                  style={{ background: `${c}08`, border: `1px solid ${c}20` }}>
                  <div className="flex justify-center mb-1">{icon}</div>
                  <div className="text-[12px] font-bold mb-0.5" style={{ color: c }}>{title}</div>
                  <div className="text-white/60 text-[10px]">{desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Real uses */}
        <motion.div variants={fadeUp} className="w-[38%] flex flex-col gap-3">
          <div className="rounded-3xl p-5 flex-1 flex flex-col"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[11px] text-white/50 uppercase tracking-widest mb-3 font-bold">Usos en el mundo real</p>
            <div className="flex flex-col gap-2 flex-1 justify-center">
              {USES.map(({ Icon, name, detail, color }) => (
                <div key={name} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all hover:scale-[1.02]"
                  style={{ background: `${color}08`, border: `1px solid ${color}1a` }}>
                  <div className="bg-white/5 p-2 rounded-xl shrink-0" style={{ border: `1px solid ${color}20` }}>
                    <Icon size={20} weight="duotone" color={color} />
                  </div>
                  <div>
                    <div className="font-bold text-[13px] mb-0.5" style={{ color }}>{name}</div>
                    <div className="text-white/50 text-[12px] leading-snug">{detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
