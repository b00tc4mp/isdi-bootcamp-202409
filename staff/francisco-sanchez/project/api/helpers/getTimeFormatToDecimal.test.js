import getTimeFormatToDecimal from './getTimeFormatToDecimal.js'

try {
    const timeFormat = '01:30:00'

    const decimalTime = await (getTimeFormatToDecimal(timeFormat))

} catch (error) {
    console.error(error)
}