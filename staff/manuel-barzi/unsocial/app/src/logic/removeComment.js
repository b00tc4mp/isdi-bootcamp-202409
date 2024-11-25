import { validate, errors } from 'com'

const { SystemError } = errors

export default (postId, commentId) => {
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.token}` }
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