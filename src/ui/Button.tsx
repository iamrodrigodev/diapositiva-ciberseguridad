import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'violet'

const V: Record<Variant, { bg: string; border: string; color: string }> = {
  primary:   { bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.35)',  color: '#34d399' },
  secondary: { bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.35)',  color: '#60a5fa' },
  violet:    { bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.35)', color: '#a78bfa' },
  ghost:     { bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.5)' },
  danger:    { bg: 'rgba(248,113,113,0.10)', border: 'rgba(248,113,113,0.30)', color: '#f87171' },
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

export default function Button({ variant = 'ghost', children, className = '', ...rest }: Props) {
  const v = V[variant]
  return (
    <button
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed ${className}`}
      style={{ background: v.bg, border: `1px solid ${v.border}`, color: v.color }}
      {...rest}
    >
      {children}
    </button>
  )
}
