import { interpolateArc } from '../lib/functions'
import { Point } from '../lib/types'
import Player from './Player'

class Grenade {
  player: Player
  position: Point
  velocity: Point
  gravity: number
  wind: number
  isThrown: boolean
  mousePosition: Point
  t: number

  constructor(player: Player) {
    this.player = player
    this.position = {
      x: this.player.position.x + this.player.width / 2,
      y: this.player.position.y + this.player.height / 2,
    }
    this.gravity = 0.5
    this.wind = 0
    this.isThrown = false

    this.velocity = { x: 0, y: 0 }
    this.mousePosition = { x: 0, y: 0 }
    this.t = 0
  }

  updateGrenade(mousePos: Point) {
    this.mousePosition = mousePos

    if (!this.isThrown) {
      this.position.x = this.player.position.x + this.player.width / 2
      this.position.y = this.player.position.y + this.player.height / 2
    }

    if (this.isThrown) {
      this.t += 0.02 // Szybkość ruchu (możesz dostosować tę wartość)

      if (this.t > 1) {
        this.t = 1
        this.player.generateGrenade()
        this.isThrown = false // Koniec lotu
      }

      // Parametryzacja krzywej kwadratowej
      const startX = this.player.position.x
      const startY = this.player.position.y
      const controlX =
        this.player.position.x +
        Math.abs(this.player.position.x - this.mousePosition.x) *
          this.player.direction
      const controlY = this.player.position.y - 250
      const endX = this.mousePosition.x
      const endY = this.mousePosition.y

      // Wzory dla krzywej kwadratowej Béziera
      this.position.x =
        (1 - this.t) * (1 - this.t) * startX +
        2 * (1 - this.t) * this.t * controlX +
        this.t * this.t * endX
      this.position.y =
        (1 - this.t) * (1 - this.t) * startY +
        2 * (1 - this.t) * this.t * controlY +
        this.t * this.t * endY
    }
  }

  drawGrenade(c: CanvasRenderingContext2D) {
    let positionBetween = {
      x:
        this.player.position.x +
        Math.abs(this.player.position.x - this.mousePosition.x) *
          this.player.direction,
      y:
        Math.abs(this.mousePosition.y - this.player.position.y) *
        this.player.direction,
    }
    if (this.isThrown) {
      c.beginPath()
      c.moveTo(
        this.player.position.x + this.player.width / 2,
        this.player.position.y + this.player.height / 2
      )
      c.quadraticCurveTo(
        positionBetween.x,
        this.player.position.y - 250,
        this.mousePosition.x,
        this.mousePosition.y
      )
      c.stroke()
    }
    c.fillStyle = 'green'
    c.beginPath()
    c.arc(this.position.x, this.position.y, 25, 0, Math.PI * 2)
    c.fill()
  }
}

export default Grenade
