export default (index, availableCharacters) => {
    const newAvailableCharacters = [...availableCharacters]

    newAvailableCharacters.splice(index, 1)

    return newAvailableCharacters
}