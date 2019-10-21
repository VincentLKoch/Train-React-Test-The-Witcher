import Disciple from '../disciple'

describe('Disciple functions', () => {
    describe('disciple mushrooms mortality', () => {
        it.each(
            [
                ['Ciri', 1, true],
                ['Geralt', 3, true],
                ['Jean-Louis', 4, false]
            ])(
                'Tests %s with mushroom n°%i',
                (name, numberOfMushroom, isAlive) => {
                    let testDisciple = new Disciple(name)
                    testDisciple.mushroomsAte = numberOfMushroom - 1

                    testDisciple.eatMushrooms()

                    const actualResult = testDisciple.isStillAlive
                    expect(actualResult).toBe(isAlive)
                    expect(testDisciple.mushroomsAte).toBe(numberOfMushroom)
                }
            )
    })
})