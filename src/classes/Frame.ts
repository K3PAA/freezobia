class Frame {
  frames = 15
  fi = 1000 / this.frames
  ft = 0

  constructor() {}

  update(time: number) {
    this.ft += time
    if (this.ft >= this.fi) {
      this.ft = 0
    }
    return this.ft === 0
  }
}

export default Frame
