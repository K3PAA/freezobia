import { Point } from '../lib/types'
import Player from './Player'

class Grenade {
  player: Player
  position: Point
  velocity: Point
  gravity: number
  wind: number
  isThrown: boolean
  startPoint: Point
  endPoint: Point
  t: number
  flightDuration: number
  rotation: number
  grenadeHitBoxRadius: number
  removeGrenade: (grenade: Grenade) => void
  boom = false
  boomRange = 140

  constructor(player: Player, removeGrenade: (grenade: Grenade) => void) {
    this.player = player
    this.position = {
      x: this.player.position.x + this.player.width / 2,
      y: this.player.position.y + this.player.height / 2,
    }
    this.gravity = 0.5
    this.wind = 0
    this.isThrown = false

    this.velocity = { x: 0, y: 0 }
    this.startPoint = { x: 0, y: 0 }
    this.endPoint = { x: 0, y: 0 }
    this.t = 0
    this.flightDuration = 0.8
    this.rotation = -0.5
    this.grenadeHitBoxRadius = Math.max(30, 30) / 3

    this.removeGrenade = removeGrenade
  }

  updateGrenade(mousePos: Point) {
    const playerCenter = {
      x: this.player.position.x + this.player.width / 2,
      y: this.player.position.y + this.player.height / 2,
    }

    this.position = {
      x:
        this.player.direction === 1 ? playerCenter.x - 15 : playerCenter.x + 15,
      y: playerCenter.y,
    }
    if (!this.isThrown) {
      this.startPoint = {
        x: playerCenter.x,
        y: playerCenter.y,
      }

      this.endPoint = { x: mousePos.x, y: mousePos.y }

      const distance = Math.sqrt(
        Math.pow(this.endPoint.x - this.startPoint.x, 2) +
          Math.pow(this.endPoint.y - this.startPoint.y, 2)
      )

      this.flightDuration = Math.max(0.4, Math.min(0.8, distance / 300))

      this.t = 0
      this.isThrown = true
    }
    if (this.isThrown) {
      this.t += 0.02 / this.flightDuration

      if (this.t > 1) {
        this.t = 1
        this.boom = true
      }

      const startX = this.startPoint.x
      const startY = this.startPoint.y

      const controlX =
        this.startPoint.x +
        Math.abs(this.startPoint.x - this.endPoint.x) *
          0.5 *
          this.player.direction

      let controlY: number
      const yDistance = Math.abs(this.startPoint.y - this.endPoint.y)

      if (yDistance < 50) {
        controlY = this.startPoint.y - 150
      } else if (this.endPoint.y < this.startPoint.y) {
        controlY = this.startPoint.y - yDistance * 1.5
      } else {
        controlY = this.startPoint.y - yDistance * 0.5
      }

      const endX = this.endPoint.x
      const endY = this.endPoint.y

      this.position.x =
        (1 - this.t) * (1 - this.t) * startX +
        2 * (1 - this.t) * this.t * controlX +
        this.t * this.t * endX
      this.position.y =
        (1 - this.t) * (1 - this.t) * startY +
        2 * (1 - this.t) * this.t * controlY +
        this.t * this.t * endY

      this.rotation += 0.1
    }
  }

  drawGrenade(c: CanvasRenderingContext2D) {
    if (this.isThrown) {
      const yDistance = Math.abs(this.startPoint.y - this.endPoint.y)
      const controlY =
        yDistance < 50
          ? this.startPoint.y - 150
          : this.endPoint.y < this.startPoint.y
          ? this.startPoint.y - yDistance * 1.5
          : this.startPoint.y - yDistance * 0.5

      c.beginPath()
      c.moveTo(this.startPoint.x, this.startPoint.y)
      c.quadraticCurveTo(
        this.startPoint.x +
          Math.abs(this.startPoint.x - this.endPoint.x) *
            0.5 *
            this.player.direction,
        controlY,
        this.endPoint.x,
        this.endPoint.y
      )
      c.stroke()
    }

    c.fillStyle = 'green'
    c.strokeStyle = 'black'
    c.lineWidth = 2
    c.save()

    c.translate(this.position.x, this.position.y)
    c.rotate(this.rotation * this.player.direction)
    c.translate(-this.position.x, -this.position.y)

    c.beginPath()

    c.rect(this.position.x - 6, this.position.y, 12, 20)

    // draw boom range
    c.fillStyle = 'red'
    c.fillRect(
      this.position.x - this.boomRange / 2,
      this.position.y - this.boomRange / 2,
      this.boomRange,
      this.boomRange
    )

    c.setLineDash([])
    c.lineWidth = 2.5

    c.moveTo(this.position.x - 3, this.position.y - 10)
    c.lineTo(this.position.x + 3, this.position.y - 10)
    c.lineTo(this.position.x + 4, this.position.y)
    c.lineTo(this.position.x - 4, this.position.y)
    c.closePath()

    c.fill()
    c.stroke()

    c.restore()
  }
}

export default Grenade
