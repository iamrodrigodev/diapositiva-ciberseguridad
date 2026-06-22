import { useState } from 'react'
import { Lock, Unlock, Calculator, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp } from '../../lib/motion'
import Button from '../../ui/Button'
import CodeLine from '../../ui/CodeLine'
import { deriveRSA, modPow } from '../../lib/crypto/rsa'

export default function RSACalc() {
  const [pNum,   setPNum]   = useState(5)
  const [qNum,   setQNum]   = useState(11)
  const [msgNum, setMsgNum] = useState(7)
  const [cipher, setCipher] = useState<bigint | null>(null)
  const [plain,  setPlain]  = useState<bigint | null>(null)
  const [step,   setStep]   = useState<'idle'|'enc'|'dec'>('idle')

  const params = deriveRSA(pNum, qNum)
  const { n, phi, e, d, valid, error } = params
  const m = BigInt(msgNum)

  const reset = () => { setCipher(null); setPlain(null); setStep('idle') }

  const handleP   = (v: number) => { setPNum(v);   reset() }
  const handleQ   = (v: number) => { setQNum(v);   reset() }
  const handleMsg = (v: number) => { setMsgNum(v); reset() }

  const encrypt = () => { if (valid) { setCipher(modPow(m, e, n)); setStep('enc') } }
  const decrypt = () => { if (valid && cipher) { setPlain(modPow(cipher, d, n)); setStep('dec') } }

  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <Calculator size={15} className="text-violet-400" />
        <span className="text-sm font-bold text-violet-400">Simulador RSA interactivo</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {([['p (primo)', pNum, [3,5,7,11,13], handleP], ['q (primo)', qNum, [7,11,13,17,19], handleQ]] as const).map(([lbl, val, opts, setter]) => (
          <div key={lbl}>
            <label className="text-xs font-mono text-white/40 block mb-1">{lbl}</label>
            <select value={val} onChange={e => setter(+e.target.value)}
              className="w-full rounded-lg px-3 py-2 font-mono text-sm text-white outline-none"
              style={{ background: 'rgba(167,139,250,0.08)', border: `1px solid ${pNum === qNum ? 'rgba(248,113,113,0.4)' : 'rgba(167,139,250,0.2)'}` }}>
              {(opts as readonly number[]).map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {!valid && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl px-4 py-3"
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)' }}>
            <AlertTriangle size={14} className="text-red-400 shrink-0" />
            <span className="text-red-400 text-sm font-mono">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {valid && (
        <>
          <div className="rounded-xl p-3 space-y-1.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <CodeLine label="n = p × q"         value={`= ${n}`} />
            <CodeLine label="φ(n) = (p-1)(q-1)" value={`= ${phi}`} />
            <CodeLine label="e (clave pública)"  value={`= ${e}`}  color="#34d399" />
            <CodeLine label="d (clave privada)"  value={`= ${d}`}  color="#a78bfa" />
          </div>

          <div>
            <label className="text-xs font-mono text-white/40 block mb-1">Mensaje m (1 … {String(n - 1n)})</label>
            <input type="number" value={msgNum} min={1} max={Number(n - 1n)}
              onChange={e => handleMsg(Math.max(1, Math.min(+e.target.value, Number(n - 1n))))}
              className="w-full rounded-lg px-3 py-2 font-mono text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>

          <div className="flex gap-2">
            <Button variant="primary" className="flex-1" onClick={encrypt}><Lock size={12} /> Cifrar</Button>
            <Button variant="violet"  className="flex-1" onClick={decrypt} disabled={step !== 'enc'}><Unlock size={12} /> Descifrar</Button>
          </div>

          <AnimatePresence>
            {step !== 'idle' && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-xl p-3 space-y-1.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <CodeLine label="c = mᵉ mod n" value={`= ${cipher}`} color="#34d399" />
                {step === 'dec' && (
                  <div className="flex items-center gap-2">
                    <CodeLine label="m' = cᵈ mod n" value={`= ${plain}`} color="#a78bfa" />
                    {plain === m && <span className="text-sm text-emerald-400 font-bold">✓ igual!</span>}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  )
}
