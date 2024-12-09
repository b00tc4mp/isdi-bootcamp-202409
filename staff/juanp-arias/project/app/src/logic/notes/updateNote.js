import { validate, errors } from 'com'

const { SystemError } = errors

export default (noteId, text) => {
    validate.id(noteId, 'noteId')
    validate.text(text)

    return fetch(`http://${import.meta.env.VITE_API_URL}/notes/${noteId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
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