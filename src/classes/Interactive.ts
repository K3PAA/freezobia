import { Point, ResourceTypes } from '../lib/types'
import { assets, RESOURCE_SIZE, resourcesMapping } from '../lib/constants'
import Frame from './Frame'

export class Interactive {
  shift: Point = { x: 0, y: 0 }
  tileSize: number
  position: Point

  constructor({ tileSize, position }: { tileSize: number; position: Point }) {
    this.tileSize = tileSize
    this.position = position
  }

  setShift(shift: Point) {
    this.shift = shift
  }
}

export class Campfire extends Interactive {
  construction = new Image()
  fire = new Image()
  wood = new Image()
  active = true

  frame = new Frame({ fps: 5, maxFrame: 4, currentFrame: 0 })

  width: number
  height: number
  radius = 250

  shift: Point = { x: 0, y: 0 }
  center: Point = { x: 0, y: 0 }

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
    super({ tileSize, position })
    this.width = width
    this.height = height

    this.construction.src = assets.campfire.construction
    this.fire.src = assets.campfire.fire
    this.wood.src = assets.campfire.wood
    this.center = {
      x: this.position.x + 1.5 * this.tileSize,
      y: this.position.y + 1.5 * this.tileSize,
    }
  }

  update({ time }: { time: number }) {
    if (this.frame.timeElapsed(time)) {
      this.frame.updateFrame()
    }
  }

  draw(c: CanvasRenderingContext2D) {
    this.drawFirePlace(c)
    if (this.active) {
      this.drawActiveIndicator(c)
    }
    this.drawCircleRangeIndicator(c)
    this.drawWood(c)
    this.drawFire(c)
  }

  drawActiveIndicator(c: CanvasRenderingContext2D) {
    c.beginPath()
    c.arc(
      this.center.x + this.shift.x,
      this.center.y + this.shift.y,
      this.radius,
      0,
      2 * Math.PI
    )
    c.fillStyle = 'rgba(0, 255, 255, 0.05)'
    c.fill()
  }

  drawFirePlace(c: CanvasRenderingContext2D) {
    c.drawImage(
      this.construction,
      0,
      0,
      this.construction.width,
      this.construction.height,
      this.position.x + this.shift.x,
      this.position.y + this.shift.y,
      this.width,
      this.height
    )
  }

  drawCircleRangeIndicator(c: CanvasRenderingContext2D) {
    c.beginPath()
    c.arc(
      this.center.x + this.shift.x,
      this.center.y + this.shift.y,
      this.radius,
      0,
      2 * Math.PI
    )
    c.setLineDash([4, 16])
    c.stroke()
  }

  drawWood(c: CanvasRenderingContext2D) {
    c.drawImage(
      this.wood,
      0,
      0,
      16,
      16,
      this.position.x + this.shift.x + this.tileSize - 16,
      this.position.y + this.shift.y + this.tileSize / 2,
      this.tileSize * 1.5,
      this.tileSize * 1.5
    )
  }

  drawFire(c: CanvasRenderingContext2D) {
    c.drawImage(
      this.fire,
      16 * this.frame.currentFrame!,
      0,
      16,
      16,
      this.position.x + this.shift.x + this.tileSize - 16,
      this.position.y + this.shift.y + this.tileSize / 2,
      this.tileSize * 1.5,
      this.tileSize * 1.5
    )
  }
}

export class Resource extends Interactive {
  image = new Image()

  type: ResourceTypes
  mapping: (typeof resourcesMapping)[ResourceTypes]

  constructor({
    tileSize,
    position,
    type,
  }: {
    tileSize: number
    position: Point
    type: ResourceTypes
  }) {
    super({ tileSize, position })
    this.tileSize = tileSize
    this.position = position
    this.type = type

    this.image.src = assets.resources
    this.mapping = resourcesMapping[type]
  }

  draw(c: CanvasRenderingContext2D) {
    this.drawResource(c)
    this.drawResource(c)
  }

  drawResource(c: CanvasRenderingContext2D) {
    c.drawImage(
      this.image,
      this.mapping.position.x,
      this.mapping.position.y,
      this.mapping.width,
      this.mapping.height,
      this.position.x + this.shift.x,
      this.position.y + this.shift.y,
      (this.mapping.width / RESOURCE_SIZE) * this.tileSize,
      (this.mapping.height / RESOURCE_SIZE) * this.tileSize
    )
  }

  drawCollisionBox(c: CanvasRenderingContext2D) {
    c.fillStyle = 'rgba(255, 0, 0, 0.2)'
    c.fillRect(
      this.position.x + this.mapping.box.x + this.shift.x,
      this.position.y + this.mapping.box.y + this.shift.y,
      this.mapping.box.width,
      this.mapping.box.height
    )
  }
}
