import { validate, errors } from 'com'

const { SystemError } = errors

export default async (logbookId, { date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, notes }) => {
    validate.id(logbookId, 'logbookId')
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
    validate.notes(notes)

    let res
    try {
        res = await fetch(`http://${import.meta.env.VITE_API_URL}/logs/${logbookId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, notes })
        })
    } catch (error) {
        throw new SystemError(error.message)
        const res = undefined
    }
    if (res.ok) return
    let result
    try {
        result = await res.json()
    } catch (error_1) {
        throw new SystemError(error_1.message)
        const result = undefined
    }
    const { error: error_2, message } = result
    throw new errors[error_2](message)
}