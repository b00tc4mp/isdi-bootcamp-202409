import { validate, errors } from 'com'

const { SystemError } = errors

export default noteId => {
    validate.id(noteId, 'noteId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/notes/${noteId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}