import { Point, ResourceTypes } from '../lib/types'
import { assets } from '../lib/constants'
import Frame from './Frame'

export class FirePlace {
  image = new Image()
  fire = new Image()
  frame = new Frame({ fps: 5, maxFrame: 5, currentFrame: 1 })

  tileSize: number
  position: Point
  width: number
  height: number

  constructor({
    tileSize,
    position,
    width,
    height,
  }: {
    tileSize: number
    position: Point
    width: number
    height: number
  }) {
    this.tileSize = tileSize
    this.position = position
    this.width = width
    this.height = height

    this.image.src = assets.fire_place
    this.fire.src = assets.fire
  }

  update(time: number) {
    if (this.frame.timeElapsed(time)) {
      this.frame.updateFrame(1)
    }
  }

  draw(c: CanvasRenderingContext2D, shift: Point) {
    this.drawFirePlace(c, shift)
    this.drawCircleRangeIndicator(c, shift)
    this.drawFire(c, shift)
  }

  drawFirePlace(c: CanvasRenderingContext2D, shift: Point) {
    c.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.position.x * this.tileSize + shift.x,
      this.position.y * this.tileSize + shift.y,
      this.width * this.tileSize,
      this.height * this.tileSize
    )
  }

  drawCircleRangeIndicator(c: CanvasRenderingContext2D, shift: Point) {
    c.beginPath()
    c.arc(
      this.position.x * this.tileSize + shift.x + 1.5 * this.tileSize,
      this.position.y * this.tileSize + shift.y + 1.5 * this.tileSize,
      250,
      0,
      2 * Math.PI
    )
    c.setLineDash([4, 16])
    c.stroke()
  }

  drawFire(c: CanvasRenderingContext2D, shift: Point) {
    c.drawImage(
      this.fire,
      16 * this.frame.currentFrame!,
      0,
      16,
      16,
      this.position.x * this.tileSize + shift.x + this.tileSize - 16,
      this.position.y * this.tileSize + shift.y + this.tileSize / 2,
      this.tileSize * 1.5,
      this.tileSize * 1.5
    )
  }
}

// export class Resource {
//   type: ResourceTypes

//   constructor({
//     tileSize,
//     position,
//     type,
//   }: {
//     tileSize: number
//     position: Point
//     type: ResourceTypes
//   }) {
//     super({ tileSize, position })

//     this.type = type
//   }
// }
