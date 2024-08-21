import { allowedKeys, resourcesMapping } from './constants'

export type Point = { x: number; y: number }
export type Box = { position: Point; width: number; height: number }
export type Sprite = {}
export type ResourceTypes = keyof typeof resourcesMapping

export type AllowedKeysObject = typeof allowedKeys
export type AllowedKeysValues = keyof typeof allowedKeys
