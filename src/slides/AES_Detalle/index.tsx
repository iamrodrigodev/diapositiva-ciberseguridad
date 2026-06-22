import { useState } from 'react'
import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import { ArrowsClockwise, ArrowsLeftRight, Shuffle, Plus, ShieldCheck, GridFour, Intersect } from '@phosphor-icons/react'

const ROUNDS = [
  { label: 'SubBytes',    color: '#60a5fa', Icon: ArrowsClockwise, desc: 'Cada byte se sustituye con un valor de la S-box. Aporta la crucial confusión no lineal.', visual: 'sub'   },
  { label: 'ShiftRows',   color: '#a78bfa', Icon: ArrowsLeftRight, desc: 'Las filas de la matriz se desplazan cíclicamente. Rompe la simetría de las columnas.', visual: 'shift' },
  { label: 'MixColumns',  color: '#fbbf24', Icon: Shuffle,         desc: 'Multiplicación de matrices. Aporta difusión: un byte modificado afecta a toda la columna.', visual: 'mix'   },
  { label: 'AddRoundKey', color: '#34d399', Icon: Plus,            desc: 'Operación XOR con la subclave. El único paso donde la clave secreta interactúa con los datos.', visual: 'add'   },
]

// Solid colors per column to clearly track movement
const CELLS = [
  [ { id: '00', c: '#ef4444' }, { id: '04', c: '#3b82f6' }, { id: '08', c: '#10b981' }, { id: '0C', c: '#f59e0b' } ],
  [ { id: '01', c: '#ef4444' }, { id: '05', c: '#3b82f6' }, { id: '09', c: '#10b981' }, { id: '0D', c: '#f59e0b' } ],
  [ { id: '02', c: '#ef4444' }, { id: '06', c: '#3b82f6' }, { id: '0A', c: '#10b981' }, { id: '0E', c: '#f59e0b' } ],
  [ { id: '03', c: '#ef4444' }, { id: '07', c: '#3b82f6' }, { id: '0B', c: '#10b981' }, { id: '0F', c: '#f59e0b' } ],
]

function StateGrid({ op, activeColor }: { op: string, activeColor?: string | undefined }) {
  const isShift = op === 'shift'
  
  return (
    <div className="flex flex-col gap-1.5 p-2 bg-black/20 rounded-xl border border-white/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
      {CELLS.map((row, ri) => {
        // Shift logic: row 0 shifts 0, row 1 shifts 1, etc.
        const displayRow = isShift ? [...row.slice(ri), ...row.slice(0, ri)] : row
        
        return (
          <div key={ri} className="flex gap-1.5">
            {displayRow.map((cell, ci) => {
              let text = cell.id
              let color = cell.c
              
              if (op === 'sub') {
                text = 'Sx'
                color = activeColor ?? cell.c
              } else if (op === 'mix') {
                text = 'Mx'
                color = activeColor ?? cell.c
              } else if (op === 'add') {
                text = '⊕'
                color = activeColor ?? cell.c
              }

              // Staggered delay for transformation effects
              const delay = (op !== 'base' && op !== 'shift') ? ci * 0.04 + ri * 0.04 : 0

              return (
                <motion.div 
                  key={cell.id} 
                  layout
                  initial={false}
                  animate={{ 
                    background: color,
                    scale: op !== 'base' && op !== 'shift' ? [1, 1.15, 1] : 1
                  }}
                  transition={{ 
                    duration: 0.5, 
                    type: 'spring', 
                    bounce: 0.3,
                    delay: delay
                  }}
                  className="w-8 h-8 rounded shadow-sm flex items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-black/15 border border-black/20" />
                  <span className="text-[12px] font-mono font-bold text-white/95 drop-shadow-md relative z-10">
                    {text}
                  </span>
                </motion.div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default function AES_Detalle() {
  const [activeOp, setActiveOp] = useState(0)

  return (
    <SlideLayout>
      <Tag>Simétrica · Rodrigo</Tag>
      <Title>AES Estructura Interna</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-5 overflow-hidden mt-2">
        {/* Left: Overview */}
        <div className="w-[45%] flex flex-col gap-4">
          
          {/* AES variants */}
          <motion.div variants={fadeUp} className="rounded-3xl p-5 shadow-2xl relative overflow-hidden flex flex-col gap-3"
            style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.15)' }}>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={20} weight="duotone" color="#34d399" />
              <p className="font-mono text-[11px] text-emerald-400 uppercase tracking-widest font-bold">Variantes del Estándar</p>
            </div>
            <div className="flex flex-col gap-2 relative z-10">
              {[['AES-128', '128 bits', '10 rondas', '#60a5fa'], ['AES-192', '192 bits', '12 rondas', '#a78bfa'], ['AES-256', '256 bits', '14 rondas', '#34d399']].map(([v, k, r, c]) => (
                <div key={v} className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-white/5"
                  style={{ background: `${c}0a`, border: `1px solid ${c}20`, boxShadow: `inset 0 0 10px ${c}05` }}>
                  <span className="font-mono text-[13px] font-bold" style={{ color: c }}>{v}</span>
                  <span className="text-white/20 text-xs">|</span>
                  <span className="font-mono text-[11px] text-white/70">{k}</span>
                  <span className="font-mono text-[11px] text-white/50 ml-auto bg-black/40 px-2 py-0.5 rounded-lg border border-white/5">{r}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* State matrix explanation */}
          <motion.div variants={fadeUp} className="rounded-3xl p-5 flex-1 shadow-2xl relative overflow-hidden flex flex-col"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 mb-2 shrink-0">
              <GridFour size={20} weight="duotone" color="rgba(255,255,255,0.7)" />
              <p className="font-mono text-[11px] text-white/50 uppercase tracking-widest font-bold">Matriz de estado</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center gap-6">
              <div className="shrink-0 scale-105 origin-center">
                <StateGrid op="base" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-white/80 text-[13px] leading-relaxed mb-5">
                  Todo el bloque de <strong>16 bytes</strong> se agrupa en una cuadrícula 4×4. A cada vuelta de la cerradura, esta cuadrícula sufre estas 4 mutaciones:
                </p>
                <div className="rounded-xl px-4 py-3 bg-black/40 border border-white/10 grid grid-cols-2 gap-x-2 gap-y-2">
                  {ROUNDS.map((r, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveOp(i)}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all cursor-pointer outline-none ${activeOp === i ? 'bg-white/10 shadow-sm' : 'hover:bg-white/5'}`}
                      style={{ border: activeOp === i ? `1px solid ${r.color}40` : '1px solid transparent' }}
                    >
                      <r.Icon size={16} weight="duotone" color={r.color} className={activeOp === i ? "animate-pulse" : ""} />
                      <span className="font-mono text-[11px] font-bold" style={{ color: r.color }}>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Interactive round operations */}
        <motion.div variants={fadeUp} className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2 px-1">
            <Intersect size={18} weight="duotone" color="rgba(255,255,255,0.5)" />
            <p className="font-mono text-[11px] text-white/50 uppercase tracking-widest font-bold">Panel de operaciones — interactivo</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {ROUNDS.map((op, i) => (
              <button key={i} onClick={() => setActiveOp(i)}
                className="rounded-2xl p-4 text-left transition-all hover:scale-[1.02] cursor-pointer relative overflow-hidden group"
                style={{
                  background: activeOp === i ? `${op.color}15` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${activeOp === i ? op.color + '50' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: activeOp === i ? `0 0 20px ${op.color}20` : 'none'
                }}>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <op.Icon size={20} weight="duotone" color={op.color} className={activeOp === i ? "animate-pulse" : ""} />
                  <span className="font-mono text-[13px] font-bold" style={{ color: op.color }}>{op.label}</span>
                </div>
                <p className="text-white/60 text-[11px] leading-relaxed relative z-10">{op.desc}</p>
              </button>
            ))}
          </div>

          {/* Persistent panel without unmounting to allow layout animations to shine */}
          <motion.div 
            className="rounded-3xl p-5 flex-1 shadow-2xl relative overflow-hidden flex flex-col justify-center transition-colors duration-500"
            style={{
              background: `${ROUNDS[activeOp]?.color ?? '#fff'}08`,
              border: `1px solid ${ROUNDS[activeOp]?.color ?? '#fff'}25`,
            }}>
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none transition-colors duration-500" style={{ background: ROUNDS[activeOp]?.color }} />
            
            <div className="flex items-center gap-8 justify-center relative z-10">
              <div className="flex flex-col items-center gap-3">
                <p className="font-mono text-[11px] text-white/40 uppercase tracking-widest font-bold">Antes</p>
                <StateGrid op="base" />
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center border shadow-lg transition-colors duration-500"
                  style={{ background: `${ROUNDS[activeOp]?.color}20`, borderColor: `${ROUNDS[activeOp]?.color}50` }}>
                  {(() => { const R = ROUNDS[activeOp]; return R ? <R.Icon size={24} weight="duotone" color={R.color} /> : null })()}
                </div>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-white/50 text-xl font-light">→</motion.div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <p className="font-mono text-[11px] uppercase tracking-widest font-bold transition-colors duration-500" style={{ color: ROUNDS[activeOp]?.color }}>Después</p>
                <StateGrid op={ROUNDS[activeOp]?.visual ?? 'sub'} activeColor={ROUNDS[activeOp]?.color} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
