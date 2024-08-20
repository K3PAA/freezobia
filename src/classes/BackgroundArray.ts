import { assets, resourcesMapping } from '../lib/constants'
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
        x: Math.floor(Math.random() * (this.boardDimensions.x - 10) + 5),
        y: Math.floor(Math.random() * (this.boardDimensions.y - 10) + 5),
      },
      width: 3,
      height: 3,
    }

    interactiveArray.push(
      new Tile({
        tileSize: this.tileSize,
        type: 'fire_place',
        position: campfire.position,
        width: campfire.width,
        height: campfire.height,
        src: assets.fire_place,
      })
    )

    for (let i = 1; i < this.boardDimensions.y - 1; i++) {
      for (let j = 1; j < this.boardDimensions.x - 1; j++) {
        if (
          this.backgroundArray[i][j] ||
          (campfire.position.x >= j &&
            campfire.position.x < j + campfire.width + 1) ||
          (campfire.position.y >= i &&
            campfire.position.y < i + campfire.height + 1)
        )
          continue
        const zeroOrOne = Math.floor(Math.random() * 1.2)
        if (!zeroOrOne) continue

        interactiveArray.push(
          new Tile({
            tileSize: this.tileSize,
            type: 'snow_tree',
            position: { x: j, y: i },
            mapping: resourcesMapping.tree_snow,
            src: assets.resources,
          })
        )
      }
    }

    return interactiveArray
  }
}

export default BackgroundArray
