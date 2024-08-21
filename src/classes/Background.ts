import { assets } from '../lib/constants'
import { Box, Point } from '../lib/types'
import BackgroundArray from './BackgroundArray'
import Frame from './Frame'
import { FirePlace } from './Tile'

class Background {
  canvas: HTMLCanvasElement

  tileSize = 64
  boardDimensions: Point = {
    x: 24,
    y: 24,
  }

  gridSize = 3
  tilesImage: HTMLImageElement = new Image()

  board: Box
  offset: Point

  grid = this.generateGrid()
  frames = new Frame({ fps: 15 })

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

  generateGrid() {
    const grid = []

    for (let i = 0; i < this.gridSize; i++) {
      const gridRow = []
      for (let j = 0; j < this.gridSize; j++) {
        gridRow.push({
          backgroundArray: this.generateBackgroundArray(),
          render: j === 1 && i === 1 ? true : false,
        })
      }
      grid.push(gridRow)
    }

    return grid
  }

  generateBackgroundArray() {
    return new BackgroundArray({
      boardDimensions: this.boardDimensions,
      tileSize: this.tileSize,
    })
  }

  update(time: number) {
    if (this.frames.timeElapsed(time)) {
      this.handleGridInView()
      this.handleGridShift()
    }

    this.grid.forEach((row) => {
      row.forEach((item) => {
        item.backgroundArray.interactiveArray.forEach((x) => {
          if (x instanceof FirePlace) x.update(time)
        })
      })
    })
  }

  handleGridInView() {
    // left
    if (!this.grid[1][0].render && this.offset.x < this.board.position.x) {
      this.grid[1][0].render = true
    } else if (
      this.grid[1][0].render &&
      this.offset.x > this.board.position.x
    ) {
      this.grid[1][0].render = false
    }

    // top
    if (!this.grid[0][1].render && this.offset.y < this.board.position.y) {
      this.grid[0][1].render = true
    } else if (
      this.grid[0][1].render &&
      this.offset.y > this.board.position.y
    ) {
      this.grid[0][1].render = false
    }

    // right
    if (!this.grid[1][2].render && -this.offset.x < this.board.position.x) {
      this.grid[1][2].render = true
    } else if (
      this.grid[1][2].render &&
      -this.offset.x > this.board.position.x
    ) {
      this.grid[1][2].render = false
    }

    // bottom
    if (!this.grid[2][1].render && -this.offset.y < this.board.position.y) {
      this.grid[2][1].render = true
    } else if (
      this.grid[2][1].render &&
      -this.offset.y > this.board.position.y
    ) {
      this.grid[2][1].render = false
    }

    // corners
    const visibleCorners = {
      topLeft: this.grid[0][1].render && this.grid[1][0].render,
      topRight: this.grid[0][1].render && this.grid[1][2].render,
      bottomLeft: this.grid[2][1].render && this.grid[1][0].render,
      bottomRight: this.grid[2][1].render && this.grid[1][2].render,
    }

    if (!this.grid[0][0].render && visibleCorners.topLeft) {
      this.grid[0][0].render = true
    } else if (this.grid[0][0] && !visibleCorners.topLeft) {
      this.grid[0][0].render = false
    }

    if (!this.grid[0][2].render && visibleCorners.topRight) {
      this.grid[0][2].render = true
    } else if (this.grid[0][2] && !visibleCorners.topRight) {
      this.grid[0][2].render = false
    }

    if (!this.grid[2][0].render && visibleCorners.bottomLeft) {
      this.grid[2][0].render = true
    } else if (this.grid[2][0] && !visibleCorners.bottomLeft) {
      this.grid[2][0].render = false
    }

    if (!this.grid[2][2].render && visibleCorners.bottomRight) {
      this.grid[2][2].render = true
    } else if (this.grid[2][2] && !visibleCorners.bottomRight) {
      this.grid[2][2].render = false
    }
  }

  handleGridShift() {
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
      }
      this.grid[row][0] = {
        backgroundArray: this.generateBackgroundArray(),
        render: false,
      }
    } else {
      for (let i = 0; i < 2; i++) {
        this.grid[row][i] = this.grid[row][i + 1]
      }
      this.grid[row][2] = {
        backgroundArray: this.generateBackgroundArray(),
        render: false,
      }
    }
  }

  shiftColumn(col: number, direction: 'up' | 'down') {
    if (direction === 'up') {
      for (let i = 2; i > 0; i--) {
        this.grid[i][col] = this.grid[i - 1][col]
      }
      this.grid[0][col] = {
        backgroundArray: this.generateBackgroundArray(),
        render: false,
      }
    } else {
      for (let i = 0; i < 2; i++) {
        this.grid[i][col] = this.grid[i + 1][col]
      }
      this.grid[2][col] = {
        backgroundArray: this.generateBackgroundArray(),
        render: false,
      }
    }
  }

  updateOffset(direction: 'x' | 'y', value: number) {
    this.offset[direction] = value
  }

  draw(c: CanvasRenderingContext2D) {
    c.save()

    for (let x = -1; x < this.gridSize - 1; x++) {
      for (let y = -1; y < this.gridSize - 1; y++) {
        const shouldRender = this.grid[x + 1][y + 1].render
        const singleArray = this.grid[x + 1][y + 1].backgroundArray

        if (!shouldRender) continue

        for (let i = 0; i < this.boardDimensions.y; i++) {
          for (let j = 0; j < this.boardDimensions.x; j++) {
            const tileNumber = singleArray.backgroundArray[i][j]
            c.drawImage(
              this.tilesImage,
              tileNumber * 16,
              0,
              16,
              16,

              j * this.tileSize +
                this.board.position.x +
                this.board.width * y -
                this.offset.x,
              i * this.tileSize +
                this.board.position.y +
                this.board.height * x -
                this.offset.y,
              this.tileSize,
              this.tileSize
            )
          }
        }

        singleArray.interactiveArray.forEach((el) => {
          el.draw(c, {
            x: this.board.position.x + this.board.width * y - this.offset.x,
            y: this.board.position.y + this.board.height * x - this.offset.y,
          })
        })
      }
    }

    c.restore()
  }
}

export default Background
