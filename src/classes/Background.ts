import { assets, BLOCKED_TILE } from '../lib/constants'
import { Box, Point } from '../lib/types'
import BackgroundGrid from './BackgroundGrid'
import { Campfire } from './Interactive'

class Background {
  canvas: HTMLCanvasElement
  offset: Point

  tileSize = 64
  boardDimensions: Point = {
    x: 24,
    y: 24,
  }

  gridSize = 3
  tilesImage: HTMLImageElement = new Image()

  board: Box
  grid: BackgroundGrid

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

    this.grid = new BackgroundGrid({
      gridSize: this.gridSize,
      boardDimensions: this.boardDimensions,
      tileSize: this.tileSize,
      board: this.board,
    })

    this.offset = {
      x: 0,
      y: 0,
    }
  }

  update(time: number) {
    this.grid.update({
      time,
      offset: this.offset,
      updateOffset: this.updateOffset.bind(this),
    })

    this.grid.tilesArray.forEach((row) => {
      row.forEach((item) => {
        item.backgroundArray.interactiveArray.forEach((tile) => {
          if (tile instanceof Campfire) tile.update(time)
        })
      })
    })
  }

  updateOffset(direction: 'x' | 'y', value: number) {
    console.log(this)
    this.offset[direction] = value
  }

  draw(c: CanvasRenderingContext2D) {
    c.save()

    for (let x = -1; x < this.gridSize - 1; x++) {
      for (let y = -1; y < this.gridSize - 1; y++) {
        const shouldRender = this.grid.tilesArray[x + 1][y + 1].render
        const singleArray = this.grid.tilesArray[x + 1][y + 1].backgroundArray

        if (!shouldRender) continue

        const { board } = this.grid
        const shift = {
          x: board.position.x + board.width * y - this.offset.x,
          y: board.position.y + board.height * x - this.offset.y,
        }

        for (let i = 0; i < this.boardDimensions.y; i++) {
          for (let j = 0; j < this.boardDimensions.x; j++) {
            const tileNumber = singleArray.backgroundArray[i][j]
            const activeTile = tileNumber === BLOCKED_TILE ? 0 : tileNumber

            if (activeTile === 101) {
              c.fillStyle = 'red'
              c.fillRect(
                j * this.tileSize + shift.x,
                i * this.tileSize + shift.y,
                this.tileSize,
                this.tileSize
              )
            } else {
              c.drawImage(
                this.tilesImage,
                activeTile * 16,
                0,
                16,
                16,

                j * this.tileSize + shift.x,
                i * this.tileSize + shift.y,
                this.tileSize,
                this.tileSize
              )
            }
          }
        }

        singleArray.interactiveArray.forEach((el) => {
          el.draw(c, shift)
        })
      }
    }

    c.restore()
  }
}

export default Background
