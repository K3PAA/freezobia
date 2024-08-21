import { AllowedKeysObject, Box, Point } from '../lib/types'
import Sprite from './Sprite'
import gunImg from '../assets/gun_gun_0.png'
import { lerp } from '../lib/functions'

type PlayerStates = 'idle' | 'run' | 'shoot'

class Player extends Sprite {
  canvas: HTMLCanvasElement
  centerBox: Box

  width = 2 * 8 * 3
  height = 3 * 8 * 3
  offSet: Point = { x: 0, y: 32 }
  position: Point = { x: 0, y: 0 }
  acceleration: Point = { x: 0.5, y: 0.1 }
  velocity: Point = { x: 0, y: 0 }

  collision = {
    left: false,
    right: false,
    top: false,
    bottom: false,
  }

  speed = 5
  direction = 1

  state: PlayerStates = 'idle'
  playerGun: Sprite
  mouse: Point
  gunAngle: number
  targetAngle: number

  constructor({
    canvas,
    position,
    imgSrc,
    scale = 3,
    columns = 8,
    maxFrames = 8,
    width,
    height,
    offSet,
    direction,
  }: any) {
    super({
      position,
      imgSrc,
      scale,
      columns,
      maxFrames,
      width,
      height,
      offSet,
      direction,
    })
    this.canvas = canvas

    this.position.x = this.canvas.width / 2 - this.width / 2
    this.position.y = this.canvas.height / 2 - this.height / 2

    this.playerGun = new Sprite({
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      imgSrc: gunImg,
      scale: 3,
      offSet: {
        x: 0,
        y: 5,
      },
      width: 10,
      height: 20,
    })

    this.mouse = {
      x: 0,
      y: 0,
    }

    this.gunAngle = 0
    this.targetAngle = 0

    this.centerBox = {
      position: {
        x: this.canvas.width / 2 - this.canvas.width / 4 / 2,
        y: this.canvas.height / 4,
      },
      width: this.canvas.width / 4,
      height: this.canvas.height / 2,
    }
  }

  update({
    keys,
    mousePos,
    offset,
  }: {
    keys: AllowedKeysObject
    mousePos: Point
    offset: Point
  }) {
    this.mouse = {
      x: mousePos.x,
      y: mousePos.y,
    }

    this.targetAngle = Math.atan2(
      this.mouse.y - (this.position.y + this.height / 2),
      this.mouse.x - (this.position.x + this.width / 2)
    )

    const lerpSpeed = 0.15
    this.gunAngle = lerp(this.gunAngle, this.targetAngle, lerpSpeed)

    if (mousePos.x >= this.position.x + this.width / 2) {
      this.direction = 1
    } else {
      this.direction = -1
    }

    switch (true) {
      case keys.KeyW || keys.KeyS:
        this.state = 'run'
        break
      case keys.KeyA:
        this.state = 'run'
        // this.direction = -1;
        break
      case keys.KeyD || keys.KeyW || keys.KeyS:
        this.state = 'run'
        // this.direction = 1;
        break
      default:
        this.state = 'idle'
    }

    if (keys.KeyA) this.velocity.x = -this.speed
    else if (keys.KeyD) this.velocity.x = this.speed
    else this.velocity.x = 0

    if (keys.KeyW) this.velocity.y = -this.speed
    else if (keys.KeyS) this.velocity.y = this.speed
    else this.velocity.y = 0

    if (this.state === 'idle') {
      this.velocity.x = 0
      this.velocity.y = 0
    }

    this.inCenterBox()

    if (!this.collision.left && !this.collision.right) {
      this.position.x += this.velocity.x
    } else {
      if (
        (this.collision.left && this.velocity.x > 0) ||
        (this.collision.right && this.velocity.x < 0)
      ) {
        this.position.x += this.velocity.x
      }
      offset.x += this.velocity.x
    }

    if (!this.collision.top && !this.collision.bottom) {
      this.position.y += this.velocity.y
    } else {
      if (
        (this.collision.top && this.velocity.y > 0) ||
        (this.collision.bottom && this.velocity.y < 0)
      ) {
        this.position.y += this.velocity.y
      }
      offset.y += this.velocity.y
    }
  }

  inCenterBox() {
    if (this.position.x + this.velocity.x < this.centerBox.position.x) {
      this.collision.left = true
    } else if (
      this.position.x + this.width + this.velocity.x >
      this.centerBox.position.x + this.centerBox.width
    ) {
      this.collision.right = true
    } else {
      this.collision.left = false
      this.collision.right = false
    }

    if (this.position.y + this.velocity.y < this.centerBox.position.y) {
      this.collision.top = true
    } else if (
      this.position.y + this.height + this.velocity.y >
      this.centerBox.position.y + this.centerBox.height
    ) {
      this.collision.bottom = true
    } else {
      this.collision.top = false
      this.collision.bottom = false
    }
  }

  draw(c: CanvasRenderingContext2D) {
    // c.fillStyle = "#fff";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);

    this.drawSprite(c)
    this.animateFrames()

    this.drawCenterBox(c)

    c.beginPath()
    c.moveTo(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    c.arc(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2,
      100,
      this.gunAngle - 0.7,
      this.gunAngle + 0.3
    )
    c.lineTo(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    c.fillStyle = 'rgb(0, 0, 0, 0.2)'
    c.fill()
    c.stroke()

    c.save()

    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    c.rotate(this.gunAngle)
    c.scale(-1, this.direction)

    this.playerGun.position = {
      x: -this.playerGun.width / 2,
      y: -this.playerGun.height / 2,
    }
    this.playerGun.drawSprite(c)

    c.restore()

    this.playerGun.position = {
      x: this.position.x,
      y: this.position.y,
    }
  }

  drawCenterBox(c: CanvasRenderingContext2D) {
    c.fillStyle = 'rgba(155, 155, 0, 0.2)'
    c.fillRect(
      this.centerBox.position.x,
      this.centerBox.position.y,
      this.centerBox.width,
      this.centerBox.height
    )
  }
}

export default Player
