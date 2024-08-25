import BackgroundArray from './BackgroundArray'
import { Campfire } from './Interactive'
import Player from './Player'

export default class Collision {
  constructor() {}

  checkPlayerWithElementsCollision({
    player,
    elements,
    c: c,
  }: {
    player: Player
    elements: { render: boolean; backgroundArray: BackgroundArray }[][]
    c: CanvasRenderingContext2D
  }) {
    elements.forEach((row) => {
      row.forEach((tile) => {
        if (!tile.render) return
        const interactive = tile.backgroundArray.interactiveArray

        interactive.forEach((el) => {
          if (el instanceof Campfire) {
            this.isPlayerInCampfireRange({ player, campfire: el, c: c })
          }
        })
      })
    })
  }

  isPlayerInCampfireRange({
    player,
    campfire,
    c,
  }: {
    player: Player
    campfire: Campfire
    c: CanvasRenderingContext2D
  }) {
    const campfireCenter = {
      x: campfire.position.x - campfire.width / 2,
      y: campfire.position.y - campfire.height / 2,
    }

    c.fillStyle = 'rgb(255, 0, 0)'
    c.fillRect(campfire.position.x, campfire.position.y / 2, 100, 100)
  }
}
