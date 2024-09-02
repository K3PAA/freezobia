import {
  assets,
  BLOCKED_TILE,
  GAME_TILE_SIZE,
  RESOURCE_SIZE,
} from '../lib/constants'
import { Box, Point } from '../lib/types'
import BackgroundGrid from './BackgroundGrid'
import Collision from './Collision'
import { Campfire, Resource } from './Interactive'
import Player from './Player'

class Background {
  canvas: HTMLCanvasElement

  tileSize = GAME_TILE_SIZE
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
  }

  update({
    time,
    player,
    isInMenu,
  }: {
    time: number
    player: Player
    isInMenu: boolean
  }) {
    this.grid.update()

    for (let x = -1; x < this.gridSize - 1; x++) {
      for (let y = -1; y < this.gridSize - 1; y++) {
        const shouldRender = this.grid.tilesArray[x + 1][y + 1].render

        if (!shouldRender) continue
        const singleArray = this.grid.tilesArray[x + 1][y + 1].backgroundArray

        const { board } = this.grid
        const shift = {
          x: board.position.x + board.width * y - this.grid.offset.x,
          y: board.position.y + board.height * x - this.grid.offset.y,
        }

        singleArray.setShift(shift)
        singleArray.update()

        singleArray.interactiveArray.forEach((tile) => {
          tile.setShift(shift)
          if (tile instanceof Campfire) tile.update({ time })
          if (!isInMenu)
            this.collision.tileWithPlayer({ tile: tile, player: player })
        })
      }
    }
  }

  resetValues() {
    this.grid.tilesArray = this.grid.generateTiles()
    this.grid.offset = { x: 0, y: 0 }
  }

  drawTileWithCampfire(c: CanvasRenderingContext2D) {
    for (let x = -1; x < this.gridSize - 1; x++) {
      for (let y = -1; y < this.gridSize - 1; y++) {
        const shouldRender = this.grid.tilesArray[x + 1][y + 1].render
        if (!shouldRender) continue
        const singleArray = this.grid.tilesArray[x + 1][y + 1].backgroundArray

        for (let i = 0; i < this.boardDimensions.y; i++) {
          for (let j = 0; j < this.boardDimensions.x; j++) {
            const tileNumber = singleArray.backgroundArray[i][j]
            const activeTile = tileNumber === BLOCKED_TILE ? 0 : tileNumber

            c.drawImage(
              this.tilesImage,
              activeTile * RESOURCE_SIZE,
              0,
              RESOURCE_SIZE,
              RESOURCE_SIZE,
              j * this.tileSize + singleArray.shift.x,
              i * this.tileSize + singleArray.shift.y,
              this.tileSize,
              this.tileSize
            )
          }
        }

        for (const tile of singleArray.interactiveArray) {
          if (tile instanceof Campfire) {
            tile.draw(c)
            break
          }
        }
      }
    }
  }

  drawInteractiveWithoutCampfire(c: CanvasRenderingContext2D) {
    for (let x = -1; x < this.gridSize - 1; x++) {
      for (let y = -1; y < this.gridSize - 1; y++) {
        const shouldRender = this.grid.tilesArray[x + 1][y + 1].render
        if (!shouldRender) continue
        const singleArray = this.grid.tilesArray[x + 1][y + 1].backgroundArray

        for (const tile of singleArray.interactiveArray) {
          if (tile instanceof Resource) {
            tile.draw(c)
          }
        }
      }
    }
  }
}

export default Background
