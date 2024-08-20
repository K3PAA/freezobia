import tiles from '../assets/snow/tiles.png'
import fire_place from '../assets/snow/fire_place.png'
import fire from '../assets/snow/fire.png'
import resources from '../assets/snow/resources.png'

export const assets = {
  tiles: tiles,
  fire_place: fire_place,
  fire: fire,
  resources: resources,
}

export const resourcesMapping = {
  tree: {
    position: { x: 0, y: 0 },
    width: 1,
    height: 2,
  },
  tree_snow: {
    position: { x: 1, y: 0 },
    width: 1,
    height: 2,
  },
  giant_rock: {
    position: { x: 2, y: 0 },
    width: 2,
    height: 2,
  },
  rock: {
    position: { x: 3, y: 0 },
    width: 1,
    height: 1,
  },
  small_rock: {
    position: { x: 3, y: 1 },
    width: 1,
    height: 1,
  },
}

export const allowedKeys = {
  KeyA: false,
  KeyD: false,
  KeyS: false,
  KeyW: false,
  Space: false,
}
