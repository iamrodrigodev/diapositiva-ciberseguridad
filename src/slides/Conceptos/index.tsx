import { useState } from 'react'
import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import { simulateEncrypt } from '../../lib/crypto'
import {
  FileText, LockKey, Key, Gear,
  LockSimple, CheckSquare, IdentificationCard, NotePencil,
} from '@phosphor-icons/react'

const TERMS = [
  { term: 'Texto Plano (Plaintext)',  color: '#60a5fa', Icon: FileText,           def: 'Tu mensaje original, tal como lo escribes. Es información legible que cualquiera puede entender.' },
  { term: 'Texto Cifrado (Ciphertext)',color: '#a78bfa', Icon: LockSimple,         def: 'El resultado tras encriptar. Parece texto aleatorio y es imposible de leer sin tener la llave correcta.' },
  { term: 'Clave (Key)',              color: '#34d399', Icon: Key,                def: 'El "secreto" que bloquea y desbloquea el mensaje. Es lo único de todo el sistema que jamás debes compartir.' },
  { term: 'Algoritmo',                color: '#fbbf24', Icon: Gear,               def: 'La receta o procedimiento matemático que revuelve el texto. ¡El algoritmo es público y todos pueden conocerlo!' },
]

const PROPERTIES = [
  { name: 'Confidencialidad (Privacidad)', Icon: LockKey,           desc: 'Nadie más puede espiar ni leer tu mensaje durante su viaje.', color: '#34d399' },
  { name: 'Integridad (Exactitud)',        Icon: CheckSquare,       desc: 'Garantía de que ningún atacante modificó tu mensaje en el camino.', color: '#60a5fa' },
  { name: 'Autenticidad (Identidad)',      Icon: IdentificationCard,desc: 'Saber con 100% de certeza que el que envió el mensaje es quien dice ser.', color: '#a78bfa' },
  { name: 'No repudio (Prueba)',           Icon: NotePencil,        desc: 'El emisor no puede negar ni echarse para atrás diciendo "yo no lo envié".', color: '#fbbf24' },
]

export default function Conceptos() {
  const [cryptoState, setCryptoState] = useState<'plain' | 'ciphered' | 'deciphered'>('plain')
  const [inputText, setInputText] = useState('Hola Mundo')

  const handleEncrypt = () => setCryptoState('ciphered')
  const handleDecrypt = () => setCryptoState('deciphered')
  const handleReset = () => setCryptoState('plain')

  const ciphertext = simulateEncrypt(inputText)

  return (
    <SlideLayout>
      <Tag>Fundamentos · Rodrigo</Tag>
      <Title>Conceptos Clave</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-8 overflow-hidden mt-2">
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Interactive Crypto Flow */}
          <motion.div variants={fadeUp} className="rounded-3xl p-6 relative overflow-hidden group shadow-2xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-violet-500/5 pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <p className="font-mono text-xs text-white/50 uppercase tracking-widest">Simulador de Cifrado</p>
              <div className="flex gap-2">
                <button 
                  onClick={handleEncrypt}
                  disabled={cryptoState !== 'plain'}
                  className="px-4 py-1.5 rounded-lg font-mono text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 cursor-pointer"
                  style={{ background: 'rgba(96,165,250,0.15)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.3)' }}
                >
                  1. Cifrar (E)
                </button>
                <button 
                  onClick={handleDecrypt}
                  disabled={cryptoState !== 'ciphered'}
                  className="px-4 py-1.5 rounded-lg font-mono text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 cursor-pointer"
                  style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.3)' }}
                >
                  2. Descifrar (D)
                </button>
                <button 
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg font-mono text-xs transition-all hover:bg-white/10 active:scale-95 cursor-pointer"
                  style={{ color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  Reiniciar
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 relative z-10">
              {/* Plaintext Box */}
              <div className="rounded-2xl w-35 py-4 flex flex-col items-center transition-all duration-500 relative"
                style={{ 
                  background: cryptoState === 'plain' ? 'rgba(96,165,250,0.15)' : 'rgba(96,165,250,0.05)', 
                  border: `1px solid rgba(96,165,250,${cryptoState === 'plain' ? '0.5' : '0.15'})`,
                  boxShadow: cryptoState === 'plain' ? '0 0 20px rgba(96,165,250,0.2)' : 'none'
                }}>
                <FileText size={32} weight="duotone" color="#60a5fa" className={`mb-2 ${cryptoState === 'plain' ? 'animate-bounce' : ''}`} />
                <div className="font-mono text-[13px] text-blue-300 font-bold mb-1.5">Plaintext</div>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={cryptoState !== 'plain'}
                  className="w-[90%] text-center font-mono text-xs bg-black/40 px-1 py-1.5 rounded border border-white/10 text-white select-text outline-none focus:border-blue-400 disabled:opacity-70 transition-colors"
                  placeholder="Escribe algo..."
                />
              </div>

              {/* Arrow 1 */}
              <div className={`flex flex-col items-center transition-all duration-500 ${cryptoState !== 'plain' ? 'opacity-100' : 'opacity-30'}`}>
                <Key size={20} weight="duotone" color="#34d399" className="mb-1" />
                <div className="font-mono text-[10px] text-emerald-400 mb-1">K</div>
                <span className="text-white/40 text-lg leading-none">→</span>
              </div>

              {/* Ciphertext Box */}
              <div className="rounded-2xl w-35 py-4 flex flex-col items-center transition-all duration-500 relative"
                style={{ 
                  background: cryptoState === 'ciphered' ? 'rgba(167,139,250,0.15)' : 'rgba(167,139,250,0.05)', 
                  border: `1px solid rgba(167,139,250,${cryptoState === 'ciphered' ? '0.5' : '0.15'})`,
                  boxShadow: cryptoState === 'ciphered' ? '0 0 20px rgba(167,139,250,0.2)' : 'none',
                  opacity: cryptoState === 'plain' ? 0.3 : 1
                }}>
                <LockSimple size={32} weight="duotone" color="#a78bfa" className={`mb-2 ${cryptoState === 'ciphered' ? 'animate-bounce' : ''}`} />
                <div className="font-mono text-[13px] text-violet-300 font-bold mb-1.5">Ciphertext</div>
                <div className="w-[90%] overflow-hidden text-ellipsis font-mono text-xs bg-black/40 px-2 py-1.5 rounded border border-white/5 text-violet-200 whitespace-nowrap text-center" title={cryptoState !== 'plain' ? ciphertext : ''}>
                  {cryptoState === 'plain' ? '???' : ciphertext}
                </div>
              </div>

              {/* Arrow 2 */}
              <div className={`flex flex-col items-center transition-all duration-500 ${cryptoState === 'deciphered' ? 'opacity-100' : 'opacity-30'}`}>
                <Key size={20} weight="duotone" color="#34d399" className="mb-1" />
                <div className="font-mono text-[10px] text-emerald-400 mb-1">K</div>
                <span className="text-white/40 text-lg leading-none">→</span>
              </div>

              {/* Output Plaintext Box */}
              <div className="rounded-2xl w-35 py-4 flex flex-col items-center transition-all duration-500 relative"
                style={{ 
                  background: cryptoState === 'deciphered' ? 'rgba(52,211,153,0.15)' : 'rgba(52,211,153,0.05)', 
                  border: `1px solid rgba(52,211,153,${cryptoState === 'deciphered' ? '0.5' : '0.15'})`,
                  boxShadow: cryptoState === 'deciphered' ? '0 0 20px rgba(52,211,153,0.2)' : 'none',
                  opacity: cryptoState === 'deciphered' ? 1 : 0.3
                }}>
                <FileText size={32} weight="duotone" color="#34d399" className="mb-2" />
                <div className="font-mono text-[13px] text-emerald-300 font-bold mb-1.5">Plaintext</div>
                <div className="w-[90%] overflow-hidden text-ellipsis font-mono text-xs bg-black/40 px-2 py-1.5 rounded border border-white/5 text-emerald-200 whitespace-nowrap text-center" title={cryptoState === 'deciphered' ? inputText : ''}>
                  {cryptoState === 'deciphered' ? inputText : '???'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Terms grid */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            {TERMS.map(({ term, color, Icon, def }) => (
              <motion.div key={term} variants={fadeUp} className="rounded-2xl p-5 transition-all duration-300 hover:scale-[1.03] group shadow-lg"
                style={{ background: `${color}0a`, border: `1px solid ${color}30` }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl transition-colors duration-300" style={{ background: `${color}15` }}>
                     <Icon size={24} weight="duotone" color={color} />
                  </div>
                  <span className="font-bold text-lg text-white/90 group-hover:text-white transition-colors" style={{ color }}>{term}</span>
                </div>
                <p className="text-white/70 text-[14px] leading-relaxed group-hover:text-white/85 transition-colors">{def}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Properties + Kerckhoffs */}
        <motion.div variants={fadeUp} className="w-[38%] flex flex-col gap-3 h-full">
          <div className="flex-1 rounded-3xl p-5 flex flex-col gap-2 shadow-2xl relative min-h-0"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-xs text-white/50 uppercase tracking-widest mb-1 shrink-0">Propiedades de seguridad</p>
            <div className="flex-1 flex flex-col gap-2">
              {PROPERTIES.map(({ name, Icon, desc, color }) => (
                <div key={name} className="flex items-start gap-3 rounded-2xl px-4 py-2.5 transition-all hover:bg-white/5 shrink-0"
                  style={{ background: `${color}08`, border: `1px solid ${color}1a` }}>
                  <div className="mt-0.5 p-1.5 rounded-xl" style={{ background: `${color}15` }}>
                    <Icon size={18} weight="duotone" color={color} />
                  </div>
                  <div>
                    <div className="font-bold text-[13px] mb-0.5" style={{ color }}>{name}</div>
                    <div className="text-white/70 text-[12px] leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 rounded-3xl p-4 shadow-2xl transition-all hover:bg-amber-500/5 group"
            style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-amber-500/10">
                <Gear size={18} className="text-amber-400 group-hover:rotate-180 transition-transform duration-700" />
              </div>
              <p className="font-mono text-[11px] text-amber-400 uppercase tracking-widest font-bold">Principio de Kerckhoffs</p>
            </div>
            <p className="text-white/80 text-[13px] leading-relaxed mb-1.5">
              El <strong className="text-amber-300">algoritmo</strong> puede ser público.<br />
              La <strong className="text-amber-300">clave</strong> debe ser secreta.
            </p>
            <p className="text-white/60 text-[11px] leading-relaxed">
              Algoritmos como AES o RSA son públicos. Su fuerza recae enteramente en la clave, no en mantener el método oculto.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
