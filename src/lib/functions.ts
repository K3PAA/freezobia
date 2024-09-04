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

export function randomCanvasSide(canvas: HTMLCanvasElement) {
  const randomNumber = Math.floor(Math.random() * 4) + 1
  const positionX = Math.floor(Math.random() * canvas.width) + 1
  const positionY = Math.floor(Math.random() * canvas.height) + 1

  let finalPosition = { x: 0, y: 0 }

  switch (randomNumber) {
    case 1: {
      finalPosition = { x: positionX, y: -50 }
      break
    }
    case 2: {
      finalPosition = { x: canvas.width + 150, y: positionY }
      break
    }
    case 3: {
      finalPosition = { x: positionX, y: canvas.height + 150 }
      break
    }
    case 4: {
      finalPosition = { x: -50, y: positionY }
      break
    }
  }
  return finalPosition
}
