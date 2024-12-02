import { errors, validate } from 'com'

const { SystemError } = errors

export default (text, image) => {
    validate.text(text)
    validate.image(image)

    return fetch(`http://${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ text, image })
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