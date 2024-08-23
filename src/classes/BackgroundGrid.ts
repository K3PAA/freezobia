import { Box, Point } from '../lib/types'
import BackgroundArray from './BackgroundArray'
import Frame from './Frame'

type Tile = {
  backgroundArray: BackgroundArray
  render: boolean
}

class BackgroundGrid {
  gridSize: number
  tileSize: number

  tilesArray: Tile[][]
  boardDimensions: Point
  defaultFrames = new Frame({ fps: 30 })

  board: Box
  offset: Point

  constructor({
    gridSize,
    tileSize,
    boardDimensions,
    canvas,
  }: {
    gridSize: number
    tileSize: number
    boardDimensions: Point
    canvas: HTMLCanvasElement
  }) {
    this.gridSize = gridSize
    this.tileSize = tileSize
    this.boardDimensions = boardDimensions

    this.tilesArray = this.generateTiles()

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

  generateTiles() {
    const grid = []

    for (let i = 0; i < this.gridSize; i++) {
      const gridRow = []
      for (let j = 0; j < this.gridSize; j++) {
        const isInCenter = j === 1 && i === 1
        gridRow.push({
          backgroundArray: this.generateBackgroundArray(isInCenter),
          render: isInCenter,
        })
      }
      grid.push(gridRow)
    }

    return grid
  }

  generateBackgroundArray(isInCenter = false) {
    return new BackgroundArray({
      centerArray: isInCenter,
      boardDimensions: this.boardDimensions,
      tileSize: this.tileSize,
    })
  }

  update(time: number) {
    if (this.defaultFrames.timeElapsed(time)) {
      this.updateGridVisibility()
      this.handleGridShift()
    }
  }

  updateGridVisibility() {
    this.updateEdges()
    this.updateCorners()
  }

  updateEdges() {
    const edges = [
      {
        name: 'left',
        tile: this.tilesArray[1][0],
        condition: () => this.offset.x < this.board.position.x,
      },
      {
        name: 'top',
        tile: this.tilesArray[0][1],
        condition: () => this.offset.y < this.board.position.y,
      },
      {
        name: 'right',
        tile: this.tilesArray[1][2],
        condition: () => -this.offset.x < this.board.position.x,
      },
      {
        name: 'bottom',
        tile: this.tilesArray[2][1],
        condition: () => -this.offset.y < this.board.position.y,
      },
    ]

    edges.forEach((edge) => {
      this.updateCellVisibility(edge.tile, edge.condition())
    })
  }

  updateCorners() {
    const corners = [
      {
        name: 'topLeft',
        tile: this.tilesArray[0][0],
        condition: this.tilesArray[0][1].render && this.tilesArray[1][0].render,
      },
      {
        name: 'topRight',
        tile: this.tilesArray[0][2],
        condition: this.tilesArray[0][1].render && this.tilesArray[1][2].render,
      },
      {
        name: 'bottomLeft',
        tile: this.tilesArray[2][0],
        condition: this.tilesArray[2][1].render && this.tilesArray[1][0].render,
      },
      {
        name: 'bottomRight',
        tile: this.tilesArray[2][2],
        condition: this.tilesArray[2][1].render && this.tilesArray[1][2].render,
      },
    ]

    corners.forEach((corner) => {
      this.updateCellVisibility(corner.tile, corner.condition)
    })
  }

  updateCellVisibility(
    tile: {
      backgroundArray: BackgroundArray
      render: boolean
    },
    shouldRender: boolean
  ) {
    if (!tile.render && shouldRender) {
      tile.render = true
    } else if (tile.render && !shouldRender) {
      tile.render = false
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
        this.tilesArray[row][i] = this.tilesArray[row][i - 1]
      }
      this.tilesArray[row][0] = {
        backgroundArray: this.generateBackgroundArray(),
        render: false,
      }
    } else {
      for (let i = 0; i < 2; i++) {
        this.tilesArray[row][i] = this.tilesArray[row][i + 1]
      }
      this.tilesArray[row][2] = {
        backgroundArray: this.generateBackgroundArray(),
        render: false,
      }
    }
  }

  shiftColumn(col: number, direction: 'up' | 'down') {
    if (direction === 'up') {
      for (let i = 2; i > 0; i--) {
        this.tilesArray[i][col] = this.tilesArray[i - 1][col]
      }
      this.tilesArray[0][col] = {
        backgroundArray: this.generateBackgroundArray(),
        render: false,
      }
    } else {
      for (let i = 0; i < 2; i++) {
        this.tilesArray[i][col] = this.tilesArray[i + 1][col]
      }
      this.tilesArray[2][col] = {
        backgroundArray: this.generateBackgroundArray(),
        render: false,
      }
    }
  }

  updateOffset(direction: 'x' | 'y', value: number) {
    this.offset[direction] = value
  }
}

export default BackgroundGrid
