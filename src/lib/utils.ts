import { Box } from './types'

export const randomRGB = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  return `rgb(${r}, ${g}, ${b})`
}

export const randomRGBA = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  return `rgba(${r}, ${g}, ${b}, 0.4)`
}

export const rectangleCollision = (rect1: Box, rect2: Box) => {
  return (
    rect1.position.x + rect1.width > rect2.position.x &&
    rect1.position.y + rect1.height > rect2.position.y &&
    rect1.position.x < rect2.position.x + rect2.width &&
    rect1.position.y < rect2.position.y + rect2.height
  )
}
