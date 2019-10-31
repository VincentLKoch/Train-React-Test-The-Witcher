class LivingThing {
  constructor(name, resistance, health) {
    this.name = name
    this.resistance = resistance
    this.isAlive = true
    this.health = health
  }

  hitting() { return 2 }

  gettingHit(incomingDamage) {
    this.health = this.health - incomingDamage
    this.isAlive = this.health >= 0
    if (!this.isAlive) { console.log(this.name + ' die with a scream!') }
  }

  fightToDeath(enemy) { this.fight(enemy, 0, 0) }

  fight(enemy, iSurrenderAtHealth, enemySurrenderAtHealth) {
    console.log(this.name + ' fight ' + enemy.name)

    while (this.health > iSurrenderAtHealth && enemy.health > enemySurrenderAtHealth) {

      //I'm attaquing first
      enemy.gettingHit(this.hitting(enemy.resistance))

      //If he don't surrender he attack back
      if (enemy.health >= enemySurrenderAtHealth) {
        this.gettingHit(enemy.hitting(this.resistance))
      }

    } //End battle loop


    if (this.health <= iSurrenderAtHealth) { //enemy won
      console.log(this.name + ' lose battle against ' + enemy.name)
      if (enemy.currentSword) { enemy.putSwordInSheath() }

    } else if (enemy.health <= enemySurrenderAtHealth) { //I won
      console.log(enemy.name + ' lose battle against ' + this.name)
      if (this.currentSword) { this.putSwordInSheath() }
    }
  } //end fight()


}

export default LivingThing
