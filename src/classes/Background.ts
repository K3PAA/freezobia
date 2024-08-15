import { assets } from '../lib/constants'

class Background {
  width = 48
  height = 48
  boardWidth = 32
  boardHeight = 24
  tilesImage: HTMLImageElement = new Image()
  backgroundArray: number[][] = this.generateBackgroundArray()

  centerBox = {
    x: this.width * this.boardWidth,
    y: this.height * this.boardHeight,
  }
  offset = {
    x: 0,
    y: 0,
  }

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.tilesImage.src = assets.tiles

    this.centerBox = {
      x: this.centerBox.x / 2 - canvas.width / 2,
      y: this.centerBox.y / 2 - canvas.height / 2,
    }
  }

  generateBackgroundArray() {
    const backgroundArray: number[][] = []

    for (let i = 0; i < this.boardWidth; i++) {
      const row: number[] = []
      for (let j = 0; j < this.boardHeight; j++) {
        const zeroOrOne = Math.floor(Math.random() * 1.2)
        const tileNumber =
          zeroOrOne === 0 ? 0 : Math.floor(Math.random() * 12) + 1
        row.push(tileNumber)
      }
      backgroundArray.push(row)
    }

    return backgroundArray
  }

  draw(c: CanvasRenderingContext2D) {
    c.save()

    c.translate(
      -this.centerBox.x - this.offset.x,
      -this.centerBox.y - this.offset.y
    )

    for (let i = 0; i < this.boardWidth; i++) {
      for (let j = 0; j < this.boardHeight; j++) {
        const tileNumber = this.backgroundArray[i][j]

        c.drawImage(
          this.tilesImage,
          tileNumber * 16,
          0,
          16,
          16,
          i * this.width,
          j * this.height,
          this.width,
          this.height
        )
      }
    }
    c.restore()
  }
}

export default Background
