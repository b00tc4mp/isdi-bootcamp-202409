import { validate, errors } from 'com'
import { extractPayloadFromJWT } from '../../util'

const { SystemError } = errors

export default data => {
    const { name, dateOfBirth, gender, targetGender, artists, bio, location } = data

    if (name !== undefined) validate.name(name)
    if (dateOfBirth !== undefined) validate.dateOfBirth(dateOfBirth)
    if (gender !== undefined) validate.gender(gender)
    if (targetGender !== undefined) validate.targetGender(targetGender)
    if (artists !== undefined) validate.artists(artists)
    if (bio !== undefined) validate.bio(bio)
    if (location !== undefined) validate.location(location)

    // Extract user ID from the JWT stored in localStorage
    const { sub: userId } = extractPayloadFromJWT(localStorage.token)

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(data)
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