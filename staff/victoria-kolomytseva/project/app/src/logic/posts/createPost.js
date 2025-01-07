import { validate, errors } from 'com'

const { SystemError } = errors

export default (image, whatHappened, petType, petGender, text, location) => {
    validate.petType(petType)
    validate.whatHappened(whatHappened)
    validate.petGender(petGender)
    validate.text(text)
    validate.location(location)

    return fetch(`http://${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, whatHappened, petType, petGender, text, location }),
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