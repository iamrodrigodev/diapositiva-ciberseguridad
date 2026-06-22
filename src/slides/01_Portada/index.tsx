import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
const PRESENTERS = [
  { name: 'Rodrigo Infanzon', color: '#34d399', slides: 'Historia · Conceptos · Simétrica · Modos' },
  { name: 'Carlos Aguilar',   color: '#818cf8', slides: 'Asimétrica · Firmas · Diffie-Hellman' },
]

export default function Portada() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="scanlines absolute inset-0 z-0 pointer-events-none opacity-20" />

      <motion.div variants={stagger} initial="hidden" animate="show"
        className="relative z-10 flex flex-col items-center text-center gap-6 px-12">
        <motion.div variants={fadeUp} className="font-mono text-[11px] tracking-[0.3em] text-white/60 uppercase">
          Ciberseguridad · 2026
        </motion.div>

        <motion.h1 variants={fadeUp}
          className="text-5xl font-extrabold tracking-tight leading-tight"
          style={{ background: 'linear-gradient(135deg,#34d399,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Criptografía<br />Simétrica y Asimétrica
        </motion.h1>

        <motion.p variants={fadeUp} className="text-white/80 text-base max-w-xl leading-relaxed">
          Historia · Conceptos · AES · DES · Modos · RSA · ECC · Firmas Digitales · Diffie-Hellman · TLS
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-6 mt-4">
          {PRESENTERS.map(({ name, color, slides }) => (
            <div key={name} className="rounded-2xl px-6 py-4 text-left shadow-lg backdrop-blur-md transition-all hover:scale-105"
              style={{ background: `${color}1a`, border: `1px solid ${color}60`, boxShadow: `0 0 20px ${color}15` }}>
              <div className="font-bold text-base" style={{ color }}>{name}</div>
              <div className="font-mono text-xs text-white/80 mt-1">{slides}</div>
            </div>
          ))}
        </motion.div>


      </motion.div>
    </div>
  )
}
