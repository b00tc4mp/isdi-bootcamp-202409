import { validate, errors } from 'com'

const { SystemError } = errors

export default (postId, text) => {
    validate.id(postId, 'postId')
    validate.text(text)

    return fetch(`http://${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${localStorage.token}`,
            'Content-type': 'application/json'
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