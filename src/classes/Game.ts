import Frame from './Frame'

class Game {
  canvas: HTMLCanvasElement
  frame = new Frame()

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas
  }

  update(time: number) {
    if (!this.frame.update(time)) return

    console.log('update')
  }

  draw(c: CanvasRenderingContext2D) {
    c.fillStyle = '#fff'
    c.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

export default Game
