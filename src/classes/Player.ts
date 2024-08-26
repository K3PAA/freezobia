import { AllowedKeysObject, Box, Point, SpriteType } from '../lib/types'
import Sprite from './Sprite'
import gunImg from '../assets/gun_gun_0.png'
import { lerp } from '../lib/functions'
import { SPRITES, STATES, Idle, Running, Attack } from './PlayerState'
import Frame from './Frame'
import Bullet from './Bullet'

class Player extends Sprite {
  canvas: HTMLCanvasElement
  centerBox: Box

  velocity: Point = { x: 0, y: 0 }

  collision = {
    left: false,
    right: false,
    top: false,
    bottom: false,
  }

  playerHitBoxRadius: any
  centerPoint: Point

  speed = 5
  direction = 1

  playerGun: Sprite
  mouse: Point
  gunAngle: number
  targetAngle: number
  state: any
  previousState: any
  states: any[]
  frame = new Frame({ fps: 15 })
  bullets: any

  moveFrame = new Frame({ fps: 60 })

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
  }: SpriteType) {
    super({
      canvas,
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

    //* player centering
    this.position.x = this.canvas.width / 2 - this.width / 2
    this.position.y = this.canvas.height / 2 - this.height / 2 - this.height

    this.playerHitBoxRadius = Math.max(this.width, this.height) / 3

    this.playerGun = new Sprite({
      canvas,
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

    this.bullets = []

    this.mouse = {
      x: 0,
      y: 0,
    }

    this.gunAngle = 0
    this.targetAngle = 0

    this.state = null
    this.previousState = null
    this.states = [new Idle(this), new Running(this), new Attack(this)]
    this.setState(STATES.IDLE)
    this.setSprite(SPRITES.IDLE)

    this.centerBox = {
      position: {
        x: this.canvas.width / 2 - this.canvas.width / 4 / 2,
        y: this.canvas.height / 4,
      },
      width: this.canvas.width / 4,
      height: this.canvas.height / 2,
    }
    this.centerPoint = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }
  }

  update = ({
    keys,
    mousePos,
    offset,
    time,
  }: {
    keys: AllowedKeysObject
    mousePos: Point
    offset: Point
    time: number
  }) => {
    if (this.frame.timeElapsed(time)) {
      this.animateFrames()
    }

    if (!this.moveFrame.timeElapsed(time)) return

    this.state.input(keys)

    //* mouse position
    this.mouse = {
      x: mousePos.x,
      y: mousePos.y,
    }

    //* gun target angle
    this.targetAngle = Math.atan2(
      this.mouse.y - (this.position.y + this.height / 2),
      this.mouse.x - (this.position.x + this.width / 2)
    )

    //* gun rotation speed and angle
    const lerpSpeed = 0.15
    this.gunAngle = lerp(this.gunAngle, this.targetAngle, lerpSpeed)

    //* changing direction
    if (mousePos.x >= this.position.x + this.width / 2) {
      this.direction = 1
    } else {
      this.direction = -1
    }

    //* checking if the player is in the box
    this.inCenterBox()

    //* player collision right and left
    if (!this.collision.left && !this.collision.right) {
      this.position.x += this.velocity.x
      this.centerPoint.x += this.velocity.x
    } else {
      if (
        (this.collision.left && this.velocity.x > 0) ||
        (this.collision.right && this.velocity.x < 0)
      ) {
        this.position.x += this.velocity.x
      }
      offset.x += this.velocity.x
    }

    //* player collision top and down
    if (!this.collision.top && !this.collision.bottom) {
      this.position.y += this.velocity.y
      this.centerPoint.y += this.velocity.y
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

  setState = (state: any) => {
    //* setting player state
    this.previousState = this.state
    this.state = this.states[state]
  }

  setSprite = (sprite: any) => {
    //* setting player sprite
    this.image.src = sprite.imageSrc
    this.columns = sprite.columns
    this.maxFrames = sprite.maxFrames
    this.frame.setFPS(sprite.fps)
  }

  inCenterBox = () => {
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

  draw = (c: CanvasRenderingContext2D) => {
    //* hitbox of player
    c.fillStyle = '#fff'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    //* hitbox of player
    c.beginPath()
    c.arc(
      this.centerPoint.x,
      this.centerPoint.y,
      this.playerHitBoxRadius,
      0,
      2 * Math.PI
    )
    c.fillStyle = 'rgba(0, 255, 255)'
    c.fill()

    //! change directory
    this.bullets.map((bullet: any) => {
      bullet.draw(c)
      bullet.update()
      if (
        Math.abs(bullet.position.x - this.position.x - this.width / 2) > 750 ||
        Math.abs(bullet.position.y - this.position.y - this.height / 2) > 750
      ) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1)
      }
    })

    //* drawing player
    this.drawSprite(c)

    //* drawing centerbox
    // this.drawCenterBox(c)

    //* drawing weapon sight
    c.beginPath()
    c.moveTo(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    if (this.state.state === 'RUNNING') {
      c.arc(
        this.position.x + this.width / 2,
        this.position.y + this.height / 2,
        100,
        this.gunAngle - 0.6,
        this.gunAngle + 0.6
      )
    } else {
      c.arc(
        this.position.x + this.width / 2,
        this.position.y + this.height / 2,
        200,
        this.gunAngle - 0.15,
        this.gunAngle + 0.15
      )
    }
    c.fillStyle = 'rgb(0, 0, 0, 0.15)'
    c.fill()

    //* gun movement
    c.save()
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    c.rotate(this.gunAngle)
    c.scale(-1, this.direction)

    //* gun position
    this.playerGun.position = {
      x: -this.playerGun.width / 2,
      y: -this.playerGun.height / 2,
    }

    //* drawing gun
    this.playerGun.drawSprite(c)
    c.restore()
  }

  attack = () => {
    const bullet = new Bullet({
      canvas: this.canvas,
      position: {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height / 2,
      },
      width: 4,
      height: 8,
      offSet: {
        x: 0,
        y: 0,
      },
      scale: 1,
      angle: this.gunAngle,
    })
    this.bullets.push(bullet)
  }

  drawCenterBox = (c: CanvasRenderingContext2D) => {
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
