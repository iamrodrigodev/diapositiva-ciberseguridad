import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import conclusionImg from './crypto_conclusion.png'
import { Key, LockKey, ShareNetwork, Stack, Sparkle } from '@phosphor-icons/react'

const SUMMARY = [
  {
    icon: Key,
    color: '#34d399', heading: 'Simétrica (AES/DES/3DES)',
    body: 'Una sola clave para cifrar y descifrar. AES-256 es el estándar actual: rápido, seguro, inrompible. DES está roto. 3DES, obsoleto.',
  },
  {
    icon: LockKey,
    color: '#60a5fa', heading: 'Asimétrica (RSA / ECC)',
    body: 'Par de claves: pública para cifrar, privada para descifrar. RSA usa factorización; ECC usa curvas elípticas con claves más cortas.',
  },
  {
    icon: ShareNetwork,
    color: '#a78bfa', heading: 'Diffie-Hellman',
    body: 'Permite que dos partes acuerden una clave secreta a través de un canal público sin jamás transmitirla. Base del "Forward Secrecy".',
  },
  {
    icon: Stack,
    color: '#fbbf24', heading: 'Modos de operación',
    subtitle: 'ECB / CBC / GCM',
    body: 'ECB es inseguro: bloques iguales → ciphertext igual. CBC encadena bloques con IV. GCM cifra Y autentica: el modo recomendado hoy.',
  },
]

export default function Conclusion() {
  return (
    <SlideLayout>
      <Tag>Conclusión · Ambos</Tag>
      <Title>Resumen Final</Title>

      <div className="flex gap-6 flex-1 overflow-hidden mt-2">
        {/* Left Column: Art & Credits */}
        <motion.div variants={fadeUp} className="w-[35%] flex flex-col gap-4 relative">
          
          {/* Subtle backdrop glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

          {/* Image Art */}
          <div className="flex-1 rounded-3xl overflow-hidden relative border border-white/10 bg-black/40 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
            <img 
              src={conclusionImg} 
              alt="Crypto Art" 
              className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700"
            />
            {/* Inner shadow overlay for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] pointer-events-none" />
          </div>

          {/* Credits Box */}
          <div className="rounded-3xl p-5 relative overflow-hidden group border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <Sparkle size={20} weight="duotone" className="text-white/80" />
              </div>
              <p className="text-[13px] text-white/80 leading-relaxed font-medium">
                La criptografía es invisible pero está en cada conexión HTTPS, WhatsApp y transacción bancaria.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl p-3 border border-white/5 flex flex-col gap-2">
              <p className="font-mono text-[11px] text-emerald-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Ciberseguridad 2026
              </p>
              <div className="flex flex-col gap-1 text-[11px] font-mono text-white/50">
                <span>Carlos Daniel Aguilar Chirinos</span>
                <span>Rodrigo Emerson Infanzon Acosta</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Summary Cards */}
        <motion.div variants={stagger} className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 pb-2">
          {SUMMARY.map(({ icon: Icon, color, heading, subtitle, body }) => (
            <motion.div key={heading} variants={fadeUp}
              className="rounded-3xl p-4 flex gap-4 items-start group transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all shadow-lg"
                style={{ background: `${color}15`, border: `1px solid ${color}40` }}>
                <Icon size={24} weight="duotone" style={{ color }} className="group-hover:scale-110 transition-transform" />
              </div>

              <div className="flex-1 mt-0.5">
                <h3 className="font-bold text-[16px] text-white mb-0.5 flex items-center gap-2">
                  {heading}
                  {subtitle && (
                    <span className="text-[10px] px-2 py-0.5 rounded border font-mono tracking-widest uppercase"
                      style={{ color, background: `${color}10`, borderColor: `${color}30` }}>
                      {subtitle}
                    </span>
                  )}
                </h3>
                <p className="text-[13px] text-white/60 leading-relaxed mt-1">{body}</p>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideLayout>
  )
}
