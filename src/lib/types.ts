import { allowedKeys } from './constants'

export type Point = { x: number; y: number }

export type AllowedKeysObject = typeof allowedKeys
export type AllowedKeysValues = keyof typeof allowedKeys
