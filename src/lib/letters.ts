const pixelSize = 10 // Rozmiar pojedynczego piksela

const drawPixel = (c: CanvasRenderingContext2D, x: number, y: number) => {
  c.fillRect(x, y, pixelSize, pixelSize)
}

export const drawA = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 1; i < 4; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 0; i < 4; i++) drawPixel(c, x + i * pixelSize, y + 3 * pixelSize)
  for (let i = 1; i < 7; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 1; i < 7; i++) drawPixel(c, x + 4 * pixelSize, y + i * pixelSize)
}

export const drawB = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 0; i < 4; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 0; i < 4; i++) drawPixel(c, x + i * pixelSize, y + 3 * pixelSize)
  for (let i = 0; i < 4; i++) drawPixel(c, x + i * pixelSize, y + 6 * pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + 1 * pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + 2 * pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + 4 * pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + 5 * pixelSize)
}

export const drawC = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 1; i < 5; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 1; i < 5; i++) drawPixel(c, x + i * pixelSize, y + 6 * pixelSize)
  for (let i = 1; i < 6; i++) drawPixel(c, x, y + i * pixelSize)
}

export const drawD = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 0; i < 5; i++) {
    drawPixel(c, x + i * pixelSize, y)
    drawPixel(c, x + i * pixelSize, y + 6 * pixelSize)
  }
  drawPixel(c, x + 5 * pixelSize, y + 1 * pixelSize)
  drawPixel(c, x + 5 * pixelSize, y + 2 * pixelSize)
  drawPixel(c, x + 5 * pixelSize, y + 3 * pixelSize)
  drawPixel(c, x + 5 * pixelSize, y + 4 * pixelSize)
  drawPixel(c, x + 5 * pixelSize, y + 5 * pixelSize)
}

export const drawE = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 0; i < 5; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 0; i < 5; i++) drawPixel(c, x + i * pixelSize, y + 6 * pixelSize)
  for (let i = 0; i < 4; i++) drawPixel(c, x + i * pixelSize, y + 3 * pixelSize)
}

export const drawF = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 0; i < 5; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 0; i < 4; i++) drawPixel(c, x + i * pixelSize, y + 3 * pixelSize)
}

export const drawG = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 1; i < 5; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 1; i < 6; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 1; i < 4; i++) drawPixel(c, x + i * pixelSize, y + 6 * pixelSize)
  for (let i = 3; i < 5; i++) drawPixel(c, x + i * pixelSize, y + 3 * pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + 4 * pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + 5 * pixelSize)
}

export const drawH = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 0; i < 7; i++) drawPixel(c, x + 4 * pixelSize, y + i * pixelSize)
  for (let i = 0; i < 5; i++) drawPixel(c, x + i * pixelSize, y + 3 * pixelSize)
}

export const drawI = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x + 2 * pixelSize, y + i * pixelSize)
}

export const drawJ = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 1; i < 4; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 1; i < 6; i++) drawPixel(c, x + 2 * pixelSize, y + i * pixelSize)
  drawPixel(c, x + pixelSize, y + 6 * pixelSize)
  drawPixel(c, x + 0 * pixelSize, y + 6 * pixelSize)
  drawPixel(c, x + -1 * pixelSize, y + 5 * pixelSize)
}

export const drawK = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 0; i < 4; i++)
    drawPixel(c, x + i * pixelSize, y + (3 - i) * pixelSize)
  for (let i = 0; i < 4; i++)
    drawPixel(c, x + i * pixelSize, y + (3 + i) * pixelSize)
}

export const drawL = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 0; i < 5; i++) drawPixel(c, x + i * pixelSize, y + 6 * pixelSize)
}

export const drawM = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 0; i < 7; i++) drawPixel(c, x + 6 * pixelSize, y + i * pixelSize)
  drawPixel(c, x + pixelSize, y + pixelSize)
  drawPixel(c, x + 2 * pixelSize, y + 2 * pixelSize)
  drawPixel(c, x + 3 * pixelSize, y + 3 * pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + 2 * pixelSize)
  drawPixel(c, x + 5 * pixelSize, y + pixelSize)
}

export const drawN = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 0; i < 7; i++) drawPixel(c, x + 4 * pixelSize, y + i * pixelSize)
  for (let i = 0; i < 5; i++) drawPixel(c, x + i * pixelSize, y + i * pixelSize)
}

export const drawO = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 1; i < 4; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 1; i < 4; i++) drawPixel(c, x + i * pixelSize, y + 6 * pixelSize)
  for (let i = 1; i < 6; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 1; i < 6; i++) drawPixel(c, x + 4 * pixelSize, y + i * pixelSize)
}

export const drawP = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 0; i < 4; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 0; i < 4; i++) drawPixel(c, x + i * pixelSize, y + 3 * pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + 2 * pixelSize)
}

export const drawQ = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 1; i < 4; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 1; i < 5; i++) drawPixel(c, x + i * pixelSize, y + 6 * pixelSize)
  for (let i = 1; i < 6; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 1; i < 6; i++) drawPixel(c, x + 4 * pixelSize, y + i * pixelSize)
  drawPixel(c, x + 3 * pixelSize, y + 5 * pixelSize)
  drawPixel(c, x + 5 * pixelSize, y + 7 * pixelSize)
}

export const drawR = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 0; i < 4; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 0; i < 4; i++) drawPixel(c, x + i * pixelSize, y + 3 * pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + 2 * pixelSize)
  drawPixel(c, x + 2 * pixelSize, y + 4 * pixelSize)
  drawPixel(c, x + 3 * pixelSize, y + 5 * pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + 6 * pixelSize)
}

export const drawS = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 1; i < 5; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 1; i < 4; i++) drawPixel(c, x + i * pixelSize, y + 3 * pixelSize)
  for (let i = 0; i < 4; i++) drawPixel(c, x + i * pixelSize, y + 6 * pixelSize)
  drawPixel(c, x, y + 1 * pixelSize)
  drawPixel(c, x, y + 2 * pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + 4 * pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + 5 * pixelSize)
}

export const drawT = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 5; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 1; i < 7; i++) drawPixel(c, x + 2 * pixelSize, y + i * pixelSize)
}

export const drawU = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 6; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 0; i < 6; i++) drawPixel(c, x + 4 * pixelSize, y + i * pixelSize)
  for (let i = 1; i < 4; i++) drawPixel(c, x + i * pixelSize, y + 6 * pixelSize)
}

export const drawV = (c: CanvasRenderingContext2D, x: number, y: number) => {
    drawPixel(c, x + 0 * pixelSize, y + 0 * pixelSize)
    drawPixel(c, x + 0 * pixelSize, y + 1 * pixelSize)
    drawPixel(c, x + 0 * pixelSize, y + 2 * pixelSize)
    drawPixel(c, x + 0 * pixelSize, y + 3 * pixelSize)
    drawPixel(c, x + 0 * pixelSize, y + 4 * pixelSize)
    drawPixel(c, x + 1 * pixelSize, y + 5 * pixelSize)
    drawPixel(c, x + 4 * pixelSize, y + 0 * pixelSize)
    drawPixel(c, x + 4 * pixelSize, y + 1 * pixelSize)
    drawPixel(c, x + 4 * pixelSize, y + 2 * pixelSize)
    drawPixel(c, x + 4 * pixelSize, y + 3 * pixelSize)
    drawPixel(c, x + 4 * pixelSize, y + 4 * pixelSize)
    drawPixel(c, x + 3 * pixelSize, y + 5 * pixelSize)
    
    drawPixel(c, x + 2 * pixelSize, y + 6 * pixelSize)
}

export const drawW = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x, y + i * pixelSize)
  for (let i = 0; i < 7; i++) drawPixel(c, x + 6 * pixelSize, y + i * pixelSize)
  drawPixel(c, x + 1 * pixelSize, y + 5 * pixelSize)
  drawPixel(c, x + 2 * pixelSize, y + 4 * pixelSize)
  drawPixel(c, x + 3 * pixelSize, y + 3 * pixelSize)
  drawPixel(c, x + 4 * pixelSize, y + 4 * pixelSize)
  drawPixel(c, x + 5 * pixelSize, y + 5 * pixelSize)
}

export const drawX = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 7; i++) drawPixel(c, x + i * pixelSize, y + i * pixelSize)
  for (let i = 0; i < 7; i++)
    drawPixel(c, x + 6 * pixelSize - i * pixelSize, y + i * pixelSize)
}

export const drawY = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 3; i++) drawPixel(c, x + i * pixelSize, y + i * pixelSize)
  for (let i = 0; i < 3; i++)
    drawPixel(c, x + 4 * pixelSize - i * pixelSize, y + i * pixelSize)
  for (let i = 3; i < 7; i++) drawPixel(c, x + 2 * pixelSize, y + i * pixelSize)
}

export const drawZ = (c: CanvasRenderingContext2D, x: number, y: number) => {
  for (let i = 0; i < 5; i++) drawPixel(c, x + i * pixelSize, y)
  for (let i = 0; i < 5; i++) drawPixel(c, x + i * pixelSize, y + 6 * pixelSize)
  for (let i = 1; i < 6; i++)
    drawPixel(c, x + (5 - i) * pixelSize, y + i * pixelSize)
}

export const FreezobiaWord = (c: CanvasRenderingContext2D, x: number, y: number) => {
    drawF(c, x, y)
    drawR(c, x + 60, y)
    drawE(c, x + 120, y)
    drawE(c, x + 180, y)
    drawZ(c, x + 240, y)
    drawO(c, x + 300, y)
    drawB(c, x + 360, y)
    drawI(c, x + 410, y)
    drawA(c, x + 460, y)
}