const pixelSize = 2 // Rozmiar pojedynczego piksela

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
    drawR(c, x + 15, y)
    drawE(c, x + 30, y)
    drawE(c, x + 45, y)
    drawZ(c, x + 60, y)
    drawO(c, x + 75, y)
    drawB(c, x + 90, y)
    drawI(c, x + 100, y)
    drawA(c, x + 110, y)
}

export const FirstWords = (c: CanvasRenderingContext2D, x: number, y: number) => {
    drawT(c, x, y)
    drawR(c, x + 15, y)
    drawY(c, x + 30, y)

    drawT(c, x + 60, y)
    drawO(c, x + 75, y)

    drawS(c, x + 105, y)
    drawU(c, x + 120, y)
    drawR(c, x + 135, y)
    drawV(c, x + 150, y)
    drawI(c, x + 160, y)
    drawV(c, x + 170, y)
    drawE(c, x + 185, y)

    drawT(c, x + 215, y)
    drawH(c, x + 230, y)
    drawE(c, x + 245, y)

    drawL(c, x + 275, y)
    drawO(c, x + 290, y)
    drawN(c, x + 305, y)
    drawG(c, x + 320, y)
    drawE(c, x + 335, y)
    drawS(c, x + 350, y)
    drawT(c, x + 365, y)
}

export const SecondWords = (c: CanvasRenderingContext2D, x: number, y: number) => {
    drawF(c, x, y);
    drawI(c, x + 10, y);
    drawN(c, x + 20, y);
    drawD(c, x + 35, y);

    drawC(c, x + 65, y);
    drawA(c, x + 80, y);
    drawM(c, x + 95, y);
    drawP(c, x + 115, y);
    drawF(c, x + 130, y);
    drawI(c, x + 140, y);
    drawR(c, x + 150, y);
    drawE(c, x + 165, y);
  
    drawB(c, x + 195, y);
    drawE(c, x + 210, y);
    drawF(c, x + 225, y);
    drawO(c, x + 240, y);
    drawR(c, x + 255, y);
    drawE(c, x + 270, y);

    drawY(c, x + 300, y);
    drawO(c, x + 315, y);
    drawU(c, x + 330, y);

    drawG(c, x + 360, y);
    drawE(c, x + 375, y);
    drawT(c, x + 390, y);

    drawF(c, x + 420, y);
    drawR(c, x + 435, y);
    drawE(c, x + 450, y);
    drawE(c, x + 465, y);
    drawZ(c, x + 480, y);
    drawE(c, x + 495, y);
    drawD(c, x + 510, y);
}
