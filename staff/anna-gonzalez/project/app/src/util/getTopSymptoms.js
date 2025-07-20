export default (dayLogs) => {
    //empty array to count symptoms
    const symptomCount = []

    dayLogs.forEach(log => {
        if (log.symptoms) {
            log.symptoms.forEach(symptom => {
                //search if symptom is already in counter of symptoms
                const existingSymptom = symptomCount.find(item => item.symptom === symptom)

                //if it is, increment the counter, if not, we add it to counter
                if (existingSymptom) {
                    existingSymptom.count += 1
                } else {
                    symptomCount.push({ symptom, count: 1 })
                }
            })
        }
    })

    //order symptoms for frequency (descending order)
    symptomCount.sort((a, b) => b.count - a.count)

    //first three more frequent symptoms
    return symptomCount.slice(0, 3).map(item => item.symptom) //slice(start, end)
}