import filterByCondition from './filterByCondition'

export default (characters, conditions) => {
    let answers = []

    // COLUMN 1 FILTERED CHARACTERS
    const columnOneCondition = conditions.find(condition => condition.indexes[0] === 0 && condition.direction === 'column')

    const { property: cOneProperty, value: cOneValue, type: cOneType } = columnOneCondition

    const columnOneFilteredCharacters = filterByCondition(characters, cOneProperty, cOneValue, cOneType)

    // COLUMN 2 FILTERED CHARACTERS
    const columnTwoCondition = conditions.find(condition => condition.indexes[0] === 1 && condition.direction === 'column')

    const { property: cTwoProperty, value: cTwoValue, type: cTwoType } = columnTwoCondition

    const columnTwoFilteredCharacters = filterByCondition(characters, cTwoProperty, cTwoValue, cTwoType)

    // COLUMN 3 FILTERED CHARACTERS
    const columnThreeCondition = conditions.find(condition => condition.indexes[0] === 2 && condition.direction === 'column')

    const { property: cThreeProperty, value: cThreeValue, type: cThreeType } = columnThreeCondition

    const columnThreeFilteredCharacters = filterByCondition(characters, cThreeProperty, cThreeValue, cThreeType)

    // ROW 1 CONDITION
    const rowOneCondition = conditions.find(condition => condition.indexes[0] === 0 && condition.direction === 'row')

    const { property: rOneProperty, value: rOneValue, type: rOneType } = rowOneCondition

    // ROW 2 CONDITION
    const rowTwoCondition = conditions.find(condition => condition.indexes[0] === 3 && condition.direction === 'row')

    const { property: rTwoProperty, value: rTwoValue, type: rTwoType } = rowTwoCondition

    // ROW 3 CONDITION
    const rowThreeCondition = conditions.find(condition => condition.indexes[0] === 6 && condition.direction === 'row')

    const { property: rThreeProperty, value: rThreeValue, type: rThreeType } = rowThreeCondition

    // ROW 1 ANSWERS
    // INDEX 0 ANSWERS
    const indexZeroAnswers = filterByCondition(columnOneFilteredCharacters, rOneProperty, rOneValue, rOneType)
    answers.push(indexZeroAnswers)

    // INDEX 1 ANSWERS
    const indexOneAnswers = filterByCondition(columnTwoFilteredCharacters, rOneProperty, rOneValue, rOneType)
    answers.push(indexOneAnswers)

    // INDEX 2 ANSWERS
    const indexTwoAnswers = filterByCondition(columnThreeFilteredCharacters, rOneProperty, rOneValue, rOneType)
    answers.push(indexTwoAnswers)

    // ROW 2 ANSWERS
    // INDEX 3 ANSWERS
    const indexThreeAnswers = filterByCondition(columnOneFilteredCharacters, rTwoProperty, rTwoValue, rTwoType)
    answers.push(indexThreeAnswers)

    // INDEX 4 ANSWERS
    const indexFourAnswers = filterByCondition(columnTwoFilteredCharacters, rTwoProperty, rTwoValue, rTwoType)
    answers.push(indexFourAnswers)

    // INDEX 5 ANSWERS
    const indexFiveAnswers = filterByCondition(columnThreeFilteredCharacters, rTwoProperty, rTwoValue, rTwoType)
    answers.push(indexFiveAnswers)

    // ROW 3 ANSWERS
    // INDEX 6 ANSWERS
    const indexSixAnswers = filterByCondition(columnOneFilteredCharacters, rThreeProperty, rThreeValue, rThreeType)
    answers.push(indexSixAnswers)

    // INDEX 7 ANSWERS
    const indexSevenAnswers = filterByCondition(columnTwoFilteredCharacters, rThreeProperty, rThreeValue, rThreeType)
    answers.push(indexSevenAnswers)

    // INDEX 8 ANSWERS
    const indexEightAnswers = filterByCondition(columnThreeFilteredCharacters, rThreeProperty, rThreeValue, rThreeType)
    answers.push(indexEightAnswers)

    if (!answers[0] || !answers[1] || !answers[2] || !answers[3] || !answers[4] || !answers[5] || !answers[6] || !answers[7] || !answers[8]) return null

    return answers
}