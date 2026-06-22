import { useEffect, useRef } from 'react'
import { createKnot } from '../../lib/three/knot'

export default function TorusKnot() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    return createKnot(ref.current)
  }, [])

  return <div ref={ref} className="w-full h-64 rounded-2xl overflow-hidden" />
}
