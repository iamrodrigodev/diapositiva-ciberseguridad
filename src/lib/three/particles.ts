export function createParticles(el: HTMLDivElement): () => void {
  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%'
  el.appendChild(canvas)

  const ctx = canvas.getContext('2d')!
  let raf = 0
  let W = 0, H = 0
  let mouse = { x: -999, y: -999 }

  const COUNT = 120
  type P = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; speed: number }
  let pts: P[] = []

  const resize = () => {
    W = canvas.width  = el.offsetWidth
    H = canvas.height = el.offsetHeight
    if (!pts.length) pts = Array.from({ length: COUNT }, () => makeP())
  }

  function makeP(): P {
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.5 + 0.15,
      speed: Math.random() * 0.5 + 0.5,
    }
  }

  const LINK = 110

  const draw = () => {
    ctx.clearRect(0, 0, W, H)

    for (const p of pts) {
      p.x += p.vx * p.speed; p.y += p.vy * p.speed
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
      const dx = p.x - mouse.x, dy = p.y - mouse.y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < 80 && d > 0) { p.x += dx / d * 1.2; p.y += dy / d * 1.2 }
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(52,211,153,${p.alpha})`
      ctx.fill()
    }

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i]!, b = pts[j]!
        const dx = a.x - b.x, dy = a.y - b.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < LINK) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(52,211,153,${(1 - d / LINK) * 0.12})`
          ctx.lineWidth = 0.6; ctx.stroke()
        }
      }
    }

    raf = requestAnimationFrame(draw)
  }

  const onMouse = (e: MouseEvent) => {
    const r = el.getBoundingClientRect()
    mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  const ro = new ResizeObserver(resize)
  ro.observe(el); resize(); draw()
  el.addEventListener('mousemove', onMouse)

  return () => {
    cancelAnimationFrame(raf); ro.disconnect()
    el.removeEventListener('mousemove', onMouse); canvas.remove()
  }
}
