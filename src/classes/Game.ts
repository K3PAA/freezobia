import Background from './Background'
import Player from './Player'
import Input from './Input'
import playerImg from '../assets/char_run.png'

class Game {
  canvas: HTMLCanvasElement
  background: Background
  player: Player
  input: Input

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas

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
  }

  update(time: number) {
    this.player.update({
      keys: this.input.keys,
      mousePos: this.input.mousePos,
      offset: this.background.offset,
    })

    this.background.update(time)
  }

  draw(c: CanvasRenderingContext2D) {
    this.background.draw(c)
    this.player.draw(c)
  }
}

export default Game
