import Witcher from '../witcher'
import Disciple from '../disciple'

describe('Witcher tests', () => {
    describe('Efficiency', () => {
        it.each(
            [
                ['Eric', 2, 5],
                ['Alphonse', 3, 10],
            ])('%s have the good efficiency',
                (name, mushroomate, trainingsessions) => {
                    const testDisciple = new Disciple(name)

                    testDisciple.mushroomsAte = mushroomate
                    testDisciple.trainingSessions = trainingsessions

                    const testWitcher = new Witcher(testDisciple)

                    expect(testWitcher.name).toBe(name)
                    expect(testWitcher.efficiency).toBe(mushroomate*trainingsessions)
                })
    })


    describe('Put sword in sheath', () => {
        it.each(
            [
                ['Eric', 'silver', 'steel'],
                ['Eric', 'steel', 'steel'],
            ])('%s put sword in his sheath',
                (name, initialSword, expectedSword) => {
                    const testWitcher = new Witcher(new Disciple(name))

                    testWitcher.currentSword = initialSword
                    
                    testWitcher.putSwordInSheath()

                    expect(testWitcher.name).toBe(name)
                    expect(testWitcher.currentSword).toBe(expectedSword)
                })
    })

    describe('Switch sword in function of resistance', () => {
        it.each(
            [
                ['Eric', 10, 'steel', 'steel'],
                ['Cedric', 5, 'silver', 'steel'],
                ['Alphonse', 20, 'steel', 'silver'],
                ['Edward', 12, 'silver', 'silver'],
            ])('%s put sword in his sheath',
                (name, Efficiency, resistance, initialSword) => {
                    const testWitcher = new Witcher(new Disciple(name))

                    testWitcher.currentSword = initialSword
                    testWitcher.efficiency = Efficiency

                    if (initialSword === resistance) {
                        expect(testWitcher.hitting(resistance)).toBe(Math.ceil(Efficiency / 2))
                    }
                    else {
                        expect(testWitcher.hitting(resistance)).toBe(Efficiency)
                    }

                    expect(testWitcher.name).toBe(name)
                    expect(testWitcher.currentSword).not.toBe(resistance)
                })
    })
})