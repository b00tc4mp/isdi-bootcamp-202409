import { errors } from "com";

const { SystemError } = errors;

export default async (decimalHours) => {

    try {

        const hours = Math.floor(decimalHours)

        const minutes = Math.floor((decimalHours - hours) * 60)

        const seconds = Math.floor(((decimalHours - hours) * 60 - minutes) * 60)

        const formatedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

        return formatedTime


    } catch (error) {
        throw new SystemError(error.message)
    }

}