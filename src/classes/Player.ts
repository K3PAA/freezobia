import { AllowedKeysObject, Box, Point, SpriteType } from '../lib/types'
import Sprite from './Sprite'
import { SPRITES, STATES, Idle, Running } from './PlayerState'
import Frame from './Frame'
import Gun from './Gun'
import { TIME_LIMIT } from '../lib/constants'
import Grenade from './Grenade'

class Player extends Sprite {
  canvas: HTMLCanvasElement
  centerBox: Box
  velocity: Point = { x: 0, y: 0 }
  inCampfireRange = false
  healthInMs = TIME_LIMIT
  health = this.healthInMs / TIME_LIMIT
  collision = { left: false, right: false, top: false, bottom: false }
  aboutToCollide = false
  playerHitBoxRadius: any
  centerPoint: Point
  speed = 5
  direction = 1
  state: any
  previousState: any
  states: any[]
  sprite: any
  frame = new Frame({ fps: 15, currentFrame: 0, maxFrame: 10 })
  moveFrame = new Frame({ fps: 60 })
  gun: Gun
  grenade: Grenade
  isAttacking: boolean
  isThrowingGrenade: boolean

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

    this.gun = new Gun(this, this.canvas, this.direction)
    this.grenade = new Grenade(this)
    this.isAttacking = false
    this.isThrowingGrenade = false

    this.state = null
    this.previousState = null
    this.states = [new Idle(this), new Running(this)]
    this.sprite = null
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
    if (this.inCampfireRange) {
      if (this.healthInMs < TIME_LIMIT) this.healthInMs += time * 4
    } else {
      if (this.healthInMs > 0) this.healthInMs -= time
      else '' //! add dead
    }
    this.health = this.healthInMs / TIME_LIMIT

    if (this.frame.timeElapsed(time)) {
      this.frame.updateFrame()
      this.animateFrames()
    }

    this.gun.updateGun(mousePos, time)
    this.grenade.updateGrenade(mousePos)

    if (!this.moveFrame.timeElapsed(time)) return

    this.state.input(keys)

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
    if (this.sprite !== sprite) {
      this.sprite = sprite
      this.framesCurrent = 0
      this.image.src = sprite.imageSrc
      this.columns = sprite.columns
      this.maxFrames = sprite.maxFrames
      this.frame.setFPS(sprite.fps)
    }
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
    // c.fillStyle = '#fff'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    //* hitbox of player
    // c.beginPath()
    // c.arc(
    //   this.centerPoint.x,
    //   this.centerPoint.y,
    //   this.playerHitBoxRadius,
    //   0,
    //   2 * Math.PI
    // )
    // c.fillStyle = 'rgba(0, 255, 255)'
    // c.fill()

    //* drawing player
    this.drawSprite(c)

    //* drawing gun
    this.gun.drawGun(c)

    //* drawing grenade
    this.grenade.drawGrenade(c)
  }

  attack = async () => {
    if (!this.isAttacking) {
      this.isAttacking = true
      await this.gun.attack()
      this.isAttacking = false
    }
  }

  generateGrenade = () => {
    this.grenade = new Grenade(this)
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
