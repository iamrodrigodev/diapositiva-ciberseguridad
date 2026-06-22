import { useState, useRef, useCallback, useEffect } from 'react'
import { RefreshCw, Key } from 'lucide-react'
import { genAESKey, aesEncrypt, freshIV } from '../../lib/crypto/aes'

export default function AESDemo() {
  const [input,   setInput]   = useState('Hola Mundo!')
  const [output,  setOutput]  = useState('')
  const [keyHex,  setKeyHex]  = useState('')
  const [loading, setLoading] = useState(false)
  const keyRef = useRef<CryptoKey | null>(null)
  const ivRef  = useRef<Uint8Array>(new Uint8Array(16))

  const encrypt = useCallback(async (text: string) => {
    if (!keyRef.current || !text.trim()) return
    setLoading(true)
    try { setOutput(await aesEncrypt(text, keyRef.current, ivRef.current)) }
    finally { setLoading(false) }
  }, [])

  const newKey = useCallback(async () => {
    const { key, keyHex: hex } = await genAESKey()
    keyRef.current = key
    ivRef.current  = freshIV()
    setKeyHex(hex)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newKey()
  }, [newKey])

  useEffect(() => {
    encrypt(input)
  }, [input, encrypt])

  return (
    <div className="flex-1 flex flex-col rounded-2xl p-5"
      style={{ background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.15)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Key size={13} className="text-emerald-400" />
        <span className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase">Demo AES-256-CBC en vivo</span>
      </div>

      <label className="text-white/40 text-xs mb-1 font-mono">Mensaje</label>
      <input value={input} onChange={e => setInput(e.target.value)} maxLength={48}
        className="w-full rounded-lg px-3 py-2 text-sm font-mono text-white outline-none mb-3"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        placeholder="Escribe algo…" />

      <div className="flex items-center justify-between mb-1">
        <label className="text-white/40 text-xs font-mono">Clave AES-256</label>
        <button onClick={newKey} className="flex items-center gap-1 text-[10px] text-emerald-400/60 hover:text-emerald-400 font-mono transition-colors">
          <RefreshCw size={10} /> nueva clave
        </button>
      </div>
      <div className="font-mono text-[11px] text-emerald-400/60 rounded-lg px-3 py-2 mb-3 break-all"
        style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.12)' }}>
        {keyHex || '…'}
      </div>

      <label className="text-white/40 text-xs mb-1 font-mono">Ciphertext (hex)</label>
      <div className="flex-1 font-mono text-[11px] rounded-lg px-3 py-2 break-all leading-relaxed"
        style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.12)', color: loading ? '#60a5fa66' : '#60a5fa' }}>
        {loading ? 'cifrando…' : (output || '—')}
      </div>

      <p className="font-mono text-[9px] text-white/20 mt-2 text-center">Cifrado real · Web Crypto API</p>
    </div>
  )
}
