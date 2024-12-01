export default (randomChar, userGuess) => {
    let checkedAnswers = []
    let haki = {}

    if (randomChar.name === userGuess.name) { // POSITION 0 => NAME
        checkedAnswers.push(true, true, true, true, true, true, true, true, true)
        return checkedAnswers
    }
    else
        checkedAnswers.push(false)


    if (randomChar.gender === userGuess.gender) // POSITION 1 => GENDER
        checkedAnswers.push(true)
    else
        checkedAnswers.push(false)

    if (randomChar.affiliation === userGuess.affiliation) // POSITION 2 => AFFILIATION
        checkedAnswers.push(true)
    else
        checkedAnswers.push(false)

    if (randomChar.devilFruit && userGuess.devilFruit) // POSITION 3 => DEVILFRUIT
        if (randomChar.devilFruit.type === userGuess.devilFruit.type)
            checkedAnswers.push(true)
        else
            checkedAnswers.push(false)
    else if (!randomChar.devilFruit && !userGuess.devilFruit)
        checkedAnswers.push(true)
    else
        checkedAnswers.push(false)

    // if () // TODO HAKI VALIDATION
    if ((randomChar.observation && randomChar.armament && randomChar.conqueror) && (userGuess.observation && userGuess.armament && userGuess.conqueror))
        checkedAnswers.push(true)
    else if ((randomChar.observation && randomChar.armament && !randomChar.conqueror) && (userGuess.observation && userGuess.armament && !userGuess.conqueror))
        checkedAnswers.push(true)
    else if ((randomChar.observation && !randomChar.armament && !randomChar.conqueror) && (userGuess.observation && !randomChar.armament && !randomChar.conqueror))
        checkedAnswers.push(true)
    else if ((!randomChar.observation && randomChar.armament && !randomChar.conqueror) && (!userGuess.observation && userGuess.armament && !userGuess.conqueror))
        checkedAnswers.push(true)
    else if ((!randomChar.observation && !randomChar.armament && !randomChar.conqueror) && (!userGuess.observation && !userGuess.armament && !userGuess.conqueror))
        checkedAnswers.push(true)
    else
        checkedAnswers.push('haki failed')

    if (randomChar.bounty === userGuess.bounty) // POSITION 5 => BOUNTY
        checkedAnswers.push(true)
    else if (randomChar.bounty > userGuess.bounty)
        checkedAnswers.push('higher')
    else
        checkedAnswers.push('lower')

    if (randomChar.height === userGuess.height) // POSITION 6 => HEIGHT
        checkedAnswers.push(true)
    else if (randomChar.height > userGuess.height)
        checkedAnswers.push('higher')
    else
        checkedAnswers.push('lower')

    if (randomChar.sea === userGuess.sea) // POSITION 7 => SEA
        checkedAnswers.push(true)
    else
        checkedAnswers.push(false)

    if (randomChar.firstArc.name === userGuess.firstArc.name) // POSITION 8 => FIRSTARC
        checkedAnswers.push(true)
    else if (randomChar.firstArc.number > userGuess.firstArc.number)
        checkedAnswers.push('higher')
    else
        checkedAnswers.push('lower')

    return checkedAnswers
}