import { rectangleCollision } from '../lib/utils'
import Bullet from './Bullet'
import Enemy from './Enemy'
import Grenade from './Grenade'
import { Campfire, Interactive, Resource } from './Interactive'
import Player from './Player'

export default class Collision {
  constructor() {}

  tileWithPlayer({
    tile,
    player,
  }: {
    tile: Interactive
    player: Player
    enemies: Enemy[]
  }) {
    if (tile instanceof Campfire) {
      this.playerWithCampfire({ player, tile })
    }

    if (tile instanceof Resource) {
      this.playerWithResource({ player, tile })
      this.tileWithBullet({ tile, bullets: player.gun.bullets })
      this.tileWithGrenade({ tile, grenades: player.grenadier.grenades })
    }
  }

  playerWithResource({ player, tile }: { player: Player; tile: Resource }) {
    if (
      rectangleCollision(
        {
          position: {
            x: tile.strictBox.position.x + tile.shift.x,
            y: tile.strictBox.position.y + tile.shift.y,
          },
          width: tile.mapping.box.width,
          height: tile.mapping.box.height,
        },
        {
          position: {
            x: player.position.x + player.velocity.x,
            y: player.position.y,
          },
          width: player.width - Math.abs(player.velocity.x),
          height: player.height - Math.abs(player.velocity.y),
        }
      )
    ) {
      player.position.x -= player.velocity.x
      player.centerPoint.x -= player.velocity.x
    }
    if (
      rectangleCollision(
        {
          position: {
            x: tile.strictBox.position.x + tile.shift.x,
            y: tile.strictBox.position.y + tile.shift.y,
          },
          width: tile.mapping.box.width,
          height: tile.mapping.box.height,
        },
        {
          position: {
            x: player.position.x,
            y: player.position.y + player.velocity.y,
          },
          width: player.width - Math.abs(player.velocity.x),
          height: player.height - Math.abs(player.velocity.y),
        }
      )
    ) {
      player.position.y -= player.velocity.y
      player.centerPoint.y -= player.velocity.y
    }
  }

  playerWithCampfire({ player, tile }: { player: Player; tile: Campfire }) {
    const distance = Math.sqrt(
      Math.pow(tile.center.x + tile.shift.x - player.centerPoint.x, 2) +
        Math.pow(tile.center.y + tile.shift.y - player.centerPoint.y, 2)
    )

    if (
      player.playerHitBoxRadius + tile.radius >= distance &&
      tile.activeTime > 0
    ) {
      player.inCampfireRange = true
      tile.active = true
    } else {
      player.inCampfireRange = false
    }
  }

  tileWithBullet({ tile, bullets }: { tile: Resource; bullets: Bullet[] }) {
    bullets.forEach((bullet, i) => {
      if (
        rectangleCollision(
          {
            position: {
              x: tile.strictBox.position.x + tile.shift.x,
              y: tile.strictBox.position.y + tile.shift.y,
            },
            width: tile.mapping.box.width,
            height: tile.mapping.box.height,
          },
          {
            position: {
              x: bullet.position.x,
              y: bullet.position.y,
            },
            width: bullet.bulletHitBoxRadius * 2,
            height: bullet.bulletHitBoxRadius * 2,
          }
        )
      ) {
        bullet.removeBullet(i)
        tile.hp--
      }
    })
  }

  tileWithGrenade({ tile, grenades }: { tile: Resource; grenades: Grenade[] }) {
    grenades.forEach((grenade) => {
      if (
        grenade.boom &&
        rectangleCollision(
          {
            position: {
              x: tile.strictBox.position.x + tile.shift.x,
              y: tile.strictBox.position.y + tile.shift.y,
            },
            width: tile.mapping.box.width,
            height: tile.mapping.box.height,
          },
          {
            position: {
              x: grenade.position.x - grenade.boomRange / 2,
              y: grenade.position.y - grenade.boomRange / 2,
            },
            width: grenade.boomRange,
            height: grenade.boomRange,
          }
        )
      ) {
        tile.hp -= 3
      }
    })
  }

  enemyWithBullet({
    enemies,
    bullets,
  }: {
    enemies: Enemy[]
    bullets: Bullet[]
  }) {
    bullets.forEach((bullet, i) => {
      enemies.forEach((enemy) => {
        if (
          rectangleCollision(
            {
              position: {
                x: enemy.position.x,
                y: enemy.position.y,
              },
              width: enemy.width,
              height: enemy.height,
            },
            {
              position: {
                x: bullet.position.x,
                y: bullet.position.y,
              },
              width: bullet.bulletHitBoxRadius * 2,
              height: bullet.bulletHitBoxRadius * 2,
            }
          )
        ) {
          bullet.removeBullet(i)
          enemy.health--
        }
      })
    })
  }

  enemiesWithGrenade({
    enemies,
    grenades,
  }: {
    enemies: Enemy[]
    grenades: Grenade[]
  }) {
    grenades.forEach((grenade) => {
      enemies.forEach((enemy) => {
        if (
          grenade.boom &&
          rectangleCollision(
            {
              position: {
                x: enemy.position.x,
                y: enemy.position.y,
              },
              width: enemy.width,
              height: enemy.height,
            },
            {
              position: {
                x: grenade.position.x - grenade.boomRange / 2,
                y: grenade.position.y - grenade.boomRange / 2,
              },
              width: grenade.boomRange,
              height: grenade.boomRange,
            }
          )
        ) {
          enemy.health--
          console.log('boom')
        }
      })
    })
  }
}
