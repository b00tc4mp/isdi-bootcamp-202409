import { validate, errors } from 'com'

const { SystemError } = errors

export default (diveSite, date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, notes) => {
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

    return fetch(`http://${import.meta.env.VITE_API_URL}/logs/users/diver/log-book`, {
        method: 'POST', 
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({diveSite, date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, notes })
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