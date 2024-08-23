import { assets, BLOCKED_TILE } from '../lib/constants'
import { Point } from '../lib/types'
import BackgroundGrid from './BackgroundGrid'
import { Campfire } from './Interactive'

class Background {
  canvas: HTMLCanvasElement

  tileSize = 64
  boardDimensions: Point = {
    x: 24,
    y: 24,
  }

  gridSize = 3
  tilesImage: HTMLImageElement = new Image()

  grid: BackgroundGrid

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas
    this.tilesImage.src = assets.tiles
    this.grid = new BackgroundGrid({
      gridSize: this.gridSize,
      boardDimensions: this.boardDimensions,
      tileSize: this.tileSize,
      canvas: this.canvas,
    })
  }

  update(time: number) {
    this.grid.update(time)

    this.grid.tilesArray.forEach((row) => {
      row.forEach((item) => {
        item.backgroundArray.interactiveArray.forEach((tile) => {
          if (tile instanceof Campfire) tile.update(time)
        })
      })
    })
  }

  draw(c: CanvasRenderingContext2D) {
    c.save()

    for (let x = -1; x < this.gridSize - 1; x++) {
      for (let y = -1; y < this.gridSize - 1; y++) {
        const shouldRender = this.grid.tilesArray[x + 1][y + 1].render
        const singleArray = this.grid.tilesArray[x + 1][y + 1].backgroundArray

        if (!shouldRender) continue

        const { board, offset } = this.grid
        const shift = {
          x: board.position.x + board.width * y - offset.x,
          y: board.position.y + this.grid.board.height * x - offset.y,
        }

        for (let i = 0; i < this.boardDimensions.y; i++) {
          for (let j = 0; j < this.boardDimensions.x; j++) {
            const tileNumber = singleArray.backgroundArray[i][j]
            const activeTile = tileNumber === BLOCKED_TILE ? 0 : tileNumber

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

        singleArray.interactiveArray.forEach((el) => {
          el.draw(c, shift)
        })
      }
    }

    c.restore()
  }
}

export default Background
