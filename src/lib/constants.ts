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

export const resourcesMapping = {
  tree: {
    position: { x: 0, y: 0 },
    width: 1,
    height: 2,
    chance: 25,
  },
  tree_snow: {
    position: { x: 1, y: 0 },
    width: 1,
    height: 2,
    chance: 100,
  },
  giant_rock: {
    position: { x: 2, y: 0 },
    width: 2,
    height: 2,
    chance: 10,
  },
  rock: {
    position: { x: 4, y: 0 },
    width: 1,
    height: 1,
    chance: 25,
  },
  small_rock: {
    position: { x: 4, y: 1 },
    width: 1,
    height: 1,
    chance: 25,
  },
  rock_red: {
    position: { x: 6, y: 0 },
    width: 1,
    height: 1,
    chance: 2,
  },
  rock_yellow: {
    position: { x: 5, y: 0 },
    width: 1,
    height: 1,
    chance: 2,
  },
  rock_black: {
    position: { x: 6, y: 1 },
    width: 1,
    height: 1,
    chance: 2,
  },
  rock_blue: {
    position: { x: 5, y: 1 },
    width: 1,
    height: 1,
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
