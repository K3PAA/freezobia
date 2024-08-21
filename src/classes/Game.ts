import Background from './Background'
import Player from './Player'
import Input from './Input'
import playerImg from '../assets/char_running.png'

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
      imgSrc: playerImg,
    })
    this.input = new Input()
  }

  update(time: number) {
    this.player.update({
      keys: this.input.keys,
      mousePos: this.input.mousePos,
      offset: this.background.offset,
      time: time,
    })

    this.background.update(time)
  }

  draw(c: CanvasRenderingContext2D) {
    this.background.draw(c)
    this.player.draw(c)
  }
}

export default Game
