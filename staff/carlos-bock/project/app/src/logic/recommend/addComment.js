import validate from '../../../../com/validate.js'; import errors from '../../../../com/errors.js'

const { SystemError } = errors

const addComment = (recommendId, text) => {
    validate.id(recommendId, 'recommendId')
    validate.text(text)

    return fetch(`http://${import.meta.env.VITE_API_URL}/recommends/${recommendId}/comments`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
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
export default addComment