import { compareNumerics, isMatch, compareDevilFruit } from "../../util"

export default (randomChar, userGuess) => {
    let checkedAnswers = []

    if (isMatch(randomChar.name, userGuess.name)) { // POSITION 0 ==> NAME
        return Array(9).fill(true)
    } else {
        checkedAnswers.push(false)
    }

    checkedAnswers.push(isMatch(randomChar.gender, userGuess.gender)) // POSITION 1 ==> GENDER

    checkedAnswers.push(isMatch(randomChar.affiliation, userGuess.affiliation)) // POSITION 2 ==> AFFILIATION

    checkedAnswers.push(compareDevilFruit(randomChar.devilFruit, userGuess.devilFruit)) // POSITION 3 ==> DEVILFRUIT

    // if () // TODO HAKI VALIDATION
    if (randomChar.observation && randomChar.armament && randomChar.conqueror && userGuess.observation && userGuess.armament && userGuess.conqueror) // OBS, ARM AND CON HAKIS MATCH
        checkedAnswers.push(true)
    else if (randomChar.observation && randomChar.armament && !randomChar.conqueror && userGuess.observation && userGuess.armament && !userGuess.conqueror) // OBS AND ARM HAKIS MATCH
        checkedAnswers.push(true)
    else if (randomChar.observation && !randomChar.armament && !randomChar.conqueror && userGuess.observation && !randomChar.armament && !randomChar.conqueror) // OBS HAKI MATCH
        checkedAnswers.push(true)
    else if (!randomChar.observation && randomChar.armament && !randomChar.conqueror && !userGuess.observation && userGuess.armament && !userGuess.conqueror) // ARM HAKI MATCH
        checkedAnswers.push(true)
    else if (!randomChar.observation && !randomChar.armament && !randomChar.conqueror && !userGuess.observation && !userGuess.armament && !userGuess.conqueror) // NO HAKIS MATCH
        checkedAnswers.push(true)
    else if (randomChar.observation && !randomChar.armament && userGuess.observation && userGuess.armament)
        checkedAnswers.push('partial') // RANDOM HAS OBS, GUESSED HAS OBS AND ARM
    else if (!randomChar.observation && randomChar.armament && userGuess.observation && userGuess.armament)
        checkedAnswers.push('partial') // RANDOM HAS ARM, GUESSED HAS OBS AND ARM
    else if (randomChar.observation && randomChar.armament && userGuess.observation && !userGuess.armament)
        checkedAnswers.push('partial') // RANDOM HAS OBS AND ARM, GUESSED HAS OBS
    else if (randomChar.observation && randomChar.armament && !userGuess.observation && userGuess.armament)
        checkedAnswers.push('partial') // RANDOM HAS OBS AND ARM, GUESSED HAS ARM
    else if (randomChar.observation && !randomChar.armament && !userGuess.observation && userGuess.armament)
        checkedAnswers.push(false) // RANDOM HAS OBS, GUESSED ARM
    else if (!randomChar.observation && randomChar.armament && userGuess.observation && !userGuess.armament)
        checkedAnswers.push(false) // RANDOM HAS ARM, GUESSED OBS
    else
        checkedAnswers.push('haki failed')

    checkedAnswers.push(compareNumerics(randomChar.bounty, userGuess.bounty)) // POSITION 5 ==> BOUNTY

    checkedAnswers.push(compareNumerics(randomChar.height, userGuess.height)) // POSITION 6 ==> HEIGHT

    checkedAnswers.push(isMatch(randomChar.sea, userGuess.sea)) // POSITION 7 ==> SEA

    if (isMatch(randomChar.firstArc.name, userGuess.firstArc.name)) checkedAnswers.push(true) // POSITION 8 ==> FIRSTARC
    else checkedAnswers.push(compareNumerics(randomChar.firstArc.number, userGuess.firstArc.number))

    return checkedAnswers // THE FULL ARRAY WITH 9 POSITIONS
}