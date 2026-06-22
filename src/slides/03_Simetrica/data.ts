export interface AlgoSpec {
  id: string; label: string; bits: number; rounds: number
  status: 'secure' | 'broken' | 'legacy'
  statusLabel: string
  color: string
  note: string
  detail: string
}

export const ALGOS: AlgoSpec[] = [
  {
    id: 'AES', label: 'AES', bits: 256, rounds: 14,
    status: 'secure', statusLabel: 'SEGURO',
    color: '#34d399',
    note: 'El rey actual de la seguridad. Es el que protege tus mensajes de WhatsApp, tu WiFi y tus pagos en línea todos los días.',
    detail: 'Matemáticamente irrompible hoy en día. Si todas las computadoras del planeta intentaran adivinar una clave AES-256 a la vez, el universo se acabaría antes de que tuvieran éxito.',
  },
  {
    id: 'DES', label: 'DES', bits: 56, rounds: 16,
    status: 'broken', statusLabel: 'ROTO',
    color: '#f87171',
    note: 'El estándar de los años 70. Fue un buen guardián en su época, pero la tecnología avanzó demasiado rápido y lo dejó atrás.',
    detail: 'Su "candado" es tan pequeño que una tarjeta gráfica moderna para videojuegos puede abrirlo probando todas las combinaciones en un par de horas. ¡Nunca lo uses!',
  },
  {
    id: '3DES', label: '3DES', bits: 112, rounds: 48,
    status: 'legacy', statusLabel: 'OBSOLETO',
    color: '#fbbf24',
    note: 'Un parche de emergencia. Cuando DES se volvió inseguro, a alguien se le ocurrió la brillante idea de aplicar DES tres veces seguidas.',
    detail: 'Es mucho más seguro que DES, pero es extremadamente lento, pesado e ineficiente. Ya está retirado oficialmente y no debería usarse en sistemas nuevos.',
  },
]
