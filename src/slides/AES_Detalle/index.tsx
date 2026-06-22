import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { stagger, fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import { ArrowsClockwise, ArrowsLeftRight, Shuffle, Plus } from '@phosphor-icons/react'

const ROUNDS = [
  { label: 'SubBytes',    color: '#60a5fa', Icon: ArrowsClockwise, desc: 'Cada byte se sustituye con un valor de la S-box (tabla de sustitución no lineal). Aporta confusión.',                                         visual: 'sub'   },
  { label: 'ShiftRows',   color: '#a78bfa', Icon: ArrowsLeftRight,  desc: 'Las filas de la matriz 4×4 se desplazan cíclicamente: fila 0 no se mueve, fila 1 → 1 pos, fila 2 → 2, fila 3 → 3.', visual: 'shift' },
  { label: 'MixColumns',  color: '#fbbf24', Icon: Shuffle,          desc: 'Cada columna se multiplica por una matriz fija en GF(2⁸). Aporta difusión: un byte afecta toda la columna.',                        visual: 'mix'   },
  { label: 'AddRoundKey', color: '#34d399', Icon: Plus,             desc: 'XOR del estado con la subclave de la ronda. La única operación que incorpora la clave en cada vuelta.',                              visual: 'add'   },
]

// Simple 4x4 state grid colors for visualization
const STATE_COLORS = [
  ['#6366f1','#8b5cf6','#a78bfa','#c4b5fd'],
  ['#3b82f6','#60a5fa','#93c5fd','#bfdbfe'],
  ['#10b981','#34d399','#6ee7b7','#a7f3d0'],
  ['#f59e0b','#fbbf24','#fcd34d','#fde68a'],
]

function StateGrid({ op }: { op: string }) {
  const isShift = op === 'shift'
  return (
    <div className="flex flex-col gap-0.5">
      {STATE_COLORS.map((row, ri) => {
        const offset = isShift ? ri : 0
        const shifted = [...row.slice(offset), ...row.slice(0, offset)]
        const displayRow = isShift ? shifted : op === 'mix' ? row.map((_, ci) => STATE_COLORS[ci]?.[ri] ?? '') : row
        return (
          <div key={ri} className="flex gap-0.5">
            {(op === 'mix' ? displayRow : row).map((c, ci) => {
              const color = op === 'sub' ? STATE_COLORS[(ri + 2) % 4]?.[(ci + 1) % 4] ?? c
                          : op === 'shift' ? shifted[ci]
                          : op === 'add' ? STATE_COLORS[(ri + ci) % 4]?.[ci] ?? c
                          : c
              return (
                <motion.div key={ci}
                  animate={{ background: color ?? c }}
                  transition={{ duration: 0.3, delay: (ri * 4 + ci) * 0.03 }}
                  className="w-7 h-7 rounded-sm opacity-80" />
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
      <Title>AES — Estructura Interna</Title>

      <motion.div variants={stagger} className="flex-1 flex gap-5 overflow-hidden">
        {/* Left: Overview */}
        <div className="w-[40%] flex flex-col gap-3">
          {/* AES variants */}
          <motion.div variants={fadeUp} className="rounded-2xl p-4"
            style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.2)' }}>
            <p className="font-mono text-[10px] text-emerald-400/70 uppercase tracking-widest mb-3">Variantes AES</p>
            <div className="flex flex-col gap-2">
              {[['AES-128', '128 bits', '10 rondas', '#60a5fa'], ['AES-192', '192 bits', '12 rondas', '#a78bfa'], ['AES-256', '256 bits', '14 rondas', '#34d399']].map(([v, k, r, c]) => (
                <div key={v} className="flex items-center gap-3 rounded-lg px-3 py-2"
                  style={{ background: `${c}0a`, border: `1px solid ${c}20` }}>
                  <span className="font-mono text-xs font-bold" style={{ color: c }}>{v}</span>
                  <span className="text-white/55 text-xs">|</span>
                  <span className="font-mono text-xs text-white/55">{k}</span>
                  <span className="font-mono text-xs text-white/55 ml-auto">{r}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* State matrix explanation */}
          <motion.div variants={fadeUp} className="rounded-2xl p-4 flex-1"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-3">Matriz de estado (4×4 bytes = 128 bits)</p>
            <div className="flex items-start gap-4">
              <StateGrid op={ROUNDS[activeOp]?.visual ?? 'sub'} />
              <div className="flex-1">
                <p className="text-white/70 text-xs leading-relaxed">
                  AES opera sobre un bloque de <strong className="text-white/80">16 bytes</strong> organizados como una matriz 4×4.
                  Este "estado" se transforma en cada ronda con 4 operaciones.
                </p>
                <div className="mt-2 rounded-lg px-3 py-2"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p className="font-mono text-[10px] text-white/50 mb-1">Estructura de una ronda</p>
                  {ROUNDS.map((r, i) => (
                    <div key={i} className="flex items-center gap-1.5 py-0.5">
                      <r.Icon size={12} weight="duotone" color={r.color} />
                      <span className="font-mono text-[10px]" style={{ color: r.color }}>{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Interactive round operations */}
        <motion.div variants={fadeUp} className="flex-1 flex flex-col gap-3">
          <p className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Operaciones por ronda — click para explorar</p>

          <div className="grid grid-cols-2 gap-2">
            {ROUNDS.map((op, i) => (
              <button key={i} onClick={() => setActiveOp(i)}
                className="rounded-xl p-3 text-left transition-all"
                style={{
                  background: activeOp === i ? `${op.color}14` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${activeOp === i ? op.color + '50' : 'rgba(255,255,255,0.08)'}`,
                }}>
                <div className="flex items-center gap-2 mb-1">
                  <op.Icon size={18} weight="duotone" color={op.color} />
                  <span className="font-mono text-xs font-bold" style={{ color: op.color }}>{op.label}</span>
                </div>
                <p className="text-white/65 text-xs leading-relaxed">{op.desc}</p>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeOp}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl p-4 flex-1"
              style={{
                background: `${ROUNDS[activeOp]?.color ?? '#fff'}08`,
                border: `1px solid ${ROUNDS[activeOp]?.color ?? '#fff'}25`,
              }}>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: `${ROUNDS[activeOp]?.color ?? '#fff'}80` }}>
                {ROUNDS[activeOp]?.label} — transformación actual
              </p>
              <div className="flex items-center gap-6 justify-center">
                <div className="flex flex-col items-center gap-2">
                  <p className="font-mono text-[9px] text-white/50">Antes</p>
                  <StateGrid op="base" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  {(() => { const R = ROUNDS[activeOp]; return R ? <R.Icon size={20} weight="duotone" color={R.color} /> : null })()}
                  <div className="text-white/50 text-lg">→</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="font-mono text-[9px] text-white/50">Después</p>
                  <StateGrid op={ROUNDS[activeOp]?.visual ?? 'sub'} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </SlideLayout>
  )
}
