import { validate, errors } from 'com';

const { SystemError } = errors

export default (postId, text) => {
    validate.id(postId, 'postId')
    validate.text(text)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
        method: 'POST',
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

/* xhr.addEventListener('load', () => {
    const { status, response } = xhr

    if (status === 201) {
        callback(null)

        return
    }
    const { error, message } = JSON.parse(response)

    const constructor = errors[error]

    callback(new constructor(message))
})

xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`)
xhr.addEventListener('error', () => callback(new SystemError('server error')))

xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
xhr.setRequestHeader('Content-type', 'application/json')
xhr.send(JSON.stringify({ text })) */
