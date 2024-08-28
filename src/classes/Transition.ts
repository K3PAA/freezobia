import { lerp } from '../lib/functions'
import Frame from './Frame'

class Transition {
  canvas: HTMLCanvasElement
  activeTransition: 'toTheRight' | null = null
  frame = new Frame({ fps: 60 })

  position = {
    x: 0,
    y: 0,
  }

  width: number

  animationFinish = false

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas
    this.width = canvas.width / 4
    this.position.x = -this.canvas.width / 2
  }

  start() {
    this.animationFinish = false
    this.activeTransition = 'toTheRight'
  }

  update(time: number) {
    if (!this.frame.timeElapsed(time)) return

    this.position.x = lerp(
      this.position.x,
      this.canvas.width + this.canvas.width / 4,
      0.03
    )

    this.width = lerp(this.width, this.canvas.width / 2, 0.07)

    if (this.position.x >= this.canvas.width) {
      this.animationFinish = true
      this.activeTransition = null
    }
  }

  toTheRight() {}

  draw(c: CanvasRenderingContext2D) {
    if (!this.activeTransition) return

    c.fillStyle = 'rgb(0,0,0)'

    c.fillRect(0 + this.position.x, 0, this.width, this.canvas.height)
  }
}

export default Transition
