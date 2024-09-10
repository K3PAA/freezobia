import { allowedKeys } from '../lib/constants'
import { AllowedKeysObject, AllowedKeysValues, Point } from '../lib/types'

class Input {
  keys: AllowedKeysObject
  mousePos: Point
  canvas: HTMLCanvasElement

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.keys = allowedKeys
    this.mousePos = {
      x: 0,
      y: 0,
    }

    this.canvas = canvas

    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
    window.addEventListener('mousemove', this.handleMouseMove.bind(this))
  }

  handleKeyDown(e: KeyboardEvent) {
    if (!(e.code in allowedKeys)) return
    this.keys[e.code as AllowedKeysValues] = true
  }

  handleKeyUp(e: KeyboardEvent) {
    if (!(e.code in allowedKeys)) return
    this.keys[e.code as AllowedKeysValues] = false
  }

  handleMouseMove(e: MouseEvent) {
    this.mousePos.x = e.clientX - (window.innerWidth - this.canvas.width) / 2
    this.mousePos.y = e.clientY - (window.innerHeight - this.canvas.height) / 2
  }
}

export default Input
