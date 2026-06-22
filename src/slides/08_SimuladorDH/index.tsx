import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, SkipForward } from 'lucide-react'
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
        <motion.div variants={fadeUp} className="w-[30%] flex flex-col gap-3">
          <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-3">Secretos privados</p>
            {[['a — Alice', a, setA], ['b — Bob', b, setB]].map(([lbl, val, setter]) => (
              <div key={String(lbl)} className="mb-3">
                <div className="flex justify-between mb-1">
                  <label className="font-mono text-[10px] text-white/40">{String(lbl)}</label>
                  <span className="font-mono text-[10px] text-white/40">{Number(val)}</span>
                </div>
                <input type="range" min="2" max="10" value={Number(val)}
                  onChange={e => { (setter as (v: number) => void)(+e.target.value); setStepIdx(0) }}
                  className="w-full h-1.5 rounded-full cursor-pointer"
                  style={{ accentColor: '#818cf8' }} />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Button variant="primary" className="w-full" onClick={() => setStepIdx(i => Math.min(i + 1, SEQUENCE.length))} disabled={stepIdx >= SEQUENCE.length}>
              <Play size={12} /> Siguiente paso
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setStepIdx(SEQUENCE.length)}>
              <SkipForward size={12} /> Ver todo
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => setStepIdx(0)}>
              Reiniciar
            </Button>
          </div>

          <div className="font-mono text-[10px] text-white/20 text-center">
            Paso {Math.min(stepIdx, SEQUENCE.length)}/{SEQUENCE.length}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex-1 overflow-y-auto pr-1">
          <DHStepper a={a} b={b} steps={steps} />
        </motion.div>
      </div>
    </SlideLayout>
  )
}
