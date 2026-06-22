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

function gcd(a: bigint, b: bigint): bigint {
  while (b !== 0n) { const t = b; b = a % b; a = t }
  return a
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
  valid: boolean; error?: string
}

export function deriveRSA(pNum: number, qNum: number): RSAParams {
  const p = BigInt(pNum), q = BigInt(qNum)

  if (p === q) {
    const n = p * q
    return { p, q, n, phi: 0n, e: 0n, d: 0n, valid: false, error: 'p y q deben ser primos distintos' }
  }

  const n   = p * q
  const phi = (p - 1n) * (q - 1n)

  // Pick smallest valid public exponent: coprime with phi and < phi
  const candidates = [3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n, 65537n]
  const e = candidates.find(c => c < phi && gcd(c, phi) === 1n)

  if (!e) {
    return { p, q, n, phi, e: 0n, d: 0n, valid: false, error: 'No se encontró e válido para estos primos' }
  }

  const d = modInv(e, phi)
  return { p, q, n, phi, e, d, valid: true }
}
