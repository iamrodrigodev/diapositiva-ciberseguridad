import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import ECCCanvas from '../../components/ECCCanvas'
import {
  CurrencyBtc, ChatCenteredDots, Globe, DeviceMobile,
} from '@phosphor-icons/react'

const KEY_COMPARE = [
  { rsa: 'RSA-1024',  ecc: 'ECC-160', rsa_bits: 1024,  ecc_bits: 160, label: '80-bit security',  color: '#f87171' },
  { rsa: 'RSA-2048',  ecc: 'ECC-224', rsa_bits: 2048,  ecc_bits: 224, label: '112-bit security', color: '#fbbf24' },
  { rsa: 'RSA-3072',  ecc: 'ECC-256', rsa_bits: 3072,  ecc_bits: 256, label: '128-bit security', color: '#60a5fa' },
  { rsa: 'RSA-7680',  ecc: 'ECC-384', rsa_bits: 7680,  ecc_bits: 384, label: '192-bit security', color: '#34d399' },
  { rsa: 'RSA-15360', ecc: 'ECC-521', rsa_bits: 15360, ecc_bits: 521, label: '256-bit security', color: '#a78bfa' },
]

const USES = [
  { Icon: CurrencyBtc,      name: 'Bitcoin/Ethereum',  detail: 'secp256k1 — firmas ECDSA en cada transacción', color: '#fbbf24' },
  { Icon: ChatCenteredDots, name: 'Signal / WhatsApp', detail: 'Curve25519 — acuerdo de claves DH',             color: '#34d399' },
  { Icon: Globe,            name: 'TLS 1.3',           detail: 'X25519, P-256 — handshake ECDHE',               color: '#60a5fa' },
  { Icon: DeviceMobile,     name: 'iPhone / Passport', detail: 'P-384 — firma digital de firmware y documentos', color: '#a78bfa' },
]

export default function ECC_Detalle() {
  return (
    <SlideLayout>
      <Tag>Asimétrica · Carlos</Tag>
      <Title>ECC — Curvas Elípticas</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-5 overflow-hidden">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-3">
          <motion.div variants={fadeUp} className="rounded-2xl p-5"
            style={{ background: 'rgba(96,165,250,0.04)', border: '1px solid rgba(96,165,250,0.18)' }}>
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <p className="font-mono text-[10px] text-blue-400/60 uppercase tracking-widest mb-2">Ecuación de la curva</p>
                <div className="font-mono text-lg text-white/85 mb-3">y² = x³ + ax + b</div>
                <p className="text-white/75 text-sm leading-relaxed">
                  La seguridad se basa en el <strong className="text-white/80">Problema del Logaritmo Discreto en Curvas Elípticas (ECDLP)</strong>:
                  dados dos puntos P y Q = kP en la curva, encontrar k es computacionalmente insoluble.
                </p>
                <div className="mt-3 rounded-xl px-4 py-3"
                  style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.15)' }}>
                  <div className="flex gap-4 font-mono text-xs text-white/60">
                    <div>
                      <div className="text-blue-400 font-bold mb-1">✓ Fácil</div>
                      <div>k=7, G → Q = 7·G</div>
                      <div className="text-white/55 text-[10px]">(suma de puntos 7 veces)</div>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div>
                      <div className="text-red-400 font-bold mb-1">✗ Imposible</div>
                      <div>G, Q → ¿k?</div>
                      <div className="text-white/55 text-[10px]">(ECDLP intractable)</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-36 h-36 shrink-0">
                <ECCCanvas />
              </div>
            </div>
          </motion.div>

          {/* Key size comparison */}
          <motion.div variants={fadeUp} className="rounded-2xl p-4 flex-1"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-3">Claves equivalentes — ECC vs RSA</p>
            <div className="flex flex-col gap-2">
              {KEY_COMPARE.map(({ rsa, ecc, rsa_bits, ecc_bits, label, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="font-mono text-[9px] text-white/50 w-20 text-right shrink-0">{label}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="font-mono text-[10px] text-red-400/70 w-20 shrink-0">{rsa}</span>
                    <div className="h-2.5 rounded-full bg-red-400/20 overflow-hidden flex-1">
                      <div className="h-full rounded-full bg-red-400/50" style={{ width: `${(rsa_bits / 15360) * 100}%` }} />
                    </div>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="font-mono text-[10px] w-16 shrink-0" style={{ color }}>{ecc}</span>
                    <div className="h-2.5 rounded-full flex-1 overflow-hidden" style={{ background: `${color}15` }}>
                      <div className="h-full rounded-full" style={{ width: `${(ecc_bits / 521) * 100}%`, background: color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-white/45 mt-2 text-center">
              ECC-256 provee la misma seguridad que RSA-3072 — con una clave 12× más corta
            </p>
          </motion.div>
        </div>

        {/* Right */}
        <motion.div variants={fadeUp} className="w-[36%] flex flex-col gap-3">
          <div className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-3">Suma de puntos en la curva</p>
            <p className="text-white/75 text-xs leading-relaxed mb-3">
              Para sumar P + Q: se traza la recta que los une, se encuentra el tercer punto de intersección con la curva y se refleja en el eje X.
            </p>
            <div className="flex gap-3 font-mono text-xs text-center">
              {['P', '+', 'Q', '=', 'R'].map((v, i) => (
                <div key={i} className={`flex-1 rounded-lg py-2 ${v === '+' || v === '=' ? 'text-white/50' : ''}`}
                  style={v !== '+' && v !== '=' ? {
                    background: v === 'P' ? 'rgba(96,165,250,0.15)' : v === 'Q' ? 'rgba(167,139,250,0.15)' : 'rgba(52,211,153,0.15)',
                    border: `1px solid ${v === 'P' ? 'rgba(96,165,250,0.3)' : v === 'Q' ? 'rgba(167,139,250,0.3)' : 'rgba(52,211,153,0.3)'}`,
                    color: v === 'P' ? '#60a5fa' : v === 'Q' ? '#a78bfa' : '#34d399',
                  } : {}}>
                  {v}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-4 flex-1"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-3">Dónde se usa ECC hoy</p>
            <div className="flex flex-col gap-2">
              {USES.map(({ Icon, name, detail, color }) => (
                <div key={name} className="flex items-start gap-3 rounded-xl px-3 py-2.5"
                  style={{ background: `${color}08`, border: `1px solid ${color}1a` }}>
                  <Icon size={20} weight="duotone" color={color} className="shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs mb-0.5" style={{ color }}>{name}</div>
                    <div className="text-white/40 text-xs leading-relaxed">{detail}</div>
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
