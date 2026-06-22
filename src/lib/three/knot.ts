export function createKnot(el: HTMLDivElement): () => void {
  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'width:100%;height:100%;border-radius:1rem'
  el.appendChild(canvas)

  const ctx = canvas.getContext('2d')!
  let raf = 0, angle = 0
  let W = 0, H = 0

  const resize = () => {
    W = canvas.width  = el.offsetWidth
    H = canvas.height = el.offsetHeight
  }

  // Parametric torus knot (p=2, q=3)
  function knotPoint(t: number, scale: number): [number, number, number] {
    const p = 2, q = 3
    const r = Math.cos(q * t) + 2
    return [
      r * Math.cos(p * t) * scale,
      r * Math.sin(p * t) * scale,
      -Math.sin(q * t) * scale,
    ]
  }

  // Simple 3D → 2D projection with rotation
  function project(x: number, y: number, z: number, rotY: number): [number, number, number] {
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
    const x1 = x * cosY + z * sinY
    const z1 = -x * sinY + z * cosY
    const fov = 300
    const pz = z1 + 4
    const px = (x1 / pz) * fov + W / 2
    const py = (y  / pz) * fov + H / 2
    return [px, py, pz]
  }

  const STEPS = 180

  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    angle += 0.008

    const scale = Math.min(W, H) * 0.10

    ctx.lineWidth = 1.4
    for (let i = 0; i < STEPS; i++) {
      const t0 = (i / STEPS) * Math.PI * 2
      const t1 = ((i + 1) / STEPS) * Math.PI * 2
      const [x0, y0, z0] = knotPoint(t0, scale)
      const [x1, y1, z1] = knotPoint(t1, scale)
      const [px0, py0] = project(x0, y0, z0, angle)
      const [px1, py1] = project(x1, y1, z1, angle)

      const hue = (i / STEPS) * 280 + 180
      const depth = (z0 + scale) / (scale * 2)
      const alpha = 0.3 + depth * 0.55

      ctx.beginPath()
      ctx.moveTo(px0, py0)
      ctx.lineTo(px1, py1)
      ctx.strokeStyle = `hsla(${hue},70%,65%,${alpha})`
      ctx.stroke()
    }

    raf = requestAnimationFrame(draw)
  }

  const ro = new ResizeObserver(resize)
  ro.observe(el); resize(); draw()

  return () => { cancelAnimationFrame(raf); ro.disconnect(); canvas.remove() }
}
