import { assets } from '../lib/constants'
import { Box, Point } from '../lib/types'
import { randomRGB } from '../lib/utils'

type BackgroundArray = number[][]

type Grid = [
  [BackgroundArray, BackgroundArray, BackgroundArray],
  [BackgroundArray, BackgroundArray, BackgroundArray],
  [BackgroundArray, BackgroundArray, BackgroundArray]
]

class Background {
  canvas: HTMLCanvasElement

  tileSize = 64
  boardDimensions: Point = {
    x: 24,
    y: 16,
  }

  gridSize = 3
  tilesImage: HTMLImageElement = new Image()

  board: Box
  offset: Point
  grid = this.generateTestGrid()

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas
    this.tilesImage.src = assets.tiles

    this.board = {
      width: this.tileSize * this.boardDimensions.x,
      height: this.tileSize * this.boardDimensions.y,
      position: {
        x: canvas.width / 2 - (this.tileSize * this.boardDimensions.x) / 2,
        y: canvas.height / 2 - (this.tileSize * this.boardDimensions.y) / 2,
      },
    }

    this.offset = {
      x: 0,
      y: 0,
    }
  }

  generateTestGrid() {
    const grid = []

    for (let i = 0; i < this.gridSize; i++) {
      const gridRow = []
      for (let j = 0; j < this.gridSize; j++) {
        gridRow.push({
          color: randomRGB(),
        })
      }
      grid.push(gridRow)
    }

    return grid
  }

  generateGrid(): Grid {
    const grid = []

    for (let i = 0; i < this.gridSize; i++) {
      const gridRow = []
      for (let j = 0; j < this.gridSize; j++) {
        gridRow.push(this.generateBackgroundArray())
      }
      grid.push(gridRow as [BackgroundArray, BackgroundArray, BackgroundArray])
    }

    return grid as Grid
  }

  update() {
    // left side
    if (Math.abs(this.offset.x + this.board.position.x) > this.board.width) {
      // shift top tiles
      this.grid[0][2] = this.grid[0][1]
      this.grid[0][1] = this.grid[0][0]
      this.grid[0][0] = { color: randomRGB() }

      // shift middle tiles
      this.grid[1][2] = this.grid[1][1]
      this.grid[1][1] = this.grid[1][0]
      this.grid[1][0] = { color: randomRGB() }

      // shift bottom tiles
      this.grid[2][2] = this.grid[2][1]
      this.grid[2][1] = this.grid[2][0]
      this.grid[2][0] = { color: randomRGB() }

      this.offset.x = this.board.width + this.offset.x
    }

    //right side
    if (this.offset.x - this.board.position.x > this.board.width) {
      this.grid[0][0] = this.grid[0][1]
      this.grid[0][1] = this.grid[0][2]
      this.grid[0][2] = { color: randomRGB() }

      this.grid[1][0] = this.grid[1][1]
      this.grid[1][1] = this.grid[1][2]
      this.grid[1][2] = { color: randomRGB() }

      this.grid[2][0] = this.grid[2][1]
      this.grid[2][1] = this.grid[2][2]
      this.grid[2][2] = { color: randomRGB() }

      this.offset.x = this.board.width - this.offset.x
    }

    // top side
    if (Math.abs(this.offset.y + this.board.position.y) > this.board.height) {
      this.grid[2][0] = this.grid[1][0]
      this.grid[1][0] = this.grid[0][0]
      this.grid[0][0] = { color: randomRGB() }

      this.grid[2][1] = this.grid[1][1]
      this.grid[1][1] = this.grid[0][1]
      this.grid[0][1] = { color: randomRGB() }

      this.grid[2][2] = this.grid[1][2]
      this.grid[1][2] = this.grid[0][2]
      this.grid[0][2] = { color: randomRGB() }

      this.offset.y = this.board.height + this.offset.y
    }

    if (this.offset.y - this.board.position.y > this.board.height) {
      this.grid[0][0] = this.grid[1][0]
      this.grid[1][0] = this.grid[2][0]
      this.grid[2][0] = { color: randomRGB() }

      this.grid[0][1] = this.grid[1][1]
      this.grid[1][1] = this.grid[2][1]
      this.grid[2][1] = { color: randomRGB() }

      this.grid[0][2] = this.grid[1][2]
      this.grid[1][2] = this.grid[2][2]
      this.grid[2][2] = { color: randomRGB() }

      this.offset.y = this.board.height - this.offset.y
    }
  }

  generateBackgroundArray() {
    const backgroundArray: number[][] = []

    for (let i = 0; i < this.boardDimensions.x; i++) {
      const row: number[] = []
      for (let j = 0; j < this.boardDimensions.y; j++) {
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

    for (let i = -1; i < this.gridSize - 1; i++) {
      for (let j = -1; j < this.gridSize - 1; j++) {
        c.fillStyle = this.grid[i + 1][j + 1].color
        c.fillRect(
          this.board.position.x + this.board.width * j - this.offset.x,
          this.board.position.y + this.board.height * i - this.offset.y,
          this.board.width,
          this.board.height
        )
      }
    }

    c.restore()
  }
}

export default Background
