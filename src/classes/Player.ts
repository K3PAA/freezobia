import { Point } from '../lib/types'

class Player {
  canvas: HTMLCanvasElement

  width = 32
  height = 64
  position: Point = { x: 0, y: 0 }
  velocity: Point = { x: 0, y: 0 }

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas

    this.position.x = this.canvas.width / 2
    this.position.y = this.canvas.height / 2 - this.height / 2
  }

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  draw(c: CanvasRenderingContext2D) {
    c.fillStyle = '#000'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

export default Player
