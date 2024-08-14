import { AllowedKeysObject, Point } from '../lib/types'

type PlayerStates = 'idle' | 'run' | 'shoot'

class PlayerState {
  speed = 5

  velocity: Point = { x: 0, y: 0 }
  state: PlayerStates = 'idle'

  constructor() {
    this.state = 'idle'
  }

  determineState(keys: AllowedKeysObject) {
    switch (true) {
      case keys.KeyA || keys.KeyD || keys.KeyW || keys.KeyS:
        this.state = 'run'
        break

      default:
        this.state = 'idle'
    }
  }

  updateState(keys: AllowedKeysObject) {
    if (keys.KeyA) this.velocity.x = -this.speed
    if (keys.KeyD) this.velocity.x = this.speed
    if (keys.KeyW) this.velocity.y = -this.speed
    if (keys.KeyS) this.velocity.y = this.speed

    if (this.state === 'idle') {
      this.velocity.x = 0
      this.velocity.y = 0
    }
  }
}

export default PlayerState
