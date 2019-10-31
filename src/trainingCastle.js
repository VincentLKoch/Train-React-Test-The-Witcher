import Disciple from './disciple'
import Witcher from './witcher'

class TrainingCastle {
  constructor() {
    this.disciples = []
  }

  acceptNewDisciple(newDiscipleName) {
    this.disciples = [...this.disciples, new Disciple(newDiscipleName)]
  }

  eatMushrooms() {
    for (let i = 0; i < this.disciples.length; ++i) {
      this.disciples[i].eatMushrooms()
    }

    this.disciples = this.disciples.filter(d => d.isStillAlive)
  }

  trainDisciples() {
    for (let i = 0; i < this.disciples.length; ++i) {
      this.disciples[i].train()
    }
  }

  acknowledgeDisciples() {
    const acknowledgedDisciples = []
    const stillTrainingDisciples = []

    for (let i = 0; i < this.disciples.length; ++i) {
      const disciple = this.disciples[i]
      if (disciple.isTrained()) {
        console.log(`${disciple.name} becomes a Witcher!`)
        acknowledgedDisciples.push(new Witcher(disciple))
      } else {
        console.log(`${disciple.name} needs more training!`)
        stillTrainingDisciples.push(disciple)
      }
    }

    this.disciples = stillTrainingDisciples;
    return acknowledgedDisciples;
  }
}

export default TrainingCastle
