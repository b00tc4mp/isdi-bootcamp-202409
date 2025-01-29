import { errors } from "com"

const { SystemError } = errors

export default async (date) => {
    try {
        const d = new Date(date)

        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')

        const hours = String(d.getHours()).padStart(2, '0')
        const minutes = String(d.getMinutes()).padStart(2, '0')

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`

        return formattedDate
    } catch (error) {
        throw new SystemError(error.message)
    }
}