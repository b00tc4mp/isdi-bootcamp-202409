import { validate, errors } from 'com'

const { SystemError } = errors

export default (playerId, itemId) => {
    validate.id(playerId, 'playerId')
    validate.id(itemId, 'itemId')

    return fetch(`http://${import.meta.env.VITE_API_URL}/:playerId/item/:itemId`, {
        headers: {
            'Authorization': `Bearer ${localStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.ok)
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => {
                    throw new errors[error](message)
                })
        })
}