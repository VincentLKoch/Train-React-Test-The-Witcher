import LivingThing from './livingThing'
import { resistances } from './resistances'

class Monster extends LivingThing {
  constructor(name, health) {
    super(name, resistances.STEEL, health)
  }
}

class Fiend extends Monster {
  constructor() {
    super('Fiend', 20)
  }
  hitting() { return 5 }
}

class Wraith extends Monster {
  constructor() {
    super('Wraith', 10)
    this.isIncorporeal = false
  }

  gettingHit(incomingDamage) {
    if (this.isIncorporeal) {
      this.isIncorporeal = false
    } else {
      this.health = this.health - incomingDamage
      this.isAlive = this.health >= 0
      this.isIncorporeal = true
    }
  }
}


const MonsterFactory = (monsterName) => {
  switch (monsterName) {
    case 'Wraith':
      return new Wraith;
    case 'Fiend':
      return new Fiend;
  }
}


export default MonsterFactory
