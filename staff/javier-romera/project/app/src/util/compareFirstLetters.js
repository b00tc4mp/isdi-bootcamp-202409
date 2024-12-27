export default (inputValue, char) => {
    const { name, alias } = char

    const length = inputValue.length

    const charNameSubstring = name.slice(0, length).toLowerCase()
    const charAliasSubstring = alias.slice(0, length).toLowerCase()

    return [inputValue.toLowerCase() === charNameSubstring, inputValue.toLowerCase() === charAliasSubstring]
}