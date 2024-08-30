import Background from './Background'
import Player from './Player'
import Input from './Input'
import playerImg from '../assets/char_run.png'
import Frame from './Frame'
import Transition from './Transition'
import Collision from './Collision'

class Game {
  canvas: HTMLCanvasElement
  background: Background
  player: Player
  input: Input
  transition: Transition
  collision: Collision

  frame = new Frame({ fps: 60 })
  isPlaying = false

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
    // this.updateTransition(time)

    // if (!this.isPlaying) return

    this.player.update({
      keys: this.input.keys,
      mousePos: this.input.mousePos,
      offset: this.background.grid.offset,
      time: time,
    })

    this.background.update({ time, player: this.player })
  }

  updateTransition(time: number) {
    if (
      !this.isPlaying &&
      this.input.keys.Space &&
      !this.transition.activeTransition
    ) {
      this.transition.start()
    }
    if (this.transition.activeTransition) this.transition.update(time)
    if (this.transition.animationFinish) this.isPlaying = true
  }

  draw(c: CanvasRenderingContext2D) {
    this.background.drawTileWithCampfire(c)
    this.player.draw(c)
    this.background.drawInteractiveWithoutCampfire(c)
    this.drawEyeEffect(c)
    this.transition.draw(c)
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

    gradient.addColorStop(0, 'rgba(255,255,255,0.1)')
    gradient.addColorStop(0.3, 'rgba(122,122,122,0.2)')
    gradient.addColorStop(1, 'rgba(0,0,0,0.4)')

    c.fillStyle = gradient
    c.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

export default Game
