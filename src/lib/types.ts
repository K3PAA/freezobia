import Player from '../classes/Player';
import { allowedKeys, resourcesMapping } from './constants'

export type Point = { x: number; y: number }
export type Box = { position: Point; width: number; height: number }
export type SpriteClassType = {
  canvas: HTMLCanvasElement
  position: Point
  imgSrc?: string
  scale: number
  columns?: number
  maxFrames?: number
  framesCurrent?: number
  width: number
  height: number
  offSet: Point
  direction?: number
}
export type StateType = {
  player: Player
  state: string
  input: any
}
export type SpriteType = {
  imageSrc: string
  columns: number
  maxFrames: number
  fps: number
}
export type ResourceTypes = keyof typeof resourcesMapping

export type AllowedKeysObject = typeof allowedKeys
export type AllowedKeysValues = keyof typeof allowedKeys
