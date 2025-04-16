import { validate, errors } from 'com';

const { SystemError } = errors

export default (postId, commentId) => {
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}`, {
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
/* const xhr = new XMLHttpRequest

xhr.addEventListener('load', () => {
    const { status, response } = xhr

    if (status === 204) {
        callback(null)
        return
    }
    const { error, message } = JSON.parse(response)
    const constructor = errors[error]

    callback(new constructor(message))
})

xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${commentId}`)
xhr.addEventListener('error', () => callback(new SystemError('server error')))

//xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.userId}`)
xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
xhr.send() */
