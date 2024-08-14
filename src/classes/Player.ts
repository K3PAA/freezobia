import { AllowedKeysObject, Point } from '../lib/types'
import PlayerState from './PlayerState'

class Player extends PlayerState {
  canvas: HTMLCanvasElement

  width = 32
  height = 64
  position: Point = { x: 0, y: 0 }
  acceleration: Point = { x: 0.5, y: 0.1 }
  velocity: Point = { x: 0, y: 0 }

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    super()
    this.canvas = canvas

    this.position.x = this.canvas.width / 2
    this.position.y = this.canvas.height / 2 - this.height / 2
  }

  update(keys: AllowedKeysObject) {
    this.determineState(keys)
    this.updateState(keys)

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  draw(c: CanvasRenderingContext2D) {
    c.fillStyle = '#000'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

export default Player
