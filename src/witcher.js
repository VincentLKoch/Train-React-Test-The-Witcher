import { resistances } from './resistances'
import LivingThing from './livingThing'

class Witcher extends LivingThing {
  constructor(disciple) {
    super(disciple.name, resistances.SILVER, 10)

    //this.name = disciple.name
    this.efficiency = disciple.mushroomsAte * disciple.trainingSessions
    this.currentSword = 'steel'
  }

  hitting(enemyResistance) {

    //wrong sword hit less but switch
    if (this.currentSword === enemyResistance) {
      
      if (this.currentSword === 'steel') {
        this.currentSword = 'silver'
      } else { //the silver sword may be by default for some witcher
        this.currentSword = 'steel'
      }

      return Math.ceil(this.efficiency / 2)
    }
    //right sword
    return this.efficiency
  }

  putSwordInSheath() { this.currentSword = 'steel' }
}

export default Witcher
