import LivingThing from '../livingThing'

describe('Living things tests', () => {
    describe('Constructor Test', () => {
        it.each(
            [
                ['Chuck Norris', 'steel', 9999],
                ['Norrin Radd', 'silver', 50],
            ])('Creation of %s',
                (name, resistance, health) => {
                    const testSubject = new LivingThing(name, resistance, health)

                    expect(testSubject.name).toBe(name)
                    expect(testSubject.health).toBe(health)
                    expect(testSubject.isAlive).toBeTruthy()
                    expect(testSubject.hitting()).toBe(2)
                    expect(testSubject.resistance).toBe(resistance)

                    //test that hitting ignore parameter if subject is not a witcher
                    expect(testSubject.hitting('steel')).toBe(2)
                })
    })

    describe('Guinea Pig hitting session', () => {
        it.each(
            [
                ['Baggie The Clown', 5],
                ['T-800', 200],
            ])('Creation of %s',
                (name, health) => {
                    console.log = jest.fn();
                    const testSubject = new LivingThing(name, 'steel', health)

                    testSubject.gettingHit(10)

                    expect(testSubject.health).toBe(health - 10)
                    expect(testSubject.isAlive).toBe(health > 10)
                    if (!testSubject.isAlive) {
                        expect(console.log).toHaveBeenCalledWith(name + ' die with a scream!')
                    }

                })
    })

    describe('Happy death fight', () => {
        it.each(
            [
                ['Baggie The Clown', 'Chuck Norris', 5, 9999], //defender win
                ['Lex', 'Robin', 30, 12], //attacker win
                ['Crones', 'Robin', 31, 13], //attacker win ( uneven number )

            ])('%s fight to Death %s',
                (attackerName, defenderName, attackerHealth, defenderHealth) => {
                    console.log = jest.fn();
                    const attacker = new LivingThing(attackerName, 'steel', attackerHealth)
                    const defender = new LivingThing(defenderName, 'steel', defenderHealth)

                    attacker.fightToDeath(defender)


                    if (!attacker.isAlive) { //defender won
                        expect(console.log).toHaveBeenCalledWith(attacker.name + ' lose battle against ' + defender.name)

                        //Defender lose 2 (first attack) + (attacker health)/2 round up *2
                        expect(defender.health).toBe(defenderHealth - 2 * Math.ceil(attackerHealth / 2))

                        //Attacker lose his (health)/2 round up *2 (=0 if initial health is even -1 if not)
                        expect(attacker.health).toBe(attackerHealth - 2 * Math.ceil(attackerHealth / 2))

                    } else if (!defender.isAlive) { //attacker won
                        expect(console.log).toHaveBeenCalledWith(defender.name + ' lose battle against ' + attacker.name)
                        expect(defender.health).toBe(defenderHealth - 2 * Math.ceil(defenderHealth / 2))

                        //Using math.floor here because attacker hit first and defender surrend before hiting back last attack
                        expect(attacker.health).toBe(attackerHealth - 2 * Math.floor(defenderHealth / 2))
                    }

                })
    })

    describe('"training" fight', () => {
        it.each(
            [
                ['Baggie The Clown', 'Chuck Norris', 5, 9999, 0, 0], //defender win
                ['Baggie The Clown', 'Chuck Norris', 6, 9999, 1, 0], //attacker surrend
                ['Lex', 'Robin', 30, 12, 0, 0], //attacker win
                ['Lex', 'Robin', 31, 12, 0, 5], //defender surrend
            ])('%s fight %s',
                (attackerName, defenderName, attackerHealth, defenderHealth, attackerSurrender, defenderSurrender) => {
                    console.log = jest.fn();
                    const attacker = new LivingThing(attackerName, 'steel', attackerHealth)
                    const defender = new LivingThing(defenderName, 'steel', defenderHealth)

                    attacker.fight(defender, attackerSurrender, defenderSurrender)


                    if (attacker.health <= attackerSurrender) { //defender won
                        expect(console.log).toHaveBeenCalledWith(attacker.name + ' lose battle against ' + defender.name)

                        expect(defender.health).toBe(defenderHealth - 2 * Math.ceil((attackerHealth - attackerSurrender) / 2))
                        expect(attacker.health).toBe(attackerHealth - 2 * Math.ceil((attackerHealth - attackerSurrender) / 2))

                    } else if (defender.health <= defenderSurrender) { //attacker won
                        expect(console.log).toHaveBeenCalledWith(defender.name + ' lose battle against ' + attacker.name)

                        expect(defender.health).toBe(defenderHealth - 2 * Math.ceil((defenderHealth - defenderSurrender) / 2))
                        //Using math.floor here because attacker hit first and defender surrend before hiting back last attack
                        expect(attacker.health).toBe(attackerHealth - 2 * Math.floor((defenderHealth - defenderSurrender) / 2))
                    }

                })
    })

})