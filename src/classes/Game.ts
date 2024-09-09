import Background from './Background'
import Player from './Player'
import Input from './Input'
import playerImg from '../assets/compressed/player/char_animation.webp'
import enemyImg from '../assets/compressed/enemy/slime_run.webp'
import Frame from './Frame'
import Transition from './Transition'
import Collision from './Collision'
import Enemy from './Enemy'
import { FreezobiaWord } from '../lib/letters'
import { randomCanvasSide } from '../lib/functions'

class Game {
  canvas: HTMLCanvasElement
  background: Background
  player: Player
  enemies: Enemy[]
  input: Input
  transition: Transition
  collision: Collision

  frame = new Frame({ fps: 2 })
  enemySpawnFrame = new Frame({ fps: 1 })
  miniBossSpawnFrame = new Frame({ fps: 0.1 })
  showTextInfo: boolean = false
  score = 0

  isInMenu = true
  startGame = false

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas

    this.transition = new Transition({ canvas: this.canvas })
    this.background = new Background({ canvas })
    this.player = new Player({
      canvas,
      position: {
        x: 0,
        y: 0,
      },
      width: 2 * 8 * 3,
      height: 3 * 8 * 3,
      offSet: {
        x: 0,
        y: 32,
      },
      scale: 3,
      imgSrc: playerImg,
    })
    this.enemies = []
    this.input = new Input()
    this.collision = new Collision()
  }

  
  update(time: number) {
    if (this.frame.timeElapsed(time)) {
      this.showTextInfo = !this.showTextInfo
    }

    if (this.enemySpawnFrame.timeElapsed(time) && this.startGame) {
      const position = randomCanvasSide(this.canvas)
      const enemy = new Enemy({
        canvas: this.canvas,
        position: position,
        width: 14 * 3,
        height: 11 * 3,
        offSet: {
          x: 4,
          y: 12,
        },
        score: 1,
        scale: 3,
        imgSrc: enemyImg,
        player: this.player,
        removeEnemy: this.removeEnemy,
        speed: 1,
        health: 1,
        background: this.background
      })
      this.enemies.push(enemy)
  }

    if (this.miniBossSpawnFrame.timeElapsed(time) && this.startGame) {
      const position = randomCanvasSide(this.canvas)
      const enemy = new Enemy({
        canvas: this.canvas,
        position: position,
        width: 14 * 6,
        height: 11 * 6,
        offSet: {
          x: 8,
          y: 24,
        },
        scale: 6,
        imgSrc: enemyImg,
        player: this.player,
        removeEnemy: this.removeEnemy,
        speed: 1,
        health: 8,
        background: this.background,
        score: 1,
      })
      this.enemies.push(enemy)
    }

    if (this.player.isDead) {
      this.score = this.player.score
      this.startGame = false
      this.isInMenu = true
      this.player.resetValues()
      this.background.resetValues()
      this.transition.transitionEnded = false
      this.miniBossSpawnFrame.ft = 0
      this.enemySpawnFrame.ft = 0
      this.enemies = []
    }

    if (this.isInMenu && this.input.keys.Space) {
      this.transition.start()
    }

    if (this.transition.transitionEnded) {
      this.startGame = true
      this.isInMenu = false
      this.transition.isPlaying = false
    }

    this.transition.update({ time })

    this.player.update({
      keys: this.input.keys,
      enemies: this.enemies,
      mousePos: this.input.mousePos,
      offset: this.background.grid.offset,
      isInMenu: this.isInMenu,
      time: time,
    })

    this.enemies.forEach((enemy) => {
      enemy.update({
        time: time,
        player: this.player,
      })
      this.collision.enemyWithBullet({
        enemies: this.enemies,
        bullets: this.player.gun.bullets,
      })
      this.collision.enemiesWithGrenade({
        enemies: this.enemies,
        grenades: this.player.grenadier.grenades,
      })
    })

    this.background.update({
      time,
      player: this.player,
      enemies: this.enemies,
      isInMenu: this.isInMenu,
    })
  }

  removeEnemy = (enemy: Enemy) => {
    this.enemies = this.enemies.filter((e) => e !== enemy)
  }

  draw(c: CanvasRenderingContext2D) {
    this.background.drawTileWithCampfire(c)
    this.player.draw(c)
    this.enemies.map((enemy) => enemy.draw(c))
    this.background.drawInteractiveWithoutCampfire(c)
    this.drawEyeEffect(c)

    if (this.isInMenu) this.drawMenuOverlay(c)
    if (!this.isInMenu) this.player.drawInfo(c)

    this.transition.draw(c)
  }

  drawMenuOverlay(c: CanvasRenderingContext2D) {
    c.fillStyle = 'rgba(0, 0, 0, 0.7)'
    c.fillRect(0, 0, this.canvas.width, this.canvas.height)

    c.font = '48px Courier New'
    c.fillStyle = 'white'
    c.textAlign = 'center'
    FreezobiaWord(c, this.canvas.width / 2 - 230, 50)
    
    if (this.score === 0) {
      c.font = '20px Courier New'

      c.fillText('Move - WSAD', this.canvas.width / 2, 220)
      c.fillText('Shoot - mouse click', this.canvas.width / 2, 240)
      c.fillText('granade - Q', this.canvas.width / 2, 260)
    } else {
      c.font = '24px Courier New'
      c.fillText(`Final score: ${this.score}`, this.canvas.width / 2, 100)
    }

    c.font = '20px Courier New'
    if (this.showTextInfo) {
      c.fillText(
        'press space to play',
        this.canvas.width / 2,
        this.canvas.height - 50
      )
    }
  }

  drawEyeEffect(c: CanvasRenderingContext2D) {
    const gradient = c.createRadialGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      15,
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.canvas.width / 2
    )

    gradient.addColorStop(
      0.4,
      `rgba(122,122,122, ${Math.max(0.75 - this.player.health, 0)})`
    )
    gradient.addColorStop(
      1,
      `rgba(0,0,0, ${Math.max(0.9 - this.player.health, 0)})`
    )

    c.fillStyle = gradient
    c.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

export default Game
