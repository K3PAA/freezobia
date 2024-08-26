import { assets, BLOCKED_TILE } from '../lib/constants'
import { Box, Point } from '../lib/types'
import BackgroundGrid from './BackgroundGrid'
import Collision from './Collision'
import Player from './Player'

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
  collision: Collision = new Collision()

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

  update({ time, player }: { time: number; player: Player }) {
    for (let x = -1; x < this.gridSize - 1; x++) {
      for (let y = -1; y < this.gridSize - 1; y++) {
        const shouldRender = this.grid.tilesArray[x + 1][y + 1].render

        if (!shouldRender) continue
        const singleArray = this.grid.tilesArray[x + 1][y + 1].backgroundArray

        const { board } = this.grid
        const shift = {
          x: board.position.x + board.width * y - this.offset.x,
          y: board.position.y + board.height * x - this.offset.y,
        }

        singleArray.setShift(shift)
        singleArray.update({ time })
        singleArray.interactiveArray.forEach((tile) => {
          this.collision.tileWithPlayer({ tile: tile, player: player })
        })
      }
    }

    this.grid.update({
      time,
      offset: this.offset,
      updateOffset: this.updateOffset.bind(this),
    })
  }

  updateOffset(direction: 'x' | 'y', value: number) {
    this.offset[direction] = value
  }

  draw(c: CanvasRenderingContext2D) {
    c.save()

    for (let x = -1; x < this.gridSize - 1; x++) {
      for (let y = -1; y < this.gridSize - 1; y++) {
        const shouldRender = this.grid.tilesArray[x + 1][y + 1].render
        const singleArray = this.grid.tilesArray[x + 1][y + 1].backgroundArray

        if (!shouldRender) continue

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
              j * this.tileSize + singleArray.shift.x,
              i * this.tileSize + singleArray.shift.y,
              this.tileSize,
              this.tileSize
            )
          }
        }

        singleArray.interactiveArray.forEach((el) => {
          el.draw(c)
        })
      }
    }

    c.restore()
  }
}

export default Background
