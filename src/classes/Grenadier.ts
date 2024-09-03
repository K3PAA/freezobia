import { Point } from '../lib/types'
import Frame from './Frame'
import Grenade from './Grenade'
import Player from './Player'

class Grenadier {
  canvas: HTMLCanvasElement
  player: Player
  grenades: Grenade[]
  grenadesAmount: number
  grenadeFrame = new Frame({ fps: 1, currentFrame: 0, maxFrame: 3 })

  constructor(player: Player, canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.player = player
    this.grenades = []
    this.grenadesAmount = 10
  }

  updateBulletOffset(axis: 'x' | 'y', velocity: number) {
    this.grenades.forEach((grenade) => {
      grenade.endPoint[axis] -= velocity
    })
  }

  update = (mousePos: Point, time: number) => {
    this.grenades.forEach((grenade) => {
      if (grenade.boom) {
        this.removeGrenade(grenade)
      }
    })

    if (
      this.grenadeFrame.currentFrame > 0 &&
      this.grenadeFrame.timeElapsed(time)
    ) {
      this.grenadeFrame.updateFrame()
    }

    this.grenades.map((grenade) => grenade.updateGrenade(mousePos))
  }

  draw = (c: CanvasRenderingContext2D) => {
    this.grenades.map((grenade) => grenade.drawGrenade(c))
  }

  generateGrenade = () => {
    const grenade = new Grenade(this.player, this.removeGrenade)
    this.grenades.push(grenade)
  }

  attack = async () => {
    if (this.grenadesAmount > 0) {
      if (this.grenadeFrame.currentFrame === 0) {
        this.generateGrenade()
        this.grenadesAmount -= 1
        await this.grenadeFrame.startCounting()
      }
    }
  }

  removeGrenade = (grenade: Grenade) => {
    this.grenades = this.grenades.filter((g) => g !== grenade)
  }
}

export default Grenadier
