import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import AlgoCard from './AlgoCard'
import EncryptViz from './EncryptViz'
import { ALGOS } from './data'
import { Info } from '@phosphor-icons/react'

export default function Simetrica() {
  return (
    <SlideLayout>
      <Tag>Criptografía Simétrica · Rodrigo</Tag>
      <Title>Algoritmos: AES, DES y 3DES</Title>

      <div className="flex gap-5 flex-1 overflow-hidden">
        <div className="flex flex-col gap-3 w-[55%] relative">
          {ALGOS.map(a => <AlgoCard key={a.id} algo={a} />)}

          {/* Explicación de Bits */}
          <div className="mt-auto bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-4 flex gap-3 shadow-[0_0_15px_rgba(52,211,153,0.05)]">
            <div className="mt-0.5">
              <Info size={22} className="text-emerald-400" weight="duotone" />
            </div>
            <div>
              <p className="font-mono text-[11px] text-emerald-400 tracking-widest uppercase font-bold mb-1.5">
                ¿Qué son los bits en criptografía?
              </p>
              <p className="text-[12.5px] text-white/70 leading-relaxed">
                El "bit" define el tamaño matemático de la llave. La regla de oro es que <strong>cada bit extra DUPLICA</strong> el número de combinaciones. Una llave de 128 bits no es el doble de segura que una de 64, es <strong className="text-white">billones de trillones</strong> de veces más difícil de romper por fuerza bruta. Por eso AES-256 se considera de nivel militar.
              </p>
            </div>
          </div>
        </div>
        <EncryptViz />
      </div>
    </SlideLayout>
  )
}

