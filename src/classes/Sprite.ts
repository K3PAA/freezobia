import { Point, SpriteType } from "../lib/types"

class Sprite {
    position: Point
    image: HTMLImageElement
    scale: number
    columns: number
    maxFrames: number
    framesCurrent: number
    framesElapsed: number
    framesHold: number
    width: number
    height: number
    direction: number | undefined
    offSet: Point

    constructor ({ position, imgSrc, scale = 1, columns = 1, maxFrames = 1, framesCurrent = 0, width, height, offSet, direction }: SpriteType) {
        this.position = position
        this.image = new Image()
        this.image.src = imgSrc!
        this.scale = scale
        this.columns = columns
        this.maxFrames = maxFrames
        this.framesCurrent = framesCurrent
        this.framesElapsed = 0
        this.framesHold = 5
        this.width = width
        this.height = height
        this.direction = direction
        this.offSet = offSet
    }

  drawSprite = (c: CanvasRenderingContext2D) => {
    let frameWidth = this.image.width / this.columns
    let direction = this.direction || 1

    c.save()
    c.scale(direction, 1)
    c.drawImage(
      this.image,
      this.framesCurrent * frameWidth,
      0,
      this.image.width / this.columns,
      this.image.height,
      direction * (this.position.x + this.width / 2) -
        (frameWidth / 2) * this.scale +
        this.offSet.x,
      this.position.y - (this.image.height / 2) * this.scale + this.offSet.y,
      frameWidth * this.scale,
      this.image.height * this.scale
    )

    // Helping image offset
    c.fillStyle = 'rgba(0, 0, 0, 0.5)'
    // c.fillRect((direction * (this.position.x + this.width / 2) - frameWidth / 2 * this.scale), this.position.y - this.image.height / 2 * this.scale + this.offSet.y, frameWidth * this.scale, this.image.height * this.scale)

    c.restore()
  }

  animateFrames = () => {
    this.framesElapsed++
    if (this.framesCurrent < this.maxFrames - 1) {
      if (this.framesElapsed % this.framesHold === 0) {
        this.framesCurrent++
      }
    } else {
      this.framesCurrent = 0
    }
  }
}

export default Sprite
