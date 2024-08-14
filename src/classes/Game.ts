import Frame from './Frame'
import Background from './Background'
import Player from './Player'

class Game {
  canvas: HTMLCanvasElement
  background: Background
  frame: Frame
  player: Player

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas

    this.background = new Background()
    this.frame = new Frame()
    this.player = new Player({ canvas })
  }

  update(time: number) {
    if (!this.frame.update(time)) return

    this.player.update()
  }

  draw(c: CanvasRenderingContext2D) {
    c.fillStyle = '#fff'
    c.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.background.draw(c)
    this.player.draw(c)
  }
}

export default Game
