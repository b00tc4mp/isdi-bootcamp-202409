export default (index, conditions) => {
    switch (index) {
        case '0': return [conditions[0].text, conditions[3].text]
        case '1': return [conditions[1].text, conditions[3].text]
        case '2': return [conditions[2].text, conditions[3].text]

        case '3': return [conditions[0].text, conditions[4].text]
        case '4': return [conditions[1].text, conditions[4].text]
        case '5': return [conditions[2].text, conditions[4].text]

        case '6': return [conditions[0].text, conditions[5].text]
        case '7': return [conditions[1].text, conditions[5].text]
        case '8': return [conditions[2].text, conditions[5].text]
    }
}