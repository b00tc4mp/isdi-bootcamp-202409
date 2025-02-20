import { User, LogBook } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (userId, targetUserId, diveSite, date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, notes) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')
    validate.diveSite(diveSite, 'diveSite')
    validate.date(new Date(date))
    validate.depth(depth, 'depth')
    validate.time(time, 'time')
    validate.weather(weather, 'weather')
    validate.temperature(temperature, 'temperature')
    validate.visibility(visibility, 'visibility')
    validate.waves(waves,'waves')
    validate.wetSuit(wetSuit, 'wetSuit')
    validate.weight(weight, 'weight')
    validate.tankSize(tankSize, 'tankSize')
    validate.tankBar(tankBar, 'tankBar')
    validate.feeling(feeling, 'feeling')
    validate.diveCenter(diveCenter, 'diveCenter')
    validate.notes(notes, 'notes')

    // Convert date string to Date object
    let formattedDate;
    try {
        const [day, month, year] = date.split('/');
        formattedDate = new Date(`${year}-${month}-${day}`); // Converts to YYYY-MM-DD
    } catch (dateConversionError) {
        throw new SystemError('Invalid date format. Expected format: dd/mm/yyyy.');
    }

    return (async () => {
        let user

        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('User not found')

        // Create the log
        let log;
        try {
            log = await LogBook.create({
                diver: userId,
                diveSite,
                date: formattedDate,
                depth,
                time,
                weather,
                temperature,
                visibility,
                waves,
                wetSuit,
                weight,
                tankSize,
                tankBar,
                feeling,
                diveCenter,
                notes,
            })
        } catch (logCreationError) {
            throw new SystemError(`Error creating log: ${logCreationError.message}`)
        }
    })()
}