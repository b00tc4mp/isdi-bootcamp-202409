import { User, LogBook } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async (userId, date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, diveSite, notes) => {
    try {
        if (userId) {
            validate.id(userId, 'userId') // Only validate if userId is provided to confirm the user is logged in
        }
        
        validate.date(date)

        // Convert date from dd/mm/yyyy string to Date object
        const [day, month, year] = date.split('/')
        const formattedDate = new Date(`${year}-${month}-${day}`)  // Converts to YYYY-MM-DD

        const user = await User.findById(userId)
        if (!user) throw new NotFoundError('User not found')

            console.log('Creating log with userId:', userId) 

        const log = await LogBook.create({
            date: formattedDate, 
            depth, time, weather, temperature, visibility, waves, wetSuit, weight, 
            tankSize, tankBar, feeling, diveCenter, diveSite, notes
        })

        return { message: 'Log created successfully', log }
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}