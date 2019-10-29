import Disciple from '../disciple'

describe('Disciple functions', () => {
    describe('disciple mushrooms mortality', () => {
        it.each(
            [
                //testing 2 survive 2 expected deaths
                ['Ciri', 1],
                ['Geralt', 3], //limit to stay alive
                ['XxDaRkSaSuKeXx', 4], //limit to die
                ['Batiste', 10]
            ])(
                '%s eat mushroom n°%i',
                (name, numberOfMushroom) => {
                    //catch log
                    console.log = jest.fn();

                    //new guinea pig
                    const testDisciple = new Disciple(name)
                    testDisciple.mushroomsAte = numberOfMushroom - 1

                    testDisciple.eatMushrooms()

                    expect(testDisciple.mushroomsAte).toBe(numberOfMushroom)
                    expect(testDisciple.isStillAlive).toBe(numberOfMushroom<=3)

                    if (numberOfMushroom>3) {
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
                    const testDisciple = new Disciple(name)
                    testDisciple.trainingSessions = TrainingSession - 1

                    testDisciple.train()

                    expect(testDisciple.trainingSessions).toBe(TrainingSession)
                }
            )
    })

    describe('disciple have been trained', () => {
        it.each(
            [
                //test 2 trained 3 not trained
                ['Ciri', 1, 1, true],
                ['Geralt', 3, 3000, true],
                ['Kilian', 0, 2, false],
                ['Dorian', 2, 0, false],
                ['K3v!n', 0, 0, false]
            ])(
                'Is %s trained ? Expected: %s',
                (name, mushroomUsed, trainingDone, isTrainedExpected) => {
                    const testDisciple = new Disciple(name)
                    testDisciple.mushroomsAte = mushroomUsed
                    testDisciple.trainingSessions = trainingDone

                    expect(testDisciple.isTrained()).toBe(isTrainedExpected)
                }
            )
    })


})