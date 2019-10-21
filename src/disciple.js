class Disciple {
  constructor(name) {
    this.name = name
    this.mushroomsAte = 0
    this.trainingSessions = 0
    this.isStillAlive = true
  }

  eatMushrooms() {
    ++this.mushroomsAte
    this.isStillAlive = this.mushroomsAte <= 3

    if (!this.isStillAlive) {
      console.log(`${this.name} screams and dies in agony.`)
    }
  }

  isTrained() {
    return this.mushroomsAte !== 0 && this.trainingSessions !== 0
  }

  train() {
    this.trainingSessions++
  }
}

export default Disciple
