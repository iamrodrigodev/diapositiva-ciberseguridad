export const DH_P = 23n
export const DH_G = 5n

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

export interface DHResult {
  A: bigint; B: bigint; sharedA: bigint; sharedB: bigint; match: boolean
}

export function computeDH(a: number, b: number): DHResult {
  const bA = BigInt(a), bB = BigInt(b)
  const A       = modPow(DH_G, bA, DH_P)
  const B       = modPow(DH_G, bB, DH_P)
  const sharedA = modPow(B, bA, DH_P)
  const sharedB = modPow(A, bB, DH_P)
  return { A, B, sharedA, sharedB, match: sharedA === sharedB }
}

export function mixHue(h1: number, h2: number): number {
  const diff = ((h2 - h1 + 540) % 360) - 180
  return (h1 + diff / 2 + 360) % 360
}
