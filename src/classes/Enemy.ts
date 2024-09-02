import { SpriteClassType } from '../lib/types'
import Frame from './Frame'
import Sprite from './Sprite'

class Enemy extends Sprite {
  frame = new Frame({ fps: 15, currentFrame: 0, maxFrame: 10 })
  attackFrame = new Frame({ fps: 0.5, currentFrame: 0, maxFrame: 2 })

  constructor({
    canvas,
    position,
    imgSrc,
    scale = 3,
    columns = 6,
    maxFrames = 6,
    width,
    height,
    offSet,
    direction,
  }: SpriteClassType) {
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
      direction,
    })
  }

  update = ({ time }: { time: number }) => {
    if (this.frame.timeElapsed(time)) {
      this.attack()
      this.frame.updateFrame()
      this.animateFrames()
    }
    if (
      this.attackFrame.currentFrame > 0 &&
      this.attackFrame.timeElapsed(time)
    ) {
      this.attackFrame.updateFrame()
    }
  }

  draw = (c: CanvasRenderingContext2D) => {
    c.fillStyle = '#fff'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    this.drawSprite(c)
  }

  attack = async () => {
    if (this.attackFrame.currentFrame === 0) {
      await this.attackFrame.startCounting()
    }
  }
}

export default Enemy
