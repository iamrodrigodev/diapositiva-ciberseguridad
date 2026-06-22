import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'
import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import Button from '../../ui/Button'
import DHStepper, { type StepKey } from './DHStepper'

const SEQUENCE: StepKey[] = ['public','A','B','sharedA','sharedB','verify']

export default function SimuladorDH() {
  const [a, setA] = useState(4)
  const [b, setB] = useState(3)
  const [stepIdx, setStepIdx] = useState(0)
  const steps = SEQUENCE.slice(0, stepIdx)

  return (
    <SlideLayout>
      <Tag>Simulador DH paso a paso · Carlos</Tag>
      <Title>Protocolo Diffie-Hellman</Title>

      <div className="flex gap-6 flex-1 overflow-hidden mt-2">
        {/* Left: Controls */}
        <motion.div variants={fadeUp} className="w-[30%] flex flex-col gap-4">
          <div className="rounded-3xl p-6 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-[11px] font-mono text-white/50 uppercase tracking-widest mb-4 font-bold border-b border-white/10 pb-2">Claves Privadas Iniciales</p>
            
            <div className="space-y-4">
              {([['Alice (a)', a, setA, '#60a5fa'], ['Bob (b)', b, setB, '#a78bfa']] as const).map(([lbl, val, setter, color]) => (
                <div key={lbl} className="bg-white/5 p-4 rounded-2xl border transition-all hover:scale-[1.02]" style={{ borderColor: `${color}30` }}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[12px] font-mono font-bold" style={{ color }}>{lbl}</label>
                    <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-md border" style={{ borderColor: `${color}40` }}>
                      <span className="text-[12px] font-mono font-bold" style={{ color }}>{val}</span>
                    </div>
                  </div>
                  <input type="range" min="2" max="10" value={val}
                    onChange={e => { setter(+e.target.value); setStepIdx(0) }}
                    className="w-full h-1.5 rounded-full cursor-pointer outline-none"
                    style={{ accentColor: color }} />
                </div>
              ))}
            </div>
            
            <p className="text-[11px] text-white/40 mt-5 leading-relaxed">
              Mueve los valores para reiniciar la simulación con nuevas claves privadas.
            </p>
          </div>

          <div className="rounded-3xl p-5 mt-auto flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Button variant="primary" className="w-full py-3 text-sm font-bold shadow-lg"
              onClick={() => setStepIdx(i => Math.min(i + 1, SEQUENCE.length))}
              disabled={stepIdx >= SEQUENCE.length}>
              ▶ Siguiente Paso
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1 py-2.5 text-xs bg-white/5 hover:bg-white/10"
                onClick={() => setStepIdx(SEQUENCE.length)}>
                ⏭ Ver Todo
              </Button>
              <Button variant="secondary" className="flex-1 py-2.5 text-xs"
                onClick={() => setStepIdx(0)}>
                ↺ Reiniciar
              </Button>
            </div>
            
            <div className="text-[11px] font-mono text-white/40 text-center mt-1 uppercase tracking-wider font-bold">
              Paso {Math.min(stepIdx, SEQUENCE.length)} de {SEQUENCE.length}
            </div>
          </div>
        </motion.div>

        {/* Right: Stepper */}
        <motion.div variants={fadeUp} className="flex-1 overflow-y-auto pr-1">
          <DHStepper a={a} b={b} steps={steps} />
        </motion.div>
      </div>
    </SlideLayout>
  )
}
