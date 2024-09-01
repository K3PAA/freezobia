import { Point, SpriteClassType } from '../lib/types'
import Sprite from './Sprite'

class Bullet extends Sprite {
  velocity: Point = { x: 0, y: 0 }
  speed = 10
  direction = 1
  angle: number
  centerPoint: Point
  bulletHitBoxRadius: number
  removeBullet: (index: number) => void

  constructor({
    canvas,
    position,
    imgSrc,
    scale,
    columns = 8,
    maxFrames = 8,
    width,
    height,
    offSet,
    angle,
    removeBullet,
  }: SpriteClassType & { angle: any, removeBullet: (index: number) => void }) {
    super({
      canvas,
      position,
      imgSrc,
      scale,
      columns,
      maxFrames,
      width,
      height,
      offSet,
    })

    this.angle = angle
    this.velocity.x = Math.cos(this.angle) * this.speed
    this.velocity.y = Math.sin(this.angle) * this.speed

    this.bulletHitBoxRadius = Math.max(this.width, this.height) / 3

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
