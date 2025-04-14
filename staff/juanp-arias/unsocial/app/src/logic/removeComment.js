import { errors, validate } from 'com'

const { SystemError } = errors
export default (postId, commentId) => {
    validate.id(postId, 'Post ID')
    validate.id(commentId, 'Comment ID')

    return fetch(`http://${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${sessionStorage.token}` }
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
