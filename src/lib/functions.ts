export function lerp(start: number, end: number, amount: number) {
  const twoPi = 2 * Math.PI

  start = start % twoPi
  end = end % twoPi

  if (start < 0) start += twoPi
  if (end < 0) end += twoPi

  let difference = end - start

  if (difference > Math.PI) {
    difference -= twoPi
  } else if (difference < -Math.PI) {
    difference += twoPi
  }

  const result = start + difference * amount

  return (result + twoPi) % twoPi
}
