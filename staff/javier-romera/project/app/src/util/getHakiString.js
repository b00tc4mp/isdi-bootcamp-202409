export default (observation, armament, conqueror) => {
    let hakiString = ''

    if (!observation && !armament && !conqueror) return '𐢫'

    if (observation) hakiString += '👀 '
    if (armament) hakiString += '🦾 '
    if (conqueror) hakiString += '👑'

    return hakiString
}