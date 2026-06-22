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
  { Icon: CurrencyBtc,      name: 'Bitcoin / Ethereum',  detail: 'secp256k1 — firmas ECDSA', color: '#fbbf24' },
  { Icon: ChatCenteredDots, name: 'Signal / WhatsApp',   detail: 'Curve25519 — acuerdo DH',  color: '#34d399' },
  { Icon: Globe,            name: 'TLS 1.3',             detail: 'X25519, P-256 — ECDHE',    color: '#60a5fa' },
  { Icon: DeviceMobile,     name: 'iPhone / Passport',   detail: 'P-384 — firma digital',    color: '#a78bfa' },
]

export default function ECC_Detalle() {
  return (
    <SlideLayout>
      <Tag>Asimétrica · Carlos</Tag>
      <Title>ECC Curvas Elípticas</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-5 overflow-hidden mt-1">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-3">
          <motion.div variants={fadeUp} className="rounded-3xl p-5 relative overflow-hidden"
            style={{ background: 'rgba(96,165,250,0.03)', border: '1px solid rgba(96,165,250,0.15)' }}>
            
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none" 
              style={{ background: '#60a5fa' }} />

            <div className="flex gap-4 items-start relative z-10">
              <div className="flex-1">
                <p className="font-mono text-[11px] text-blue-400 uppercase tracking-widest mb-1.5 font-bold">La Magia Matemática</p>
                <div className="font-mono text-[20px] text-white/90 mb-2.5 bg-white/5 inline-block px-3 py-1 rounded-lg border border-white/10">y² = x³ + ax + b</div>
                <p className="text-white/70 text-[14px] leading-relaxed">
                  En lugar de usar números primos gigantes, ECC usa <strong>geometría</strong>. Es como jugar billar: empiezas en un punto <strong>P</strong>, lo "rebotas" por la curva <strong>k</strong> veces, y terminas en el punto <strong>Q</strong>. Ese número de rebotes (k) es tu <strong>Clave Privada</strong>.
                </p>
                
                <div className="mt-3 rounded-2xl px-5 py-3 flex gap-6 font-mono text-[13px] text-white/60"
                  style={{ background: 'rgba(96,165,250,0.05)', border: '1px solid rgba(96,165,250,0.15)' }}>
                  <div>
                    <div className="text-emerald-400 font-bold mb-1 text-[13px]">✓ Hacia adelante</div>
                    <div className="text-white/80">Rebotar (k veces)</div>
                    <div className="text-white/50 text-[10px] mt-1">Con k, llegar a Q es rápido</div>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <div className="text-red-400 font-bold mb-1 text-[13px]">✗ Hacia atrás (ECDLP)</div>
                    <div className="text-white/80">Solo viendo P y Q</div>
                    <div className="text-white/50 text-[10px] mt-1">Imposible adivinar cuántos rebotes hubo (k)</div>
                  </div>
                </div>
              </div>
              <div className="w-36 h-36 shrink-0 mt-2">
                <ECCCanvas />
              </div>
            </div>
          </motion.div>

          {/* Key size comparison */}
          <motion.div variants={fadeUp} className="rounded-3xl p-5 flex-1 flex flex-col justify-center relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[11px] text-white/50 uppercase tracking-widest mb-3 font-bold">Claves equivalentes — ECC vs RSA</p>
            <div className="flex flex-col gap-2">
              {KEY_COMPARE.map(({ rsa, ecc, rsa_bits, ecc_bits, label, color }) => (
                <div key={label} className="flex items-center gap-4 transition-all hover:scale-[1.01]">
                  <span className="font-mono text-[11px] text-white/50 w-24 text-right shrink-0">{label}</span>
                  <div className="flex-1 flex items-center gap-3">
                    <span className="font-mono text-[11px] text-red-400/80 w-16 shrink-0 font-bold">{rsa}</span>
                    <div className="h-2.5 rounded-full bg-red-400/10 overflow-hidden flex-1 border border-red-400/20">
                      <div className="h-full rounded-full bg-red-400/60" style={{ width: `${(rsa_bits / 15360) * 100}%` }} />
                    </div>
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <span className="font-mono text-[11px] w-14 shrink-0 font-bold" style={{ color }}>{ecc}</span>
                    <div className="h-2.5 rounded-full flex-1 overflow-hidden border" style={{ background: `${color}10`, borderColor: `${color}20` }}>
                      <div className="h-full rounded-full" style={{ width: `${(ecc_bits / 521) * 100}%`, background: color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-mono text-[11px] text-white/40 mt-3 text-center bg-white/5 py-1.5 rounded-lg shrink-0">
              ECC-256 provee la misma seguridad que RSA-3072 — con una clave 12× más corta
            </p>
          </motion.div>
        </div>

        {/* Right */}
        <motion.div variants={fadeUp} className="w-[36%] flex flex-col gap-3">
          <div className="rounded-3xl p-5"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[11px] text-white/50 uppercase tracking-widest mb-2 font-bold">Un "rebote" (Suma de puntos)</p>
            <p className="text-white/70 text-[13px] leading-relaxed mb-3">
              ¿Cómo es un rebote? Trazas una recta entre dos puntos (<strong className="text-white/90">P + Q</strong>), dejas que "choque" con la curva y la reflejas hacia abajo para obtener el punto final (<strong className="text-white/90">R</strong>).
            </p>
            <div className="flex gap-2 font-mono text-[14px] text-center font-bold">
              {['P', '+', 'Q', '=', 'R'].map((v, i) => (
                <div key={i} className={`flex-1 rounded-xl py-2 shadow-sm ${v === '+' || v === '=' ? 'text-white/40' : ''}`}
                  style={v !== '+' && v !== '=' ? {
                    background: v === 'P' ? 'rgba(96,165,250,0.1)' : v === 'Q' ? 'rgba(167,139,250,0.1)' : 'rgba(52,211,153,0.1)',
                    border: `1px solid ${v === 'P' ? 'rgba(96,165,250,0.3)' : v === 'Q' ? 'rgba(167,139,250,0.3)' : 'rgba(52,211,153,0.3)'}`,
                    color: v === 'P' ? '#60a5fa' : v === 'Q' ? '#a78bfa' : '#34d399',
                  } : {}}>
                  {v}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-5 flex-1 flex flex-col"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[11px] text-white/50 uppercase tracking-widest mb-3 font-bold">Dónde se usa ECC hoy</p>
            <div className="flex flex-col gap-2 flex-1 justify-center">
              {USES.map(({ Icon, name, detail, color }) => (
                <div key={name} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all hover:scale-[1.02]"
                  style={{ background: `${color}08`, border: `1px solid ${color}1a` }}>
                  <div className="bg-white/5 p-2 rounded-xl shrink-0" style={{ border: `1px solid ${color}20` }}>
                    <Icon size={20} weight="duotone" color={color} />
                  </div>
                  <div>
                    <div className="font-bold text-[14px] mb-0.5" style={{ color }}>{name}</div>
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
