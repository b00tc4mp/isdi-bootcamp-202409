export default (inputValue, characters) => {
    const length = inputValue.length

    const found = characters.some(char => inputValue.toLowerCase() === char.name.slice(0, length).toLowerCase() || inputValue.toLowerCase() === char.alias.slice(0, length).toLowerCase())

    return found
}