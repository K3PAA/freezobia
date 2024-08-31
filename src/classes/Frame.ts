class Frame {
  fps: number
  fi: number
  ft: number

  maxFrame?: number
  currentFrame: number

  constructor({
    fps,
    maxFrame,
    currentFrame = 0,
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
    if (!this.maxFrame || (!this.currentFrame && this.currentFrame !== 0))
      return

    this.currentFrame++
    if (this.currentFrame === this.maxFrame) this.currentFrame = startFrame
  }

  startCounting() {
    this.updateFrame(0)
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (this.currentFrame === 0) {
          resolve(true)
          clearInterval(intervalId)
        }
      }, 100)
    })
  }

  setFPS(fps: number) {
    this.fps = fps
    this.fi = 1000 / this.fps
  }
}

export default Frame
