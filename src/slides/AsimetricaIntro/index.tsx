import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import {
  LockOpen, Key, Mailbox, Warning,
  ArrowsLeftRight, MathOperations,
} from '@phosphor-icons/react'

const TRAPDOORS = [
  {
    problem: 'Factorización de enteros',
    easy: 'p=61, q=53  →  n = 3 233',
    hard: 'n = 3 233  →  ¿p y q?',
    algo: 'RSA',
    color: '#a78bfa',
  },
  {
    problem: 'Logaritmo Discreto (ECC)',
    easy: 'k=7, G  →  Q = 7·G (suma de puntos)',
    hard: 'G, Q  →  ¿k?',
    algo: 'ECDSA / DH',
    color: '#60a5fa',
  },
]

export default function AsimetricaIntro() {
  return (
    <SlideLayout>
      <Tag>Asimétrica · Carlos</Tag>
      <Title>El Problema de la Distribución de Claves</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-5 overflow-hidden">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Problem */}
          <motion.div variants={fadeUp} className="rounded-2xl p-4"
            style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.3)' }}>
                <Warning size={20} weight="duotone" color="#f87171" />
              </div>
              <h3 className="text-red-400 font-bold text-sm">El Problema Simétrico</h3>
            </div>
            <p className="text-white/65 text-xs leading-relaxed mb-2">
              Si Alice y Bob quieren comunicarse con cifrado simétrico, necesitan una clave compartida.
              Pero <strong className="text-white/85">¿cómo la intercambian de forma segura?</strong>
            </p>
            <div className="flex flex-col gap-2 text-sm">
              {[
                ['Por internet', '❌ Cualquiera puede interceptarla'],
                ['En persona',  '❌ No escala a millones de usuarios'],
                ['Por mensajero','❌ Costoso e inseguro'],
              ].map(([how, prob]) => (
                <div key={how} className="flex items-center gap-3 rounded-lg px-3 py-2"
                  style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)' }}>
                  <span className="text-white/70 text-xs font-mono w-24 shrink-0">{how}</span>
                  <span className="text-red-400 text-xs">{prob}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Solution */}
          <motion.div variants={fadeUp} className="rounded-2xl p-4 flex-1"
            style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.2)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)' }}>
                <ArrowsLeftRight size={20} weight="duotone" color="#34d399" />
              </div>
              <h3 className="text-emerald-400 font-bold text-sm">Criptografía Asimétrica (1976)</h3>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="rounded-xl p-3 text-center"
                style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)' }}>
                <LockOpen size={22} weight="duotone" color="#34d399" className="mx-auto mb-1" />
                <div className="font-bold text-emerald-400 text-xs mb-0.5">Clave Pública</div>
                <div className="text-white/75 text-xs leading-relaxed">
                  Compartida con todos. Cualquiera puede <strong className="text-white/75">cifrar</strong> un mensaje para ti.
                </div>
              </div>
              <div className="rounded-xl p-3 text-center"
                style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.25)' }}>
                <Key size={22} weight="duotone" color="#a78bfa" className="mx-auto mb-1" />
                <div className="font-bold text-violet-300 text-xs mb-0.5">Clave Privada</div>
                <div className="text-white/75 text-xs leading-relaxed">
                  Solo tú la tienes. Solo tú puedes <strong className="text-white/75">descifrar</strong> los mensajes.
                </div>
              </div>
            </div>

            <div className="rounded-xl px-4 py-3"
              style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Mailbox size={14} weight="duotone" color="#fbbf24" />
                <p className="text-amber-400 text-xs font-bold">Analogía: Buzón con ranura</p>
              </div>
              <p className="text-white/75 text-xs leading-relaxed">
                <strong className="text-white/80">Clave pública</strong> = la ranura del buzón (visible, cualquiera mete cartas).
                <strong className="text-white/80"> Clave privada</strong> = la llave para abrirlo (solo tú la tienes).
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: Trapdoor functions */}
        <motion.div variants={fadeUp} className="w-[40%] flex flex-col gap-3">
          <div className="rounded-2xl p-4 flex flex-col gap-3"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2">
              <MathOperations size={16} weight="duotone" color="rgba(255,255,255,0.4)" />
              <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Funciones trampa (Trapdoor)</p>
            </div>
            <p className="text-white/75 text-xs leading-relaxed">
              Operaciones <strong className="text-white/80">fáciles en una dirección</strong> pero
              <strong className="text-red-400"> computacionalmente imposibles en la otra</strong>.
            </p>

            {TRAPDOORS.map(({ problem, easy, hard, algo, color }) => (
              <div key={problem} className="rounded-xl p-3"
                style={{ background: `${color}08`, border: `1px solid ${color}25` }}>
                <div className="font-bold text-xs mb-2" style={{ color }}>{problem}</div>
                <div className="flex flex-col gap-1.5">
                  <div className="rounded-lg px-3 py-1.5 text-xs"
                    style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}>
                    <span className="text-emerald-400 font-bold">✓ Fácil: </span>
                    <span className="text-white/60 font-mono">{easy}</span>
                  </div>
                  <div className="rounded-lg px-3 py-1.5 text-xs"
                    style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
                    <span className="text-red-400 font-bold">✗ Imposible: </span>
                    <span className="text-white/60 font-mono">{hard}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                      Usado en: {algo}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl px-4 py-3"
            style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.2)' }}>
            <p className="text-blue-400 text-xs font-bold mb-1">Whitfield Diffie & Martin Hellman — 1976</p>
            <p className="text-white/70 text-xs leading-relaxed">
              "New Directions in Cryptography" — el paper que propuso la criptografía de clave pública.
              Considerado el avance más importante en criptografía del siglo XX.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
