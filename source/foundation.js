class Foundation {
  constructor() {
    this.title = "Foundation"
    this.version = "0.0.1"
  }

  get name() {
    return `${this.title} v${this.version}`
  }
}

module.exports = Foundation
