import Game from './classes/Game'
import './style.css'

const canvas = document.querySelector('canvas')!
canvas.width = 1024
canvas.height = 512
const c = canvas.getContext('2d')!
c.imageSmoothingEnabled = false

window.addEventListener('load', () => {
  const game = new Game({ canvas })

  let prevTimeStamp = 0

  const animate = (timeStamp: number) => {
    const timeStampDiff = timeStamp - prevTimeStamp
    prevTimeStamp = timeStamp

    game.update(timeStampDiff)
    game.draw(c)

    requestAnimationFrame(animate)
  }

  animate(0)
})
