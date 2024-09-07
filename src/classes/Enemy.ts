import { Point, SpriteClassType } from '../lib/types'
import { rectangleCollision } from '../lib/utils'
import Background from './Background'
import Frame from './Frame'
import Player from './Player'
import Sprite from './Sprite'

class Enemy extends Sprite {
  frame = new Frame({ fps: 15, currentFrame: 0, maxFrame: 10 })
  attackFrame = new Frame({ fps: 0.5, currentFrame: 0, maxFrame: 2 })
  moveFrame = new Frame({ fps: 4, currentFrame: 0, maxFrame: 8 })
  health: number
  fullHealth: number
  isDead: boolean
  speed: number
  collision: boolean
  removeEnemy: (enemy: Enemy) => void
  background: Background
  directionInCollision?: Point
  score = 1

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
    removeEnemy,
    speed,
    health,
    background,
    score,
  }: SpriteClassType & {
    removeEnemy: (enemy: Enemy) => void
    speed: number
    health: number
    background: Background
    score: number
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

    this.score = score
    this.fullHealth = health
    this.health = health
    this.isDead = false
    this.speed = speed
    this.removeEnemy = removeEnemy
    this.collision = false
    this.background = background
  }

  update = ({ time, player }: { time: number; player: Player }) => {
    if (this.health <= 0) {
      this.isDead = true
      player.score += this.score
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
    this.goTowardsPlayer({ player })
  }

  updateEnemiesOffset(direction: 'x' | 'y', value: number) {
    this.position[direction] -= value
  }

  draw = (c: CanvasRenderingContext2D) => {
    // c.fillStyle = '#fff'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

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

  goTowardsPlayer = ({ player }: { player: Player }) => {
    const directions = [
      { x: 0, y: -this.speed },
      { x: 0, y: this.speed },
      { x: -this.speed, y: 0 },
      { x: this.speed, y: 0 },
    ]

    let shortestDistance = Infinity
    let bestDirection = { x: 0, y: 1 }
    let hasCollision = false

    directions.forEach((direction) => {
      const newPos = {
        x: this.position.x + direction.x,
        y: this.position.y + direction.y,
      }

      const distanceToPlayer = Math.hypot(
        newPos.x - player.position.x - player.width / 2,
        newPos.y - player.position.y - player.height / 2
      )

      if (!this.background.checkTileCollision(newPos, this)) {
        if (distanceToPlayer < shortestDistance) {
          shortestDistance = distanceToPlayer
          bestDirection = direction
        }
      } else {
        hasCollision = true
      }
    })
    if (hasCollision) {
      if (this.directionInCollision) {
        if (
          !this.background.checkTileCollision(
            {
              x: this.position.x + this.directionInCollision.x,
              y: this.position.y + this.directionInCollision.y,
            },
            this
          )
        ) {
          bestDirection = this.directionInCollision
        }
      }
      this.directionInCollision = bestDirection
    } else {
      this.directionInCollision = undefined
    }

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
          position: player.position,
          width: player.width,
          height: player.height,
        }
      )
    ) {
      player.isDead = true
    }
  }
}

export default Enemy
