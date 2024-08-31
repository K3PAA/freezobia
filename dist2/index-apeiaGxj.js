var i = Object.defineProperty,
  t = (t, s, e) =>
    ((t, s, e) =>
      s in t
        ? i(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e })
        : (t[s] = e))(t, 'symbol' != typeof s ? s + '' : s, e)
const s =
    'data:image/webp;base64,UklGRk4AAABXRUJQVlA4TEIAAAAvT8ADAA9wZ/Vbp/+4ff4DDwwiSXLS5IwmJCAJaSflJbwIsoKI/k+Af5co4RiT4KyMFUhcaPPKhmgz9oKQyzOy/wI=',
  e = {
    wood: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADxJREFUeNpjcC/wYaAEM4waMBgNKI52+g/CuNh4DUjwtv0PU4iPTTsDfO0t4ArxsYevFxCuAGFcbKonJADLRUigst4GXgAAAABJRU5ErkJggg==',
    fire: 'data:image/webp;base64,UklGRooAAABXRUJQVlA4TH0AAAAvP8ADEB8gICH8/+ON7BLaEOb/WzVdTdsGTDoIlj+P3vMfANu/LDiqbdtNdkLvSIgEpumRgoBIownojBHzBWROMxDR/0XwQ31gDTEAekSQkDQ8e4Q5G9xXhBVdj7DiVXNaslvR1YSMc8Wu4lxxzthltBm7jF1K+/a3kzf/fwA=',
    construction:
      'data:image/webp;base64,UklGRqIAAABXRUJQVlA4TJYAAAAvL8ALAA/wM+d/WT/veP7jweA2tm1V+f4heq8GLCIkdC/DpQtogZK0Ek9fjMtBK7gnov+K3LZtktPo5DOsr9MsRETpsohE9IhkRO/2HEZ0KsFexBSyPKlpPJ1ZusVYllWnuLqy4UyvJF3DK5VMnhHFwAKXFC9Xjp3i4crmn96JB8Fr//ROFEANlEElEEO9F0lUReGv/QU=',
  },
  h =
    'data:image/webp;base64,UklGRoYCAABXRUJQVlA4THoCAAAvb8AHEHegJgDQBDrQwCLQvwTfPvfVURMASMO4yEAUmhAbNcT2W5/aACAbNrvV/yf4hR+k9yzzHwCgTL9qWDVEGCginYW+avvLDP4q2BA6M51cCOQ62+a4ykjutju5n8pyZek7cch4Knfk0Ga4gbFcEld0iMpU3rOOP+ECOCVdTh1Spku+B/7/n/Xa4gIi+g/BjSRFkmuPIYbqE2aO06WkMDAPxKMCn6PAhGimQ4zPpuuwlCUS+LyUkQQmHCh7JRyABYrIMTDCK7x/IoHP+P60LLClrPAg2KcDwEf26yDwcybItVw47fljIZV5erEfwGNdwXysAw2xjs8NYuuYNEh1KTFRoBzPw8j7z1FgIgFDQd8ysgs0BSVFVOBVFPistMNaJmp2MSuGBVKa3vecCryKAp97rNsOYSjPU83a3ehCrYt1/U9BPJgeYCGENWGtXVQIXmZd/7gOAJUyAbobQouMoRvWVkk4NGIzTftumrYyY2o30rSaacgZkFdmE9I0DOU309TuFnGza4VwV1StvVFKl4iSqXuvpDxCAqLeBHrey98Jih8E6pAOnCKKvz2Mvq3Jf5B/oLhoJbuuE+39KRW4F3hGHLA8o5KQq0wH98cSuIxjfZbyjKJAIUz1cAd4wM5vACcYCYoDEbUXSl2pTHNhYExOe3vk4oDmNBJN1ks0sOubABgE4oAg3xQ9cor3fpnYOjoNYus4JQE8++cRooCSkxyj7wEmspSpfe9Ee3/Ku1IMQIIqRuupH+SaBC57V+YL/SmP08j31tFjTd+J9v5yT+REDgUBNZApOnZ5EsrsPwAUBUoMkDc9VeL9nyFQ6hN1reY/+kzMfzMG',
  a = 16,
  o = {
    tree: {
      position: { x: 0, y: 0 },
      width: 16,
      height: 32,
      box: { x: 8, y: 72, height: 40, width: 40 },
      chance: 25,
    },
    tree_snow: {
      position: { x: 16, y: 0 },
      width: 16,
      height: 32,
      box: { x: 8, y: 72, height: 40, width: 40 },
      chance: 100,
    },
    giant_rock: {
      position: { x: 32, y: 0 },
      width: 32,
      height: 32,
      box: { x: 24, y: 40, height: 64, width: 72 },
      chance: 10,
    },
    rock: {
      position: { x: 64, y: 0 },
      width: 16,
      height: 16,
      box: { x: 8, y: 12, height: 32, width: 40 },
      chance: 25,
    },
    small_rock: {
      position: { x: 64, y: 16 },
      width: 16,
      height: 16,
      box: { x: 8, y: 12, height: 40, width: 40 },
      chance: 25,
    },
    rock_red: {
      position: { x: 96, y: 0 },
      width: 16,
      height: 16,
      box: { x: 8, y: 0, height: 48, width: 40 },
      chance: 2,
    },
    rock_yellow: {
      position: { x: 80, y: 0 },
      width: 16,
      height: 16,
      box: { x: 8, y: 0, height: 48, width: 40 },
      chance: 2,
    },
    rock_black: {
      position: { x: 96, y: 16 },
      width: 16,
      height: 16,
      box: { x: 8, y: 0, height: 48, width: 40 },
      chance: 2,
    },
    rock_blue: {
      position: { x: 80, y: 16 },
      width: 16,
      height: 16,
      box: { x: 8, y: 0, height: 48, width: 40 },
      chance: 2,
    },
  },
  r = Object.values(o).reduce((i, t) => i + t.chance, 0),
  n = 100,
  l = { KeyA: !1, KeyD: !1, KeyS: !1, KeyW: !1, Space: !1 },
  c = 13e3
class d {
  constructor({ fps: i, maxFrame: s, currentFrame: e }) {
    t(this, 'fps'),
      t(this, 'fi'),
      t(this, 'ft'),
      t(this, 'maxFrame'),
      t(this, 'currentFrame'),
      (this.fps = i),
      (this.fi = 1e3 / this.fps),
      (this.ft = 0),
      (this.maxFrame = s),
      (this.currentFrame = e)
  }
  timeElapsed(i) {
    return (this.ft += i), this.ft >= this.fi && (this.ft = 0), 0 === this.ft
  }
  updateFrame(i = 0) {
    this.maxFrame &&
      (this.currentFrame || 0 === this.currentFrame) &&
      (this.currentFrame++,
      this.currentFrame === this.maxFrame && (this.currentFrame = i))
  }
  setFPS(i) {
    ;(this.fps = i), (this.fi = 1e3 / this.fps)
  }
}
class y {
  constructor({ tileSize: i, position: s }) {
    t(this, 'shift', { x: 0, y: 0 }),
      t(this, 'tileSize'),
      t(this, 'position'),
      t(this, 'activeTime', c),
      (this.tileSize = i),
      (this.position = s)
  }
  setShift(i) {
    this.shift = i
  }
}
class p extends y {
  constructor({ tileSize: i, position: s, width: h, height: a }) {
    super({ tileSize: i, position: s }),
      t(this, 'construction', new Image()),
      t(this, 'fire', new Image()),
      t(this, 'wood', new Image()),
      t(this, 'active', !1),
      t(this, 'frame', new d({ fps: 5, maxFrame: 4, currentFrame: 0 })),
      t(this, 'width'),
      t(this, 'height'),
      t(this, 'radius', 250),
      t(this, 'shift', { x: 0, y: 0 }),
      t(this, 'center', { x: 0, y: 0 }),
      (this.width = h),
      (this.height = a),
      (this.construction.src = e.construction),
      (this.fire.src = e.fire),
      (this.wood.src = e.wood),
      (this.center = {
        x: this.position.x + 1.5 * this.tileSize,
        y: this.position.y + 1.5 * this.tileSize,
      })
  }
  update({ time: i }) {
    this.activeTime <= 0 && (this.active = !1),
      this.active && this.activeTime >= 0 && (this.activeTime -= i),
      this.frame.timeElapsed(i) && this.frame.updateFrame()
  }
  draw(i) {
    this.drawFirePlace(i),
      this.drawWood(i),
      this.active && this.drawActiveIndicator(i),
      this.activeTime > 0 && this.drawFire(i),
      this.drawCircleRangeIndicator(i),
      this.activeTimeIndicator(i)
  }
  drawActiveIndicator(i) {
    i.beginPath(),
      i.arc(
        this.center.x + this.shift.x,
        this.center.y + this.shift.y,
        this.radius,
        0,
        2 * Math.PI
      ),
      (i.fillStyle = 'rgba(255, 100, 100, 0.05)'),
      i.fill()
  }
  activeTimeIndicator(i) {
    ;(i.fillStyle = 'rgba(0, 20, 122, 0.9)'),
      i.fillRect(
        this.position.x + this.width / 4 + this.shift.x,
        this.position.y - this.tileSize / 4 + this.shift.y,
        this.width / 2,
        15
      ),
      (i.fillStyle = 'rgba(220, 50, 50, 1)'),
      i.fillRect(
        this.position.x + this.width / 4 + this.shift.x,
        this.position.y - this.tileSize / 4 + this.shift.y,
        Math.max(((this.activeTime / c) * this.width) / 2, 0),
        15
      )
  }
  drawFirePlace(i) {
    i.drawImage(
      this.construction,
      0,
      0,
      this.construction.width,
      this.construction.height,
      this.position.x + this.shift.x,
      this.position.y + this.shift.y,
      this.width,
      this.height
    )
  }
  drawCircleRangeIndicator(i) {
    i.beginPath(),
      i.arc(
        this.center.x + this.shift.x,
        this.center.y + this.shift.y,
        this.radius,
        0,
        2 * Math.PI
      ),
      i.setLineDash([4, 16]),
      i.stroke()
  }
  drawWood(i) {
    i.drawImage(
      this.wood,
      0,
      0,
      16,
      16,
      this.position.x + this.shift.x + this.tileSize - 16,
      this.position.y + this.shift.y + this.tileSize / 2,
      1.5 * this.tileSize,
      1.5 * this.tileSize
    )
  }
  drawFire(i) {
    i.drawImage(
      this.fire,
      16 * this.frame.currentFrame,
      0,
      16,
      16,
      this.position.x + this.shift.x + this.tileSize - 16,
      this.position.y + this.shift.y + this.tileSize / 2,
      1.5 * this.tileSize,
      1.5 * this.tileSize
    )
  }
}
class g extends y {
  constructor({ tileSize: i, position: s, type: e }) {
    super({ tileSize: i, position: s }),
      t(this, 'image', new Image()),
      t(this, 'type'),
      t(this, 'mapping'),
      t(this, 'strictBox'),
      (this.tileSize = i),
      (this.position = s),
      (this.type = e),
      (this.image.src = h),
      (this.mapping = o[e]),
      (this.strictBox = {
        position: {
          x: this.position.x + this.mapping.box.x,
          y: this.position.y + this.mapping.box.y,
        },
        width: this.mapping.box.width,
        height: this.mapping.box.height,
      })
  }
  draw(i) {
    this.drawResource(i), this.drawResource(i)
  }
  drawResource(i) {
    i.drawImage(
      this.image,
      this.mapping.position.x,
      this.mapping.position.y,
      this.mapping.width,
      this.mapping.height,
      this.position.x + this.shift.x,
      this.position.y + this.shift.y,
      (this.mapping.width / a) * this.tileSize,
      (this.mapping.height / a) * this.tileSize
    )
  }
  drawCollisionBox(i) {
    ;(i.fillStyle = 'rgba(255, 0, 0, 0.2)'),
      i.fillRect(
        this.strictBox.position.x + this.shift.x,
        this.strictBox.position.y + this.shift.y,
        this.mapping.box.width,
        this.mapping.box.height
      )
  }
}
class A {
  constructor({ boardDimensions: i, tileSize: s, centerArray: e }) {
    t(this, 'boardDimensions'),
      t(this, 'backgroundArray'),
      t(this, 'interactiveArray', []),
      t(this, 'tileSize'),
      t(this, 'centerArray'),
      t(this, 'shift', { x: 0, y: 0 }),
      (this.tileSize = s),
      (this.boardDimensions = i),
      (this.centerArray = e),
      (this.backgroundArray = this.generateFloorTiles()),
      (this.interactiveArray = this.generateInteractiveTiles())
  }
  setShift(i) {
    this.shift = i
  }
  generateFloorTiles() {
    const i = []
    for (let t = 0; t < this.boardDimensions.y; t++) {
      const t = []
      for (let i = 0; i < this.boardDimensions.x; i++) {
        const i =
          0 === Math.floor(1.1 * Math.random())
            ? 0
            : Math.floor(4 * Math.random()) + 1
        t.push(i)
      }
      i.push(t)
    }
    return i
  }
  generateInteractiveTiles() {
    const i = [],
      t = this.createCampfire()
    i.push(
      new p({
        tileSize: this.tileSize,
        position: t.position,
        width: t.width,
        height: t.height,
      })
    )
    for (let s = 0; s < this.boardDimensions.y - 1; s++)
      for (let e = 0; e < this.boardDimensions.x - 1; e++) {
        if (
          this.backgroundArray[s][e] ||
          this.inCampfireRange(t, {
            x: e * this.tileSize,
            y: s * this.tileSize,
          })
        )
          continue
        if (!Math.floor(1.2 * Math.random())) continue
        const h = this.getRandomChanceIndex(),
          r = { width: o[h].width, height: o[h].height }
        this.backgroundArray[s + 1][e] !== n &&
          this.backgroundArray[s][e + 1] !== n &&
          (r.width / a == 2 && r.height / a == 2
            ? ((this.backgroundArray[s][e + 1] = n),
              (this.backgroundArray[s + 1][e] = n),
              (this.backgroundArray[s + 1][e + 1] = n))
            : r.width / a == 2
            ? (this.backgroundArray[s][e + 1] = n)
            : r.height / a == 2 && (this.backgroundArray[s + 1][e] = n),
          i.push(
            new g({
              tileSize: this.tileSize,
              position: { x: e * this.tileSize, y: s * this.tileSize },
              type: h,
            })
          ))
      }
    return i
  }
  createCampfire() {
    const i = (i) =>
      Math.floor(Math.random() * (this.boardDimensions[i] - 6)) +
      3 * this.tileSize
    return {
      position: {
        x: this.centerArray
          ? (this.boardDimensions.x / 2 - 1.5) * this.tileSize
          : i('x'),
        y: this.centerArray
          ? (this.boardDimensions.y / 2 - 0.5) * this.tileSize
          : i('y'),
      },
      width: 3 * this.tileSize,
      height: 3 * this.tileSize,
    }
  }
  inCampfireRange(i, { x: t, y: s }) {
    return (
      i.position.x - 3 * this.tileSize < t &&
      t < i.width + i.position.x + 2 * this.tileSize &&
      i.position.y - 3 * this.tileSize < s &&
      s < i.height + i.position.y + 2 * this.tileSize
    )
  }
  getRandomChanceValue() {
    return Math.floor(Math.random() * r)
  }
  getRandomChanceIndex() {
    const i = this.getRandomChanceValue()
    let t = 0
    for (const s in o) if (((t += o[s].chance), t >= i)) return s
    return 'tree'
  }
}
class m {
  constructor({ gridSize: i, tileSize: s, boardDimensions: e, board: h }) {
    t(this, 'offset'),
      t(this, 'gridSize'),
      t(this, 'tileSize'),
      t(this, 'tilesArray'),
      t(this, 'boardDimensions'),
      t(this, 'board'),
      (this.gridSize = i),
      (this.tileSize = s),
      (this.boardDimensions = e),
      (this.tilesArray = this.generateTiles()),
      (this.offset = { x: 0, y: 0 }),
      (this.board = h)
  }
  generateTiles() {
    const i = []
    for (let t = 0; t < this.gridSize; t++) {
      const s = []
      for (let i = 0; i < this.gridSize; i++) {
        const e = 1 === i && 1 === t
        s.push({ backgroundArray: this.generateBackgroundArray(e), render: e })
      }
      i.push(s)
    }
    return i
  }
  generateBackgroundArray(i = !1) {
    return new A({
      centerArray: i,
      boardDimensions: this.boardDimensions,
      tileSize: this.tileSize,
    })
  }
  update() {
    this.updateGridVisibility(), this.handleGridShift()
  }
  updateGridVisibility() {
    this.updateEdges(), this.updateCorners()
  }
  updateEdges() {
    ;[
      {
        name: 'left',
        tile: this.tilesArray[1][0],
        condition: () => this.offset.x < this.board.position.x,
      },
      {
        name: 'top',
        tile: this.tilesArray[0][1],
        condition: () => this.offset.y < this.board.position.y,
      },
      {
        name: 'right',
        tile: this.tilesArray[1][2],
        condition: () => -this.offset.x < this.board.position.x,
      },
      {
        name: 'bottom',
        tile: this.tilesArray[2][1],
        condition: () => -this.offset.y < this.board.position.y,
      },
    ].forEach((i) => {
      this.updateCellVisibility(i.tile, i.condition())
    })
  }
  updateCorners() {
    ;[
      {
        name: 'topLeft',
        tile: this.tilesArray[0][0],
        condition: this.tilesArray[0][1].render && this.tilesArray[1][0].render,
      },
      {
        name: 'topRight',
        tile: this.tilesArray[0][2],
        condition: this.tilesArray[0][1].render && this.tilesArray[1][2].render,
      },
      {
        name: 'bottomLeft',
        tile: this.tilesArray[2][0],
        condition: this.tilesArray[2][1].render && this.tilesArray[1][0].render,
      },
      {
        name: 'bottomRight',
        tile: this.tilesArray[2][2],
        condition: this.tilesArray[2][1].render && this.tilesArray[1][2].render,
      },
    ].forEach((i) => {
      this.updateCellVisibility(i.tile, i.condition)
    })
  }
  updateCellVisibility(i, t) {
    !i.render && t ? (i.render = !0) : i.render && !t && (i.render = !1)
  }
  handleGridShift() {
    Math.abs(this.offset.x + this.board.position.x) > this.board.width &&
      (this.shiftGrid('left'),
      this.updateOffset('x', this.board.width + this.offset.x)),
      this.offset.x - this.board.position.x > this.board.width &&
        (this.shiftGrid('right'),
        this.updateOffset('x', this.board.position.x)),
      Math.abs(this.offset.y + this.board.position.y) > this.board.height &&
        (this.shiftGrid('up'),
        this.updateOffset('y', this.board.height + this.offset.y)),
      this.offset.y - this.board.position.y > this.board.height &&
        (this.shiftGrid('down'), this.updateOffset('y', this.board.position.y))
  }
  shiftGrid(i) {
    const t = this.gridSize
    for (let s = 0; s < t; s++)
      'left' === i || 'right' === i
        ? this.shiftRow(s, i)
        : this.shiftColumn(s, i)
  }
  shiftRow(i, t) {
    if ('left' === t) {
      for (let t = 2; t > 0; t--)
        this.tilesArray[i][t] = this.tilesArray[i][t - 1]
      this.tilesArray[i][0] = {
        backgroundArray: this.generateBackgroundArray(),
        render: !1,
      }
    } else {
      for (let t = 0; t < 2; t++)
        this.tilesArray[i][t] = this.tilesArray[i][t + 1]
      this.tilesArray[i][2] = {
        backgroundArray: this.generateBackgroundArray(),
        render: !1,
      }
    }
  }
  shiftColumn(i, t) {
    if ('up' === t) {
      for (let t = 2; t > 0; t--)
        this.tilesArray[t][i] = this.tilesArray[t - 1][i]
      this.tilesArray[0][i] = {
        backgroundArray: this.generateBackgroundArray(),
        render: !1,
      }
    } else {
      for (let t = 0; t < 2; t++)
        this.tilesArray[t][i] = this.tilesArray[t + 1][i]
      this.tilesArray[2][i] = {
        backgroundArray: this.generateBackgroundArray(),
        render: !1,
      }
    }
  }
  updateOffset(i, t) {
    this.offset[i] = t
  }
}
const u = (i, t) =>
  i.position.x + i.width > t.position.x &&
  i.position.y + i.height > t.position.y &&
  i.position.x < t.position.x + t.width &&
  i.position.y < t.position.y + t.height
class f {
  constructor() {}
  tileWithPlayer({ tile: i, player: t }) {
    i instanceof p && this.playerWithCampfire({ player: t, tile: i }),
      i instanceof g && this.playerWithResource({ player: t, tile: i })
  }
  playerWithResource({ player: i, tile: t }) {
    u(
      {
        position: {
          x: t.strictBox.position.x + t.shift.x,
          y: t.strictBox.position.y + t.shift.y,
        },
        width: t.mapping.box.width,
        height: t.mapping.box.height,
      },
      {
        position: { x: i.position.x + i.velocity.x, y: i.position.y },
        width: i.width - Math.abs(i.velocity.x),
        height: i.height - Math.abs(i.velocity.y),
      }
    ) && ((i.position.x -= i.velocity.x), (i.centerPoint.x -= i.velocity.x)),
      u(
        {
          position: {
            x: t.strictBox.position.x + t.shift.x,
            y: t.strictBox.position.y + t.shift.y,
          },
          width: t.mapping.box.width,
          height: t.mapping.box.height,
        },
        {
          position: { x: i.position.x, y: i.position.y + i.velocity.y },
          width: i.width - Math.abs(i.velocity.x),
          height: i.height - Math.abs(i.velocity.y),
        }
      ) && ((i.position.y -= i.velocity.y), (i.centerPoint.y -= i.velocity.y))
  }
  playerWithCampfire({ player: i, tile: t }) {
    const s = Math.sqrt(
      Math.pow(t.center.x + t.shift.x - i.centerPoint.x, 2) +
        Math.pow(t.center.y + t.shift.y - i.centerPoint.y, 2)
    )
    i.playerHitBoxRadius + t.radius >= s && t.activeTime > 0
      ? ((i.inCampfireRange = !0), (t.active = !0))
      : (i.inCampfireRange = !1)
  }
}
class x {
  constructor({ canvas: i }) {
    t(this, 'canvas'),
      t(this, 'tileSize', 64),
      t(this, 'boardDimensions', { x: 24, y: 24 }),
      t(this, 'gridSize', 3),
      t(this, 'tilesImage', new Image()),
      t(this, 'collision', new f()),
      t(this, 'board'),
      t(this, 'grid'),
      (this.canvas = i),
      (this.tilesImage.src = s),
      (this.board = {
        width: this.tileSize * this.boardDimensions.x,
        height: this.tileSize * this.boardDimensions.y,
        position: {
          x: i.width / 2 - (this.tileSize * this.boardDimensions.x) / 2,
          y: i.height / 2 - (this.tileSize * this.boardDimensions.y) / 2,
        },
      }),
      (this.grid = new m({
        gridSize: this.gridSize,
        boardDimensions: this.boardDimensions,
        tileSize: this.tileSize,
        board: this.board,
      }))
  }
  update({ time: i, player: t }) {
    this.grid.update()
    for (let s = -1; s < this.gridSize - 1; s++)
      for (let e = -1; e < this.gridSize - 1; e++) {
        if (!this.grid.tilesArray[s + 1][e + 1].render) continue
        const h = this.grid.tilesArray[s + 1][e + 1].backgroundArray,
          { board: a } = this.grid,
          o = {
            x: a.position.x + a.width * e - this.grid.offset.x,
            y: a.position.y + a.height * s - this.grid.offset.y,
          }
        h.setShift(o),
          h.interactiveArray.forEach((s) => {
            s.setShift(o),
              s instanceof p && s.update({ time: i }),
              this.collision.tileWithPlayer({ tile: s, player: t })
          })
      }
  }
  drawTileWithCampfire(i) {
    for (let t = -1; t < this.gridSize - 1; t++)
      for (let s = -1; s < this.gridSize - 1; s++) {
        if (!this.grid.tilesArray[t + 1][s + 1].render) continue
        const e = this.grid.tilesArray[t + 1][s + 1].backgroundArray
        for (let t = 0; t < this.boardDimensions.y; t++)
          for (let s = 0; s < this.boardDimensions.x; s++) {
            const h = e.backgroundArray[t][s],
              o = h === n ? 0 : h
            i.drawImage(
              this.tilesImage,
              o * a,
              0,
              a,
              a,
              s * this.tileSize + e.shift.x,
              t * this.tileSize + e.shift.y,
              this.tileSize,
              this.tileSize
            )
          }
        for (const t of e.interactiveArray)
          if (t instanceof p) {
            t.draw(i)
            break
          }
      }
  }
  drawInteractiveWithoutCampfire(i) {
    for (let t = -1; t < this.gridSize - 1; t++)
      for (let s = -1; s < this.gridSize - 1; s++) {
        if (!this.grid.tilesArray[t + 1][s + 1].render) continue
        const e = this.grid.tilesArray[t + 1][s + 1].backgroundArray
        for (const t of e.interactiveArray) t instanceof g && t.draw(i)
      }
  }
}
class w {
  constructor({
    position: i,
    imgSrc: s,
    scale: e = 1,
    columns: h = 1,
    maxFrames: a = 1,
    framesCurrent: o = 0,
    width: r,
    height: n,
    offSet: l,
    direction: c,
  }) {
    t(this, 'position'),
      t(this, 'image'),
      t(this, 'scale'),
      t(this, 'columns'),
      t(this, 'maxFrames'),
      t(this, 'framesCurrent'),
      t(this, 'framesElapsed'),
      t(this, 'framesHold'),
      t(this, 'width'),
      t(this, 'height'),
      t(this, 'direction'),
      t(this, 'offSet'),
      t(this, 'drawSprite', (i) => {
        let t = this.image.width / this.columns,
          s = this.direction || 1
        i.save(),
          i.scale(s, 1),
          i.drawImage(
            this.image,
            this.framesCurrent * t,
            0,
            this.image.width / this.columns,
            this.image.height,
            s * (this.position.x + this.width / 2) -
              (t / 2) * this.scale +
              this.offSet.x,
            this.position.y -
              (this.image.height / 2) * this.scale +
              this.offSet.y,
            t * this.scale,
            this.image.height * this.scale
          ),
          (i.fillStyle = 'rgba(0, 0, 0, 0.5)'),
          i.restore()
      }),
      t(this, 'animateFrames', () => {
        this.framesCurrent < this.maxFrames - 1
          ? this.framesCurrent++
          : (this.framesCurrent = 0)
      }),
      (this.position = i),
      (this.image = new Image()),
      (this.image.src = s),
      (this.scale = e),
      (this.columns = h),
      (this.maxFrames = a),
      (this.framesCurrent = o),
      (this.framesElapsed = 0),
      (this.framesHold = 5),
      (this.width = r),
      (this.height = n),
      (this.direction = c),
      (this.offSet = l)
  }
}
const b = {
    IDLE: {
      imageSrc:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAxUlEQVR42u2WsQnDMBBFtUYWCKnTuXAEbtJmgOwQiLNERsgCKTKBB8kIrrzEhTuQOIRc6zv8Bw/s7iF0Z4dACCGEICCFWHHT7SLL95NFi7TA+X3PwgX6OMhA+BPUQC9SoOz6KI/YmekZLrAUJTIH7a9DVt/j4QgRua3A/nk2U6BOc+uBqd4/1a+epoFper16eijf5dVAFxmgAlMcSqTdMzetJkygm1Cp/RtCrBl1PHWv0uaBtag1oeM2Edl0z8CGEULIH/EDi2U08YRqo14AAAAASUVORK5CYII=',
      columns: 1,
      maxFrames: 1,
      fps: 1,
    },
    RUNNING: {
      imageSrc:
        'data:image/webp;base64,UklGRtABAABXRUJQVlA4TMMBAAAvP8EJEFegJgAShhacJMBxeZnVqNZQG8kG9Z5fJjZ6kCpB/yVR00gKdHd8EuhRQYd/LZggyLYp7aAu+wAAwLeP0rjCyeOWf6yvmxkRC3CcbY+c+K/SjiPZ49DtB4ArcIEsnppsrkn11+yTMlThCpwzkl95nA6kiP4zcts2kmbmLnm2P5h/QUdjpb4O1jag88vvRX0drG1I559JfR2sbUDnQ30d5drO168+5z6cQ0cfhnNuVne+vg7WNqDz1dW4uo6VMJfBNri8f2Ad44IbkI6ZZ22lnBkzGbKDUmqrYh2PjFnBDVDHXoiLL+VMuLr6LrkV6iUd46MQl70Ucn7Ns0zdhyA/thXbNICO5GzepYvuKCWcpzF9EpI1eb+UDlJq04iIyM9Z0vYyybNNSYiLILyQTQ8M5uIQhvRayRLdMk8T3UsAxORZhwFMAS/eAvo0BSy3Hfg0dbIMJouXps9vNY1LhgD8EvQGMdZnsXYpgBcw85PVF+D3rKp5v861AXRY8tsKO9JrVds8qks/yve+BDXAr9URuMDZ2F3bS76j7XcAVdpRwsVoKWc9YVRfB3Jmz0vBtto7zEkGCDGG+bHe+jr+DB4GAA==',
      columns: 8,
      maxFrames: 8,
      fps: 8,
    },
    ATTACK: { imageSrc: '', columns: 1, maxFrames: 1, fps: 1 },
  },
  S = 0,
  v = 1,
  k = 2
class B {
  constructor({ player: i, state: s }) {
    t(this, 'player'), t(this, 'state'), (this.player = i), (this.state = s)
  }
}
class z extends B {
  constructor(i) {
    super({ player: i, state: 'IDLE' }),
      t(this, 'input', (i) => {
        i.KeyW ||
          i.KeyA ||
          i.KeyS ||
          i.KeyD ||
          (this.player.setSprite(b.IDLE),
          (this.player.velocity.x = 0),
          (this.player.velocity.y = 0)),
          i.Space && this.player.setState(k),
          (i.KeyW || i.KeyA || i.KeyS || i.KeyD) && this.player.setState(v)
      })
  }
}
class R extends B {
  constructor(i) {
    super({ player: i, state: 'RUNNING' }),
      t(this, 'input', (i) => {
        ;(i.KeyW || i.KeyA || i.KeyS || i.KeyD) &&
          (this.player.setSprite(b.RUNNING),
          (this.player.velocity.x = 0),
          (this.player.velocity.y = 0),
          i.KeyA && (this.player.velocity.x = -this.player.speed),
          i.KeyD && (this.player.velocity.x = this.player.speed),
          i.KeyW && (this.player.velocity.y = -this.player.speed),
          i.KeyS && (this.player.velocity.y = this.player.speed)),
          i.Space && this.player.setState(k),
          i.KeyW || i.KeyA || i.KeyS || i.KeyD || this.player.setState(S)
      })
  }
}
class C extends B {
  constructor(i) {
    super({ player: i, state: 'ATTACK' }),
      t(this, 'input', (i) => {
        i.Space &&
          this.player.isAttacking &&
          (this.player.attack(), (this.player.isAttacking = !1)),
          i.KeyW || i.KeyA || i.KeyS || i.KeyD
            ? ((this.player.isAttacking = !1), this.player.setState(v))
            : ((this.player.isAttacking = !1), this.player.setState(S))
      })
  }
}
class F extends w {
  constructor({
    canvas: i,
    position: s,
    imgSrc: e,
    scale: h,
    columns: a = 8,
    maxFrames: o = 8,
    width: r,
    height: n,
    offSet: l,
    angle: c,
  }) {
    super({
      canvas: i,
      position: s,
      imgSrc: e,
      scale: h,
      columns: a,
      maxFrames: o,
      width: r,
      height: n,
      offSet: l,
    }),
      t(this, 'velocity', { x: 0, y: 0 }),
      t(this, 'speed', 10),
      t(this, 'direction', 1),
      t(this, 'angle'),
      t(this, 'centerPoint'),
      t(this, 'bulletHitBoxRadius'),
      t(this, 'update', () => {
        ;(this.position.x += this.velocity.x),
          (this.position.y += this.velocity.y),
          (this.centerPoint = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
          })
      }),
      t(this, 'draw', (i) => {
        i.beginPath(),
          i.arc(
            this.centerPoint.x,
            this.centerPoint.y,
            this.bulletHitBoxRadius,
            0,
            2 * Math.PI
          ),
          (i.fillStyle = 'rgba(255, 0, 0)'),
          i.fill()
      }),
      (this.angle = c),
      (this.velocity.x = Math.cos(this.angle) * this.speed),
      (this.velocity.y = Math.sin(this.angle) * this.speed),
      (this.bulletHitBoxRadius = Math.max(this.width, this.height) / 3),
      (this.centerPoint = {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height / 2,
      })
  }
}
function I(i, t, s) {
  const e = 2 * Math.PI
  ;(i %= e) < 0 && (i += e), (t %= e) < 0 && (t += e)
  let h = t - i
  h > Math.PI ? (h -= e) : h < -Math.PI && (h += e)
  return (i + h * s + e) % e
}
class M extends w {
  constructor(i, s, e) {
    super({
      canvas: s,
      position: { x: i.position.x, y: i.position.y },
      imgSrc:
        'data:image/webp;base64,UklGRoYAAABXRUJQVlA4THkAAAAvO8AJEEegJgAShhr8fODqH8RqahpJgU7EdQ90KEAC/isEkWlAaOE1nx6aiKjg/AcAAHqKNLW8bo/ycxtgFNlumy8GcmdgAkZQQqQC6KEQ6NIxOUX0fwLwpZMOe0Ok8bwpwZAUtuE0ZvBiXNdcFMBjLp3kwMYY/AkBAA==',
      scale: 3,
      offSet: { x: 0, y: 5 },
      width: 10,
      height: 20,
    }),
      t(this, 'canvas'),
      t(this, 'playerPosition'),
      t(this, 'mouse'),
      t(this, 'gunAngle'),
      t(this, 'targetAngle'),
      t(this, 'bullets'),
      t(this, 'bulletsAmount'),
      t(this, 'attackFrame'),
      t(this, 'direction'),
      t(this, 'player'),
      (this.player = i),
      (this.playerPosition = i.position),
      (this.mouse = { x: 0, y: 0 }),
      (this.gunAngle = 0),
      (this.targetAngle = 0),
      (this.bullets = []),
      (this.bulletsAmount = 6),
      (this.attackFrame = new d({ fps: 2, currentFrame: 0, maxFrame: 10 })),
      (this.direction = e),
      (this.canvas = s)
  }
  updateGun(i) {
    this.bulletsAmount <= 0 && this.reload(),
      (this.mouse = i),
      (this.targetAngle = Math.atan2(
        this.mouse.y - (this.playerPosition.y + this.height / 2),
        this.mouse.x - (this.playerPosition.x + this.width / 2)
      ))
    this.gunAngle = I(this.gunAngle, this.targetAngle, 0.15)
  }
  drawGun(i) {
    i.save(),
      i.translate(
        this.playerPosition.x + this.player.width / 2,
        this.playerPosition.y + this.player.height / 2
      ),
      i.rotate(this.gunAngle),
      i.scale(-1, this.player.direction),
      (this.position = { x: -this.width, y: -this.height / 2 }),
      this.drawSprite(i),
      i.restore(),
      i.beginPath(),
      i.moveTo(
        this.player.position.x + this.player.width / 2,
        this.player.position.y + this.player.height / 2
      ),
      i.arc(
        this.player.position.x + this.player.width / 2,
        this.player.position.y + this.player.height / 2,
        200,
        this.gunAngle - 0.15,
        this.gunAngle + 0.15
      ),
      (i.fillStyle = 'rgb(0, 0, 0, 0.15)'),
      i.fill()
  }
  attack() {
    if (this.bulletsAmount >= 0) {
      const i = new F({
        canvas: this.canvas,
        position: {
          x: this.playerPosition.x + this.width / 2,
          y: this.playerPosition.y + this.height / 2,
        },
        width: 4,
        height: 8,
        offSet: { x: 0, y: 0 },
        scale: 1,
        angle: this.gunAngle,
      })
      ;(this.gunAngle -= this.player.direction / 2),
        (this.bulletsAmount -= 1),
        this.bullets.push(i)
    }
  }
  reload() {
    this.attackFrame.setFPS(0.75),
      (this.attackFrame.currentFrame = 0),
      (this.bulletsAmount = 6)
  }
  updateBullets(i, t) {
    this.bullets = this.bullets.filter((s) => {
      s.update(), s.draw(i)
      const e = Math.abs(s.position.x - t.x),
        h = Math.abs(s.position.y - t.y)
      return e <= 750 && h <= 750
    })
  }
}
class E extends w {
  constructor({
    canvas: i,
    position: s,
    imgSrc: e,
    scale: h = 3,
    columns: a = 8,
    maxFrames: o = 8,
    width: r,
    height: n,
    offSet: l,
    direction: y,
  }) {
    super({
      canvas: i,
      position: s,
      imgSrc: e,
      scale: h,
      columns: a,
      maxFrames: o,
      width: r,
      height: n,
      offSet: l,
      direction: y,
    }),
      t(this, 'canvas'),
      t(this, 'centerBox'),
      t(this, 'velocity', { x: 0, y: 0 }),
      t(this, 'inCampfireRange', !1),
      t(this, 'healthInMs', c),
      t(this, 'health', this.healthInMs / c),
      t(this, 'collision', { left: !1, right: !1, top: !1, bottom: !1 }),
      t(this, 'aboutToCollide', !1),
      t(this, 'playerHitBoxRadius'),
      t(this, 'centerPoint'),
      t(this, 'speed', 5),
      t(this, 'direction', 1),
      t(this, 'state'),
      t(this, 'previousState'),
      t(this, 'states'),
      t(this, 'frame', new d({ fps: 15, currentFrame: 0, maxFrame: 10 })),
      t(this, 'moveFrame', new d({ fps: 60 })),
      t(this, 'gun'),
      t(this, 'isAttacking'),
      t(this, 'update', ({ keys: i, mousePos: t, offset: s, time: e }) => {
        this.inCampfireRange
          ? this.healthInMs < c && (this.healthInMs += 4 * e)
          : this.healthInMs > 0 && (this.healthInMs -= e),
          (this.health = this.healthInMs / c),
          this.frame.timeElapsed(e) &&
            (this.frame.updateFrame(), this.animateFrames()),
          this.gun.updateGun(t),
          this.gun.attackFrame.timeElapsed(e) &&
            ((this.isAttacking = !0),
            this.gun.attackFrame.setFPS(2),
            this.gun.attackFrame.updateFrame()),
          this.moveFrame.timeElapsed(e) &&
            (this.state.input(i),
            t.x >= this.position.x + this.width / 2
              ? (this.direction = 1)
              : (this.direction = -1),
            this.inCenterBox(),
            this.collision.left || this.collision.right
              ? (((this.collision.left && this.velocity.x > 0) ||
                  (this.collision.right && this.velocity.x < 0)) &&
                  (this.position.x += this.velocity.x),
                (s.x += this.velocity.x))
              : ((this.position.x += this.velocity.x),
                (this.centerPoint.x += this.velocity.x)),
            this.collision.top || this.collision.bottom
              ? (((this.collision.top && this.velocity.y > 0) ||
                  (this.collision.bottom && this.velocity.y < 0)) &&
                  (this.position.y += this.velocity.y),
                (s.y += this.velocity.y))
              : ((this.position.y += this.velocity.y),
                (this.centerPoint.y += this.velocity.y)))
      }),
      t(this, 'setState', (i) => {
        ;(this.previousState = this.state), (this.state = this.states[i])
      }),
      t(this, 'setSprite', (i) => {
        ;(this.image.src = i.imageSrc),
          (this.columns = i.columns),
          (this.maxFrames = i.maxFrames),
          this.frame.setFPS(i.fps)
      }),
      t(this, 'inCenterBox', () => {
        this.position.x + this.velocity.x < this.centerBox.position.x
          ? (this.collision.left = !0)
          : this.position.x + this.width + this.velocity.x >
            this.centerBox.position.x + this.centerBox.width
          ? (this.collision.right = !0)
          : ((this.collision.left = !1), (this.collision.right = !1)),
          this.position.y + this.velocity.y < this.centerBox.position.y
            ? (this.collision.top = !0)
            : this.position.y + this.height + this.velocity.y >
              this.centerBox.position.y + this.centerBox.height
            ? (this.collision.bottom = !0)
            : ((this.collision.top = !1), (this.collision.bottom = !1))
      }),
      t(this, 'draw', (i) => {
        ;(i.fillStyle = '#fff'),
          i.fillRect(this.position.x, this.position.y, this.width, this.height),
          i.beginPath(),
          i.arc(
            this.centerPoint.x,
            this.centerPoint.y,
            this.playerHitBoxRadius,
            0,
            2 * Math.PI
          ),
          (i.fillStyle = 'rgba(0, 255, 255)'),
          i.fill(),
          //! change directory
          this.gun.updateBullets(i, this.position),
          this.drawSprite(i),
          this.gun.drawGun(i)
      }),
      t(this, 'attack', () => {
        this.isAttacking && this.gun.attack()
      }),
      t(this, 'drawCenterBox', (i) => {
        ;(i.fillStyle = 'rgba(155, 155, 0, 0.2)'),
          i.fillRect(
            this.centerBox.position.x,
            this.centerBox.position.y,
            this.centerBox.width,
            this.centerBox.height
          )
      }),
      (this.canvas = i),
      (this.position.x = this.canvas.width / 2 - this.width / 2),
      (this.position.y =
        this.canvas.height / 2 - this.height / 2 - this.height),
      (this.playerHitBoxRadius = Math.max(this.width, this.height) / 3),
      (this.gun = new M(this, this.canvas, this.direction)),
      (this.isAttacking = !1),
      (this.state = null),
      (this.previousState = null),
      (this.states = [new z(this), new R(this), new C(this)]),
      this.setState(S),
      this.setSprite(b.IDLE),
      (this.centerBox = {
        position: {
          x: this.canvas.width / 2 - this.canvas.width / 4 / 2,
          y: this.canvas.height / 4,
        },
        width: this.canvas.width / 4,
        height: this.canvas.height / 2,
      }),
      (this.centerPoint = {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height / 2,
      })
  }
}
class D {
  constructor() {
    t(this, 'keys'),
      t(this, 'mousePos'),
      (this.keys = l),
      (this.mousePos = { x: 0, y: 0 }),
      window.addEventListener('keydown', this.handleKeyDown.bind(this)),
      window.addEventListener('keyup', this.handleKeyUp.bind(this)),
      window.addEventListener('mousemove', this.handleMouseMove.bind(this))
  }
  handleKeyDown(i) {
    i.code in l && (this.keys[i.code] = !0)
  }
  handleKeyUp(i) {
    i.code in l && (this.keys[i.code] = !1)
  }
  handleMouseMove(i) {
    ;(this.mousePos.x = i.clientX - (window.innerWidth - 1024) / 2),
      (this.mousePos.y = i.clientY - (window.innerHeight - 512) / 2)
  }
}
class P {
  constructor({ canvas: i }) {
    t(this, 'canvas'),
      t(this, 'activeTransition', null),
      t(this, 'frame', new d({ fps: 60 })),
      t(this, 'position', { x: 0, y: 0 }),
      t(this, 'width'),
      t(this, 'animationFinish', !1),
      (this.canvas = i),
      (this.width = i.width / 4),
      (this.position.x = -this.canvas.width / 2)
  }
  start() {
    ;(this.animationFinish = !1), (this.activeTransition = 'toTheRight')
  }
  update(i) {
    this.frame.timeElapsed(i) &&
      ((this.position.x = I(
        this.position.x,
        this.canvas.width + this.canvas.width / 4,
        0.03
      )),
      (this.width = I(this.width, this.canvas.width / 2, 0.07)),
      this.position.x >= this.canvas.width &&
        ((this.animationFinish = !0), (this.activeTransition = null)))
  }
  toTheRight() {}
  draw(i) {
    this.activeTransition &&
      ((i.fillStyle = 'rgb(0,0,0)'),
      i.fillRect(0 + this.position.x, 0, this.width, this.canvas.height))
  }
}
class K {
  constructor({ canvas: i }) {
    t(this, 'canvas'),
      t(this, 'background'),
      t(this, 'player'),
      t(this, 'input'),
      t(this, 'transition'),
      t(this, 'collision'),
      t(this, 'frame', new d({ fps: 60 })),
      t(this, 'isPlaying', !1),
      (this.canvas = i),
      (this.transition = new P({ canvas: this.canvas })),
      (this.background = new x({ canvas: i })),
      (this.player = new E({
        canvas: i,
        position: { x: 0, y: 0 },
        width: 48,
        height: 72,
        offSet: { x: 0, y: 32 },
        scale: 3,
        imgSrc:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAAoBAMAAAB9bj4aAAAAIVBMVEUAAABzPjkAAAC4b1Dq1KrkpnIZPT90PzkmXEI/KDI9iUc8oCvwAAAAAnRSTlMAmf9A5tgAAAGaSURBVFjD7ZVNTsMwEIUTb9jWOYFrq1jZJuICiBOAuEARLd0aCSs3YB0Wla/QU+KwnDeVRiWhCzzL0fv57ERJVZUpU6ZMmTJXH2XN8nnSEk7nHu4XzxOXcDr3/Lh4nriE020478x54pJr6X53M323eJ64hNGp/UdYPE9awunUbredOW9vJEspzO3bJ3qF0FxvzjuA8EwJZ+YAD+byPDEgLM+Ymd2JAxRB872nwxNXEmRmLNntXi+HZnrz63HHlGwp9RnzC/X6OHwZgY6FzofrIC+OtqLLIY2UmjO3Kb4jYIS8NsaNBDofLjGAieomIVDnEkc/XO0xRoM7yMveALqE0BMgtxs5QCg5Rvi7p9FTGpVGB9+3DBO4POxtAdAFi4B9bBH6OFCvGoynMCoY1VPoNnkOEG7aBw+9naksmK31aHZw4BurHehqrTXVDWMDt+ot/ki6NfZarRsA1NqHFS12nUZdo4lu4qOEyq4beqtV3fRrAMxWQR6/1DLzz4oI585jzdyjk5bMnjcpV7CrUcbp6r/IK1OmTJn/Ot9QT6uRpkwhSwAAAABJRU5ErkJggg==',
      })),
      (this.input = new D()),
      (this.collision = new f())
  }
  update(i) {
    this.player.update({
      keys: this.input.keys,
      mousePos: this.input.mousePos,
      offset: this.background.grid.offset,
      time: i,
    }),
      this.background.update({ time: i, player: this.player })
  }
  updateTransition(i) {
    this.isPlaying ||
      !this.input.keys.Space ||
      this.transition.activeTransition ||
      this.transition.start(),
      this.transition.activeTransition && this.transition.update(i),
      this.transition.animationFinish && (this.isPlaying = !0)
  }
  draw(i) {
    this.background.drawTileWithCampfire(i),
      this.player.draw(i),
      this.background.drawInteractiveWithoutCampfire(i),
      this.drawEyeEffect(i),
      this.transition.draw(i)
  }
  drawEyeEffect(i) {
    const t = i.createRadialGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      15,
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.canvas.width / 2
    )
    t.addColorStop(0, `rgba(200,200,200, ${0.6 - this.player.health})`),
      t.addColorStop(0.4, `rgba(122,122,122, ${1.25 - this.player.health})`),
      t.addColorStop(1, `rgba(0,0,0, ${1.4 - this.player.health})`),
      (i.fillStyle = t),
      i.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
const U = document.querySelector('canvas')
;(U.width = 1024), (U.height = 512)
const T = U.getContext('2d')
;(T.imageSmoothingEnabled = !1),
  window.addEventListener('load', () => {
    const i = new K({ canvas: U })
    let t = 0
    const s = (e) => {
      const h = e - t
      ;(t = e), i.update(h), i.draw(T), requestAnimationFrame(s)
    }
    s(0)
  })
