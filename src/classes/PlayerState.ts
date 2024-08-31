import { AllowedKeysObject } from '../lib/types'
import animation from '../assets/compressed/player/char_animation.webp'

const SPRITES = {
  IDLE: {
    imageSrc: animation,
    columns: 8,
    maxFrames: 8,
    fps: 0,
  },
  RUNNING: {
    imageSrc: animation,
    columns: 8,
    maxFrames: 8,
    fps: 8,
  },
}

const STATES = {
  IDLE: 0,
  RUNNING: 1,
}

class State {
  player: any
  state: any
  constructor({ player, state }: any) {
    this.player = player
    this.state = state
  }
}

class Idle extends State {
  constructor(player: any) {
    super({
      player,
      state: 'IDLE',
    })
  }

  input = (keys: AllowedKeysObject) => {
    if (!keys.KeyW && !keys.KeyA && !keys.KeyS && !keys.KeyD) {
      this.player.setSprite(SPRITES.IDLE)

      this.player.velocity.x = 0
      this.player.velocity.y = 0
    }
    if (keys.Space) {
      this.player.grenade.isThrown = true
      // this.player.attack()
      // this.player.setState(STATES.ATTACK)
    }
    if (keys.KeyW || keys.KeyA || keys.KeyS || keys.KeyD) {
      this.player.setState(STATES.RUNNING)
      this.player.setSprite(SPRITES.RUNNING)
    }
  }
}

class Running extends State {
  constructor(player: any) {
    super({
      player,
      state: 'RUNNING',
    })
  }

  input = (keys: AllowedKeysObject) => {
    if (keys.KeyW || keys.KeyA || keys.KeyS || keys.KeyD) {

      this.player.velocity.x = 0
      this.player.velocity.y = 0

      if (keys.KeyA) {
        this.player.velocity.x = -this.player.speed
      }
      if (keys.KeyD) {
        this.player.velocity.x = this.player.speed
      }
      if (keys.KeyW) {
        this.player.velocity.y = -this.player.speed
      }
      if (keys.KeyS) {
        this.player.velocity.y = this.player.speed
      }
    }
    if (keys.Space) {
      this.player.attack()
      // this.player.setState(STATES.ATTACK)
    }
    if (!keys.KeyW && !keys.KeyA && !keys.KeyS && !keys.KeyD) {
      this.player.setState(STATES.IDLE)
    }
  }
}

export { SPRITES, STATES, Idle, Running }
