import getFormattedDate from "./getFormattedDate.js"

try {

    const date = new Date()

    const formatedDate = await (getFormattedDate(date))
    console.log(formatedDate)

} catch (error) {
    console.error(error)
}