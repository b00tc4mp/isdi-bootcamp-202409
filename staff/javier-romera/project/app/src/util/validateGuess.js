export default (characters, guess) => {
    return characters.findIndex(char => char.name === guess || char.alias === guess)
}