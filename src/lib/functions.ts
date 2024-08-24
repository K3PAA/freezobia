export function lerp(start: number, end: number, amount: number) {
  const result = start + (end - start) * amount
  return result
}
