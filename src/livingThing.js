class LivingThing {
  constructor(name, resistance, health) {
    this.name = name
    this.resistance = resistance
    this.isAlive = true
    this.health = health
  }

  gettingHit(incomingDamage) {
    this.health = this.health - incomingDamage
    this.isAlive = this.health >= 0
    if (!this.isAlive) { console.log(this.name + ' die with a scream!') }
  }

  hitting() { return 2 }

  fightToDeath(enemy) { this.fight(enemy, 0, 0) }

  fight(enemy, iSurrenderAtHealth, enemySurrenderAtHealth) {
    console.log(this.name + ' fight ' + enemy.name)

    while (this.health > iSurrenderAtHealth && enemy.health > enemySurrenderAtHealth) {

      //I'm attaquing first
      if (currentSword in this) { //If witcher
        enemy.gettingHit(this.hitting(enemy.resistance))
      } else {
        enemy.gettingHit(this.hitting())
      }

      //If he survive he attack back
      if (enemy.health >= enemySurrenderAtHealth) {

        //If witcher
        if (currentSword in enemy) {
          this.gettingHit(enemy.hitting(this.resistance))
        } else {
          this.gettingHit(enemy.hitting())
        }
      }
      
    } //End battle loop


    if (this.health <= iSurrenderAtHealth) { //I won
      console.log(this.name + ' lose battle against ' + enemy.name)
      if (currentSword in enemy) { enemy.putSwordInSheath() }

    } else if (enemy.health <= enemySurrenderAtHealth) { //enemy won
      console.log(enemy.name + ' lose battle against ' + this.name)
      if (currentSword in this) { this.putSwordInSheath() }
    }
  } //end fight()


}

export default LivingThing
