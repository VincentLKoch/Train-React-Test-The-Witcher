import LivingThing from './livingThing'
import { resistances } from './resistances'

class Monster extends LivingThing {
  constructor(name, health) {
    super(name, resistances.STEEL, health)
  }
}

export default Monster
