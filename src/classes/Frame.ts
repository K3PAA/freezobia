class Frame {
  fps: number
  fi: number
  ft: number

  maxFrame?: number
  currentFrame?: number

  constructor({
    fps,
    maxFrame,
    currentFrame,
  }: {
    fps: number
    maxFrame?: number
    currentFrame?: number
  }) {
    this.fps = fps
    this.fi = 1000 / this.fps
    this.ft = 0

    this.maxFrame = maxFrame
    this.currentFrame = currentFrame
  }

  timeElapsed(time: number) {
    this.ft += time
    if (this.ft >= this.fi) {
      this.ft = 0
    }
    return this.ft === 0
  }

  updateFrame(startFrame = 0) {
    if (!this.maxFrame || !this.currentFrame) return

    this.currentFrame++
    if (this.currentFrame === this.maxFrame) this.currentFrame = startFrame
  }

  setFPS(fps: number) {
    this.fps = fps
    this.fi = 1000 / this.fps
  }
}

export default Frame
