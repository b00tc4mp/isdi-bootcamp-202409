import { validate, errors } from 'com'

const { SystemError } = errors

export default logbookId => {
    validate.id(logbookId, 'logbookId')

    return fetch(`http://${imprt.meta.env.VITE_API_URL}/logs/${logbookId}`,
        {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${sessionStorage.token}` }
        })
            .catch(error => { throw new SystemError(error.message) })
            .then(res => {
                if (res.ok)
                    return 

                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(({ error, message }) => { throw new errors[error] (message) })
            })
}