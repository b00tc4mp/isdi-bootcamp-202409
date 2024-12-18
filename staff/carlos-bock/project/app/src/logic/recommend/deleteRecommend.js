import errors from '../../../../com/errors.js'; import validate from '../../../../com/validate.js'

const { SystemError } = errors

const deleteRecommend = recommendId => {
    validate.id(recommendId, 'recommendId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/recommends/${recommendId}`, {
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

export default deleteRecommend