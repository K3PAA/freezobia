import tiles from '../assets/compressed/background/tiles.webp'
import resources from '../assets/compressed/background/resources.webp'
import wood from '../assets/compressed/background/wood.png'
import flames from '../assets/compressed/background/flames.webp'
import construction from '../assets/compressed/background/construction.webp'

export const assets = {
  tiles: tiles,
  campfire: {
    wood: wood,
    fire: flames,
    construction: construction,
  },
  resources: resources,
}

export const RESOURCE_SIZE = 16
export const GAME_TILE_SIZE = 64
export const RESOURCE_RATIO = GAME_TILE_SIZE / RESOURCE_SIZE

export const resourcesMapping = {
  tree: {
    position: { x: 0 * RESOURCE_SIZE, y: 0 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 2 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 18 * RESOURCE_RATIO,
      height: 10 * RESOURCE_RATIO,
      width: 10 * RESOURCE_RATIO,
    },
    hp: 3,
    chance: 25,
    super: null,
  },
  tree_snow: {
    position: { x: 1 * RESOURCE_SIZE, y: 0 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 2 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 18 * RESOURCE_RATIO,
      height: 10 * RESOURCE_RATIO,
      width: 10 * RESOURCE_RATIO,
    },
    hp: 3,
    chance: 100,
    super: null,
  },
  giant_rock: {
    position: { x: 2 * RESOURCE_SIZE, y: 0 * RESOURCE_SIZE },
    width: 2 * RESOURCE_SIZE,
    height: 2 * RESOURCE_SIZE,
    box: {
      x: 6 * RESOURCE_RATIO,
      y: 10 * RESOURCE_RATIO,
      height: 16 * RESOURCE_RATIO,
      width: 18 * RESOURCE_RATIO,
    },
    hp: 13,
    chance: 10,
    super: null,
  },
  rock: {
    position: { x: 4 * RESOURCE_SIZE, y: 0 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 1 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 3 * RESOURCE_RATIO,
      height: 8 * RESOURCE_RATIO,
      width: 10 * RESOURCE_RATIO,
    },
    hp: 5,
    chance: 25,
    super: null,
  },
  small_rock: {
    position: { x: 4 * RESOURCE_SIZE, y: 1 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 1 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 3 * RESOURCE_RATIO,
      height: 10 * RESOURCE_RATIO,
      width: 10 * RESOURCE_RATIO,
    },
    hp: 5,
    chance: 25,
    super: null,
  },
  rock_yellow: {
    position: { x: 6 * RESOURCE_SIZE, y: 0 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 1 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 2 * RESOURCE_RATIO,
      height: 10 * RESOURCE_RATIO,
      width: 10 * RESOURCE_RATIO,
    },
    hp: 2,
    chance: 5,
    super: 'speed',
  },
  rock_red: {
    position: { x: 5 * RESOURCE_SIZE, y: 0 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 1 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 2 * RESOURCE_RATIO,
      height: 10 * RESOURCE_RATIO,
      width: 10 * RESOURCE_RATIO,
    },
    hp: 2,
    chance: 5,
    super: 'health',
  },
  rock_blue: {
    position: { x: 6 * RESOURCE_SIZE, y: 1 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 1 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 2 * RESOURCE_RATIO,
      height: 10 * RESOURCE_RATIO,
      width: 10 * RESOURCE_RATIO,
    },
    hp: 2,
    chance: 5,
    super: 'damage',
  },
  rock_black: {
    position: { x: 5 * RESOURCE_SIZE, y: 1 * RESOURCE_SIZE },
    width: 1 * RESOURCE_SIZE,
    height: 1 * RESOURCE_SIZE,
    box: {
      x: 2 * RESOURCE_RATIO,
      y: 2 * RESOURCE_RATIO,
      height: 10 * RESOURCE_RATIO,
      width: 10 * RESOURCE_RATIO,
    },
    hp: 2,
    chance: 5,
    super: 'granade',
  },
} as const

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
  KeyQ: false,
  Space: false,
}

export const TIME_LIMIT = 60 * 1000
