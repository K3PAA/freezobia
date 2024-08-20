import { Point } from '../lib/types'
import Tile from './Tile'

class BackgroundArray {
  boardDimensions: Point
  backgroundArray: number[][]
  interactiveArray: Tile[] = []
  tileSize: number

  constructor({
    boardDimensions,
    tileSize,
  }: {
    boardDimensions: Point
    tileSize: number
  }) {
    this.tileSize = tileSize
    this.boardDimensions = boardDimensions

    this.backgroundArray = this.generateFloorTiles()
    this.interactiveArray = this.generateInteractiveTiles()
  }

  generateFloorTiles() {
    const backgroundArray: number[][] = []

    for (let i = 0; i < this.boardDimensions.y; i++) {
      const row: number[] = []
      for (let j = 0; j < this.boardDimensions.x; j++) {
        const zeroOrOne = Math.floor(Math.random() * 1.1)
        const tileNumber =
          zeroOrOne === 0 ? 0 : Math.floor(Math.random() * 4) + 1

        row.push(tileNumber)
      }
      backgroundArray.push(row)
    }

    return backgroundArray
  }

  generateInteractiveTiles() {
    const interactiveArray: Tile[] = []

    const campfire = {
      position: {
        x:
          Math.floor(Math.random() * (this.boardDimensions.x - 10) + 5) *
          this.tileSize,
        y:
          Math.floor(Math.random() * (this.boardDimensions.y - 10) + 5) *
          this.tileSize,
      },
      width: 3 * this.tileSize,
      height: 3 * this.tileSize,
    }

    interactiveArray.push(
      new Tile({
        tileSize: this.tileSize,
        type: 'fire_place',
        position: campfire.position,
        width: campfire.width,
        height: campfire.height,
      })
    )

    for (let i = 0; i < this.boardDimensions.y; i++) {
      for (let j = 0; j < this.boardDimensions.x; j++) {
        if (this.backgroundArray[i][j]) continue
        const zeroOrOne = Math.floor(Math.random() * 1.05)
        if (!zeroOrOne) continue
      }
    }

    return interactiveArray
  }
}

export default BackgroundArray
