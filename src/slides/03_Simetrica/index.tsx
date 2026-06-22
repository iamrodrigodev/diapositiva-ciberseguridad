import SlideLayout from '../../components/SlideLayout'
import Tag from '../../ui/Tag'
import Title from '../../ui/Title'
import AlgoCard from './AlgoCard'
import AESDemo from './AESDemo'
import { ALGOS } from './data'

export default function Simetrica() {
  return (
    <SlideLayout>
      <Tag>Criptografía Simétrica · Rodrigo</Tag>
      <Title>Algoritmos: AES, DES y 3DES</Title>

      <div className="flex gap-5 flex-1 overflow-hidden">
        <div className="flex flex-col gap-3 w-[55%]">
          {ALGOS.map(a => <AlgoCard key={a.id} algo={a} />)}
        </div>
        <AESDemo />
      </div>
    </SlideLayout>
  )
}
