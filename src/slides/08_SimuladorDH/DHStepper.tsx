import { DH_P, DH_G, computeDH } from '../../lib/crypto/dh'
import { CheckCircle, LockKey, GlobeHemisphereWest, GitBranch, Calculator } from '@phosphor-icons/react'
import type { ReactNode, ElementType } from 'react'

export type StepKey = 'public'|'A'|'B'|'sharedA'|'sharedB'|'verify'

interface Props { a: number; b: number; steps: StepKey[] }

function StepCard({ active, color, label, icon: Icon, children, placeholder }: { active: boolean, color: string, label: string, icon: ElementType, children: ReactNode, placeholder: string }) {
  return (
    <div className={`rounded-3xl px-6 py-5 transition-all duration-500 border relative overflow-hidden flex flex-col justify-center ${active ? 'shadow-xl' : 'opacity-40 grayscale-[0.5]'}`}
         style={{ background: active ? `${color}08` : 'rgba(255,255,255,0.02)', borderColor: active ? `${color}30` : 'rgba(255,255,255,0.05)', transform: active ? 'scale(1)' : 'scale(0.98)' }}>
      {active && <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-10 pointer-events-none" style={{ background: color }} />}
      <div className="flex items-center gap-2.5 mb-3 relative z-10">
        <div className="p-1.5 rounded-lg" style={{ background: active ? `${color}20` : 'rgba(255,255,255,0.1)' }}>
          <Icon size={18} weight="duotone" color={active ? color : '#888'} />
        </div>
        <p className="text-[12px] font-bold uppercase tracking-widest font-mono" style={{ color: active ? color : '#888' }}>{label}</p>
      </div>
      <div className="relative z-10 flex-1">
        {active ? children : <div className="text-white/30 text-sm font-mono mt-2 flex items-center gap-2"><span>[ Esperando... ]</span> {placeholder}</div>}
      </div>
    </div>
  )
}

export default function DHStepper({ a, b, steps }: Props) {
  const { A, B, sharedA, sharedB, match } = computeDH(a, b)
  const has = (s: StepKey) => steps.includes(s)

  return (
    <div className="flex flex-col h-full pr-2 pb-2">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase font-bold">Ejecución del Protocolo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        
        {/* Step 1 */}
        <div className="col-span-1 md:col-span-2 flex">
          <div className="flex-1">
            <StepCard active={has('public')} color="#34d399" label="1. Parámetros Públicos" icon={GlobeHemisphereWest} placeholder="Pendiente acordar p y g">
              <div className="flex items-center justify-between">
                <div className="flex gap-10 font-mono text-[17px] mt-1 bg-black/30 px-5 py-3 rounded-2xl w-fit border border-emerald-500/15">
                  <span>p = <strong className="text-emerald-400">{DH_P.toString()}</strong></span>
                  <span>g = <strong className="text-emerald-400">{DH_G.toString()}</strong></span>
                </div>
                <p className="text-white/50 text-[12px] max-w-50 text-right leading-relaxed">Valores iniciales públicos acordados a través del canal inseguro.</p>
              </div>
            </StepCard>
          </div>
        </div>

        {/* Step 2 */}
        <StepCard active={has('A')} color="#60a5fa" label="2. Alice calcula (A)" icon={Calculator} placeholder="A = g^a mod p">
           <div className="font-mono text-[13px] space-y-1 text-white/70">
             <div>A = {DH_G.toString()}<sup>{a}</sup> mod {DH_P.toString()}</div>
             <div className="text-xl mt-2 p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 inline-block shadow-inner">
               <strong className="text-blue-400">A = {A.toString()}</strong>
             </div>
             <p className="text-[10px] text-white/40 mt-1.5 uppercase tracking-wide">✓ Listo para enviar a Bob</p>
           </div>
        </StepCard>

        {/* Step 3 */}
        <StepCard active={has('B')} color="#a78bfa" label="3. Bob calcula (B)" icon={Calculator} placeholder="B = g^b mod p">
           <div className="font-mono text-[13px] space-y-1 text-white/70">
             <div>B = {DH_G.toString()}<sup>{b}</sup> mod {DH_P.toString()}</div>
             <div className="text-xl mt-2 p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 inline-block shadow-inner">
               <strong className="text-purple-400">B = {B.toString()}</strong>
             </div>
             <p className="text-[10px] text-white/40 mt-1.5 uppercase tracking-wide">✓ Listo para enviar a Alice</p>
           </div>
        </StepCard>

        {/* Step 4 */}
        <StepCard active={has('sharedA')} color="#60a5fa" label="4. Alice mezcla B" icon={GitBranch} placeholder="s = B^a mod p">
           <div className="font-mono text-[13px] space-y-1 text-white/70">
             <div>s = {B.toString()}<sup>{a}</sup> mod {DH_P.toString()}</div>
             <div className="text-xl mt-2 p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 inline-block shadow-inner">
               <strong className="text-blue-400">s = {sharedA.toString()}</strong>
             </div>
           </div>
        </StepCard>

        {/* Step 5 */}
        <StepCard active={has('sharedB')} color="#a78bfa" label="5. Bob mezcla A" icon={GitBranch} placeholder="s = A^b mod p">
           <div className="font-mono text-[13px] space-y-1 text-white/70">
             <div>s = {A.toString()}<sup>{b}</sup> mod {DH_P.toString()}</div>
             <div className="text-xl mt-2 p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 inline-block shadow-inner">
               <strong className="text-purple-400">s = {sharedB.toString()}</strong>
             </div>
           </div>
        </StepCard>

        {/* Step 6 */}
        <div className="col-span-1 md:col-span-2">
          <StepCard active={has('verify')} color={match ? '#fbbf24' : '#f87171'} label="6. Secreto Compartido" icon={LockKey} placeholder="Esperando a ambos...">
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-mono text-2xl font-bold text-amber-400 flex items-center gap-3">
                   {match ? <CheckCircle size={32} weight="fill" color="#fbbf24" /> : null}
                   Magia Matemática: {sharedA.toString()} = {sharedB.toString()}
                 </p>
                 <p className="text-[13px] text-white/60 mt-2 max-w-lg">
                   Ambos llegaron al mismo <strong className="text-amber-300 font-mono">secreto {sharedA.toString()}</strong> sin haberlo transmitido jamás por internet. El hacker solo vio A y B.
                 </p>
               </div>
               <div className="bg-amber-500/10 p-4 rounded-3xl border border-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.15)]">
                 <LockKey size={40} weight="duotone" color="#fbbf24" />
               </div>
             </div>
          </StepCard>
        </div>

      </div>
    </div>
  )
}
