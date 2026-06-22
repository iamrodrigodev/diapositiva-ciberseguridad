export function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n
  base = base % mod
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod
    exp >>= 1n
    base = (base * base) % mod
  }
  return result
}

function extGcd(a: bigint, b: bigint): [bigint, bigint, bigint] {
  if (b === 0n) return [a, 1n, 0n]
  const [g, x1, y1] = extGcd(b, a % b)
  return [g, y1, x1 - (a / b) * y1]
}

export function modInv(a: bigint, m: bigint): bigint {
  const [, x] = extGcd(a % m, m)
  return ((x % m) + m) % m
}

export interface RSAParams {
  p: bigint; q: bigint; n: bigint; phi: bigint; e: bigint; d: bigint
}

export function deriveRSA(pNum: number, qNum: number): RSAParams {
  const p = BigInt(pNum), q = BigInt(qNum)
  const n   = p * q
  const phi = (p - 1n) * (q - 1n)
  const e   = 3n
  const d   = modInv(e, phi)
  return { p, q, n, phi, e, d }
}
