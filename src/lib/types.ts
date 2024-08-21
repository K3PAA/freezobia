import { allowedKeys } from './constants'

export type Point = { x: number; y: number }
export type Box = { position: Point; width: number; height: number }
export type SpriteType = {
    canvas: HTMLCanvasElement,
    position: Point,
    imgSrc?: string,
    scale: number,
    columns?: number,
    maxFrames?: number,
    framesCurrent?: number,
    width: number,
    height: number,
    offSet: Point,
    direction?: number
}

export type AllowedKeysObject = typeof allowedKeys
export type AllowedKeysValues = keyof typeof allowedKeys
