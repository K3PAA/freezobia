import {
  BLOCKED_TILE,
  resourcesMapping,
  resourcesTotalChances,
} from '../lib/constants'
import { Point, ResourceTypes } from '../lib/types'
import { Campfire, Resource } from './Interactive'

class BackgroundArray {
  boardDimensions: Point
  backgroundArray: number[][]
  interactiveArray: (Campfire | Resource)[] = []
  tileSize: number
  centerArray: boolean
  shift: Point = { x: 0, y: 0 }

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

  setShift(shift: Point) {
    this.shift = shift
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
    const interactiveArray: (Campfire | Resource)[] = []

    const campfire = this.createCampfire()
    interactiveArray.push(
      new Campfire({
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
          this.inCampfireRange(campfire, {
            x: j * this.tileSize,
            y: i * this.tileSize,
          })
        )
          continue

        const zeroOrOne = Math.floor(Math.random() * 1.01)
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

        if (
          randomOptionSize.width / 16 === 2 &&
          randomOptionSize.height / 16 === 2
        ) {
          this.backgroundArray[i][j + 1] = BLOCKED_TILE
          this.backgroundArray[i + 1][j] = BLOCKED_TILE
          this.backgroundArray[i + 1][j + 1] = BLOCKED_TILE
        } else if (randomOptionSize.width / 16 === 2) {
          this.backgroundArray[i][j + 1] = BLOCKED_TILE
        } else if (randomOptionSize.height / 16 === 2) {
          this.backgroundArray[i + 1][j] = BLOCKED_TILE
        }

        interactiveArray.push(
          new Resource({
            tileSize: this.tileSize,
            position: { x: j * this.tileSize, y: i * this.tileSize },
            type: randomKey,
          })
        )
      }
    }

    return interactiveArray
  }

  update({ time }: { time: number }) {
    this.interactiveArray.forEach((tile) => {
      tile.setShift(this.shift)
      if (tile instanceof Campfire) tile.update({ time })
    })
  }

  createCampfire() {
    const randomcCampfirePosition = (dimension: 'x' | 'y') => {
      return (
        Math.floor(Math.random() * (this.boardDimensions[dimension] - 6)) +
        3 * this.tileSize
      )
    }

    const campfire = {
      position: {
        x: this.centerArray
          ? (this.boardDimensions.x / 2 - 1.5) * this.tileSize
          : randomcCampfirePosition('x'),
        y: this.centerArray
          ? (this.boardDimensions.y / 2 - 0.5) * this.tileSize
          : randomcCampfirePosition('y'),
      },
      width: 3 * this.tileSize,
      height: 3 * this.tileSize,
    }

    return campfire
  }

  inCampfireRange(
    campfire: { position: Point; width: number; height: number },
    { x, y }: Point
  ) {
    return (
      campfire.position.x - 3 * this.tileSize < x &&
      x < campfire.width + campfire.position.x + 2 * this.tileSize &&
      campfire.position.y - 3 * this.tileSize < y &&
      y < campfire.height + campfire.position.y + 2 * this.tileSize
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
