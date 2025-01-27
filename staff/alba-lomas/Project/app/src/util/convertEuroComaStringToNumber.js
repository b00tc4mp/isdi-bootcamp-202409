export default stringAmount => {
        const inputValue = stringAmount.replace(',', '.')
        return parseFloat(inputValue)
}