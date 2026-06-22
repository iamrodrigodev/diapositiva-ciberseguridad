import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import ParticleField from './ParticleField'

const PRESENTERS = [
  { name: 'Rodrigo Infanzon', color: '#34d399', slides: 'Slides 02-05 — Simétrica & Quiz' },
  { name: 'Carlos Aguilar',   color: '#818cf8', slides: 'Slides 06-08 — Asimétrica & DH' },
]

export default function Portada() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#030712' }}>
      <ParticleField />
      <div className="scanlines absolute inset-0 z-0 pointer-events-none opacity-20" />

      <motion.div variants={stagger} initial="hidden" animate="show"
        className="relative z-10 flex flex-col items-center text-center gap-6 px-12">
        <motion.div variants={fadeUp} className="font-mono text-[11px] tracking-[0.3em] text-white/25 uppercase">
          Ciberseguridad · 2026
        </motion.div>

        <motion.h1 variants={fadeUp}
          className="text-5xl font-extrabold tracking-tight leading-tight"
          style={{ background: 'linear-gradient(135deg,#34d399,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Criptografía<br />Simétrica y Asimétrica
        </motion.h1>

        <motion.p variants={fadeUp} className="text-white/40 text-base max-w-lg leading-relaxed">
          AES · DES · 3DES · ECB · CBC · GCM · RSA · ECC · Diffie-Hellman
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-4 mt-2">
          {PRESENTERS.map(({ name, color, slides }) => (
            <div key={name} className="rounded-2xl px-5 py-3 text-left"
              style={{ background: `${color}0a`, border: `1px solid ${color}30` }}>
              <div className="font-semibold text-sm" style={{ color }}>{name}</div>
              <div className="font-mono text-[10px] text-white/30 mt-0.5">{slides}</div>
            </div>
          ))}
        </motion.div>

        <motion.p variants={fadeUp} className="font-mono text-[10px] text-white/20 mt-4">
          Presiona → para avanzar · ← para retroceder
        </motion.p>
      </motion.div>
    </div>
  )
}
