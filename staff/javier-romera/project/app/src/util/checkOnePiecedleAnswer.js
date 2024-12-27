import compareNumerics from './compareNumerics'
import isMatch from './isMatch'
import compareDevilFruit from './compareDevilFruit'

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

    const { observation: rObservation, armament: rArmament, conqueror: rConqueror } = randomChar
    const { observation: gObservation, armament: gArmament, conqueror: gConqueror } = userGuess

    if (rConqueror && gConqueror) // OBS, ARM AND CON HAKIS MATCH
        checkedAnswers.push(true)
    else if (rObservation && rArmament && !rConqueror && gObservation && gArmament && !gConqueror) // OBS AND ARM HAKIS MATCH
        checkedAnswers.push(true)
    else if (rObservation && !rArmament && !rConqueror && gObservation && !gArmament && !gConqueror) // OBS HAKI MATCH
        checkedAnswers.push(true)
    else if (!rObservation && rArmament && !rConqueror && !gObservation && gArmament && !gConqueror) // ARM HAKI MATCH
        checkedAnswers.push(true)
    else if (!rObservation && !rArmament && !rConqueror && !gObservation && !gArmament && !gConqueror) // NO HAKIS MATCH
        checkedAnswers.push(true)
    else if (rObservation && !rArmament && !gObservation && gArmament)
        checkedAnswers.push(false) // RANDOM HAS OBS, GUESSED ARM
    else if (!rObservation && rArmament && gObservation && !gArmament)
        checkedAnswers.push(false) // RANDOM HAS ARM, GUESSED OBS
    else if ((rObservation || rArmament) && (!gObservation && !gArmament))
        checkedAnswers.push(false)
    else if ((!rObservation && !rArmament) && (gObservation || gArmament))
        checkedAnswers.push(false)
    else
        checkedAnswers.push('partial')

    checkedAnswers.push(compareNumerics(randomChar.bounty, userGuess.bounty)) // POSITION 5 ==> BOUNTY

    checkedAnswers.push(compareNumerics(randomChar.height, userGuess.height)) // POSITION 6 ==> HEIGHT

    checkedAnswers.push(isMatch(randomChar.sea, userGuess.sea)) // POSITION 7 ==> SEA

    if (isMatch(randomChar.firstArc.name, userGuess.firstArc.name)) checkedAnswers.push(true) // POSITION 8 ==> FIRSTARC
    else checkedAnswers.push(compareNumerics(randomChar.firstArc.number, userGuess.firstArc.number))

    return checkedAnswers // THE FULL ARRAY WITH 9 POSITIONS
}