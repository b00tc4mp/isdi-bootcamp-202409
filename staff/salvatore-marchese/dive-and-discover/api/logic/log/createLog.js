// LOG MODEL
import { User, LogBook } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async (userId, date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, diveSite, notes) => {
    // Input validation
    validate.id(userId, 'userId')
    validate.date(date)
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
    validate.diveSite(diveSite)
    validate.notes(notes)

    try {
         // Convert date from dd/mm/yyyy string to Date object (optional)
         const [day, month, year] = date.split('/');
         const formattedDate = new Date(`${year}-${month}-${day}`);  // Converts to YYYY-MM-DD
 
        // Check if the user exists
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError('User not found')

        // Create the new log entry
        await LogBook.create({
            diver: userId, date: formattedDate, depth, time, weather, temperature, visibility, waves, wetSuit, weight, 
            tankSize, tankBar, feeling, diveCenter, diveSite, notes
        })

        // Return a success message (you can change this as per your needs)
        return { message: 'Log created successfully' }
    } catch (error) {
        // Handle errors with specific error messages
        throw new SystemError(error.message)
    }
}