import { AllowedKeysObject, Box, Point } from '../lib/types'
import PlayerState from './PlayerState'

class Player extends PlayerState {
  canvas: HTMLCanvasElement
  centerBox: Box

  width = 32
  height = 64
  position: Point = { x: 0, y: 0 }
  acceleration: Point = { x: 0.5, y: 0.1 }
  velocity: Point = { x: 0, y: 0 }

  collision = {
    left: false,
    right: false,
    top: false,
    bottom: false,
  }

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    super()
    this.canvas = canvas

    this.position.x = this.canvas.width / 2 - this.width / 2
    this.position.y = this.canvas.height / 2 - this.height / 2

    this.centerBox = {
      position: {
        x: this.canvas.width / 2 - this.canvas.width / 4 / 2,
        y: this.canvas.height / 4,
      },
      width: this.canvas.width / 4,
      height: this.canvas.height / 2,
    }
  }

  update({ keys, offset }: { keys: AllowedKeysObject; offset: Point }) {
    this.determineState(keys)
    this.updateState(keys)

    this.inCenterBox()

    console.log(this.collision)

    if (!this.collision.left && !this.collision.right) {
      this.position.x += this.velocity.x
    } else {
      if (
        (this.collision.left && this.velocity.x > 0) ||
        (this.collision.right && this.velocity.x < 0)
      ) {
        this.position.x += this.velocity.x
      }
      offset.x += this.velocity.x
    }

    if (!this.collision.top && !this.collision.bottom) {
      this.position.y += this.velocity.y
    } else {
      if (
        (this.collision.top && this.velocity.y > 0) ||
        (this.collision.bottom && this.velocity.y < 0)
      ) {
        this.position.y += this.velocity.y
      }
      offset.y += this.velocity.y
    }
  }

  inCenterBox() {
    if (this.position.x < this.centerBox.position.x) {
      this.collision.left = true
    } else if (
      this.position.x + this.width >
      this.centerBox.position.x + this.centerBox.width
    ) {
      this.collision.right = true
    } else {
      this.collision.left = false
      this.collision.right = false
    }

    if (this.position.y < this.centerBox.position.y) {
      this.collision.top = true
    } else if (
      this.position.y + this.height >
      this.centerBox.position.y + this.centerBox.height
    ) {
      this.collision.bottom = true
    } else {
      this.collision.top = false
      this.collision.bottom = false
    }
  }

  draw(c: CanvasRenderingContext2D) {
    c.fillStyle = '#000'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    this.drawCenterBox(c)
  }

  drawCenterBox(c: CanvasRenderingContext2D) {
    c.fillStyle = 'rgba(155, 155, 0, 0.2)'
    c.fillRect(
      this.centerBox.position.x,
      this.centerBox.position.y,
      this.centerBox.width,
      this.centerBox.height
    )
  }
}

export default Player
