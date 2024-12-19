export default (dayLogs, activity) => {
    //empty array to count activities
    const valueCount = []

    dayLogs.forEach(log => {
        const value = log[activity]
        if (value) {
            //search if symptom is already in counter of activities
            const existingValue = valueCount.find(item => item.value === value)

            //if it is, increment the counter, if not, we add it to counter
            if (existingValue) {
                existingValue.count += 1
            } else {
                valueCount.push({ value, count: 1 })
            }
        }
    })

    //order activities for frequency (descending order)
    valueCount.sort((a, b) => b.count - a.count)

    //most frequent activity
    return valueCount.length > 0 ? valueCount[0].value : null
}