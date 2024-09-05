import { SpriteClassType } from '../lib/types'
import { rectangleCollision } from '../lib/utils'
import Frame from './Frame'
import Player from './Player'
import Sprite from './Sprite'

class Enemy extends Sprite {
  player: Player
  frame = new Frame({ fps: 15, currentFrame: 0, maxFrame: 10 })
  attackFrame = new Frame({ fps: 0.5, currentFrame: 0, maxFrame: 2 })
  health: number
  fullHealth: number
  isDead: boolean
  speed: number
  collision: boolean
  removeEnemy: (enemy: Enemy) => void

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
    removeEnemy,
    speed,
    health,
  }: SpriteClassType & {
    player: Player
    removeEnemy: (enemy: Enemy) => void
    speed: number
    health: number
  }) {
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

    this.fullHealth = health
    this.player = player
    this.health = health
    this.isDead = false
    this.speed = speed
    this.removeEnemy = removeEnemy
    this.collision = false
  }

  update = ({ time, player }: { time: number; player: Player }) => {
    if (this.health <= 0) {
      this.isDead = true
      player.score++
      this.removeEnemy(this)
    }
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

  updateEnemiesOffset(direction: 'x' | 'y', value: number) {
    this.position[direction] -= value
  }

  draw = (c: CanvasRenderingContext2D) => {
    c.fillStyle = '#fff'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    this.drawSprite(c)
    if (this.fullHealth > 1) this.drawHealthBar(c)
  }

  drawHealthBar(c: CanvasRenderingContext2D) {
    const ratio = this.health / this.fullHealth

    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, 10)
    c.fillStyle = 'green'
    c.fillRect(this.position.x, this.position.y, this.width * ratio, 10)
  }

  attack = async () => {
    if (this.attackFrame.currentFrame === 0) {
      await this.attackFrame.startCounting()
    }
  }

  goTowardsPlayer = () => {
    const directions = [
      { x: 0, y: -this.speed },
      { x: 0, y: this.speed },
      { x: -this.speed, y: 0 },
      { x: this.speed, y: 0 },
    ]

    let shortestDistance = Infinity
    let bestDirection = { x: 0, y: 0 }

    directions.forEach((direction) => {
      const newPos = {
        x: this.position.x + this.width / 2 + direction.x,
        y: this.position.y + this.height / 2 + direction.y,
      }

      const distanceToPlayer = Math.hypot(
        newPos.x - this.player.centerPoint.x,
        newPos.y - this.player.centerPoint.y
      )

      if (!this.collision) {
        if (distanceToPlayer < shortestDistance) {
          shortestDistance = distanceToPlayer
          bestDirection = direction
        }
      } else {
        this.collision = false
      }
    })

    this.position.x += bestDirection.x
    this.position.y += bestDirection.y

    if (
      rectangleCollision(
        {
          position: this.position,
          width: this.width,
          height: this.height,
        },
        {
          position: this.player.position,
          width: this.player.width,
          height: this.player.height,
        }
      )
    ) {
      this.player.isDead = true
    }
  }
}

export default Enemy
