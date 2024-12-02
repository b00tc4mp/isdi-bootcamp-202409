export default (characters, guess) => {
    return characters.find(char => char.name === guess || char.alias === guess)
}