import validate from '../../../../com/validate.js'; import errors from '../../../../com/errors.js'

const { SystemError } = errors

const removeComment = (recommendId, commentId) => {
    validate.id(recommendId, 'recommendId')
    validate.id(commentId, 'commentId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/recommends/${recommendId}/comments/${commentId}`, {
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
export default removeComment