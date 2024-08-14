import { allowedKeys } from '../lib/constants'
import { AllowedKeysObject, AllowedKeysValues } from '../lib/types'

class Input {
  keys: AllowedKeysObject

  constructor() {
    this.keys = allowedKeys

    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
  }

  handleKeyDown(e: KeyboardEvent) {
    if (!(e.code in allowedKeys)) return
    this.keys[e.code as AllowedKeysValues] = true
  }

  handleKeyUp(e: KeyboardEvent) {
    if (!(e.code in allowedKeys)) return
    this.keys[e.code as AllowedKeysValues] = false
  }
}

export default Input
