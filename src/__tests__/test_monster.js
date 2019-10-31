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
                    
                    expect(testMonster.name).toEqual(monster)
                    expect(testMonster.health).toEqual(expectedHealth)
                    expect(testMonster.isAlive).toBeTruthy()
                    expect(testMonster.hitting()).toEqual(expectedDmg)
                    expect(testMonster.resistance).toEqual(expectedResistance)
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
                    expect(testMonster.name).toEqual(monster)
                    expect(testMonster.health).toEqual(expectedHealth)
                    expect(testMonster.isAlive).toBeTruthy()
                    expect(testMonster.hitting()).toEqual(expectedDmg)
                    expect(testMonster.resistance).toEqual(expectedResistance)
                })
    })
})