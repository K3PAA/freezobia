import { lerp } from '../lib/functions'
import Frame from './Frame'

class Transition {
  canvas: HTMLCanvasElement

  position = {
    x: 0,
    y: 0,
  }

  width: number
  isPlaying = false
  transitionEnded: boolean = false

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas
    this.width = canvas.width / 4
    this.position.x = -this.canvas.width / 2
  }

  start() {
    this.isPlaying = true
  }

  update({ time, isMenu }: { time: number; isMenu: boolean }) {
    if (this.isPlaying) {
      this.position.x += 2 * time
    }

    if (this.position.x >= this.canvas.width + this.canvas.width / 2) {
      this.isPlaying = false
      this.position.x = 0
      this.transitionEnded = true
    }
  }

  draw(c: CanvasRenderingContext2D) {
    if (this.transitionEnded) return

    c.fillStyle = 'black'
    c.fillRect(this.position.x, this.position.y, this.width, this.canvas.height)
  }
}

export default Transition
