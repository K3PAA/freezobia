import { Point } from '../lib/types'
import Player from './Player'

class Grenade {
  player: Player
  position: Point
  velocity: Point
  gravity: number
  wind: number
  isThrown: boolean
  startPoint: Point
  endPoint: Point
  t: number

  constructor(player: Player) {
    this.player = player
    this.position = {
      x: this.player.position.x + this.player.width / 2,
      y: this.player.position.y + this.player.height / 2,
    }
    this.gravity = 0.5
    this.wind = 0
    this.isThrown = false

    this.velocity = { x: 0, y: 0 }
    this.startPoint = { x: 0, y: 0 } // Punkt początkowy lotu
    this.endPoint = { x: 0, y: 0 }   // Punkt końcowy lotu
    this.t = 0
  }

  updateGrenade(mousePos: Point) {
    this.position = { x: this.player.position.x, y: this.player.position.y }
    if (!this.isThrown) {
      // Ustaw punkt początkowy na aktualną pozycję gracza
      this.startPoint = {
        x: this.player.position.x + this.player.width / 2,
        y: this.player.position.y + this.player.height / 2,
      }

      // Ustaw punkt końcowy na pozycję kursora w momencie rzutu
      this.endPoint = { x: mousePos.x, y: mousePos.y }
      this.t = 0 // Reset czasu lotu
    }
    if (this.isThrown) {
      this.t += 0.02 // Prędkość lotu

      if (this.t > 1) {
        this.t = 1
        this.isThrown = false // Koniec lotu
        this.player.generateGrenade() // Generowanie nowego granatu po rzucie
      }

      // Parametryzacja krzywej kwadratowej Béziera
      const startX = this.startPoint.x
      const startY = this.startPoint.y
      
      // Zmniejszamy odległość `controlX` od gracza, aby był bliżej
      const controlX = this.startPoint.x + Math.abs(this.startPoint.x - this.endPoint.x) * 0.5 * this.player.direction

      // Logika dla ustawienia `controlY`
      let controlY: number;
      if (this.endPoint.y < this.startPoint.y) {
        // Jeśli kursor jest nad graczem, umieść punkt kontrolny wyżej
        controlY = this.startPoint.y - Math.abs(this.startPoint.y - this.endPoint.y) * 1.5;
      } else {
        // Jeśli kursor jest poniżej gracza, umieść punkt kontrolny na połowie różnicy wysokości
        controlY = this.startPoint.y - Math.abs(this.startPoint.y - this.endPoint.y) * 0.5;
      }

      const endX = this.endPoint.x
      const endY = this.endPoint.y

      // Aktualizacja pozycji granatu
      this.position.x =
        (1 - this.t) * (1 - this.t) * startX +
        2 * (1 - this.t) * this.t * controlX +
        this.t * this.t * endX
      this.position.y =
        (1 - this.t) * (1 - this.t) * startY +
        2 * (1 - this.t) * this.t * controlY +
        this.t * this.t * endY
    }
  }

  drawGrenade(c: CanvasRenderingContext2D) {
    if (this.isThrown) {
      c.beginPath()
      c.moveTo(this.startPoint.x, this.startPoint.y)
      c.quadraticCurveTo(
        this.startPoint.x + Math.abs(this.startPoint.x - this.endPoint.x) * 0.5 * this.player.direction,
        this.endPoint.y < this.startPoint.y ? 
            this.startPoint.y - Math.abs(this.startPoint.y - this.endPoint.y) * 1.5 : 
            this.startPoint.y - Math.abs(this.startPoint.y - this.endPoint.y) * 0.5,
        this.endPoint.x,
        this.endPoint.y
      )
      c.stroke()
    }

    c.fillStyle = 'green'
    c.beginPath()
    c.arc(this.position.x, this.position.y, 25, 0, Math.PI * 2)
    c.fill()
  }
}

export default Grenade
