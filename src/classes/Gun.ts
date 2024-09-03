import { Point } from '../lib/types'
import Sprite from './Sprite'
import gunImg from '../assets/compressed/player/gun.webp'
import Bullet from './Bullet'
import { lerp } from '../lib/functions'
import Frame from './Frame'
import Player from './Player'

class Gun extends Sprite {
  canvas: HTMLCanvasElement
  playerPosition: Point
  mouse: Point
  gunAngle: number
  targetAngle: number
  bullets: Bullet[]
  bulletsAmount: number
  attackFrame: Frame
  reloadFrame: Frame
  direction: number
  player: Player
  isShooting: boolean

  constructor(player: Player, canvas: HTMLCanvasElement) {
    super({
      canvas,
      position: { x: player.position.x, y: player.position.y },
      imgSrc: gunImg,
      scale: 3,
      offSet: { x: 0, y: 5 },
      width: 10,
      height: 20,
    })

    this.player = player
    this.playerPosition = player.position
    this.mouse = { x: 0, y: 0 }
    this.gunAngle = 0
    this.targetAngle = 0
    this.bullets = []
    this.bulletsAmount = 13
    this.isShooting = false
    this.attackFrame = new Frame({ fps: 6, currentFrame: 0, maxFrame: 2 })
    this.reloadFrame = new Frame({ fps: 1, currentFrame: 0, maxFrame: 2 })
    this.direction = this.player.direction
    this.canvas = canvas
  }

  updateBulletOffset(axis: 'x' | 'y', velocity: number) {
    this.bullets.forEach((bullet) => {
      bullet.position[axis] -= velocity
    })
  }

  updateGun(mousePos: Point, time: number) {
    if (
      this.attackFrame.currentFrame > 0 &&
      this.attackFrame.timeElapsed(time)
    ) {
      this.attackFrame.updateFrame()
    }

    if (
      this.reloadFrame.currentFrame > 0 &&
      this.reloadFrame.timeElapsed(time)
    ) {
      this.reloadFrame.updateFrame()
    }

    this.mouse = mousePos

    this.targetAngle = Math.atan2(
      this.mouse.y - (this.playerPosition.y + this.height / 2),
      this.mouse.x - (this.playerPosition.x + this.width / 2)
    )

    const lerpSpeed = 0.1
    this.gunAngle = lerp(this.gunAngle, this.targetAngle, lerpSpeed)
  }

  drawGun(c: CanvasRenderingContext2D) {
    c.save()
    c.translate(
      this.playerPosition.x + this.player.width / 2,
      this.playerPosition.y + this.player.height / 2
    )
    c.rotate(this.gunAngle)
    c.scale(-1, this.player.direction)

    this.position = {
      x: -this.width,
      y: -this.height / 2,
    }

    this.drawSprite(c)
    c.restore()

    c.beginPath()
    c.moveTo(
      this.player.position.x + this.player.width / 2,
      this.player.position.y + this.player.height / 2
    )

    c.arc(
      this.player.position.x + this.player.width / 2,
      this.player.position.y + this.player.height / 2,
      200,
      this.gunAngle - 0.15,
      this.gunAngle + 0.15
    )
    // }
    c.fillStyle = 'rgb(0, 0, 0, 0.15)'
    c.fill()

    this.updateBullets(c, this.player.position)
  }

  async attack() {
    if (this.bulletsAmount > 0) {
      if (this.attackFrame.currentFrame === 0) {
        const bullet = new Bullet({
          position: {
            x: this.playerPosition.x + this.width / 2,
            y: this.playerPosition.y + this.height / 2,
          },
          angle: this.gunAngle,
          removeBullet: this.removeBullet.bind(this),
        })
        this.gunAngle -= this.player.direction / 5
        this.bulletsAmount -= 1
        this.bullets.push(bullet)
        await this.attackFrame.startCounting()
      }
    } else if (this.reloadFrame.currentFrame === 0) {
      this.player.reloadAnimation = true
      await this.reloadFrame.startCounting()
      this.reload()
    }
  }

  reload() {
    this.player.reloadAnimation = false
    this.bulletsAmount = 13
  }

  updateBullets(c: CanvasRenderingContext2D, playerPosition: Point) {
    this.bullets = this.bullets.filter((bullet) => {
      bullet.update()
      bullet.draw(c)

      const distanceX = Math.abs(bullet.position.x - playerPosition.x)
      const distanceY = Math.abs(bullet.position.y - playerPosition.y)

      return distanceX <= 750 && distanceY <= 750
    })
  }

  removeBullet(index: number) {
    this.bullets.splice(index, 1)
  }
}

export default Gun
