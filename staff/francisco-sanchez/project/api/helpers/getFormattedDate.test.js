import getFormattedDate from "./getFormattedDate.js"

try {

    const date = new Date()

    const formatedDate = await (getFormattedDate(date))

} catch (error) {
    console.error(error)
}