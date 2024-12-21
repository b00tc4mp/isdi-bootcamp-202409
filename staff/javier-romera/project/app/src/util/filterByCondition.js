export default (characters, property, value, operator) => {
    switch (operator) {
        case 'equal':
            return characters.filter(char => char[property] === value)
        case 'greater than equal':
            return characters.filter(char => char[property] >= value)
        case 'lower than equal':
            return characters.filter(char => char[property] <= value)
    }
}