export const toHex = (buf: ArrayBuffer) =>
  Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(' ')

export const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

export const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

export const CHARS_HEX = '0123456789abcdef'
