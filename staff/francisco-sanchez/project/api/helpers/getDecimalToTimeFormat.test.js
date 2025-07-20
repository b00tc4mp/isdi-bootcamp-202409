import getDecimalToTimeFormat from './getDecimalToTimeFormat.js';

try {

    const decimalTime = 1.915156666666667

    const formatedTime = await (getDecimalToTimeFormat(decimalTime))

} catch (error) {
    console.error(error)
}