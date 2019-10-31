import MonsterFactory from '../monster'

describe('Monster tests', () => {
    describe('Factory Test', () => {
        it.each(
            [
                ['Wraith', 10, 2, 'steel'],
                ['Fiend', 20, 5, 'steel'],
            ])('Creation of %s',
                (monster, expectedHealth, expectedDmg, expectedResistance) => {
                    const testMonster = MonsterFactory(monster)
                    
                    expect(testMonster.name).toBe(monster)
                    expect(testMonster.health).toBe(expectedHealth)
                    expect(testMonster.isAlive).toBeTruthy()
                    expect(testMonster.hitting()).toBe(expectedDmg)
                    expect(testMonster.resistance).toBe(expectedResistance)
                })
    })

    describe('Monster getting hit', () => {
        it.each(
            [
                ['Wraith', 10, 2, 'steel'],
                ['Fiend', 20, 5, 'steel'],
            ])('Creation of %s',
                (monster, expectedHealth, expectedDmg, expectedResistance) => {
                    const testMonster = MonsterFactory(monster)
                    //TODO
                    expect(testMonster.name).toBe(monster)
                    expect(testMonster.health).toBe(expectedHealth)
                    expect(testMonster.isAlive).toBeTruthy()
                    expect(testMonster.hitting()).toBe(expectedDmg)
                    expect(testMonster.resistance).toBe(expectedResistance)
                })
    })

    describe('Incorporeality of the Wraith', () => {
        it.each(
            [
                ['Wraith', false, 8, true],
                ['Wraith', true, 10, false],
            ])('Test on Wraith',
                (monster, initialIncorporeal, expectedHealth, expectedIncorporeal) => {
                    const testMonster = MonsterFactory(monster)

                    testMonster.isIncorporeal = initialIncorporeal

                    testMonster.gettingHit(2) 

                    expect(testMonster.health).toBe(expectedHealth)
                    expect(testMonster.isIncorporeal).toBe(expectedIncorporeal)

                })
    })
})