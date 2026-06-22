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

      <div className="flex gap-5 flex-1 overflow-hidden">
        <motion.div variants={fadeUp} className="w-[28%] flex flex-col gap-4">
          <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-mono text-white/35 uppercase tracking-widest mb-4">Secretos privados</p>
            {([['a — Alice', a, setA], ['b — Bob', b, setB]] as const).map(([lbl, val, setter]) => (
              <div key={lbl} className="mb-4">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-mono text-white/55">{lbl}</label>
                  <span className="text-sm font-bold font-mono text-white/70">{val}</span>
                </div>
                <input type="range" min="2" max="10" value={val}
                  onChange={e => { setter(+e.target.value); setStepIdx(0) }}
                  className="w-full h-2 rounded-full cursor-pointer"
                  style={{ accentColor: '#818cf8' }} />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Button variant="primary" className="w-full py-3 text-sm"
              onClick={() => setStepIdx(i => Math.min(i + 1, SEQUENCE.length))}
              disabled={stepIdx >= SEQUENCE.length}>
              ▶ Siguiente paso
            </Button>
            <Button variant="ghost" className="w-full py-3 text-sm"
              onClick={() => setStepIdx(SEQUENCE.length)}>
              ⏭ Ver todo
            </Button>
            <Button variant="secondary" className="w-full py-3 text-sm"
              onClick={() => setStepIdx(0)}>
              ↺ Reiniciar
            </Button>
          </div>

          <div className="text-sm font-mono text-white/30 text-center">
            Paso {Math.min(stepIdx, SEQUENCE.length)} de {SEQUENCE.length}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex-1 overflow-y-auto pr-1">
          <DHStepper a={a} b={b} steps={steps} />
        </motion.div>
      </div>
    </SlideLayout>
  )
}
