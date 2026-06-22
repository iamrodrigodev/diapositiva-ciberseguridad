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
  { Icon: Globe,           name: 'HTTPS (TLS)',        detail: 'Los certificados X.509 usan RSA o ECDSA para autenticar el servidor.', color: '#60a5fa' },
  { Icon: Package,         name: 'Software Updates',   detail: 'Apple, Microsoft, Google firman cada release. El OS verifica antes de instalar.', color: '#34d399' },
  { Icon: CurrencyBtc,     name: 'Bitcoin/Blockchain', detail: 'Cada transacción está firmada con ECDSA. Sin la clave privada nadie puede gastar tus fondos.', color: '#fbbf24' },
  { Icon: EnvelopeSimple,  name: 'Email (S/MIME)',     detail: 'Firma digital del emisor garantiza que el email no fue falsificado ni modificado.', color: '#a78bfa' },
  { Icon: Key,             name: 'JWT (RS256)',         detail: 'Tokens de autenticación firmados por el servidor. El cliente verifica sin necesitar el secreto.', color: '#f87171' },
  { Icon: Terminal,        name: 'SSH (host key)',      detail: 'El servidor SSH firma un reto con su clave privada. El cliente verifica con la clave pública guardada.', color: '#94a3b8' },
]

export default function Firmas() {
  return (
    <SlideLayout>
      <Tag>Asimétrica · Carlos</Tag>
      <Title>Firmas Digitales</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-5 overflow-hidden">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Key insight */}
          <motion.div variants={fadeUp} className="rounded-2xl p-4"
            style={{ background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.2)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Signature size={18} weight="duotone" color="#a78bfa" />
              <p className="font-mono text-[10px] text-violet-400/60 uppercase tracking-widest">El truco de la firma digital</p>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              A diferencia del cifrado (donde se usa la clave pública del receptor),
              <strong className="text-violet-300"> la firma usa la clave PRIVADA del emisor</strong>.
              Cualquiera puede verificar con su clave pública, pero solo él pudo firmar.
            </p>
          </motion.div>

          {/* Process */}
          <motion.div variants={fadeUp} className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-3">Proceso de firma (Alice → Bob)</p>
            <div className="flex flex-col gap-2">
              {[
                { n: '1', title: 'Hash del mensaje', color: '#60a5fa', code: 'H = SHA-256(mensaje)', desc: '— nunca se firma el mensaje completo, siempre su hash. El hash tiene tamaño fijo.' },
                { n: '2', title: 'Firma con clave privada', color: '#a78bfa', code: 'S = Sign(H, privKey_Alice)', desc: '— solo Alice puede producir esta firma. S se adjunta al mensaje.' },
                { n: '3', title: 'Bob verifica', color: '#34d399', code: 'Verify(mensaje, S, pubKey_Alice) → ✓', desc: '— Bob solo necesita la clave pública de Alice.' },
              ].map(({ n, title, color, code, desc }) => (
                <div key={n} className="flex items-start gap-3 rounded-xl px-3 py-2.5"
                  style={{ background: `${color}06`, border: `1px solid ${color}18` }}>
                  <span className="font-mono text-xs font-bold w-5 shrink-0" style={{ color }}>{n}</span>
                  <div>
                    <div className="text-sm font-bold text-white/80 mb-0.5">{title}</div>
                    <div className="text-white/70 text-xs">
                      <span className="font-mono" style={{ color }}>{code}</span>{desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Guarantees */}
          <motion.div variants={fadeUp} className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={14} weight="duotone" color="rgba(255,255,255,0.4)" />
              <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Garantías de una firma válida</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <Handshake size={16} weight="duotone" color="#34d399" />, title: 'Autenticidad', desc: 'El mensaje vino de Alice', c: '#34d399' },
                { icon: <ShieldCheck size={16} weight="duotone" color="#60a5fa" />, title: 'Integridad', desc: 'No fue alterado', c: '#60a5fa' },
                { icon: <Signature size={16} weight="duotone" color="#a78bfa" />, title: 'No repudio', desc: 'Alice no puede negarlo', c: '#a78bfa' },
              ].map(({ icon, title, desc, c }) => (
                <div key={title} className="rounded-xl px-3 py-2.5 text-center"
                  style={{ background: `${c}08`, border: `1px solid ${c}20` }}>
                  <div className="flex justify-center mb-1">{icon}</div>
                  <div className="text-xs font-bold mb-0.5" style={{ color: c }}>{title}</div>
                  <div className="text-white/65 text-[10px]">{desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Real uses */}
        <motion.div variants={fadeUp} className="w-[38%] flex flex-col gap-3">
          <div className="rounded-2xl p-4 flex-1"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-3">Usos en el mundo real</p>
            <div className="flex flex-col gap-2">
              {USES.map(({ Icon, name, detail, color }) => (
                <div key={name} className="flex items-start gap-3 rounded-xl px-3 py-2.5"
                  style={{ background: `${color}07`, border: `1px solid ${color}18` }}>
                  <Icon size={20} weight="duotone" color={color} className="shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs mb-0.5" style={{ color }}>{name}</div>
                    <div className="text-white/60 text-xs leading-relaxed">{detail}</div>
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
