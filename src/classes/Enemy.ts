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
  isDead: boolean
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
  }: SpriteClassType & {
    player: Player
    removeEnemy: (enemy: Enemy) => void
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

    this.player = player
    this.health = 1
    this.isDead = false
    this.removeEnemy = removeEnemy
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
  }

  attack = async () => {
    if (this.attackFrame.currentFrame === 0) {
      await this.attackFrame.startCounting()
    }
  }

  goTowardsPlayer = () => {
    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ]

    let shortestDistance = Infinity
    let bestDirection = { x: 0, y: 0 }

    directions.forEach((direction) => {
      const newPos = {
        x: this.position.x + direction.x,
        y: this.position.y + direction.y,
      }

      const distanceToPlayer = Math.hypot(
        newPos.x - this.player.position.x,
        newPos.y - this.player.position.y
      )

      // Sprawdź, czy nowa pozycja nie koliduje z przeszkodą
      // if (!this.checkCollision(newPos)) {
      if (distanceToPlayer < shortestDistance) {
        shortestDistance = distanceToPlayer
        bestDirection = direction
      }
      // }
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

  // Funkcja pomocnicza do sprawdzania kolizji z przeszkodami
  // checkCollision = (newPos: Point): boolean => {
  //   // Tutaj dodaj logikę sprawdzania kolizji z przeszkodami.
  //   // Można iterować przez listę przeszkód i sprawdzić, czy nowa pozycja wroga koliduje z którąkolwiek z nich.
  //   // Poniższy kod to przykład, który należy dostosować do konkretnej implementacji:
  //   for (let obstacle of this.canvas.obstacles) {
  //     if (
  //       rectangleCollision(
  //         {
  //           position: newPos,
  //           width: this.width,
  //           height: this.height,
  //         },
  //         obstacle
  //       )
  //     ) {
  //       return true
  //     }
  //   }
  //   return false
  // }
}

export default Enemy
