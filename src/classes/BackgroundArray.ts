// import { assets, resourcesMapping } from '../lib/constants'
import { BLOCKED_TILE, resourcesMapping } from '../lib/constants'
import { Point, ResourceTypes } from '../lib/types'
import { FirePlace, Resource } from './Tile'

class BackgroundArray {
  boardDimensions: Point
  backgroundArray: number[][]
  interactiveArray: (FirePlace | Resource)[] = []
  tileSize: number
  centerArray: boolean

  constructor({
    boardDimensions,
    tileSize,
    centerArray,
  }: {
    boardDimensions: Point
    tileSize: number
    centerArray: boolean
  }) {
    this.tileSize = tileSize
    this.boardDimensions = boardDimensions
    this.centerArray = centerArray

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
    const interactiveArray: (FirePlace | Resource)[] = []

    const campfire = {
      position: {
        x: Math.floor(Math.random() * (this.boardDimensions.x - 10) + 5),
        y: Math.floor(Math.random() * (this.boardDimensions.y - 10) + 5),
      },
      width: 3,
      height: 3,
    }

    interactiveArray.push(
      new FirePlace({
        tileSize: this.tileSize,
        position: campfire.position,
        width: campfire.width,
        height: campfire.height,
      })
    )

    for (let i = 1; i < this.boardDimensions.y - 1; i++) {
      for (let j = 1; j < this.boardDimensions.x - 1; j++) {
        if (
          this.backgroundArray[i][j] ||
          this.inCampfireRange(campfire, { x: j, y: i }) ||
          this.inCenter({ x: j, y: i })
        )
          continue
        const zeroOrOne = Math.floor(Math.random() * 1.1) + 1
        if (!zeroOrOne) continue

        const options = Object.keys(resourcesMapping) as ResourceTypes[]
        const randomOption = options[Math.floor(Math.random() * options.length)]
        const randomOptionSize = {
          width: resourcesMapping[randomOption].width,
          height: resourcesMapping[randomOption].height,
        }

        // to change
        if (
          this.backgroundArray[i + 1][j + 1] === BLOCKED_TILE ||
          this.backgroundArray[i + 1][j] === BLOCKED_TILE ||
          this.backgroundArray[i][j + 1] === BLOCKED_TILE
        )
          continue

        if (randomOptionSize.width === 2 && randomOptionSize.height === 2) {
          this.backgroundArray[i][j + 1] = BLOCKED_TILE
          this.backgroundArray[i + 1][j] = BLOCKED_TILE
          this.backgroundArray[i + 1][j + 1] = BLOCKED_TILE
        } else if (randomOptionSize.width === 2) {
          this.backgroundArray[i][j + 1] = BLOCKED_TILE
        } else if (randomOptionSize.height === 2) {
          this.backgroundArray[i + 1][j] = BLOCKED_TILE
        }

        interactiveArray.push(
          new Resource({
            tileSize: this.tileSize,
            position: { x: j, y: i },
            type: randomOption,
          })
        )
      }
    }

    return interactiveArray
  }
  inCampfireRange(
    campfire: { position: Point; width: number; height: number },
    { x, y }: Point
  ) {
    return (
      campfire.position.x <= x + 1 &&
      x < campfire.width + campfire.position.x &&
      campfire.position.y <= y + 1 &&
      y < campfire.height + campfire.position.y
    )
  }
  inCenter({ x, y }: Point) {
    return (
      this.centerArray &&
      x <= this.boardDimensions.x / 2 &&
      x >= this.boardDimensions.x / 2 - 1 &&
      y <= this.boardDimensions.y / 2 &&
      y >= this.boardDimensions.y / 2 - 2
    )
  }
}

export default BackgroundArray
