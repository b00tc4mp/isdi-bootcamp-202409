import { errors } from 'com'
const { SystemError } = errors

import { sortConditions } from './helpers'

export default () => {
    if (!sessionStorage.conditions) {
        return fetch(`http://${import.meta.env.VITE_API_URL}/conditions`, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
            .catch(error => { throw new SystemError(error.message) })
            .then(res => {
                if (res.ok)
                    return res.json()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(conditions => {
                            sessionStorage.conditions = JSON.stringify(conditions)
                            return sortConditions(conditions)
                        })

                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(({ error, message }) => { throw new errors[error](message) })
            })
    } else {
        return sortConditions(JSON.parse(sessionStorage.conditions))
    }
}