export default (date) => {
    let currentDate

    if (date && !date.includes('T')) {
        //date format 'YYYY-MM-DD' ? convert to Date adding a day
        currentDate = new Date(date)
        currentDate.setDate(currentDate.getDate() + 1)
    } else {
        //date format ISO String ? convert to Date
        currentDate = new Date(date)
    }

    //date formatting
    const options = { day: 'numeric', month: 'short', year: 'numeric' }
    const formattedDate = currentDate.toLocaleDateString('en-GB', options)

    return formattedDate
}