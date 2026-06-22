import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import ColorMixer from './ColorMixer'
import { MathOperations, LockKey, LockOpen } from '@phosphor-icons/react'

// Fast modular exponentiation for the interactive demo
const modExp = (base: number, exp: number, mod: number): number => {
  let res = 1n
  let b = BigInt(base) % BigInt(mod)
  let e = BigInt(exp)
  const m = BigInt(mod)
  while (e > 0n) {
    if (e % 2n === 1n) res = (res * b) % m
    e = e / 2n
    b = (b * b) % m
  }
  return Number(res)
}

const P = 1009 // A small 4-digit prime
const G = 11   // A generator

export default function DiffieHellman() {
  const [aliceHue, setAliceHue] = useState(15)
  const [bobHue,   setBobHue]   = useState(240)

  // Real-time interactive math!
  const alicePriv = aliceHue
  const bobPriv = bobHue

  const alicePub = modExp(G, alicePriv, P)
  const bobPub = modExp(G, bobPriv, P)

  const aliceSecret = modExp(bobPub, alicePriv, P)
  const bobSecret = modExp(alicePub, bobPriv, P) // Will be identical mathematically

  return (
    <SlideLayout>
      <Tag>Intercambio de Claves · Carlos</Tag>
      <Title>Diffie-Hellman</Title>

      <div className="flex gap-6 flex-1 overflow-hidden mt-1">
        {/* Left: Visual Analogy */}
        <motion.div variants={fadeUp} className="w-[45%] overflow-y-auto pr-2 flex flex-col">
          <div className="rounded-3xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ColorMixer aliceHue={aliceHue} bobHue={bobHue} onAlice={setAliceHue} onBob={setBobHue} />
          </div>
        </motion.div>

        {/* Right: Live Interactive Math */}
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
          
          {/* Historical Context */}
          <motion.div variants={fadeUp} className="rounded-2xl p-4 shrink-0 relative overflow-hidden"
            style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.20)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-10 pointer-events-none" style={{ background: '#60a5fa' }} />
            <p className="text-blue-400 font-bold text-[12px] mb-1.5 uppercase tracking-wider font-mono">Hito Histórico (1976)</p>
            <p className="text-white/80 text-[13px] leading-relaxed relative z-10">
              ¿Cómo compartir un secreto si alguien está escuchando? Antes, Alice y Bob debían <strong className="text-blue-300">reunirse en persona</strong>. Diffie y Hellman resolvieron este problema milenario creando el <strong className="text-white">primer método</strong> para acordar una clave compartida a través de un canal público (internet).
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex-1 rounded-3xl p-5 flex flex-col gap-3 relative overflow-hidden shrink-0"
            style={{ background: 'rgba(52,211,153,0.03)', border: '1px solid rgba(52,211,153,0.15)' }}>
            
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[90px] opacity-10 pointer-events-none" style={{ background: '#34d399' }} />

            <div className="flex items-center gap-2 mb-0.5 relative z-10">
              <MathOperations size={20} weight="duotone" color="#34d399" />
              <p className="font-mono text-[11px] text-emerald-400 uppercase tracking-widest font-bold">Simulador Matemático (En Vivo)</p>
            </div>

            {/* Public params */}
            <div className="p-3 rounded-2xl relative z-10" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1 font-bold">Parámetros públicos (Conocidos por el Hacker)</p>
              <p className="text-[14px] font-mono text-white/90">
                <span className="text-emerald-300">p</span> = {P} (Primo) <span className="mx-4 text-white/30">|</span> <span className="text-emerald-300">g</span> = {G} (Base)
              </p>
            </div>

            {/* Private & Public Keys */}
            <div className="grid grid-cols-2 gap-2 relative z-10">
              {[
                { c: '#60a5fa', who: 'ALICE', privLabel: 'a', priv: alicePriv, pubLabel: 'A', pub: alicePub },
                { c: '#a78bfa', who: 'BOB',   privLabel: 'b', priv: bobPriv,   pubLabel: 'B', pub: bobPub },
              ].map(({ c, who, privLabel, priv, pubLabel, pub }) => (
                <div key={who} className="p-3 rounded-2xl transition-all hover:scale-[1.02]" style={{ background: `${c}0a`, border: `1px solid ${c}25` }}>
                  <div className="text-[12px] font-bold mb-1.5 flex items-center justify-between" style={{ color: c }}>
                    {who} <LockKey size={14} weight="duotone" />
                  </div>
                  <div className="text-white/60 text-[11px] mb-1">Clave secreta ({privLabel}): <strong className="text-white font-mono">{priv}</strong></div>
                  <div className="text-[12px] mt-1.5 font-mono" style={{ color: c }}>
                    {pubLabel} = {G}<sup>{privLabel}</sup> mod {P} <br/>
                    <strong className="text-base">{pub}</strong> (Pública)
                  </div>
                </div>
              ))}
            </div>

            {/* Shared Secret */}
            <div className="p-3 rounded-2xl mt-auto relative z-10" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)' }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-amber-400 text-[12px] font-bold flex items-center gap-2">
                  <LockOpen size={16} weight="duotone" /> Secreto Compartido (s)
                </p>
                <div className="bg-amber-400/20 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Identidad Matemática</div>
              </div>
              
              <div className="flex justify-between items-end mt-1">
                <div className="text-[11px] text-white/60 space-y-1 font-mono">
                  <div>Alice: <span className="text-white/90">{bobPub}</span><sup>a</sup> mod {P}</div>
                  <div>Bob: <span className="text-white/90">{alicePub}</span><sup>b</sup> mod {P}</div>
                </div>
                <div className="text-amber-300 text-2xl font-mono font-bold tracking-wider">
                  {aliceSecret}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-2xl p-4 shrink-0"
            style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.20)' }}>
            <p className="text-red-400 font-bold text-[12px] mb-1 uppercase tracking-wider font-mono">¿Por qué el Hacker no puede hacerlo?</p>
            <p className="text-white/70 text-[12px] leading-relaxed">
              El hacker ve <strong className="text-white">p={P}, g={G}, A={alicePub}, B={bobPub}</strong>. Pero deducir "a" o "b" requiere resolver 
              el <strong className="text-red-300">Logaritmo Discreto</strong>, que en números grandes tarda millones de años.
            </p>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  )
}
