import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import { Globe, ChatCenteredDots, CurrencyBtc, Terminal, Lock } from '@phosphor-icons/react'

const APPS = [
  {
    Icon: Globe,
    name: 'HTTPS / TLS 1.3',
    color: '#60a5fa',
    layers: [
      { label: 'Handshake',  tech: 'ECDHE (X25519)',    desc: 'Acuerdo de clave efímera' },
      { label: 'Auth',       tech: 'RSA / ECDSA',       desc: 'Certificado del servidor' },
      { label: 'Datos',      tech: 'AES-256-GCM',       desc: 'Cifrado + autenticación' },
      { label: 'Integridad', tech: 'SHA-384 / HMAC',    desc: 'Verificación de mensajes' },
    ],
  },
  {
    Icon: ChatCenteredDots,
    name: 'WhatsApp / Signal',
    color: '#34d399',
    layers: [
      { label: 'Identidad',  tech: 'Curve25519 (ECC)',  desc: 'Par de claves de identidad' },
      { label: 'Sesión',     tech: 'Signal Protocol',   desc: 'Double Ratchet + DH' },
      { label: 'Datos',      tech: 'AES-256-CBC',       desc: 'Mensajes y archivos' },
      { label: 'MAC',        tech: 'HMAC-SHA256',       desc: 'Autenticación de mensajes' },
    ],
  },
  {
    Icon: CurrencyBtc,
    name: 'Bitcoin',
    color: '#fbbf24',
    layers: [
      { label: 'Claves',     tech: 'secp256k1 (ECC)',   desc: 'Par público/privado wallet' },
      { label: 'Firma',      tech: 'ECDSA',             desc: 'Autorizar transacciones' },
      { label: 'Dirección',  tech: 'SHA-256 + RIPEMD',  desc: 'Hash de clave pública' },
      { label: 'Minería',    tech: 'SHA-256 (PoW)',      desc: 'Proof of Work doble hash' },
    ],
  },
  {
    Icon: Terminal,
    name: 'SSH',
    color: '#a78bfa',
    layers: [
      { label: 'Host Auth',  tech: 'RSA / Ed25519',     desc: 'Identidad del servidor' },
      { label: 'User Auth',  tech: 'RSA / ECDSA / pwd', desc: 'Identidad del cliente' },
      { label: 'Sesión',     tech: 'ECDHE',             desc: 'Acuerdo de clave efímera' },
      { label: 'Transporte', tech: 'AES-256-CTR',       desc: 'Cifrado de la sesión' },
    ],
  },
]

export default function Aplicaciones() {
  return (
    <SlideLayout>
      <Tag>Aplicaciones · Ambos</Tag>
      <Title>Criptografía en el Mundo Real</Title>

      <motion.div variants={stagger} className="flex-1 flex flex-col gap-3 overflow-hidden">
        <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden">
          {APPS.map(({ Icon, name, color, layers }) => (
            <motion.div key={name} variants={fadeUp}
              className="rounded-2xl p-4 flex flex-col gap-3"
              style={{ background: `${color}05`, border: `1px solid ${color}20` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  <Icon size={22} weight="duotone" color={color} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white/90">{name}</h3>
                  <p className="font-mono text-[9px] text-white/50">Stack criptográfico completo</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                {layers.map(({ label, tech, desc }) => (
                  <div key={label} className="flex items-center gap-2 rounded-lg px-3 py-1.5"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="font-mono text-[9px] text-white/50 w-14 shrink-0">{label}</span>
                    <span className="font-mono text-[10px] font-bold flex-1" style={{ color }}>{tech}</span>
                    <span className="text-white/55 text-[10px] shrink-0">{desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="rounded-2xl px-5 py-3 shrink-0"
          style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}>
          <div className="flex items-center gap-2 mb-1">
            <Lock size={14} weight="duotone" color="#34d399" />
            <p className="text-emerald-400 text-xs font-bold">Cada vez que abres una web con candado, esto ocurre en milisegundos:</p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/70 flex-wrap">
            {['ECDHE handshake', '→', 'Verificación ECDSA del certificado', '→', 'Derivación de claves', '→', 'AES-GCM cifra cada byte', '→', 'HMAC verifica integridad'].map((s, i) => (
              <span key={i} style={{ color: s === '→' ? 'rgba(255,255,255,0.2)' : undefined }}>{s}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
