import Game from './classes/Game'
import './style.css'

const canvas = document.querySelector('canvas')!
canvas.width = Math.min(Math.max(1000, window.innerWidth), 2000)
canvas.height = Math.min(Math.max(500, window.innerHeight), 1200)
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
