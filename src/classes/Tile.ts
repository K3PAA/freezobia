import { Point } from '../lib/types'
import { assets } from '../lib/constants'

class Tile {
  image = new Image()
  fire = new Image()
  frame = 1
  count = 0

  tileSize: number
  type: string
  position: Point
  width?: number
  height?: number

  mapping?: {
    position: Point
    width: number
    height: number
  }

  constructor({
    tileSize,
    type,
    position,
    width,
    height,
    mapping,
    src,
  }: {
    tileSize: number
    type: string
    position: Point
    width?: number
    height?: number
    src: string
    mapping?: {
      position: Point
      width: number
      height: number
    }
  }) {
    this.tileSize = tileSize
    this.type = type
    this.position = position

    this.width = width
    this.height = height
    this.mapping = mapping

    this.image.src = src
    this.fire.src = type === 'fire_place' ? assets.fire : ''
  }

  update() {
    this.count++

    if (this.count > 5) {
      this.count = 0
      this.frame++

      if (this.frame === 5) this.frame = 1
    }
  }

  draw(c: CanvasRenderingContext2D, shift: Point) {
    if (this.image.src) {
      c.drawImage(
        this.image,
        this.mapping ? this.mapping.position.x * 16 : 0,
        this.mapping ? this.mapping.position.y * 16 : 0,
        this.mapping ? this.mapping.width * 16 : this.image.width,
        this.mapping ? this.mapping.height * 16 : this.image.height,
        this.position.x * this.tileSize + shift.x,
        this.position.y * this.tileSize + shift.y,
        this.mapping
          ? this.mapping.width * this.tileSize
          : this.width! * this.tileSize,
        this.mapping
          ? this.mapping.height * this.tileSize
          : this.height! * this.tileSize
      )
    }

    if (this.type === 'fire_place') {
      c.beginPath()
      c.arc(
        this.position.x * this.tileSize + shift.x + 1.5 * this.tileSize,
        this.position.y * this.tileSize + shift.y + 1.5 * this.tileSize,
        250,
        0,
        2 * Math.PI
      )
      c.stroke()

      c.drawImage(
        this.fire,
        16 * this.frame,
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
}

export default Tile
