import { assets } from '../lib/constants'
import { Box, Point } from '../lib/types'
import { randomRGB, randomRGBA } from '../lib/utils'

class Background {
  canvas: HTMLCanvasElement

  tileSize = 64
  boardDimensions: Point = {
    x: 32,
    y: 32,
  }

  gridSize = 3
  tilesImage: HTMLImageElement = new Image()

  board: Box
  offset: Point
  // grid = this.generateTestGrid()
  grid = this.generateGrid()
  testGrid = this.generateTestGrid()

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

    this.generateBackgroundArray()
  }

  generateTestGrid() {
    const grid = []

    for (let i = 0; i < this.gridSize; i++) {
      const gridRow = []
      for (let j = 0; j < this.gridSize; j++) {
        gridRow.push({
          color: randomRGBA(),
        })
      }
      grid.push(gridRow)
    }

    return grid
  }

  generateGrid() {
    const grid = []

    for (let i = 0; i < this.gridSize; i++) {
      const gridRow = []
      for (let j = 0; j < this.gridSize; j++) {
        gridRow.push(this.generateBackgroundArray())
      }
      grid.push(gridRow)
    }

    return grid
  }

  generateBackgroundArray() {
    const backgroundArray: number[][] = []

    for (let i = 0; i < this.boardDimensions.y; i++) {
      const row: number[] = []
      for (let j = 0; j < this.boardDimensions.x; j++) {
        const zeroOrOne = Math.floor(Math.random() * 1.2)
        const tileNumber =
          zeroOrOne === 0 ? 0 : Math.floor(Math.random() * 12) + 1

        row.push(tileNumber)
      }
      backgroundArray.push(row)
    }

    return backgroundArray
  }

  update() {
    if (Math.abs(this.offset.x + this.board.position.x) > this.board.width) {
      this.shiftGrid('left')
      this.updateOffset('x', this.board.width + this.offset.x)
    }

    if (this.offset.x - this.board.position.x > this.board.width) {
      this.shiftGrid('right')
      this.updateOffset('x', this.board.position.x)
    }

    if (Math.abs(this.offset.y + this.board.position.y) > this.board.height) {
      this.shiftGrid('up')
      this.updateOffset('y', this.board.height + this.offset.y)
    }

    if (this.offset.y - this.board.position.y > this.board.height) {
      this.shiftGrid('down')
      this.updateOffset('y', this.board.position.y)
    }
  }

  shiftGrid(direction: 'left' | 'right' | 'up' | 'down') {
    console.log('shiftGrid', direction)
    const size = this.gridSize
    for (let i = 0; i < size; i++) {
      if (direction === 'left' || direction === 'right') {
        this.shiftRow(i, direction)
      } else {
        this.shiftColumn(i, direction)
      }
    }
  }

  shiftRow(row: number, direction: 'left' | 'right') {
    if (direction === 'left') {
      for (let i = 2; i > 0; i--) {
        this.grid[row][i] = this.grid[row][i - 1]
        this.testGrid[row][i] = this.testGrid[row][i - 1]
      }
      this.grid[row][0] = this.generateBackgroundArray()
      this.testGrid[row][0] = { color: randomRGBA() }
    } else {
      for (let i = 0; i < 2; i++) {
        this.grid[row][i] = this.grid[row][i + 1]
        this.testGrid[row][i] = this.testGrid[row][i + 1]
      }
      this.grid[row][2] = this.generateBackgroundArray()
      this.testGrid[row][2] = { color: randomRGBA() }
    }
  }

  shiftColumn(col: number, direction: 'up' | 'down') {
    if (direction === 'up') {
      for (let i = 2; i > 0; i--) {
        this.grid[i][col] = this.grid[i - 1][col]
        this.testGrid[i][col] = this.testGrid[i - 1][col]
      }
      this.grid[0][col] = this.generateBackgroundArray()
      this.testGrid[0][col] = { color: randomRGBA() }
    } else {
      for (let i = 0; i < 2; i++) {
        this.grid[i][col] = this.grid[i + 1][col]
        this.testGrid[i][col] = this.testGrid[i + 1][col]
      }
      this.grid[2][col] = this.generateBackgroundArray()
      this.testGrid[2][col] = { color: randomRGBA() }
    }
  }

  updateOffset(direction: 'x' | 'y', value: number) {
    this.offset[direction] = value
  }

  draw(c: CanvasRenderingContext2D) {
    c.save()

    for (let x = -1; x < this.gridSize - 1; x++) {
      for (let y = -1; y < this.gridSize - 1; y++) {
        const backgroundArray = this.grid[x + 1][y + 1]

        for (let i = 0; i < this.boardDimensions.y; i++) {
          for (let j = 0; j < this.boardDimensions.x; j++) {
            const tileNumber = backgroundArray[i][j]
            c.drawImage(
              this.tilesImage,
              tileNumber * 16,
              0,
              16,
              16,

              i * this.tileSize +
                this.board.position.x +
                this.board.width * y -
                this.offset.x,
              j * this.tileSize +
                this.board.position.y +
                this.board.height * x -
                this.offset.y,
              this.tileSize,
              this.tileSize
            )
          }
        }

        c.fillStyle = this.testGrid[x + 1][y + 1].color
        c.fillRect(
          this.board.position.x + this.board.width * y - this.offset.x,
          this.board.position.y + this.board.height * x - this.offset.y,
          this.board.width,
          this.board.height
        )
      }
    }

    c.restore()
  }
}

export default Background
