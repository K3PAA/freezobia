import { Box, Point, ResourceTypes } from '../lib/types'
import { assets, resourcesMapping } from '../lib/constants'
import Frame from './Frame'

export class Campfire {
  construction = new Image()
  fire = new Image()
  wood = new Image()

  frame = new Frame({ fps: 5, maxFrame: 4, currentFrame: 0 })

  tileSize: number
  position: Point
  width: number
  height: number
  radius = 250

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

    this.construction.src = assets.campfire.construction
    this.fire.src = assets.campfire.fire
    this.wood.src = assets.campfire.wood
  }

  update(time: number) {
    if (this.frame.timeElapsed(time)) {
      this.frame.updateFrame()
    }
  }

  draw(c: CanvasRenderingContext2D, shift: Point) {
    this.drawFirePlace(c, shift)
    this.drawCircleRangeIndicator(c, shift)
    this.drawWood(c, shift)
    this.drawFire(c, shift)
  }

  drawFirePlace(c: CanvasRenderingContext2D, shift: Point) {
    c.drawImage(
      this.construction,
      0,
      0,
      this.construction.width,
      this.construction.height,
      this.position.x + shift.x,
      this.position.y + shift.y,
      this.width,
      this.height
    )
  }

  drawCircleRangeIndicator(c: CanvasRenderingContext2D, shift: Point) {
    c.beginPath()
    c.arc(
      this.position.x + shift.x + 1.5 * this.tileSize,
      this.position.y + shift.y + 1.5 * this.tileSize,
      this.radius,
      0,
      2 * Math.PI
    )
    c.setLineDash([4, 16])
    c.stroke()
  }

  drawWood(c: CanvasRenderingContext2D, shift: Point) {
    c.drawImage(
      this.wood,
      0,
      0,
      16,
      16,
      this.position.x + shift.x + this.tileSize - 16,
      this.position.y + shift.y + this.tileSize / 2,
      this.tileSize * 1.5,
      this.tileSize * 1.5
    )
  }

  drawFire(c: CanvasRenderingContext2D, shift: Point) {
    c.drawImage(
      this.fire,
      16 * this.frame.currentFrame!,
      0,
      16,
      16,
      this.position.x + shift.x + this.tileSize - 16,
      this.position.y + shift.y + this.tileSize / 2,
      this.tileSize * 1.5,
      this.tileSize * 1.5
    )
  }
}

export class Resource {
  image = new Image()

  type: ResourceTypes
  tileSize: number
  position: Point
  mapping: Box

  constructor({
    tileSize,
    position,
    type,
  }: {
    tileSize: number
    position: Point
    type: ResourceTypes
  }) {
    this.tileSize = tileSize
    this.position = position
    this.type = type

    this.image.src = assets.resources
    this.mapping = resourcesMapping[type]
  }

  draw(c: CanvasRenderingContext2D, shift: Point) {
    c.drawImage(
      this.image,
      this.mapping.position.x,
      this.mapping.position.y,
      this.mapping.width,
      this.mapping.height,
      this.position.x + shift.x,
      this.position.y + shift.y,
      (this.mapping.width / 16) * this.tileSize,
      (this.mapping.height / 16) * this.tileSize
    )
  }
}
