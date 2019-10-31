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

    describe('"training" fight', () => {
        it.each(
            [
                ['Baggie The Clown', 'Chuck Norris', 5, 9999, 0, 0, -1, 9993], //defender win
                ['Baggie The Clown', 'Chuck Norris', 5, 9999, 1, 0, 1, 9995], //attacker surrend
                ['Lex', 'Robin', 30, 12, 0, 0, 18, 0], //attacker win
                ['Lex', 'Robin', 30, 12, 0, 5, 24, 4], //defender surrend
            ])('%s fight %s',
                (attackerName, defenderName, attackerHealth, defenderHealth, attackerSurrender,
                    defenderSurrender, expectedAttackerHealth, expectedDefenderHealth) => {
                    console.log = jest.fn();
                    const attacker = new LivingThing(attackerName, 'steel', attackerHealth)
                    const defender = new LivingThing(defenderName, 'steel', defenderHealth)

                    attacker.fight(defender, attackerSurrender, defenderSurrender)

                    expect(attacker.health).toBe(expectedAttackerHealth)
                    expect(defender.health).toBe(expectedDefenderHealth)

                    if (attacker.health <= attackerSurrender) { //defender won
                        expect(console.log).toHaveBeenCalledWith(attacker.name + ' lose battle against ' + defender.name)
                    } else if (defender.health <= defenderSurrender) { //attacker won
                        expect(console.log).toHaveBeenCalledWith(defender.name + ' lose battle against ' + attacker.name)
                    }

                })
    })

    describe('Happy death fight', () => {
        it.each(
            [
                ['Baggie The Clown', 'Chuck Norris', 5, 9999, -1, 9993], //defender win
                ['Lex', 'Robin', 30, 12, 18, 0], //attacker win
            ])('%s fight %s',
                (attackerName, defenderName, attackerHealth, defenderHealth,
                    expectedAttackerHealth, expectedDefenderHealth) => {
                    console.log = jest.fn();
                    const attacker = new LivingThing(attackerName, 'steel', attackerHealth)
                    const defender = new LivingThing(defenderName, 'steel', defenderHealth)

                    attacker.fightToDeath(defender)

                    expect(attacker.health).toBe(expectedAttackerHealth)
                    expect(defender.health).toBe(expectedDefenderHealth)

                    if (!attacker.isAlive) { //defender won
                        expect(console.log).toHaveBeenCalledWith(attacker.name + ' lose battle against ' + defender.name)
                    } else if (!defender.isAlive) { //attacker won
                        expect(console.log).toHaveBeenCalledWith(defender.name + ' lose battle against ' + attacker.name)
                    }

                })
    })

    describe('Witcher Hunting Monster', () => {
        it.each(
            [
                ['Geralt', 'Chuck Norris', 5, 9999, -1, 9993], //defender win
                ['Gwen', 'Robin', 30, 12, 18, 0], //attacker win
            ])('%s fight %s',
                (WitcherName, MonsterName, attackerHealth, defenderHealth,
                    expectedAttackerHealth, expectedDefenderHealth) => {
                    console.log = jest.fn();
                    const attacker = new LivingThing(WitcherName, 'steel', attackerHealth)
                    const defender = new LivingThing(MonsterName, 'steel', defenderHealth)

                    attacker.fightToDeath(defender)

                    expect(attacker.health).toBe(expectedAttackerHealth)
                    expect(defender.health).toBe(expectedDefenderHealth)

                    if (!attacker.isAlive) { //defender won
                        expect(console.log).toHaveBeenCalledWith(attacker.name + ' lose battle against ' + defender.name)
                    } else if (!defender.isAlive) { //attacker won
                        expect(console.log).toHaveBeenCalledWith(defender.name + ' lose battle against ' + attacker.name)
                    }

                })
    })

})