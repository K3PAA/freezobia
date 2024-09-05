import { Point } from '../lib/types'

class Bullet {
  position: Point
  width: number
  height: number
  velocity: Point = { x: 0, y: 0 }
  speed = 10
  direction = 1
  angle: number
  centerPoint: Point
  bulletHitBoxRadius: number
  damage: number

  removeBullet: (index: number) => void

  constructor({
    position,
    angle,
    removeBullet,
    damage,
  }: any & {
    angle: any
    removeBullet: (index: number) => void
    damage: number
  }) {
    this.position = position
    this.width = 4
    this.height = 8
    this.angle = angle
    this.velocity.x = Math.cos(this.angle) * this.speed
    this.velocity.y = Math.sin(this.angle) * this.speed

    this.bulletHitBoxRadius = Math.max(this.width, this.height) / 3
    this.damage = damage

    this.centerPoint = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }
    this.removeBullet = removeBullet
  }

  update = () => {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.centerPoint = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }
  }

  draw = (c: CanvasRenderingContext2D) => {
    c.beginPath()
    c.arc(
      this.centerPoint.x,
      this.centerPoint.y,
      this.bulletHitBoxRadius,
      0,
      2 * Math.PI
    )
    c.fillStyle = 'rgba(255, 0, 0)'
    c.fill()
  }
}

export default Bullet
