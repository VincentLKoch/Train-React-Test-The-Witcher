import Disciple from '../disciple'

describe('Disciple functions', () => {
    describe('disciple mushrooms mortality', () => {
        it.each(
            [
                ['Ciri', 1, true],
                ['Geralt', 3, true],
                ['Jean-Louis', 4, false],
                ['Jean-Roger', 10, false]
            ])(
                '%s eat mushroom n°%i',
                (name, numberOfMushroom, isAliveExpected) => {
                    console.log = jest.fn();

                    let testDisciple = new Disciple(name)
                    testDisciple.mushroomsAte = numberOfMushroom - 1

                    testDisciple.eatMushrooms()

                    const actualResult = testDisciple.isStillAlive
                    expect(actualResult).toBe(isAliveExpected)
                    expect(testDisciple.mushroomsAte).toBe(numberOfMushroom)

                    if (!isAliveExpected) {
                        expect(console.log).toHaveBeenCalledWith(name + ' screams and dies in agony.')
                    }
                }
            )
    })

    describe('disciple training incrementation', () => {
        it.each(
            [
                ['Ciri', 1],
                ['Geralt', 2999]
            ])(
                'Training %s session n°%i',
                (name, TrainingSession, ) => {
                    let testDisciple = new Disciple(name)
                    testDisciple.trainingSessions = TrainingSession - 1

                    testDisciple.train()

                    expect(testDisciple.trainingSessions).toBe(TrainingSession)
                }
            )
    })

    describe('disciple have been trained', () => {
        it.each(
            [
                ['Ciri', 1, 1, true],
                ['Geralt', 3, 3000, true],
                ['Jean-Eude', 0, 2, false],
                ['Jean Guillemin', 2, 0, false],
                ['Jean-Gabriel', 0, 0, false]
            ])(
                'Is %s trained ? Already ate %i mushroom and did %i training session. Spoiler: %s',
                (name, mushroomUsed, trainingDone, isTrainedExpected) => {
                    let testDisciple = new Disciple(name)
                    testDisciple.mushroomsAte = mushroomUsed
                    testDisciple.trainingSessions = trainingDone

                    expect(testDisciple.isTrained()).toBe(isTrainedExpected)
                }
            )
    })


})