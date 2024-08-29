import { Point, SpriteType } from '../lib/types'
import Sprite from './Sprite'

class Bullet extends Sprite {
  velocity: Point = { x: 0, y: 0 }
  speed = 10
  direction = 1
  angle: any

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
  }: SpriteType & { angle: any }) {
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
  }

  update = () => {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  draw = (c: CanvasRenderingContext2D) => {
    c.save()

    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    c.rotate(this.angle - Math.PI / 2)

    c.fillStyle = '#fff'
    c.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)

    c.restore()
  }
}

export default Bullet
