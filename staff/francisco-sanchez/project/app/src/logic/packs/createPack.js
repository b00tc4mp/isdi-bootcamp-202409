import { validate, errors } from 'com'

import getUserId from '../users/getUserId'

const { SystemError } = errors

export default (packName, packDescription, quantity, unit, expiringTime, price, currency) => {
    //Validates will come here



    //Logic and call to the api
    return fetch(`${import.meta.env.VITE_API_URL}/packs/create-pack`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        },

        body: JSON.stringify({ packName, packDescription, quantity, unit, expiringTime, price, currency })
    })
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(res => {
            if (res.ok)
                return

            return res.json()
                .catch(error => {
                    throw new SystemError(error.message)
                })
                .then(({ error, message }) => {
                    throw new errors[error](message) //TODO: Repasar este error
                })

        })
}

