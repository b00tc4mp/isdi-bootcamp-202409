import getDecimalToTimeFormat from './getDecimalToTimeFormat.js';

try {

    const decimalTime = 9.0032

    const formatedTime = await (getDecimalToTimeFormat(decimalTime))
    console.log(formatedTime)

} catch (error) {
    console.error(error)
}