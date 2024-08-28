import { rectangleCollision } from '../lib/utils'
import { Campfire, Interactive, Resource } from './Interactive'
import Player from './Player'

export default class Collision {
  constructor() {}

  tileWithPlayer({ tile, player }: { tile: Interactive; player: Player }) {
    if (tile instanceof Campfire) {
      this.playerWithCampfire({ player, tile })
    }

    if (tile instanceof Resource) {
      if (
        rectangleCollision(
          {
            position: {
              x: tile.position.x + tile.mapping.box.x + tile.shift.x,
              y: tile.position.y + tile.mapping.box.y + tile.shift.y,
            },
            width: tile.mapping.box.width,
            height: tile.mapping.box.height,
          },
          {
            position: {
              x: player.position.x + player.velocity.x,
              y: player.position.y + player.velocity.y,
            },
            width: player.width - Math.abs(player.velocity.x),
            height: player.height - Math.abs(player.velocity.y),
          }
        )
      ) {
        player.position.x -= player.velocity.x
        player.centerPoint.x -= player.velocity.x
        player.position.y -= player.velocity.y
        player.centerPoint.y -= player.velocity.y
      }
    }
  }

  playerWithCampfire({ player, tile }: { player: Player; tile: Campfire }) {
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
