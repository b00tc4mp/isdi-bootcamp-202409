import { User, LogBook } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async (userId, diveSite, date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, notes) => {
    try {
        if (userId) {
            validate.id(userId, 'userId') // Only validate if userId is provided to confirm the user is logged in
        }
        validate.diveSite(diveSite)
        validate.date(new Date(date))
        validate.depth(depth)
        validate.time(time)
        validate.weather(weather)
        validate.temperature(temperature)
        validate.visibility(visibility)
        validate.waves(waves)
        validate.wetSuit(wetSuit)
        validate.weight(weight)
        validate.tankSize(tankSize)
        validate.tankBar(tankBar)
        validate.feeling(feeling)
        validate.diveCenter(diveCenter)
        validate.notes(notes)

        // Convert date from dd/mm/yyyy string to Date object
        const [day, month, year] = date.split('/')
        console.log(day)
        const formattedDate = new Date(`${year}-${month}-${day}`)  // Converts to YYYY-MM-DD

        const user = await User.findById(userId)
        if (!user) throw new NotFoundError('User not found')

        console.log('Creating log with userId:', userId)

        const log = await LogBook.create({
            diver: userId, diveSite, date: formattedDate, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, notes
        })

        return { message: 'Log created successfully', log }
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}