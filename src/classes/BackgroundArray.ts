import {
  BLOCKED_TILE,
  resourcesMapping,
  resourcesTotalChances,
} from '../lib/constants'
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

    for (let i = 0; i < this.boardDimensions.y - 1; i++) {
      for (let j = 0; j < this.boardDimensions.x - 1; j++) {
        if (
          this.backgroundArray[i][j] ||
          this.inCampfireRange(campfire, { x: j, y: i }) ||
          this.inCenter({ x: j, y: i })
        )
          continue
        const zeroOrOne = Math.floor(Math.random() * 1.25)
        if (!zeroOrOne) continue

        const randomKey = this.getRandomChanceIndex()

        const randomOptionSize = {
          width: resourcesMapping[randomKey].width,
          height: resourcesMapping[randomKey].height,
        }

        // to change
        if (
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
            type: randomKey,
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
      campfire.position.x - 1 <= x + 1 &&
      x < campfire.width + campfire.position.x + 1 &&
      campfire.position.y - 1 <= y + 1 &&
      y < campfire.height + campfire.position.y + 1
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

  getRandomChanceValue() {
    return Math.floor(Math.random() * resourcesTotalChances)
  }

  getRandomChanceIndex(): ResourceTypes {
    const randomChanceValue = this.getRandomChanceValue()

    let total = 0

    for (const key in resourcesMapping) {
      total += resourcesMapping[key as ResourceTypes].chance
      if (total >= randomChanceValue) return key as ResourceTypes
    }

    return 'tree'
  }
}

export default BackgroundArray
