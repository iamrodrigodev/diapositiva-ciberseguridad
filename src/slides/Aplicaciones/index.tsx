import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import { Lock, ShieldCheck, Browser, ChatCircleText, Wallet, TerminalWindow } from '@phosphor-icons/react'

export default function Aplicaciones() {
  return (
    <SlideLayout>
      <Tag>Aplicaciones · Ambos</Tag>
      <Title>Criptografía en el Mundo Real</Title>

      <motion.div variants={stagger} className="flex-1 flex flex-col gap-3 overflow-hidden mt-1">
        <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden">
          
          {/* HTTPS / TLS 1.3 */}
          <motion.div variants={fadeUp} className="rounded-3xl p-4 flex flex-col gap-3 relative overflow-hidden" style={{ background: 'rgba(96,165,250,0.05)', border: '1px solid rgba(96,165,250,0.2)' }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ background: '#60a5fa' }} />
            
            <div className="flex items-center gap-2.5 relative z-10">
              <Browser size={20} weight="duotone" className="text-blue-400" />
              <h3 className="font-bold text-base text-white">Navegación Web (HTTPS)</h3>
            </div>
            
            {/* Real World Mockup */}
            <div className="bg-black/40 rounded-xl p-2 border border-white/10 relative z-10 shadow-inner">
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2.5 py-1.5 border border-white/5">
                <Lock size={14} weight="fill" className="text-emerald-400" />
                <span className="text-white/80 font-mono text-[11px]">https://banco-seguro.com/login</span>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-1 relative z-10 mt-auto">
              <p className="text-[9px] font-mono text-blue-400 uppercase tracking-widest font-bold mb-1.5">Stack TLS 1.3</p>
              {[
                { l: 'Intercambio', t: 'ECDHE (Curve25519)', d: 'Claves efímeras' },
                { l: 'Certificado', t: 'RSA / ECDSA',       d: 'Identidad servidor' },
                { l: 'Túnel Seguro',t: 'AES-256-GCM',       d: 'Cifrado y auth' },
              ].map(x => (
                <div key={x.l} className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-1">
                  <span className="text-white/40">{x.l}</span>
                  <span className="text-blue-300 font-bold">{x.t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* WhatsApp / Signal */}
          <motion.div variants={fadeUp} className="rounded-3xl p-4 flex flex-col gap-3 relative overflow-hidden" style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.2)' }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ background: '#34d399' }} />
            
            <div className="flex items-center gap-2.5 relative z-10">
              <ChatCircleText size={20} weight="duotone" className="text-emerald-400" />
              <h3 className="font-bold text-base text-white">Chat End-to-End (Signal)</h3>
            </div>
            
            {/* Real World Mockup */}
            <div className="bg-[#0b141a] rounded-xl p-2.5 border border-white/10 relative z-10 flex flex-col gap-1.5 shadow-inner">
              <div className="bg-[#182229] text-[#ffd279] text-[8px] text-center p-1 rounded flex items-center justify-center gap-1">
                <Lock size={9} weight="fill" /> Los mensajes están cifrados de extremo a extremo.
              </div>
              <div className="bg-[#005c4b] text-white/90 text-[10px] px-2 py-1.5 rounded-md rounded-tr-none self-end max-w-[80%]">
                Hola, ¿cuál es la clave del servidor?
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-1 relative z-10 mt-auto">
              <p className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold mb-1.5">Signal Protocol</p>
              {[
                { l: 'Identidad',  t: 'Curve25519',    d: 'Claves permanentes' },
                { l: 'Sesión',     t: 'Double Ratchet',d: 'Rotación automática' },
                { l: 'Mensajes',   t: 'AES-256-CBC',   d: 'Cifrado de texto/media' },
              ].map(x => (
                <div key={x.l} className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-1">
                  <span className="text-white/40">{x.l}</span>
                  <span className="text-emerald-300 font-bold">{x.t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bitcoin */}
          <motion.div variants={fadeUp} className="rounded-3xl p-4 flex flex-col gap-3 relative overflow-hidden" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ background: '#fbbf24' }} />
            
            <div className="flex items-center gap-2.5 relative z-10">
              <Wallet size={20} weight="duotone" className="text-amber-400" />
              <h3 className="font-bold text-base text-white">Criptomonedas (Bitcoin)</h3>
            </div>
            
            {/* Real World Mockup */}
            <div className="bg-black/40 rounded-xl p-3 border border-white/10 relative z-10 shadow-inner flex justify-between items-center">
              <div>
                <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Enviar a</p>
                <p className="text-[11px] font-mono text-white/80">bc1qxy2kgdygjrsqtzq2n0yrf249...</p>
              </div>
              <div className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-amber-500/30">
                Firmar Tx
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-1 relative z-10 mt-auto">
              <p className="text-[9px] font-mono text-amber-400 uppercase tracking-widest font-bold mb-1.5">Stack Blockchain</p>
              {[
                { l: 'Billetera',  t: 'secp256k1 (ECC)', d: 'Par de claves' },
                { l: 'Autorización',t: 'ECDSA',          d: 'Firma digital' },
                { l: 'Blockchain', t: 'SHA-256 (PoW)',   d: 'Minería' },
              ].map(x => (
                <div key={x.l} className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-1">
                  <span className="text-white/40">{x.l}</span>
                  <span className="text-amber-300 font-bold">{x.t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SSH */}
          <motion.div variants={fadeUp} className="rounded-3xl p-4 flex flex-col gap-3 relative overflow-hidden" style={{ background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.2)' }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ background: '#a78bfa' }} />
            
            <div className="flex items-center gap-2.5 relative z-10">
              <TerminalWindow size={20} weight="duotone" className="text-violet-400" />
              <h3 className="font-bold text-base text-white">Admin. de Servidores (SSH)</h3>
            </div>
            
            {/* Real World Mockup */}
            <div className="bg-[#1e1e1e] rounded-xl p-2.5 border border-white/10 relative z-10 shadow-inner font-mono text-[9px] leading-tight">
              <div className="flex gap-1.5 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <p className="text-white/60">$ ssh root@192.168.1.100</p>
              <p className="text-white/80">Authenticating with public key "ed25519"</p>
              <p className="text-emerald-400">Welcome to Ubuntu 22.04 LTS</p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-1 relative z-10 mt-auto">
              <p className="text-[9px] font-mono text-violet-400 uppercase tracking-widest font-bold mb-1.5">Stack SSH</p>
              {[
                { l: 'Autenticación', t: 'Ed25519 / RSA',  d: 'Identidad sin password' },
                { l: 'Intercambio',   t: 'Diffie-Hellman', d: 'Secreto efímero' },
                { l: 'Transporte',    t: 'AES-256-CTR',    d: 'Cifrado de comandos' },
              ].map(x => (
                <div key={x.l} className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-1">
                  <span className="text-white/40">{x.l}</span>
                  <span className="text-violet-300 font-bold">{x.t}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Global Summary */}
        <motion.div variants={fadeUp} className="rounded-2xl px-5 py-2.5 shrink-0 flex items-center justify-between"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} weight="duotone" className="text-emerald-400" />
            <p className="text-white/90 text-[13px]">La criptografía moderna es <strong className="text-emerald-400">invisible</strong>. Opera en milisegundos detrás de escena.</p>
          </div>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
