export default function sortConditions(allConditions) {
    let parsedColumnConditions = []
    let parsedRowConditions = []

    const columnConditions = allConditions.filter(con => con.direction === 'column')

    const rowConditions = allConditions.filter(con => con.direction === 'row')

    while (parsedColumnConditions.length < 3) {
        const randomNumber = Math.floor(Math.random() * columnConditions.length)

        const possibleCondition = columnConditions[randomNumber]

        const alreadyExists = parsedColumnConditions.some(con => con.text === possibleCondition.text)

        if (!alreadyExists) parsedColumnConditions.push(possibleCondition)
    }

    while (parsedRowConditions.length < 3) {
        const randomNumber = Math.floor(Math.random() * rowConditions.length)

        const possibleCondition = rowConditions[randomNumber]

        const alreadyExists = parsedRowConditions.some(con => con.text === possibleCondition.text)

        if (!alreadyExists) parsedRowConditions.push(possibleCondition)
    }

    parsedColumnConditions[0].indexes = [0, 3, 6]
    parsedColumnConditions[1].indexes = [1, 4, 7]
    parsedColumnConditions[2].indexes = [2, 5, 8]

    parsedRowConditions[0].indexes = [0, 1, 2]
    parsedRowConditions[1].indexes = [3, 4, 5]
    parsedRowConditions[2].indexes = [6, 7, 8]

    const conditions = [...parsedColumnConditions, ...parsedRowConditions]

    return conditions
}