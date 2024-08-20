import { Point } from '../lib/types'
import { assets } from '../lib/constants'

class Tile {
  image = new Image()
  fire = new Image()

  tileSize: number
  type: string
  position: Point
  width: number
  height: number

  constructor({
    tileSize,
    type,
    position,
    width,
    height,
  }: {
    tileSize: number
    type: string
    position: Point
    width: number
    height: number
  }) {
    this.tileSize = tileSize
    this.type = type
    this.position = position

    console.log(this.position.x, position)

    this.width = width
    this.height = height

    this.image.src = type === 'fire_place' ? assets.fire_place : ''
    this.fire.src = type === 'fire_place' ? assets.fire : ''
  }

  draw(c: CanvasRenderingContext2D, shift: Point) {
    if (this.image.src) {
      c.drawImage(
        this.image,
        0,
        0,
        this.image.width,
        this.image.height,
        this.position.x + shift.x,
        this.position.y + shift.y,
        this.width,
        this.height
      )
    }

    if (this.fire.src) {
      c.beginPath()
      c.arc(
        this.position.x + shift.x + 1.5 * this.tileSize,
        this.position.y + shift.y + 1.5 * this.tileSize,
        250,
        0,
        2 * Math.PI
      )
      c.stroke()

      c.drawImage(
        this.fire,
        16,
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
}

export default Tile
