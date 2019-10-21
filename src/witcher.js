import { resistances } from './resistances'
import LivingThing from './livingThing'

class Witcher extends LivingThing {
  constructor(disciple) {
    super(disciple.name, resistances.SILVER, 10)

    this.name = disciple.name
    this.efficiency = disciple.mushroomsAte * disciple.trainingSessions
  }
}

export default Witcher
