import { SpriteClassType } from '../lib/types'
import { rectangleCollision } from '../lib/utils'
import Frame from './Frame'
import Player from './Player'
import Sprite from './Sprite'

class Enemy extends Sprite {
  player: Player
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
    player,
  }: SpriteClassType & { player: Player }) {
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

    this.player = player
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
    this.goTowardsPlayer()
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

  goTowardsPlayer = () => {
    if(rectangleCollision(
      {
        position: {
          x: this.position.x,
          y: this.position.y,
        },
        width: this.width,
        height: this.height,
      },
      {
        position: {
          x: this.player.position.x + this.player.velocity.x,
          y: this.player.position.y,
        },
        width: this.player.width - Math.abs(this.player.velocity.x),
        height: this.player.height - Math.abs(this.player.velocity.y),
      })
    ) {
      this.player.health = 0
    }
  }
}

export default Enemy
