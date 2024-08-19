import Frame from './Frame'
import Background from './Background'
import Player from './Player'
import Input from './Input'
import playerImg from "../assets/char_running.png";

class Game {
  canvas: HTMLCanvasElement
  background: Background
  frame: Frame
  player: Player
  input: Input

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas

    this.background = new Background({ canvas })
    this.frame = new Frame()
    this.player = new Player({
      canvas,
      imgSrc: playerImg
    })
    this.input = new Input()
  }

  update(time: number) {
    if (!this.frame.update(time)) return

    this.player.update({
      keys: this.input.keys,
      mousePos: this.input.mousePos,
      offset: this.background.offset,
    })

    this.background.update()
  }

  draw(c: CanvasRenderingContext2D) {
    this.background.draw(c)
    this.player.draw(c)
  }
}

export default Game
