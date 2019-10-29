import TrainingCastle from '../trainingCastle'
import Disciple from '../disciple'

describe('Castle functions', () => {

    describe('Castle constructor', () => {
        const kaerMorhen = new TrainingCastle()
        expect(kaerMorhen.disciples).toEqual(expect.arrayContaining([]))
    })

    describe('Getting new Disciples', () => {
        it.each(
            [
                [['Ciri']],
                [['Ciri', 'Geralt']]
            ])(
                'Accepting %s ',
                (Names) => {
                    const expectedDiscpiple = []

                    //generate expected discpiple :
                    for (let i = 0; i < Names.length; ++i) {
                        expectedDiscpiple.push(new Disciple(Names[i]))
                    }

                    const kaerMorhen = new TrainingCastle()

                    //add all disciples except last one 
                    kaerMorhen.disciples = expectedDiscpiple.slice(0, Names.length - 1)

                    //test if we can add the last disciple
                    kaerMorhen.acceptNewDisciple(Names[Names.length - 1])

                    expect(kaerMorhen.disciples).toEqual(expectedDiscpiple)
                })
    })

    describe('Disciples eat mushroom', () => {
        it.each(
            [
                //Test 1 and 4 disciples with up to 2 junky that should be filter out after dying
                [['Ciri'], [0]],
                [['Ciri', 'Geralt', 'Joker', 'Bane'], [0, 2, 4, 8]]
            ])(
                '%s eating',
                (Names, numberOfMushroom) => {
                    console.log = jest.fn();

                    //populate new castle
                    const kaerMorhen = new TrainingCastle()
                    for (let i = 0; i < Names.length; ++i) {
                        kaerMorhen.disciples.push(new Disciple(Names[i]))
                        kaerMorhen.disciples[i].mushroomsAte = numberOfMushroom[i]
                    }

                    //Test mushroom eating incrementation
                    kaerMorhen.eatMushrooms()

                    //number of alive disciples is number of mushroom <= 3
                    expect(kaerMorhen.disciples.map(d => d.mushroomsAte)).toEqual(
                        numberOfMushroom.map(mush => mush + 1).filter((mush) => mush <= 3)
                    )

                    //If there is disciples that should have die
                    if (numberOfMushroom.filter((mush) => mush > 2).length > 0) {
                        //console.log should have been called once per death
                        expect(console.log).toHaveBeenCalledTimes(
                            numberOfMushroom.filter((mush) => mush > 2).length)
                    }
                })
    })

    describe('Disciples training', () => {
        it.each(
            [
                [['Ciri'], [0]],
                [['Ciri', 'Geralt'], [0, 42]],
            ])(
                '%s training',
                (Names, numberOfTraining) => {
                    //populate new castle
                    const kaerMorhen = new TrainingCastle()
                    for (let i = 0; i < Names.length; ++i) {
                        kaerMorhen.disciples.push(new Disciple(Names[i]))
                        kaerMorhen.disciples[i].trainingSessions = numberOfTraining[i]
                    }

                    //Test training incrementation
                    kaerMorhen.trainDisciples()

                    expect(kaerMorhen.disciples.map(d => d.trainingSessions)).toEqual(
                        numberOfTraining.map(train => train + 1)
                    )

                })
    })





})
        //console.log = jest.fn();