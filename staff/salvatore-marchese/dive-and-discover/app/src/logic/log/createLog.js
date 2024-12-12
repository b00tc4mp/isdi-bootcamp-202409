import { validate, errors } from 'com'

const { SystemError } = errors

export default (userId, date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, diveSite, notes) => {
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

    return fetch(`http://${import.meta.env.VITE_API_URL}/log-book`, {
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`, 'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, diveSite, notes })
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
        if (res.ok)
            return

        return res.json()
            .catch(error => { throw new SystemError(error.message) })
            .then(({ error, message }) => { throw new errors[error](message) })
    })
}