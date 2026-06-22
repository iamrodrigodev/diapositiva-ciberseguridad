import { useEffect, useRef } from 'react'
import { createParticles } from '../../lib/three/particles'

export default function ParticleField() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    return createParticles(ref.current)
  }, [])

  return <div ref={ref} className="absolute inset-0 z-0" />
}
