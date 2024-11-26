import { validate, errors } from 'com';

const { SystemError } = errors;

const toggleLikePost = (postId) => {
    validate.id(postId, 'postId');

    fetch(`http://${import.meta.env.VITE_API_URL}/posts/${postId}/likes`, {
        method: 'PATCH',
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

export default toggleLikePost;
