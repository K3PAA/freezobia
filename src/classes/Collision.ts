import { Campfire, Interactive } from './Interactive'
import Player from './Player'

export default class Collision {
  constructor() {}

  tileWithPlayer({ tile, player }: { tile: Interactive; player: Player }) {
    if (tile instanceof Campfire) {
      const distance = Math.sqrt(
        Math.pow(tile.center.x + tile.shift.x - player.centerPoint.x, 2) +
          Math.pow(tile.center.y + tile.shift.y - player.centerPoint.y, 2)
      )

      if (player.playerHitBoxRadius + tile.radius >= distance) {
        tile.active = true
      } else {
        tile.active = false
      }
    }
  }
}
