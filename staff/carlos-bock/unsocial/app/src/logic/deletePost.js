import { validate, errors } from 'com';

const { SystemError } = errors;

const deletePost = postId => {
    validate.id(postId, 'postId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/posts/${postId}`, {
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

export default deletePost;
