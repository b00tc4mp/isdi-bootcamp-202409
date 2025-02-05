import { validate, errors } from 'com'

const { SystemError } = errors

export default (userId, packId, customerId, description, operation) => {
    validate.id(userId, 'userId')
    validate.id(packId, 'packId')
    validate.id(customerId, 'customerId')
    validate.description(description)
    //validate operation maybe could be usefull

    return fetch(`${import.meta.env.VITE_API_URL}/tracker/toggleTimmer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({ userId, packId, customerId, description, operation })
    })

        .catch(error => {
            throw new SystemError(error.message)
        })

        .then(res => {
            if (res.ok)
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(({ error, message }) => { throw new errors[error](message) })
        })
}