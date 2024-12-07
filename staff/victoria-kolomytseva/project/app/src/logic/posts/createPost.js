import { validate, errors } from 'com'

const { SystemError } = errors

export default (image, whatHappened, petType, petGender, text, latitude, longitude) => {
    validate.text(image)
    validate.text(petType)
    validate.text(whatHappened)
    validate.text(petGender)

    return fetch(`http://${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, whatHappened, petType, petGender, text, latitude, longitude })
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