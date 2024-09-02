import Background from './Background'
import Player from './Player'
import Input from './Input'
import playerImg from '../assets/char_run.png'
import Transition from './Transition'
import Collision from './Collision'
import Frame from './Frame'

class Game {
  canvas: HTMLCanvasElement
  background: Background
  player: Player
  input: Input
  transition: Transition
  collision: Collision

  frame = new Frame({ fps: 2 })
  showTextInfo: boolean = false

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
    this.input = new Input()
    this.collision = new Collision()
  }

  update(time: number) {
    if (this.frame.timeElapsed(time)) {
      this.showTextInfo = !this.showTextInfo
    }

    if (this.isInMenu && this.input.keys.Space) {
      this.transition.start()
    }

    if (this.transition.transitionEnded) {
      this.startGame = true
      this.isInMenu = false
    }

    this.transition.update({ time, isMenu: this.isInMenu })

    this.player.update({
      keys: this.input.keys,
      mousePos: this.input.mousePos,
      offset: this.background.grid.offset,
      isInMenu: this.isInMenu,
      time: time,
    })

    this.background.update({
      time,
      player: this.player,
      isInMenu: this.isInMenu,
    })
  }

  draw(c: CanvasRenderingContext2D) {
    this.background.drawTileWithCampfire(c)
    this.player.draw(c)
    this.background.drawInteractiveWithoutCampfire(c)
    this.drawEyeEffect(c)

    if (this.isInMenu) this.drawMenuOverlay(c)
    this.transition.draw(c)
  }

  drawMenuOverlay(c: CanvasRenderingContext2D) {
    c.fillStyle = 'rgba(0, 0, 0, 0.7)'
    c.fillRect(0, 0, this.canvas.width, this.canvas.height)

    c.font = '48px serif'
    c.fillStyle = 'white'
    c.textAlign = 'center'
    c.fillText('Freezobia', this.canvas.width / 2, 50)

    c.font = '20px serif'

    c.fillText('Try to survive the longest,', this.canvas.width / 2, 100)
    c.fillText(
      'find campfire before you get freezed',
      this.canvas.width / 2,
      120
    )

    c.fillText('Move - WSAD', this.canvas.width / 2, 180)
    c.fillText('Shoot - mouse click', this.canvas.width / 2, 200)
    c.fillText('granade - Q', this.canvas.width / 2, 220)

    if (this.showTextInfo) {
      c.fillText(
        'press space to start',
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
