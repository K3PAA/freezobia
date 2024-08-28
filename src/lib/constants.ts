import tiles from '../assets/compressed/tiles.png'
import resources from '../assets/compressed/resources.png'
import wood from '../assets/compressed/wood.png'
import flames from '../assets/compressed/flames.png'
import construction from '../assets/compressed/construction.png'

export const assets = {
  tiles: tiles,
  campfire: {
    wood: wood,
    fire: flames,
    construction: construction,
  },
  resources: resources,
}

const RESOURCE_SIZE = 16
export const GAME_TILE_SIZE = 64
export const RESOURCE_RATIO = GAME_TILE_SIZE / RESOURCE_SIZE

export const resourcesMapping = {
  tree: {
    position: { x: 0 * RESOURCE_SIZE, y: 0 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 2 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 8 * RESOURCE_RATIO,
      height: 20 * RESOURCE_RATIO,
      width: 12 * RESOURCE_RATIO,
    },
    chance: 25,
  },
  tree_snow: {
    position: { x: 1 * RESOURCE_SIZE, y: 0 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 2 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 8 * RESOURCE_RATIO,
      height: 20 * RESOURCE_RATIO,
      width: 12 * RESOURCE_RATIO,
    },
    chance: 100,
  },
  giant_rock: {
    position: { x: 2 * RESOURCE_SIZE, y: 0 * RESOURCE_SIZE },
    width: 2 * RESOURCE_SIZE,
    height: 2 * RESOURCE_SIZE,
    box: {
      x: 6 * RESOURCE_RATIO,
      y: 2 * RESOURCE_RATIO,
      height: 25 * RESOURCE_RATIO,
      width: 20 * RESOURCE_RATIO,
    },
    chance: 10,
  },
  rock: {
    position: { x: 4 * RESOURCE_SIZE, y: 0 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 1 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 1 * RESOURCE_RATIO,
      height: 10 * RESOURCE_RATIO,
      width: 11 * RESOURCE_RATIO,
    },
    chance: 25,
  },
  small_rock: {
    position: { x: 4 * RESOURCE_SIZE, y: 1 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 1 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 1 * RESOURCE_RATIO,
      height: 13 * RESOURCE_RATIO,
      width: 11 * RESOURCE_RATIO,
    },
    chance: 25,
  },
  rock_red: {
    position: { x: 6 * RESOURCE_SIZE, y: 0 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 1 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 0 * RESOURCE_RATIO,
      height: 12 * RESOURCE_RATIO,
      width: 12 * RESOURCE_RATIO,
    },
    chance: 2,
  },
  rock_yellow: {
    position: { x: 5 * RESOURCE_SIZE, y: 0 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 1 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 0 * RESOURCE_RATIO,
      height: 12 * RESOURCE_RATIO,
      width: 12 * RESOURCE_RATIO,
    },
    chance: 2,
  },
  rock_black: {
    position: { x: 6 * RESOURCE_SIZE, y: 1 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 1 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 0 * RESOURCE_RATIO,
      height: 12 * RESOURCE_RATIO,
      width: 12 * RESOURCE_RATIO,
    },
    chance: 2,
  },
  rock_blue: {
    position: { x: 5 * RESOURCE_SIZE, y: 1 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 1 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 0 * RESOURCE_RATIO,
      height: 12 * RESOURCE_RATIO,
      width: 12 * RESOURCE_RATIO,
    },
    chance: 2,
  },
}

export const resourcesTotalChances = Object.values(resourcesMapping).reduce(
  (acc, cur) => {
    return acc + cur.chance
  },
  0
)

export const BLOCKED_TILE = 100

export const allowedKeys = {
  KeyA: false,
  KeyD: false,
  KeyS: false,
  KeyW: false,
  Space: false,
}
