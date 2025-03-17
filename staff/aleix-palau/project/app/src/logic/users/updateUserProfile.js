import { validate, errors } from 'com'

const { SystemError } = errors

export default data => {
    const { name, dateOfBirth, gender, targetGender, artists, bio, location, minAge, maxAge, distance, coordinates } = data

    if (name !== undefined) validate.name(name)
    if (dateOfBirth !== undefined) validate.dateOfBirth(dateOfBirth)
    if (gender !== undefined) validate.gender(gender)
    if (targetGender !== undefined) validate.targetGender(targetGender)
    if (artists !== undefined) validate.artists(artists)
    if (bio !== undefined) validate.bio(bio)
    if (location !== undefined) validate.location(location)
    if (minAge !== undefined) validate.minAge(minAge)
    if (maxAge !== undefined) validate.maxAge(maxAge)
    if (distance !== undefined) validate.distance(distance)
    if (coordinates !== undefined) validate.coordinates(coordinates)

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/profile`, {
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
// TODO: posar pictures/profilePicture a l'objecte?